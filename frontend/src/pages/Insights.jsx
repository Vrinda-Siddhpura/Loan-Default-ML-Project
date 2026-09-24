import React, { useState, useEffect } from 'react';
import { Database, PieChart, TrendingDown, CheckCircle2, DollarSign, Layers, Info } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import MetricStrip from '../components/MetricStrip';
import SignalBars from '../components/SignalBars';
import { getInsights, getMetrics } from '../services/api';

export default function Insights() {
  const [insights, setInsights] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getInsights().catch(() => ({})),
      getMetrics().catch(() => ({}))
    ])
      .then(([ins, met]) => {
        setInsights(ins);
        setMetrics(met);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <GlassPanel variant="strong" style={{ padding: '2.25rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }} className="glass-badge badge-primary">
          <Database size={14} />
          <span>CredenceIQ Portfolio Analytics</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Risk Insights
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '680px' }}>
          Explore the signals that contribute to model predictions and examine empirical portfolio distributions.
        </p>
      </GlassPanel>

      {/* Dataset Profile Grid */}
      <div className="grid-4">
        <MetricStrip
          label="Portfolio Records"
          value="255,347"
          subtitle="Analyzed loan applications"
          icon={Database}
          accentColor="#4F7CFF"
        />
        <MetricStrip
          label="Cleaned Features"
          value="17"
          subtitle="9 numerical, 7 categorical"
          icon={Layers}
          accentColor="#36CFC9"
        />
        <MetricStrip
          label="Observed Defaults"
          value="29,653"
          subtitle="11.61% portfolio default rate"
          icon={TrendingDown}
          accentColor="#E05260"
        />
        <MetricStrip
          label="Imbalance Ratio"
          value="7.61 : 1"
          subtitle="Non-default to default ratio"
          icon={PieChart}
          accentColor="#D99A24"
        />
      </div>

      {/* Class Distribution Section */}
      <GlassPanel variant="standard" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <PieChart size={20} color="#D99A24" />
              <span>Portfolio Class Distribution</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Proportion of defaulting vs non-defaulting loans in historical portfolio data.
            </p>
          </div>
          <span className="glass-badge badge-warning">Imbalanced Target</span>
        </div>

        {/* Dual Progress Track */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            height: '34px',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255, 255, 255, 0.85)'
          }}>
            <div style={{
              width: '88.38%',
              background: 'linear-gradient(90deg, #4F7CFF 0%, #36CFC9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700
            }}>
              88.4% NO DEFAULT
            </div>
            <div style={{
              width: '11.62%',
              background: 'linear-gradient(90deg, #E05260 0%, #B52B39 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700
            }}>
              11.6% DEFAULT
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div>
              <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#4F7CFF', marginRight: '6px' }} />
              <strong>225,694</strong> Paid on Time (Non-Default)
            </div>
            <div>
              <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#E05260', marginRight: '6px' }} />
              <strong>29,653</strong> Incurred Default
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Predictive Signals Section (SignalBars) */}
      <GlassPanel variant="standard" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Layers size={20} color="#4F7CFF" />
              <span>Predictive Feature Signals</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              The model places greater predictive importance on these top attributes when classifying default risk:
            </p>
          </div>
          <span className="glass-badge badge-primary">Top 10 Importance</span>
        </div>

        <SignalBars features={metrics?.feature_importance || []} />

        <div style={{
          marginTop: '1.25rem',
          background: 'rgba(79, 124, 255, 0.05)',
          border: '1px solid rgba(79, 124, 255, 0.15)',
          borderRadius: '12px',
          padding: '0.85rem 1.15rem',
          display: 'flex',
          gap: '0.65rem',
          alignItems: 'center'
        }}>
          <Info size={16} color="#4F7CFF" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>Methodological Note:</strong> Feature importances represent the mean decrease in model discriminatory capability (ROC-AUC drop) when values are permuted. This quantifies statistical predictive contribution and does not imply direct physical causation.
          </div>
        </div>
      </GlassPanel>

      {/* Financial Feature Distribution Ranges */}
      <GlassPanel variant="standard" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <DollarSign size={20} color="#22A06B" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            Portfolio Feature Benchmark Ranges
          </h3>
        </div>

        <div className="grid-3">
          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>Annual Income</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>$15k - $150k</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Mean: $82,499 | Median: $82,500</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>Loan Amount</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>$5k - $250k</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Mean: $127,578 | Median: $128,000</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>Credit Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>300 - 849</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Mean: 574.3 | Median: 574.0</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>Debt-to-Income (DTI)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>0.10 - 0.90</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Mean: 0.50 | Median: 0.50</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>Interest Rate</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>2.0% - 25.0%</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Mean: 13.5% | Median: 13.5%</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>Applicant Age</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>18 - 69 Years</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Mean: 43.5 Years | Median: 44.0</div>
          </div>
        </div>
      </GlassPanel>

      {/* Strategic Underwriting Observations */}
      <GlassPanel variant="standard" style={{ padding: '2rem', borderLeft: '4px solid #22A06B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <CheckCircle2 size={20} color="#22A06B" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            Underwriting Insights & Observations
          </h3>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#22A06B', fontWeight: 700 }}>•</span>
            <span><strong>DTI Ratio as Primary Signal:</strong> The model places highest predictive importance on debt-to-income ratio, identifying that applicants with DTI &gt; 0.50 exhibit significantly higher default frequency.</span>
          </li>
          <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#22A06B', fontWeight: 700 }}>•</span>
            <span><strong>Interest Rate Compounding:</strong> Elevated loan interest rates strongly correlate with higher default probabilities, indicating that high borrowing costs amplify repayment stress.</span>
          </li>
          <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#22A06B', fontWeight: 700 }}>•</span>
            <span><strong>Co-Signer Protection:</strong> The inclusion of a co-signer significantly lowers default probability, acting as an effective credit risk mitigant across all income levels.</span>
          </li>
        </ul>
      </GlassPanel>
    </div>
  );
}
