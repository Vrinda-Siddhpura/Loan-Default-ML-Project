import React, { useState, useEffect } from 'react';
import { Cpu, Award, Zap, Sliders, Code2, Layers, BarChart3 } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import MetricStrip from '../components/MetricStrip';
import ModelTable from '../components/ModelTable';
import PerformanceChart from '../components/PerformanceChart';
import { getModelDetails, getMetrics } from '../services/api';

export default function Intelligence() {
  const [metadata, setMetadata] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getModelDetails().catch(() => ({})),
      getMetrics().catch(() => ({}))
    ])
      .then(([meta, met]) => {
        setMetadata(meta);
        setMetrics(met);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <GlassPanel variant="strong" style={{ padding: '2.25rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }} className="glass-badge badge-primary">
          <Cpu size={14} />
          <span>CredenceIQ Analytics Canvas</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Model Intelligence
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '680px' }}>
          Explore how the classifier performs across evaluation metrics, comparative benchmarks, 
          and cross-validation stability.
        </p>
      </GlassPanel>

      {/* Primary Metrics Grid */}
      <div className="grid-3">
        <MetricStrip
          label="Production Classifier"
          value="HistGradientBoosting"
          subtitle="Class-weighted histogram binning"
          icon={Cpu}
          accentColor="#4F7CFF"
        />
        <MetricStrip
          label="Preprocessing Pipeline"
          value="ColumnTransformer"
          subtitle="StandardScaler + OneHotEncoder"
          icon={Layers}
          accentColor="#22A06B"
        />
        <MetricStrip
          label="Validation Strategy"
          value="5-Fold Stratified CV"
          subtitle="Evaluated on F1, ROC-AUC, & PR-AUC"
          icon={Zap}
          accentColor="#D99A24"
        />
      </div>

      {/* Model Benchmark & Cross-Validation Tables */}
      <ModelTable
        comparisonData={metrics?.model_comparison || []}
        cvData={metrics?.cross_validation || []}
      />

      {/* Decision Threshold Analysis Glass Table */}
      {metrics?.threshold_analysis && (
        <GlassPanel variant="standard" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Sliders size={20} color="#4F7CFF" />
                <span>Decision Threshold Calibration</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Impact of decision threshold choice on Precision, Recall, and predicted default volume.
              </p>
            </div>
            <span className="glass-badge badge-neutral">Imbalance Calibration</span>
          </div>

          <div className="glass-table-container">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Threshold</th>
                  <th>Precision</th>
                  <th>Recall (Sensitivity)</th>
                  <th>F1 Score</th>
                  <th>Predicted Defaults</th>
                  <th>Actual Defaults</th>
                </tr>
              </thead>
              <tbody>
                {metrics.threshold_analysis.map((row, idx) => (
                  <tr key={idx} style={{
                    background: row.Threshold === 0.5 ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                    fontWeight: row.Threshold === 0.5 ? 700 : 400
                  }}>
                    <td><strong>{row.Threshold.toFixed(2)}</strong></td>
                    <td>{(row.Precision * 100).toFixed(2)}%</td>
                    <td style={{ color: '#22A06B', fontWeight: 600 }}>{(row.Recall * 100).toFixed(2)}%</td>
                    <td>{(row.F1_Score * 100).toFixed(2)}%</td>
                    <td>{Number(row.Predicted_Defaults).toLocaleString()}</td>
                    <td>{Number(row.Actual_Defaults).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      )}

      {/* First-Principles Scratch Model Formulation */}
      <GlassPanel variant="standard" style={{ padding: '2rem', borderLeft: '4px solid #4F7CFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Code2 size={22} color="#4F7CFF" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
            First-Principles Logistic Regression Implementation
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Vectorized NumPy implementation benchmarked against Scikit-Learn to evaluate foundational convergence.
        </p>

        <div className="grid-3" style={{ gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1.15rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)' }}>1. Sigmoid Hypothesis</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              h_θ(x) = 1 / (1 + e^-(w^T x + b))
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Numerical clipping to [-250, 250] prevents overflow.
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1.15rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)' }}>2. Binary Cross-Entropy</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              J(w,b) = -1/m Σ [y log(h) + (1-y)log(1-h)]
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Log-loss with L2 parameter regularization.
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.55)', padding: '1.15rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)' }}>3. Vectorized Gradients</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              w := w - α/m X^T (h - y)<br />
              b := b - α/m Σ (h - y)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Batch gradient descent updates across 800 epochs.
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Diagnostic Charts */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={20} color="#4F7CFF" />
            <span>Validation Diagnostic Curves</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Diagnostic curves confirming model generalization and loss convergence.
          </p>
        </div>

        <div className="grid-2">
          <PerformanceChart
            title="Confusion Matrix Heatmap"
            filename="confusion_matrix.png"
            description="True Positives, False Positives, True Negatives, and False Negatives evaluated on 51,070 test applicant records."
          />
          <PerformanceChart
            title="Learning Curve"
            filename="learning_curve.png"
            description="Training vs Validation ROC-AUC across dataset sample sizes, demonstrating strong generalization without overfitting."
          />
          <PerformanceChart
            title="Scratch Model Loss Convergence"
            filename="scratch_logistic_loss.png"
            description="Monotonic reduction in Binary Cross-Entropy loss over 800 training iterations for the NumPy implementation."
          />
          <PerformanceChart
            title="Permutation Feature Importances"
            filename="feature_importance.png"
            description="Top features driving classifier decisions ranked by mean drop in ROC-AUC when feature values are permuted."
          />
        </div>
      </div>
    </div>
  );
}
