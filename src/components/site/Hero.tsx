import { ArrowUpRight } from "lucide-react";
import heroMosaicImg from "@/assets/brandit-hero-mosaic.png";
import partnerLogosImg from "@/assets/PartnerLogos.png";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Hero overview"
      className="relative mx-auto w-full overflow-hidden rounded-[36px] sm:rounded-[44px] md:rounded-[52px] bg-white border border-black/[0.08] min-h-[560px] lg:h-[calc(100vh-140px)] lg:min-h-[600px] lg:max-h-[710px] shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
    >
      {/* ========================================================
          DESKTOP LAYOUT (>= 1024px / lg)
         ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-[48fr_52fr] h-full">
        {/* Left: Text, CTA & Partner Logos */}
        <div className="rise-in z-10 flex flex-col justify-center px-10 py-10 lg:px-14 xl:px-16 h-full">
          {/* Headline: We / Engineer / Growth. (The only H1 on homepage) */}
          <h1 className="select-none text-[clamp(54px,5.4vw,98px)] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#09090B]">
            <span className="block font-display">We</span>
            <span className="block font-serif font-normal italic tracking-[-0.035em] text-[1.07em] leading-[0.88] -ml-1 text-[#18181B]">
              Engineer
            </span>
            <span className="block font-display">Growth.</span>
          </h1>

          {/* Subtitle description from brief */}
          <p className="mt-5 max-w-lg text-[17px] text-[#52525B] leading-relaxed">
            brandit. is a full-service marketing agency — paid ads, content production, branding, websites, and automation. Forged in the UAE. Delivered worldwide.
          </p>

          {/* Button, Secondary Link & Partner Logos */}
          <div className="mt-8 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <a
                href="/contact"
                aria-label="Book a discovery call"
                className="group relative inline-flex h-[76px] w-[320px] shrink-0 items-center justify-between rounded-full bg-black p-[5px] transition-all duration-200 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 select-none"
              >
                <span
                  className="pointer-events-none absolute -inset-[2px] rounded-full border-2 border-black/30 animate-hero-border-pulse"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/20 px-6 transition-colors duration-200 group-hover:border-white/40">
                  <span className="text-[17px] font-medium text-white transition-colors duration-200">
                    Book a
                  </span>

                  <div className="relative flex items-center justify-center">
                    <div className="relative grid h-[44px] w-[44px] place-items-center rounded-[14px] bg-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                      <ArrowUpRight
                        size={20}
                        className="stroke-[3] text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>

                  <span className="text-[17px] font-medium text-white transition-colors duration-200">
                    Discovery Call
                  </span>
                </div>
              </a>

              {/* Secondary link from brief: See Our Work → */}
              <a
                href="#work"
                className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#09090B] hover:text-black underline-offset-4 hover:underline py-2 px-3 transition-colors"
              >
                <span>See Our Work</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="flex items-center pt-2">
              <img
                src={partnerLogosImg}
                alt="Partner credentials: Meta, Google, Shopify Plus, Klaviyo"
                className="h-[32px] w-auto max-w-[300px] object-contain opacity-85 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Right: Seamless Floating Artwork (~52%) - Kept in full original colour */}
        <div className="relative h-full w-full overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white via-white/60 to-transparent" />
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
      <div className="flex lg:hidden flex-col items-center justify-center text-center px-4 py-8 sm:py-10 w-full h-full select-none">
        {/* Top Centered Headline */}
        <h1 className="select-none flex flex-col items-center">
          <span className="block font-display text-[40px] sm:text-[50px] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#09090B]">
            We
          </span>
          <span className="block font-serif font-normal italic tracking-[-0.035em] text-[1.08em] leading-[0.88] text-[#18181B] -my-1">
            Engineer
          </span>
          <span className="block font-display text-[40px] sm:text-[50px] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#09090B]">
            Growth.
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="mt-3.5 text-center text-[14px] sm:text-[16px] text-[#52525B] max-w-[320px] leading-relaxed">
          brandit. is a full-service marketing agency — paid ads, content production, branding, websites, and automation. Forged in the UAE. Delivered worldwide.
        </p>

        {/* Center: Brand Squircle with Marquee Logos */}
        <div className="relative my-7 sm:my-8 flex items-center justify-center w-full max-w-[420px] overflow-hidden">
          <div className="pointer-events-none absolute z-10 h-36 w-36 rounded-full bg-black/5 blur-3xl" />

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
                className="h-[26px] w-auto max-w-none opacity-40 shrink-0"
              />
              <img
                src="/Line2-Logos-v3-scaled.png"
                alt=""
                className="h-[24px] w-auto max-w-none opacity-40 shrink-0"
              />
              <img
                src="/Line1-Logos-V2-scaled.png"
                alt=""
                className="h-[26px] w-auto max-w-none opacity-40 shrink-0"
              />
              <img
                src="/Line2-Logos-v3-scaled.png"
                alt=""
                className="h-[24px] w-auto max-w-none opacity-40 shrink-0"
              />
            </div>
          </div>

          {/* Central Brand Squircle */}
          <div className="relative z-20 flex shrink-0 items-center justify-center py-2">
            <div className="relative grid h-[92px] w-[92px] place-items-center rounded-[26px] bg-black shadow-lg">
              <span className="font-display text-[54px] font-black leading-none text-white select-none pl-0.5">
                b.
              </span>
            </div>
          </div>
        </div>

        {/* Pill CTA Button */}
        <div className="w-full flex justify-center">
          <a
            href="#contact"
            aria-label="Book a discovery call"
            className="group relative inline-flex h-[72px] sm:h-[76px] w-full max-w-[340px] items-center justify-between rounded-full bg-black p-[5px] transition-colors duration-200 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 select-none"
          >
            <span
              className="pointer-events-none absolute -inset-[2px] rounded-full border-2 border-black/30 animate-hero-border-pulse"
              aria-hidden="true"
            />

            <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/20 px-5 sm:px-6 transition-colors duration-200">
              <span className="text-[16px] sm:text-[17px] font-medium text-white transition-colors duration-200">
                Book a
              </span>

              <div className="relative flex items-center justify-center">
                <div className="relative grid h-[42px] w-[42px] place-items-center rounded-[12px] bg-white shadow-sm">
                  <span className="font-display text-[22px] font-black text-black leading-none">
                    b.
                  </span>
                </div>
              </div>

              <span className="text-[16px] sm:text-[17px] font-medium text-white transition-colors duration-200">
                Discovery Call
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
