import React from 'react';
import { T } from '../lib/theme.js';

export default function DiagStat({ label, value, note, highlight }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${highlight ? T.brand : T.border}`, borderRadius: 14,
      padding: '16px 18px', boxShadow: '0 4px 14px rgba(20,20,30,0.04)',
    }}>
      <div style={{ fontSize: 11, color: T.textFaint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 8 }}>{label}</div>
      <div className="mono" style={{ fontSize: 19, fontWeight: 800, color: highlight ? T.brand : T.text, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: T.textMute }}>{note}</div>
    </div>
  );
}
