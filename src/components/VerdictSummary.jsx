import React from 'react'

export default function VerdictSummary({channel}){
  const isFacebook = channel.source === 'facebook'
  const subsTarget = 1000
  const hoursTarget = 4000
  const contentTarget = 30
  const subsGap = Math.max(0, subsTarget - channel.subscribers)
  const contentCount = isFacebook ? (channel.facebookVideoCount || 0) : (channel.videos || 0)
  const contentGap = Math.max(0, contentTarget - contentCount)
  const hoursGap = Math.max(0, hoursTarget - (channel.watchHours || 0))
  const overallPercent = isFacebook
    ? Math.round(((channel.subscribers / subsTarget) + (contentCount / contentTarget)) / 2 * 100)
    : Math.round(((channel.subscribers / subsTarget) + (channel.watchHours / hoursTarget)) / 2 * 100)

  return (
    <div className="card verdict-card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <div>
          <div style={{fontSize:12,color:'var(--muted)'}}>POSISI ANDA</div>
          <div style={{fontSize:22,fontWeight:800,marginTop:6}}>🟡 HAMPIR SIAP</div>
          <div style={{marginTop:8,fontSize:13,color:'var(--muted)'}}>Platform: {isFacebook ? 'Facebook' : 'YouTube'}</div>
        </div>
        <div style={{fontSize:28,fontWeight:800}}>{overallPercent}%</div>
      </div>

      <div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div className="mini-card">
          <div style={{fontSize:13,color:'var(--muted)'}}>{isFacebook ? 'Kurang Followers' : 'Kurang Subscriber'}</div>
          <div style={{fontSize:20,fontWeight:700}}>{subsGap}</div>
        </div>
        <div className="mini-card">
          <div style={{fontSize:13,color:'var(--muted)'}}>{isFacebook ? 'Kurang Video' : 'Kurang Jam Tayang'}</div>
          <div style={{fontSize:20,fontWeight:700}}>{isFacebook ? contentGap : hoursGap}</div>
        </div>
      </div>

      {isFacebook && (
        <div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div className="mini-card">
            <div style={{fontSize:13,color:'var(--muted)'}}>Jumlah Post</div>
            <div style={{fontSize:20,fontWeight:700}}>{channel.facebookPostCount || 0}</div>
          </div>
          <div className="mini-card">
            <div style={{fontSize:13,color:'var(--muted)'}}>Jumlah Video</div>
            <div style={{fontSize:20,fontWeight:700}}>{channel.facebookVideoCount || 0}</div>
          </div>
        </div>
      )}

      <div style={{marginTop:16,color:'var(--muted)'}}>Estimasi: 47 Hari Lagi</div>
    </div>
  )
}
