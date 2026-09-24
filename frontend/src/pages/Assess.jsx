import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Shield, Sparkles, User, DollarSign, CreditCard, FileText } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import AssessmentStepper from '../components/AssessmentStepper';
import ReviewPanel from '../components/ReviewPanel';
import RiskResult from '../components/RiskResult';
import { predictLoan } from '../services/api';

export default function Assess() {
  const defaultValues = {
    Age: 35,
    Income: 65000,
    LoanAmount: 20000,
    CreditScore: 710,
    MonthsEmployed: 48,
    NumCreditLines: 3,
    InterestRate: 9.5,
    LoanTerm: 36,
    DTIRatio: 0.35,
    Education: "Bachelor's",
    EmploymentType: "Full-time",
    MaritalStatus: "Married",
    HasMortgage: "No",
    HasDependents: "No",
    LoanPurpose: "Auto",
    HasCoSigner: "Yes"
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const handleToggle = (name, val) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const applyPreset = (tier) => {
    if (tier === 'low') {
      setFormData({
        Age: 45,
        Income: 95000,
        LoanAmount: 18000,
        CreditScore: 780,
        MonthsEmployed: 96,
        NumCreditLines: 4,
        InterestRate: 5.5,
        LoanTerm: 36,
        DTIRatio: 0.22,
        Education: "Master's",
        EmploymentType: "Full-time",
        MaritalStatus: "Married",
        HasMortgage: "No",
        HasDependents: "Yes",
        LoanPurpose: "Home",
        HasCoSigner: "Yes"
      });
    } else if (tier === 'moderate') {
      setFormData({
        Age: 32,
        Income: 48000,
        LoanAmount: 25000,
        CreditScore: 640,
        MonthsEmployed: 36,
        NumCreditLines: 3,
        InterestRate: 12.0,
        LoanTerm: 48,
        DTIRatio: 0.45,
        Education: "Bachelor's",
        EmploymentType: "Part-time",
        MaritalStatus: "Single",
        HasMortgage: "Yes",
        HasDependents: "No",
        LoanPurpose: "Auto",
        HasCoSigner: "No"
      });
    } else if (tier === 'high') {
      setFormData({
        Age: 24,
        Income: 22000,
        LoanAmount: 45000,
        CreditScore: 490,
        MonthsEmployed: 8,
        NumCreditLines: 7,
        InterestRate: 21.5,
        LoanTerm: 60,
        DTIRatio: 0.72,
        Education: "High School",
        EmploymentType: "Unemployed",
        MaritalStatus: "Divorced",
        HasMortgage: "No",
        HasDependents: "Yes",
        LoanPurpose: "Business",
        HasCoSigner: "No"
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await predictLoan(formData);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultValues);
    setResult(null);
    setError(null);
    setCurrentStep(1);
  };

  const handleEdit = () => {
    setResult(null);
    setCurrentStep(5);
  };

  // If prediction result is present, render the dedicated glass result screen!
  if (result) {
    return <RiskResult result={result} onReset={handleReset} onEdit={handleEdit} />;
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Header Card */}
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
          Credit Risk Assessment
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Follow the 5-step evaluation wizard to assess applicant default risk.
        </p>
      </div>

      {/* Stepper Progress */}
      <AssessmentStepper currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />

      {/* Main Glass Form Wizard Container */}
      <GlassPanel variant="strong" style={{ padding: '2.25rem' }}>
        {error && (
          <div style={{
            background: 'rgba(224, 82, 96, 0.1)',
            border: '1px solid rgba(224, 82, 96, 0.3)',
            borderRadius: '12px',
            padding: '0.85rem 1.25rem',
            color: '#b52b39',
            fontSize: '0.88rem',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        {/* STEP 1: APPLICANT PROFILE */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              <User size={18} />
              <span>Step 1: Applicant Demographics</span>
            </div>

            <div className="grid-2">
              <div className="glass-input-group">
                <label className="glass-label">Applicant Age (Years)</label>
                <input
                  type="number"
                  name="Age"
                  className="glass-input"
                  min="18"
                  max="100"
                  value={formData.Age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Highest Education Level</label>
                <select name="Education" className="glass-select" value={formData.Education} onChange={handleChange}>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="PhD">Doctorate (PhD)</option>
                </select>
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Employment Classification</label>
                <select name="EmploymentType" className="glass-select" value={formData.EmploymentType} onChange={handleChange}>
                  <option value="Full-time">Full-Time Salaried</option>
                  <option value="Part-time">Part-Time</option>
                  <option value="Self-employed">Self-Employed / Business</option>
                  <option value="Unemployed">Currently Unemployed</option>
                </select>
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Marital Status</label>
                <select name="MaritalStatus" className="glass-select" value={formData.MaritalStatus} onChange={handleChange}>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn-glass-primary" onClick={() => setCurrentStep(2)}>
                Next: Financial Capacity <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FINANCIAL CAPACITY */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              <DollarSign size={18} />
              <span>Step 2: Financial Capacity</span>
            </div>

            <div className="grid-2">
              <div className="glass-input-group">
                <label className="glass-label">Annual Income ($)</label>
                <input
                  type="number"
                  name="Income"
                  className="glass-input"
                  min="0"
                  step="1000"
                  value={formData.Income}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Requested Loan Amount ($)</label>
                <input
                  type="number"
                  name="LoanAmount"
                  className="glass-input"
                  min="500"
                  step="500"
                  value={formData.LoanAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Interest Rate (%)</label>
                <input
                  type="number"
                  name="InterestRate"
                  className="glass-input"
                  min="0.1"
                  max="40"
                  step="0.1"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Debt-to-Income (DTI) Ratio</label>
                <input
                  type="number"
                  name="DTIRatio"
                  className="glass-input"
                  min="0.01"
                  max="1.5"
                  step="0.01"
                  value={formData.DTIRatio}
                  onChange={handleChange}
                  required
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  Standard benchmark range: 0.10 to 0.80
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button type="button" className="btn-glass-secondary" onClick={() => setCurrentStep(1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="button" className="btn-glass-primary" onClick={() => setCurrentStep(3)}>
                Next: Credit Profile <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CREDIT PROFILE */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              <CreditCard size={18} />
              <span>Step 3: Credit History & Lines</span>
            </div>

            <div className="grid-3">
              <div className="glass-input-group">
                <label className="glass-label">Credit Score (300 - 850)</label>
                <input
                  type="number"
                  name="CreditScore"
                  className="glass-input"
                  min="300"
                  max="850"
                  value={formData.CreditScore}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Months Employed</label>
                <input
                  type="number"
                  name="MonthsEmployed"
                  className="glass-input"
                  min="0"
                  max="600"
                  value={formData.MonthsEmployed}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Active Credit Lines</label>
                <input
                  type="number"
                  name="NumCreditLines"
                  className="glass-input"
                  min="0"
                  max="50"
                  value={formData.NumCreditLines}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button type="button" className="btn-glass-secondary" onClick={() => setCurrentStep(2)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="button" className="btn-glass-primary" onClick={() => setCurrentStep(4)}>
                Next: Loan Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: LOAN DETAILS & COLLATERAL */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              <FileText size={18} />
              <span>Step 4: Loan Terms & Collateral</span>
            </div>

            <div className="grid-2">
              <div className="glass-input-group">
                <label className="glass-label">Loan Term (Months)</label>
                <input
                  type="number"
                  name="LoanTerm"
                  className="glass-input"
                  min="12"
                  max="360"
                  step="12"
                  value={formData.LoanTerm}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Loan Purpose</label>
                <select name="LoanPurpose" className="glass-select" value={formData.LoanPurpose} onChange={handleChange}>
                  <option value="Auto">Auto Purchase</option>
                  <option value="Business">Business Expansion</option>
                  <option value="Education">Education Tuition</option>
                  <option value="Home">Home Mortgage / Renovation</option>
                  <option value="Other">Other Personal</option>
                </select>
              </div>

              {/* Segmented Controls for Binary Attributes */}
              <div className="glass-input-group">
                <label className="glass-label">Has Existing Mortgage?</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['No', 'Yes'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggle('HasMortgage', opt)}
                      style={{
                        flex: 1,
                        padding: '0.65rem',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        border: formData.HasMortgage === opt ? '1px solid #4F7CFF' : '1px solid rgba(255,255,255,0.85)',
                        background: formData.HasMortgage === opt ? 'rgba(79, 124, 255, 0.15)' : 'rgba(255,255,255,0.6)',
                        color: formData.HasMortgage === opt ? '#4F7CFF' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-input-group">
                <label className="glass-label">Has Dependents?</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['No', 'Yes'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggle('HasDependents', opt)}
                      style={{
                        flex: 1,
                        padding: '0.65rem',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        border: formData.HasDependents === opt ? '1px solid #4F7CFF' : '1px solid rgba(255,255,255,0.85)',
                        background: formData.HasDependents === opt ? 'rgba(79, 124, 255, 0.15)' : 'rgba(255,255,255,0.6)',
                        color: formData.HasDependents === opt ? '#4F7CFF' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-input-group" style={{ gridColumn: 'span 2' }}>
                <label className="glass-label">Co-Signer Present on Application?</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggle('HasCoSigner', opt)}
                      style={{
                        flex: 1,
                        padding: '0.65rem',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        border: formData.HasCoSigner === opt ? '1px solid #4F7CFF' : '1px solid rgba(255,255,255,0.85)',
                        background: formData.HasCoSigner === opt ? 'rgba(79, 124, 255, 0.15)' : 'rgba(255,255,255,0.6)',
                        color: formData.HasCoSigner === opt ? '#4F7CFF' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt === 'Yes' ? 'Yes (Co-Signer Guaranteed)' : 'No (Individual Liability)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button type="button" className="btn-glass-secondary" onClick={() => setCurrentStep(3)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="button" className="btn-glass-primary" onClick={() => setCurrentStep(5)}>
                Proceed to Review <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & FINAL ASSESSMENT */}
        {currentStep === 5 && (
          <ReviewPanel
            formData={formData}
            onBack={() => setCurrentStep(4)}
            onSubmit={handleSubmit}
            loading={loading}
            onApplyPreset={applyPreset}
          />
        )}
      </GlassPanel>
    </div>
  );
}
