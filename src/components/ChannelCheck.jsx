import React, { useState } from 'react'

export default function ChannelCheck({ onConnect }){
  const [channelUrl, setChannelUrl] = useState('')
  const [error, setError] = useState('')

  function connectWithGoogle(){
    const data = { name: 'channelkamu', subscribers: 850, watchHours: 3120, videos: 64 }
    onConnect(data)
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!channelUrl.trim()){
      setError('Masukkan URL channel YouTube Anda.')
      return
    }
    if(!channelUrl.includes('youtube.com')){
      setError('URL tidak valid. Harus berisi youtube.com.')
      return
    }
    setError('')
    const data = { name: 'channelkamu', subscribers: 850, watchHours: 3120, videos: 64 }
    onConnect(data)
  }

  return (
    <div className="channel-check">
      <h4>Channel Check</h4>
      <p className="step-note">Gunakan Google OAuth untuk cek channel YouTube cepat dan otomatis. Jika gagal, masukkan URL channel sebagai alternatif.</p>

      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12}}>
        <button className="cta" onClick={connectWithGoogle}>Hubungkan via Google</button>
        <button className="secondary" onClick={()=>setChannelUrl('')}>Gunakan URL Channel</button>
      </div>

      <form onSubmit={handleSubmit} style={{marginTop:18}}>
        <label style={{display:'block',marginBottom:8,fontSize:13,color:'var(--muted)'}}>URL Channel YouTube</label>
        <input
          className="input"
          value={channelUrl}
          onChange={e=>setChannelUrl(e.target.value)}
          placeholder="https://www.youtube.com/channel/.."
        />
        <div style={{marginTop:12, display:'flex', gap:10}}>
          <button className="cta" type="submit">Gunakan URL ini</button>
          <span style={{alignSelf:'center',color:'var(--muted)'}}>Atau langsung hubungkan akun.</span>
        </div>
      </form>

      {error && <div style={{color:'#f59e0b',marginTop:12}}>{error}</div>}
    </div>
  )
}
