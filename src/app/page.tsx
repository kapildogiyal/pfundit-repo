'use client';

import { Navbar } from '@/components/navbar/Navbar';
import { PremiumBackground } from '@/components/background/premium-background';
import {
  Contact,
  Governance,
  HeroSection,
  Infrastructure as AIEdge,
  InvestmentThesis,
  Leadership,
  MissionVision,
  Stakeholders,
} from '@/sections';
import { useLenisScroll } from '@/hooks/use-lenis-scroll';

export default function Home() {
  useLenisScroll();

  return (
    <div className="relative min-h-screen text-text-primary">
      <PremiumBackground />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <div id="mission" className="section-cinematic section-cinematic-alt">
          <MissionVision />
        </div>
        <div id="thesis" className="section-cinematic">
          <InvestmentThesis />
        </div>

        {/* <div className="h-[16vh] bg-gradient-to-b from-[#f7f7f4] via-[#f5f7fb] to-[#f3f5fa]" /> */}

        <div id="ai-edge" className="section-cinematic section-cinematic-navy">
          <AIEdge />
        </div>
        <div id="leadership" className="section-cinematic">
          <Leadership />
        </div>
        <div id="stakeholders" className="section-cinematic section-cinematic-alt">
          <Stakeholders />
        </div>
        <div id="governance" className="section-cinematic section-cinematic-navy">
          <Governance />
        </div>
        <div id="contact" className="section-cinematic">
          <Contact />
        </div>
      </main>

      <footer className="relative overflow-hidden border-t border-white/10 bg-[#081129] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-[-8%] h-[22rem] w-[22rem] rounded-full bg-[#d4a437]/20 blur-[130px]" />
          <div className="absolute right-[-8%] top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#22396e]/45 blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.12),transparent_45%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="layout-shell editorial-container py-16 sm:py-18 lg:py-20">
          <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:gap-14">
            <div>
              <p className="text-[2rem] font-bold tracking-[-0.05em] text-white sm:text-[2.25rem]">
                Pfundit
              </p>
              <p className="mt-4 max-w-[35rem] typo-body-sm text-white/68">
                A Singapore-incorporated holding company building an AI-native NBFC in India and
                digital lending infrastructure across Asia.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,164,55,0.75)]" />
                <span className="typo-eyebrow text-white/52">
                  Singapore · ACRA Registered
                </span>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h4 className="mb-4 typo-eyebrow text-white/40">
                  Registered Entity
                </h4>
                <div className="space-y-2.5 typo-body-sm text-white/68">
                  <p>Pfundit Pte. Ltd.</p>
                  <p>Singapore (ACRA) · Incorporated 2025</p>
                  <p>UEN: To be displayed on request</p>
                  <p>Registered office: Singapore</p>
                  <p>info@pfundit.com</p>
                </div>
              </div>

              <div>
                <h4 className="mb-4 typo-eyebrow text-white/40">
                  Navigate
                </h4>
                <div className="space-y-2.5 typo-body-sm text-white/68">
                  <p><a href="#mission" className="transition-colors hover:text-[#f0ce78]">Mission</a></p>
                  <p><a href="#thesis" className="transition-colors hover:text-[#f0ce78]">Investment Thesis</a></p>
                  <p><a href="#ai-edge" className="transition-colors hover:text-[#f0ce78]">AI Edge</a></p>
                  <p><a href="#leadership" className="transition-colors hover:text-[#f0ce78]">Founders</a></p>
                  <p><a href="#governance" className="transition-colors hover:text-[#f0ce78]">Governance &amp; Trust</a></p>
                  <p><a href="#contact" className="transition-colors hover:text-[#f0ce78]">Contact</a></p>
                </div>
              </div>

              <div>
                <h4 className="mb-4 typo-eyebrow text-white/40">
                  Legal &amp; Policies
                </h4>
                <div className="space-y-2.5 typo-body-sm text-white/68">
                  <p>Privacy Policy</p>
                  <p>Terms of Use</p>
                  <p>Cookie Notice</p>
                  <p>Responsible Disclosure</p>
                  <p>Code of Conduct</p>
                  <p>Whistleblower Channel</p>
                  <p>Policies under preparation — available on request.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10">
            <h4 className="mb-4 typo-eyebrow text-white/40">
              Regulatory Disclosure
            </h4>
            <div className="grid gap-4 typo-body-sm text-white/56 lg:grid-cols-2 lg:gap-x-10">
              <p>
                Pfundit Pte. Ltd. (&quot;Pfundit&quot;, &quot;we&quot;) is a private limited company incorporated in Singapore in 2025 and registered with the Accounting and Corporate Regulatory Authority (ACRA). Pfundit is in the process of incorporating a wholly-owned subsidiary in India. That India subsidiary, once incorporated, intends to apply to the Reserve Bank of India (RBI) for registration as a Non-Banking Financial Company — Type II, Non-Deposit Taking, Investment &amp; Credit Company (NBFC-ND-ICC). As of the date of this website, no such application has been filed and no RBI registration has been granted.
              </p>
              <p>
                Neither Pfundit nor any affiliate is currently authorised to carry on the business of a non-banking financial institution in India, and none will do so until the requisite RBI registration is granted and any other applicable regulatory approvals are in place. Pfundit does not solicit, accept or hold deposits from the public in any jurisdiction.
              </p>
              <p>
                Nothing on this website constitutes, or should be construed as, an offer or solicitation to buy or sell any security, an offer of credit, investment, legal, tax or financial advice, or a recommendation of any financial product or service. The information on this website is provided for general corporate information only, is directed only at persons in jurisdictions where its publication and availability is lawful, and does not create any advisory, fiduciary or client relationship.
              </p>
              <p>
                Third-party market data referenced on this website (including market size and industry estimates) is drawn from publicly available reports of the sources cited and has not been independently verified by Pfundit. Any forward-looking statements relating to Pfundit&apos;s own business — including projected AUM, cost-to-income ratios and operating timelines — reflect Pfundit&apos;s current views and are subject to regulatory approvals, market conditions, execution risk and other factors, any of which may cause actual outcomes to differ materially. Pfundit assumes no obligation to update any such statements.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/12 pt-5 typo-label text-white/44 lg:flex-row lg:items-center lg:justify-between">
              <p>© 2026 Pfundit Pte. Ltd. · All Rights Reserved.</p>
              <p>Singapore HQ · India NBFC (in formation) · Pan-Asia Lending Platform</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
