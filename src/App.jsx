import React, { useCallback, useRef, useState } from 'react';
import { T, GLOBAL_CSS } from './lib/theme.js';
import { URGENCY_VARIANTS } from './lib/thresholds.js';
import { writeEvent } from './lib/supabase.js';
import { useSectionTracking } from './hooks/useSectionTracking.js';

import MarketingScreen from './screens/MarketingScreen.jsx';
import ConnectScreen from './screens/ConnectScreen.jsx';
import DiagnosticResultScreen from './screens/DiagnosticResultScreen.jsx';
import DisclosureScreen from './screens/DisclosureScreen.jsx';
import MicroSurveyScreen from './screens/MicroSurveyScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';

const _mem = {};
function memGet(k, fallback) { return k in _mem ? _mem[k] : fallback; }
function memSet(k, v) { _mem[k] = v; return v; }
function pickVariant() {
  const keys = Object.keys(URGENCY_VARIANTS);
  return keys[Math.floor(Math.random() * keys.length)];
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [platform, setPlatform] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [variant] = useState(() => memGet('variant', null) || memSet('variant', pickVariant()));
  const eventsRef = useRef([]);

  const logEvent = useCallback((name, payload = {}) => {
    const entry = { name, payload, t: new Date().toISOString() };
    eventsRef.current.push(entry);
    writeEvent(name, payload);
  }, []);

  const registerSection = useSectionTracking(logEvent);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, fontFamily: "'Plus Jakarta Sans', Inter, system-ui, -apple-system, sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {screen === 'landing' && (
        <MarketingScreen
          registerSection={registerSection}
          logEvent={logEvent}
          onStart={() => { logEvent('landing_cta_click'); setScreen('connect'); }}
        />
      )}

      {screen === 'connect' && (
        <ConnectScreen
          logEvent={logEvent}
          onConnected={(plat, data) => {
            setPlatform(plat);
            setAccountData(data);
            logEvent('account_connected', { platform: plat, data });
            setScreen('diagnostic');
          }}
        />
      )}

      {screen === 'diagnostic' && accountData && (
        <DiagnosticResultScreen
          platform={platform}
          data={accountData}
          variant={variant}
          logEvent={logEvent}
          onSelectPackage={(pkg) => {
            setSelectedPackage(pkg);
            logEvent('package_selected', { packageId: pkg.id, price: pkg.price, variant });
            setScreen('disclosure');
          }}
          onSwitchPlatform={() => setScreen('connect')}
        />
      )}

      {screen === 'disclosure' && selectedPackage && (
        <DisclosureScreen
          pkg={selectedPackage}
          onAcknowledge={() => {
            logEvent('disclosure_acknowledged', { packageId: selectedPackage.id });
            setScreen('survey');
          }}
        />
      )}

      {screen === 'survey' && (
        <MicroSurveyScreen logEvent={logEvent} onDone={() => setScreen('dashboard')} />
      )}

      {screen === 'dashboard' && accountData && selectedPackage && (
        <DashboardScreen
          platform={platform}
          data={accountData}
          pkg={selectedPackage}
          logEvent={logEvent}
          onSwitchPlatform={() => { setSelectedPackage(null); setScreen('connect'); }}
        />
      )}
    </div>
  );
}
