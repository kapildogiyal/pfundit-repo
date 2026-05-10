'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const leaders = [
  {
    name: 'Sanath Shetty',
    role: 'Co-Founder & Director',
    focus: 'Credit Risk · Payments · Origination · 27 yrs Asia',
    image: '/founders/sanath.png',
    bio: '27 years across HSBC and J.P. Morgan in India and Singapore — built credit franchises, led APAC corporate payments, originated institutional relationships at scale.',
    background: [
      'APAC Transaction Banking — HSBC & J.P. Morgan',
      'VP & Regional Head, Consumer Credit Risk — HSBC India',
      'Sales & BD Leader, APAC Corporate & Institutional',
    ],
    linkedin: '#',
  },
  {
    name: 'Atin Bhutani',
    role: 'Co-Founder & Director',
    focus: 'Corporate Banker · Operator · Governance',
    image: '/founders/atin.png',
    bio: 'Country Head of International Subsidiary Banking at HSBC Singapore. Co-founded and scaled In.Corp Global to a PE exit in 2022.',
    background: [
      'HSBC — Country Head, ISB Singapore',
      'Group CEO, In.Corp Global — PE Exit (2022)',
      'MBA with Distinction — IIFT',
    ],
    linkedin: '#',
  },
  {
    name: 'Madhujeet Chimni',
    role: 'Co-Founder & Director',
    focus: 'Serial Entrepreneur · Institutional Capital',
    image: '/founders/madhujeet.png',
    bio: 'Three exits across Asia, Europe and LATAM. Sold Stone Apple to Hitachi (2014), exited In.Corp Global to PE (2021). Chairs Blue Planet (IFU, Novo Holdings).',
    background: [
      'Stone Apple → Hitachi Consulting (2014)',
      'In.Corp Global → PE Exit (2021)',
      'Chairman, Blue Planet Environmental Solutions',
    ],
    linkedin: '#',
  },
];

export function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-founder-intro]',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
          },
        }
      );

      gsap.fromTo(
        '[data-founder-card]',
        { opacity: 0, y: 54, scale: 0.96, rotateX: 8 },
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
            trigger: '[data-founder-grid]',
            start: 'top 82%',
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('[data-founder-card]');
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>('[data-founder-inner]');
        const image = card.querySelector<HTMLElement>('[data-founder-image]');
        if (!inner) return;

        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 8;
          const rotateX = (0.5 - y / rect.height) * 7;

          gsap.to(inner, {
            rotateX,
            rotateY,
            x: rotateY * 0.6,
            y: -rotateX * 0.6,
            duration: 0.35,
            ease: 'power2.out',
            transformPerspective: 1000,
          });

          if (image) {
            gsap.to(image, {
              scale: 1.05,
              x: rotateY * 0.35,
              y: -rotateX * 0.35,
              duration: 0.45,
              ease: 'power2.out',
            });
          }
        };

        const handleLeave = () => {
          gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            x: 0,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
          });

          if (image) {
            gsap.to(image, {
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.45,
              ease: 'power3.out',
            });
          }
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
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24"
      id="leadership"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-7%] top-20 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute right-[-5%] top-1/3 h-[26rem] w-[26rem] rounded-full bg-navy/6 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/12 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">
        <header className="mx-auto grid max-w-[56rem] gap-8 text-center">
          <div data-founder-intro className="flex flex-col items-center">
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.8)]" />
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/60">
                Leadership
              </span>
            </div>

            <h2 className="max-w-[13ch] text-[2.15rem] font-bold leading-[0.94] tracking-[-0.055em] text-navy sm:text-[2.45rem] md:text-[2.85rem]">
              The Founding Team
            </h2>
          </div>

          <div data-founder-intro className="mx-auto max-w-[34rem]">
            <p className="text-[0.92rem] leading-[1.7] text-navy/72 lg:text-[0.96rem]">
              60+ combined years at J.P. Morgan and HSBC. Three successful exits. Builders, not
              theorists.
            </p>
          </div>
        </header>

        <div data-founder-grid className="mt-10 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              data-founder-card
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <div
                data-founder-inner
                className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(255,255,255,0.72)_52%,rgba(212,164,55,0.08)_100%)] p-4 shadow-[0_20px_56px_rgba(15,27,61,0.065)] transition-shadow duration-500 group-hover:shadow-[0_30px_76px_rgba(15,27,61,0.1)] sm:p-5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,164,55,0.12),_transparent_32%)] opacity-90" />

                <div className="relative z-10 flex h-full flex-col">

                  <div className="mb-5 flex items-start gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.25rem] border border-navy/8 bg-navy/[0.03] shadow-[0_14px_30px_rgba(15,27,61,0.07)] sm:h-[5.25rem] sm:w-[5.25rem]">
                      <div data-founder-image className="relative h-full w-full">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          sizes="84px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gold/10" />
                    </div>

                    <div className="min-w-0 pt-1.5">
                      <span className="block text-[0.54rem] font-bold uppercase tracking-[0.18em] text-gold">
                        {leader.role}
                      </span>
                      <h3 className="mt-1.5 text-[1.15rem] font-bold leading-[1.02] tracking-[-0.04em] text-navy sm:text-[1.28rem]">
                        {leader.name}
                      </h3>
                      <p className="mt-2 text-[0.6rem] font-semibold tracking-[0.12em] text-navy/38">
                        {leader.focus}
                      </p>
                    </div>
                  </div>

                  <p className="text-[0.76rem] leading-[1.72] text-navy/68">{leader.bio}</p>

                  <div className="mt-5 space-y-2.5">
                    {leader.background.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.6)]" />
                        <p className="text-[0.72rem] font-semibold leading-[1.5] text-navy/72">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-navy/8 pt-3.5">
                    <a
                      href={leader.linkedin}
                      aria-label={`View ${leader.name} profile`}
                      className="inline-flex items-center gap-2 text-[0.66rem] font-semibold text-navy/72 transition-colors duration-300 hover:text-gold"
                    >
                      LinkedIn <span>→</span>
                    </a>
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
