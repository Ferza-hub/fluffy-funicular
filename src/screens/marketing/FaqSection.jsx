import React, { useState } from 'react';
import { T } from '../../lib/theme.js';
import { FAQ_ITEMS } from '../../lib/thresholds.js';

export default function FaqSection({ sectionRef, logEvent }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section ref={sectionRef} style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 70px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ fontSize: 12.5, color: T.brand, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>FAQ</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Pertanyaan yang sering ditanyakan</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden' }}>
            <button
              onClick={() => {
                const next = openIndex === i ? null : i;
                setOpenIndex(next);
                logEvent('faq_item_toggled', { question: item.q, opened: next === i });
              }}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '16px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
            >
              <span style={{ fontSize: 14.5, fontWeight: 700, color: T.text }}>{item.q}</span>
              <span style={{ color: T.textFaint, fontSize: 18, flexShrink: 0 }}>{openIndex === i ? '−' : '+'}</span>
            </button>
            {openIndex === i && (
              <div style={{ padding: '0 18px 18px', fontSize: 13.8, color: T.textMute, lineHeight: 1.65 }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
