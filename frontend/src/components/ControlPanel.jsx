import React from 'react';

export default function ControlPanel({ 
  brightness, setBrightness, 
  contrast, setContrast, 
  saturation, setSaturation, 
  temperature, setTemperature,
  tint, setTint,
  whiteBalance, setWhiteBalance,
  disabled 
}) {
  return (
    <div className="card controls-panel" style={{ marginTop: '1.5rem' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>🎛 Real-Time Adjustments</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', marginTop: 0 }}>
        Fine-tune the AI-enhanced image instantly.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Basic Adjustments Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          {/* Brightness Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.9rem' }}>
              <label htmlFor="brightness">Brightness</label>
              <span>{brightness > 0 ? `+${brightness}` : brightness}</span>
            </div>
            <input 
              type="range" 
              id="brightness"
              min="-50" max="50" 
              value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))} 
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </div>

          {/* Contrast Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.9rem' }}>
              <label htmlFor="contrast">Contrast</label>
              <span>{contrast > 0 ? `+${contrast}` : contrast}</span>
            </div>
            <input 
              type="range" 
              id="contrast"
              min="-50" max="50" 
              value={contrast} 
              onChange={(e) => setContrast(Number(e.target.value))} 
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </div>

          {/* Saturation Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.9rem' }}>
              <label htmlFor="saturation">Saturation</label>
              <span>{saturation > 0 ? `+${saturation}` : saturation}</span>
            </div>
            <input 
              type="range" 
              id="saturation"
              min="-50" max="50" 
              value={saturation} 
              onChange={(e) => setSaturation(Number(e.target.value))} 
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Color Adjustments Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Temperature Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.9rem' }}>
              <label htmlFor="temperature">Temperature (Cool/Warm)</label>
              <span>{temperature > 0 ? `+${temperature}` : temperature}</span>
            </div>
            <input 
              type="range" 
              id="temperature"
              min="-50" max="50" 
              value={temperature} 
              onChange={(e) => setTemperature(Number(e.target.value))} 
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </div>

          {/* Tint Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.9rem' }}>
              <label htmlFor="tint">Tint (Green/Magenta)</label>
              <span>{tint > 0 ? `+${tint}` : tint}</span>
            </div>
            <input 
              type="range" 
              id="tint"
              min="-50" max="50" 
              value={tint} 
              onChange={(e) => setTint(Number(e.target.value))} 
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </div>

          {/* White Balance Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="whiteBalance" style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              White Balance
            </label>
            <select 
              id="whiteBalance"
              value={whiteBalance}
              onChange={(e) => setWhiteBalance(e.target.value)}
              disabled={disabled}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              <option value="neutral">Neutral (Original)</option>
              <option value="warmer">Warmer</option>
              <option value="cooler">Cooler</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}