import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse

from backend.routes import prediction, model, metrics, insights
from backend.services.model_service import ModelService

app = FastAPI(
    title="LoanGuard AI - Loan Risk Intelligence API",
    description="Enterprise Machine Learning REST API for loan default risk prediction and portfolio diagnostics.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS configuration for local development and production
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "https://loan-default-ml-project-sigma.vercel.app",
]

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url and frontend_url not in origins:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Normalize Vercel serverless request path if rewritten
@app.middleware("http")
async def path_normalization_middleware(request: Request, call_next):
    matched = request.headers.get("x-matched-path") or request.headers.get("x-vercel-matched-path")
    if matched and request.scope["path"] in ("/api/index.py", "/", "/index.py"):
        request.scope["path"] = matched
    return await call_next(request)

# Health endpoint (accessible both at /api/health and /health)
@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# Documentation route aliases
@app.get("/api/docs", include_in_schema=False)
async def api_docs_redirect():
    return RedirectResponse(url="/docs")

# Mount feature routers with both /api prefix and root prefix for resilient Vercel rewrites
app.include_router(prediction.router, prefix="/api")
app.include_router(prediction.router)

app.include_router(model.router, prefix="/api")
app.include_router(model.router)

app.include_router(metrics.router, prefix="/api")
app.include_router(metrics.router)

app.include_router(insights.router, prefix="/api")
app.include_router(insights.router)

# Serve diagnostic plots
@app.get("/plots/{filename}")
@app.get("/api/plots/{filename}")
async def get_diagnostic_plot(filename: str):
    safe_filename = Path(filename).name
    plots_dir = ModelService._get_artifacts_dir() / "plots"
    candidate_paths = [
        plots_dir / safe_filename,
        Path.cwd() / "artifacts" / "plots" / safe_filename,
        Path(__file__).resolve().parent.parent / "artifacts" / "plots" / safe_filename,
    ]
    for p in candidate_paths:
        if p.exists() and p.is_file():
            return FileResponse(str(p))
    raise HTTPException(status_code=404, detail="Plot not found")

# Fallback handler for unmatched paths with diagnostics
@app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"], include_in_schema=False)
async def unmatched_path_fallback(request: Request, full_path: str):
    return {
        "status": "unmatched_route",
        "requested_path": request.url.path,
        "scope_path": request.scope.get("path"),
        "matched_header": request.headers.get("x-matched-path") or request.headers.get("x-vercel-matched-path"),
        "available_endpoints": [
            "/api/health", "/api/model-details", "/api/metrics",
            "/api/insights", "/api/predict", "/api/plots/{filename}"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
