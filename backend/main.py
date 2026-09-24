import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.routes import prediction, model, metrics, insights

app = FastAPI(
    title="LoanGuard AI - Loan Risk Intelligence API",
    description="Enterprise Machine Learning REST API for loan default risk prediction and portfolio diagnostics.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration for local development and production
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url and frontend_url not in origins:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# Mount feature routers
app.include_router(prediction.router, prefix="/api")
app.include_router(model.router, prefix="/api")
app.include_router(metrics.router, prefix="/api")
app.include_router(insights.router, prefix="/api")

# Mount diagnostic plots static directory
PROJECT_ROOT = Path(__file__).resolve().parent.parent
PLOTS_DIR = PROJECT_ROOT / "artifacts" / "plots"
if PLOTS_DIR.exists():
    app.mount("/api/plots", StaticFiles(directory=str(PLOTS_DIR)), name="plots")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)

