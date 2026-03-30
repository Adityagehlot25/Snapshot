from fastapi import UploadFile, HTTPException
from app.utils.file_handler import save_uploaded_file

async def process_image(file: UploadFile) -> dict:
    """
    Business logic for processing an incoming image upload.
    Validates the file, saves it, and prepares the response.
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
        
        # Logging for debug purposes (can be replaced with actual logging later)
        print(f"Image successfully saved to: {saved_path}")

        # Return the expected JSON response
        return {"message": "image received"}

    except Exception as e:
        # Catch and handle I/O or internal errors safely
        print(f"Error saving file: {e}")
        raise HTTPException(
            status_code=500,
            detail="An internal error occurred while processing the image."
        )