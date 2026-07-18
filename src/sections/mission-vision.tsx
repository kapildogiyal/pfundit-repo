"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "@/animations/useScrollReveal";
import { glassOpacityDark } from "@/lib/glassmorphism";

export function MissionVision() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Initialize global scroll reveal
  useScrollReveal(sectionRef);
  const mRuleRef = useRef<HTMLDivElement | null>(null);
  const vRuleRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="mission"
      aria-label="Mission and Vision"
      className="bg-tier-base"
      style={{
        paddingTop: 'clamp(96px, 10vw, 132px)',
        paddingBottom: 'clamp(96px, 10vw, 132px)',
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249, 248, 244, 0.52), rgba(249, 248, 244, 0.52)), url('/m%26vbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top rule */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(15,27,61,0.07), transparent)",
      }} />

      <div className="layout-shell">
        {/* ── INTRO HEADER ─────────────────────────────────────────────── */}
        <div className="header-group">
          <h2
            data-reveal="heading"
            className="typo-h2 text-navy reveal-hidden header-heading"
          >
            Mission &amp; <span className="text-[#D4A437]">Vision</span>
          </h2>
        </div>

        {/* ── MAIN COMPOSITION ─────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.28fr) 20px minmax(0, 1fr)",
            columnGap: "40px",
            alignItems: "start",
          }}
          className="max-lg:!grid-cols-1 max-lg:!gap-y-16"
        >

          {/* ─── MISSION (left, wider) ─────────────────────────────────── */}
          <div
            data-reveal="block"
            className="reveal-hidden"
          >
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <span className="typo-eyebrow text-navy/45">Mission</span>
            </div>

            {/* Gold rule */}
            <div
              data-reveal="underline"
              ref={mRuleRef}
              style={{ width: 24, height: 1, background: "#C9A84C", marginBottom: 28, transition: "width 0.35s ease" }}
            />

            {/* Heading */}
            <h3
              className="typo-h3 text-navy"
              style={{ margin: 0, marginBottom: 28 }}
            >
              To expand access to disciplined, formal credit by financing <span className="italic" style={{ color: '#D4A437' }}>productive real-economy activity.</span>
            </h3>

            {/* Body */}
            <p
              className="typo-body text-navy/60"
              style={{ margin: 0, maxWidth: "60ch" }}
            >
              In Asia — across India, ASEAN over 700 million adults and a combined MSME credit gap exceeding US$660 billion define one of the largest unmet opportunities in global finance. These are productive people and businesses — driving real output, trade and employment — locked out not by lack of creditworthiness, but by the cost and complexity of serving them. Pfundit is building the AI-native credit infrastructure to change that.
            </p>
          </div>

          {/* ── Vertical centre divider ── */}
          <div
            aria-hidden
            style={{ alignSelf: "stretch", display: "flex", justifyContent: "center" }}
            className="hidden lg:flex"
          >
            <div
              data-reveal="underline"
              style={{ width: 2, height: "100%", background: "linear-gradient(to bottom, rgba(201,168,76,0), rgba(201,168,76,0.42), rgba(201,168,76,0))", transformOrigin: "top" }}
            />
          </div>

          {/* ─── VISION (right, narrower) ──────────────────────────────── */}
          <div
            data-reveal="block"
            className="reveal-hidden lg:pl-2"
          >
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <span className="typo-eyebrow text-navy/45">Vision</span>
            </div>

            {/* Gold rule */}
            <div
              data-reveal="underline"
              ref={vRuleRef}
              style={{ width: 24, height: 1, background: "#C9A84C", marginBottom: 28, transition: "width 0.35s ease" }}
            />

            {/* Heading */}
            <h3
              className="typo-h3 text-navy"
              style={{ margin: 0, marginBottom: 28 }}
            >
              To be Asia's most trusted <span className="italic" style={{ color: '#D4A437' }}>AI-enabled credit platform</span> by 2030.
            </h3>

            {/* Body */}
            <p
              className="typo-body text-navy/60"
              style={{ margin: 0, marginBottom: 48 }}
            >
              A regulated institution that holds a licence, manages a loan book, stands behind every credit outcome and compounds defensible IP in how credit is priced, delivered and managed — across India first, and Asia by design.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
