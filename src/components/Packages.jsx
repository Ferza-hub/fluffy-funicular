import React from 'react'

function Card({title,price,eta,recommended}){
  return (
    <div className="pkg card" style={{marginBottom:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:800}}>{title}</div>
          <div style={{color:'var(--muted)'}}>Pilih kecepatan perjalanan Anda.</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="price">Rp{price.toLocaleString()}</div>
          <div style={{fontSize:13,color:'var(--muted)'}}>Estimasi: {eta} Hari</div>
        </div>
      </div>
    </div>
  )
}

export default function Packages({onSelectPackage, selected}){
  const pkgs = [
    {id:'santai', title:'Paket Santai', price:100000, eta:45},
    {id:'ngebut', title:'Paket Ngebut', price:200000, eta:30},
    {id:'gaspol', title:'Paket Gaspol', price:500000, eta:7, recommended:true}
  ]

  return (
    <div>
      <h4>Paket</h4>
      {pkgs.map(p=> (
        <div key={p.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Card {...p} recommended={p.recommended} />
          <div>
            <button onClick={()=>onSelectPackage && onSelectPackage(p)} style={{marginLeft:8}}>{selected&&selected.id===p.id? 'Dipilih' : 'Pilih Paket Ini'}</button>
          </div>
        </div>
      ))}
    </div>
  )
}
