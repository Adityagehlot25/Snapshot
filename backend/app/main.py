from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import image

# Initialize the FastAPI application
app = FastAPI(
    title="Image Analysis API",
    description="A modular backend for image upload and processing.",
    version="1.0.0"
)

# ✅ Add CORS Middleware
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the image router
app.include_router(image.router)

@app.get("/")
async def root():
    return {"message": "API is running"}