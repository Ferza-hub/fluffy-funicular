import React from 'react'

export default function PackageRecommendation({selectedPackage, onSelectPackage}){
  const pkgs = [
    {id:'santai', title:'Paket Santai', price:100000, eta:45, note:'Cocok untuk yang ingin jalur stabil.'},
    {id:'ngebut', title:'Paket Ngebut', price:200000, eta:30, note:'Direkomendasikan untuk posisi Anda saat ini.'},
    {id:'gaspol', title:'Paket Gaspol', price:500000, eta:7, note:'Untuk percepatan maksimal dalam waktu singkat.'}
  ]
  const recommended = pkgs.find(p=>p.id==='ngebut')

  return (
    <div>
      <h4>Paket Rekomendasi</h4>
      <div className="card recommended-card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:12,color:'var(--muted)'}}>⭐ DIREKOMENDASIKAN</div>
            <div style={{fontSize:22,fontWeight:800,marginTop:6}}>{recommended.title}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div className="price">Rp{recommended.price.toLocaleString()}</div>
            <div style={{fontSize:13,color:'var(--muted)'}}>Estimasi: ±{recommended.eta} Hari</div>
          </div>
        </div>
        <div style={{marginTop:12,color:'var(--muted)'}}>{recommended.note}</div>
        <div style={{marginTop:14}}>
          <button className="cta" onClick={()=>onSelectPackage(recommended)}>{selectedPackage && selectedPackage.id===recommended.id ? 'Paket Dipilih' : 'Pilih Paket Ini'}</button>
        </div>
      </div>

      <div style={{marginTop:16}}>
        <h5>Alternatif Paket</h5>
        {pkgs.filter(p=>p.id!==recommended.id).map(pkg=> (
          <div key={pkg.id} className="card alt-pkg">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700}}>{pkg.title}</div>
                <div style={{fontSize:13,color:'var(--muted)'}}>{pkg.note}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="price">Rp{pkg.price.toLocaleString()}</div>
                <div style={{fontSize:13,color:'var(--muted)'}}>±{pkg.eta} Hari</div>
              </div>
            </div>
            <button className="secondary" style={{marginTop:12}} onClick={()=>onSelectPackage(pkg)}>{selectedPackage && selectedPackage.id===pkg.id ? 'Paket Dipilih' : 'Pilih Paket Ini'}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
