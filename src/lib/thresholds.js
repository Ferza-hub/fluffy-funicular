import { T } from './theme.js';

// Real, published monetization criteria per platform.
// Facebook is the exception — see isInviteOnly/disclaimer below.
export const THRESHOLDS = {
  youtube: {
    label: 'YouTube',
    ring: [T.yt, '#FF8A65'],
    program: 'YouTube Partner Program',
    isInviteOnly: false,
    metrics: [
      { key: 'subscribers', label: 'Subscriber', target: 1000 },
      { key: 'watchHours', label: 'Jam tonton (12 bln)', target: 4000 },
    ],
  },
  tiktok: {
    label: 'TikTok',
    ring: [T.tiktok, T.tiktokAlt],
    program: 'Creator Rewards Program',
    isInviteOnly: false,
    metrics: [
      { key: 'followers', label: 'Followers', target: 10000 },
      { key: 'views30d', label: 'Views (30 hari)', target: 100000 },
    ],
  },
  instagram: {
    label: 'Instagram',
    ring: [T.ig1, T.ig2, T.ig3],
    program: 'Bonus & Partnership (by invite)',
    isInviteOnly: false,
    metrics: [
      { key: 'followers', label: 'Followers', target: 10000 },
      { key: 'engagementRate', label: 'Engagement rate', target: 3 },
    ],
  },
  facebook: {
    label: 'Facebook',
    ring: [T.fb1, T.fb2],
    program: 'Content Monetization (invite-only)',
    isInviteOnly: true,
    // Facebook's monetization program is invite-only with no published
    // public threshold — unlike YouTube's fixed 1,000/4,000hr rule. These
    // are proxy indicators commonly associated with stronger eligibility,
    // not an official Meta requirement. Surfaced wherever this platform's
    // progress is shown.
    disclaimer: 'Meta tidak mempublikasikan ambang resmi untuk Content Monetization — program ini sepenuhnya berbasis undangan. Angka di bawah adalah indikator umum, bukan syarat pasti.',
    metrics: [
      { key: 'followers', label: 'Followers', target: 10000 },
      { key: 'watchMinutes60d', label: 'Menit tonton (60 hari)', target: 600000 },
    ],
  },
};

export const PACKAGES = [
  { id: 'standard', name: 'Standard', days: 60, price: 500000, desc: 'Review terjadwal, kecepatan normal.' },
  { id: 'intermediate', name: 'Intermediate', days: 30, price: 750000, desc: 'Review dipersingkat, slot didahulukan.' },
  { id: 'agresif', name: 'Agresif', days: 14, price: 900000, desc: 'Review tercepat yang tersedia.' },
];

// A/B copy variants for urgency framing — assigned per session.
export const URGENCY_VARIANTS = {
  control: { badge: null, cta: (n) => `Pilih ${n}` },
  scarcity: { badge: 'Sisa 4 slot review pekan ini', cta: (n) => `Amankan slot ${n}` },
  social: { badge: '128 kreator memilih ini bulan ini', cta: (n) => `Pilih ${n}` },
};

// Speed-based FOMO copy keyed by which package the user is currently
// focused on (hover/click), not a static badge applied uniformly.
export const SPEED_PRESSURE = {
  standard: { live: 'Antrian normal: 22 akun di depan Anda' },
  intermediate: { live: 'Slot dipersingkat berkurang: 6 tersisa pekan ini' },
  agresif: { live: 'Slot tercepat hari ini: 2 tersisa' },
};

export const MANUAL_PLATFORM_CONFIG = {
  tiktok: {
    label: 'TikTok',
    ring: [T.tiktok, T.tiktokAlt],
    secondField: { key: 'views30d', label: 'Total views 30 hari terakhir', placeholder: 'contoh: 62000' },
  },
  instagram: {
    label: 'Instagram',
    ring: [T.ig1, T.ig2, T.ig3],
    secondField: { key: 'engagementRate', label: 'Rata-rata engagement rate (%)', placeholder: 'contoh: 2.4' },
  },
  facebook: {
    label: 'Facebook',
    ring: [T.fb1, T.fb2],
    secondField: { key: 'watchMinutes60d', label: 'Total menit tonton 60 hari terakhir', placeholder: 'contoh: 320000' },
  },
};

export const FAQ_ITEMS = [
  {
    q: 'Apakah Readyline mengubah subscriber, followers, atau watch time akun saya?',
    a: 'Tidak. Kami tidak pernah menyuntikkan atau membeli metrik apa pun. Semua angka di dashboard Anda berasal langsung dari data resmi yang Anda hubungkan, dan hanya berubah jika aktivitas asli akun Anda berubah.',
  },
  {
    q: 'Lalu apa yang sebenarnya saya bayar?',
    a: 'Anda membayar untuk kecepatan proses verifikasi internal kami dan kejelasan diagnosa — bukan untuk hasil akun yang dijamin.',
  },
  {
    q: 'Apakah paket termahal menjamin akun saya monetized?',
    a: 'Tidak. Keputusan akhir monetisasi sepenuhnya ada di tangan platform (YouTube, TikTok, Instagram, atau Meta) berdasarkan algoritma dan kebijakan mereka sendiri. Tidak ada pihak ketiga, termasuk kami, yang bisa menjamin atau mempercepat keputusan algoritmik tersebut.',
  },
  {
    q: 'Kenapa Facebook tidak punya angka ambang yang pasti seperti YouTube?',
    a: 'Karena program Content Monetization Facebook bersifat invite-only dan tidak mempublikasikan threshold resmi. Angka yang kami tampilkan untuk Facebook adalah indikator umum, bukan syarat pasti.',
  },
  {
    q: 'Bagaimana ini berbeda dari SMM panel atau jasa beli followers?',
    a: 'SMM panel menjual angka itu sendiri (views, followers palsu) yang berisiko melanggar ToS platform. Readyline tidak menjual traffic sama sekali — kami hanya membaca posisi Anda dan mempercepat proses administratif internal kami sendiri.',
  },
];
