'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const pillars = [
  {
    id: 'Pillar 01',
    title: 'Corporate Governance',
    points: [
      'Singapore HoldCo (Pte. Ltd.) — ACRA registered, 2025',
      'Board of Directors with independent oversight (in formation)',
      'Audit, Risk & Compliance committees scoped pre-licensing',
      'Quarterly governance reviews from inception',
    ],
  },
  {
    id: 'Pillar 02',
    title: 'Risk & Compliance',
    points: [
      'RBI Master Directions for NBFCs — design baseline',
      'KYC / AML / CFT policies aligned to RBI & MAS',
      'Fair Practices Code — to be adopted at licensing',
      'Chief Risk Officer & Chief Compliance Officer roles open',
    ],
  },
  {
    id: 'Pillar 03',
    title: 'Data, Security & Audit',
    points: [
      'Data residency & DPDP Act 2023 (India) alignment',
      'Encryption in transit and at rest by design',
      'Role-based access; audit trails on every credit decision',
      'SOC 2 / ISO 27001 readiness on the operating roadmap',
    ],
  },
];

export function Governance() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-governance-intro]',
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
        '[data-governance-status]',
        { opacity: 0, y: 42, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-governance-status]',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '[data-governance-status-copy]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-governance-status]',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '[data-governance-card]',
        { opacity: 0, y: 52, scale: 0.97, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          transformOrigin: 'center top',
          scrollTrigger: {
            trigger: '[data-governance-grid]',
            start: 'top 84%',
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-governance-card]').forEach((card) => {
        const inner = card.querySelector<HTMLElement>('[data-governance-inner]');
        const glow = card.querySelector<HTMLElement>('[data-governance-glow]');
        const bullets = card.querySelectorAll<HTMLElement>('[data-governance-bullet]');
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
              start: 'top 86%',
            },
          }
        );

        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 6;
          const rotateX = (0.5 - y / rect.height) * 6;
          const glowX = (x / rect.width) * 100;
          const glowY = (y / rect.height) * 100;

          gsap.to(inner, {
            x: rotateY * 0.65,
            y: -rotateX * 0.65,
            rotateX,
            rotateY,
            transformPerspective: 950,
            duration: 0.35,
            ease: 'power2.out',
          });

          gsap.to(glow, {
            opacity: 1,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(212,164,55,0.16), rgba(255,255,255,0) 42%)`,
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
      id="governance"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-16 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute right-[-4%] top-1/4 h-80 w-80 rounded-full bg-navy/6 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">
        <header className="mx-auto grid max-w-[58rem] gap-5 text-center">
          <div data-governance-intro className="flex flex-col items-center">
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/60">
                Governance &amp; Trust
              </span>
            </div>

            <h2 className="max-w-[20ch] text-[2.15rem] font-bold leading-[0.94] tracking-[-0.055em] text-navy sm:text-[2.45rem] md:text-[2.85rem]">
              Built on Regulated Rails
            </h2>
          </div>

          <div data-governance-intro className="mx-auto max-w-[48rem]">
            <p className="text-[0.92rem] leading-[1.72] text-navy/72 lg:text-[0.96rem]">
              A Singapore-incorporated holding company operating to institutional standards from
              day one — designed for the scrutiny of regulators, investors and partners.
            </p>
          </div>
        </header>

        <div
          data-governance-status
          className="mx-auto mt-10 max-w-[64rem] overflow-hidden rounded-[1.85rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,255,255,0.92)_58%,rgba(212,164,55,0.04)_100%)] shadow-[0_18px_52px_rgba(15,27,61,0.055)] lg:mt-12"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="absolute left-[-4%] bottom-[-18%] h-44 w-44 rounded-full bg-navy/5 blur-[105px]" />
          </div>

          <div className="relative z-10 border-b border-navy/8 px-5 py-3 sm:px-6 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                data-governance-status-copy
                className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold"
              >
                Regulatory Status
              </span>
              <div
                data-governance-status-copy
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/75 px-3 py-1.5 backdrop-blur-sm"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.8)]" />
                <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-navy/60">
                  Updated 2026
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 px-5 py-5 sm:px-6 sm:py-5 lg:px-6 lg:py-6">
            <div className="max-w-[50rem]">
              <h3
                data-governance-status-copy
                className="text-[1.18rem] font-bold leading-[1.04] tracking-[-0.045em] text-navy sm:text-[1.3rem] lg:max-w-[20ch]"
              >
                Updated 2026
              </h3>
              <p
                data-governance-status-copy
                className="mt-3.5 text-[0.82rem] leading-[1.68] text-navy/74 sm:text-[0.86rem]"
              >
                India subsidiary in formation — intended application to the Reserve Bank of India
                (RBI) for registration as an NBFC — Type II, Non-Deposit Taking, Investment &amp;
                Credit Company (NBFC-ND-ICC).
              </p>
              <p
                data-governance-status-copy
                className="mt-3.5 max-w-[68ch] text-[0.76rem] leading-[1.68] text-navy/62 sm:text-[0.8rem]"
              >
                The India operating entity is being structured to satisfy applicable RBI Master
                Directions for NBFCs. The Singapore parent operates within Singapore&apos;s ACRA
                framework. As of the date of this website, no RBI application has been filed and no
                registration has been granted. Pfundit does not solicit, accept or hold deposits
                from the public in any jurisdiction and will not commence regulated lending
                activity in India until the requisite RBI registration is granted.
              </p>
            </div>
          </div>
        </div>

        <div
          data-governance-grid
          className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              data-governance-card
              className="group relative"
              style={{ perspective: '950px' }}
            >
              <div
                data-governance-inner
                className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,255,255,0.82)_56%,rgba(212,164,55,0.08)_100%)] p-5 shadow-[0_22px_64px_rgba(15,27,61,0.065)] transition-shadow duration-500 group-hover:shadow-[0_34px_84px_rgba(15,27,61,0.1)] sm:p-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  data-governance-glow
                  className="pointer-events-none absolute inset-0 opacity-85"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(212,164,55,0.1), rgba(255,255,255,0) 30%)',
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-7 border-b border-navy/8 pb-5">
                    <span className="block text-[0.58rem] font-bold uppercase tracking-[0.2em] text-gold">
                      {pillar.id}
                    </span>
                    <h3 className="mt-3 text-[1.2rem] font-bold leading-[1.08] tracking-[-0.04em] text-navy sm:text-[1.34rem]">
                      {pillar.title}
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    {pillar.points.map((point) => (
                      <div key={point} data-governance-bullet className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.55)]" />
                        <p className="text-[0.78rem] leading-[1.62] text-navy/72">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          data-governance-intro
          className="mx-auto mt-10 max-w-[62rem] border-t border-navy/10 pt-8 text-center text-[0.8rem] leading-[1.72] text-navy/46 lg:mt-12"
        >
          Governance disclosures will be expanded as the entity progresses through licensing.
          Nothing on this page constitutes an offer of securities, financial advice, or a
          solicitation to lend or borrow.
        </div>
      </div>
    </section>
  );
}
