import { cn } from "@/lib/utils";
import React from "react";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  hasShine?: boolean;
}

export function SectionBadge({
  children,
  className = "",
  hasShine = true,
}: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex h-[38px] sm:h-[42px] items-center justify-center overflow-hidden rounded-full border border-line bg-surface-2/90 text-fg shadow-[0_2px_8px_rgba(20,20,20,0.06)] dark:border-white/12 dark:bg-gradient-to-b dark:from-[#1C1C22]/90 dark:via-[#121217]/90 dark:to-[#0A0A0E]/90 dark:text-[#E4E4E7] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),0_6px_20px_rgba(0,0,0,0.5)] px-5 sm:px-6 backdrop-blur-md select-none transition-all duration-300 hover:border-fg/20 dark:hover:border-white/25",
        className
      )}
    >
      {/* Specular glass shine streak */}
      {hasShine && (
        <span
          className="pointer-events-none absolute -inset-x-full top-0 h-full w-[200%] bg-gradient-to-r from-transparent via-current opacity-10 to-transparent transform -skew-x-12 animate-badge-shine"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 font-display text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-fg/80 dark:text-[#E4E4E7] uppercase">
        {children}
      </span>
    </div>
  );
}
