"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Instrument_Serif } from "next/font/google";
import { JourneyStep } from "./JourneyStep";
import { HOW_IT_WORKS_STEPS, HowItWorksStep } from "./types";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

export function HowItWorksSection({ steps }: { steps?: HowItWorksStep[] | undefined } = {}) {
  const shouldReduceMotion = useReducedMotion();
  const displaySteps = steps && steps.length > 0 ? steps : HOW_IT_WORKS_STEPS;

  return (
    <section
      id="how-it-works"
      aria-label="How it works process"
      className="relative py-24 sm:py-32 overflow-hidden select-none border-t border-b"
      style={{
        background: "var(--section-bg)",
        borderColor: "var(--section-border)",
      }}
    >
      {/* Ambient gold radial glow — dark only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full blur-[180px] dark:block hidden"
        style={{ background: "rgba(209,173,105,0.06)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full blur-[180px] dark:block hidden"
        style={{ background: "rgba(152,113,59,0.04)" }}
      />
      {/* Light mode: subtle warm radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-[200px] dark:hidden"
        style={{ background: "rgba(152,113,59,0.07)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "var(--gold)" }}
            >
              SIMPLE PROCESS
            </span>
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
          </div>

          <h2
            className="font-display text-[clamp(32px,4.5vw,58px)] font-extrabold tracking-[-0.04em] leading-[1.06]"
            style={{ color: "var(--section-text, var(--foreground))" }}
          >
            How it{" "}
            <span
              className={`${instrumentSerif.className} italic font-normal text-[1.08em] tracking-normal`}
            >
              works
            </span>
          </h2>

          <p
            className="mt-4 text-[15px] sm:text-[16px] leading-relaxed"
            style={{ color: "var(--gold-muted)" }}
          >
            Three steps. First call to real results.
          </p>
        </div>

        {/* Step grid with gold connector line */}
        <div className="relative">
          {/* Horizontal gold timeline track — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[48px] left-[52px] right-[52px] h-[1px] pointer-events-none z-0"
            style={{ background: "var(--section-border)" }}
          >
            {/* Gold fill — animates in */}
            <motion.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 origin-left"
              style={{ background: "var(--gold)" }}
            />
          </div>

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 m-0 p-0">
            {displaySteps.map((step, idx) => (
              <JourneyStep key={`${step.title}-${idx}`} step={step} index={idx} />
            ))}
          </ol>
        </div>

        {/* Footer CTA row */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid var(--section-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{
                background: "var(--gold)",
                boxShadow: "0 0 10px var(--gold-bg)",
              }}
            />
            <p
              className="text-[13.5px] font-mono"
              style={{ color: "var(--gold-muted)" }}
            >
              Clear timelines, guaranteed delivery dates, no guesswork.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[13px] font-bold tracking-wide transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shrink-0"
            style={{
              background: "var(--gold)",
              color: "var(--section-bg)",
            }}
          >
            Book a Free Strategy Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
