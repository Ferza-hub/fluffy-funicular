import React from 'react';
import { T } from '../../lib/theme.js';
import { CompareRow } from '../../components/Shared.jsx';

export default function AboutToolSection({ sectionRef }) {
  return (
    <section ref={sectionRef} style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 24px 70px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 12.5, color: T.brand, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>Tentang tool ini</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Bagaimana Readyline menghitung posisi Anda</h2>
          <p style={{ fontSize: 14.5, color: T.textMute, lineHeight: 1.7, marginBottom: 16 }}>
            Setelah Anda menghubungkan akun, kami mengambil metrik inti yang dipakai tiap platform untuk menentukan kelayakan program partner mereka — subscriber dan jam tonton untuk YouTube, followers dan engagement untuk Instagram, dan seterusnya.
          </p>
          <p style={{ fontSize: 14.5, color: T.textMute, lineHeight: 1.7 }}>
            Dari situ kami menghitung beberapa indikator turunan: seberapa jenuh audiens Anda relatif terhadap ambang (saturation index), seberapa cepat konten Anda menjangkau penonton baru (reach velocity), dan estimasi berapa lama proses verifikasi internal kami akan berjalan setelah ambang tercapai.
          </p>
        </div>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: 24, boxShadow: '0 8px 24px rgba(20,20,30,0.04)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.textMute, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 16 }}>Apa yang kami lakukan vs tidak</div>
          <CompareRow ok label="Membaca data resmi akun Anda" />
          <CompareRow ok label="Menghitung gap ke ambang resmi platform" />
          <CompareRow ok label="Mempercepat antrian review internal kami" />
          <CompareRow ok={false} label="Membeli atau menyuntikkan followers/views" />
          <CompareRow ok={false} label="Mengubah angka resmi akun Anda" />
          <CompareRow ok={false} label="Menjamin keputusan monetisasi platform" />
        </div>
      </div>
    </section>
  );
}
