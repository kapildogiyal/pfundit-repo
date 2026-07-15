'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '@/animations/useScrollReveal';

const capabilities = [
  { title: 'Hub & Spoke model', description: 'National reach without proportionate headcount or physical infrastructure.' },
  { title: 'RBI-compliant AI hierarchy', description: 'Mandatory human oversight at every decision gate.' },
  { title: 'API-first architecture', description: 'Partners integrate — they do not wait.' },
  { title: 'Proprietary AI agent IP', description: 'Credit underwriting and collections under development.' },
];

const esgStats = [
  { value: 'US$54B', label: 'India waste management market by 2030 — up from US$22B in 2023' },
  { value: 'US$218B', label: "Projected annual value of India's circular economy by 2030" },
  { value: '500K tonnes', label: 'EV batteries requiring recycling or repurposing by 2030' },
];

const esgVerticals = [
  { title: 'Recycling Waste to Energy', description: 'Asset-backed financing for waste-to-energy and biomethanation operators converting municipal and industrial waste streams into energy.' },
  { title: 'Repurposing Electronics & Appliances', description: 'Working capital for refurbishment and e-waste recovery operators extending the life of electronics and home appliances instead of landfill disposal.' },
  { title: 'Repurposing Batteries for Second Life', description: 'Receivables and inventory financing for operators redeploying retired EV and industrial batteries into second-life energy storage.' },
];

export function InvestmentThesis() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const esgRef = useRef<HTMLElement | null>(null);

  useScrollReveal(esgRef);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro stagger
      gsap.fromTo(
        '[data-reveal="intro"]',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '#thesis-intro', start: 'top 80%' }
        }
      );

      // Capabilities & Illustration stagger
      const capTrigger = { trigger: '#thesis-caps', start: 'top 80%' };

      gsap.fromTo('[data-reveal="cap-label"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: capTrigger }
      );

      gsap.fromTo('[data-reveal="cap-line"]',
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: 'left', duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: capTrigger }
      );

      gsap.fromTo('[data-reveal="cap-item"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: capTrigger }
      );

      gsap.to('[data-diagram="line"]', {
        strokeDashoffset: -36,
        duration: 2.6,
        ease: 'none',
        repeat: -1,
        stagger: 0.18,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ WHAT WE ARE BUILDING Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section ref={sectionRef} id="thesis"
        className="relative overflow-hidden section-padding bg-tier-anchor"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />

        <div className="layout-shell editorial-container relative z-10">

          {/* Top Row: Intro & Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 xl:gap-14 items-center mb-20 lg:mb-24">

            {/* Left: Header and paragraphs */}
            <div id="thesis-intro" className="header-group max-w-[42rem] !mb-0">
              <div data-reveal="intro" className="flex items-center gap-4 flex-wrap mb-8">
                <h2 className="typo-h2 text-white" style={{ margin: 0 }}>What We Are Building</h2>
                <span className="typo-label rounded-full border border-[rgba(212,164,55,0.28)] bg-[rgba(212,164,55,0.08)] px-3 py-1.5 text-[#D4A437]">Phase 1 · India NBFC · Greenfield</span>
              </div>
              <div className="space-y-4 max-w-[42rem]">
                <p data-reveal="intro" className="typo-body text-white/60">AI-native credit infrastructure for the real economy — built <em>India-first</em>, and designed to scale across Asia.</p>
                <p data-reveal="intro" className="typo-body text-white/60">In India, Pfundit is establishing a regulated NBFC focused on shorter-tenor, asset-aware credit tied to real transaction flows — with every exposure underwritten and monitored at the asset level from day one.</p>
                <p data-reveal="intro" className="typo-body text-white/60">The platform targets segments where structured, data-driven financing improves risk-adjusted returns — including consumer and MSME financing, discounting, and ESG-aligned circular-economy supply chains.</p>
                <p data-reveal="intro" className="typo-body text-white/60">Embedding financing into curated transaction networks, Pfundit delivers bank-grade governance, explainable AI-driven underwriting and transparent portfolios that meet institutional expectations on risk sharing, reporting and regulatory alignment.</p>
              </div>
            </div>
            {/* Right: Credit infrastructure system illustration */}
            <div id="thesis-diagram" className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] p-5 sm:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,164,55,0.12),transparent_43%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                <div className="relative aspect-[1.12/1]">
                  <svg viewBox="0 0 560 500" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
                    <circle cx="280" cy="250" r="174" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                    <circle cx="280" cy="250" r="132" stroke="rgba(212,164,55,0.22)" strokeWidth="1" strokeDasharray="3 10" />
                    <circle cx="280" cy="250" r="89" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                    <path data-diagram="line" d="M280 250 C214 220 182 170 145 135" stroke="#D4A437" strokeOpacity="0.52" strokeWidth="1.4" strokeDasharray="7 11" />
                    <path data-diagram="line" d="M280 250 C350 215 396 166 415 132" stroke="#D4A437" strokeOpacity="0.52" strokeWidth="1.4" strokeDasharray="7 11" />
                    <path data-diagram="line" d="M280 250 C215 284 183 340 146 370" stroke="#D4A437" strokeOpacity="0.52" strokeWidth="1.4" strokeDasharray="7 11" />
                    <path data-diagram="line" d="M280 250 C347 286 392 340 414 369" stroke="#D4A437" strokeOpacity="0.52" strokeWidth="1.4" strokeDasharray="7 11" />
                    {[[145, 135], [415, 132], [146, 370], [414, 369]].map(([cx, cy]) => (
                      <g key={`${cx}-${cy}`} data-diagram="node" style={{ transformOrigin: `${cx}px ${cy}px` }}>
                        <circle cx={cx} cy={cy} r="17" fill="#0f1b3d" stroke="rgba(212,164,55,0.50)" />
                        <circle cx={cx} cy={cy} r="5" fill="#D4A437" />
                      </g>
                    ))}
                    <g data-diagram="hub" style={{ transformOrigin: '280px 250px' }}>
                      <circle cx="280" cy="250" r="68" fill="#F9F8F4" />
                      <circle cx="280" cy="250" r="55" fill="#0f1b3d" stroke="#D4A437" strokeWidth="1.2" />
                    </g>
                  </svg>
                  <div className="absolute left-[2%] top-[13%] rounded-full border border-white/10 bg-[#14234b]/90 px-3 py-1.5 text-center typo-label !text-[10px] !tracking-[0.12em] text-white/70 shadow-lg sm:px-4">Asset intelligence</div>
                  <div className="absolute right-[1%] top-[12%] rounded-full border border-white/10 bg-[#14234b]/90 px-3 py-1.5 text-center typo-label !text-[10px] !tracking-[0.12em] text-white/70 shadow-lg sm:px-4">Partner APIs</div>
                  <div className="absolute bottom-[11%] left-[2%] rounded-full border border-white/10 bg-[#14234b]/90 px-3 py-1.5 text-center typo-label !text-[10px] !tracking-[0.12em] text-white/70 shadow-lg sm:px-4">Human oversight</div>
                  <div className="absolute bottom-[11%] right-[1%] rounded-full border border-white/10 bg-[#14234b]/90 px-3 py-1.5 text-center typo-label !text-[10px] !tracking-[0.12em] text-white/70 shadow-lg sm:px-4">Credit operations</div>
                  <div className="absolute left-1/2 top-1/2 flex h-[94px] w-[94px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center">
                    <span className="font-serif-editorial text-xl leading-none text-white">Pfundit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Capabilities */}
          <div id="thesis-caps">
            <div data-reveal="cap-label" className="mb-10">
              <span className="typo-eyebrow text-white/40">KEY CAPABILITIES</span>
              <div data-reveal="cap-line" className="mt-3 h-px w-8 bg-[#D4A437]" />
            </div>

            <div className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.12)] sm:grid-cols-2 xl:grid-cols-4">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  data-reveal="cap-item"
                  className="group relative min-h-[260px] overflow-hidden bg-[rgba(10,24,57,0.84)] p-7 transition-colors duration-500 hover:bg-[rgba(212,164,55,0.16)] sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[rgba(212,164,55,0.13)] transition-transform duration-700 group-hover:scale-125" />
                  <div className="relative flex h-full flex-col gap-7">
                    <div>
                      <div className="mb-7 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(212,164,55,0.36)] bg-[rgba(212,164,55,0.10)] text-[#D4A437]">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            {cap.title === 'Hub & Spoke model' && <path d="M12 12 5.5 6.5M12 12l6.5-5.5M12 12l-6.5 5.5M12 12l6.5 5.5M4 5h3v3H4zM17 5h3v3h-3zM4 16h3v3H4zM17 16h3v3h-3z" />}
                            {cap.title === 'RBI-compliant AI hierarchy' && <path d="M12 4v16M7 8l5-4 5 4M5 12h14M7 16l5 4 5-4" />}
                            {cap.title === 'API-first architecture' && <path d="M8 8 4 12l4 4M16 8l4 4-4 4M14 5l-4 14" />}
                            {cap.title === 'Proprietary AI agent IP' && <><circle cx="12" cy="12" r="7" /><path d="M12 8v4l3 2M5 4l2 2M19 4l-2 2M5 20l2-2M19 20l-2-2" /></>}
                          </svg>
                        </div>
                        <div className="h-px w-10 bg-[#D4A437]/60" />
                      </div>
                      <h3 className="font-serif-editorial text-[1.6rem] font-medium leading-tight tracking-[-0.03em] text-white">
                        {cap.title}
                      </h3>
                    </div>
                    <p className="typo-body-sm mt-auto max-w-[25ch] text-white/62 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ ESG & CIRCULAR ECONOMY Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section ref={esgRef} id="esg"
        className="relative overflow-hidden section-padding"
        style={{ background: '#FFFFFF' }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(15,27,61,0.08)] to-transparent" />

        <div className="layout-shell editorial-container relative z-10">
          <div className="header-group max-w-[38rem]">
            <div data-reveal="eyebrow" className="reveal-hidden header-eyebrow">
              <div className="header-eyebrow-dot" />
              <span className="typo-eyebrow text-navy/55">ESG &amp; Impact</span>
            </div>
            <h2 data-reveal="heading" className="reveal-hidden typo-h2 text-navy header-heading">
              Financing India's Circular Economy
            </h2>
            <p data-reveal="paragraph" className="reveal-hidden typo-body text-navy/60 mt-3">
              India's waste and materials-recovery sector is scaling into a multi-billion-dollar market Ã¢â‚¬â€ and the working capital to build it out remains scarce. Pfundit is designing asset-backed credit for the operators closing the loop.
            </p>
          </div>

          {/* ── UNIFIED 3-COLUMN LAYOUT ── */}
          <div className="mt-12 grid sm:grid-cols-3 relative">
            {/* Continuous top border */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-navy/[0.08] via-navy/[0.04] to-transparent" />
            
            {esgVerticals.map((v, i) => (
              <div key={v.title} className={`group relative pt-10 pb-4 sm:pb-8 ${i > 0 ? 'sm:pl-10' : ''}`}>
                {/* Vertical separator line */}
                {i > 0 && <div className="hidden sm:block absolute left-0 top-0 h-full w-px bg-gradient-to-b from-navy/[0.06] to-transparent" />}

                {/* ── STAT PART ── */}
                <div data-reveal="block" className="reveal-hidden mb-12">
                   <h4 data-reveal="stat" className="block font-serif-editorial text-[clamp(1.7rem,2.8vw,2.3rem)] leading-none tracking-[-0.04em] text-navy mb-3 transition-colors duration-300 group-hover:text-[#9e7b22]">
                     {esgStats[i].value}
                   </h4>
                   <p className="typo-body-sm text-navy/50 max-w-[26ch]">
                     {esgStats[i].label}
                   </p>
                </div>

                {/* ── VERTICAL PART ── */}
                <div data-reveal="block" className="reveal-hidden relative">
                  {/* Icon & Animated Gold Line */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(212,164,55,0.3)] bg-[rgba(212,164,55,0.05)] text-[#D4A437] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[rgba(212,164,55,0.1)]">
                      {i === 0 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      )}
                      {i === 1 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      )}
                      {i === 2 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/></svg>
                      )}
                    </div>
                    {/* Animated Gold Line connecting to the edge */}
                    <div className="h-px flex-1 ml-5 bg-navy/[0.04] relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#D4A437] to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />
                    </div>
                  </div>
                  
                  <h3 className="typo-button text-navy mb-3 transition-colors duration-300 group-hover:text-[#9e7b22]">
                    {v.title}
                  </h3>
                  <p className="typo-body-sm text-navy/55 leading-relaxed">
                    {v.description}
                  </p>
                </div>
                
                {/* Subtle hover background glow behind entire column */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_left,rgba(212,164,55,0.03),transparent_70%)] pointer-events-none" />
              </div>
            ))}
          </div>

          <p className="mt-6 typo-small text-navy/30">
            Market estimates: NextMSC India Waste Management Market (2024); IBEF / Kalaari Capital circular-economy projections. Figures reflect total addressable market opportunity, not Pfundit's current loan book or AUM.
          </p>
        </div>
      </section>
    </>
  );
}
