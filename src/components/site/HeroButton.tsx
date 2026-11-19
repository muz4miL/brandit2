interface HeroButtonProps {
  href?: string;
  leftText?: string;
  rightText?: string;
  ariaLabel?: string;
  className?: string;
}

export function HeroButton({
  href = "/contact",
  leftText = "Book a",
  rightText = "Growth Audit",
  ariaLabel,
  className = "",
}: HeroButtonProps) {
  const label = ariaLabel || `${leftText} ${rightText}`;

  return (
    <a
      href={href}
      aria-label={label}
      className={`group relative inline-flex h-[64px] sm:h-[72px] w-full max-w-[340px] sm:max-w-[360px] shrink-0 select-none cursor-pointer items-center justify-between rounded-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/20 px-5 sm:px-6 shadow-[0_0_32px_rgba(255,255,255,0.06)] transition-all duration-300 hover:scale-[1.02] hover:border-white/45 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-white ${className}`}
    >
      {/* Subtle outer pulsing hairline glow */}
      <span
        className="pointer-events-none absolute -inset-[2px] animate-hero-border-pulse rounded-full border border-white/30 opacity-70 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Left Text */}
      <span className="whitespace-nowrap font-display text-[15px] sm:text-[17px] font-bold tracking-tight text-white transition-colors duration-300">
        {leftText}
      </span>

      {/* Center Icon Badge */}
      <div className="relative flex items-center justify-center mx-2.5 shrink-0">
        <div className="absolute inset-0 rounded-full bg-white blur-[10px] opacity-25 transition-opacity duration-300 group-hover:opacity-50" />
        <div className="relative grid h-[42px] w-[42px] sm:h-[46px] sm:w-[46px] place-items-center rounded-full bg-white text-black shadow-[0_0_16px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-105">
          <span className="pl-0.5 font-display text-[20px] sm:text-[23px] font-black leading-none text-black">
            b.
          </span>
        </div>
      </div>

      {/* Right Text */}
      <span className="whitespace-nowrap font-display text-[15px] sm:text-[17px] font-bold tracking-tight text-white transition-colors duration-300">
        {rightText}
      </span>
    </a>
  );
}
