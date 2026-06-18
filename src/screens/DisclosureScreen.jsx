import React from 'react';
import { T } from '../lib/theme.js';
import { formatIDR } from '../lib/format.js';

// Shown right after a package "purchase" click. No payment is processed;
// this is the research consent surface, intentionally placed post-click
// to preserve authentic price/urgency reaction data pre-click.
export default function DisclosureScreen({ pkg, onAcknowledge }) {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '90px 24px', textAlign: 'center' }}>
      <div style={{ width: 50, height: 50, borderRadius: '50%', background: T.brandSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 22 }}>
        ℹ️
      </div>
      <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 14 }}>Belum ada transaksi yang berjalan</h2>
      <p style={{ fontSize: 14.5, color: T.textMute, lineHeight: 1.7, marginBottom: 8 }}>
        Halaman ini adalah bagian dari riset produk. Tidak ada pembayaran yang diproses dan paket "{pkg.name}" ({formatIDR(pkg.price)}) belum benar-benar dibeli. Laporan diagnostik yang Anda lihat memang dihitung dari data akun Anda yang sebenarnya, tapi proyeksi waktunya adalah simulasi untuk riset, bukan komitmen layanan.
      </p>
      <p style={{ fontSize: 14.5, color: T.textMute, lineHeight: 1.7, marginBottom: 32 }}>
        Kami mengukur bagaimana kreator merespons pilihan harga dan kecepatan ini sebelum produk ini benar-benar dirilis. Data akun yang Anda hubungkan tetap nyata dan tidak kami simpan untuk tujuan lain.
      </p>
      <button onClick={onAcknowledge} style={{ background: T.text, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 14.5 }}>
        Mengerti, kembali ke dashboard
      </button>
    </div>
  );
}
