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
  const [step, setStep] = useState('landing')
  const [channel, setChannel] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isActivated, setIsActivated] = useState(false)
  const [dailyEvents, setDailyEvents] = useState([])

  function startJourney(){
    setStep('channel')
  }

  function handleConnect(data){
    setChannel(data)
    setStep('analysis')
  }

  function handleNextFromAnalysis(){
    setStep('package')
  }

  function handleSelectPackage(pkg){
    setSelectedPackage(pkg)
    setStep('checkout')
  }

  function handleCheckout(){
    setIsActivated(true)
    setDailyEvents([
      {label:'Kemarin', percent:81, note:'Subscriber bertambah 8'},
      {label:'Hari Ini', percent:82, note:'Subscriber bertambah 12'}
    ])
    setStep('dashboard')
  }

  return (
    <div className="container">
      <Hero onStart={startJourney} />

      <div className="step-view">
        {step === 'landing' && <div className="empty-state" />}

        {step === 'channel' && (
          <div className="card screen-card channel-screen">
            <ChannelCheck onConnect={handleConnect} />
          </div>
        )}

        {step === 'analysis' && channel && (
          <div className="card screen-card analysis-screen">
            <VerdictSummary channel={channel} />
            <div style={{marginTop:24}}>
              <button className="cta" onClick={handleNextFromAnalysis}>Lihat Rekomendasi Paket</button>
            </div>
          </div>
        )}

        {step === 'package' && (
          <div className="card screen-card package-screen">
            <PackageRecommendation selectedPackage={selectedPackage} onSelectPackage={handleSelectPackage} />
          </div>
        )}

        {step === 'checkout' && selectedPackage && (
          <div className="card screen-card checkout-screen">
            <PaymentValidation pkg={selectedPackage} onCheckout={handleCheckout} />
          </div>
        )}

        {step === 'dashboard' && isActivated && channel && (
          <>
            <div className="card screen-card dashboard-screen">
              <ProgressDashboard channel={channel} packageInfo={{selectedPackage}} />
            </div>
            <div className="grid dashboard-widgets">
              <div className="card">
                <DailyInsight />
              </div>
              <div className="card">
                <DailyUpdates events={dailyEvents} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
