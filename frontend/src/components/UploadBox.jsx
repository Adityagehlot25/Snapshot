import { useRef } from 'react';
import { analyzeImage } from '../api';

export default function UploadBox({ onUploadStart, onUploadSuccess, onUploadError, isLoading }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Trigger the upload start to show preview and loading state in parent
    onUploadStart(file);

    try {
      const data = await analyzeImage(file);
      onUploadSuccess(data);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "An error occurred while analyzing the image.";
      onUploadError(errorMsg);
    } finally {
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="card upload-box">
      <h2 style={{ color: '#0f172a' }}>Upload Image</h2>
      <p>Select a photo to get AI-powered camera adjustment suggestions.</p>
      
      <div className="file-input-wrapper">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef}
          disabled={isLoading}
          id="file-upload"
          className="file-input"
        />
        <label htmlFor="file-upload" className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}>
          {isLoading ? 'Analyzing...' : 'Choose Image'}
        </label>
      </div>
    </div>
  );
}