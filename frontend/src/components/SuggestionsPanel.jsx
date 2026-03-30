export default function SuggestionsPanel({ data }) {
  if (!data) return null;

  const { brightness, contrast, exposure, suggestions, explanation, avg_rgb } = data;

  return (
    <div className="card suggestions-panel">
      <h2>Analysis Results</h2>
      
      <div className="explanation-box">
        <strong>Diagnosis:</strong> {explanation}
      </div>

      <div className="grid-layout">
        <div className="metric-group">
          <h3>Camera Suggestions</h3>
          <ul className="suggestion-list">
            <li>
              <span>Brightness:</span> 
              <strong>{suggestions.brightness}</strong>
            </li>
            <li>
              <span>Contrast:</span> 
              <strong>{suggestions.contrast}</strong>
            </li>
            <li>
              <span>White Balance:</span> 
              <strong className="capitalize">{suggestions.white_balance}</strong>
            </li>
            <li>
              <span>Saturation:</span> 
              <strong>{suggestions.saturation}</strong>
            </li>
            <li>
              <span>Temperature:</span> 
              <strong className="capitalize">{suggestions.temperature}</strong>
            </li>
            <li>
              <span>Tint:</span> 
              <strong className="capitalize">{suggestions.tint}</strong>
            </li>
          </ul>
        </div>

        <div className="metric-group">
          <h3>Raw Metrics</h3>
          <ul className="raw-list">
            <li>Exposure: <span className="capitalize">{exposure}</span></li>
            <li>Brightness: {brightness}</li>
            <li>Contrast: {contrast}</li>
            <li>
              RGB Averages: 
              <span className="rgb-values">
                R: {avg_rgb.r} | G: {avg_rgb.g} | B: {avg_rgb.b}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}