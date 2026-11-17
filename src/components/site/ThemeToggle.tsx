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
        className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-2 text-fg ${className}`}
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
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-2 text-fg shadow-sm transition-all duration-300 hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${className}`}
    >
      <div className="relative h-5 w-5">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-fg"
          }`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-fg"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
