from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.ask import router as ask_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ask_router)

@app.get("/")
def home():
    return {"message": "Spiritual AI backend running"}