import { useState } from 'react';
import UploadBox from './components/UploadBox';
import ImagePreview from './components/ImagePreview';
import SuggestionsPanel from './components/SuggestionsPanel';
import ControlPanel from './components/ControlPanel';
import './App.css';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Real-time canvas adjustment states
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [tint, setTint] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState('neutral');

  const handleUploadStart = (file) => {
    setSelectedFile(file);
    setAnalysisData(null);
    setError(null);
    setIsLoading(true);

    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setTemperature(0);
    setTint(0);
    setWhiteBalance('neutral');
  };

  const handleUploadSuccess = (data) => {
    setAnalysisData(data);
    setIsLoading(false);
  };

  const handleUploadError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 style={{ color: '#0f172a' }}>AI Photo Assistant</h1>
        <p>Optimize your camera settings instantly</p>
      </header>

      <main className="main-content">
        <UploadBox
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          isLoading={isLoading}
        />

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-state card">
            Processing image... Please wait.
          </div>
        )}

        {/* Images on LEFT (large) + Analysis + Control on RIGHT (stacked) */}
        {(selectedFile || analysisData) && (
          <div className="results-layout-new">
            {/* LEFT: Original & Enhanced Images (Large) */}
            <div className="images-section-large">
              <ImagePreview
                imageFile={selectedFile}
                enhancedImage={analysisData?.enhanced_image}
                enhancedImageUrl={analysisData?.enhanced_image_url}
                brightness={brightness}
                contrast={contrast}
                saturation={saturation}
                temperature={temperature}
                tint={tint}
                whiteBalance={whiteBalance}
              />
            </div>

            {/* RIGHT: Analysis + Control Panel (stacked) */}
            {analysisData && (
              <div className="details-and-controls-section">
                {/* Analysis - parallel to original */}
                <div className="analysis-card">
                  <SuggestionsPanel data={analysisData} />
                </div>

                {/* Control Panel - parallel to enhanced */}
                <div className="controls-card">
                  <ControlPanel
                    brightness={brightness}
                    setBrightness={setBrightness}
                    contrast={contrast}
                    setContrast={setContrast}
                    saturation={saturation}
                    setSaturation={setSaturation}
                    temperature={temperature}
                    setTemperature={setTemperature}
                    tint={tint}
                    setTint={setTint}
                    whiteBalance={whiteBalance}
                    setWhiteBalance={setWhiteBalance}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}