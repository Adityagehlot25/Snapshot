import { useState } from 'react';
import UploadBox from './components/UploadBox';
import ImagePreview from './components/ImagePreview';
import SuggestionsPanel from './components/SuggestionsPanel';
import './App.css';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadStart = (file) => {
    setSelectedFile(file);
    setAnalysisData(null); // Clear previous results
    setError(null);        // Clear previous errors
    setIsLoading(true);
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
        <h1>AI Photo Assistant</h1>
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

        <ImagePreview imageFile={selectedFile} />
        
        {isLoading && (
          <div className="loading-state card">
            Processing image... Please wait.
          </div>
        )}

        <SuggestionsPanel data={analysisData} />
      </main>
    </div>
  );
}