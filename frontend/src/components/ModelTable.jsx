import React from 'react';
import { Award, Zap } from 'lucide-react';
import GlassPanel from './GlassPanel';

export default function ModelTable({ comparisonData = [], cvData = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Comparison Table */}
      <GlassPanel variant="standard" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Award size={20} color="#4F7CFF" />
              <span>Model Benchmark Comparison</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Hold-out test dataset evaluation on 51,070 unseen loan applicant records.
            </p>
          </div>
          <span className="glass-badge badge-primary">7 Models Benchmarked</span>
        </div>

        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Model Architecture</th>
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1 Score</th>
                <th>ROC-AUC</th>
                <th>PR-AUC</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => {
                const isSelected = row.Model.includes('HistGradient');
                return (
                  <tr key={idx} style={{
                    background: isSelected ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                    fontWeight: isSelected ? 700 : 400
                  }}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isSelected && <Award size={15} color="#4F7CFF" />}
                      <span>{row.Model}</span>
                      {isSelected && (
                        <span className="glass-badge badge-primary" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                          Active
                        </span>
                      )}
                    </td>
                    <td>{(row.Accuracy * 100).toFixed(2)}%</td>
                    <td>{(row.Precision * 100).toFixed(2)}%</td>
                    <td>{(row.Recall * 100).toFixed(2)}%</td>
                    <td>{(row.F1_Score * 100).toFixed(2)}%</td>
                    <td style={{ color: '#4F7CFF', fontWeight: 700 }}>{row.ROC_AUC.toFixed(4)}</td>
                    <td>{row.PR_AUC.toFixed(4)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      {/* 2. 5-Fold Stratified Cross-Validation */}
      {cvData.length > 0 && (
        <GlassPanel variant="standard" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Zap size={20} color="#22A06B" />
                <span>5-Fold Stratified Cross-Validation</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Statistical distribution (Mean ± Std) across 5 stratified dataset partitions.
              </p>
            </div>
            <span className="glass-badge badge-success">Stability Verified</span>
          </div>

          <div className="glass-table-container">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Model Candidate</th>
                  <th>ROC-AUC (Mean ± Std)</th>
                  <th>F1 Score (Mean ± Std)</th>
                  <th>PR-AUC (Mean ± Std)</th>
                </tr>
              </thead>
              <tbody>
                {cvData.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{row.Model}</td>
                    <td style={{ color: '#4F7CFF', fontWeight: 600 }}>
                      {row.ROC_AUC_Mean.toFixed(4)} ± {row.ROC_AUC_Std.toFixed(4)}
                    </td>
                    <td>
                      {row.F1_Mean.toFixed(4)} ± {row.F1_Std.toFixed(4)}
                    </td>
                    <td>
                      {row.PR_AUC_Mean.toFixed(4)} ± {row.PR_AUC_Std.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
