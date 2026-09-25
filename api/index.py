import sys
from pathlib import Path

# Add project root directory to sys.path so backend package can be imported reliably on Vercel
PROJECT_ROOT = Path(__file__).resolve().parent.parent

for candidate_dir in [PROJECT_ROOT, Path.cwd(), Path("/var/task")]:
    candidate_str = str(candidate_dir)
    if candidate_dir.exists() and candidate_str not in sys.path:
        sys.path.insert(0, candidate_str)

from backend.main import app
