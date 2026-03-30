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
    generates camera adjustment suggestions, and conditionally applies subtle auto-enhancement.
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
    img = cv2.imread(str(saved_path))
    
    # Handle corrupted or unreadable image files
    if img is None:
        raise HTTPException(
            status_code=422,
            detail="Unprocessable Entity: The uploaded file could not be read as an image."
        )

    try:
        # 2. Compute metrics on the ORIGINAL image
        brightness = float(np.mean(img))
        contrast = float(np.std(img))
        
        # OpenCV loads in BGR format by default
        b, g, r = cv2.split(img)
        avg_b = float(np.mean(b))
        avg_g = float(np.mean(g))
        avg_r = float(np.mean(r))

        # Compute Saturation using HSV space
        hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        h_chan, s_chan, v_chan = cv2.split(hsv_img)
        avg_saturation = float(np.mean(s_chan))

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

        # 6. Saturation Detection Logic
        if avg_saturation < 80:
            saturation_suggestion = "+20"
            sat_adjust = 10  # Subtle boost
        elif avg_saturation > 180:
            saturation_suggestion = "-10"
            sat_adjust = -5  # Subtle reduction
        else:
            saturation_suggestion = "0"
            sat_adjust = 0

        # 7. Temperature Detection Logic
        if avg_b > avg_r:
            temperature_suggestion = "warmer"
            temp_adjust = 5  # Add red, reduce blue
        elif avg_r > avg_b:
            temperature_suggestion = "cooler"
            temp_adjust = -5  # Add blue, reduce red
        else:
            temperature_suggestion = "balanced"
            temp_adjust = 0

        # 8. Tint Detection Logic
        if avg_g > avg_r and avg_g > avg_b:
            tint_suggestion = "magenta"
            tint_adjust = -5  # Reduce green slightly
        elif avg_g < avg_r and avg_g < avg_b:
            tint_suggestion = "green"
            tint_adjust = 5   # Boost green slightly
        else:
            tint_suggestion = "balanced"
            tint_adjust = 0

        # 9. Generate Explanation
        explanation = _generate_explanation(brightness, contrast)

        # 10. Apply Auto Enhancement (Subtle & Conditional)
        enhancement_applied = False
        new_img = img.copy()
        
        # Base Exposure and Contrast Tuning
        if 80 <= brightness <= 180 and 40 <= contrast <= 80:
            # Image has good base lighting, skip base enhancement
            pass
        else:
            enhancement_applied = True
            if brightness > 180:
                # Overexposed: Subtly reduce brightness and highlights without crushing shadows
                new_img = cv2.convertScaleAbs(new_img, alpha=0.95, beta=-10)
            elif contrast > 80:
                # High contrast (but normal brightness): Subtly lower contrast
                new_img = cv2.convertScaleAbs(new_img, alpha=0.90, beta=10)
            else:
                # Underexposed or Low Contrast: Use Soft CLAHE
                lab = cv2.cvtColor(new_img, cv2.COLOR_BGR2LAB)
                l_channel, a_channel, b_channel = cv2.split(lab)
                clahe = cv2.createCLAHE(clipLimit=1.2, tileGridSize=(8, 8))
                cl = clahe.apply(l_channel)
                merged_lab = cv2.merge((cl, a_channel, b_channel))
                new_img = cv2.cvtColor(merged_lab, cv2.COLOR_LAB2BGR)

        # Apply Color Enhancements (Saturation)
        if sat_adjust != 0:
            enhancement_applied = True
            hsv = cv2.cvtColor(new_img, cv2.COLOR_BGR2HSV)
            h_idx, s_idx, v_idx = cv2.split(hsv)
            s_idx = np.clip(s_idx.astype(np.int16) + sat_adjust, 0, 255).astype(np.uint8)
            hsv = cv2.merge((h_idx, s_idx, v_idx))
            new_img = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

        # Apply Color Enhancements (Temperature & Tint)
        if temp_adjust != 0 or tint_adjust != 0:
            enhancement_applied = True
            b_idx, g_idx, r_idx = cv2.split(new_img)
            
            if temp_adjust != 0:
                r_idx = np.clip(r_idx.astype(np.int16) + temp_adjust, 0, 255).astype(np.uint8)
                b_idx = np.clip(b_idx.astype(np.int16) - temp_adjust, 0, 255).astype(np.uint8)
            
            if tint_adjust != 0:
                g_idx = np.clip(g_idx.astype(np.int16) + tint_adjust, 0, 255).astype(np.uint8)
                
            new_img = cv2.merge((b_idx, g_idx, r_idx))

        # 11. Encode the resulting image to Base64
        enhanced_image_b64 = _encode_image_to_base64(new_img)

        # 12. Return the formatted JSON payload
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
                "white_balance": white_balance,
                "saturation": saturation_suggestion,
                "temperature": temperature_suggestion,
                "tint": tint_suggestion
            },
            "explanation": explanation,
            "enhancement_applied": enhancement_applied,
            "enhanced_image": enhanced_image_b64
        }

    except Exception as e:
        print(f"Error processing image metrics: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while analyzing the image."
        )