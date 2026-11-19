interface WordmarkProps {
  className?: string;
  variant?: "white" | "black" | "dark" | "theme";
  glow?: boolean;
}

export function Wordmark({ className = "", variant = "white", glow = false }: WordmarkProps) {
  const isTheme = variant === "theme";
  const color = isTheme ? "text-fg" : variant === "black" ? "text-black" : "text-white";
  const muted = isTheme
    ? "text-muted-foreground"
    : variant === "black"
      ? "text-black/70"
      : "text-white/80";

  return (
    <span className={`relative inline-flex ${glow ? "isolate" : ""}`}>
      {glow && (
        <>
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.12] blur-xl"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 rounded-full border border-white/[0.14] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),rgba(255,255,255,0.045)_42%,transparent_74%)] shadow-[0_0_26px_rgba(255,255,255,0.18)]"
            aria-hidden="true"
          />
        </>
      )}
      <span
        className={`relative inline-flex items-baseline font-display font-extrabold tracking-[-0.05em] ${color} ${className}`}
        aria-label="brandit. home"
      >
        brandit
        <span className={isTheme ? "text-fg" : variant === "black" ? "text-black" : "text-white"}>
          .
        </span>
      </span>
    </span>
  );
}
