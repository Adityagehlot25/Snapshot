import cv2
import numpy as np
import base64
from fastapi import UploadFile, HTTPException
from app.utils.file_handler import save_uploaded_file

def _generate_explanation(brightness: float, contrast: float) -> str:
    """Helper function to generate a human-readable explanation."""
    if 80 <= brightness <= 180 and 40 <= contrast <= 80:
        return "Image has balanced lighting and normal contrast."
    
    exposure_text = "underexposed" if brightness < 80 else "overexposed" if brightness > 180 else "normally exposed"
    contrast_text = "lacks contrast" if contrast < 40 else "has high contrast" if contrast > 80 else "has normal contrast"
    
    return f"Image is {exposure_text} and {contrast_text}."

def _encode_image_to_base64(img: np.ndarray) -> str:
    """Helper function to encode an OpenCV image to a base64 string."""
    success, buffer = cv2.imencode('.jpg', img)
    if not success:
        raise ValueError("Failed to encode the enhanced image.")
    # Convert buffer to base64 string
    return base64.b64encode(buffer).decode('utf-8')

async def process_image(file: UploadFile) -> dict:
    """
    Business logic for processing an incoming image upload.
    Validates the file, saves it locally, computes OpenCV metrics,
    generates camera adjustment suggestions, and creates an auto-enhanced version.
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
        # 2. Compute metrics on the ORIGINAL image
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
            brightness_suggestion = "+20"
        elif brightness > 180:
            exposure = "overexposed"
            brightness_suggestion = "-15"
        else:
            exposure = "normal"
            brightness_suggestion = "0"

        # 4. Contrast Suggestion Logic
        if contrast < 40:
            contrast_suggestion = "+15"
        elif contrast > 80:
            contrast_suggestion = "-10"
        else:
            contrast_suggestion = "0"

        # 5. White Balance Suggestion Logic
        if avg_b > avg_r:
            white_balance = "warmer"
        elif avg_r > avg_b:
            white_balance = "cooler"
        else:
            white_balance = "balanced"

        # 6. Generate Explanation
        explanation = _generate_explanation(brightness, contrast)

        # 7. Apply Auto Enhancement
        # Adjusting alpha (contrast) and beta (brightness)
        new_img = cv2.convertScaleAbs(img, alpha=1.2, beta=20)

        # 8. Encode the enhanced image to Base64
        enhanced_image_b64 = _encode_image_to_base64(new_img)

        # 9. Return the formatted JSON payload
        return {
            "brightness": round(brightness, 2),
            "contrast": round(contrast, 2),
            "avg_rgb": {
                "r": round(avg_r, 2),
                "g": round(avg_g, 2),
                "b": round(avg_b, 2)
            },
            "exposure": exposure,
            "suggestions": {
                "brightness": brightness_suggestion,
                "contrast": contrast_suggestion,
                "white_balance": white_balance
            },
            "explanation": explanation,
            "enhanced_image": enhanced_image_b64
        }

    except Exception as e:
        print(f"Error processing image metrics: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while analyzing the image."
        )