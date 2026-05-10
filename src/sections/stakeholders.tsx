'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stakeholderGroups = [
  {
    id: '01',
    title: 'Investors',
    eyebrow: 'For',
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
      gsap.fromTo(
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

      gsap.fromTo(
        '[data-stakeholder-card]',
        { opacity: 0, y: 56, scale: 0.97, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          transformOrigin: 'center top',
          scrollTrigger: {
            trigger: '[data-stakeholder-grid]',
            start: 'top 82%',
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-stakeholder-card]').forEach((card) => {
        const inner = card.querySelector<HTMLElement>('[data-stakeholder-inner]');
        const glow = card.querySelector<HTMLElement>('[data-stakeholder-glow]');
        const bullets = card.querySelectorAll<HTMLElement>('[data-stakeholder-bullet]');
        if (!inner || !glow) return;

        gsap.fromTo(
          bullets,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
            },
          }
        );

        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 7;
          const rotateX = (0.5 - y / rect.height) * 7;
          const glowX = (x / rect.width) * 100;
          const glowY = (y / rect.height) * 100;

          gsap.to(inner, {
            x: rotateY * 0.7,
            y: -rotateX * 0.7,
            rotateX,
            rotateY,
            transformPerspective: 950,
            duration: 0.35,
            ease: 'power2.out',
          });

          gsap.to(glow, {
            opacity: 1,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(212,164,55,0.16), rgba(255,255,255,0) 40%)`,
            duration: 0.35,
            ease: 'power2.out',
          });
        };

        const handleLeave = () => {
          gsap.to(inner, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power3.out',
          });

          gsap.to(glow, {
            opacity: 0.85,
            background:
              'radial-gradient(circle at top right, rgba(212,164,55,0.1), rgba(255,255,255,0) 30%)',
            duration: 0.45,
            ease: 'power3.out',
          });
        };

        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);

        cleanups.push(() => {
          card.removeEventListener('mousemove', handleMove);
          card.removeEventListener('mouseleave', handleLeave);
        });
      });
    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-18 md:py-20 lg:py-24"
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
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/60">
                Why Pfundit
              </span>
            </div>

            <h2 className="max-w-[20ch] text-[2.15rem] font-bold leading-[0.94] tracking-[-0.055em] text-navy sm:text-[2.45rem] md:text-[2.85rem]">
              For Our Stakeholders
            </h2>
          </div>

          <div data-stakeholder-intro className="mx-auto max-w-[34rem]">
            <p className="text-[0.92rem] leading-[1.7] text-navy/72 lg:text-[0.96rem]">
              One institution, three audiences. The same operating discipline.
            </p>
          </div>
        </header>

        <div data-stakeholder-grid className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3">
          {stakeholderGroups.map((group) => (
            <article
              key={group.title}
              data-stakeholder-card
              className="group relative"
              style={{ perspective: '950px' }}
            >
              <div
                data-stakeholder-inner
                className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,255,255,0.82)_56%,rgba(212,164,55,0.08)_100%)] p-5 shadow-[0_22px_64px_rgba(15,27,61,0.065)] transition-shadow duration-500 group-hover:shadow-[0_34px_84px_rgba(15,27,61,0.1)] sm:p-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  data-stakeholder-glow
                  className="pointer-events-none absolute inset-0 opacity-85"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(212,164,55,0.1), rgba(255,255,255,0) 30%)',
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-8 flex items-start justify-between gap-4 border-b border-navy/8 pb-5">
                    <div>
                      <span className="block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-gold">
                        {group.eyebrow}
                      </span>
                      <h3 className="mt-3 text-[1.28rem] font-bold leading-[1.05] tracking-[-0.04em] text-navy sm:text-[1.45rem]">
                        {group.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-gold/20 bg-white/75 px-3 py-1 text-[0.58rem] font-bold tracking-[0.18em] text-gold backdrop-blur-sm">
                      {group.id}
                    </span>
                  </div>

                  <p className="max-w-[24rem] text-[0.82rem] leading-[1.72] text-navy/64">
                    {group.summary}
                  </p>

                  <div className="mt-6 space-y-3.5">
                    {group.points.map((point) => (
                      <div key={point} data-stakeholder-bullet className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.55)]" />
                        <p className="text-[0.78rem] leading-[1.62] text-navy/72">{point}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <div className="h-px w-full bg-gradient-to-r from-navy/10 via-gold/20 to-transparent" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
