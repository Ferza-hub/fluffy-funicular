import React from 'react';
import { T } from '../../lib/theme.js';
import { Underline } from '../../components/Shared.jsx';

export default function HeroSection({ onStart, sectionRef }) {
  return (
    <section ref={sectionRef} style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 24px 36px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 100, background: T.brandSoft, fontSize: 12.5, color: T.brand, fontWeight: 600, marginBottom: 26 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.brand, display: 'inline-block' }} />
        Live readiness tracker — bukan jasa beli followers
      </div>

      <h1 style={{ fontSize: 'clamp(32px, 5.4vw, 52px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: -1, margin: 0, maxWidth: 700 }}>
        Anda tidak jauh dari <Underline>monetized.</Underline>
        <br />
        <span style={{ color: T.textMute }}>Tapi Anda tidak tahu seberapa jauh.</span>
      </h1>

      <p style={{ fontSize: 16.5, color: T.textMute, maxWidth: 560, marginTop: 22, lineHeight: 1.65 }}>
        Readyline membaca data resmi akun YouTube, TikTok, Instagram, dan Facebook Anda, mengukur jarak ke ambang monetisasi yang sebenarnya, lalu menunjukkan satu hal yang menahan Anda.
      </p>

      <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={onStart} style={{
          background: T.text, color: '#fff', border: 'none', borderRadius: 14,
          padding: '15px 26px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        }}>
          Cek jarak akun saya →
        </button>
        <div style={{ fontSize: 13, color: T.textFaint }}>Login resmi · tanpa kartu pembayaran</div>
      </div>
    </section>
  );
}
