import React from 'react'

export default function PaymentValidation({pkg, onUploadProof, paymentStatus, paymentProof}){
  const waMessage = encodeURIComponent(`Halo Admin ReadyLine, saya memilih ${pkg.title} (Rp${pkg.price.toLocaleString()}). Mohon instruksi pembayaran.`)
  const waLink = `https://wa.me/6281212345678?text=${waMessage}`

  function handleFile(e){
    const f = e.target.files && e.target.files[0]
    if(f && onUploadProof) onUploadProof(f)
  }

  return (
    <div className="card" style={{background:'#071226'}}>
      <h4>Pembayaran</h4>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:800}}>{pkg.title}</div>
          <div style={{color:'var(--muted)'}}>Rp{pkg.price.toLocaleString()} • Estimasi ±{pkg.eta} Hari</div>
        </div>
        <div>
          <a className="cta" href={waLink} target="_blank" rel="noreferrer">WhatsApp Admin</a>
        </div>
      </div>
      <div style={{height:8}} />
      <div style={{color:'var(--muted)'}}>Unggah bukti pembayaran setelah transfer. Admin akan validasi manual.</div>
      <div style={{height:8}} />
      <input type="file" accept="image/*,application/pdf" onChange={handleFile} />
      <div style={{height:8}} />
      <div>
        {paymentStatus==='none' && <div style={{color:'var(--muted)'}}>Belum mengunggah bukti.</div>}
        {paymentStatus==='awaiting' && <div style={{color:'#f59e0b'}}>Menunggu validasi admin — {paymentProof && paymentProof.name}</div>}
        {paymentStatus==='validated' && <div style={{color:'#10b981'}}>Pembayaran tervalidasi. Akun diaktifkan.</div>}
      </div>
    </div>
  )
}
