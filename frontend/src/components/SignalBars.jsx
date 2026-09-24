import React from 'react';

export default function SignalBars({ features = [] }) {
  if (!features || features.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1rem', textAlign: 'center' }}>
        No predictive signal data available.
      </div>
    );
  }

  // Find max importance to calculate percentage bar length
  const maxVal = Math.max(...features.map(f => Math.abs(f.Importance || 0)), 0.001);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {features.slice(0, 10).map((feat, idx) => {
        const val = Math.abs(feat.Importance || 0);
        const percent = Math.min(Math.max((val / maxVal) * 100, 4), 100);

        return (
          <div key={idx} style={{
            background: 'rgba(255, 255, 255, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            boxShadow: '0 2px 8px rgba(80, 100, 140, 0.04)',
            transition: 'transform 0.15s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.84rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
                {idx + 1}. {feat.Feature}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                {(val * 100).toFixed(2)}%
              </span>
            </div>

            {/* Glass Bar Track */}
            <div style={{
              height: '8px',
              borderRadius: '9999px',
              background: 'rgba(203, 213, 225, 0.4)',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                height: '100%',
                width: `${percent}%`,
                background: 'linear-gradient(90deg, #4F7CFF 0%, #36CFC9 100%)',
                borderRadius: '9999px',
                transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
