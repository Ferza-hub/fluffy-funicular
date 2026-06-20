import React, { useState } from 'react'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '6281212345678'
const createWhatsAppLink = (pkg) => {
  const message = `Halo Admin ReadyLine, saya ingin memesan ${pkg.title} (Rp${pkg.price.toLocaleString()}). Mohon instruksi pembayaran dan info rekening / e-wallet.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function PaymentValidation({pkg, onCheckout}){
  const [showModal, setShowModal] = useState(false)

  function handleStartCheckout(){
    window.open(createWhatsAppLink(pkg), '_blank')
    setShowModal(true)
  }

  return (
    <>
      <div className="card checkout-card">
        <h4>Checkout</h4>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
          <div>
            <div style={{fontWeight:800}}>{pkg.title}</div>
            <div style={{color:'var(--muted)',marginTop:6}}>Rp{pkg.price.toLocaleString()} • Target ±{pkg.eta} Hari</div>
          </div>
          <div>
            <button className="cta" type="button" onClick={handleStartCheckout}>WhatsApp Admin</button>
          </div>
        </div>
        <div style={{marginTop:16,color:'var(--muted)'}}>Untuk MVP, checkout hanya melalui WhatsApp. Klik tombol, kirim pesan, lalu konfirmasi untuk lanjut ke dashboard.</div>
      </div>

      {showModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal-card">
            <h4>Pesan WhatsApp Dibuka</h4>
            <p>Silakan kirim pesan di WhatsApp dan lampirkan bukti transfer setelah pembayaran selesai. Jika sudah, klik tombol di bawah untuk melanjutkan ke dashboard.</p>
            <div className="checkout-modal-actions">
              <button className="secondary" type="button" onClick={() => setShowModal(false)}>Tutup</button>
              <button className="cta" type="button" onClick={onCheckout}>Lanjut ke Dashboard</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
