import React, { useState } from 'react';
import { Download, Info, Image as ImageIcon } from 'lucide-react';
import GlassPanel from './GlassPanel';
import { getPlotUrl } from '../services/api';

export default function PerformanceChart({ title, filename, description }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const url = getPlotUrl(filename);

  return (
    <GlassPanel variant="standard" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.02rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem'
        }}>
          <ImageIcon size={18} color="#4F7CFF" />
          <span>{title}</span>
        </div>
        <a
          href={url}
          download={filename}
          className="btn-glass-secondary btn-glass-sm"
          title="Download visual plot"
          style={{ padding: '0.35rem 0.75rem' }}
        >
          <Download size={13} />
          <span>Export</span>
        </a>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.45)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        padding: '1.25rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '320px',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
      }}>
        {!loaded && !error && (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Loading diagnostic plot...
          </div>
        )}

        {error ? (
          <div style={{ color: '#E05260', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
            Diagnostic plot image ({filename}) not found.
          </div>
        ) : (
          <img
            src={url}
            alt={title}
            onLoad={() => setLoaded(true)}
            onError={() => { setError(true); setLoaded(true); }}
            style={{
              maxWidth: '100%',
              maxHeight: '420px',
              objectFit: 'contain',
              borderRadius: '10px',
              display: loaded ? 'block' : 'none',
              boxShadow: '0 6px 20px rgba(80, 100, 140, 0.08)'
            }}
          />
        )}
      </div>

      {description && (
        <div style={{
          background: 'rgba(79, 124, 255, 0.05)',
          border: '1px solid rgba(79, 124, 255, 0.15)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          display: 'flex',
          gap: '0.6rem',
          alignItems: 'flex-start'
        }}>
          <Info size={16} color="#4F7CFF" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {description}
          </div>
        </div>
      )}
    </GlassPanel>
  );
}
