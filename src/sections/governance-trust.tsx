'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ─────────────────── data ─────────────────── */
const pillars = [
  {
    id: '01',
    label: 'Corporate Governance',
    headline: 'Institutional structure from day one',
    points: [
      'Singapore HoldCo (Pte. Ltd.) — ACRA registered, 2025',
      'Board of Directors with independent oversight (in formation)',
      'Audit, Risk & Compliance committees scoped pre-licensing',
      'Quarterly governance reviews from inception',
    ],
  },
  {
    id: '02',
    label: 'Risk & Compliance',
    headline: 'Regulatory alignment before revenue',
    points: [
      'RBI Master Directions for NBFCs — design baseline',
      'KYC / AML / CFT policies aligned to RBI & MAS',
      'Fair Practices Code — to be adopted at licensing',
      'Chief Risk Officer & Chief Compliance Officer roles open',
    ],
  },
  {
    id: '03',
    label: 'Data, Security & Audit',
    headline: 'Zero-compromise data architecture',
    points: [
      'Data residency & DPDP Act 2023 (India) alignment',
      'Encryption in transit and at rest by design',
      'Role-based access; audit trails on every credit decision',
      'SOC 2 / ISO 27001 readiness on the operating roadmap',
    ],
  },
];

const timeline = [
  { year: '2025', label: 'Singapore HoldCo incorporated (ACRA)', done: true },
  { year: '2025–26', label: 'India subsidiary formation & board structuring', done: true },
  { year: '2026', label: 'RBI NBFC-ND-ICC application filing', done: false },
  { year: '2026–27', label: 'Regulatory approvals & first-loan operations', done: false },
];

/* ─────────────────── component ─────────────────── */
export function Governance() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  /* animate content panel when tab changes */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [active]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const st = { trigger: section, start: 'top 76%' };

      const runFromTo = (selector: string, fromVars: any, toVars: any) => {
        const els = section.querySelectorAll(selector);
        if (!els || els.length === 0) return;
        gsap.fromTo(els as any, fromVars, toVars);
      };

      const runTo = (selector: string, toVars: any) => {
        const els = section.querySelectorAll(selector);
        if (!els || els.length === 0) return;
        gsap.to(els as any, toVars);
      };

      runFromTo('[data-gv="badge"]',
        { opacity: 0, y: -12, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(2)', scrollTrigger: st }
      );
      runFromTo('[data-gv="heading"]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.07, scrollTrigger: st }
      );
      runFromTo('[data-gv="sub"]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 0.18, scrollTrigger: st }
      );
      runFromTo('[data-gv="left"]',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3, scrollTrigger: st }
      );
      runFromTo('[data-gv="right"]',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3, scrollTrigger: st }
      );
      runFromTo('[data-gv="tl-item"]',
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.13, ease: 'power2.out', delay: 0.5,
          scrollTrigger: { trigger: '[data-gv="timeline"]', start: 'top 84%' } }
      );
      runFromTo('[data-gv="tl-line"]',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.4, ease: 'power3.out', delay: 0.35, transformOrigin: 'top',
          scrollTrigger: { trigger: '[data-gv="timeline"]', start: 'top 84%' } }
      );
      runFromTo('[data-gv="disclaimer"]',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '[data-gv="disclaimer"]', start: 'top 92%' } }
      );
      runTo('[data-gv="pulse-dot"]', {
        scale: 1.6, opacity: 0.5, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const pillar = pillars[active];

  return (
    <section
      ref={sectionRef}
      id="governance"
      className="relative overflow-hidden bg-[#F0F5FF] py-16 md:py-20 lg:py-24"
    >
      {/* background blobs — consistent with other light sections */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[-6%] top-16 h-72 w-72 rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute right-[-4%] top-1/4 h-80 w-80 rounded-full bg-navy/5 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">

        {/* ── header ── */}
        <header className="mx-auto max-w-[58rem] text-center">
          <div
            data-gv="badge"
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/45 px-5 py-2 backdrop-blur-sm"
          >
            <div data-gv="pulse-dot" className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
            <span className="typo-eyebrow text-navy/60">Governance & Trust</span>
          </div>

          <h2 data-gv="heading" className="typo-hero text-navy">
            Built on <span className="text-gold">Regulated</span> Rails
          </h2>

          <p data-gv="sub" className="mx-auto mt-6 max-w-[48rem] text-[0.96rem] leading-[1.28] text-navy/70">
            A Singapore-incorporated holding company operating to institutional standards from day one —
            designed for the scrutiny of regulators, investors and partners.
          </p>
        </header>

        {/* ── two-column layout ── */}
        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24">

          {/* ── LEFT: accordion tab list ── */}
          <div data-gv="left">
            <div>
              {pillars.map((p, i) => {
                const isActive = i === active;
                return (
                  <div key={p.id}>
                    {/* top border */}
                    <div style={{ height: 1, background: 'rgba(15,27,61,0.1)' }} />

                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="w-full text-left"
                      style={{ outline: 'none', background: 'none', border: 'none', padding: '1.5rem 0', cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

                        {/* number badge */}
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: isActive ? 'rgba(212,164,55,0.1)' : 'rgba(15,27,61,0.04)',
                          border: isActive ? '1px solid rgba(212,164,55,0.4)' : '1px solid rgba(15,27,61,0.1)',
                          transition: 'all 0.3s ease',
                        }}>
                          <span style={{
                            fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em',
                            color: isActive ? '#D4A437' : 'rgba(15,27,61,0.35)',
                            transition: 'color 0.3s',
                          }}>
                            {p.id}
                          </span>
                        </div>

                        {/* label + subtext */}
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.025em',
                            color: isActive ? '#0f1b3d' : 'rgba(15,27,61,0.55)',
                            lineHeight: 1.25,
                            marginBottom: isActive ? 4 : 0,
                            transition: 'color 0.3s',
                          }}>
                            {p.label}
                          </p>
                          {isActive && (
                            <p style={{
                              fontSize: '0.8rem',
                              color: 'rgba(15,27,61,0.5)',
                              lineHeight: 1.5,
                              marginTop: 2,
                            }}>
                              {p.headline}
                            </p>
                          )}
                        </div>

                        {/* chevron */}
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: isActive ? '1px solid rgba(212,164,55,0.45)' : '1px solid rgba(15,27,61,0.1)',
                          background: isActive ? 'rgba(212,164,55,0.07)' : 'transparent',
                          transition: 'all 0.3s ease',
                          transform: isActive ? 'rotate(90deg)' : 'none',
                        }}>
                          <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.8" style={{ width: 11, height: 11 }}
                            stroke={isActive ? '#D4A437' : 'rgba(15,27,61,0.35)'}>
                            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>

                      {/* active gold underline */}
                      {isActive && (
                        <div style={{
                          marginTop: '1rem',
                          height: 2,
                          borderRadius: 1,
                          background: 'linear-gradient(to right, #D4A437, rgba(212,164,55,0.08))',
                        }} />
                      )}
                    </button>
                  </div>
                );
              })}
              {/* closing border */}
              <div style={{ height: 1, background: 'rgba(15,27,61,0.1)' }} />
            </div>

            {/* regulatory status box */}
            <div style={{
              marginTop: '2rem',
              padding: '1.25rem 1.5rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)',
              border: '1px solid rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(15,27,61,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#D4A437',
                  boxShadow: '0 0 10px rgba(212,164,55,0.8)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#D4A437',
                }}>
                  Regulatory Status — 2026
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(15,27,61,0.68)', lineHeight: 1.65, margin: 0 }}>
                India subsidiary in formation. Intended RBI NBFC-ND-ICC application in progress.
                No lending activity until registration is granted.
              </p>
            </div>
          </div>

          {/* ── RIGHT: content panel + timeline ── */}
          <div data-gv="right" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* content panel — fades/slides when active changes */}
            <div ref={contentRef}>
              {/* eyebrow */}
              <p style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#D4A437', marginBottom: '0.75rem',
              }}>
                Pillar {pillar.id}
              </p>

              {/* headline */}
              <h3 style={{
                fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#0f1b3d',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}>
                {pillar.headline}
              </h3>

              {/* divider */}
              <div style={{
                height: 1,
                background: 'linear-gradient(to right, rgba(15,27,61,0.12), transparent)',
                marginBottom: '1.5rem',
              }} />

              {/* points */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pillar.points.map((point) => (
                  <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    {/* gold bullet dot */}
                    <div style={{
                      marginTop: 7,
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: '#D4A437',
                      boxShadow: '0 0 6px rgba(212,164,55,0.45)',
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: '0.9rem',
                      color: 'rgba(15,27,61,0.72)',
                      lineHeight: 1.65,
                      fontStyle: 'normal',
                    }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── regulatory roadmap timeline ── */}
            <div data-gv="timeline">
              <p style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(15,27,61,0.35)', marginBottom: '1.5rem',
              }}>
                Regulatory Roadmap
              </p>

              {/* timeline rows — each row is self-contained with its own dot */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {timeline.map((item, ti) => {
                  const isLast = ti === timeline.length - 1;
                  return (
                    <div key={item.label} data-gv="tl-item" style={{ display: 'flex', gap: 0 }}>

                      {/* left column: dot + connector line */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0 }}>
                        {/* dot */}
                        <div style={{
                          width: 14, height: 14,
                          borderRadius: '50%',
                          background: item.done ? '#D4A437' : '#F0F5FF',
                          border: item.done ? '2px solid #D4A437' : '1.5px solid rgba(15,27,61,0.2)',
                          boxShadow: item.done ? '0 0 12px rgba(212,164,55,0.5)' : 'none',
                          flexShrink: 0,
                          marginTop: 3,
                          zIndex: 1,
                        }} />
                        {/* connector line below dot */}
                        {!isLast && (
                          <div
                            data-gv="tl-line"
                            style={{
                              flex: 1,
                              width: 1,
                              minHeight: 32,
                              background: item.done
                                ? 'linear-gradient(to bottom, #D4A437, rgba(212,164,55,0.3))'
                                : 'rgba(15,27,61,0.1)',
                              marginTop: 4,
                              marginBottom: 4,
                            }}
                          />
                        )}
                      </div>

                      {/* right column: text content */}
                      <div style={{ paddingLeft: 14, paddingBottom: isLast ? 0 : '1.5rem', flex: 1 }}>
                        <span style={{
                          display: 'block',
                          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                          color: item.done ? '#D4A437' : 'rgba(15,27,61,0.32)',
                          marginBottom: 4,
                        }}>
                          {item.year}
                        </span>
                        <span style={{
                          fontSize: '0.85rem',
                          color: item.done ? 'rgba(15,27,61,0.78)' : 'rgba(15,27,61,0.4)',
                          lineHeight: 1.55,
                          fontStyle: 'normal',
                        }}>
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

        {/* ── disclaimer ── */}
        <div
          data-gv="disclaimer"
          className="mx-auto mt-12 max-w-[62rem] border-t border-navy/10 pt-8 text-center typo-body-sm text-navy/46 lg:mt-14"
        >
          Governance disclosures will be expanded as the entity progresses through licensing.
          Nothing on this page constitutes an offer of securities, financial advice, or a
          solicitation to lend or borrow.
        </div>
      </div>
    </section>
  );
}
