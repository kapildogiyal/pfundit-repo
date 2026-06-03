'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TalkToUsButton } from '@/components/button';

const verticals = [
  {
    id: '01',
    title: 'India NBFC',
    tagline: 'Phase 1 · Greenfield · Pre-RBI Licensing',
    description:
      "Pfundit is establishing a regulated NBFC in India - focused on shorter-tenor, asset-aware lending tied to real economic flows. The platform combines institutional credit discipline with AI-enabled infrastructure, creating a portfolio that is monitorable at the asset level from day one. Our focus segments include supply-chain finance, MSME receivables and payables, rental-backed structures and circular-economy supply chains.",
    image: '/mumbai-nbfc.png',
    metrics: [
      { label: '3-Yr CAGR (FY22-24)', value: '~18%' },
      { label: 'FY24-30 CAGR', value: '14-16%' },
      { label: 'AUM FY24', value: '₹43L Cr' },
      { label: 'AUM 2030', value: '₹100L Cr' },
    ],
    capabilities: [
      'Hub & Spoke model - national reach without proportionate headcount or physical infrastructure',
      'RBI-compliant AI hierarchy with mandatory human oversight at every decision gate',
      'API-first architecture - partners integrate, they do not wait',
      'Proprietary AI Agent IP - credit underwriting and collections under development',
    ],
  },
  {
    id: '02',
    title: 'SEA Digital Lending',
    tagline: 'Phase 2 · Regional Strategy · Post-India',
    description:
      "Pfundit was structured in Singapore because the founders' operating experience is regional. Once the India NBFC is established and operational, the same model - transaction-backed credit, asset-level monitoring, institutional governance - is designed to extend into Southeast Asia, where over 70% of adults remain underbanked and the MSME financing gap exceeds $300 billion. Southeast Asia is not a parallel track. It is a deliberate second chapter, enabled by the same infrastructure, the same governance standards and the same team.",
    image: '/sea-lending.png',
    metrics: [
      { label: 'SEA Lending CAGR', value: '~30%' },
      { label: 'APAC Mkt 2032', value: '$13.2B' },
      { label: 'Underbanked', value: '>70%' },
      { label: 'MSME Gap', value: '$300B' },
    ]
  },
];

export function InvestmentThesis() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
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
        className="relative flex flex-col items-center justify-center overflow-hidden bg-[#F0F5FF] px-4 py-10 sm:px-6 lg:min-h-[100svh] lg:px-12 lg:py-4"
      >
        <div className="layout-shell relative z-10 flex w-full max-w-[1200px] flex-col items-center justify-center lg:h-full">

          {/* Even Tighter Header */}
          <header className="mb-4 w-full text-center lg:mb-6">
            <h2 className="typo-hero text-navy">
              What We Are <span className="text-gold">Building</span>
            </h2>
          </header>

          <div className="grid w-full max-w-[1000px] gap-4 lg:hidden">
            {verticals.map((v) => (
              <article
                key={v.id}
                className="overflow-hidden rounded-[1.5rem] border border-navy/[0.03] bg-white shadow-[0_24px_80px_-20px_rgba(15,27,61,0.06)]"
              >
                <div className="flex flex-col">
                  <div className="flex flex-col p-5 sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/15 bg-gold/10 text-[0.6rem] font-bold text-gold">
                        {v.id}
                      </div>
                      <span className="typo-label text-navy/25">Strategic Vertical</span>
                    </div>

                    <h3 className="mb-1.5 text-xl font-bold tracking-tight text-navy sm:text-2xl">
                      {v.title}
                    </h3>
                    <p className="mb-3 typo-eyebrow text-gold opacity-80">
                      {v.tagline}
                    </p>

                    <p className="mb-5 typo-body-sm text-navy/60">
                      {v.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 border-t border-navy/[0.05] pt-4">
                      {v.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="block text-[clamp(0.95rem,2.8vw,1.08rem)] font-bold tracking-tighter text-navy">
                            {m.value}
                          </span>
                          <span className="mt-0.5 block text-xs typo-label text-navy/20">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-navy/[0.02] p-5 sm:p-6">
                    {v.capabilities?.length ? (
                      <>
                        <span className="mb-3 block typo-eyebrow text-navy/40">
                          Key Capabilities
                        </span>
                        <div className="space-y-2.5">
                          {v.capabilities.map((cap) => (
                            <div key={cap} className="flex items-start gap-3">
                              <div className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
                              <span className="typo-body-sm text-navy/70">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}

                    <div className="mt-5">
                      <TalkToUsButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Optimized Card Stacking Area - Desktop Only */}
          <div className="relative hidden h-[70vh] w-full max-w-[1000px] lg:block">
            {verticals.map((v, i) => (
              <div
                key={v.id}
                className="thesis-card absolute inset-0 flex items-center justify-center"
                style={{ zIndex: i + 1, willChange: 'transform, opacity' }}
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-navy/[0.03] bg-white shadow-[0_24px_80px_-20px_rgba(15,27,61,0.06)] lg:flex-row">

                  {/* Compact Left Column */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-10">
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
                            <span className="block text-[clamp(0.95rem,2.8vw,1.08rem)] font-bold tracking-tighter text-navy lg:text-lg">
                              {m.value}
                            </span>
                            <span className="mt-0.5 block typo-label text-navy/20 text-xs">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <TalkToUsButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
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
                      {v.capabilities?.length ? (
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
                      ) : null}
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
