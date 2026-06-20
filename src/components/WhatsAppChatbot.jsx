import React, { useState } from 'react'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '6281212345678'
const getWhatsAppLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export default function WhatsAppChatbot({ selectedPackage }){
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [note, setNote] = useState('')
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleFiles(e){
    setFiles(Array.from(e.target.files))
  }

  function handleSend(e){
    e.preventDefault()
    if(!name.trim() || !account.trim()){
      setError('Nama dan akun pembayaran wajib diisi.')
      return
    }
    setError('')
    const message = `Halo Admin ReadyLine, saya ingin pesan ${selectedPackage?.title || 'paket'}.%0A` +
      `Nama: ${name}%0A` +
      `Akun: ${account}%0A` +
      `Paket: ${selectedPackage?.title || 'Belum dipilih'}%0A` +
      `Harga: ${selectedPackage ? `Rp${selectedPackage.price.toLocaleString()}` : '-'}%0A` +
      `Catatan: ${note || '-'}%0A` +
      `Saya akan mengirimkan bukti transfer setelah pesan ini. Terima kasih.`

    window.open(getWhatsAppLink(message), '_blank')
    setSent(true)
  }

  return (
    <div className={`whatsapp-chatbot ${open ? 'open' : ''}`}>
      <button className="wa-fab" onClick={() => setOpen(!open)}>
        <span>WA</span>
      </button>

      <div className="chat-panel">
        <div className="chat-header">
          <div>
            <div className="chat-title">Chat WhatsApp</div>
            <div className="chat-subtitle">Kirim detail paket dan akun pembayaran sebelum transfer.</div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)}>×</button>
        </div>

        <form onSubmit={handleSend} className="chat-form">
          <label>Nama Anda</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama lengkap" />

          <label>Akun / Email Pembayaran</label>
          <input value={account} onChange={e => setAccount(e.target.value)} placeholder="Akun bank atau e-wallet" />

          <label>Paket yang Dipilih</label>
          <input value={selectedPackage?.title || 'Belum dipilih'} readOnly />

          <label>Catatan tambahan</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Isi jika ada catatan khusus" />

          <label>Unggah bukti transfer (opsional)</label>
          <input type="file" accept="image/*" multiple onChange={handleFiles} />
          {files.length > 0 && <div className="chat-upload-count">{files.length} file siap dikirim via WA</div>}

          {error && <div className="chat-error">{error}</div>}
          {sent && <div className="chat-success">Pesan WA dibuka. Silakan lampirkan bukti transfer di chat WhatsApp.</div>}

          <button className="cta" type="submit">Kirim ke WhatsApp</button>
        </form>

        <div className="chat-footer">
          Nomor WhatsApp: +{WHATSAPP_NUMBER}
        </div>
      </div>
    </div>
  )
}
