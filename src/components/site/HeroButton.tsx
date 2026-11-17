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
      className={`group relative inline-flex h-[68px] w-full max-w-[345px] shrink-0 select-none cursor-pointer items-center justify-between rounded-full bg-primary p-[5px] text-primary-foreground shadow-[0_0_28px_rgba(255,255,255,0.12)] transition-all duration-300 hover:scale-[1.02] hover:bg-surface hover:text-fg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-fg focus-visible:outline-offset-4 sm:h-[74px] ${className}`}
    >
      <span
        className="pointer-events-none absolute -inset-[2px] animate-hero-border-pulse rounded-full border-2 border-primary/40"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/20 px-5 sm:px-6 transition-colors duration-300 group-hover:border-transparent">
        <span className="whitespace-nowrap text-[15px] font-bold text-primary-foreground transition-colors duration-300 group-hover:text-fg sm:text-[17px]">
          {leftText}
        </span>
        <div className="relative flex items-center justify-center mx-2 shrink-0">
          <div className="absolute inset-0 rounded-[12px] bg-white blur-[8px] opacity-20 transition-opacity duration-300 group-hover:opacity-40" />
          <div className="relative grid h-[42px] w-[42px] place-items-center rounded-[12px] bg-surface shadow-[0_0_14px_rgba(255,255,255,0.3)] transition-colors group-hover:bg-primary sm:h-[46px] sm:w-[46px]">
            <span className="pl-0.5 font-display text-[21px] font-black leading-none text-fg group-hover:text-primary-foreground sm:text-[24px]">
              b.
            </span>
          </div>
        </div>
        <span className="whitespace-nowrap text-[15px] font-bold text-primary-foreground transition-colors duration-300 group-hover:text-fg sm:text-[17px]">
          {rightText}
        </span>
      </div>
    </a>
  );
}
