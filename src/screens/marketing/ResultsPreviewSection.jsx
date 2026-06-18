import React from 'react';
import { T } from '../../lib/theme.js';
import { THRESHOLDS } from '../../lib/thresholds.js';
import { PreviewRingCard } from '../../components/Shared.jsx';

export default function ResultsPreviewSection({ sectionRef }) {
  return (
    <section ref={sectionRef} style={{ maxWidth: 1000, margin: '0 auto', padding: '16px 24px 60px' }}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`, borderRadius: 24,
        padding: '36px 28px', boxShadow: '0 16px 40px rgba(20,20,30,0.05)',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 18,
      }}>
        <PreviewRingCard label="YouTube" handle="@channelkamu" pct={71} colors={THRESHOLDS.youtube.ring} sub="850 / 1.000 sub" />
        <PreviewRingCard label="TikTok" handle="@kamu.tiktok" pct={62} colors={THRESHOLDS.tiktok.ring} sub="6.200 / 10.000 followers" />
        <PreviewRingCard label="Instagram" handle="@kamu.ig" pct={84} colors={THRESHOLDS.instagram.ring} sub="8.400 / 10.000 followers" />
        <PreviewRingCard label="Facebook" handle="@kamu.fb" pct={45} colors={THRESHOLDS.facebook.ring} sub="4.500 / 10.000 followers*" />
      </div>
      <p style={{ fontSize: 12.5, color: T.textFaint, marginTop: 16, textAlign: 'center' }}>
        Contoh tampilan. Akun Anda akan ditarik langsung setelah connect. *Facebook bersifat invite-only, lihat catatan di FAQ.
      </p>
    </section>
  );
}
