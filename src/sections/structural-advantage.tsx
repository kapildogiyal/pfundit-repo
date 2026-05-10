'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type MetricRow = {
  label: string;
  value: string;
  width: string;
  tone: 'muted' | 'digital' | 'highlight';
};

type Metric = {
  title: string;
  values: MetricRow[];
};

const metrics: Metric[] = [
  {
    title: 'Cost-to-Income',
    values: [
      { label: 'Traditional NBFC', value: '55-65%', width: '24%', tone: 'muted' },
      { label: 'Existing Digital Lenders', value: '38-48%', width: '46%', tone: 'digital' },
      {
        label: 'Pfundit \u2014 Greenfield AI-Native',
        value: '25-30%*',
        width: '78%',
        tone: 'highlight',
      },
    ],
  },
  {
    title: 'Underwriting / Loan',
    values: [
      { label: 'Traditional NBFC', value: '\u20B91,200-2,000', width: '20%', tone: 'muted' },
      { label: 'Existing Digital Lenders', value: '\u20B9500-900', width: '42%', tone: 'digital' },
      {
        label: 'Pfundit \u2014 Greenfield AI-Native',
        value: '\u20B9100-200*',
        width: '80%',
        tone: 'highlight',
      },
    ],
  },
  {
    title: 'Time to Decision',
    values: [
      { label: 'Traditional NBFC', value: '3-7 days', width: '18%', tone: 'muted' },
      { label: 'Existing Digital Lenders', value: '4-24 hrs', width: '48%', tone: 'digital' },
      {
        label: 'Pfundit \u2014 Greenfield AI-Native',
        value: '30 min-12 hr*',
        width: '82%',
        tone: 'highlight',
      },
    ],
  },
  {
    title: 'CAC',
    values: [
      { label: 'Traditional NBFC', value: '\u20B93,000-5,000', width: '22%', tone: 'muted' },
      {
        label: 'Existing Digital Lenders',
        value: '\u20B91,500-2,500',
        width: '44%',
        tone: 'digital',
      },
      {
        label: 'Pfundit \u2014 Greenfield AI-Native',
        value: '\u20B9800-1,200*',
        width: '74%',
        tone: 'highlight',
      },
    ],
  },
  {
    title: 'Collections Uplift',
    values: [
      { label: 'Traditional NBFC', value: 'Baseline', width: '10%', tone: 'muted' },
      { label: 'Existing Digital Lenders', value: '+25-35%', width: '32%', tone: 'digital' },
      {
        label: 'Pfundit \u2014 Greenfield AI-Native',
        value: '+55-70%*',
        width: '62%',
        tone: 'highlight',
      },
    ],
  },
];

const pillars = [
  {
    title: 'AI-Native Core',
    description: 'Credit decisioning built on ML from the first loan.',
  },
  {
    title: 'Human-in-the-Loop',
    description: 'Mandatory oversight at every high-stakes gate.',
  },
  {
    title: 'RBI Compliant by Design',
    description: 'Regulation as architectural constraint, not retrofit.',
  },
  {
    title: 'Hub & Spoke',
    description:
      'National reach without heavy branch capex \u2014 capital-efficient by design.',
  },
];

function rowTone(tone: MetricRow['tone']) {
  if (tone === 'highlight') {
    return {
      label: 'text-[#9e7b22]',
      value: 'text-[#9e7b22]',
      fill: 'bg-[linear-gradient(90deg,rgba(157,121,33,0.9),rgba(212,164,55,0.95),rgba(238,204,120,0.9))] shadow-[0_0_18px_rgba(212,164,55,0.35)]',
    };
  }

  if (tone === 'digital') {
    return {
      label: 'text-navy/72',
      value: 'text-navy',
      fill: 'bg-[linear-gradient(90deg,rgba(15,27,61,0.75),rgba(26,48,94,0.9),rgba(82,108,156,0.75))] shadow-[0_0_16px_rgba(32,55,99,0.26)]',
    };
  }

  return {
    label: 'text-navy/52',
    value: 'text-navy/86',
    fill: 'bg-[linear-gradient(90deg,rgba(165,176,197,0.9),rgba(190,200,216,0.9))]',
  };
}

export function Infrastructure() {
  const [activeMetric, setActiveMetric] = useState<Metric>(metrics[0]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-structural-fade]',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('[data-pillar-card]');
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>('[data-pillar-inner]');
        if (!inner) return;

        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 7;
          const rotateX = (0.5 - y / rect.height) * 7;

          gsap.to(inner, {
            x: rotateY * 0.7,
            y: -rotateX * 0.7,
            rotateX,
            rotateY,
            transformPerspective: 900,
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

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const rows = panel.querySelectorAll<HTMLElement>('[data-metric-row]');
    const fills = panel.querySelectorAll<HTMLElement>('[data-metric-fill]');

    gsap.fromTo(
      panel,
      { opacity: 0, y: 18, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      rows,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.08,
      }
    );

    fills.forEach((fill) => {
      gsap.fromTo(
        fill,
        { width: 0 },
        {
          width: fill.dataset.width,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.12,
        }
      );
    });
  }, [activeMetric]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-16 md:py-18 lg:py-20"
      id="ai-edge"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-10 h-72 w-72 rounded-full bg-gold/8 blur-[125px]" />
        <div className="absolute right-[-4%] top-1/4 h-80 w-80 rounded-full bg-navy/5 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">
        <div data-structural-fade className="mx-auto max-w-[56rem] text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/45 px-5 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.75)]" />
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/60">
              Structural Advantage
            </span>
          </div>

          <h2 className="text-[2.2rem] font-bold leading-[0.96] tracking-[-0.05em] text-navy sm:text-[2.5rem] md:text-[2.85rem]">
            Why the Numbers Are Different
          </h2>

          <p className="mx-auto mt-6 max-w-[48rem] text-[1rem] leading-[1.8] text-navy/70 lg:text-[1.04rem]">
            Greenfield architecture, AI-native credit, Hub &amp; Spoke distribution.
            Unit economics incumbents cannot match without rebuilding their stack.
          </p>
        </div>

        <div
          data-structural-fade
          className="mx-auto mt-10 flex max-w-[64rem] flex-wrap items-center justify-center gap-3"
        >
          {metrics.map((metric) => {
            const isActive = activeMetric.title === metric.title;

            return (
              <button
                key={metric.title}
                onClick={() => setActiveMetric(metric)}
                className={
                  isActive
                    ? 'rounded-full bg-navy px-5 py-2.5 text-[0.82rem] font-semibold text-white shadow-[0_18px_34px_rgba(15,27,61,0.12)] transition-all duration-300'
                    : 'rounded-full border border-navy/10 bg-white/45 px-5 py-2.5 text-[0.82rem] font-semibold text-navy/82 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/75'
                }
                type="button"
              >
                {metric.title}
              </button>
            );
          })}
        </div>

        <div
          data-structural-fade
          className="mx-auto mt-8 max-w-[68rem] rounded-[2.25rem] border border-white/60 bg-white/45 p-2 shadow-[0_22px_72px_rgba(15,27,61,0.05)] backdrop-blur-md"
        >
          <div
            ref={panelRef}
            className="relative overflow-hidden rounded-[1.85rem] border border-navy/6 bg-[linear-gradient(145deg,rgba(255,255,255,0.68),rgba(255,255,255,0.48)_55%,rgba(212,164,55,0.04)_100%)] px-6 py-6 sm:px-7 sm:py-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,164,55,0.12),_transparent_26%)]" />
            <div className="relative z-10">
              <h3 className="text-[1.3rem] font-bold leading-[1.06] tracking-[-0.04em] text-navy sm:text-[1.5rem]">
                {activeMetric.title}
              </h3>

              <div className="mt-7 space-y-6">
                {activeMetric.values.map((item) => {
                  const tone = rowTone(item.tone);

                  return (
                    <div key={item.label} data-metric-row>
                      <div className="mb-3 flex items-end justify-between gap-4">
                        <span className={`text-[0.88rem] font-semibold ${tone.label}`}>
                          {item.label}
                        </span>
                        <span className={`text-[0.9rem] font-bold ${tone.value}`}>{item.value}</span>
                      </div>

                      <div className="h-2.5 rounded-full bg-navy/[0.08] shadow-[inset_0_1px_2px_rgba(15,27,61,0.16)]">
                        <div
                          data-metric-fill
                          data-width={item.width}
                          className={`relative h-full overflow-hidden rounded-full ${tone.fill}`}
                        >
                          <span className="absolute inset-y-0 right-0 w-10 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45))]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-7 text-[0.74rem] font-medium italic tracking-[0.02em] text-navy/56">
                * Targets within 18 months of launch. Subject to regulatory approvals. Not a
                financial guarantee.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              data-pillar-card
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/38 p-1 shadow-[0_16px_40px_rgba(15,27,61,0.045)] backdrop-blur-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                data-pillar-inner
                className="relative rounded-[1.45rem] border border-navy/6 bg-[linear-gradient(150deg,rgba(255,255,255,0.58),rgba(255,255,255,0.26)_72%,rgba(212,164,55,0.04)_100%)] px-5 py-5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,164,55,0.08),_transparent_32%)]" />
                <div className="relative z-10">
                  <span className="block text-[0.64rem] font-bold uppercase tracking-[0.18em] text-gold">
                    Pillar
                  </span>
                  <h3 className="mt-3 text-[1.02rem] font-bold tracking-[-0.03em] text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[0.84rem] leading-[1.72] text-navy/63">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
