"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cards = [
  {
    label: "Mission",
    title: "To expand access to disciplined, formal credit by financing productive real-economy activity.",
    description:
      "India's MSME sector faces a formal credit gap of ₹30 lakh crore (~$360 billion). Southeast Asia adds a further $300 billion MSME financing shortfall. Across both regions, over 700 million adults remain outside the formal credit system. The barrier is not demand - for credit, for working capital, for growth finance. It is the cost and complexity of serving them. We are building the infrastructure that makes disciplined lending at this scale commercially viable.",
    direction: -72,
  },
  {
    label: "Vision",
    title: "To be Asia's most trusted AI-enabled credit platform by 2030.",
    description:
      "A regulated institution that holds a licence, manages a loan book, stands behind every credit outcome and compounds defensible IP in how credit is priced, delivered and managed - across India first, and Asia by design.",
    direction: 72,
  },
];

export function MissionVision() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cardNodes = Array.from(
      section.querySelectorAll<HTMLElement>("[data-mission-card]"),
    );

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      cardNodes.forEach((card, index) => {
        const content = card.querySelector<HTMLElement>("[data-card-content]");
        const glow = card.querySelector<HTMLElement>("[data-card-glow]");

        // Auto glow animation on scroll
        if (glow && content) {
          glow.style.opacity = "1";
          glow.style.backgroundSize = "220% 220%";
          glow.style.backgroundPosition = "0% 50%";

          const glowState = { x: 0 };

          const revealGlow = () => {
            gsap.fromTo(
              glowState,
              { x: 0 },
              {
                x: 100,
                duration: 2.8,
                ease: "power2.out",
                onUpdate: () => {
                  glow.style.backgroundImage =
                    "radial-gradient(circle at center, rgba(212,164,55,0.9) 0%, rgba(212,164,55,0.42) 18%, rgba(255,255,255,0) 55%)";
                  glow.style.backgroundRepeat = "no-repeat";
                  glow.style.backgroundPosition = `${glowState.x}% 50%`;
                },
              },
            );
          };

          ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            once: true,
            onEnter: revealGlow,
          });
        }

        if (!content || !glow) return;

        let isAutoGlowing = false;

        // Detect when auto-glow is active
        const checkAutoGlow = () => {
          const rect = card.getBoundingClientRect();
          isAutoGlowing =
            rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        };

        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = (x / rect.width - 0.5) * 8;
          const rotateX = (0.5 - y / rect.height) * 8;
          const glowX = (x / rect.width) * 100;
          const glowY = (y / rect.height) * 100;

          gsap.to(content, {
            x: rotateY * 0.9,
            y: -rotateX * 0.9,
            rotateX,
            rotateY,
            transformPerspective: 900,
            duration: 0.35,
            ease: "power2.out",
          });

          gsap.to(glow, {
            opacity: 1,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(212,164,55,0.85), rgba(212,164,55,0.36) 18%, rgba(255,255,255,0) 58%)`,
            duration: 0.35,
            ease: "power2.out",
          });
        };

        const handleLeave = () => {
          gsap.to(content, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: "power3.out",
          });

          // Return to auto-glow or default glow
          checkAutoGlow();
          if (isAutoGlowing) {
            gsap.to(glow, {
              opacity: 0.95,
              background:
                "radial-gradient(circle at 50% 50%, rgba(212,164,55,0.9), rgba(212,164,55,0.4) 18%, rgba(255,255,255,0) 58%)",
              duration: 0.45,
              ease: "power3.out",
            });
          } else {
            gsap.to(glow, {
              opacity: 0.8,
              background:
                "radial-gradient(circle at top right, rgba(212,164,55,0.4), rgba(212,164,55,0.14) 18%, rgba(255,255,255,0) 58%)",
              duration: 0.45,
              ease: "power3.out",
            });
          }
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);

        cleanups.push(() => {
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
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
        <div className="mx-auto max-w-[42rem] text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/45 px-5 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(212,164,55,0.75)]" />
            <span className="typo-eyebrow text-navy/60">Purpose</span>
          </div>

          <h2 className="typo-hero text-navy">Mission &amp; Vision</h2>

          <p className="mx-auto mt-6 max-w-[48rem] typo-body text-navy/70">
            To expand access to disciplined, formal credit by financing
            productive real-economy activity - with technology-led
            infrastructure, institutional governance and long-term regulatory
            alignment.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.label}
              data-mission-card
              data-direction={card.direction}
              className="group relative flex h-full overflow-hidden rounded-[2rem] border border-navy/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72)_58%,rgba(212,164,55,0.07)_100%)] p-6 text-center shadow-[0_18px_48px_rgba(15,27,61,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-[0_24px_58px_rgba(15,27,61,0.1)] sm:p-7"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                data-card-glow
                className="pointer-events-none absolute inset-0 opacity-100 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(212,164,55,0.85), rgba(212,164,55,0.35) 18%, rgba(255,255,255,0) 58%)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "220% 220%",
                }}
              />
              <div
                data-card-content
                className="relative z-10 flex flex-col items-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="block typo-label text-gold">{card.label}</span>

                <h3 className="mt-3 max-w-[25ch] typo-h3 text-navy">
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
