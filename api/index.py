import os
import sys
import json
import traceback
from pathlib import Path

# Add project root directories to sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
for candidate in [PROJECT_ROOT, Path.cwd(), Path("/var/task")]:
    cand_str = str(candidate)
    if candidate.exists() and cand_str not in sys.path:
        sys.path.insert(0, cand_str)

app = None
init_error = None

try:
    from backend.main import app as backend_app
    app = backend_app
except Exception as e:
    init_error = {
        "error": "ServerlessStartupException",
        "message": str(e),
        "exception_type": type(e).__name__,
        "traceback": traceback.format_exc().splitlines(),
        "python_version": sys.version,
        "cwd": os.getcwd(),
        "root_files": os.listdir(".") if os.path.exists(".") else [],
        "sys_path": sys.path
    }

# Fallback ASGI application to serve diagnostic report if backend fails to import
if app is None:
    async def app(scope, receive, send):
        if scope["type"] == "http":
            body = json.dumps(init_error, indent=2).encode("utf-8")
            await send({
                "type": "http.response.start",
                "status": 500,
                "headers": [
                    [b"content-type", b"application/json"],
                    [b"content-length", str(len(body)).encode("utf-8")],
                    [b"access-control-allow-origin", b"*"]
                ],
            })
            await send({
                "type": "http.response.body",
                "body": body,
            })
