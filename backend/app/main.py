import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import image

# Initialize the FastAPI application
app = FastAPI(
    title="Image Analysis API",
    description="A modular backend for image upload and processing.",
    version="1.0.0"
)

# ✅ CORS Configuration - Production Ready
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

if ENVIRONMENT == "production":
    # Production: Allow frontend URL
    origins = [
        os.getenv("FRONTEND_URL", "https://your-frontend.vercel.app"),
    ]
else:
    # Development: Allow localhost variants
    origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Mount static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include the image router
app.include_router(image.router)

@app.get("/")
async def root():
    return {"message": "API is running", "environment": ENVIRONMENT}