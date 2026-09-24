import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, TrendingUp, Users, Award, Layers, BarChart3, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import MetricStrip from '../components/MetricStrip';
import PerformanceChart from '../components/PerformanceChart';
import { getMetrics, getInsights } from '../services/api';

export default function Overview() {
  const [metrics, setMetrics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMetrics().catch(() => ({})),
      getInsights().catch(() => ({}))
    ])
      .then(([m, i]) => {
        setMetrics(m);
        setInsights(i);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* 1. Large Asymmetric Glass Hero Section */}
      <GlassPanel variant="strong" style={{
        padding: '3rem 2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <span className="glass-badge badge-primary">
                <Sparkles size={13} />
                <span>CredenceIQ Risk Engine</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                v1.0 Production Classifier
              </span>
            </div>

            <h1 style={{
              fontSize: '3rem',
              fontWeight: 800,
              lineHeight: 1.12,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em'
            }}>
              Intelligent Credit <span style={{
                background: 'linear-gradient(135deg, #4F7CFF 0%, #36CFC9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Risk Analysis</span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '560px'
            }}>
              AI-powered loan default classification and risk intelligence. Evaluate applicant profiles, 
              quantify default probability, and calibrate underwriting thresholds with calibrated machine learning.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link to="/assess" className="btn-glass-primary">
                Assess Applicant <ArrowRight size={18} />
              </Link>
              <Link to="/intelligence" className="btn-glass-secondary">
                Explore Model Intelligence
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={14} color="#22A06B" /> 255,347 Applications Analyzed
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={14} color="#22A06B" /> HistGradientBoosting Model
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Glass Risk Signal Preview */}
          <div>
            <GlassPanel variant="highlight" style={{
              padding: '2rem',
              borderRadius: '24px',
              border: '1px solid rgba(79, 124, 255, 0.35)',
              boxShadow: '0 16px 40px rgba(79, 124, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--accent-primary)'
                }}>
                  Live Signal Simulation
                </span>
                <span className="glass-badge badge-danger">High Risk Signal</span>
              </div>

              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.6rem',
                  fontWeight: 800,
                  color: 'var(--status-danger)',
                  lineHeight: 1
                }}>
                  67.2%
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginTop: '0.35rem'
                }}>
                  Default Probability
                </div>
              </div>

              {/* Progress track */}
              <div style={{
                height: '10px',
                borderRadius: '9999px',
                background: 'rgba(203, 213, 225, 0.4)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '67.2%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #D99A24 0%, #E05260 100%)',
                  borderRadius: '9999px'
                }} />
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.7)',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                lineHeight: 1.45,
                border: '1px solid rgba(255, 255, 255, 0.9)'
              }}>
                <strong>Predicted outcome:</strong> Higher probability of default. Secondary underwriting review suggested.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.6)', padding: '0.65rem', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>MODEL ROC-AUC</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.1rem' }}>0.757</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.6)', padding: '0.65rem', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>RECALL SENSITIVITY</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22A06B', marginTop: '0.1rem' }}>68.7%</div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </GlassPanel>

      {/* 2. Model Snapshot (Varied Glass Panels) */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
            Model Performance Snapshot
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Key statistical metrics evaluated on 51,070 hold-out test samples.
          </p>
        </div>

        <div className="grid-4">
          <MetricStrip
            label="ROC-AUC Score"
            value="0.757"
            subtitle="Receiver Operating Characteristic"
            icon={Award}
            accentColor="#4F7CFF"
            variant="standard"
          />
          <MetricStrip
            label="Recall (Sensitivity)"
            value="68.7%"
            subtitle="Identifies ~69% of true defaults"
            icon={Shield}
            accentColor="#22A06B"
            variant="success"
          />
          <MetricStrip
            label="F1 Score"
            value="0.343"
            subtitle="Harmonic precision/recall mean"
            icon={TrendingUp}
            accentColor="#6C63FF"
            variant="standard"
          />
          <MetricStrip
            label="Precision-Recall AUC"
            value="0.328"
            subtitle="Calibrated for imbalanced data"
            icon={Layers}
            accentColor="#36CFC9"
            variant="standard"
          />
        </div>
      </div>

      {/* 3. Portfolio Risk Distribution (Large Glass Visualization) */}
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
              <Database size={20} color="#4F7CFF" />
              <span>Portfolio Risk Distribution</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Historical class distribution across 255,347 loan applications.
            </p>
          </div>
          <span className="glass-badge badge-warning">Imbalance Ratio: 7.61 : 1</span>
        </div>

        {/* Dual Colored Glass Progress Track */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            height: '36px',
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
              Non-Default: 88.38%
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
              Default: 11.61%
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div>
              <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#4F7CFF', marginRight: '6px' }} />
              <strong>225,694</strong> Paid On-Time (Non-Default)
            </div>
            <div>
              <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#E05260', marginRight: '6px' }} />
              <strong>29,653</strong> Incurred Default
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* 4. Visual Analytics Gallery */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} color="#4F7CFF" />
              <span>Diagnostic Visual Analytics</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Model validation curves and classification performance.
            </p>
          </div>
        </div>

        <div className="grid-2">
          <PerformanceChart
            title="ROC-AUC Curve Comparison"
            filename="roc_curve.png"
            description="Comparison of True Positive Rate vs False Positive Rate. The HistGradientBoosting model (AUC 0.757) demonstrates high discriminatory capability across all decision thresholds."
          />
          <PerformanceChart
            title="Precision-Recall Curve"
            filename="precision_recall_curve.png"
            description="Evaluates the trade-off between precision and recall, capturing model sensitivity on the minority default class."
          />
        </div>
      </div>
    </div>
  );
}
