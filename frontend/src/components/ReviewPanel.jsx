import React from 'react';
import { ArrowLeft, Sparkles, User, DollarSign, CreditCard, FileCheck } from 'lucide-react';
import GlassPanel from './GlassPanel';

export default function ReviewPanel({ formData, onBack, onSubmit, loading, onApplyPreset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Presets bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.85rem 1.25rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.55)',
        border: '1px solid rgba(255, 255, 255, 0.8)'
      }}>
        <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Test Presets:
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn-glass-secondary btn-glass-sm" onClick={() => onApplyPreset('low')}>
            🟢 Prime Borrower
          </button>
          <button type="button" className="btn-glass-secondary btn-glass-sm" onClick={() => onApplyPreset('moderate')}>
            🟡 Near-Prime
          </button>
          <button type="button" className="btn-glass-secondary btn-glass-sm" onClick={() => onApplyPreset('high')}>
            🔴 Subprime Borrower
          </button>
        </div>
      </div>

      {/* 4 Glass Summary Cards */}
      <div className="grid-2">
        {/* 1. Applicant */}
        <GlassPanel variant="soft" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '0.92rem' }}>
            <User size={16} />
            <span>Applicant Profile</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', fontSize: '0.86rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Age:</span> <strong>{formData.Age} yrs</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Education:</span> <strong>{formData.Education}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Employment:</span> <strong>{formData.EmploymentType}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Marital:</span> <strong>{formData.MaritalStatus}</strong></div>
          </div>
        </GlassPanel>

        {/* 2. Financial */}
        <GlassPanel variant="soft" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '0.92rem' }}>
            <DollarSign size={16} />
            <span>Financial Capacity</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', fontSize: '0.86rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Annual Income:</span> <strong>${Number(formData.Income).toLocaleString()}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Loan Amount:</span> <strong>${Number(formData.LoanAmount).toLocaleString()}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Interest Rate:</span> <strong>{formData.InterestRate}%</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>DTI Ratio:</span> <strong>{formData.DTIRatio}</strong></div>
          </div>
        </GlassPanel>

        {/* 3. Credit Profile */}
        <GlassPanel variant="soft" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '0.92rem' }}>
            <CreditCard size={16} />
            <span>Credit History</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', fontSize: '0.86rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Credit Score:</span> <strong>{formData.CreditScore}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Months Employed:</span> <strong>{formData.MonthsEmployed} mo</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Active Credit Lines:</span> <strong>{formData.NumCreditLines}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Co-Signer:</span> <strong>{formData.HasCoSigner}</strong></div>
          </div>
        </GlassPanel>

        {/* 4. Loan Specifics */}
        <GlassPanel variant="soft" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '0.92rem' }}>
            <FileCheck size={16} />
            <span>Loan Terms</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', fontSize: '0.86rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Loan Term:</span> <strong>{formData.LoanTerm} mo</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Purpose:</span> <strong>{formData.LoanPurpose}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Mortgage:</span> <strong>{formData.HasMortgage}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Dependents:</span> <strong>{formData.HasDependents}</strong></div>
          </div>
        </GlassPanel>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <button type="button" className="btn-glass-secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Previous Step
        </button>

        <button
          type="button"
          className="btn-glass-primary"
          onClick={onSubmit}
          disabled={loading}
          style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
        >
          {loading ? (
            <span>Computing Risk Signal...</span>
          ) : (
            <>
              <Sparkles size={18} /> RUN RISK ASSESSMENT →
            </>
          )}
        </button>
      </div>
    </div>
  );
}
