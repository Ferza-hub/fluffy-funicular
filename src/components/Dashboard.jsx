import React from 'react'
import PositionCard from './PositionCard'

export default function Dashboard({channel, packageInfo}){
  const subsTarget = 1000
  const hoursTarget = 4000
  const subsGap = Math.max(0, subsTarget - channel.subscribers)
  const hoursGap = Math.max(0, hoursTarget - channel.watchHours)
  const subsPercent = Math.round((channel.subscribers / subsTarget) * 100)
  const overallPercent = Math.round(((channel.subscribers/subsTarget) + (channel.watchHours/hoursTarget))/2 * 100)

  function etaText(){
    // simple static fallback
    return '47 Hari Lagi'
  }

  function packageStatus(){
    if(!packageInfo || !packageInfo.selectedPackage) return null
    const pkg = packageInfo.selectedPackage
    if(packageInfo.paymentStatus!=='validated') return `${pkg.title} — Menunggu aktivasi`
    // if validated, compute day progress
    const started = packageInfo.packageStartedAt ? new Date(packageInfo.packageStartedAt) : null
    if(!started) return `${pkg.title} — Hari ke: 1 dari ${pkg.eta}`
    const days = Math.max(1, Math.floor((Date.now() - started.getTime())/(1000*60*60*24))+1)
    return `${pkg.title} — Hari ke: ${days} dari ${pkg.eta}`
  }

  return (
    <div>
      <h3>STATUS CHANNEL</h3>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:18}}>🟡 MENUJU TARGET</div>
        <div style={{fontWeight:800}}>{overallPercent}%</div>
      </div>

      <div style={{height:12}} />

      <h4>Posisi</h4>
      <PositionCard label="Subscriber" value={channel.subscribers} target={subsTarget} />
      <PositionCard label="Jam Tayang" value={channel.watchHours} target={hoursTarget} />

      <div style={{height:12}} />
      <div className="card" style={{background:'#071226'}}>
        <h4>Verdict</h4>
        <div>Kurang: {subsGap} Subscriber • {hoursGap} Jam Tayang</div>
        <div style={{marginTop:8}}>Estimasi: {etaText()}</div>
      </div>

      <div style={{height:12}} />
      <div className="card" style={{background:'#081827'}}>
        <h4>Package Status</h4>
        <div>{packageStatus() || 'Belum memilih paket'}</div>
      </div>
    </div>
  )
}
