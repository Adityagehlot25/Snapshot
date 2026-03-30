export default function ImagePreview({ imageFile, enhancedImage }) {
  if (!imageFile) return null;

  // Create a local object URL for the uploaded original file
  const previewUrl = URL.createObjectURL(imageFile);

  return (
    <div className="card image-preview">
      <h2>Image Comparison</h2>
      
      <div className="image-comparison-container">
        {/* Original Image */}
        <div className="image-wrapper">
          <span className="image-label">Original</span>
          <img src={previewUrl} alt="Original preview" />
        </div>

        {/* Enhanced Image (Conditionally Rendered) */}
        {enhancedImage && (
          <div className="image-wrapper">
            <span className="image-label">Enhanced</span>
            <img 
              src={`data:image/jpeg;base64,${enhancedImage}`} 
              alt="Enhanced preview" 
            />
          </div>
        )}
      </div>
    </div>
  );
}