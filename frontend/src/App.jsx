import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlassNav from './components/GlassNav';
import Overview from './pages/Overview';
import Assess from './pages/Assess';
import Intelligence from './pages/Intelligence';
import Insights from './pages/Insights';

export default function App() {
  return (
    <Router>
      {/* Ambient background with blurred glowing orbs */}
      <div className="ambient-container" aria-hidden="true">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="ambient-orb orb-4" />
        <div className="grid-overlay" />
      </div>

      <div className="app-wrapper">
        {/* Floating Glass Navigation */}
        <GlassNav />

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/assess" element={<Assess />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Floating Glass Footer */}
        <footer style={{
          padding: '2rem 1.5rem 3rem',
          textAlign: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div className="glass-soft" style={{
            padding: '1.25rem 2rem',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #4F7CFF 0%, #36CFC9 100%)',
                color: '#fff',
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>◇</span>
              <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>CredenceIQ</strong>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-secondary)' }}>Intelligent Credit Risk Analysis</span>
            </div>

            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              AI-powered loan default classification and risk intelligence
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
