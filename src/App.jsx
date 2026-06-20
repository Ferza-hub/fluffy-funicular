import React, { useState } from 'react'
import Hero from './components/Hero'
import ChannelCheck from './components/ChannelCheck'
import VerdictSummary from './components/VerdictSummary'
import PackageRecommendation from './components/PackageRecommendation'
import PaymentValidation from './components/PaymentValidation'
import ProgressDashboard from './components/ProgressDashboard'
import DailyInsight from './components/DailyInsight'
import DailyUpdates from './components/DailyUpdates'

export default function App(){
  const [connected, setConnected] = useState(false)
  const [channel, setChannel] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState('none')
  const [paymentProof, setPaymentProof] = useState(null)
  const [packageStartedAt, setPackageStartedAt] = useState(null)
  const [dailyEvents, setDailyEvents] = useState([])

  function handleConnect(data){
    setChannel(data)
    setConnected(true)
  }

  function handleSelectPackage(pkg){
    setSelectedPackage(pkg)
  }

  function handleUploadProof(file){
    setPaymentProof(file)
    setPaymentStatus('awaiting')
  }

  function adminValidate(){
    setPaymentStatus('validated')
    setPackageStartedAt(new Date().toISOString())
    setDailyEvents([
      {label:'Kemarin', percent:81, note:'Subscriber bertambah 8'},
      {label:'Hari Ini', percent:82, note:'Subscriber bertambah 12'}
    ])
  }

  return (
    <div className="container">
      <Hero />
      <div className="grid">
        <div>
          <div className="card">
            <ChannelCheck onConnect={handleConnect} />
          </div>

          {connected && channel && (
            <>
              <div style={{height:18}} />
              <VerdictSummary channel={channel} />
              <div style={{height:18}} />
              <ProgressDashboard channel={channel} packageInfo={{selectedPackage,paymentStatus,packageStartedAt}} />
            </>
          )}
        </div>

        <div>
          <div className="card">
            <PackageRecommendation selectedPackage={selectedPackage} onSelectPackage={handleSelectPackage} />
            {selectedPackage && (
              <>
                <div style={{height:18}} />
                <PaymentValidation pkg={selectedPackage} onUploadProof={handleUploadProof} paymentStatus={paymentStatus} paymentProof={paymentProof} />
                <div style={{height:8}} />
                <button className="secondary" onClick={adminValidate}>Simulasikan Validasi Admin</button>
              </>
            )}
          </div>

          <div style={{height:18}} />
          <div className="card">
            <DailyInsight />
            <div style={{height:12}} />
            <DailyUpdates events={dailyEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}
