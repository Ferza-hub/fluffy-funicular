import React from 'react'

export default function PositionCard({label,value,target}){
  const pct = Math.min(100, Math.round((value/target)*100))
  return (
    <div style={{marginBottom:12}}>
      <div className="pos">
        <div>
          <div style={{fontSize:13,color:'var(--muted)'}}>{label}</div>
          <div style={{fontWeight:700}}>{value} / {target}</div>
        </div>
        <div style={{width:160,textAlign:'right',fontSize:13}}>{pct}%</div>
      </div>
      <div className="bar"><i style={{width:pct+'%'}} /></div>
    </div>
  )
}
