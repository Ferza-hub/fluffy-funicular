import React from 'react';
import { T } from '../lib/theme.js';
import { formatNum } from '../lib/format.js';

export default function MetricRow({ label, value, target, pct, colors }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 7 }}>
        <span style={{ color: T.textMute, fontWeight: 600 }}>{label}</span>
        <span className="mono" style={{ color: T.text, fontWeight: 600 }}>{formatNum(value)} / {formatNum(target)}</span>
      </div>
      <div style={{ height: 7, background: T.bgSoft, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: pct >= 100 ? T.success : `linear-gradient(90deg, ${colors.join(',')})`, borderRadius: 4, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}
