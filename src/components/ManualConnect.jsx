import React, { useState } from 'react';
import { T } from '../lib/theme.js';
import { THRESHOLDS, MANUAL_PLATFORM_CONFIG } from '../lib/thresholds.js';
import { BackLink, LabeledInput } from './Shared.jsx';

export function ManualConnectInput({ platform, value, onChange, onSubmit, onBack }) {
  const label = MANUAL_PLATFORM_CONFIG[platform]?.label || platform;
  return (
    <div>
      <BackLink onClick={onBack}>Pilih platform lain</BackLink>
      <div style={{ fontSize: 14, color: T.textMute, marginBottom: 10 }}>Masukkan username {label} Anda</div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={value} onChange={e => onChange(e.target.value)} placeholder="@username"
          style={{ flex: 1, background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 12, padding: '13px 16px', color: T.text, fontSize: 15 }}
        />
        <button onClick={onSubmit} style={{ background: T.text, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 22px', fontWeight: 700, cursor: 'pointer' }}>Lanjut</button>
      </div>
      <div style={{ fontSize: 12, color: T.textFaint, marginTop: 14, lineHeight: 1.6 }}>
        {label} membatasi akses data otomatis untuk app pihak ketiga. Kami tunjukkan profil publik Anda untuk konfirmasi, lalu Anda input metrik dasar secara manual.
      </div>
    </div>
  );
}

export function ManualConnectPreview({ platform, handle, onConfirm, onBack }) {
  const cfg = MANUAL_PLATFORM_CONFIG[platform];
  const [followers, setFollowers] = useState('');
  const [secondMetric, setSecondMetric] = useState('');

  function confirmHandler() {
    onConfirm({ followers: Number(followers), [cfg.secondField.key]: Number(secondMetric) });
  }

  return (
    <div>
      <BackLink onClick={onBack}>Ubah username</BackLink>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 24, boxShadow: '0 4px 14px rgba(20,20,30,0.04)' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg, ${cfg.ring.join(',')})`, flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700 }}>{handle}</div>
          <div style={{ fontSize: 12.5, color: T.textMute }}>{cfg.label} · profil publik ditemukan</div>
        </div>
      </div>

      {platform === 'facebook' && (
        <div style={{ background: T.brandSoft, border: `1px solid ${T.brand}22`, borderRadius: 10, padding: '10px 14px', fontSize: 12, color: T.text, marginBottom: 16, lineHeight: 1.5 }}>
          {THRESHOLDS.facebook.disclaimer}
        </div>
      )}

      <div style={{ fontSize: 13.5, color: T.textMute, marginBottom: 16 }}>Masukkan angka berikut sesuai yang tertera di akun Anda:</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <LabeledInput label="Followers" value={followers} onChange={setFollowers} placeholder="contoh: 7400" />
        <LabeledInput
          label={cfg.secondField.label}
          value={secondMetric} onChange={setSecondMetric}
          placeholder={cfg.secondField.placeholder}
        />
      </div>

      <button
        disabled={!followers || !secondMetric}
        onClick={confirmHandler}
        style={{
          marginTop: 20, width: '100%',
          background: (!followers || !secondMetric) ? T.bgSoft : T.text,
          color: (!followers || !secondMetric) ? T.textFaint : '#fff',
          border: 'none', borderRadius: 12, padding: '14px 0', fontWeight: 700,
          cursor: (!followers || !secondMetric) ? 'default' : 'pointer',
        }}
      >
        Konfirmasi & lihat skor kesiapan
      </button>
    </div>
  );
}
