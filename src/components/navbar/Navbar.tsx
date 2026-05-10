'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { id: 'mission', label: 'Mission' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'ai-edge', label: 'AI Edge' },
  { id: 'leadership', label: 'Founders' },
  { id: 'governance', label: 'Governance' },
  { id: 'hiring', label: 'Hiring' },
  { id: 'stakeholders', label: 'Stakeholders' },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navPadding = useTransform(scrollY, [0, 50], ['1rem', '0.55rem']);
  const navBackground = useTransform(
    scrollY, 
    [0, 50], 
    ['rgba(248, 248, 245, 0)', 'rgba(251, 251, 249, 0.78)']
  );
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(15, 27, 61, 0)', 'rgba(15, 27, 61, 0.1)']
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      void latest;
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 68;
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
    <motion.nav 
      style={{ 
        paddingTop: navPadding, 
        paddingBottom: navPadding,
        backgroundColor: navBackground,
        borderBottom: `1px solid ${navBorder}`
      }}
      className="fixed top-0 left-0 w-full z-[100] backdrop-blur-xl transition-all duration-300"
    >
      <div className="layout-shell editorial-container flex items-center justify-between">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 text-[1.95rem] font-bold tracking-[-0.05em] leading-none text-navy"
        >
          <span className="relative overflow-hidden inline-block">
            <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-out">Pfundit</span>
            <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-500 ease-out text-gold">Pfundit</span>
          </span>
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gold rounded-full" 
          />
        </motion.button>

        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => scrollToSection(link.id)}
              className="relative text-[0.78rem] font-semibold tracking-[0.03em] text-navy/55 hover:text-navy transition-all duration-300 group"
            >
              <span className="relative z-10">{link.label}</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-px bg-gold"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <Magnetic>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-hero-primary relative overflow-hidden rounded-full px-8 py-3.5 text-[0.62rem] font-bold tracking-[0.08em] text-white transition-transform active:scale-95"
            >
              <span className="relative z-10">Talk to Us</span>
              <motion.div 
                className="absolute inset-0 bg-[#D4A437] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
              />
              <span className="absolute inset-0 bg-[#0f1b3d] group-hover:opacity-0 transition-opacity duration-300" />
            </button>
          </Magnetic>

          <button 
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div 
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }}
              className="w-6 h-[1.5px] bg-navy" 
            />
            <motion.div 
              animate={{ opacity: mobileMenuOpen ? 0 : 1, width: mobileMenuOpen ? 0 : 16 }}
              className="h-[1.5px] bg-navy" 
            />
            <motion.div 
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }}
              className="w-6 h-[1.5px] bg-navy" 
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
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[linear-gradient(165deg,rgba(250,250,247,0.98),rgba(245,247,252,0.97))] p-8 lg:hidden"
          >
            <div className="flex flex-col gap-10 items-center">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-4xl font-bold tracking-tighter text-navy hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollToSection('contact')}
                className="mt-6 px-16 py-6 bg-navy text-white text-[0.8rem] font-bold tracking-[0.08em] rounded-full shadow-2xl"
              >
                Talk to Us
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
