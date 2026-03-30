from fastapi import APIRouter, File, UploadFile
from app.services.image_service import process_image

# Initialize the router for image-related endpoints
router = APIRouter(
    prefix="",
    tags=["Image Processing"]
)

@router.post("/analyze-image")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    """
    Receives an image file, saves it, and returns computed visual metrics
    along with a human-readable explanation and camera adjustment suggestions.
    """
    # Pass the file directly to the service layer
    response = await process_image(file)
    return response