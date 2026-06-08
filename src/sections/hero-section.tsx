'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TalkToUsButton } from '@/components/button';

const ambientNodes = [
  { id: 1, top: '12%', left: '62%', delay: 0 },
  { id: 2, top: '22%', left: '86%', delay: 0.4 },
  { id: 3, top: '36%', left: '70%', delay: 0.8 },
  { id: 4, top: '48%', left: '90%', delay: 0.3 },
  { id: 5, top: '64%', left: '76%', delay: 1.2 },
  { id: 6, top: '76%', left: '92%', delay: 0.7 },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-6 lg:min-h-[calc(100svh-0.5rem)] lg:pt-24 lg:pb-4 bg-[#08112a]"
      id="hero"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          src="/herosectionbgimage.png"
          alt="Architectural Backdrop"
          className="h-full w-full select-none object-cover opacity-35"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to right, rgba(8, 17, 42, 0.85) 0%, rgba(8, 17, 42, 0.5) 50%, rgba(8, 17, 42, 0.2) 100%)'
          }}
        />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_15%_15%,rgba(212,164,55,0.15),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(15,27,61,0.1),transparent_36%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
        <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1200 760" fill="none" preserveAspectRatio="none">
          <path d="M730 130C812 190 860 246 924 328" stroke="rgba(212,164,55,0.28)" strokeWidth="1.2" />
          <path d="M748 210C828 250 890 320 960 420" stroke="rgba(15,27,61,0.2)" strokeWidth="1.1" />
          <path d="M716 300C810 344 868 410 952 520" stroke="rgba(212,164,55,0.2)" strokeWidth="1" />
        </svg>

        {ambientNodes.map((node) => (
          <motion.span
            key={node.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold/70 shadow-[0_0_14px_rgba(212,164,55,0.6)]"
            style={{ top: node.top, left: node.left }}
            animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 4.6, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="layout-shell editorial-container relative z-10 w-full">
        <div className="grid grid-cols-12 items-center gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7 xl:col-span-8"
          >
            <div className="relative isolate max-w-[52rem] pt-10 lg:pt-12">
              <div className="mb-5 inline-flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
                <span className="typo-eyebrow text-gold">
                  AI-First Credit Infrastructure
                </span>
              </div>

              <h1 className="mb-3 max-w-[20ch] typo-hero text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                Disciplined Credit for the Real Economy.
              </h1>

              <p className="mb-6 max-w-[36rem] typo-body text-white/80 md:mb-7">
                Pfundit is a Singapore-incorporated holding company building a regulated, AI-enabled lending platform - starting with India, designed for Asia.
              </p>

              <div className="mb-6 grid max-w-[48rem] grid-cols-1 gap-6 py-4 sm:grid-cols-2 md:grid-cols-3 md:mb-7 md:py-5">
                <div>
                  <span className="block text-[clamp(1.45rem,4vw,1.95rem)] font-bold tracking-tighter text-white">
                    &#8377;100L Cr
                  </span>
                  <span className="mt-1 block max-w-[13ch] typo-label text-white/60">
                    India NBFC AUM by 2030
                  </span>
                </div>
                <div>
                  <span className="block text-[clamp(1.45rem,4vw,1.95rem)] font-bold tracking-tighter text-white">
                    60+ yrs
                  </span>
                  <span className="mt-1 block max-w-[15ch] typo-label text-white/60">
                    Founder banking pedigree
                  </span>
                </div>
                <div>
                  <span className="block text-[clamp(1.45rem,4vw,1.95rem)] font-bold tracking-tighter text-white">
                    25-30%*
                  </span>
                  <span className="mt-1 block max-w-[16ch] typo-label text-white/60">
                    Target cost-to-income
                  </span>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-4 md:mb-7 md:gap-5">
                <motion.button
                  onClick={() => document.getElementById('thesis')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-hero-secondary group inline-flex items-center gap-3 rounded-full px-5 py-3 typo-button text-navy/72 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:text-navy md:px-6"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore the Thesis</span>
                  <span className="text-sm tracking-normal text-gold transition-all duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </motion.button>
                <TalkToUsButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
              </div>

              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="typo-label text-white/50">
                  Incorporated in Singapore &middot; ACRA Registered
                </span>
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:col-span-5 xl:col-span-4 lg:block">
            <div className="relative mx-auto w-full max-w-[26rem]">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
