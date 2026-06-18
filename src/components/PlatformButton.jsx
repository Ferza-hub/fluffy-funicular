import React from 'react';
import { T } from '../lib/theme.js';

export default function PlatformButton({ label, sub, colors, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16,
      padding: '18px 20px', cursor: 'pointer', color: T.text,
      boxShadow: '0 4px 14px rgba(20,20,30,0.04)',
    }}>
      <span style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg, ${colors.join(',')})`, flexShrink: 0 }} />
      <span>
        <div style={{ fontSize: 15.5, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 12.8, color: T.textMute, marginTop: 2 }}>{sub}</div>
      </span>
      <span style={{ marginLeft: 'auto', color: T.textFaint, fontSize: 18 }}>→</span>
    </button>
  );
}
