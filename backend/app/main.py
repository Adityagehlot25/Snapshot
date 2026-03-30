from fastapi import FastAPI
from app.routes import image

# Initialize the FastAPI application
app = FastAPI(
    title="Image Analysis API",
    description="A modular backend for image upload and processing.",
    version="1.0.0"
)

# Include the image router
app.include_router(image.router)

@app.get("/")
async def root():
    """
    Root endpoint for basic health checking.
    """
    return {"message": "API is running"}