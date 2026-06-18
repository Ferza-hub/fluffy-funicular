import React, { useEffect, useState } from 'react';
import { T } from '../lib/theme.js';
import { THRESHOLDS, PACKAGES } from '../lib/thresholds.js';
import { formatNum, formatTime, computeReachVelocity } from '../lib/format.js';
import StoryRing from '../components/StoryRing.jsx';
import MetricRow from '../components/MetricRow.jsx';
import DiagStat from '../components/DiagStat.jsx';
import PackageCard from '../components/PackageCard.jsx';

// First real screen after connect: account gauge, technical diagnostic
// stats, and the package picker in one view. The system pre-selects one
// package based on the bottleneck gap, but the other two remain fully
// visible and selectable. Speed pressure copy is keyed to whichever
// package the user is currently focused on (hover/click).
export default function DiagnosticResultScreen({ platform, data, variant, onSelectPackage, onSwitchPlatform, logEvent }) {
  const config = THRESHOLDS[platform];
  const [now, setNow] = useState(() => new Date());
  const [focusedPkg, setFocusedPkg] = useState(null);

  useEffect(() => {
    logEvent('diagnostic_viewed', { platform, variant });
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, [platform, variant, logEvent]);

  const metrics = config.metrics.map(m => {
    const value = data[m.key] ?? 0;
    const gap = Math.max(0, m.target - value);
    const pct = Math.min(100, (value / m.target) * 100);
    return { ...m, value, gap, pct };
  });
  const bottleneck = [...metrics].sort((a, b) => a.pct - b.pct)[0];
  const overallPct = Math.round(metrics.reduce((a, m) => a + m.pct, 0) / metrics.length);
  const reachVelocity = computeReachVelocity(data, platform);
  const decayRate = (100 - overallPct) > 0 ? +(0.4 + (100 - overallPct) * 0.012).toFixed(2) : 0.4;
  const lastSynced = formatTime(now);

  // Bottleneck severity drives the recommendation: a wide gap on the
  // hardest metric pushes toward the faster package.
  const severity = 100 - bottleneck.pct;
  const recommended = severity >= 55 ? 'agresif' : severity >= 25 ? 'intermediate' : 'standard';

  function handleSelect(pkg) {
    logEvent('package_selected', { packageId: pkg.id, price: pkg.price, variant, wasRecommended: pkg.id === recommended });
    onSelectPackage(pkg);
  }

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '32px 24px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${config.ring.join(',')})` }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15.5 }}>{data.handle || 'Akun Anda'}</div>
            <div style={{ fontSize: 12, color: T.textFaint }}>{config.program}</div>
          </div>
        </div>
        <button onClick={onSwitchPlatform} style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.textMute, fontSize: 13, cursor: 'pointer', padding: '8px 14px', borderRadius: 10, fontWeight: 600 }}>
          Ganti platform
        </button>
      </div>

      <div style={{
        background: T.surface, border: `1px solid ${T.border}`, borderRadius: 22, padding: 30, marginBottom: 18,
        boxShadow: '0 16px 40px rgba(20,20,30,0.05)', display: 'flex', gap: 30, alignItems: 'center',
      }}>
        <StoryRing pct={overallPct} colors={config.ring} size={132} thickness={10}>
          <div className="mono" style={{ fontSize: 30, fontWeight: 800 }}>{overallPct}%</div>
          <div style={{ fontSize: 10.5, color: T.textFaint, fontWeight: 600 }}>siap</div>
        </StoryRing>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.success, display: 'inline-block' }} />
            <span style={{ fontSize: 11.5, color: T.textFaint }}>Tersinkron {lastSynced}</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
            Titik tersempit: <span style={{ color: T.brand }}>{bottleneck.label}</span>
            <span style={{ color: T.textFaint, fontWeight: 500 }}> · gap {formatNum(bottleneck.gap)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {metrics.map((m, i) => <MetricRow key={i} {...m} colors={config.ring} />)}
          </div>
        </div>
      </div>

      {config.isInviteOnly && (
        <div style={{ background: T.brandSoft, border: `1px solid ${T.brand}22`, borderRadius: 12, padding: '12px 16px', fontSize: 12.5, color: T.text, marginBottom: 18, lineHeight: 1.55 }}>
          ⓘ {config.disclaimer}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 30 }}>
        <DiagStat label="Audience saturation index" value={`${overallPct}%`} note="rasio capaian terhadap ambang" />
        <DiagStat label="Reach velocity" value={reachVelocity.display} note={reachVelocity.note} />
        <DiagStat label="Funnel decay rate" value={`${decayRate}%/minggu`} note="pelambatan tanpa intervensi" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, color: T.textFaint, marginBottom: 3 }}>Berdasarkan titik tersempit Anda</div>
        <h3 style={{ fontSize: 19, fontWeight: 800 }}>Sistem menyarankan jalur {PACKAGES.find(p => p.id === recommended).name}</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {PACKAGES.map(pkg => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            recommended={pkg.id === recommended}
            focused={focusedPkg === pkg.id}
            onFocus={() => { setFocusedPkg(pkg.id); logEvent('package_focus', { packageId: pkg.id }); }}
            onBlur={() => setFocusedPkg(null)}
            onSelect={() => handleSelect(pkg)}
          />
        ))}
      </div>

      <p style={{ fontSize: 12, color: T.textFaint, marginTop: 22, lineHeight: 1.6, textAlign: 'center' }}>
        Paket mempercepat proses review internal kami, bukan kriteria resmi platform. Keputusan akhir monetisasi tetap berada di tangan {config.label}.
      </p>
    </div>
  );
}
