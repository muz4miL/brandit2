"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroButton } from "./HeroButton";

export interface CtaBannerProps {
  eyebrow: string;
  headingPrefix: string;
  accentText: string;
  buttonText?: string;
  buttonLeftText?: string;
  buttonRightText?: string;
  buttonHref?: string;
  imageSrc: string;
  mobileObjectPosition?: string; // e.g. "85% center" or "75% center"
  className?: string;
}

export function CtaBanner({
  eyebrow,
  headingPrefix,
  accentText,
  buttonText,
  buttonLeftText = "Ready?",
  buttonRightText = "Start Now",
  buttonHref = "/contact",
  imageSrc,
  mobileObjectPosition = "80% center",
  className = "",
}: CtaBannerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-full ${className}`}>
      {/* Outer entrance reveal wrapper */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full overflow-hidden rounded-[28px] sm:rounded-[32px] md:rounded-[36px] border border-white/[0.08] bg-[#0A0A0F] shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
      >
        {/* Hairline top highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
        />

        {/* ========================================================= */}
        {/* DESKTOP LAYOUT (>= lg): ~3:1 aspect ratio with artwork on right */}
        {/* ========================================================= */}
        <div className="hidden lg:block relative w-full aspect-[3/1] min-h-[420px] max-h-[480px]">
          {/* Separate wrapper for desktop hover image movement (up to 8px) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden"
          >
            <div
              className={`w-full h-full ${
                shouldReduceMotion
                  ? ""
                  : "transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:translate-x-1.5"
              }`}
            >
              <img
                src={imageSrc}
                alt=""
                loading="lazy"
                decoding="async"
                width={2172}
                height={724}
                className="h-full w-full object-cover object-right"
              />
            </div>
          </div>

          {/* Left subtle dark gradient overlay for text readability */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/90 to-transparent z-10"
          />

          {/* Left real HTML Content */}
          <div className="relative z-20 h-full max-w-[580px] p-10 xl:p-14 flex flex-col justify-between items-start">
            <div>
              <span className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white block mb-3.5">
                {eyebrow}
              </span>

              <h2 className="font-display text-[clamp(34px,3.6vw,52px)] font-extrabold text-[#F5F2EC] tracking-[-0.035em] leading-[1.08]">
                {headingPrefix}{" "}
                <span className="font-instrument italic font-normal text-neutral-300 text-[1.12em] block mt-1 tracking-normal">
                  {accentText}
                </span>
              </h2>
            </div>

            {/* Shared home hero CTA */}
            <div className="pt-6">
              <HeroButton
                href={buttonHref}
                leftText={buttonLeftText}
                rightText={buttonRightText}
                ariaLabel={`${buttonLeftText} ${buttonRightText}`}
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET LAYOUT (< lg): Stacked composition        */}
        {/* ========================================================= */}
        <div className="lg:hidden flex flex-col">
          {/* Text and CTA above */}
          <div className="p-6 sm:p-8 flex flex-col space-y-5 relative z-10">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white block mb-2">
                {eyebrow}
              </span>

              <h2 className="font-display text-[27px] sm:text-[34px] font-extrabold text-[#F5F2EC] tracking-[-0.035em] leading-[1.12]">
                {headingPrefix}{" "}
                <span className="font-instrument italic font-normal text-neutral-300 text-[1.12em] block mt-1 tracking-normal">
                  {accentText}
                </span>
              </h2>
            </div>

            {/* Shared home hero CTA */}
            <div>
              <HeroButton
                href={buttonHref}
                leftText={buttonLeftText}
                rightText={buttonRightText}
                ariaLabel={`${buttonLeftText} ${buttonRightText}`}
              />
            </div>
          </div>

          {/* Separate artwork region below with ~4:3 landscape ratio */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#0A0A0F]">
            {/* Blend top edge of artwork into dark background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0A0F] to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10"
            />

            <img
              src={imageSrc}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ objectPosition: mobileObjectPosition }}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
