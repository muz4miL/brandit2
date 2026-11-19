"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { TimelineStep } from "./TimelineStep";

const DEFAULT_CHECKLIST_ITEMS = [
  {
    title: "A plan behind every move",
    desc: "Everything ties to your goals.",
  },
  {
    title: "Strategy backed by data",
    desc: "We research before we create.",
  },
  {
    title: "Plain-language reporting",
    desc: "You always know what's working.",
  },
];

const DEFAULT_TIMELINE_STEPS = [
  {
    dayLabel: "Day 1",
    title: "Welcome",
    desc: "A named contact from hour one.",
  },
  {
    dayLabel: "Day 2",
    title: "First 48 Hours",
    desc: "30 minutes. One action plan.",
  },
  {
    dayLabel: "Day 5",
    title: "Kickoff Call",
    desc: "Goals, timeline, deliverables. Locked.",
  },
  {
    dayLabel: "Day 14",
    title: "Live Delivery",
    desc: "Track progress in real time.",
  },
];

interface OnboardingSectionProps {
  checklistItems?: { title: string; desc: string }[] | undefined;
  timelineSteps?: { dayLabel: string; title: string; desc: string }[] | undefined;
}

export function OnboardingSection({
  checklistItems = DEFAULT_CHECKLIST_ITEMS,
  timelineSteps = DEFAULT_TIMELINE_STEPS,
}: OnboardingSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const displayChecklist =
    checklistItems && checklistItems.length > 0 ? checklistItems : DEFAULT_CHECKLIST_ITEMS;
  const displayTimeline =
    timelineSteps && timelineSteps.length > 0 ? timelineSteps : DEFAULT_TIMELINE_STEPS;

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressScaleY = shouldReduceMotion ? scrollYProgress : smoothProgress;
  const cometTopPercent = useTransform(
    progressScaleY,
    (v) => `${Math.max(0, Math.min(100, v * 100))}%`,
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepCount = displayTimeline.length || 4;
      const stepIdx = Math.min(Math.floor(latest * stepCount), stepCount - 1);
      setActiveStep(Math.max(0, stepIdx));
    });
    return () => unsubscribe();
  }, [scrollYProgress, displayTimeline.length]);

  const currentActiveIndex = hoveredStep !== null ? hoveredStep : activeStep;

  const activeChecklistIndex = currentActiveIndex === 0 ? 0 : currentActiveIndex <= 2 ? 1 : 2;

  return (
    <section
      className="relative py-24 sm:py-32 select-none"
      style={{
        background: "var(--section-bg)",
        borderTop: "1px solid var(--section-border)",
        borderBottom: "1px solid var(--section-border)",
        overflowX: "clip",
      }}
    >
      {/* Ambient gold radial glows — dark mode only */}
      <div
        aria-hidden="true"
        className="dark:block hidden pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full blur-[160px]"
        style={{ background: "rgba(209,173,105,0.035)" }}
      />
      <div
        aria-hidden="true"
        className="dark:block hidden pointer-events-none absolute -bottom-40 left-10 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{ background: "rgba(184,134,11,0.03)" }}
      />
      {/* Light mode warm ambient */}
      <div
        aria-hidden="true"
        className="dark:hidden pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full blur-[180px]"
        style={{ background: "rgba(152,113,59,0.06)" }}
      />

      {/* Film Grain */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.025] mix-blend-overlay"
      >
        <filter id="noiseFilter-onboarding">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter-onboarding)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 lg:sticky lg:top-[112px] lg:self-start space-y-6">
            <div>
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] block"
                style={{ color: "var(--gold)" }}
              >
                CLIENT ONBOARDING
              </span>

              <h2
                className="mt-3 font-display text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.04em] leading-[1.1]"
                style={{ color: "var(--foreground)" }}
              >
                The first two weeks{" "}
                <span
                  className="font-serif italic font-normal text-[1.12em] tracking-normal"
                  style={{ color: "var(--gold)" }}
                >
                  set the tone
                </span>
              </h2>

              <p
                className="mt-4 text-[14.5px] sm:text-[15.5px] leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                No guesswork. No black holes. A clear plan from day one.
              </p>
            </div>

            {/* Checklist Items */}
            <div className="pt-2 space-y-3.5">
              {displayChecklist.slice(0, 3).map((item, i) => {
                const isItemActive = activeChecklistIndex === i;
                return (
                  <div
                    key={`${item.title}-${i}`}
                    className={`flex items-start gap-3.5 transition-all duration-300 ease-out ${
                      isItemActive ? "opacity-100 translate-x-1" : "opacity-45 translate-x-0"
                    }`}
                  >
                    <div
                      className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full shrink-0 transition-all duration-300"
                      style={
                        isItemActive
                          ? {
                              background: "var(--gold-bg)",
                              border: "1px solid var(--gold-border)",
                              boxShadow: "0 0 12px var(--gold-bg)",
                            }
                          : {
                              background: "var(--section-elevated)",
                              border: "1px solid var(--section-border)",
                            }
                      }
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="overflow-visible"
                      >
                        <motion.path
                          d="M4 12.5L9.5 18L20 6.5"
                          stroke={isItemActive ? "var(--gold)" : "var(--muted-foreground)"}
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={
                            shouldReduceMotion
                              ? { pathLength: 1, opacity: 1 }
                              : { pathLength: 0, opacity: 0 }
                          }
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.15 + i * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </svg>
                    </div>

                    <div>
                      <h3
                        className="font-display font-bold text-[14.5px] leading-snug transition-colors duration-300"
                        style={{
                          color: isItemActive ? "var(--foreground)" : "var(--muted-foreground)",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="mt-0.5 text-[13px] leading-relaxed transition-colors duration-300"
                        style={{
                          color: isItemActive
                            ? "var(--muted-foreground)"
                            : "var(--muted-foreground)",
                          opacity: isItemActive ? 1 : 0.6,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7 space-y-4">
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] block mb-6"
              style={{ color: "var(--gold)" }}
            >
              WHAT HAPPENS WHEN YOU JOIN
            </span>

            <div ref={timelineRef} className="relative space-y-8 sm:space-y-10">
              {/* Unfilled vertical track */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-6 bottom-6 w-[2px] -translate-x-1/2 pointer-events-none"
                style={{ background: "var(--section-border)" }}
              />

              {/* Blur glow duplicate */}
              <motion.div
                aria-hidden="true"
                style={{
                  scaleY: progressScaleY,
                  transformOrigin: "top",
                  background: "var(--gold)",
                }}
                className="absolute left-0 top-6 bottom-6 w-[2px] -translate-x-1/2 blur-[6px] opacity-70 pointer-events-none"
              />

              {/* Filled progress portion */}
              <motion.div
                aria-hidden="true"
                style={{
                  scaleY: progressScaleY,
                  transformOrigin: "top",
                  background: "var(--gold)",
                  boxShadow: "0 0 14px var(--gold-border), 0 0 22px var(--gold-bg)",
                }}
                className="absolute left-0 top-6 bottom-6 w-[2px] -translate-x-1/2 pointer-events-none z-10"
              />

              {/* Comet dot */}
              <motion.div
                aria-hidden="true"
                className="absolute left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 pointer-events-none z-30 transition-transform duration-100"
                style={{
                  top: cometTopPercent,
                  background: "var(--section-surface)",
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 16px var(--gold), 0 0 24px var(--gold-bg)",
                }}
              >
                <span
                  className="animate-ping absolute inset-0 rounded-full opacity-75"
                  style={{ background: "var(--gold)" }}
                />
              </motion.div>

              {displayTimeline.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <TimelineStep
                    step={step}
                    index={index}
                    dayLabel={step.dayLabel}
                    isActive={currentActiveIndex === index}
                    isPassed={index < currentActiveIndex}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
