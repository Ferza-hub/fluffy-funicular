import React from 'react';
import { T } from '../../lib/theme.js';
import { PACKAGES } from '../../lib/thresholds.js';
import { formatIDR } from '../../lib/format.js';

export default function PricingPreviewSection({ onStart, sectionRef }) {
  return (
    <section ref={sectionRef} style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 24px 70px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12.5, color: T.brand, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>Pricing</div>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Paket disesuaikan setelah diagnosa akun Anda</h2>
        <p style={{ fontSize: 14, color: T.textMute, marginTop: 8 }}>Ini gambaran umum. Rekomendasi sebenarnya muncul setelah akun Anda terhubung.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {PACKAGES.map(pkg => (
          <div key={pkg.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: 22, boxShadow: '0 4px 14px rgba(20,20,30,0.04)' }}>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{pkg.name}</div>
            <div style={{ fontSize: 12.5, color: T.textMute, marginBottom: 14, minHeight: 32, lineHeight: 1.5 }}>{pkg.desc}</div>
            <div className="mono" style={{ fontSize: 21, fontWeight: 800, marginBottom: 2 }}>{formatIDR(pkg.price)}</div>
            <div style={{ fontSize: 12, color: T.textFaint }}>review ~{pkg.days} hari</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button onClick={onStart} style={{ background: T.brand, color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 700, fontSize: 14.5, cursor: 'pointer', boxShadow: '0 10px 24px rgba(255,59,92,0.2)' }}>
          Hubungkan akun untuk lihat paket Anda
        </button>
      </div>
    </section>
  );
}
