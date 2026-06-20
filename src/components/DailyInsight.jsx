import React from 'react'

const tips = [
  'Channel yang upload konsisten cenderung lebih cepat mencapai target.',
  'Video berdurasi lebih panjang membantu meningkatkan jam tayang.'
]

export default function DailyInsight(){
  return (
    <div>
      <h4>Tips Hari Ini</h4>
      <div className="insight">
        <div style={{fontWeight:700}}>{tips[0]}</div>
        <div style={{marginTop:8,color:'var(--muted)'}}>{tips[1]}</div>
      </div>
    </div>
  )
}
