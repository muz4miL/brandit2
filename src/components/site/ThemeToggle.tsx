"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 ${className}`}
      >
        <Moon size={18} />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={!isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
        isDark
          ? "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/10 hover:text-white"
          : "border-[#e3dfd7] bg-[#efece6] text-[#141414] hover:bg-white hover:text-black shadow-sm"
      } ${className}`}
    >
      <div className="relative h-5 w-5">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-[#141414]"
          }`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-white"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
