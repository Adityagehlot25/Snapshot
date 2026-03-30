import cv2
import numpy as np
from fastapi import UploadFile, HTTPException
from app.utils.file_handler import save_uploaded_file

async def process_image(file: UploadFile) -> dict:
    """
    Business logic for processing an incoming image upload.
    Validates the file, saves it locally, and computes OpenCV metrics.
    """
    # Basic validation: ensure the file has an image content type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only images are allowed."
        )

    try:
        # Delegate the actual saving to the utility layer
        saved_path = await save_uploaded_file(file)
    except Exception as e:
        print(f"Error saving file: {e}")
        raise HTTPException(
            status_code=500,
            detail="An internal error occurred while saving the image."
        )

    # 1. Read the image using OpenCV
    # Convert Path object to string for cv2.imread
    img = cv2.imread(str(saved_path))
    
    # Handle corrupted or unreadable image files
    if img is None:
        raise HTTPException(
            status_code=422,
            detail="Unprocessable Entity: The uploaded file could not be read as an image."
        )

    try:
        # 2. Compute metrics
        # Cast NumPy floats to Python floats for JSON serialization
        brightness = float(np.mean(img))
        contrast = float(np.std(img))
        
        # OpenCV loads in BGR format by default
        b, g, r = cv2.split(img)
        avg_b = float(np.mean(b))
        avg_g = float(np.mean(g))
        avg_r = float(np.mean(r))

        # 3. Exposure Detection Logic
        if brightness < 80:
            exposure = "underexposed"
        elif brightness > 180:
            exposure = "overexposed"
        else:
            exposure = "normal"

        # 4. Return the formatted JSON payload
        return {
            "brightness": round(brightness, 2),
            "contrast": round(contrast, 2),
            "avg_rgb": {
                "r": round(avg_r, 2),
                "g": round(avg_g, 2),
                "b": round(avg_b, 2)
            },
            "exposure": exposure
        }

    except Exception as e:
        print(f"Error processing image metrics: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while analyzing the image."
        )