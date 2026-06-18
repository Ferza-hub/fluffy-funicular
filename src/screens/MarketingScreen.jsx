import React from 'react';
import { T } from '../lib/theme.js';
import HeroSection from './marketing/HeroSection.jsx';
import StatsStripSection from './marketing/StatsStripSection.jsx';
import ResultsPreviewSection from './marketing/ResultsPreviewSection.jsx';
import SolutionSection from './marketing/SolutionSection.jsx';
import AboutToolSection from './marketing/AboutToolSection.jsx';
import TestimonialSection from './marketing/TestimonialSection.jsx';
import PricingPreviewSection from './marketing/PricingPreviewSection.jsx';
import FaqSection from './marketing/FaqSection.jsx';
import LegalSection from './marketing/LegalSection.jsx';

// Single scrollable landing page: credibility sections (Stats, Solusi,
// About, Testimonials, FAQ) come before conversion (Pricing), per the
// credibility -> solution -> social proof -> conversion ordering. Each
// section reports its own viewed/dwell time via registerSection
// (Intersection Observer), so we can tell whether people actually read
// these sections or just scroll past them.
export default function MarketingScreen({ onStart, registerSection, logEvent }) {
  return (
    <div>
      <nav style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '26px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${T.brand}, ${T.ig1})` }} />
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>Readyline</span>
        </div>
        <div style={{ fontSize: 13.5, color: T.textMute }}>untuk kreator yang sudah dekat</div>
      </nav>

      <HeroSection onStart={onStart} sectionRef={(n) => registerSection(n, 'hero')} />
      <StatsStripSection sectionRef={(n) => registerSection(n, 'stats_strip')} />
      <ResultsPreviewSection sectionRef={(n) => registerSection(n, 'results_preview')} />
      <SolutionSection sectionRef={(n) => registerSection(n, 'solusi')} />
      <AboutToolSection sectionRef={(n) => registerSection(n, 'about_tool')} />
      <TestimonialSection sectionRef={(n) => registerSection(n, 'testimonials')} />
      <PricingPreviewSection onStart={onStart} sectionRef={(n) => registerSection(n, 'pricing_preview')} />
      <FaqSection sectionRef={(n) => registerSection(n, 'faq')} logEvent={logEvent} />
      <LegalSection sectionRef={(n) => registerSection(n, 'legal')} />

      <footer style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 60px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 12.5, color: T.textFaint }}>© 2026 Readyline. Riset produk — bukan layanan komersial aktif.</div>
        <button onClick={onStart} style={{ background: T.text, color: '#fff', border: 'none', borderRadius: 12, padding: '12px 22px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
          Cek jarak akun saya →
        </button>
      </footer>
    </div>
  );
}
