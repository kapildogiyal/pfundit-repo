'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
      className="relative overflow-hidden bg-[#F0F5FF] py-20 md:py-24 lg:py-28"
      id="contact"
    >
      <div className="layout-shell editorial-container relative z-10">
        <div className="mx-auto max-w-[80rem] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy via-[#0a1628] to-[#050f1f] px-8 py-20 sm:px-12 md:py-24 relative">
          {/* Geometric pattern background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1200 600" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <circle cx="600" cy="300" r="400" fill="none" stroke="#d4a437" strokeWidth="2" opacity="0.15"/>
              <circle cx="600" cy="300" r="350" fill="none" stroke="#d4a437" strokeWidth="2" opacity="0.12"/>
              <circle cx="600" cy="300" r="300" fill="none" stroke="#d4a437" strokeWidth="2" opacity="0.1"/>
              <circle cx="600" cy="300" r="250" fill="none" stroke="#d4a437" strokeWidth="2" opacity="0.08"/>
              <circle cx="600" cy="300" r="200" fill="none" stroke="#d4a437" strokeWidth="2" opacity="0.06"/>
            </svg>
          </div>
          {/* Content */}
          <div className="relative z-10 text-center">
            <div
              data-contact-reveal
              className="text-center"
            >
              <h2 className="text-[2.4rem] font-bold leading-[1.15] tracking-[-0.04em] text-white sm:text-[2.8rem] md:text-[3.4rem]">
                Let&apos;s Have a Conversation
              </h2>

              <p className="mx-auto mt-6 max-w-[56rem] text-[0.95rem] leading-[1.42] text-white/75 sm:text-[1rem] md:mt-8">
                Investor, debt provider, co-lending partner, technology partner, consultant — we are building the founding stakeholder ecosystem now.
              </p>
            </div>

            {/* Buttons Section */}
            <div
              data-contact-reveal
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4 md:mt-12"
            >
              <motion.a
                href="mailto:info@pfundit.com"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white btn-hero-primary transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Talk to Us
              </motion.a>

              <motion.button
                type="button"
                className="inline-flex items-center justify-center rounded-full border-2 border-gold px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/10 hover:shadow-[0_0_24px_rgba(212,164,55,0.3)]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Meeting
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
