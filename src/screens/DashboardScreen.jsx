import React, { useEffect, useState } from 'react';
import { T } from '../lib/theme.js';
import { THRESHOLDS } from '../lib/thresholds.js';
import { formatIDR, formatElapsed } from '../lib/format.js';
import StoryRing from '../components/StoryRing.jsx';
import MetricRow from '../components/MetricRow.jsx';
import DiagStat from '../components/DiagStat.jsx';

// Final screen after disclosure + survey. Shows the "live accumulation"
// view: real account status plus the package taken and its
// processing-time estimate ticking along, framed as ongoing internal
// review — never as account metrics being artificially inflated.
export default function DashboardScreen({ platform, data, pkg, onSwitchPlatform, logEvent }) {
  const config = THRESHOLDS[platform];
  const [now, setNow] = useState(() => new Date());
  const [startedAt] = useState(() => new Date());

  useEffect(() => {
    logEvent('dashboard_viewed', { platform, packageId: pkg.id });
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [platform, pkg.id, logEvent]);

  const metrics = config.metrics.map(m => {
    const value = data[m.key] ?? 0;
    const pct = Math.min(100, (value / m.target) * 100);
    return { ...m, value, pct };
  });
  const overallPct = Math.round(metrics.reduce((a, m) => a + m.pct, 0) / metrics.length);

  const elapsedMs = now.getTime() - startedAt.getTime();
  const elapsedLabel = formatElapsed(elapsedMs);
  const totalWindowDays = pkg.days;
  const queuePositionEstimate = Math.max(1, Math.round((100 - overallPct) / 2));

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
          Mulai ulang
        </button>
      </div>

      <div style={{ background: T.text, color: '#fff', borderRadius: 18, padding: 24, marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 700, marginBottom: 6 }}>Paket aktif</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{pkg.name} · {formatIDR(pkg.price)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Jendela proses</div>
          <div className="mono" style={{ fontSize: 18, fontWeight: 700 }}>~{totalWindowDays} hari</div>
        </div>
      </div>

      <div style={{
        background: T.surface, border: `1px solid ${T.border}`, borderRadius: 22, padding: 30, marginBottom: 18,
        boxShadow: '0 16px 40px rgba(20,20,30,0.05)', display: 'flex', gap: 30, alignItems: 'center',
      }}>
        <StoryRing pct={overallPct} colors={config.ring} size={120} thickness={9}>
          <div className="mono" style={{ fontSize: 26, fontWeight: 800 }}>{overallPct}%</div>
          <div style={{ fontSize: 10, color: T.textFaint, fontWeight: 600 }}>siap</div>
        </StoryRing>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.success, display: 'inline-block', animation: 'blink 2s infinite' }} />
            <span style={{ fontSize: 11.5, color: T.textFaint }}>Akumulasi berjalan · {elapsedLabel} sejak diaktifkan</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {metrics.map((m, i) => <MetricRow key={i} {...m} colors={config.ring} />)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <DiagStat label="Estimasi posisi antrian" value={`#${queuePositionEstimate}`} note="dihitung dari sisa gap ke ambang" />
        <DiagStat label="Status review" value="Menunggu ambang tercapai" note="otomatis berubah saat akun memenuhi syarat" highlight />
      </div>

      <p style={{ fontSize: 12, color: T.textFaint, marginTop: 22, lineHeight: 1.6, textAlign: 'center' }}>
        Tampilan ini adalah simulasi riset. Tidak ada perubahan nyata pada akun {config.label} Anda.
      </p>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
