import React from 'react';
import { Check } from 'lucide-react';

export default function AssessmentStepper({ currentStep, onStepClick }) {
  const steps = [
    { number: 1, label: 'Applicant' },
    { number: 2, label: 'Financial' },
    { number: 3, label: 'Credit' },
    { number: 4, label: 'Loan' },
    { number: 5, label: 'Review' },
  ];

  return (
    <div className="glass-soft" style={{
      padding: '0.85rem 1.25rem',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem',
      flexWrap: 'wrap',
      marginBottom: '1.75rem'
    }}>
      {steps.map((step, idx) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;

        return (
          <React.Fragment key={step.number}>
            <div
              onClick={() => onStepClick && onStepClick(step.number)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                cursor: onStepClick ? 'pointer' : 'default',
                opacity: currentStep >= step.number ? 1 : 0.6,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 700,
                background: isCompleted
                  ? 'rgba(34, 160, 107, 0.15)'
                  : isActive
                  ? 'linear-gradient(135deg, #4F7CFF 0%, #3B66E8 100%)'
                  : 'rgba(255, 255, 255, 0.7)',
                color: isCompleted
                  ? '#22A06B'
                  : isActive
                  ? '#ffffff'
                  : 'var(--text-secondary)',
                border: isCompleted
                  ? '1px solid rgba(34, 160, 107, 0.4)'
                  : isActive
                  ? '1px solid rgba(255, 255, 255, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: isActive ? '0 4px 14px rgba(79, 124, 255, 0.35)' : 'none'
              }}>
                {isCompleted ? <Check size={15} strokeWidth={2.5} /> : `0${step.number}`}
              </div>

              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}>
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div style={{
                flex: 1,
                minWidth: '20px',
                height: '2px',
                background: currentStep > step.number ? 'rgba(34, 160, 107, 0.4)' : 'rgba(203, 213, 225, 0.5)',
                borderRadius: '2px'
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
