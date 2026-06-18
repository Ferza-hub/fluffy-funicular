import React, { useState } from 'react';
import { T } from '../lib/theme.js';

// One-question intercept before the final dashboard, asking about prior
// SMM-panel / fake-follower purchase behavior. Gives a direct
// self-reported signal to triangulate against behavioral inference
// from clicks and section dwell time.
export default function MicroSurveyScreen({ logEvent, onDone }) {
  const [answer, setAnswer] = useState(null);
  const options = [
    'Sering, saya rutin pakai jasa semacam itu',
    'Pernah beberapa kali',
    'Pernah coba sekali, tidak lagi',
    'Belum pernah sama sekali',
  ];

  function submit(opt) {
    setAnswer(opt);
    logEvent('survey_smm_history_answered', { answer: opt });
    setTimeout(onDone, 500);
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '90px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Satu pertanyaan singkat</h2>
      <p style={{ fontSize: 14, color: T.textMute, marginBottom: 28, lineHeight: 1.6 }}>
        Sebelum ini, apakah Anda pernah memakai jasa SMM panel atau beli followers/views?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => submit(opt)}
            disabled={!!answer}
            style={{
              background: answer === opt ? T.brand : T.surface,
              color: answer === opt ? '#fff' : T.text,
              border: `1px solid ${answer === opt ? T.brand : T.border}`,
              borderRadius: 12, padding: '13px 16px', fontSize: 13.8, fontWeight: 600,
              cursor: answer ? 'default' : 'pointer', textAlign: 'left',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
