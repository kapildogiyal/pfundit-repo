"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TalkToUsButton } from "@/components/button";

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const runFromTo = (selector: string, fromVars: any, toVars: any) => {
        const els = section.querySelectorAll(selector);
        if (!els || els.length === 0) return;
        gsap.fromTo(els as any, fromVars, toVars);
      };

      runFromTo(
        "[data-contact-reveal]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F0F5FF] py-20 md:py-24 lg:py-28"
      id="contact"
    >
      <div className="layout-shell editorial-container relative z-10">
        <div className="mx-auto max-w-[80rem] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy via-[#0a1628] to-[#050f1f] px-8 py-20 sm:px-12 md:py-24 relative">
          {/* Geometric pattern background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <svg
              className="absolute inset-0 h-full w-full opacity-50"
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <circle
                cx="600"
                cy="300"
                r="400"
                fill="none"
                stroke="#d4a437"
                strokeWidth="2"
                opacity="0.15"
              />
              <circle
                cx="600"
                cy="300"
                r="350"
                fill="none"
                stroke="#d4a437"
                strokeWidth="2"
                opacity="0.12"
              />
              <circle
                cx="600"
                cy="300"
                r="300"
                fill="none"
                stroke="#d4a437"
                strokeWidth="2"
                opacity="0.1"
              />
              <circle
                cx="600"
                cy="300"
                r="250"
                fill="none"
                stroke="#d4a437"
                strokeWidth="2"
                opacity="0.08"
              />
              <circle
                cx="600"
                cy="300"
                r="200"
                fill="none"
                stroke="#d4a437"
                strokeWidth="2"
                opacity="0.06"
              />
            </svg>
          </div>
          {/* Content */}
          <div className="relative z-10 text-center">
            <div data-contact-reveal className="text-center">
              <h2 className="text-[2.4rem] font-bold leading-[1.15] tracking-[-0.04em] text-white sm:text-[2.8rem] md:text-[3.4rem]">
                Let&apos;s Have a Conversation
              </h2>

              <p className="mx-auto mt-6 max-w-[56rem] text-[0.95rem] leading-[1.42] text-white/75 sm:text-[1rem] md:mt-8">
                Whether you are an investor, debt provider, co-lending partner,
                technology partner, loan origination partner or strategic
                consultant - Pfundit is actively building its founding
                stakeholder ecosystem. We are at the stage where the right
                conversations shape the institution.
              </p>
            </div>

            {/* Buttons Section */}
            <div
              data-contact-reveal
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4 md:mt-12"
            >
              <TalkToUsButton onClick={() => setShowModal(true)} />

              <motion.button
                type="button"
                className="inline-flex items-center justify-center rounded-full border-2 border-gold px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/10 hover:shadow-[0_0_24px_rgba(212,164,55,0.3)]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Meeting
              </motion.button>
            </div>

            {/* Modal (opened from 'Talk to Us') */}
            {showModal && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 z-[99990] bg-[#0f1b3d]/60 backdrop-blur-sm"
                  onClick={() => setShowModal(false)}
                />
                <div className="relative z-[100000] w-full max-w-2xl">
                  <div className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-3">
                      <h3 className="text-lg font-semibold text-[#0f1b3d]">
                        Talk to Us
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="rounded-full p-2 text-[#0f1b3d]/60 hover:text-[#0f1b3d]"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto px-5 py-4">
                      <ContactForm onClose={() => setShowModal(false)} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm({ onClose }: { onClose?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const validate = () => {
    const next: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) next.name = "Please enter your name";
    if (!email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email";
    if (!message.trim()) next.message = "Please enter a message";
    return next;
  };

  const focusFirstError = (err: typeof errors) => {
    if (err.name) {
      nameRef.current?.focus();
    } else if (err.email) {
      emailRef.current?.focus();
    } else if (err.message) {
      messageRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/applications/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to submit the form. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success && onClose) {
      const t = setTimeout(() => onClose(), 900);
      return () => clearTimeout(t);
    }
  }, [success, onClose]);

  return (
    <div>
      {success ? (
        <div className="flex flex-col items-center rounded-2xl bg-white/95 p-6 text-center text-[#0f1b3d]">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-lg font-bold">
            Thanks — your message has been received.
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-none bg-transparent p-0"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold uppercase tracking-wider text-[#0f1b3d]/70 sm:text-[0.7rem]">
                Name
              </label>
              <input
                ref={nameRef}
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl border border-[#0f1b3d]/10 bg-[#F0F5FF]/60 px-4 py-2.5 text-[0.95rem] text-[#0f1b3d] transition-colors focus:border-[#D4A437] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4A437] ${errors.name ? "ring-1 ring-red-400" : ""}`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold uppercase tracking-wider text-[#0f1b3d]/70 sm:text-[0.7rem]">
                Email
              </label>
              <input
                ref={emailRef}
                required
                placeholder="jane@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl border border-[#0f1b3d]/10 bg-[#F0F5FF]/60 px-4 py-2.5 text-[0.95rem] text-[#0f1b3d] transition-colors focus:border-[#D4A437] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4A437] ${errors.email ? "ring-1 ring-red-400" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Removed company and subject fields per request */}

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.68rem] font-bold uppercase tracking-wider text-[#0f1b3d]/70 sm:text-[0.7rem]">
              Message
            </label>
            <textarea
              ref={messageRef}
              required
              rows={5}
              placeholder="Tell us what's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full resize-none rounded-xl border border-[#0f1b3d]/10 bg-[#F0F5FF]/60 px-4 py-2.5 text-[0.95rem] text-[#0f1b3d] transition-colors focus:border-[#D4A437] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4A437] ${errors.message ? "ring-1 ring-red-400" : ""}`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="shrink-0">
            <button
              type="submit"
              disabled={loading}
              aria-label="Send message"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f1b3d] py-3 text-[0.95rem] font-bold text-white transition-all hover:bg-[#0f1b3d]/90 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white/70"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
