'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useVelocity } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TalkToUsButton } from '@/components/button';

const navLinks = [
  { id: 'mission', label: 'Mission' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'ai-edge', label: 'AI Edge' },
  { id: 'leadership', label: 'Founders' },
  { id: 'stakeholders', label: 'Stakeholders' },
  { id: 'governance', label: 'Governance' },
];

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHiringPage = pathname === '/hiring';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isUserClick, setIsUserClick] = useState(false);
  const userClickRef = useRef(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });

  const hiringStripY = useTransform(scrollY, [0, 30], [0, -60]);
  const hiringStripOpacity = useTransform(scrollY, [0, 30], [1, 0]);
  // On /hiring page there's no strip so nav starts at top (0), not 44px
  const navTop = useTransform(scrollY, [0, 30], [isHiringPage ? 0 : 44, 0]);
  const navPadding = useTransform(scrollY, [0, 50], ['1rem', '0.55rem']);
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(248, 248, 245, 0.1)', 'rgba(251, 251, 249, 0.95)']
  );
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(15, 27, 61, 0)', 'rgba(15, 27, 61, 0.12)']
  );

  useMotionValueEvent(scrollVelocity, 'change', (latest) => {
    if (latest > 0) {
      setScrollDirection('down');
    } else if (latest < 0) {
      setScrollDirection('up');
    }
  });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (userClickRef.current) return; // Skip scroll detection if user just clicked
        const offset = headerRef.current?.offsetHeight ?? 88;
        const scrollPos = window.scrollY + offset + 8;
        let current = '';
        for (const link of navLinks) {
          const el = document.getElementById(link.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPos) current = link.id;
        }
        setActiveSection(current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const container = navContainerRef.current;
      if (!container) return setUnderline((u) => ({ ...u, opacity: 0 }));
      const activeEl = navRefs.current[activeSection];
      if (activeEl) {
        const cRect = container.getBoundingClientRect();
        const aRect = activeEl.getBoundingClientRect();
        setUnderline({ left: aRect.left - cRect.left, width: aRect.width, opacity: 1 });
      } else {
        setUnderline({ left: 0, width: 0, opacity: 0 });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeSection]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      void latest;
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (isHiringPage) {
      // Navigate back to home page with the hash
      router.push(`/#${id}`);
      return;
    }
    setActiveSection(id);
    userClickRef.current = true;
    setTimeout(() => {
      userClickRef.current = false;
    }, 1200);
    const element = document.getElementById(id);
    if (element) {
      const offset = headerRef.current?.offsetHeight ?? 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={headerRef} className="fixed left-0 top-0 z-[100] w-full">
      {/* Hiring strip — hidden on the /hiring page itself */}
      {!isHiringPage && (
        <motion.div
          style={{
            y: hiringStripY,
            opacity: scrollDirection === 'up' ? 1 : hiringStripOpacity
          }}
          className="absolute left-0 top-0 w-full border-b border-[#d4a437]/25 bg-[#d4a437] text-navy shadow-[0_4px_16px_rgba(212,164,55,0.15)]"
        >
          <div className="layout-shell editorial-container">
            <Link
              href="/hiring"
              className="group relative flex w-full items-center justify-center gap-2 py-1.5 sm:py-2"
            >
              <span className="text-center text-[clamp(0.75rem,2vw,0.9rem)] font-medium tracking-[-0.015em] text-navy/95">
                We are building the founding team in India - roles across credit, risk, compliance, technology and business development
              </span>
              <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      )}

      <motion.nav
        style={{
          paddingTop: navPadding,
          paddingBottom: navPadding,
          backgroundColor: navBackground,
          borderBottom: `1px solid ${navBorder}`,
          top: navTop,
        }}
        className="absolute left-0 w-full transition-all duration-300"
      >
        <div className="layout-shell editorial-container flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              if (isHiringPage) {
                router.push('/');
                return;
              }

              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-[clamp(1.55rem,5vw,1.95rem)] font-bold tracking-[-0.05em] leading-none text-navy"
          >
            <span className="relative inline-block overflow-hidden">
              <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Pfundit</span>
              <span className="absolute left-0 top-full block text-gold transition-transform duration-500 ease-out group-hover:-translate-y-full">Pfundit</span>
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-gold"
            />
          </motion.button>

          <div className="hidden items-center gap-9 lg:flex relative" ref={navContainerRef as any}>
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                ref={(el) => { navRefs.current[link.id] = el; }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => scrollToSection(link.id)}
                className={`group relative typo-body-sm px-2 py-1 transition-all duration-300 ${activeSection === link.id ? 'text-navy' : 'text-navy/55'} hover:text-navy`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            ))}
            <motion.div
              className="absolute -bottom-1 h-[2px] bg-gold rounded"
              animate={{ left: underline.left, width: underline.width, opacity: underline.opacity }}
              transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.8 }}
              style={{ position: 'absolute' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 sm:gap-6"
          >
            <Magnetic>
              {/* Desktop / tablet CTA */}
              <div className="hidden sm:block">
                <TalkToUsButton onClick={() => scrollToSection('contact')} />
              </div>

              {/* Compact mobile CTA */}
              <div className="sm:hidden">
                <TalkToUsButton onClick={() => scrollToSection('contact')} />
              </div>
            </Magnetic>

            <button
              className="group flex flex-col gap-1.5 p-2 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }}
                className="h-[1.5px] w-6 bg-navy"
              />
              <motion.div
                animate={{ opacity: mobileMenuOpen ? 0 : 1, width: mobileMenuOpen ? 0 : 16 }}
                className="h-[1.5px] bg-navy"
              />
              <motion.div
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }}
                className="h-[1.5px] w-6 bg-navy"
              />
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[linear-gradient(165deg,rgba(250,250,247,0.98),rgba(245,247,252,0.97))] p-6 sm:p-8 lg:hidden"
            >
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-navy shadow-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col items-center gap-10">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-[clamp(1.6rem,6vw,2.5rem)] font-bold tracking-tighter text-navy transition-colors hover:text-gold"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <TalkToUsButton onClick={() => scrollToSection('contact')} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
