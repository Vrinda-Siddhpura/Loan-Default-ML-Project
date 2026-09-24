import React from 'react';
import GlassPanel from './GlassPanel';

export default function MetricStrip({
  label,
  value,
  subtitle,
  icon: Icon,
  variant = 'standard',
  accentColor = '#4F7CFF'
}) {
  return (
    <GlassPanel variant={variant} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {label}
        </span>
        {Icon && (
          <div style={{
            background: `${accentColor}15`,
            color: accentColor,
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={16} />
          </div>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        fontWeight: 800,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        marginTop: '0.15rem'
      }}>
        {value}
      </div>

      {subtitle && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {subtitle}
        </div>
      )}
    </GlassPanel>
  );
}
