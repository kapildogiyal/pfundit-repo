'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const pillars = [
  {
    id: '01', label: 'Institutional Structure', headline: 'Institutional structure from day one',
    points: [
      'Singapore HoldCo (Pte. Ltd.) — ACRA registered (UEN: 202544131H, 2025)',
      'Board of Directors with independent oversight (in formation)',
      'Single-purpose corporate structure — no legacy entities or prior business history',
    ],
  },
  {
    id: '02', label: 'Risk & Compliance', headline: 'Regulatory compliant AI as a founding constraint',
    points: [
      'Regulatory compliant AI architecture as a founding constraint',
      'Mandatory human-in-the-loop at every decision gate',
      'Full explainability and audit trail on credit decisions',
    ],
  },
  {
    id: '03', label: 'Data, Security & Audit', headline: 'Zero-compromise data architecture',
    points: [
      'API-first architecture with controlled data access',
      'Asset-level monitoring from the first loan',
      'Transparent, institutional-grade reporting',
      'Clean capital architecture from day one',
    ],
  },
];

const timeline = [
  { year: '2025', label: 'Singapore HoldCo incorporated (ACRA)', done: true },
  { year: '2026', label: 'India subsidiary formation & board structuring (underway)', done: true },
  { year: '2026', label: 'RBI NBFC-ND-ICC application (Pre-application stage)', done: false },
  { year: 'Target: 2026–27', label: 'Regulatory approvals & first-loan operations', done: false },
];

export function Governance() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
  }, [active]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const st = { trigger: section, start: 'top 78%' };
      gsap.fromTo('[data-gv="heading"]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo('[data-gv="sub"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.1, scrollTrigger: st });
      gsap.fromTo('[data-gv="left"]', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: 0.2, scrollTrigger: st });
      gsap.fromTo('[data-gv="right"]', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: 0.2, scrollTrigger: st });
      gsap.fromTo('[data-gv="tl-item"]', { opacity: 0, x: 12 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out', delay: 0.35,
          scrollTrigger: { trigger: '[data-gv="timeline"]', start: 'top 86%' } }
      );
      gsap.to('[data-gv="pulse-dot"]', { scale: 1.5, opacity: 0.5, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, section);

    return () => ctx.revert();
  }, []);

  const pillar = pillars[active];

  return (
    <section ref={sectionRef} id="governance"
      className="relative overflow-hidden section-padding"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(15,27,61,0.08)] to-transparent" />

      <div className="layout-shell editorial-container relative z-10">

        {/* Header row with illustration */}
        <div className="header-group flex items-start justify-between gap-8">
          <header className="max-w-[40rem]">
            <div className="header-eyebrow">
              <div data-gv="pulse-dot" className="header-eyebrow-dot shadow-[0_0_8px_rgba(212,164,55,0.8)]" />
              <span className="typo-eyebrow text-navy/55">Governance &amp; Trust</span>
            </div>
            <h2 data-gv="heading" className="typo-h2 text-navy header-heading">
              Built on Regulated Rails
            </h2>
            <p data-gv="sub" className="typo-body text-navy/58">
              A Singapore-incorporated holding company operating to institutional standards from day one — designed for the scrutiny of regulators, investors and partners.
            </p>
          </header>

          {/* Stacked layers illustration — blended */}
          <div className="hidden lg:block flex-shrink-0 illustration-float" style={{ width: 180, marginTop: '-0.5rem' }}>
            {/* <Image
              src="/ChatGPT Image Jul 9, 2026, 04_58_36 PM.png"
              alt="Layered governance structure"
              width={180}
              height={220}
              className="w-full h-auto select-none"
              style={{ mixBlendMode: 'multiply' }}
            /> */}
          </div>
        </div>

        {/* Two-column */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">

          {/* LEFT: Tab accordion */}
          <div data-gv="left">
            {pillars.map((p, i) => {
              const isActive = i === active;
              return (
                <div key={p.id}>
                  <div style={{ height: 1, background: 'rgba(15,27,61,0.08)' }} />
                  <button type="button" onClick={() => setActive(i)} className="w-full text-left"
                    style={{ outline: 'none', background: 'none', border: 'none', padding: '1.1rem 0', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isActive ? 'rgba(212,164,55,0.1)' : 'rgba(15,27,61,0.04)',
                        border: isActive ? '1px solid rgba(212,164,55,0.3)' : '1px solid rgba(15,27,61,0.09)',
                        transition: 'all 0.3s ease',
                      }}>
                        <span className="typo-label" style={{ color: isActive ? '#D4A437' : 'rgba(15,27,61,0.32)' }}>
                          {p.id}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="typo-button" style={{
                          color: isActive ? '#0f1b3d' : 'rgba(15,27,61,0.45)', transition: 'color 0.3s', margin: 0,
                        }}>
                          {p.label}
                        </p>
                      </div>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: isActive ? '1px solid rgba(212,164,55,0.35)' : '1px solid rgba(15,27,61,0.09)',
                        transform: isActive ? 'rotate(90deg)' : 'none',
                        transition: 'all 0.3s ease',
                      }}>
                        <svg viewBox="0 0 16 16" fill="none" strokeWidth="2" style={{ width: 8, height: 8 }}
                          stroke={isActive ? '#D4A437' : 'rgba(15,27,61,0.3)'}>
                          <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {isActive && <div style={{ marginTop: 8, height: 1.5, borderRadius: 1, background: 'linear-gradient(to right, #D4A437, rgba(212,164,55,0.05))' }} />}
                  </button>
                </div>
              );
            })}
            <div style={{ height: 1, background: 'rgba(15,27,61,0.08)' }} />

            {/* Regulatory status box */}
            <div style={{ marginTop: '1.25rem', padding: '0.9rem 1.1rem', borderRadius: '0.75rem', background: 'rgba(15,27,61,0.03)', border: '1px solid rgba(15,27,61,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4A437', boxShadow: '0 0 6px rgba(212,164,55,0.65)', flexShrink: 0 }} />
                <span className="typo-eyebrow text-[#D4A437]">
                  Regulatory Status — 2026
                </span>
              </div>
              <p className="typo-small text-navy/60" style={{ margin: 0 }}>
                India subsidiary in formation. Intended RBI NBFC-ND-ICC application in progress. No lending until registration is granted.
              </p>
            </div>
          </div>

          {/* RIGHT: Content panel + timeline */}
          <div data-gv="right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div ref={contentRef}>
              <p className="typo-eyebrow text-[#D4A437]" style={{ marginBottom: '0.5rem' }}>
                Pillar {pillar.id}
              </p>
              <h3 className="typo-h3 text-navy" style={{ marginBottom: '1rem' }}>
                {pillar.headline}
              </h3>
              <div style={{ height: 1, background: 'linear-gradient(to right, rgba(15,27,61,0.1), transparent)', marginBottom: '1rem' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {pillar.points.map((point) => (
                  <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ marginTop: 7, width: 5, height: 5, borderRadius: '50%', background: '#D4A437', boxShadow: '0 0 4px rgba(212,164,55,0.4)', flexShrink: 0 }} />
                    <span className="typo-body-sm text-navy/65">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div data-gv="timeline">
              <p className="typo-eyebrow text-navy/30" style={{ marginBottom: '1rem' }}>
                Regulatory Roadmap
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {timeline.map((item, ti) => {
                  const isLast = ti === timeline.length - 1;
                  return (
                    <div key={item.label} data-gv="tl-item" style={{ display: 'flex', gap: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                        <div style={{
                          width: 11, height: 11, borderRadius: '50%',
                          background: item.done ? '#D4A437' : '#F4F3EF',
                          border: item.done ? '2px solid #D4A437' : '1.5px solid rgba(15,27,61,0.16)',
                          boxShadow: item.done ? '0 0 8px rgba(212,164,55,0.4)' : 'none',
                          marginTop: 2, zIndex: 1, flexShrink: 0,
                        }} />
                        {!isLast && (
                          <div style={{
                            flex: 1, width: 1, minHeight: 22,
                            background: item.done ? 'linear-gradient(to bottom, #D4A437, rgba(212,164,55,0.2))' : 'rgba(15,27,61,0.08)',
                            marginTop: 3, marginBottom: 3,
                          }} />
                        )}
                      </div>
                      <div style={{ paddingLeft: 10, paddingBottom: isLast ? 0 : '1rem', flex: 1 }}>
                        <span className="typo-label" style={{ display: 'block', color: item.done ? '#D4A437' : 'rgba(15,27,61,0.28)', marginBottom: 2 }}>
                          {item.year}
                        </span>
                        <span className="typo-body-sm" style={{ display: 'block', color: item.done ? 'rgba(15,27,61,0.7)' : 'rgba(15,27,61,0.35)' }}>
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-10 border-t border-[rgba(15,27,61,0.07)] pt-5 text-center typo-small text-[#0f1b3d]/40 max-w-[600px]">
          Governance disclosures will be expanded as the entity progresses through licensing.
          Nothing on this page constitutes an offer of securities, financial advice, or a solicitation to lend or borrow.
        </div>
      </div>
    </section>
  );
}
