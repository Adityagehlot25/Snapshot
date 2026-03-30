export default function ImagePreview({ imageFile, enhancedImage, enhancedImageUrl }) {
  if (!imageFile) return null;

  const BACKEND_BASE_URL = 'http://localhost:8000';

  const previewUrl = URL.createObjectURL(imageFile);

  const downloadBase64Image = () => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${enhancedImage}`;
    link.download = 'enhanced-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card image-preview">
      <h2 style={{ color: '#0f172a' }}>Image Comparison</h2>

      <div className="image-comparison-container">

        {/* Original */}
        <div className="image-wrapper">
          <p className="image-label">Original</p>

          <div className="image-box">
            <img src={previewUrl} alt="Original preview" />
          </div>
        </div>

        {/* Enhanced */}
        {(enhancedImage || enhancedImageUrl) && (
          <div className="image-wrapper">
            <p className="image-label">Enhanced</p>

            <div className="image-box">
              {enhancedImage ? (
                <img
                  src={`data:image/jpeg;base64,${enhancedImage}`}
                  alt="Enhanced preview"
                />
              ) : (
                <img
                  src={`${BACKEND_BASE_URL}${enhancedImageUrl}`}
                  alt="Enhanced preview"
                />
              )}
            </div>

            {/* Download button BELOW image (fixes UI issue) */}
            {enhancedImage ? (
              <button
                onClick={downloadBase64Image}
                className="btn btn-primary download-btn"
              >
                Download Enhanced Image
              </button>
            ) : enhancedImageUrl && (
              <a
                href={`${BACKEND_BASE_URL}${enhancedImageUrl}`}
                download="enhanced.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary download-btn"
              >
                Download Enhanced Image
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}