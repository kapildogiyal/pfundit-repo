"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "@/animations/useScrollReveal";

const ctiRows = [
  { label: "Traditional NBFC", value: "55–65%", width: "62%", tone: "muted" as const },
  { label: "Existing Digital Lenders", value: "38–48%", width: "46%", tone: "digital" as const },
  { label: "Pfundit — Greenfield AI-Native", value: "25–30%*", width: "28%", tone: "highlight" as const },
];

const pillars = [
  { title: "AI-Native Core", description: "Credit decisioning built on machine learning from the first loan — not added to an existing workflow." },
  { title: "Human-in-the-Loop", description: "Mandatory human oversight at every consequential decision point. AI operates. Humans govern." },
  { title: "RBI Compliant by Design", description: "Regulatory compliance is an architectural constraint, not a retrofit. Built in from inception." },
  { title: "Hub & Spoke", description: "National reach through a distributed model. Scale without proportionate cost growth." },
];

type Tone = "muted" | "digital" | "highlight";

function toneStyles(tone: Tone) {
  if (tone === "highlight") return {
    label: "text-[#9e7b22]", value: "text-[#9e7b22]",
    fill: "bg-gradient-to-r from-[#b48a2d] via-[#d4a437] to-[#e8c96a] shadow-[0_0_12px_rgba(212,164,55,0.25)]",
  };
  if (tone === "digital") return {
    label: "text-[#0f1b3d]/65", value: "text-[#0f1b3d]",
    fill: "bg-gradient-to-r from-[rgba(15,27,61,0.55)] to-[rgba(26,48,94,0.7)]",
  };
  return {
    label: "text-[#0f1b3d]/45", value: "text-[#0f1b3d]/65",
    fill: "bg-[rgba(15,27,61,0.12)]",
  };
}

export function Infrastructure() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const barRefs = useRef<Array<HTMLDivElement | null>>([]);

  useScrollReveal(sectionRef);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    
    // Custom animation just for the CTI progress bars
    const ctx = gsap.context(() => {
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const targetWidth = bar.dataset.width || "0%";
        gsap.fromTo(bar, { width: 0 },
          { width: targetWidth, duration: 1.1, ease: "power3.out", delay: i * 0.14,
            scrollTrigger: { trigger: "[data-cti-panel]", start: "top 80%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ai-edge"
      className="relative overflow-hidden section-padding"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(15,27,61,0.08)] to-transparent" />
      {/* Very subtle ambient radial */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A437]/8 blur-[120px]" />
      </div>

      <div className="layout-shell editorial-container relative z-10">

        {/* Header + illustration side by side */}
        <div className="header-group flex items-start justify-between gap-8">
          <div className="max-w-[40rem]">
            <div data-reveal="eyebrow" className="reveal-hidden header-eyebrow">
              <div className="header-eyebrow-dot" />
              <span className="typo-eyebrow text-navy/55">The Structural Advantage</span>
            </div>
            <h2 data-reveal="heading" className="reveal-hidden typo-h2 text-navy header-heading">
              Why the Model is Built to <span className="italic text-[#d4a437]">Compound Differently</span>
            </h2>
            <p data-reveal="paragraph" className="reveal-hidden typo-body text-navy/60 max-w-[44rem]">
              A greenfield build means zero legacy debt. AI-native means faster decisions at lower cost. Hub &amp; Spoke means national reach without proportionate headcount. These design choices produce unit economics incumbents cannot replicate.
            </p>
          </div>

          {/* Illustration — blended with multiply */}
          <div data-reveal="texture" className="reveal-hidden hidden lg:block flex-shrink-0 illustration-float" style={{ width: 220, marginTop: '-1rem' }}>
            <Image
              src="/ChatGPT Image Jul 9, 2026, 04_58_32 PM.png"
              alt="Concentric precision circles"
              width={220}
              height={220}
              className="w-full h-auto select-none"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </div>

        {/* ── CTI Panel (Open Editorial Style) ── */}
        <div data-reveal="block" data-cti-panel
          className="reveal-hidden mb-16 relative mt-4">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-navy/[0.08] via-navy/[0.04] to-transparent" />
          
          <div className="pt-10 grid lg:grid-cols-[1fr_2fr] gap-10">
            <div>
              <p className="typo-eyebrow text-navy/35 mb-2">Cost-to-Income Ratio</p>
              <h3 className="typo-h3 text-navy font-serif-editorial">
                The Advantage is Structural, Not Cyclical
              </h3>
            </div>
            
            <div className="space-y-6">
              {ctiRows.map((row, i) => {
                const t = toneStyles(row.tone);
                return (
                  <div key={row.label} className="group relative">
                    <div className="mb-2 flex items-end justify-between gap-3">
                      <span className={`typo-button ${t.label} transition-colors duration-300 group-hover:text-[#9e7b22]`}>{row.label}</span>
                      <span className={`typo-button font-bold ${t.value} transition-colors duration-300 group-hover:text-[#9e7b22]`}>{row.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-navy/[0.04] overflow-hidden">
                      <div ref={(el) => { barRefs.current[i] = el; }}
                        data-width={row.width}
                        className={`relative h-full rounded-full overflow-hidden ${t.fill}`}
                        style={{ width: 0 }}>
                        <span className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/30 to-transparent" />
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="mt-5 text-[10px] italic leading-[1.6] text-navy/40 max-w-[80ch]">
                * Pfundit estimates based on AI/GPU compute economics, Hub &amp; Spoke design and digital-first origination. 25–30% cost-to-income target is projected within 24–36 months of launch in India. Subject to regulatory approvals and market conditions. Not a financial guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* ── 4 Pillars (Open Editorial Layout) ── */}
        <div className="mt-12 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-navy/[0.08] via-navy/[0.04] to-transparent" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 pt-10">
            {pillars.map((pillar, i) => (
              <div key={pillar.title} data-reveal="block" className="reveal-hidden group relative">
                
                {/* Icon & Animated Gold Line */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(212,164,55,0.3)] bg-[rgba(212,164,55,0.05)] text-[#D4A437] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[rgba(212,164,55,0.1)]">
                    {i === 0 && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
                    )}
                    {i === 1 && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    )}
                    {i === 2 && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    )}
                    {i === 3 && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    )}
                  </div>
                  {/* Animated Gold Line */}
                  <div className="h-px flex-1 ml-6 bg-navy/[0.04] relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#D4A437] to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />
                  </div>
                </div>

                <h3 className="typo-button text-navy mb-3 transition-colors duration-300 group-hover:text-[#9e7b22]">
                  {pillar.title}
                </h3>
                <p className="typo-body-sm text-navy/55 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Subtle hover background glow behind text */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_left,rgba(212,164,55,0.04),transparent_60%)] pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
