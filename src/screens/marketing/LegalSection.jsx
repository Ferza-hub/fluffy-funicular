import React, { useState } from 'react';
import { T } from '../../lib/theme.js';
import { TabButton } from '../../components/Shared.jsx';

export default function LegalSection({ sectionRef }) {
  const [tab, setTab] = useState('tnc');
  return (
    <section ref={sectionRef} style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 50px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <TabButton active={tab === 'tnc'} onClick={() => setTab('tnc')}>Syarat & Ketentuan</TabButton>
        <TabButton active={tab === 'privacy'} onClick={() => setTab('privacy')}>Privasi</TabButton>
      </div>
      {tab === 'tnc' ? (
        <div style={{ fontSize: 13.5, color: T.textMute, lineHeight: 1.75 }}>
          <p>Readyline adalah produk dalam tahap riset. Dengan menggunakan tool ini, Anda memahami bahwa nilai paket dan estimasi waktu yang ditampilkan adalah bagian dari studi perilaku pengguna, bukan transaksi komersial aktif.</p>
          <p>Readyline tidak menjamin, mempercepat, atau memengaruhi keputusan monetisasi yang dibuat oleh YouTube, TikTok, Instagram (Meta), atau Facebook (Meta). Keputusan tersebut sepenuhnya berada pada kebijakan dan sistem masing-masing platform.</p>
          <p>Readyline tidak menjual, membeli, atau memfasilitasi views, followers, subscriber, atau engagement palsu dalam bentuk apa pun.</p>
        </div>
      ) : (
        <div style={{ fontSize: 13.5, color: T.textMute, lineHeight: 1.75 }}>
          <p>Data yang diambil dari akun yang Anda hubungkan (subscriber, watch time, followers, dan metrik publik lain) digunakan semata untuk menghitung diagnosa kelayakan yang ditampilkan ke Anda, dan untuk keperluan riset produk internal.</p>
          <p>Untuk YouTube, akses dilakukan melalui OAuth resmi Google dengan izin baca terbatas (read-only) — kami tidak dapat memposting, menghapus, atau mengubah apa pun di akun Anda.</p>
          <p>Data tidak dijual ke pihak ketiga. Anda dapat meminta penghapusan data kapan saja.</p>
        </div>
      )}
    </section>
  );
}
