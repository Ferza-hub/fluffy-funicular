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
  const days = packageInfo?.packageStartedAt ? Math.max(1, Math.floor((Date.now() - new Date(packageInfo.packageStartedAt).getTime())/(1000*60*60*24))+1) : 0
  const eta = packageInfo?.selectedPackage?.eta || 30

  return (
    <div className="card dashboard-card">
      <h4>Dashboard Progress</h4>
      <div className="dashboard-grid">
        <div className="dashboard-box">
          <div style={{fontSize:12,color:'var(--muted)'}}>STATUS</div>
          <div style={{fontWeight:800,fontSize:18}}>🟡 MENUJU TARGET</div>
          <div style={{marginTop:8,fontSize:28,fontWeight:800}}>{overallPercent}%</div>
          <div style={{color:'var(--muted)',marginTop:6}}>Target: 100%</div>
        </div>
        <div className="dashboard-box">
          <div style={{fontSize:12,color:'var(--muted)'}}>VERDICT</div>
          <div style={{fontWeight:700,marginTop:8}}>Kurang: {subsGap} Subscriber</div>
          <div style={{marginTop:6}}>Kurang: {hoursGap} Jam Tayang</div>
          <div style={{marginTop:8,color:'var(--muted)'}}>Estimasi: 47 Hari Lagi</div>
        </div>
        <div className="dashboard-box">
          <div style={{fontSize:12,color:'var(--muted)'}}>PACKAGE STATUS</div>
          <div style={{fontWeight:700,marginTop:8}}>{packageName}</div>
          <div style={{marginTop:6}}>Hari ke: {packageInfo?.paymentStatus==='validated' ? days : 0} dari {eta}</div>
        </div>
      </div>

      <div style={{marginTop:16}}>
        <div style={{fontSize:12,color:'var(--muted)'}}>Posisi</div>
        <PositionCard label="Subscriber" value={channel.subscribers} target={subsTarget} />
        <PositionCard label="Jam Tayang" value={channel.watchHours} target={hoursTarget} />
      </div>
    </div>
  )
}
