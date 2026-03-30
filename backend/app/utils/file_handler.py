import uuid
import aiofiles
from pathlib import Path
from fastapi import UploadFile

# Define the root uploads directory relative to where the app is run
UPLOAD_DIR = Path("uploads")

async def save_uploaded_file(upload_file: UploadFile) -> Path:
    """
    Asynchronously saves an uploaded file to the local uploads directory.
    Generates a unique filename using UUID to prevent overwriting.
    """
    # Ensure the uploads directory exists
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    # Extract original extension or default to .bin
    original_filename = upload_file.filename or "unknown.bin"
    extension = Path(original_filename).suffix
    
    # Generate a unique filename
    unique_filename = f"{uuid.uuid4().hex}{extension}"
    file_path = UPLOAD_DIR / unique_filename

    try:
        # Use aiofiles to write the file asynchronously in chunks
        # Note: standard open() blocks the event loop, so we read chunks
        with open(file_path, "wb") as buffer:
            while chunk := await upload_file.read(1024 * 1024):  # 1MB chunks
                buffer.write(chunk)
        return file_path
    except Exception as e:
        # Clean up the partial file if an error occurs
        if file_path.exists():
            file_path.unlink()
        raise e
    finally:
        # Always close the incoming file object
        await upload_file.close()