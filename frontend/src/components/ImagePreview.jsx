export default function ImagePreview({ imageFile }) {
  if (!imageFile) return null;

  // Create a local object URL for the uploaded file
  const previewUrl = URL.createObjectURL(imageFile);

  return (
    <div className="card image-preview">
      <h2>Image Preview</h2>
      <div className="image-container">
        <img src={previewUrl} alt="Selected preview" />
      </div>
    </div>
  );
}