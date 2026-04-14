#!/usr/bin/env python3
import os
import sys

# Add BACKEND directory to Python path
backend_dir = os.path.join(os.path.dirname(__file__), 'BACKEND')
sys.path.insert(0, backend_dir)

# Change to BACKEND directory
os.chdir(backend_dir)

# Import and run the FastAPI app
from app.main import app
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)