import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Shield, Sparkles, Cpu, Database, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { getHealth } from '../services/api';

export default function GlassNav() {
  const [isHealthy, setIsHealthy] = useState(false);

  useEffect(() => {
    const checkApi = () => {
      getHealth()
        .then((res) => setIsHealthy(res.status === 'ok'))
        .catch(() => setIsHealthy(false));
    };

    checkApi();
    const interval = setInterval(checkApi, 15000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: '/', label: 'Overview', icon: Activity },
    { to: '/assess', label: 'Assess', icon: Shield },
    { to: '/intelligence', label: 'Intelligence', icon: Cpu },
    { to: '/insights', label: 'Insights', icon: Database },
  ];

  return (
    <div style={{
      position: 'sticky',
      top: '1.25rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 1.25rem',
      marginBottom: '1.5rem'
    }}>
      <header className="glass-strong" style={{
        borderRadius: '9999px',
        padding: '0.6rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1080px',
        gap: '1.5rem',
        boxShadow: '0 12px 36px rgba(80, 100, 140, 0.12), 0 2px 8px rgba(80, 100, 140, 0.04)'
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4F7CFF 0%, #36CFC9 100%)',
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(79, 124, 255, 0.35)',
            color: '#ffffff'
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>◇</span>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.12rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.1
            }}>
              Credence<span style={{ color: 'var(--accent-primary)' }}>IQ</span>
            </div>
          </div>
        </Link>

        {/* Center Nav Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 1.05rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#4F7CFF' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(79, 124, 255, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(79, 124, 255, 0.25)' : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(79, 124, 255, 0.1)' : 'none'
                })}
              >
                <Icon size={15} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isHealthy ? (
            <div className="glass-badge badge-success" style={{ fontSize: '0.74rem', padding: '0.28rem 0.7rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22A06B' }} />
              <span>Model Online</span>
            </div>
          ) : (
            <div className="glass-badge badge-warning" style={{ fontSize: '0.74rem', padding: '0.28rem 0.7rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D99A24' }} />
              <span>Connecting...</span>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
