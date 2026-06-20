import React from 'react'

export default function PackageRecommendation({selectedPackage, onSelectPackage}){
  const recommended = {id:'ngebut', title:'Paket Ngebut', price:200000, eta:30, note:'Sesuai posisi channel Anda saat ini.'}

  return (
    <div>
      <h4>Paket Rekomendasi</h4>
      <div className="card recommended-card package-card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
          <div>
            <div style={{fontSize:12,color:'var(--muted)'}}>⭐ DIREKOMENDASIKAN</div>
            <div style={{fontSize:26,fontWeight:800,marginTop:6}}>{recommended.title}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div className="price">Rp{recommended.price.toLocaleString()}</div>
            <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>Target: ±{recommended.eta} Hari</div>
          </div>
        </div>
        <div style={{marginTop:16,color:'var(--muted)'}}>{recommended.note}</div>
        <div style={{marginTop:24}}>
          <button className="cta" onClick={()=>onSelectPackage(recommended)}>{selectedPackage && selectedPackage.id===recommended.id ? 'Paket Dipilih' : 'Pilih Paket Ini'}</button>
        </div>
      </div>
    </div>
  )
}
