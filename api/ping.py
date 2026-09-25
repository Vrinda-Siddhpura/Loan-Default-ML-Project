import json
import os
import sys
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        
        info = {
            "status": "ok",
            "python": sys.version,
            "cwd": os.getcwd(),
            "root_files": os.listdir(".") if os.path.exists(".") else [],
            "api_files": os.listdir("api") if os.path.exists("api") else [],
            "sys_path": sys.path,
        }
        
        # Test imports
        for pkg in ["fastapi", "numpy", "pandas", "sklearn", "joblib"]:
            try:
                __import__(pkg)
                info[pkg] = "installed"
            except Exception as e:
                info[pkg] = f"error: {str(e)}"

        self.wfile.write(json.dumps(info, indent=2).encode())
