'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stakeholderGroups = [
  {
    id: '01',
    title: 'Investors',
    eyebrow: 'For',
    image: '/images/stakeholders_investors.png',
    summary: 'A rare greenfield at the intersection of regulation, AI and scale.',
    points: [
      "Building India's first greenfield AI-native NBFC — no legacy, no migration.",
      'Targeted 25-30% cost-to-income via Hub & Spoke architecture.',
      'Proprietary AI agent IP — moat deepens with every loan.',
      'Singapore HoldCo with institutional-grade governance.',
    ],
  },
  {
    id: '02',
    title: 'Debt Providers & Banks',
    eyebrow: 'For',
    image: '/images/stakeholders_banks.png',
    summary: 'Banking discipline meets engineering ambition.',
    points: [
      'Founders ex-J.P. Morgan & HSBC — credit, NPL and risk operators.',
      'Mandatory human-in-the-loop on every AI credit decision.',
      'RBI-compliant by design — every decision audit-ready.',
      'Co-lending, assignment and portfolio acquisition structures.',
    ],
  },
  {
    id: '03',
    title: 'Partners & Consultants',
    eyebrow: 'For',
    image: '/images/stakeholders_partners.png',
    summary: 'A platform built to integrate from line one of code.',
    points: [
      'API-first architecture — integration is the design principle.',
      'IP co-development opportunities on the AI agent framework.',
      'Need: RBI, credit modelling, collections, fintech infra, NBFC licensing.',
      'Equity, advisory and commercial structures available.',
    ],
  },
];

export function Stakeholders() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const runFromTo = (selector: string, fromVars: any, toVars: any) => {
        const els = section.querySelectorAll(selector);
        if (!els || els.length === 0) return;
        gsap.fromTo(els as any, fromVars, toVars);
      };

      // Intro headers
      runFromTo(
        '[data-stakeholder-intro]',
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
          },
        }
      );

      // --- Desktop Pinned Logic ---
      const textBlocks = gsap.utils.toArray<HTMLElement>('[data-stakeholder-text-block]');
      const pinnedImgs = gsap.utils.toArray<HTMLImageElement>('[data-stakeholder-pinned-img]');

      textBlocks.forEach((block, index) => {
        // Animate text block entry
        const content = block.querySelector('[data-block-content]');
        if (content) {
          gsap.fromTo(content, 
            { opacity: 0, y: 60 },
            { 
              opacity: 1, y: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: "top center+=35%",
                end: "bottom center-=35%",
                toggleActions: "play reverse play reverse",
              }
            }
          );
        }

        // Trigger image crossfade when text block is active
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            const others = pinnedImgs.filter((_, i) => i !== index);
            gsap.to(others, { opacity: 0, scale: 1.05, zIndex: 0, duration: 0.8, ease: 'power2.inOut', overwrite: true });
            gsap.to(pinnedImgs[index], { opacity: 1, scale: 1, zIndex: 10, duration: 0.8, ease: 'power2.inOut', overwrite: true });
          },
          onEnterBack: () => {
            const others = pinnedImgs.filter((_, i) => i !== index);
            gsap.to(others, { opacity: 0, scale: 1.05, zIndex: 0, duration: 0.8, ease: 'power2.inOut', overwrite: true });
            gsap.to(pinnedImgs[index], { opacity: 1, scale: 1, zIndex: 10, duration: 0.8, ease: 'power2.inOut', overwrite: true });
          }
        });
      });

      // --- Mobile Stack Logic ---
      const mobileRows = gsap.utils.toArray<HTMLElement>('[data-stakeholder-mobile-row]');
      if (mobileRows.length > 0) {
        mobileRows.forEach((row) => {
        const img = row.querySelector('[data-stakeholder-mobile-img]');
        const text = row.querySelector('[data-stakeholder-mobile-text]');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 82%' }
        });
        tl.fromTo(img, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .fromTo(text, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5");
        });
      }

    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-clip bg-[#F0F5FF] py-16 md:py-20 lg:py-24"
      id="stakeholders"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-16 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute right-[-4%] top-1/4 h-80 w-80 rounded-full bg-navy/6 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">
        <header className="mx-auto grid max-w-[56rem] gap-4 text-center">
          <div data-stakeholder-intro className="flex flex-col items-center">
            <h2 className="typo-hero text-navy">
              For Our Stakeholders
            </h2>
          </div>

          <div data-stakeholder-intro className="mx-auto max-w-[34rem]">
            <p className="text-[0.92rem] leading-[1.28] text-navy/72 lg:text-[0.96rem]">
              One institution, three audiences. The same operating discipline.
            </p>
          </div>
        </header>

        {/* --- Mobile Stack (Hidden on Desktop) --- */}
        <div className="mt-12 flex flex-col gap-20 lg:hidden">
          {stakeholderGroups.map((group) => (
            <article key={group.id} data-stakeholder-mobile-row className="flex flex-col gap-8">
              <div data-stakeholder-mobile-img className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,255,255,0.4)_100%)] p-3 shadow-[0_22px_64px_rgba(15,27,61,0.065)]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.25rem]">
                  <img src={group.image} alt={group.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/10 to-transparent" />
                </div>
              </div>

              <div data-stakeholder-mobile-text className="flex flex-col">
                <div className="mb-4 flex items-center gap-4">
                  <span className="rounded-full border border-gold/20 bg-white/75 px-3 py-1 typo-label text-gold backdrop-blur-sm">{group.id}</span>
                  <span className="block typo-label text-gold">{group.eyebrow}</span>
                </div>
                <h3 className="mb-3 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-navy">{group.title}</h3>
                <p className="mb-6 text-[1.05rem] leading-[1.55] text-navy/70">{group.summary}</p>
                <div className="space-y-4">
                  {group.points.map((point) => (
                    <div key={point} className="flex items-start gap-4">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.55)]" />
                      <p className="text-[0.98rem] leading-[1.5] text-navy/80">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- Desktop Sticky Scroll Layout (Hidden on Mobile) --- */}
        <div className="hidden lg:flex relative mt-16 items-start gap-16 xl:gap-24">
          
          {/* Left: Scrolling Text Blocks */}
          <div className="w-[50%] flex flex-col pb-[20vh]">
            {stakeholderGroups.map((group) => (
              <div 
                key={group.id} 
                data-stakeholder-text-block
                className="flex flex-col justify-center min-h-[90vh]"
              >
                <div data-block-content className="flex flex-col max-w-[34rem] opacity-0">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="rounded-full border border-gold/20 bg-white/75 px-3 py-1 typo-label text-gold backdrop-blur-sm">
                      {group.id}
                    </span>
                    <span className="block typo-label text-gold">
                      {group.eyebrow}
                    </span>
                  </div>

                  <h3 className="mb-6 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-navy">
                    {group.title}
                  </h3>

                  <p className="mb-8 text-[1.1rem] leading-[1.6] text-navy/75">
                    {group.summary}
                  </p>

                  <div className="space-y-5">
                    {group.points.map((point) => (
                      <div key={point} className="flex items-start gap-4">
                        <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.55)]" />
                        <p className="text-[1.02rem] leading-[1.55] text-navy/85">{point}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12">
                     <button className="group/btn inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/60 px-7 py-3 text-[0.88rem] font-bold text-navy transition-all hover:bg-navy hover:text-white hover:border-navy hover:shadow-xl">
                        Learn More
                        <svg className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky Full-Height Image Container */}
          <div className="w-[50%] sticky top-[6.5rem] flex flex-col justify-start h-[calc(100vh-6.5rem)] pb-[5vh]">
            <div className="relative w-full h-[78vh] overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,255,255,0.4)_100%)] p-3 shadow-[0_22px_64px_rgba(15,27,61,0.065)]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                {stakeholderGroups.map((group, index) => (
                  <img 
                    key={`img-${group.id}`}
                    data-stakeholder-pinned-img
                    src={group.image} 
                    alt={group.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ 
                      opacity: index === 0 ? 1 : 0, 
                      transform: index === 0 ? 'scale(1)' : 'scale(1.05)',
                      zIndex: index === 0 ? 10 : 0 
                    }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/10 to-transparent pointer-events-none z-20" />
              </div>
            </div>
            
            {/* Decorative glows */}
            <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gold/5 blur-3xl pointer-events-none" />
            <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-navy/4 blur-2xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
