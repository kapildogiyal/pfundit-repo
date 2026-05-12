'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const cards = [
  {
    label: 'Mission',
    title: 'Expand formal credit across Asia.',
    description:
      'Over 400M Indian adults and 300M across SEA remain outside formal finance — an MSME credit gap of $620B+. The barrier is legacy systems, not demand.',
    direction: -72,
  },
  {
    label: 'Vision',
    title: "Asia's most trusted AI-native lending group by 2030.",
    description:
      'A licensed institution that owns its loan book, stands behind every outcome, and compounds defensible IP in how credit is priced, delivered and managed.',
    direction: 72,
  },
];

export function MissionVision() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cardNodes = Array.from(
      section.querySelectorAll<HTMLElement>('[data-mission-card]')
    );

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      cardNodes.forEach((card, index) => {
        const direction = Number(card.dataset.direction || (index === 0 ? -72 : 72));

        gsap.fromTo(
          card,
          { x: direction, opacity: 0, y: 24 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        const content = card.querySelector<HTMLElement>('[data-card-content]');
        const glow = card.querySelector<HTMLElement>('[data-card-glow]');
        if (!content || !glow) return;

        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 8;
          const rotateX = (0.5 - (y / rect.height)) * 8;
          const glowX = (x / rect.width) * 100;
          const glowY = (y / rect.height) * 100;

          gsap.to(content, {
            x: rotateY * 0.9,
            y: -rotateX * 0.9,
            rotateX,
            rotateY,
            transformPerspective: 900,
            duration: 0.35,
            ease: 'power2.out',
          });

          gsap.to(glow, {
            opacity: 1,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(212,164,55,0.18), rgba(255,255,255,0) 42%)`,
            duration: 0.35,
            ease: 'power2.out',
          });
        };

        const handleLeave = () => {
          gsap.to(content, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power3.out',
          });

          gsap.to(glow, {
            opacity: 0.8,
            background:
              'radial-gradient(circle at top right, rgba(212,164,55,0.12), rgba(255,255,255,0) 28%)',
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
      className="relative overflow-hidden bg-transparent py-20 md:py-20 lg:py-24"
      id="mission"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/10 blur-[110px]" />
        <div className="absolute right-0 top-1/4 h-72 w-72 translate-x-1/4 rounded-full bg-navy/6 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      </div>

      <div className="layout-shell editorial-container relative z-10">
        <div className="mx-auto max-w-[42rem] pt-2 text-center">

          <h2 className="typo-hero text-navy">
            Mission &amp; Vision
          </h2>

          <p className="mx-auto mt-6 max-w-[38rem] typo-body text-navy/70">
            Closing the credit gap across Asia &mdash; compliantly, at scale, with technology
            that earns trust.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.label}
              data-mission-card
              data-direction={card.direction}
              className="group relative flex h-full overflow-hidden rounded-[2rem] border border-navy/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72)_58%,rgba(212,164,55,0.07)_100%)] p-6 text-center shadow-[0_18px_48px_rgba(15,27,61,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-[0_24px_58px_rgba(15,27,61,0.1)] sm:p-7"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                data-card-glow
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(circle at top right, rgba(212,164,55,0.12), rgba(255,255,255,0) 28%)',
                }}
              />
              <div
                data-card-content
                className="relative z-10 flex flex-col items-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="block typo-label text-gold">
                  {card.label}
                </span>

                <h3 className="mt-3 max-w-[20ch] typo-h3 text-navy">
                  {card.title}
                </h3>

                <p className="mt-5 max-w-[44rem] typo-body-sm text-navy/66">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
