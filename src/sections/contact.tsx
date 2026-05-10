'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-reveal]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-18 md:py-20 lg:py-24"
      id="contact"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-12 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute right-[-4%] top-1/3 h-80 w-80 rounded-full bg-navy/6 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">
        <div
          data-contact-reveal
          className="mx-auto max-w-[64rem] overflow-hidden rounded-[2.2rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,255,255,0.88)_52%,rgba(212,164,55,0.08)_100%)] shadow-[0_24px_72px_rgba(15,27,61,0.07)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
            <div className="absolute right-[10%] top-[-12%] h-44 w-44 rounded-full bg-gold/10 blur-[100px]" />
            <div className="absolute left-[-5%] bottom-[-18%] h-48 w-48 rounded-full bg-navy/5 blur-[110px]" />
          </div>

          <div className="relative z-10 px-6 py-8 text-center sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div data-contact-reveal className="flex flex-col items-center">
              <div className="mb-5 inline-flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/60">
                  Get in Touch
                </span>
              </div>

              <h2 className="max-w-[14ch] text-[2.15rem] font-bold leading-[0.94] tracking-[-0.055em] text-navy sm:text-[2.45rem] md:text-[2.85rem]">
                Let&apos;s Have a Conversation
              </h2>
            </div>

            <p
              data-contact-reveal
              className="mx-auto mt-6 max-w-[44rem] text-[0.92rem] leading-[1.75] text-navy/72 lg:text-[0.96rem]"
            >
              Investor, debt provider, co-lending partner, technology partner, consultant — we
              are building the founding stakeholder ecosystem now.
            </p>

            <div
              data-contact-reveal
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
            >
              <a
                href="mailto:info@pfundit.com"
                className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3 text-[0.64rem] font-bold tracking-[0.1em] text-white shadow-[0_18px_36px_rgba(15,27,61,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-navy hover:shadow-[0_20px_36px_rgba(212,164,55,0.28)]"
              >
                Contact the Team
              </a>

              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-full border border-navy/10 bg-white/80 px-7 py-3 text-[0.64rem] font-bold tracking-[0.1em] text-navy/75 shadow-[0_12px_28px_rgba(15,27,61,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:bg-navy hover:text-white"
              >
                Schedule a Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
