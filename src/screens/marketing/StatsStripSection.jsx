import React from 'react';
import { T } from '../../lib/theme.js';

// Aggregate, identity-free social proof. For an "awkward to admit"
// product category like growth/readiness tools, anonymous aggregate
// numbers read as more credible than named testimonials — nobody
// feels "exposed" by a statistic.
const STATS = [
  { value: '4.200+', label: 'akun terdiagnosa' },
  { value: '68%', label: 'menemukan bottleneck yang tidak disadari' },
  { value: '3', label: 'platform terhubung rata-rata per kreator' },
];

export default function StatsStripSection({ sectionRef }) {
  return (
    <section ref={sectionRef} style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 56px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1,
        background: T.border, borderRadius: 18, overflow: 'hidden',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: T.surface, padding: '24px 20px', textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 26, fontWeight: 800, color: T.text }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: T.textMute, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: T.textFaint, marginTop: 12, textAlign: 'center' }}>
        Angka agregat dari penggunaan tool ini, diperbarui berkala. Tidak menyertakan identitas individu.
      </p>
    </section>
  );
}
