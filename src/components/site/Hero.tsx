import { ArrowUpRight } from "lucide-react";
import { HeroButton } from "./HeroButton";
import { getPublicPartnerLogos } from "@/server/partner-logo-service";
import { PartnerStrip } from "./PartnerStrip";

export async function Hero() {
  const { logos, settings } = await getPublicPartnerLogos();

  return (
    <section
      id="top"
      aria-label="Hero overview"
      className="relative mx-auto flex min-h-[560px] w-full flex-col overflow-hidden rounded-[36px] border border-line bg-panel text-fg shadow-2xl sm:rounded-[44px] md:rounded-[52px] lg:h-[calc(100vh-140px)] lg:min-h-[580px] lg:max-h-[720px]"
    >
      {/* ========================================================
          DESKTOP LAYOUT (>= 1024px / lg) - CLEAN MINIMAL BLUE
         ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-[48fr_52fr] h-full flex-1 w-full">
        {/* Left: Text, CTA & Partner Logos */}
        <div className="rise-in z-10 flex flex-col justify-center px-10 py-10 lg:px-14 xl:px-16 h-full">
          {/* Headline: We Engineer Growth. */}
          <h1 className="select-none text-[clamp(64px,6.8vw,118px)] font-extrabold leading-[0.88] tracking-[-0.055em] text-fg">
            <span className="block font-display">We</span>
            <span className="-ml-1 block font-instrument text-[1.14em] font-normal italic leading-[0.88] tracking-[-0.03em] text-fg">
              Engineer
            </span>
            <span className="block font-display">Growth.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 max-w-[480px] text-[15px] sm:text-[16px] font-normal leading-relaxed text-muted-foreground">
            brandit. is a full-service marketing agency — paid ads, content production, branding, websites, and automation. Forged in the UAE. Delivered worldwide.
          </p>

          {/* Button & Partner Logos on the same row directly below headline */}
          <div className="mt-9 flex flex-wrap items-center gap-6 lg:gap-7">
            <HeroButton
              href="/contact"
              leftText="Book a"
              rightText="Discovery Call"
              ariaLabel="Book a Discovery Call"
            />

            <div className="flex items-center">
              <PartnerStrip logos={logos} settings={settings} align="left" />
            </div>
          </div>

          {/* Secondary link */}
          <a href="#our-work" className="text-[14px] font-medium text-fg/60 hover:text-fg transition-colors flex items-center gap-1.5 mt-1">
            See Our Work <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Right: Seamless Floating Artwork (~52%) */}
        <div className="relative h-full w-full overflow-hidden bg-panel">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#000000] via-[#000000]/60 to-transparent" />
          <img
            src="/flatinghero.png"
            alt="brandit. digital creative agency visual showcase"
            title="brandit. Visual Showcase"
            className="h-full w-full object-cover object-[70%_center] select-none"
            loading="eager"
          />
        </div>
      </div>

      {/* ========================================================
          MOBILE & TABLET LAYOUT (< 1024px)
         ======================================================== */}
      <div className="flex lg:hidden flex-col items-center justify-center text-center px-4 py-8 sm:py-10 w-full flex-1 min-h-[560px] select-none">
        <div className="my-auto flex flex-col items-center justify-center w-full">
          {/* Top Centered Headline */}
          <h1 className="select-none flex flex-col items-center">
            <span className="block font-display text-[46px] font-extrabold leading-[0.88] tracking-[-0.055em] text-fg sm:text-[56px]">
              We
            </span>
            <span className="-my-1 block font-instrument text-[1.14em] font-normal italic leading-[0.88] tracking-[-0.03em] text-fg">
              Engineer
            </span>
            <span className="block font-display text-[46px] font-extrabold leading-[0.88] tracking-[-0.055em] text-fg sm:text-[56px]">
              Growth.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 max-w-[480px] text-[15px] sm:text-[16px] font-normal leading-relaxed text-muted-foreground text-center px-2">
            brandit. is a full-service marketing agency — paid ads, content production, branding, websites, and automation. Forged in the UAE. Delivered worldwide.
          </p>

          {/* Center: Glowing Brand Squircle with Real Marquee Logos Gliding Horizontally */}
          <div className="relative my-7 sm:my-8 flex items-center justify-center w-full max-w-[420px] overflow-hidden">
            {/* Subtle ambient monochrome glow blur */}
            <div className="pointer-events-none absolute z-10 h-36 w-36 rounded-full bg-white/[0.08] blur-3xl" />

            {/* Real Marquee Logos flowing behind the central badge */}
            <div className="absolute inset-x-0 z-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
              <div
                className="flex shrink-0 items-center gap-8 py-2 will-change-transform"
                style={{
                  animation: "marquee-scroll 24s linear infinite",
                }}
              >
                <img
                  src="/Line1-Logos-V2-scaled.png"
                  alt="brandit partner brand logos line 1"
                  title="Partner Logos"
                  className="h-[26px] w-auto max-w-none opacity-45 shrink-0"
                />
                <img
                  src="/Line2-Logos-v3-scaled.png"
                  alt="brandit partner brand logos line 2"
                  title="Partner Logos"
                  className="h-[24px] w-auto max-w-none opacity-45 shrink-0"
                />
                <img
                  src="/Line1-Logos-V2-scaled.png"
                  alt="brandit partner brand logos line 1 repeated"
                  title="Partner Logos"
                  className="h-[26px] w-auto max-w-none opacity-45 shrink-0"
                />
                <img
                  src="/Line2-Logos-v3-scaled.png"
                  alt="brandit partner brand logos line 2 repeated"
                  title="Partner Logos"
                  className="h-[24px] w-auto max-w-none opacity-45 shrink-0"
                />
              </div>
            </div>

            {/* Central Glowing Brand Squircle in Pure White & Obsidian */}
            <div className="relative z-20 flex shrink-0 items-center justify-center py-2">
              <div className="hero-brand-badge-glow absolute -inset-1.5 rounded-[28px] bg-white/20 opacity-80 blur-md" />
              <div className="hero-brand-badge relative grid h-[92px] w-[92px] place-items-center rounded-[26px] bg-white shadow-[0_0_40px_rgba(255,255,255,0.25)]">
                <span className="font-display text-[54px] font-black leading-none text-black select-none pl-0.5">
                  b.
                </span>
              </div>
            </div>
          </div>

          {/* Pill CTA Button with Glowing Outer Border */}
          <div className="w-full flex justify-center">
            <HeroButton
              href="/contact"
              leftText="Book a"
              rightText="Discovery Call"
              ariaLabel="Book a Discovery Call"
            />
          </div>

          {/* Partner Logos Strip Centered Below Button */}
          <div className="mt-5 flex items-center justify-center">
            <PartnerStrip logos={logos} settings={settings} align="center" isMobile />
          </div>
        </div>
      </div>
    </section>
  );
}
