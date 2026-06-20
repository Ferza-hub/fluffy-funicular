import React from 'react'

export default function PackageRecommendation({selectedPackage, onSelectPackage}){
  const pkgs = [
    {id:'santai', title:'Paket Santai', price:100000, eta:45, note:'Cocok untuk channel yang baru mulai.'},
    {id:'ngebut', title:'Paket Ngebut', price:200000, eta:30, note:'Keseimbangan terbaik antara kecepatan dan biaya.', recommended:true},
    {id:'gaspol', title:'Paket Gaspol', price:500000, eta:7, note:'Untuk yang ingin pertumbuhan cepat dan agresif.'}
  ]

  return (
    <div className="package-list">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16,flexWrap:'wrap'}}>
        <div>
          <h4>Paket Rekomendasi</h4>
          <div style={{color:'var(--muted)',fontSize:13,marginTop:8}}>Lihat semua paket, paket terbaik untuk posisi Anda ditandai khusus.</div>
        </div>
      </div>

      <div style={{marginTop:18,display:'grid',gap:16}}>
        {pkgs.map(pkg => (
          <div key={pkg.id} className={`package-card ${pkg.recommended ? 'recommended' : ''} ${selectedPackage?.id===pkg.id ? 'selected' : ''}`}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
              <div>
                <div className="package-label">{pkg.recommended ? 'Direkomendasikan' : 'Paket'}</div>
                <div style={{fontSize:20,fontWeight:800,marginTop:8}}>{pkg.title}</div>
                <div style={{marginTop:10,color:'var(--muted)'}}>{pkg.note}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="price">Rp{pkg.price.toLocaleString()}</div>
                <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>Estimasi {pkg.eta} Hari</div>
              </div>
            </div>

            <div style={{marginTop:20,display:'flex',justifyContent:'flex-end'}}>
              <button className={`cta ${selectedPackage?.id===pkg.id ? 'selected-btn' : ''}`} type="button" onClick={()=>onSelectPackage(pkg)}>
                {selectedPackage?.id===pkg.id ? 'Paket Dipilih' : 'Pilih Paket Ini'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
