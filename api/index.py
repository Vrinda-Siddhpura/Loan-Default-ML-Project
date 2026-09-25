import sys
import traceback
from pathlib import Path

# Add candidate root directories to sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent

for candidate in [PROJECT_ROOT, Path.cwd(), Path("/var/task")]:
    cand_str = str(candidate)
    if candidate.exists() and cand_str not in sys.path:
        sys.path.insert(0, cand_str)

from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI(title="Loan Default ML Project")

try:
    from backend.main import app as backend_app
    app = backend_app
except Exception as e:
    err_msg = str(e)
    tb_str = traceback.format_exc()
    py_ver = sys.version
    path_list = list(sys.path)

    @app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"])
    async def debug_error_handler(full_path: str):
        return JSONResponse(
            status_code=500,
            content={
                "error": "ServerlessImportFailure",
                "message": err_msg,
                "path": full_path,
                "traceback": tb_str.splitlines(),
                "python_version": py_ver,
                "sys_path": path_list
            }
        )
