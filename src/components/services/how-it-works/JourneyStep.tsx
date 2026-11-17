"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, FileText, Rocket } from "lucide-react";
import type { HowItWorksStep } from "./types";

const STEP_ICONS = [Phone, FileText, Rocket];
const STEP_CTAS = [
  { label: "Book a Call", href: "/contact" },
  { label: "View Plan", href: "/contact" },
  { label: "Let's Build", href: "/contact" },
];

interface JourneyStepProps {
  step: HowItWorksStep;
  index: number;
}

export function JourneyStep({ step, index }: JourneyStepProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = STEP_ICONS[index] ?? Phone;
  const cta = STEP_CTAS[index] ?? STEP_CTAS[0];

  return (
    <motion.li
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 20 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col list-none"
    >
      {/* Time label above node */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="font-mono text-[10.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-md gold-shine gold-pill-badge"
          style={{ animationDelay: `${index * 1}s` }}
        >
          <span className="gold-pill-text">{step.timeLabel}</span>
        </span>
      </div>

      {/* Circular numbered node */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 + index * 0.14, ease: "easeOut" }}
        className="mb-5 flex items-center"
      >
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            border: "1.5px solid var(--gold-border)",
            background: "var(--section-elevated)",
            boxShadow: "0 0 12px var(--gold-bg)",
          }}
        >
          <span
            className="font-mono text-[12px] font-bold"
            style={{ color: "var(--gold)" }}
          >
            {step.stepNumber}
          </span>
          {/* Pulse ring on first step */}
          {index === 0 && (
            <span
              className="gold-pulse-ring absolute inset-0 rounded-full"
              style={{ border: "1px solid var(--gold-border)" }}
            />
          )}
        </div>
      </motion.div>

      {/* Card */}
      <div
        className="group relative flex-1 rounded-[20px] p-6 sm:p-7 flex flex-col justify-between gold-card-hover hover:-translate-y-1 overflow-hidden"
        style={{
          border: "1px solid var(--section-border)",
          background: "var(--section-surface)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Top hairline gold accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(90deg, var(--gold) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Icon */}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "var(--gold-bg)",
              border: "1px solid var(--gold-border)",
            }}
          >
            <Icon size={18} style={{ color: "var(--gold)" }} strokeWidth={1.75} />
          </div>

          {/* Title */}
          <h3
            className="font-display font-extrabold text-[18px] sm:text-[20px] tracking-[-0.03em] leading-snug"
            style={{ color: "var(--foreground)" }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p
            className="text-[13.5px] sm:text-[14px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {step.desc}
          </p>
        </div>

        {/* CTA link */}
        <div
          className="relative z-10 mt-5 pt-4 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--section-border)" }}
        >
          <a
            href={cta!.href}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity duration-200 hover:opacity-70"
            style={{ color: "var(--gold)" }}
          >
            {cta!.label}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </motion.li>
  );
}
