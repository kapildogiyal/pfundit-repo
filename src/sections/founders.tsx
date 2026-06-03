'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ─────────────────── data ─────────────────── */
const leaders = [
  {
    id: '01',
    name: 'Sanath Shetty',
    role: 'Founder & Director',
    focus: 'Consumer Credit Risk & Payments Executive · 25+ Years',
    image: '/founders/sanath.png',
    bioIcon: 'bank',
    bio: 'Sanath is the credit and operational architect of Pfundit. As Regional Head of Credit Risk at HSBC India, he ran multi-geography retail lending portfolios across Cards, Personal Loans, Auto and Mortgages. He later led corporate payments origination at HSBC and J.P. Morgan across Asia-Pacific, rising to Executive Director at J.P. Morgan Singapore. His experience spans the full credit lifecycle - from origination policy and scorecard design to NPA recovery and portfolio remediation.',
    background: [
      'HSBC & J.P. Morgan - Executive Director, APAC Payments',
      'HSBC VP & Regional Head - Consumer Credit Risk, India',
      'Retail Portfolio Management: Cards, Personal Loans, Auto, Mortgages',
      'National Collections Strategy & DCA Governance',
      'Transaction Banking & Cash Management, APAC',
    ],
    linkedin: '#',
  },
  {
    id: '02',
    name: 'Atin Bhutani',
    role: 'Co-Founder & Director',
    focus: 'Corporate Banker · Entrepreneur · Governance Expert',
    image: '/founders/atin.png',
    bioIcon: 'globe',
    bio: "Atin combines institutional banking discipline with a decade of operator-level execution. At HSBC Singapore, he served as Country Head of International Subsidiary Banking - responsible for credit origination, risk grading and portfolio management for multinational corporate clients, with direct sanctioning authority on complex cross-border credit structures. He co-founded In.Corp Global, scaling it into one of Asia's leading corporate services platforms before a private equity exit in 2022.",
    background: [
      'HSBC - Country Head, International Subsidiary Banking, Singapore',
      'Credit Origination, Structuring & Portfolio Management',
      'Group CEO, In.Corp Global - PE-backed Exit (2022)',
      'MBA with Distinction - Indian Institute of Foreign Trade',
      'Blue Planet Environmental Solutions - President (Current)'
    ],
    linkedin: '#',
  },
  {
    id: '03',
    name: 'Madhujeet Chimni',
    role: 'Co-Founder & Director',
    focus: 'Serial Entrepreneur · Institutional Capital · Technology',
    image: '/founders/madhujeet.png',
    bioIcon: 'chart',
    bio: 'Madhujeet has founded, scaled and exited businesses across Asia, Europe and Latin America over two decades. He built Stone Apple into a regional enterprise technology firm before its acquisition by Hitachi Consulting in 2014. He co-founded In.Corp Global, completing a private equity exit in 2021. He chairs Blue Planet Environmental Solutions, backed by IFU and Novo Holdings - operating across India, Singapore, the UK and New Zealand. At Pfundit, he leads capital strategy, board governance and investor relations.',
    background: [
      'Stone Apple - Founded & sold to Hitachi Consulting (2014)',
      'In.Corp Global - Co-Founder, PE Exit (2021)',
      'Blue Planet Environmental Solutions - Chairman (Current)',
      'Institutional fundraising: IFU, Novo Holdings',
      'Xcelerate Global - GRC Investment Platform'
    ],
    linkedin: '#',
  },
];

/* ─────────────────── icons ─────────────────── */
function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BioIcon({ type }: { type: string }) {
  if (type === 'bank') return <BankIcon />;
  if (type === 'globe') return <GlobeIcon />;
  return <ChartIcon />;
}

function LinkedInSquare() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ─────────────────── ProfileCircle ─────────────────── */
function ProfileCircle({ leader, index }: { leader: typeof leaders[0]; index: number }) {
  return (
    <div className="relative flex items-center justify-start" style={{ width: 'clamp(140px, 58vw, 200px)', height: 'clamp(140px, 58vw, 200px)' }}>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{ transform: 'translateX(calc(-1 * clamp(13px, 2.5vw, 19px)))' }}
      >
        {/* Outermost rotating ring — dashed, slow */}
        <div
          data-anim="ring"
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px dashed rgba(212,164,55,0.25)',
            borderRadius: '50%',
          }}
        />

        {/* Secondary solid ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 14,
            border: '1px solid rgba(212,164,55,0.18)',
            borderRadius: '50%',
          }}
        />

        {/* Warm atmospheric glow — radiates from bottom-center outward */}
        <div
          data-anim="glow"
          className="absolute rounded-full"
          style={{
            inset: 18,
            background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(180,130,30,0.55) 0%, rgba(120,80,15,0.25) 45%, transparent 80%)',
            filter: 'blur(6px)',
          }}
        />
      </div>

      {/* Main image circle */}
      <div
        data-anim="profile"
        className="relative overflow-hidden rounded-full"
        style={{
          width: 'clamp(114px, 48vw, 162px)',
          height: 'clamp(114px, 48vw, 162px)',
          border: '2px solid rgba(212,164,55,0.55)',
          background: 'linear-gradient(180deg, #0d1a36 0%, #1a2840 40%, #2a1c08 100%)',
          boxShadow: '0 0 50px rgba(180,120,20,0.35), inset 0 -20px 40px rgba(180,120,20,0.2)',
        }}
      >
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          priority
          sizes="(max-width: 768px) 48vw, 162px"
          className="object-cover object-top"
        />
      </div>

      {/* Small glowing dot — accent, positioned on the ring arc (bottom-right) */}
      <div
        data-anim="accent-dot"
        className="absolute rounded-full bg-gold"
        style={{
          width: 10,
          height: 10,
          bottom: 18,
          right: 'calc(14px + clamp(13px, 2.5vw, 19px))',
          boxShadow: '0 0 10px rgba(212,164,55,0.9)',
        }}
      />
    </div>
  );
}

/* ─────────────────── main component ─────────────────── */
export function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const st = { trigger: section, start: 'top 70%' };

      const runFromTo = (selector: string, fromVars: any, toVars: any) => {
        const els = section.querySelectorAll(selector);
        if (!els || els.length === 0) return;
        gsap.fromTo(els as any, fromVars, toVars);
      };

      runFromTo('[data-anim="badge"]',
        { opacity: 0, scale: 0.5, y: -16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(2.2)', scrollTrigger: st }
      );

      runFromTo('[data-anim="headline"]',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.08, scrollTrigger: st }
      );

      runFromTo('[data-anim="subtitle"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.22, scrollTrigger: st }
      );

      runFromTo('[data-anim="connector"]',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.4, ease: 'power3.inOut', delay: 0.45, transformOrigin: 'center', scrollTrigger: st }
      );

      runFromTo('[data-anim="dot"]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(2)', delay: 1.0, scrollTrigger: st }
      );

      runFromTo('[data-anim="profile"]',
        { scale: 0.55, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.3, stagger: 0.22, ease: 'elastic.out(0.8,0.45)', delay: 0.55, scrollTrigger: st }
      );

      runFromTo('[data-anim="card-body"]',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out', delay: 0.75, scrollTrigger: st }
      );

      runFromTo('[data-anim="inner"]',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.055, ease: 'power2.out', delay: 0.95, scrollTrigger: st }
      );

      /* continuous: outer ring rotation */
      gsap.utils.toArray<HTMLElement>('[data-anim="ring"]').forEach((el, i) => {
        gsap.to(el, { rotation: 360, duration: 24 + i * 4, ease: 'none', repeat: -1 });
      });

      /* continuous: floating (each card slightly different phase) */
      gsap.utils.toArray<HTMLElement>('[data-anim="profile"]').forEach((el, i) => {
        gsap.to(el, { y: 8, duration: 3.8 + i * 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.35 });
      });

      /* continuous: glow pulse */
      gsap.utils.toArray<HTMLElement>('[data-anim="glow"]').forEach((el, i) => {
        gsap.to(el, { opacity: 0.9, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.6 });
      });

      /* continuous: accent dot pulse */
      gsap.utils.toArray<HTMLElement>('[data-anim="accent-dot"]').forEach((el, i) => {
        gsap.to(el, { scale: 1.7, opacity: 0.6, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.45 });
      });

      /* interactive: subtle mouse tilt per card */
      const cards = gsap.utils.toArray<HTMLElement>('[data-anim="card"]');
      document.addEventListener('mousemove', (e) => {
        cards.forEach((card) => {
          const r = card.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          gsap.to(card, {
            rotateX: (e.clientY - cy) * 0.006,
            rotateY: (e.clientX - cx) * 0.006,
            duration: 1.4,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        });
      });

      /* interactive: profile scale on card hover */
      cards.forEach((card) => {
        const profile = card.querySelector('[data-anim="profile"]');
        card.addEventListener('mouseenter', () => {
          if (profile) gsap.to(profile, { scale: 1.07, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
        });
        card.addEventListener('mouseleave', () => {
          if (profile) gsap.to(profile, { scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  /* The image connector line sits at the vertical center of the profile row.
     Profile circles are 200px tall; we align the line to their center = top offset of the circles + 100px. */
  const CIRCLE_H = 200;  // matches the ProfileCircle wrapper height

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: 'linear-gradient(170deg, #0b1228 0%, #0e1a35 35%, #091122 70%, #060d1a 100%)' }}
    >
      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div style={{ position: 'absolute', left: '-10%', top: '-5%', width: 'min(78vw, 520px)', height: 'min(78vw, 520px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,164,55,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', right: '-8%', bottom: '-5%', width: 'min(82vw, 560px)', height: 'min(82vw, 560px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,164,55,0.16) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', left: '50%', bottom: '0', transform: 'translateX(-50%)', width: 'min(72vw, 60rem)', height: 'min(28vw, 200px)', background: 'radial-gradient(ellipse, rgba(212,164,55,0.07) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      </div>

      <div className="layout-shell editorial-container relative z-10">

        {/* headline */}
        <div className="mb-3 text-center">
          <h2
            data-anim="headline"
            style={{ fontSize: 'clamp(2rem, 7vw, 2.85rem)', fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1.0, color: '#ffffff' }}
          >
            The Founding <span style={{ color: '#D4A437' }}>Team</span>
          </h2>
        </div>

        {/* gold dot divider */}
        <div className="mb-5 flex items-center justify-center gap-3">
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, rgba(212,164,55,0.5))' }} />
          <div style={{ height: 6, width: 6, borderRadius: '50%', background: '#D4A437' }} />
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, rgba(212,164,55,0.5))' }} />
        </div>

        {/* subtitle */}
        <p
          data-anim="subtitle"
          style={{ textAlign: 'center', color: 'rgba(255,255,255,0.58)', fontSize: 'clamp(0.82rem, 1.4vw, 1rem)', marginBottom: '3rem', lineHeight: 1.7, maxWidth: 620, marginInline: 'auto' }}
        >
          <span style={{ display: 'block' }}>Three founders. 60+ combined years at J.P. Morgan and HSBC.</span>
          <span style={{ display: 'block' }}>Three successful exits. The experience to build this institution and the track record to be trusted with it.</span>
        </p>

        {/* ─── founders grid ─── */}
        <div style={{ position: 'relative' }}>

          {/* CONNECTOR LINE — sits at the vertical midpoint of the profile circles */}
          {/* We position it absolutely within the profiles row. The profiles row starts right here.
              Circle height = 200px, so line is at top = 100px from start of this relative div */}
          <div
            className="hidden md:block"
            style={{ position: 'absolute', top: CIRCLE_H / 2, left: 0, right: 0, height: 1, pointerEvents: 'none', zIndex: 0 }}
          >
            <div
              data-anim="connector"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, transparent 2%, rgba(212,164,55,0.35) 20%, rgba(212,164,55,0.35) 80%, transparent 98%)',
                transformOrigin: 'center',
              }}
            />
          </div>

          {/* columns */}
          <div
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3 md:gap-y-0"
          >
            {leaders.map((leader, i) => (
              <div
                key={leader.id}
                data-anim="card"
                className={`border-b border-white/8 pb-6 md:border-b-0 md:pb-0 md:border-r ${i === 2 ? 'md:border-r-0' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  padding: '0 clamp(0.75rem, 3vw, 1.5rem)',
                  perspective: '1000px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* profile circle — centered on desktop, left-aligned on smaller screens */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }} className="md:justify-start">
                  <ProfileCircle leader={leader} index={i} />
                </div>

                {/* number + name */}
                <div data-anim="inner" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, width: '100%' }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    border: '1px solid rgba(212,164,55,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#D4A437', letterSpacing: '0.05em' }}>{leader.id}</span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                    {leader.name}
                  </h3>
                </div>

                {/* role */}
                <p data-anim="inner" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', color: '#D4A437', textTransform: 'uppercase', marginBottom: 8, width: '100%' }}>
                  {leader.role}
                </p>

                {/* focus — italic, muted */}
                <p data-anim="inner" style={{ fontSize: '0.7rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', marginBottom: 18, lineHeight: 1.5, width: '100%' }}>
                  {leader.focus}
                </p>

                {/* bio with icon */}
                <div data-anim="inner" style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start', width: '100%' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid rgba(212,164,55,0.3)',
                    background: 'rgba(212,164,55,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: '#D4A437',
                    marginTop: 2,
                  }}>
                    <BioIcon type={leader.bioIcon} />
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.65 }}>
                    {leader.bio}
                  </p>
                </div>

                {/* background bullet list */}
                <ul data-anim="inner" style={{ width: '100%', marginBottom: 24, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {leader.background.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ marginTop: 5, width: 6, height: 6, borderRadius: '50%', background: '#D4A437', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* LinkedIn */}
                <a
                  href={leader.linkedin}
                  data-anim="inner"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    textDecoration: 'none', color: 'rgba(255,255,255,0.75)',
                    fontSize: '0.72rem', fontWeight: 600,
                    transition: 'color 0.2s',
                    marginTop: '0.6rem'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#D4A437')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >
                  {/* "in" square badge */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 24, height: 24, borderRadius: 5,
                    background: '#0077B5', color: '#fff',
                    flexShrink: 0,
                  }}>
                    <LinkedInSquare />
                  </span>
                  LinkedIn →
                </a>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
