import React from 'react';
import { T } from '../../lib/theme.js';
import { FeatureBlock } from '../../components/Shared.jsx';

export default function SolutionSection({ sectionRef }) {
  return (
    <section ref={sectionRef} style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 24px 70px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 560, marginBottom: 40 }}>
        <div style={{ fontSize: 12.5, color: T.brand, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>Solusi</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Masalahnya bukan kontennya. Masalahnya Anda tidak tahu di mana posisi Anda.</h2>
        <p style={{ fontSize: 15, color: T.textMute, lineHeight: 1.65 }}>
          Kebanyakan kreator yang stuck pra-monetisasi sebenarnya sudah dekat. Yang hilang bukan followers lagi — tapi kejelasan: metrik mana yang jadi penghambat, dan berapa lama proses verifikasi biasanya berjalan setelah ambang tercapai.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
        <FeatureBlock dot={T.yt} title="Diagnosa, bukan tebakan" body="Kami baca data resmi akun Anda dan tunjukkan persis metrik mana yang jadi bottleneck." />
        <FeatureBlock dot={T.ig1} title="Ambang nyata" body="Kami pakai angka kelayakan resmi tiap program partner, bukan target buatan sendiri." />
        <FeatureBlock dot={T.tiktok} title="Tanpa traffic palsu" body="Readyline tidak menjual views atau follower. Yang kami jual adalah kejelasan dan kecepatan proses." />
      </div>
    </section>
  );
}
