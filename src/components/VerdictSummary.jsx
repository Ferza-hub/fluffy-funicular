import React from 'react'

export default function VerdictSummary({channel}){
  const subsTarget = 1000
  const hoursTarget = 4000
  const subsGap = Math.max(0, subsTarget - channel.subscribers)
  const hoursGap = Math.max(0, hoursTarget - channel.watchHours)
  const overallPercent = Math.round(((channel.subscribers / subsTarget) + (channel.watchHours / hoursTarget)) / 2 * 100)

  return (
    <div className="card verdict-card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:12,color:'var(--muted)'}}>STATUS CHANNEL</div>
          <div style={{fontSize:22,fontWeight:800,marginTop:6}}>🟡 HAMPIR SIAP</div>
        </div>
        <div style={{fontSize:28,fontWeight:800}}>{overallPercent}%</div>
      </div>

      <div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div className="mini-card">
          <div style={{fontSize:13,color:'var(--muted)'}}>Kurang Subscriber</div>
          <div style={{fontSize:20,fontWeight:700}}>{subsGap}</div>
        </div>
        <div className="mini-card">
          <div style={{fontSize:13,color:'var(--muted)'}}>Kurang Jam Tayang</div>
          <div style={{fontSize:20,fontWeight:700}}>{hoursGap}</div>
        </div>
      </div>

      <div style={{marginTop:16,color:'var(--muted)'}}>Estimasi: 47 Hari Lagi</div>
    </div>
  )
}
