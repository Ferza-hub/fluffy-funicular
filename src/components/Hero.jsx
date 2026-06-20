import React from 'react'

export default function Hero(){
  return (
    <section className="hero">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 320px'}}>
          <h1>Sudah Upload Ratusan Video Tapi Belum Monetisasi?</h1>
          <p style={{color:'var(--muted)',margin:'14px 0 0',maxWidth:560}}>
            Lihat posisi channel Anda sekarang. Ketahui jarak menuju syarat monetisasi. Pilih jalur yang paling cocok.
          </p>
        </div>
        <div>
          <button className="cta" onClick={onStart}>Cek Channel Saya</button>
        </div>
      </div>
    </section>
  )
}
