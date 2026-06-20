import React from 'react'
import PositionCard from './PositionCard'

export default function ProgressDashboard({channel, packageInfo}){
  const subsTarget = 1000
  const hoursTarget = 4000
  const subsGap = Math.max(0, subsTarget - channel.subscribers)
  const hoursGap = Math.max(0, hoursTarget - channel.watchHours)
  const percentSubs = Math.round((channel.subscribers / subsTarget) * 100)
  const percentHours = Math.round((channel.watchHours / hoursTarget) * 100)
  const overallPercent = Math.round((percentSubs + percentHours) / 2)
  const packageName = packageInfo?.selectedPackage?.title || 'Belum memilih paket'
  const eta = packageInfo?.selectedPackage?.eta || 30

  return (
    <div className="perjalanan-card">
      <div className="perjalanan-head">
        <div>
          <div style={{fontSize:12,color:'var(--muted)'}}>Posisi Anda</div>
          <div style={{fontSize:22,fontWeight:800,marginTop:6}}>🟡 MENUJU TARGET</div>
        </div>
        <div style={{fontSize:44,fontWeight:900,color:'#60a5fa'}}>{overallPercent}%</div>
      </div>

      <div className="progress-summary">
        <div>
          <div style={{fontSize:13,color:'var(--muted)'}}>Kurang</div>
          <div style={{fontSize:20,fontWeight:800,marginTop:6}}>{subsGap} Subscriber</div>
          <div style={{marginTop:6,fontSize:20,fontWeight:800}}>{hoursGap} Jam Tayang</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:13,color:'var(--muted)'}}>Estimasi</div>
          <div style={{fontSize:20,fontWeight:800,marginTop:6}}>47 Hari Lagi</div>
        </div>
      </div>

      <div style={{marginTop:24}}>
        <div className="section-title">Paket Aktif</div>
        <div className="card small-card">
          <div style={{fontWeight:700}}>{packageName}</div>
          <div style={{marginTop:6,color:'var(--muted)'}}>Hari ke: 1 dari {eta}</div>
        </div>
      </div>

      <div style={{marginTop:24}}>
        <div className="section-title">Posisi</div>
        <PositionCard label="Subscriber" value={channel.subscribers} target={subsTarget} />
        <PositionCard label="Jam Tayang" value={channel.watchHours} target={hoursTarget} />
      </div>
    </div>
  )
}
