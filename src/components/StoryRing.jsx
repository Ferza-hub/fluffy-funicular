import React, { useRef } from 'react';

// Signature element. A circular progress ring styled after the social
// "story" ring affordance, with a platform-colored conic gradient.
export default function StoryRing({ pct, colors, size = 120, thickness = 8, children }) {
  const gradientId = useRef(`ring-${Math.random().toString(36).slice(2)}`);
  const clamped = Math.max(0, Math.min(100, pct));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const dash = (clamped / 100) * c;
  const colorStops = colors.length > 1 ? colors : [colors[0], colors[0]];

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={gradientId.current} x1="0%" y1="0%" x2="100%" y2="100%">
            {colorStops.map((clr, i) => (
              <stop key={i} offset={`${(i / (colorStops.length - 1)) * 100}%`} stopColor={clr} />
            ))}
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1EDE6" strokeWidth={thickness} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={`url(#${gradientId.current})`} strokeWidth={thickness}
          strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
