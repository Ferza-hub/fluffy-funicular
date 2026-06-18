import React, { useEffect, useState } from 'react';
import { T } from '../lib/theme.js';
import PlatformButton from '../components/PlatformButton.jsx';
import { ManualConnectInput, ManualConnectPreview } from '../components/ManualConnect.jsx';
import { Spinner } from '../components/Shared.jsx';
import { USE_REAL_OAUTH, startYouTubeOAuthRedirect, parseOAuthRedirectToken, fetchYouTubeChannelData } from '../lib/googleOAuth.js';

export default function ConnectScreen({ onConnected, logEvent }) {
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualHandle, setManualHandle] = useState('');
  const [manualStep, setManualStep] = useState('input');

  // On mount, check whether we just landed back from a Google OAuth
  // redirect (response_type=token puts the access token in the URL hash).
  useEffect(() => {
    if (!USE_REAL_OAUTH) return;
    const token = parseOAuthRedirectToken();
    if (!token) return;
    setMode('youtube');
    setLoading(true);
    fetchYouTubeChannelData(token)
      .then((data) => {
        setLoading(false);
        onConnected('youtube', data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError('Gagal mengambil data YouTube. Coba hubungkan ulang.');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startYouTubeOAuth() {
    logEvent('oauth_start', { platform: 'youtube' });
    if (!USE_REAL_OAUTH) {
      setMode('youtube');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onConnected('youtube', { handle: '@channelkamu', subscribers: 850, watchHours: 3120, videoCount: 64 });
      }, 1300);
      return;
    }
    startYouTubeOAuthRedirect();
  }

  function handleManualPreview() {
    if (!manualHandle.trim()) return;
    logEvent('manual_handle_submitted', { platform: mode, handle: manualHandle });
    setManualStep('preview');
  }

  function confirmManualStats(stats) {
    logEvent('manual_stats_confirmed', { platform: mode, stats });
    onConnected(mode, { handle: manualHandle, ...stats });
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ fontSize: 12.5, color: T.textFaint, fontWeight: 700, letterSpacing: 0.5, marginBottom: 10 }}>LANGKAH 1 DARI 2</div>
      <h2 style={{ fontSize: 27, fontWeight: 800, marginBottom: 8 }}>Hubungkan akun Anda</h2>
      <p style={{ fontSize: 14.5, color: T.textMute, marginBottom: 32, lineHeight: 1.6 }}>
        YouTube terhubung lewat login resmi Google — kami hanya membaca data publik & analytics dasar, tidak memposting atau mengubah apa pun.
      </p>

      {error && (
        <div style={{ background: T.brandSoft, color: T.brand, borderRadius: 10, padding: '12px 14px', fontSize: 13, marginBottom: 20 }}>{error}</div>
      )}

      {!mode && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PlatformButton label="YouTube" sub="Login resmi via Google · data real-time" colors={[T.yt, '#FF8A65']} onClick={() => { setMode('youtube'); startYouTubeOAuth(); }} />
          <PlatformButton label="TikTok" sub="Hubungkan manual · verifikasi handle" colors={[T.tiktok, T.tiktokAlt]} onClick={() => { setMode('tiktok'); logEvent('manual_connect_start', { platform: 'tiktok' }); }} />
          <PlatformButton label="Instagram" sub="Hubungkan manual · verifikasi handle" colors={[T.ig1, T.ig2, T.ig3]} onClick={() => { setMode('instagram'); logEvent('manual_connect_start', { platform: 'instagram' }); }} />
          <PlatformButton label="Facebook" sub="Hubungkan manual · verifikasi handle" colors={[T.fb1, T.fb2]} onClick={() => { setMode('facebook'); logEvent('manual_connect_start', { platform: 'facebook' }); }} />
        </div>
      )}

      {mode === 'youtube' && loading && (
        <div style={{ padding: '52px 0', textAlign: 'center' }}>
          <Spinner />
          <div style={{ marginTop: 18, fontSize: 14, color: T.textMute }}>Mengambil data dari YouTube Data API…</div>
        </div>
      )}

      {['tiktok', 'instagram', 'facebook'].includes(mode) && manualStep === 'input' && (
        <ManualConnectInput platform={mode} value={manualHandle} onChange={setManualHandle} onSubmit={handleManualPreview} onBack={() => setMode(null)} />
      )}

      {['tiktok', 'instagram', 'facebook'].includes(mode) && manualStep === 'preview' && (
        <ManualConnectPreview platform={mode} handle={manualHandle} onConfirm={confirmManualStats} onBack={() => setManualStep('input')} />
      )}
    </div>
  );
}
