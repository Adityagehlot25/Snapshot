import React, { useEffect, useRef } from 'react';

export default function ImagePreview({ 
  imageFile, 
  enhancedImage, 
  enhancedImageUrl,
  // Pass down all states from App.jsx here:
  brightness = 0, 
  contrast = 0, 
  saturation = 0,
  temperature = 0,
  tint = 0,
  whiteBalance = 'neutral'
}) {
  const canvasRef = useRef(null);
  const imageObjRef = useRef(null); // Stores the loaded image object

  const BACKEND_BASE_URL = 'http://localhost:8000';

  // 1. Load the AI-Enhanced Image into a JavaScript Image object
  useEffect(() => {
    let src = null;
    if (enhancedImage) {
      src = `data:image/jpeg;base64,${enhancedImage}`;
    } else if (enhancedImageUrl) {
      src = `${BACKEND_BASE_URL}${enhancedImageUrl}`;
    }

    if (src) {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Prevents canvas tainting/CORS issues
      img.src = src;
      img.onload = () => {
        imageObjRef.current = img;
        drawImage(); // Draw immediately once loaded
      };
    }
  }, [enhancedImage, enhancedImageUrl]);

  // 2. Function to draw the image, apply CSS filters, AND perform pixel manipulation
  const drawImage = () => {
    const canvas = canvasRef.current;
    const img = imageObjRef.current;

    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Match canvas dimensions to the actual image resolution
    canvas.width = img.width;
    canvas.height = img.height;

    // --- STEP A: Apply hardware-accelerated CSS filters ---
    // Convert -50 to +50 range into percentages (e.g., -50 = 50%, 0 = 100%, 50 = 150%)
    const bFilter = 100 + brightness;
    const cFilter = 100 + contrast;
    const sFilter = 100 + saturation;

    ctx.filter = `brightness(${bFilter}%) contrast(${cFilter}%) saturate(${sFilter}%)`;

    // Clear and redraw the base image with CSS filters applied
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Reset filter so it doesn't apply to subsequent drawing operations
    ctx.filter = 'none'; 

    // --- STEP B: Apply Manual Pixel Manipulation (Temperature, Tint, WB) ---
    // Only run the heavy loop if there are actual color adjustments requested
    if (temperature !== 0 || tint !== 0 || whiteBalance !== 'neutral') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // 1. Temperature Adjustment (Warm/Cool)
        // Positive Temp (Warm) -> Add Red, Reduce Blue
        // Negative Temp (Cool) -> Add Blue, Reduce Red
        r += temperature;
        b -= temperature;

        // 2. Tint Adjustment (Green/Magenta)
        // Positive Tint (Green) -> Add Green
        // Negative Tint (Magenta) -> Reduce Green
        g += tint;

        // 3. White Balance Presets
        if (whiteBalance === 'cooler') {
          r -= 15;
          b += 15;
        } else if (whiteBalance === 'warmer') {
          r += 15;
          b -= 15;
        }

        // Clamp values safely between 0 and 255
        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
        // data[i+3] is Alpha, we leave it untouched
      }

      // Put the modified pixels back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    }
  };

  // 3. Re-draw anytime ANY slider or preset value changes
  useEffect(() => {
    drawImage();
  }, [brightness, contrast, saturation, temperature, tint, whiteBalance]);

  // 4. Download from Canvas (preserves manual edits)
  const downloadCanvasImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    // Export the canvas as a high-quality JPEG
    link.href = canvasRef.current.toDataURL('image/jpeg', 0.95);
    link.download = 'edited-enhanced-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!imageFile) return null;
  const previewUrl = URL.createObjectURL(imageFile);

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

        {/* Enhanced (Canvas) */}
        {(enhancedImage || enhancedImageUrl) && (
          <div className="image-wrapper">
            <p className="image-label">Enhanced & Tweaked</p>
            
            <div className="image-box">
              {/* We use style max-width to ensure the high-res canvas 
                scales down nicely to fit the UI container 
              */}
              <canvas 
                ref={canvasRef} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  display: 'block' 
                }} 
              />
            </div>

            <button
              onClick={downloadCanvasImage}
              className="btn btn-primary download-btn"
              style={{ marginTop: '1rem' }}
            >
              Download Final Image
            </button>
          </div>
        )}

      </div>
    </div>
  );
}