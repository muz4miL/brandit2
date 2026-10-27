import { ArrowUpRight } from "lucide-react";
import heroMosaicImg from "@/assets/brandit-hero-mosaic.png";
import partnerLogosImg from "@/assets/PartnerLogos.png";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Hero overview"
      className="relative mx-auto w-full overflow-hidden rounded-[36px] sm:rounded-[44px] md:rounded-[52px] bg-[#000000] border border-white/[0.08] min-h-[560px] lg:h-[calc(100vh-140px)] lg:min-h-[600px] lg:max-h-[710px] shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
    >
      {/* ========================================================
          DESKTOP LAYOUT (>= 1024px / lg)
         ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-[48fr_52fr] h-full">
        {/* Left: Text, CTA & Partner Logos */}
        <div className="rise-in z-10 flex flex-col justify-center px-10 py-10 lg:px-14 xl:px-16 h-full">
          {/* Headline: We / Deliver / Growth. (The only H1 on homepage) */}
          <h1 className="select-none text-[clamp(60px,5.8vw,104px)] font-black leading-[0.88] tracking-[-0.055em] text-white">
            <span className="block font-display text-white">We</span>
            <span className="block font-serif font-normal italic tracking-[-0.035em] text-[1.07em] leading-[0.88] -ml-1 text-white/95">
              Deliver
            </span>
            <span className="block font-display text-white">Growth.</span>
          </h1>

          {/* Button & Partner Logos (Exact Inspiration Styling) */}
          <div className="mt-8 lg:mt-10 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <a
                href="/contact"
                aria-label="Book a growth audit"
                className="group relative inline-flex h-[80px] w-[355px] shrink-0 items-center justify-between rounded-full bg-[#000000] p-[5px] transition-all duration-300 border border-[#1E6BFF]/70 shadow-[0_0_32px_rgba(30,107,255,0.4)] hover:shadow-[0_0_46px_rgba(30,107,255,0.65)] hover:border-[#1E6BFF] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 select-none"
              >
                <span
                  className="pointer-events-none absolute -inset-[2px] rounded-full border border-[#1E6BFF]/40 animate-pulse"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/15 px-6 bg-black/50 backdrop-blur-sm transition-colors duration-200 group-hover:border-white/30">
                  <span className="text-[18px] font-medium text-white transition-colors duration-200">
                    Book a
                  </span>

                  <div className="relative flex items-center justify-center">
                    <div className="relative grid h-[46px] w-[46px] place-items-center rounded-[14px] bg-[#1E6BFF] text-white shadow-[0_0_18px_rgba(30,107,255,0.75)] transition-transform duration-200 group-hover:scale-105">
                      <span className="font-display text-[22px] font-black text-white leading-none">
                        b.
                      </span>
                    </div>
                  </div>

                  <span className="text-[18px] font-medium text-white transition-colors duration-200">
                    Growth Audit
                  </span>
                </div>
              </a>
            </div>

            <div className="flex items-center pt-2">
              <img
                src={partnerLogosImg}
                alt="Partner credentials: Meta, Google, Shopify Plus, Klaviyo"
                className="h-[32px] sm:h-[34px] w-auto max-w-[320px] object-contain opacity-85 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Right: Seamless Floating Artwork (~52%) - Deep black background and seamless fade */}
        <div className="relative h-full w-full overflow-hidden bg-[#000000]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 sm:w-36 bg-gradient-to-r from-[#000000] via-[#000000]/75 to-transparent" />
          <img
            src={heroMosaicImg}
            alt="Brand It visual showcase"
            className="h-full w-full object-cover object-[70%_center] select-none"
            loading="eager"
          />
        </div>
      </div>

      {/* ========================================================
          MOBILE & TABLET LAYOUT (< 1024px)
         ======================================================== */}
      <div className="flex lg:hidden flex-col items-center justify-center text-center px-4 py-8 sm:py-10 w-full h-full select-none bg-[#000000]">
        {/* Top Centered Headline */}
        <h1 className="select-none flex flex-col items-center">
          <span className="block font-display text-[44px] sm:text-[54px] font-black leading-[0.88] tracking-[-0.055em] text-white">
            We
          </span>
          <span className="block font-serif font-normal italic tracking-[-0.035em] text-[1.08em] leading-[0.88] text-white/95 -my-1">
            Deliver
          </span>
          <span className="block font-display text-[44px] sm:text-[54px] font-black leading-[0.88] tracking-[-0.055em] text-white">
            Growth.
          </span>
        </h1>

        {/* Center: Brand Squircle with Marquee Logos & Electric Blue Glow */}
        <div className="relative my-7 sm:my-8 flex items-center justify-center w-full max-w-[420px] overflow-hidden">
          <div className="pointer-events-none absolute z-10 h-36 w-36 rounded-full bg-[#1E6BFF]/30 blur-3xl" />

          {/* Marquee Logos flowing behind the central badge */}
          <div className="absolute inset-x-0 z-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
            <div
              className="flex shrink-0 items-center gap-8 py-2 will-change-transform"
              style={{
                animation: "marquee-scroll 24s linear infinite",
              }}
            >
              <img
                src="/Line1-Logos-V2-scaled.png"
                alt=""
                className="h-[26px] w-auto max-w-none opacity-45 shrink-0"
              />
              <img
                src="/Line2-Logos-v3-scaled.png"
                alt=""
                className="h-[24px] w-auto max-w-none opacity-45 shrink-0"
              />
              <img
                src="/Line1-Logos-V2-scaled.png"
                alt=""
                className="h-[26px] w-auto max-w-none opacity-45 shrink-0"
              />
              <img
                src="/Line2-Logos-v3-scaled.png"
                alt=""
                className="h-[24px] w-auto max-w-none opacity-45 shrink-0"
              />
            </div>
          </div>

          {/* Central Brand Squircle */}
          <div className="relative z-20 flex shrink-0 items-center justify-center py-2">
            <div className="absolute -inset-1.5 rounded-[28px] bg-[#1E6BFF] opacity-80 blur-md" />
            <div className="relative grid h-[92px] w-[92px] place-items-center rounded-[26px] bg-[#1E6BFF] shadow-[0_0_40px_rgba(30,107,255,0.55)]">
              <span className="font-display text-[54px] font-black leading-none text-white select-none pl-0.5">
                b.
              </span>
            </div>
          </div>
        </div>

        {/* Pill CTA Button */}
        <div className="w-full flex justify-center">
          <a
            href="/contact"
            aria-label="Book a growth audit"
            className="group relative inline-flex h-[72px] sm:h-[76px] w-full max-w-[340px] items-center justify-between rounded-full bg-[#000000] p-[5px] transition-all duration-200 border border-[#1E6BFF]/70 shadow-[0_0_26px_rgba(30,107,255,0.38)] hover:shadow-[0_0_36px_rgba(30,107,255,0.6)] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 select-none"
          >
            <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/20 px-5 sm:px-6 transition-colors duration-200">
              <span className="text-[16px] sm:text-[17px] font-medium text-white transition-colors duration-200">
                Book a
              </span>

              <div className="relative flex items-center justify-center">
                <div className="relative grid h-[42px] w-[42px] place-items-center rounded-[12px] bg-[#1E6BFF] shadow-[0_0_12px_rgba(30,107,255,0.6)]">
                  <span className="font-display text-[22px] font-black text-white leading-none">
                    b.
                  </span>
                </div>
              </div>

              <span className="text-[16px] sm:text-[17px] font-medium text-white transition-colors duration-200">
                Growth Audit
              </span>
            </div>
          </a>
        </div>

        {/* Partner Logos Strip Centered Below Button */}
        <div className="mt-5 flex items-center justify-center">
          <img
            src={partnerLogosImg}
            alt="Meta, Google, Shopify Plus, Klaviyo Partners"
            className="h-[28px] sm:h-[32px] w-auto max-w-[270px] sm:max-w-[300px] object-contain opacity-85"
          />
        </div>
      </div>
    </section>
  );
}
