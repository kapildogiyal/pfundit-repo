'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const verticals = [
  {
    id: '01',
    title: 'India NBFC',
    tagline: 'Phase 1 · Greenfield · Pre-RBI Licensing',
    description:
      "India's first greenfield AI-native NBFC. RBI compliance built into the architecture. Hub & Spoke designed to scale across India's ~$1.2Tn NBFC AUM market by 2030. Targeted at high-tailwind segments: Real Estate, AI infrastructure, circular economy and clean-tech supply chains.",
    image: '/mumbai-nbfc.png',
    metrics: [
      { label: '3-Yr CAGR (FY22-24)', value: '~18%' },
      { label: 'FY24-30 CAGR', value: '14-16%' },
      { label: 'AUM FY24', value: '₹43L Cr' },
      { label: 'AUM 2030', value: '₹100L Cr' },
    ],
    capabilities: [
      'Hub & Spoke — Optimize reach without capex',
      'RBI-compliant AI with HITL gates',
      'API-first — partners integrate, don\'t wait',
      'Proprietary AI agent IP under build',
    ],
  },
  {
    id: '02',
    title: 'SEA Digital Lending',
    tagline: 'Phase 2 · Multi-Market Platform Investments',
    description:
      'Platform investments across SEA where 70%+ of adults are underbanked and digital lending drives ~65% of digital financial services revenue. Our APAC network and AI infrastructure position us to partner across markets with structural credit gaps.',
    image: '/sea-lending.png',
    metrics: [
      { label: 'SEA Lending CAGR', value: '~30%' },
      { label: 'APAC Mkt 2032', value: '$13.2B' },
      { label: 'Underbanked', value: '>70%' },
      { label: 'MSME Gap', value: '$300B' },
    ],
    capabilities: [
      'Multi-market platform investments',
      'Co-lending and assignment structures',
      'AI risk pricing across markets',
      '$350B digital lending opportunity by 2030',
    ],
  },
];

export function InvestmentThesis() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = pinSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.thesis-card'));
      if (cards.length === 0) return;

      gsap.set(cards, { yPercent: 0, opacity: 1, scale: 1 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${Math.max(70, cards.length * 60)}%`,
          pin: true,
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        }
      });

      gsap.set(cards.slice(1), { yPercent: 100, opacity: 0, scale: 0.98 });

      cards.forEach((card, i) => {
        if (i === 0) return;

        tl.to(cards[i - 1], {
          scale: 0.97,
          opacity: 0.2,
          yPercent: -5,
          duration: 0.5,
          ease: 'power1.inOut',
          force3D: true
        }, i)
          .fromTo(card,
            { yPercent: 100, opacity: 0, scale: 0.98 },
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power1.out',
              force3D: true
            },
            i
          );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative bg-transparent">
      <section
        ref={pinSectionRef}
        data-thesis-pin
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#F0F5FF] px-6 py-4 lg:px-12"
      >
        <div className="layout-shell relative z-10 flex h-full w-full max-w-[1200px] flex-col items-center justify-center">

          {/* Even Tighter Header */}
          <header className="mb-4 w-full text-center lg:mb-6">
            <h2 className="typo-hero text-navy">
              What We Are <span className="text-gold">Building.</span>
            </h2>
          </header>

          {/* Optimized Card Stacking Area - Reduced Height */}
          <div className="relative h-[65vh] w-full max-w-[1000px] lg:h-[70vh]">
            {verticals.map((v, i) => (
              <div
                key={v.id}
                className="thesis-card absolute inset-0 flex items-center justify-center"
                style={{ zIndex: i + 1, willChange: 'transform, opacity' }}
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-navy/[0.03] bg-white shadow-[0_24px_80px_-20px_rgba(15,27,61,0.06)] lg:flex-row">

                  {/* Compact Left Column */}
                  <div className="flex flex-1 flex-col p-6 lg:p-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-[0.6rem] font-bold text-gold border border-gold/15">
                        {v.id}
                      </div>
                      <span className="typo-label text-navy/25">Strategic Vertical</span>
                    </div>

                    <h3 className="mb-1.5 text-xl font-bold tracking-tight text-navy lg:text-2xl">
                      {v.title}
                    </h3>
                    <p className="mb-3 typo-eyebrow text-gold opacity-80">
                      {v.tagline}
                    </p>

                    <p className="mb-4 typo-body-sm text-navy/60 lg:max-w-[95%]">
                      {v.description}
                    </p>

                    <div className="mt-auto space-y-3">
                      <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-navy/[0.05] pt-4">
                        {v.metrics.map((m) => (
                          <div key={m.label}>
                            <span className="block text-base font-bold tracking-tighter text-navy lg:text-lg">
                              {m.value}
                            </span>
                            <span className="mt-0.5 block typo-label text-navy/20 text-xs">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <motion.button
                        className="btn-hero-primary rounded-full px-7 py-3 typo-button text-white transition-all duration-300 hover:-translate-y-0.5 md:px-9"
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                      >
                        Talk to Us
                      </motion.button>
                    </div>
                  </div>


                  {/* Compact Right Column */}
                  <div className="relative hidden w-full lg:block lg:w-[40%]">
                    <Image
                      src={v.image}
                      alt={v.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />

                    <div className="absolute bottom-8 left-6 right-6">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                        <span className="mb-4 block typo-eyebrow text-white/40">
                          Key Capabilities
                        </span>
                        <div className="space-y-3">
                          {v.capabilities.map((cap) => (
                            <div key={cap} className="flex items-start gap-3">
                              <div className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
                              <span className="typo-body-sm text-white/90">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Capabilities (more compact) */}
                  <div className="bg-navy/[0.02] p-6 lg:hidden">
                    <span className="mb-3 block typo-eyebrow text-navy/40">
                      Key Capabilities
                    </span>
                    <div className="space-y-2">
                      {v.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-3">
                          <div className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          <span className="typo-body-sm text-navy/70">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[5%] right-[-5%] h-[500px] w-[500px] rounded-full bg-navy/[0.01] blur-[100px]" />
        <div className="absolute bottom-[5%] left-[-5%] h-[500px] w-[500px] rounded-full bg-gold/[0.01] blur-[100px]" />
      </div>
    </div>
  );
}
