export default function TrustedBy() {
  return (
    <section
      aria-label="Trusted by brands"
      className="relative w-full overflow-x-hidden bg-[#000000] py-16 md:py-24 select-none"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4 text-center">
        {/* Pill badge at top */}
        <div className="inline-flex h-10 items-center justify-center rounded-full border border-white/[0.08] bg-gradient-to-b from-[#1a1a1a] to-[#050505] px-6 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] md:h-[54px] md:w-[336px] md:px-0">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 md:text-[11px]">
            A GROWTH PARTNER
          </span>
        </div>

        {/* Heading: two tightly stacked lines */}
        <h2 className="mt-12 flex flex-col items-center text-center md:mt-16">
          <span className="font-display text-[clamp(44px,7vw,96px)] font-bold tracking-[-0.04em] text-[#d4d4d4] leading-[0.95]">
            Trusted by
          </span>
          <span className="font-serif text-[clamp(48px,7.5vw,104px)] font-normal italic tracking-[-0.03em] text-[#e5e5e5] leading-[0.95]">
            300+ Leading Brands
          </span>
        </h2>
      </div>

      {/* Logo marquee block: 3 full-width rows with fade mask */}
      <div className="mt-16 flex w-full flex-col gap-7 md:mt-24 md:gap-10">
        {/* Row 1: scrolls LEFT, duration 45s (34s mobile) */}
        <div className="trusted-row relative w-full overflow-hidden trusted-marquee-mask">
          <div className="trusted-track trusted-track-row1 flex w-max will-change-transform">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
              {Array.from({ length: 3 }).map((_, i) => (
                <img
                  key={`r1-${i}`}
                  src="/Line1-Logos-V2-scaled.png"
                  alt="Trusted brand logos row 1"
                  width={2560}
                  height={78}
                  loading="lazy"
                  draggable={false}
                  className="trusted-logo h-[30px] w-auto shrink-0 max-w-none object-contain md:h-[40px]"
                />
              ))}
            </div>
            {/* Set 2 (Identical duplicate for seamless infinite loop) */}
            <div
              className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
              aria-hidden="true"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <img
                  key={`r1-dup-${i}`}
                  src="/Line1-Logos-V2-scaled.png"
                  alt=""
                  width={2560}
                  height={78}
                  loading="lazy"
                  draggable={false}
                  className="trusted-logo h-[30px] w-auto shrink-0 max-w-none object-contain md:h-[40px]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: scrolls RIGHT, duration 60s (45s mobile) */}
        <div className="trusted-row relative w-full overflow-hidden trusted-marquee-mask">
          <div className="trusted-track trusted-track-row2 flex w-max will-change-transform">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <img
                  key={`r2-${i}`}
                  src="/Line2-Logos-v3-scaled.png"
                  alt="Trusted brand logos row 2"
                  width={2560}
                  height={130}
                  loading="lazy"
                  draggable={false}
                  className="trusted-logo h-[22px] w-auto shrink-0 max-w-none object-contain md:h-[30px]"
                />
              ))}
            </div>
            {/* Set 2 (Identical duplicate for seamless infinite loop) */}
            <div
              className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
              aria-hidden="true"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <img
                  key={`r2-dup-${i}`}
                  src="/Line2-Logos-v3-scaled.png"
                  alt=""
                  width={2560}
                  height={130}
                  loading="lazy"
                  draggable={false}
                  className="trusted-logo h-[22px] w-auto shrink-0 max-w-none object-contain md:h-[30px]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: scrolls LEFT, duration 50s (38s mobile) */}
        <div className="trusted-row relative w-full overflow-hidden trusted-marquee-mask">
          <div className="trusted-track trusted-track-row3 flex w-max will-change-transform">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={`r3-${i}`}
                  src="/Line3-Logos-v2-scaled.png"
                  alt="Trusted brand logos row 3"
                  width={2560}
                  height={135}
                  loading="lazy"
                  draggable={false}
                  className="trusted-logo h-[28px] w-auto shrink-0 max-w-none object-contain md:h-[38px]"
                />
              ))}
            </div>
            {/* Set 2 (Identical duplicate for seamless infinite loop) */}
            <div
              className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={`r3-dup-${i}`}
                  src="/Line3-Logos-v2-scaled.png"
                  alt=""
                  width={2560}
                  height={135}
                  loading="lazy"
                  draggable={false}
                  className="trusted-logo h-[28px] w-auto shrink-0 max-w-none object-contain md:h-[38px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
