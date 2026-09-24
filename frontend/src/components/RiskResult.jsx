import React from 'react';
import { Shield, RotateCcw, ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Activity } from 'lucide-react';
import GlassPanel from './GlassPanel';
import RiskGauge from './RiskGauge';

export default function RiskResult({ result, onReset, onEdit }) {
  if (!result) return null;

  const {
    default_probability,
    default_probability_percent,
    risk_level,
    risk_color,
    message,
    prediction,
    prediction_label,
    risk_factors = [],
    applicant_summary = {}
  } = result;

  const proba = default_probability || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Main Glass Hero Result Panel */}
      <GlassPanel variant="strong" style={{
        textAlign: 'center',
        padding: '2.5rem 2rem',
        border: `1.5px solid ${risk_color}40`,
        boxShadow: `0 16px 48px ${risk_color}18, var(--shadow-glass-lg)`
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }} className="glass-badge badge-primary">
          <Activity size={14} />
          <span>CREDENCEIQ RISK EVALUATION</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '4.2rem',
          fontWeight: 800,
          color: risk_color,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          margin: '0.5rem 0'
        }}>
          {default_probability_percent || `${(proba * 100).toFixed(1)}%`}
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '1.25rem'
        }}>
          Default Probability Assessment
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <div className="glass-badge" style={{
            fontSize: '1rem',
            padding: '0.5rem 1.4rem',
            background: `${risk_color}15`,
            color: risk_color,
            border: `1px solid ${risk_color}40`
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: risk_color }} />
            <span>{risk_level}</span>
          </div>
        </div>

        <div style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Predicted Classification: <strong style={{ color: 'var(--text-primary)' }}>{prediction_label || (prediction === 1 ? 'Default' : 'Non-Default')}</strong>.
          {' '}{message}
        </div>
      </GlassPanel>

      {/* Dynamic Glass Gauge Panel */}
      <GlassPanel variant="standard" style={{ padding: '2rem' }}>
        <RiskGauge probability={proba} riskLevel={risk_level} />
      </GlassPanel>

      {/* Breakdown Details Grid */}
      <div className="grid-2">
        {/* Risk Factors Panel */}
        <GlassPanel variant="standard" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Shield size={18} color={risk_color} />
            Key Predictive Drivers
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            The machine learning model identified these notable factors influencing the borrower's risk score:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {risk_factors.map((factor, idx) => (
              <div key={idx} style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                fontSize: '0.86rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: risk_color, flexShrink: 0 }} />
                <span style={{ color: 'var(--text-primary)' }}>{factor}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Applicant Profile Snapshot */}
        <GlassPanel variant="standard" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            Applicant Financial Snapshot
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Primary financial ratios and capacity indicators submitted for assessment:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.5)',
            padding: '1.15rem',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.85)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Annual Income</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {applicant_summary.Income || 'N/A'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Requested Loan</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {applicant_summary.LoanAmount || 'N/A'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Credit Score</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {applicant_summary.CreditScore || 'N/A'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>DTI Ratio</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {applicant_summary.DTIRatio || 'N/A'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn-glass-secondary" style={{ flex: 1 }} onClick={onEdit}>
              <ArrowLeft size={16} /> Adjust Data
            </button>
            <button type="button" className="btn-glass-primary" style={{ flex: 1 }} onClick={onReset}>
              <RotateCcw size={16} /> New Assessment
            </button>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
