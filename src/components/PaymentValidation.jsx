import React from 'react'

export default function PaymentValidation({pkg, onCheckout}){
  const waMessage = encodeURIComponent(`Halo Admin ReadyLine, saya memilih ${pkg.title} (Rp${pkg.price.toLocaleString()}). Mohon instruksi pembayaran.`)
  const waLink = `https://wa.me/6281212345678?text=${waMessage}`

  return (
    <div className="card checkout-card">
      <h4>Checkout</h4>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
        <div>
          <div style={{fontWeight:800}}>{pkg.title}</div>
          <div style={{color:'var(--muted)',marginTop:6}}>Rp{pkg.price.toLocaleString()} • Target ±{pkg.eta} Hari</div>
        </div>
        <div>
          <a className="cta" href={waLink} target="_blank" rel="noreferrer" onClick={onCheckout}>WhatsApp Admin</a>
        </div>
      </div>
      <div style={{marginTop:16,color:'var(--muted)'}}>Untuk MVP, checkout hanya melalui WhatsApp. Setelah mengirim pesan, Anda akan langsung masuk ke dashboard.</div>
    </div>
  )
}
