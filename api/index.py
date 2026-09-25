import os
import sys
from pathlib import Path

# Add project root directory to sys.path so backend package can be imported reliably on Vercel
CURRENT_FILE = Path(__file__).resolve()
PROJECT_ROOT = CURRENT_FILE.parent.parent

for candidate_dir in [PROJECT_ROOT, Path.cwd(), Path("/var/task")]:
    candidate_str = str(candidate_dir)
    if candidate_dir.exists() and candidate_str not in sys.path:
        sys.path.insert(0, candidate_str)

try:
    from backend.main import app
except Exception as e:
    import traceback
    err_trace = traceback.format_exc()
    print("FATAL ERROR: Failed to import backend.main in api/index.py:", file=sys.stderr)
    print(err_trace, file=sys.stderr)

    from fastapi import FastAPI
    from fastapi.responses import JSONResponse

    app = FastAPI(
        title="LoanGuard AI - Emergency Diagnostic Handler",
        docs_url="/docs",
        openapi_url="/openapi.json"
    )

    @app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"])
    async def initialization_error_handler(full_path: str):
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "error_type": "ServerlessFunctionInitializationError",
                "message": str(e),
                "path": full_path,
                "traceback": err_trace.splitlines()
            }
        )
