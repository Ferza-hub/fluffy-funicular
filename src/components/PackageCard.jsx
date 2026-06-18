import React from 'react';
import { T } from '../lib/theme.js';
import { formatIDR } from '../lib/format.js';
import { SPEED_PRESSURE } from '../lib/thresholds.js';

export default function PackageCard({ pkg, recommended, focused, onFocus, onBlur, onSelect }) {
  const pressure = SPEED_PRESSURE[pkg.id];
  return (
    <div
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      style={{
        background: T.surface,
        border: recommended ? `1.5px solid ${T.brand}` : `1px solid ${T.border}`,
        borderRadius: 18, padding: 22, position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: recommended ? '0 14px 32px rgba(255,59,92,0.14)' : '0 4px 14px rgba(20,20,30,0.04)',
        transition: 'transform 0.15s ease',
        transform: focused ? 'translateY(-3px)' : 'none',
      }}
    >
      {recommended && (
        <div style={{ position: 'absolute', top: -11, left: 22, background: T.brand, color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 11px', borderRadius: 100 }}>
          DISARANKAN UNTUK ANDA
        </div>
      )}
      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, marginTop: recommended ? 6 : 0 }}>{pkg.name}</div>
      <div style={{ fontSize: 12.5, color: T.textMute, marginBottom: 14, minHeight: 32, lineHeight: 1.5 }}>{pkg.desc}</div>
      <div className="mono" style={{ fontSize: 21, fontWeight: 800, marginBottom: 2 }}>{formatIDR(pkg.price)}</div>
      <div style={{ fontSize: 12, color: T.textFaint, marginBottom: 10 }}>review ~{pkg.days} hari</div>

      {/* Speed-pressure copy: only visible for the focused card */}
      <div style={{ minHeight: 28, marginBottom: 8 }}>
        {focused && (
          <div style={{ fontSize: 11.5, color: T.brand, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.brand, display: 'inline-block' }} />
            {pressure.live}
          </div>
        )}
      </div>

      <button onClick={onSelect} style={{
        marginTop: 'auto', background: recommended ? T.brand : T.bg,
        color: recommended ? '#fff' : T.text,
        border: recommended ? 'none' : `1px solid ${T.border}`,
        borderRadius: 11, padding: '11px 0', fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
      }}>
        Pilih {pkg.name}
      </button>
    </div>
  );
}
