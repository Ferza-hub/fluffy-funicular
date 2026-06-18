import React from 'react';
import { T } from '../lib/theme.js';
import StoryRing from './StoryRing.jsx';

export function Spinner() {
  return (
    <div style={{ width: 32, height: 32, border: `3px solid ${T.bgSoft}`, borderTopColor: T.brand, borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function BackLink({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', color: T.textMute, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
      ← {children}
    </button>
  );
}

export function LabeledInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <div style={{ fontSize: 12.5, color: T.textMute, marginBottom: 6, fontWeight: 600 }}>{label}</div>
      <input
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type="number"
        style={{ width: '100%', background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 12, padding: '13px 16px', color: T.text, fontSize: 15 }}
      />
    </div>
  );
}

export function Underline({ children }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg style={{ position: 'absolute', left: 0, bottom: -4, width: '100%', height: 10 }} viewBox="0 0 200 10" preserveAspectRatio="none">
        <path d="M2,7 Q100,1 198,7" stroke={T.brand} strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function FeatureBlock({ dot, title, body }) {
  return (
    <div>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: dot, display: 'inline-block', marginBottom: 14 }} />
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13.8, color: T.textMute, lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

export function PreviewRingCard({ label, handle, pct, colors, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <StoryRing pct={pct} colors={colors} size={96} thickness={7}>
        <div className="mono" style={{ fontSize: 18, fontWeight: 700 }}>{pct}%</div>
      </StoryRing>
      <div style={{ marginTop: 14, fontSize: 13.5, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 11.5, color: T.textFaint, marginTop: 2 }}>{handle}</div>
      <div style={{ fontSize: 11, color: T.textMute, marginTop: 6 }}>{sub}</div>
    </div>
  );
}

export function CompareRow({ ok, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: `1px solid ${T.border}`, fontSize: 13.5 }}>
      <span style={{ color: ok ? T.success : T.brand, fontWeight: 800 }}>{ok ? '✓' : '✕'}</span>
      <span style={{ color: ok ? T.text : T.textMute }}>{label}</span>
    </div>
  );
}

export function TabButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? T.text : T.surface, color: active ? '#fff' : T.textMute,
      border: `1px solid ${active ? T.text : T.border}`, borderRadius: 10,
      padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    }}>
      {children}
    </button>
  );
}
