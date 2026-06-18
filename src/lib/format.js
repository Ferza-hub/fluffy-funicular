export function formatIDR(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export function formatNum(n) {
  return new Intl.NumberFormat('id-ID').format(Math.round(n));
}

export function formatTime(d) {
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export function formatElapsed(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Deterministic "reach velocity" figure derived from real account inputs.
// Framed in growth/ads vocabulary but is a transparent ratio, not a
// black-box prediction.
export function computeReachVelocity(data, platform) {
  if (platform === 'youtube') {
    const ratio = data.videoCount ? (data.watchHours / data.videoCount) : 0;
    return { display: `${ratio.toFixed(1)}h/video`, note: 'rata-rata jam tonton per video' };
  }
  if (platform === 'tiktok') {
    const ratio = data.followers ? (data.views30d / data.followers) : 0;
    return { display: `${ratio.toFixed(1)}x`, note: 'views 30 hari relatif basis followers' };
  }
  if (platform === 'facebook') {
    const ratio = data.followers ? (data.watchMinutes60d / data.followers) : 0;
    return { display: `${ratio.toFixed(1)}m/follower`, note: 'menit tonton 60 hari relatif basis followers' };
  }
  const ratio = data.engagementRate || 0;
  return { display: `${ratio.toFixed(1)}%`, note: 'engagement rate berjalan' };
}
