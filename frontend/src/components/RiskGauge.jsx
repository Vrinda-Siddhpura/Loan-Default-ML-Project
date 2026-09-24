import React from 'react';

export default function RiskGauge({ probability = 0, riskLevel = 'Low Risk' }) {
  const probaPercent = Math.min(Math.max(probability * 100, 0), 100);

  let accentColor = '#22A06B';
  let badgeClass = 'badge-success';

  if (riskLevel === 'Moderate Risk') {
    accentColor = '#D99A24';
    badgeClass = 'badge-warning';
  } else if (riskLevel === 'High Risk') {
    accentColor = '#E05260';
    badgeClass = 'badge-danger';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* Probability Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)'
          }}>
            Default Probability Signal
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.8rem',
            fontWeight: 800,
            color: accentColor,
            lineHeight: 1.1,
            marginTop: '0.2rem'
          }}>
            {probaPercent.toFixed(1)}%
          </div>
        </div>

        <div className={`glass-badge ${badgeClass}`} style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor }} />
          <span>{riskLevel}</span>
        </div>
      </div>

      {/* Glass Track & Pin */}
      <div style={{ position: 'relative', paddingTop: '1.25rem', paddingBottom: '0.5rem' }}>
        {/* Pointer Pin */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: `${probaPercent}%`,
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 10
        }}>
          <div style={{
            background: accentColor,
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '2px 7px',
            borderRadius: '6px',
            boxShadow: `0 2px 8px ${accentColor}40`,
            whiteSpace: 'nowrap'
          }}>
            {probaPercent.toFixed(1)}%
          </div>
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: `5px solid ${accentColor}`
          }} />
        </div>

        {/* Gauge Bar */}
        <div style={{
          height: '14px',
          borderRadius: '9999px',
          background: 'linear-gradient(to right, #22A06B 0%, #22A06B 30%, #D99A24 30%, #D99A24 60%, #E05260 60%, #E05260 100%)',
          position: 'relative',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.8)'
        }}>
          {/* Threshold separators */}
          <div style={{ position: 'absolute', left: '30%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.9)' }} />
          <div style={{ position: 'absolute', left: '60%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.9)' }} />
        </div>
      </div>

      {/* Threshold Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
        <span>Low Risk (&lt; 30%)</span>
        <span>Moderate (30% - 60%)</span>
        <span>High Risk (&ge; 60%)</span>
      </div>
    </div>
  );
}
