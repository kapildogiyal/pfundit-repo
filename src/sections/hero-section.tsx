'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 pb-6 lg:min-h-[calc(100svh-0.5rem)] lg:pt-15 lg:pb-4"
      id="hero"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          src="/herosectionbgimage.png"
          alt="Architectural Backdrop"
          className="h-full w-full select-none object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/76 via-white/42 to-white/12 lg:from-white/62 lg:via-white/60 lg:to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,164,55,0.2),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(15,27,61,0.17),transparent_36%)]" />
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.24, 0.42, 0.24] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(50% 40% at 18% 12%, rgba(255,255,255,0.4), transparent 72%), radial-gradient(42% 32% at 88% 14%, rgba(255,255,255,0.28), transparent 70%)',
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
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
            <div className="max-w-[52rem] pt-10 lg:pt-12">
              <div className="mb-5 inline-flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/60">
                  AI-First Credit Infrastructure
                </span>
              </div>

              <h1 className="mb-3 max-w-[27ch] text-[2.15rem] leading-[0.94] font-bold tracking-[-0.055em] text-navy drop-shadow-[0_8px_30px_rgba(255,255,255,0.4)] sm:text-[2.45rem] md:mb-4 md:text-[2.85rem]">
                Building Asia&apos;s First <span className="text-gold-gradient">AI-Native</span> Credit Institution
              </h1>

              <p className="mb-6 max-w-[36rem] text-[0.92rem] leading-[1.55] text-navy/72 md:mb-7 lg:text-[0.96rem]">
                A Singapore-incorporated holding company building an API-first NBFC in India and
                digital lending infrastructure across Southeast Asia. No legacy. No migration. Built
                correctly from day one.
              </p>

              <div className="mb-6 grid max-w-[48rem] grid-cols-1 gap-4 border-y border-navy/10 py-4 sm:grid-cols-3 md:mb-7 md:gap-6 md:py-5">
                <div>
                  <span className="block text-[1.7rem] font-bold tracking-tighter text-navy md:text-[1.95rem]">
                    &#8377;100L Cr
                  </span>
                  <span className="mt-1 block max-w-[13ch] text-[0.68rem] font-semibold tracking-[0.03em] text-text-muted">
                    India NBFC AUM by 2030
                  </span>
                </div>
                <div>
                  <span className="block text-[1.7rem] font-bold tracking-tighter text-navy md:text-[1.95rem]">
                    60+ yrs
                  </span>
                  <span className="mt-1 block max-w-[15ch] text-[0.68rem] font-semibold tracking-[0.03em] text-text-muted">
                    Founder banking pedigree
                  </span>
                </div>
                <div>
                  <span className="block text-[1.7rem] font-bold tracking-tighter text-navy md:text-[1.95rem]">
                    25-30%*
                  </span>
                  <span className="mt-1 block max-w-[16ch] text-[0.68rem] font-semibold tracking-[0.03em] text-text-muted">
                    Target cost-to-income
                  </span>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-4 md:mb-7 md:gap-5">
                <motion.button
                  onClick={() => document.getElementById('thesis')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-hero-secondary group inline-flex items-center gap-3 rounded-full px-5 py-3 text-[0.62rem] font-bold tracking-[0.12em] text-navy/72 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:text-navy md:px-6"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore the Thesis</span>
                  <span className="text-sm tracking-normal text-gold transition-all duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </motion.button>
                <motion.button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-hero-primary rounded-full px-7 py-3 text-[0.62rem] font-bold tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 md:px-9"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                >
                  Talk to Us
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[0.72rem] font-medium tracking-[0.03em] text-navy/45">
                  Incorporated in Singapore &middot; ACRA Registered
                </span>
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:col-span-5 xl:col-span-4 lg:block">
            <div className="relative mx-auto w-full max-w-[26rem]">
              <motion.div
                className="surface-premium relative rounded-[1.6rem] p-4"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[0.54rem] font-bold uppercase tracking-[0.16em] text-navy/55">AI Decision Fabric</span>
                  <span className="rounded-full border border-gold/25 bg-white/70 px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.16em] text-gold">Live</span>
                </div>
                <div className="space-y-2.5">
                  <div className="h-2 rounded-full bg-navy/10">
                    <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,rgba(15,27,61,0.86),rgba(212,164,55,0.92))]" animate={{ width: ['34%', '72%', '56%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
                  </div>
                  <div className="h-2 rounded-full bg-navy/10">
                    <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,rgba(15,27,61,0.76),rgba(212,164,55,0.7))]" animate={{ width: ['18%', '52%', '44%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
                  </div>
                  <div className="h-2 rounded-full bg-navy/10">
                    <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,rgba(15,27,61,0.68),rgba(212,164,55,0.62))]" animate={{ width: ['26%', '63%', '49%'] }} transition={{ duration: 7.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="surface-premium absolute -left-6 top-[58%] w-[13.2rem] rounded-[1.25rem] p-4"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              >
                <p className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-navy/48">Credit Pulse</p>
                <p className="mt-3 text-[1.3rem] font-bold tracking-[-0.04em] text-navy">98.6%</p>
                <p className="text-[0.62rem] font-semibold text-navy/56">Model confidence</p>
              </motion.div>

              <motion.div
                className="surface-premium absolute -right-6 top-10 w-[12.5rem] rounded-[1.2rem] p-4"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
              >
                <p className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-navy/48">Infra Readiness</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.8)]" />
                  <p className="text-[0.78rem] font-semibold text-navy/70">RBI-aligned control rails</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
