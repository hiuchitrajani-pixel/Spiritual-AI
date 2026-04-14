#!/usr/bin/env python3
import os
import sys

print("Starting Spiritual AI Backend...")
print(f"Current directory: {os.getcwd()}")
print(f"Python path: {sys.path}")

# Add BACKEND directory to Python path
backend_dir = os.path.join(os.path.dirname(__file__), 'BACKEND')
sys.path.insert(0, backend_dir)

print(f"Backend directory: {backend_dir}")
print(f"Backend directory exists: {os.path.exists(backend_dir)}")

# Change to BACKEND directory
os.chdir(backend_dir)
print(f"Changed to directory: {os.getcwd()}")

try:
    # Import and run uvicorn directly
    print("Importing uvicorn...")
    import uvicorn
    print("Importing app...")
    from app.main import app
    print("App imported successfully!")

    if __name__ == "__main__":
        port = int(os.environ.get("PORT", 8000))
        print(f"Starting server on port {port}")
        uvicorn.run(app, host="0.0.0.0", port=port)

except Exception as e:
    print(f"Error starting application: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)