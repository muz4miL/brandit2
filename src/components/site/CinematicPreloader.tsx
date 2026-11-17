"use client";

import React, { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

export function CinematicPreloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check if already shown in this session
    const alreadyShown = sessionStorage.getItem("brandit_preloaded");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyShown || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    // Lock body scroll during preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Non-linear realistic progress simulation (total ~1.4s)
    let current = 0;
    const interval = setInterval(() => {
      // Easing speed based on stage
      let step = 2;
      if (current < 25) {
        step = 3;
      } else if (current < 60) {
        step = 4;
      } else if (current < 85) {
        step = 2;
      } else if (current < 95) {
        step = 1;
      } else {
        step = 3;
      }

      current += step;

      if (current < 35) {
        setStatusText("INITIALIZING SYSTEM");
      } else if (current < 70) {
        setStatusText("CALIBRATING SIGNAL");
      } else if (current < 90) {
        setStatusText("SYNCING ASSETS");
      } else {
        setStatusText("BRANDIT ONLINE");
      }

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Mark as loaded in sessionStorage
        try {
          sessionStorage.setItem("brandit_preloaded", "true");
        } catch {}

        // Short hold at 100% then smooth dissolve exit
        setTimeout(() => {
          setIsFadingOut(true);
          document.body.style.overflow = originalOverflow;

          // Unmount after fade transition finishes
          setTimeout(() => {
            setMounted(false);
          }, 650);
        }, 180);
      } else {
        setProgress(current);
      }
    }, 28);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030408] select-none transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut
          ? "opacity-0 scale-105 pointer-events-none filter blur-md"
          : "opacity-100 scale-100"
      }`}
    >
      {/* 1. Cinematic Ambient Deep Obsidian Back-Aura */}
      <div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-70 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(20, 20, 20, 0.25) 45%, transparent 75%)",
        }}
      />

      {/* 2. Micro Grain Overlay for High-End Film Aesthetic */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6">
        {/* Wordmark with Subtle Luminous Backlight */}
        <div className="relative mb-10 flex items-center justify-center">
          <div
            className="absolute -inset-4 rounded-full blur-xl opacity-30 animate-pulse pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)",
            }}
          />
          <Wordmark variant="white" className="h-10 sm:h-11 w-auto relative z-10" />
        </div>

        {/* Counter Percentage */}
        <div className="flex items-baseline font-mono text-[26px] sm:text-[30px] font-semibold text-white tracking-tight mb-2">
          <span>{progress}</span>
          <span className="text-sm sm:text-base font-normal text-neutral-400 ml-1.5 opacity-80">
            %
          </span>
        </div>

        {/* Status Subtitle */}
        <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-neutral-400 mb-6">
          {statusText}
        </p>

        {/* Cinematic Monochrome Progress Bar */}
        <div className="relative w-64 sm:w-76 h-[2.5px] rounded-full bg-white/[0.08] overflow-visible">
          {/* Track Underglow */}
          <div
            className="absolute inset-0 rounded-full blur-[6px] opacity-70 transition-all duration-75"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #333333 0%, #FFFFFF 50%, #E5E5E5 100%)",
            }}
          />

          {/* Filled Progress Bar (Smooth silver/white gradient) */}
          <div
            className="relative h-full rounded-full transition-all duration-75 ease-out shadow-[0_0_16px_rgba(255,255,255,0.85),0_0_32px_rgba(255,255,255,0.35)]"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #71717A 0%, #E4E4E7 45%, #FFFFFF 85%, #FFFFFF 100%)",
            }}
          >
            {/* Comet Leading Edge Particle */}
            {progress > 2 && progress < 100 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF,0_0_18px_#E4E4E7]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
