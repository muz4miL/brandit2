"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";
import { StepVisual } from "./StepVisual";

interface TimelineStepProps {
  step: {
    title: string;
    desc: string;
  };
  index: number;
  dayLabel: string;
  isActive: boolean;
  isPassed?: boolean;
  stepRef?: (el: HTMLDivElement | null) => void;
}

export function TimelineStep({
  step,
  index,
  dayLabel,
  isActive,
  isPassed = false,
  stepRef,
}: TimelineStepProps) {
  const shouldReduceMotion = useReducedMotion();
  const isHero = index === 1;
  const numeral = `0${index + 1}`;

  return (
    <motion.div
      ref={stepRef}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 28 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative pl-8 sm:pl-12 transition-all duration-400 ease-out ${
        shouldReduceMotion
          ? isActive
            ? "opacity-100"
            : "opacity-40"
          : isActive
          ? "opacity-100 scale-100 filter-none"
          : "opacity-40 scale-[0.97] blur-[1px] hover:opacity-80 hover:scale-[0.985] hover:blur-none"
      }`}
    >
      {/* Node marker on the timeline track */}
      <div className="absolute left-0 top-6 -translate-x-1/2 flex items-center justify-center z-20">
        {isActive ? (
          <div
            className="relative h-6 w-6 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: "var(--section-elevated)",
              border: "1.5px solid var(--gold)",
              boxShadow: "0 0 16px var(--gold-bg)",
            }}
          >
            <span
              className="gold-pulse-ring absolute inset-0 rounded-full border"
              style={{ borderColor: "var(--gold-border)" }}
            />
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: "var(--gold)",
                boxShadow: "0 0 10px var(--gold)",
              }}
            />
          </div>
        ) : isPassed ? (
          <div
            className="h-5 w-5 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: "var(--gold)",
              border: "1.5px solid var(--gold)",
              boxShadow: "0 0 10px var(--gold-border)",
            }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--section-bg)" }}
            />
          </div>
        ) : (
          <div
            className="h-5 w-5 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: "var(--section-elevated)",
              border: "1px solid var(--section-border)",
            }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--section-border)" }}
            />
          </div>
        )}
      </div>

      {/* Day label badge */}
      <div className="flex items-center gap-2 mb-2.5">
        <span
          className={`font-mono text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-md gold-pill-badge gold-shine ${
            index === 0
              ? "gold-shine-d1"
              : index === 1
              ? "gold-shine-d2"
              : index === 2
              ? "gold-shine-d3"
              : "gold-shine-d4"
          }`}
        >
          <span className="gold-pill-text">
            {dayLabel} · Phase {numeral}
          </span>
        </span>
      </div>

      {/* Spotlight Bento Card */}
      <SpotlightCard
        numeral={numeral}
        isActive={isActive}
        isHero={isHero}
        className={
          isHero
            ? "ring-1 shadow-[0_0_30px_var(--gold-bg)]"
            : ""
        }
        style={
          isHero
            ? { "--ring-color": "var(--gold-border)" } as React.CSSProperties
            : {}
        }
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className={`font-display font-extrabold tracking-[-0.03em] ${
                isHero
                  ? "text-[21px] sm:text-[24px]"
                  : "text-[18px] sm:text-[20px]"
              }`}
              style={{ color: "var(--foreground)" }}
            >
              {step.title}
            </h3>
            <p
              className="mt-2 text-[14px] sm:text-[15px] leading-relaxed max-w-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              {step.desc}
            </p>
          </div>
        </div>

        <StepVisual stepIndex={index} />
      </SpotlightCard>
    </motion.div>
  );
}
