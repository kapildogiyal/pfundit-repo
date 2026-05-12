'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ─────────────────── data ─────────────────── */
const categories = ['All Roles', 'Leadership', 'Technology', 'Business'] as const;
type Category = typeof categories[number];

const roles = [
  {
    id: '01',
    title: 'Chief Risk Officer',
    type: 'Advisory',
    category: 'Leadership' as Category,
    tags: ['Credit Risk', 'NBFC Regulation', 'RBI Compliance'],
    description: 'Shape the risk architecture of India\'s first AI-native NBFC. Define credit frameworks, oversee AI underwriting guardrails, and build RBI-compliant risk infrastructure from the ground up.',
  },
  {
    id: '02',
    title: 'Chief Compliance Officer',
    type: 'Advisory',
    category: 'Leadership' as Category,
    tags: ['RBI Frameworks', 'KYC / AML', 'Regulatory Affairs'],
    description: 'Lead compliance design ahead of RBI licensing. Own KYC, AML/CFT, Fair Practices Code and ensure regulatory readiness across India and Singapore operations.',
  },
  {
    id: '03',
    title: 'Chief Financial Officer',
    type: 'Advisory',
    category: 'Leadership' as Category,
    tags: ['NBFC Finance', 'Capital Planning', 'Investor Relations'],
    description: 'Build the financial architecture, treasury strategy and investor reporting framework for a greenfield NBFC. Partner directly with the founding board on capital structure.',
  },
  {
    id: '04',
    title: 'Chief Technology Officer',
    type: 'Full-Time',
    category: 'Technology' as Category,
    tags: ['AI/ML', 'Fintech Infrastructure', 'Credit Systems'],
    description: 'Architect the AI-native lending stack — credit decisioning engine, data pipelines, API infrastructure. Greenfield opportunity to build with no legacy constraints.',
  },
  {
    id: '05',
    title: 'Chief Credit Officer',
    type: 'Advisory',
    category: 'Leadership' as Category,
    tags: ['Credit Policy', 'Underwriting', 'Portfolio Management'],
    description: 'Define credit policy for a new asset class in Real Estate, AI infrastructure and clean-tech supply chains. Partner with AI teams to build human-in-the-loop credit gates.',
  },
  {
    id: '06',
    title: 'Chief Operating Officer',
    type: 'Advisory',
    category: 'Leadership' as Category,
    tags: ['Operations', 'Hub & Spoke', 'Process Design'],
    description: 'Design and operationalize the Hub & Spoke model across India. Own everything from loan origination workflows to collections infrastructure and partner integrations.',
  },
  {
    id: '07',
    title: 'Head of Product',
    type: 'Consultant',
    category: 'Technology' as Category,
    tags: ['Lending Product', 'API-first', 'Roadmap'],
    description: 'Define and execute the product roadmap for an API-first lending platform. Own borrower UX, partner integration surfaces and the AI decisioning product.',
  },
  {
    id: '08',
    title: 'Head of Business Development & Partnerships',
    type: 'Consultant',
    category: 'Business' as Category,
    tags: ['Partnerships', 'Channel Distribution', 'Co-lending'],
    description: 'Build the institutional pipeline — co-lending arrangements, originator partnerships and capital relationships across India and Southeast Asia.',
  },
];

/* ─────────────────── helpers ─────────────────── */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14 }}>
      <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────── component ─────────────────── */
export function Hiring() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All Roles');
  const listRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleApplyClick = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormStatus('idle');
    setIsModalOpen(true);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setTimeout(() => setIsModalOpen(false), 3000);
      } else {
        console.error("Error submitting application:", data);
        setFormStatus('error');
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
  };

  const filtered = activeCategory === 'All Roles'
    ? roles
    : roles.filter((r) => r.category === activeCategory);

  /* animate list when filter changes */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    gsap.fromTo(el.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
    );
  }, [activeCategory]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const st = { trigger: section, start: 'top 76%' };

      gsap.fromTo('[data-hr="filter-nav"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.1, scrollTrigger: st }
      );
      gsap.fromTo('[data-hr="role-row"]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power2.out', delay: 0.25,
          scrollTrigger: { trigger: '[data-hr="list"]', start: 'top 82%' } }
      );
      gsap.fromTo('[data-hr="cta"]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-hr="cta"]', start: 'top 90%' } }
      );

      /* hover: role row underline reveal */
      gsap.utils.toArray<HTMLElement>('[data-hr="role-row"]').forEach((row) => {
        const line = row.querySelector<HTMLElement>('[data-hr="row-line"]');
        row.addEventListener('mouseenter', () => {
          if (line) gsap.to(line, { scaleX: 1, duration: 0.35, ease: 'power2.out' });
        });
        row.addEventListener('mouseleave', () => {
          if (line) gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power2.in' });
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hiring"
      className="relative overflow-hidden bg-[#F0F5FF]"
    >
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[-6%] top-32 h-72 w-72 rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute right-[-4%] top-1/3 h-80 w-80 rounded-full bg-navy/5 blur-[150px]" />
      </div>

      <div className="layout-shell editorial-container relative z-10" style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>

        {/* ── category filter nav ── */}
        <div data-hr="filter-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  borderRadius: 999,
                  padding: '0.5rem 1.4rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  border: isActive
                    ? '1px solid rgba(15,27,61,0.85)'
                    : '1px solid rgba(15,27,61,0.12)',
                  background: isActive
                    ? '#0f1b3d'
                    : 'rgba(255,255,255,0.55)',
                  color: isActive ? '#ffffff' : 'rgba(15,27,61,0.7)',
                  boxShadow: isActive
                    ? '0 8px 24px rgba(15,27,61,0.14)'
                    : '0 2px 8px rgba(15,27,61,0.04)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {cat}
                {cat !== 'All Roles' && (
                  <span style={{
                    marginLeft: 6,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(15,27,61,0.35)',
                  }}>
                    {roles.filter(r => r.category === cat).length}
                  </span>
                )}
              </button>
            );
          })}
          </div>
          {/* count pill */}
          <div style={{
            padding: '0.4rem 1rem',
            borderRadius: 999,
            background: 'rgba(212,164,55,0.1)',
            border: '1px solid rgba(212,164,55,0.25)',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#D4A437',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
          }}>
            {filtered.length} open
          </div>
        </div>

        {/* ── role list ── */}
        <div data-hr="list">

          {/* list header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr auto',
            gap: '1rem',
            padding: '0.6rem 1.25rem',
            borderBottom: '1px solid rgba(15,27,61,0.1)',
            marginBottom: '0.25rem',
          }} className="hidden md:grid">
            {['Role', 'Category', 'Engagement', ''].map((h) => (
              <span key={h} style={{
                fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(15,27,61,0.35)',
              }}>
                {h}
              </span>
            ))}
          </div>

          {/* rows */}
          <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map((role) => (
              <a
                key={role.id}
                href="#contact"
                data-hr="role-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1.35rem 1.25rem',
                  borderBottom: '1px solid rgba(15,27,61,0.07)',
                  textDecoration: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '0.75rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.65)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
                className="group"
              >
                {/* animated bottom line on hover */}
                <div
                  data-hr="row-line"
                  style={{
                    position: 'absolute', bottom: 0, left: '1.25rem', right: '1.25rem',
                    height: 1,
                    background: 'linear-gradient(to right, #D4A437, rgba(212,164,55,0.1))',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />

                {/* role title + tags — full width on mobile */}
                <div className="col-span-4 md:col-span-1">
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                      color: 'rgba(212,164,55,0.7)', minWidth: 24,
                    }}>
                      {role.id}
                    </span>
                    <h3 style={{
                      fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      color: '#0f1b3d',
                      lineHeight: 1.2,
                    }}>
                      {role.title}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 32 }}>
                    {role.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.04em',
                        color: 'rgba(15,27,61,0.45)',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: 'rgba(15,27,61,0.05)',
                        border: '1px solid rgba(15,27,61,0.08)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* category */}
                <div className="hidden md:block">
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 600,
                    color: 'rgba(15,27,61,0.5)',
                  }}>
                    {role.category}
                  </span>
                </div>

                {/* engagement type */}
                <div className="hidden md:block">
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.7rem', fontWeight: 600,
                    color: 'rgba(15,27,61,0.55)',
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'rgba(212,164,55,0.07)',
                    border: '1px solid rgba(212,164,55,0.2)',
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4A437', flexShrink: 0 }} />
                    {role.type}
                  </span>
                </div>

                {/* Apply button */}
                <div className="hidden md:flex" style={{ flexShrink: 0 }}>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleApplyClick(role.title);
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '0.45rem 1.1rem',
                      borderRadius: 999,
                      fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
                      color: '#0f1b3d',
                      textDecoration: 'none',
                      border: '1px solid rgba(15,27,61,0.18)',
                      background: 'rgba(255,255,255,0.75)',
                      backdropFilter: 'blur(6px)',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = '#0f1b3d';
                      el.style.color = '#ffffff';
                      el.style.borderColor = '#0f1b3d';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(255,255,255,0.75)';
                      el.style.color = '#0f1b3d';
                      el.style.borderColor = 'rgba(15,27,61,0.18)';
                    }}
                  >
                    Apply
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div
          data-hr="cta"
          style={{
            marginTop: '3.5rem',
            padding: '2.5rem 3rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(150deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 55%, rgba(212,164,55,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.9)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 22px 60px rgba(15,27,61,0.055), inset 0 1px 0 rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#D4A437', marginBottom: 8,
            }}>
              Open Application
            </p>
            <h3 style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#0f1b3d',
              lineHeight: 1.2,
              marginBottom: 10,
            }}>
              Role not listed? Reach out anyway.
            </h3>
            <p style={{
              fontSize: '0.84rem', color: 'rgba(15,27,61,0.62)', lineHeight: 1.65, maxWidth: 480,
            }}>
              Deep expertise in Indian fintech, NBFC regulation, credit, AI infrastructure or
              regulated financial services — we want to hear from you.
            </p>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleApplyClick('Open Application');
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '0.875rem 2rem',
              borderRadius: 999,
              background: '#0f1b3d',
              color: '#ffffff',
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em',
              textDecoration: 'none',
              boxShadow: '0 12px 32px rgba(15,27,61,0.18)',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
              flexShrink: 0,
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 40px rgba(15,27,61,0.22)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(15,27,61,0.18)';
            }}
          >
            Send Open Application
            <ArrowIcon />
          </button>
        </div>

      </div>

      {/* --- Application Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-[36rem] overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl">
            {/* close button */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-6 top-6 text-navy/40 hover:text-navy transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="mb-1 text-[1.8rem] font-bold text-navy tracking-tight">Application Form</h3>
            <p className="mb-8 text-[0.95rem] text-navy/60">
              Applying for: <span className="font-bold text-gold">{selectedRole}</span>
            </p>

            {formStatus === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-5">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-[1.4rem] font-bold text-navy mb-2">Application Received</h4>
                <p className="text-[0.95rem] text-navy/70">Thank you for applying. We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <input type="hidden" name="subject" value={`New Application for ${selectedRole}`} />
                <input type="hidden" name="Role" value={selectedRole} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold uppercase tracking-wider text-navy/70">Full Name</label>
                    <input required type="text" name="Name" className="w-full rounded-xl border border-navy/10 bg-[#F0F5FF]/60 px-4 py-3 text-[0.95rem] text-navy focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold uppercase tracking-wider text-navy/70">Email</label>
                    <input required type="email" name="Email" className="w-full rounded-xl border border-navy/10 bg-[#F0F5FF]/60 px-4 py-3 text-[0.95rem] text-navy focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold transition-colors" placeholder="jane@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold uppercase tracking-wider text-navy/70">LinkedIn Profile</label>
                    <input required type="url" name="LinkedIn" className="w-full rounded-xl border border-navy/10 bg-[#F0F5FF]/60 px-4 py-3 text-[0.95rem] text-navy focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold transition-colors" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold uppercase tracking-wider text-navy/70">Resume Link (Optional)</label>
                    <input type="url" name="Resume Link" className="w-full rounded-xl border border-navy/10 bg-[#F0F5FF]/60 px-4 py-3 text-[0.95rem] text-navy focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold transition-colors" placeholder="Google Drive, Dropbox, etc." />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-bold uppercase tracking-wider text-navy/70">Why Pfundit?</label>
                  <textarea required name="Why Pfundit" rows={4} className="w-full resize-none rounded-xl border border-navy/10 bg-[#F0F5FF]/60 px-4 py-3 text-[0.95rem] text-navy focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold transition-colors" placeholder="Tell us why you are a great fit..." />
                </div>

                {formStatus === 'error' && (
                  <p className="text-sm text-red-500 font-medium">Something went wrong. Please check your access key or try again.</p>
                )}

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="mt-3 w-full rounded-full bg-navy py-3.5 text-[0.95rem] font-bold text-white transition-all hover:bg-navy/90 hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin text-white/70" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                      Submitting...
                    </>
                  ) : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
