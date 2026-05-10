'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const roles = [
  { type: 'Fractional / Advisory', title: 'Chief Risk Officer' },
  { type: 'Fractional / Advisory', title: 'Chief Compliance Officer' },
  { type: 'Fractional / Advisory', title: 'Chief Financial Officer' },
  { type: 'Fractional / Full-Time', title: 'Chief Technology Officer' },
  { type: 'Fractional / Advisory', title: 'Chief Credit Officer' },
  { type: 'Fractional / Advisory', title: 'Chief Operating Officer' },
  { type: 'Fractional / Consultant', title: 'Head of Product' },
  { type: 'Fractional / Consultant', title: 'Head of Business Development & Partnerships' },
];

export function Hiring() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hiring-intro]',
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
        '[data-role-card]',
        { opacity: 0, y: 48, scale: 0.97, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
          transformOrigin: 'center top',
          scrollTrigger: {
            trigger: '[data-role-grid]',
            start: 'top 82%',
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-role-card]').forEach((card) => {
        const inner = card.querySelector<HTMLElement>('[data-role-inner]');
        const glow = card.querySelector<HTMLElement>('[data-role-glow]');
        if (!inner || !glow) return;

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
      id="hiring"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-16 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute right-[-4%] top-1/4 h-80 w-80 rounded-full bg-navy/6 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">
        <header className="mx-auto grid max-w-[56rem] gap-5 text-center">
          <div data-hiring-intro className="flex flex-col items-center">
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/60">
                Founding Team · India
              </span>
            </div>

            <h2 className="max-w-[20ch] text-[2.15rem] font-bold leading-[0.94] tracking-[-0.055em] text-navy sm:text-[2.45rem] md:text-[2.85rem]">
              Join at the Ground Floor
            </h2>
          </div>

          <div data-hiring-intro className="mx-auto max-w-[42rem]">
            <p className="text-[0.92rem] leading-[1.7] text-navy/72 lg:text-[0.96rem]">
              Founding leadership for India&apos;s first AI-native NBFC. All roles Fractional or
              Consultant — equity available for the right individuals.
            </p>
          </div>
        </header>

        <div
          data-role-grid
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:mt-12"
        >
          {roles.map((role) => (
            <article
              key={role.title}
              data-role-card
              className="group relative"
              style={{ perspective: '950px' }}
            >
              <div
                data-role-inner
                className="relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,255,255,0.84)_56%,rgba(212,164,55,0.08)_100%)] p-4 shadow-[0_18px_50px_rgba(15,27,61,0.06)] transition-shadow duration-500 group-hover:shadow-[0_28px_72px_rgba(15,27,61,0.09)] sm:p-5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  data-role-glow
                  className="pointer-events-none absolute inset-0 opacity-85"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(212,164,55,0.1), rgba(255,255,255,0) 30%)',
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <span className="block text-[0.54rem] font-bold uppercase tracking-[0.18em] text-gold">
                    {role.type}
                  </span>

                  <h3 className="mt-3 min-h-[3.35rem] text-[1.08rem] font-bold leading-[1.04] tracking-[-0.04em] text-navy">
                    {role.title}
                  </h3>

                  <div className="mt-auto border-t border-navy/8 pt-3">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-[0.64rem] font-semibold tracking-[0.08em] text-navy/78 transition-colors duration-300 hover:text-gold"
                    >
                      Express interest
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          data-hiring-intro
          className="mx-auto mt-8 max-w-[56rem] rounded-[2rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,255,255,0.82)_56%,rgba(212,164,55,0.07)_100%)] p-6 text-center shadow-[0_22px_60px_rgba(15,27,61,0.055)] sm:p-8"
        >
          <h3 className="text-[1.2rem] font-bold tracking-[-0.04em] text-navy">
            Role not listed? Reach out anyway.
          </h3>
          <p className="mx-auto mt-4 max-w-[44rem] text-[0.88rem] leading-[1.72] text-navy/68">
            Deep expertise in Indian fintech, NBFC regulation, credit, AI infrastructure or
            regulated FS — we want to hear from you.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 px-5 py-3 text-[0.66rem] font-bold tracking-[0.1em] text-navy/78 shadow-[0_12px_28px_rgba(15,27,61,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:bg-navy hover:text-white"
          >
            Send an Open Application
          </a>
        </div>
      </div>
    </section>
  );
}
