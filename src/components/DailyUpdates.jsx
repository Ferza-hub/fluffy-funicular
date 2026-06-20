import React from 'react'

export default function DailyUpdates({events}){
  if(!events || events.length===0) return <div style={{color:'var(--muted)'}}>Belum ada pembaruan hari ini.</div>

  return (
    <div>
      <h4>Perkembangan</h4>
      <div>
        {events.map((e,i)=> (
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0'}}>
            <div>
              <div style={{fontWeight:700}}>{e.label}: {e.percent}%</div>
              <div style={{color:'var(--muted)',fontSize:13}}>{e.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
