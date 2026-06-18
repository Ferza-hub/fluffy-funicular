// Design tokens — social platform nuance.
// Brand accent (T.brand) drives all CTA/price/action elements.
// Platform colors (yt, tiktok, ig*, fb*) are reserved for
// platform-identity elements (rings, avatars, badges) only.
export const T = {
  bg: '#FAF8F4',
  bgSoft: '#F1EDE6',
  surface: '#FFFFFF',
  text: '#1A1B1F',
  textMute: '#6B6E76',
  textFaint: '#A3A6AD',
  border: '#ECE8E0',
  brand: '#FF3B5C',
  brandSoft: '#FFE8EC',
  success: '#1FAE6E',
  yt: '#FF2E4D',
  tiktok: '#0FCFC0',
  tiktokAlt: '#FE2C55',
  ig1: '#7B4DFF',
  ig2: '#FF6B8B',
  ig3: '#FFB13C',
  fb1: '#0866FF',
  fb2: '#3B82F6',
};

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
  * { box-sizing: border-box; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
  }
  button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid #FF3B5C; outline-offset: 2px; }
  .mono { font-family: 'JetBrains Mono', monospace; }
  input::placeholder { color: #C7C9CE; }
  body { margin: 0; }
`;
