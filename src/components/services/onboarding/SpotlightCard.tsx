"use client";

import React, { useRef, useState, useCallback, type HTMLAttributes } from "react";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  numeral?: string;
  isActive?: boolean;
  isHero?: boolean;
  children: React.ReactNode;
}

export function SpotlightCard({
  numeral,
  isActive = true,
  isHero = false,
  className = "",
  children,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCoords(null);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[24px] border transition-all duration-400 ease-out overflow-hidden ${
        isHero ? "p-7 sm:p-9" : "p-6 sm:p-7"
      } ${className}`}
      style={{
        background: "var(--section-surface)",
        borderColor: isActive ? "var(--gold-border)" : "var(--section-border)",
        boxShadow: isActive
          ? "0 0 35px var(--gold-bg), 0 20px 50px rgba(0,0,0,0.25)"
          : "0 12px 30px rgba(0,0,0,0.12)",
        ["--mouse-x" as any]: coords ? `${coords.x}px` : "50%",
        ["--mouse-y" as any]: coords ? `${coords.y}px` : "50%",
      }}
      {...props}
    >
      {/* Hairline top highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--section-border), transparent)" }}
      />

      {/* Top-left gold hairline accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-32 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to right, var(--gold), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-px h-28 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }}
      />

      {/* Mouse spotlight glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: coords
            ? `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, var(--gold-bg), transparent 80%)`
            : "none",
        }}
      />

      {/* Hero ambient glow */}
      {isHero && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "var(--gold-bg)" }}
        />
      )}

      {/* Ghost numeral */}
      {numeral && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-4 select-none font-mono text-5xl sm:text-6xl font-black tracking-tighter transition-all duration-300"
          style={{
            WebkitTextStroke: isActive
              ? "1px var(--gold-border)"
              : isHovered
              ? "1px var(--gold-border)"
              : "1px var(--section-border)",
            color: "transparent",
            textShadow: isActive
              ? "0 0 30px var(--gold-bg)"
              : "none",
          }}
        >
          {numeral}
        </span>
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
