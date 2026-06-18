import React from 'react';
import { T } from '../../lib/theme.js';
import { THRESHOLDS } from '../../lib/thresholds.js';

// Anonymous testimonials: initials + account niche only, no real names
// or photos. Specific detail (the exact bottleneck, the exact number)
// is what makes these feel credible — anonymity is what makes them feel
// safe to have written in the first place, for a category most people
// don't want to be seen needing.
const TESTIMONIALS = [
  {
    initials: 'R.A.',
    niche: 'Channel gaming, 40K subscriber',
    platform: 'youtube',
    quote: 'Saya kira followers yang kurang. Ternyata watch time saya cuma separuh ambang — empat bulan stuck tanpa tahu sebabnya.',
  },
  {
    initials: 'N.P.',
    niche: 'Konten kuliner, akun rintisan',
    platform: 'tiktok',
    quote: 'Baru sadar views 30 hari saya jauh di bawah followers. Selama ini fokus nambah followers, padahal itu bukan bottleneck-nya.',
  },
  {
    initials: 'D.S.',
    niche: 'Lifestyle & fashion, akun menengah',
    platform: 'instagram',
    quote: 'Engagement rate saya ternyata yang jadi masalah, bukan jumlah followers. Hal yang tidak pernah saya cek sebelumnya.',
  },
];

export default function TestimonialSection({ sectionRef }) {
  return (
    <section ref={sectionRef} style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 24px 70px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ marginBottom: 32, maxWidth: 560 }}>
        <div style={{ fontSize: 12.5, color: T.brand, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>Dari kreator lain</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Identitas disamarkan, hasil diagnosa tidak</h2>
        <p style={{ fontSize: 14, color: T.textMute, lineHeight: 1.6 }}>Kami sembunyikan nama lengkap dan foto atas permintaan kreator yang membagikan ini — yang penting adalah apa yang mereka temukan, bukan siapa mereka.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {TESTIMONIALS.map((t, i) => {
          const ring = THRESHOLDS[t.platform]?.ring || [T.brand, T.brand];
          return (
            <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, boxShadow: '0 4px 14px rgba(20,20,30,0.04)' }}>
              <p style={{ fontSize: 13.5, color: T.text, lineHeight: 1.6, marginBottom: 16, minHeight: 84 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${ring.join(',')})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
                  {t.initials.replace('.', '').slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{t.initials}</div>
                  <div style={{ fontSize: 11, color: T.textFaint }}>{t.niche}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
