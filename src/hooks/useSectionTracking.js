import { useCallback, useRef } from 'react';

/* ============================================================
   SECTION TRACKING HOOK
   Wraps Intersection Observer to log when a named section enters
   view, and how long it stayed in view (dwell time). Lets us tell
   whether people actually read trust-building sections like
   FAQ/credibility blocks or just scroll past them on the way to
   pricing. Logs "section_viewed" on enter and "section_dwell" on
   exit with the cumulative visible duration in ms.
============================================================ */
export function useSectionTracking(logEvent) {
  const observerRef = useRef(null);
  const visibleSinceRef = useRef({});

  const registerSection = useCallback((node, sectionName) => {
    if (!node) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const name = entry.target.dataset.sectionName;
          if (!name) return;
          if (entry.isIntersecting) {
            if (!visibleSinceRef.current[name]) {
              visibleSinceRef.current[name] = Date.now();
              logEvent('section_viewed', { section: name });
            }
          } else if (visibleSinceRef.current[name]) {
            const dwellMs = Date.now() - visibleSinceRef.current[name];
            delete visibleSinceRef.current[name];
            logEvent('section_dwell', { section: name, dwellMs });
          }
        });
      }, { threshold: 0.4 });
    }
    node.dataset.sectionName = sectionName;
    observerRef.current.observe(node);
  }, [logEvent]);

  return registerSection;
}
