import { ArrowUpRight } from "lucide-react";
import heroMosaicImg from "@/assets/brandit-hero-mosaic.png";
import partnerLogosImg from "@/assets/PartnerLogos.png";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Hero overview"
      className="relative mx-auto w-full overflow-hidden rounded-[36px] sm:rounded-[44px] md:rounded-[52px] bg-[#000000] border border-white/[0.08] min-h-[580px] lg:h-[calc(100vh-140px)] lg:min-h-[600px] lg:max-h-[710px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[48fr_52fr] h-full">
        {/* Left: Text, CTA & Partner Logos */}
        <div className="rise-in z-10 flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-11 md:px-12 lg:py-10 lg:px-14 xl:px-16 h-full">
          {/* Headline: We / Build / Brands. */}
          <h1 className="select-none text-[clamp(60px,5.8vw,104px)] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#D5D5D5]">
            <span className="block font-display">We</span>
            <span className="block font-serif font-normal italic tracking-[-0.035em] text-[1.07em] leading-[0.88] -ml-1 text-[#D5D5D5]">
              Build
            </span>
            <span className="block font-display">Brands.</span>
          </h1>

          {/* Subtitle description */}
          <p className="mt-4 sm:mt-5 max-w-md text-[16px] sm:text-[18px] text-[#A0A0AA] leading-relaxed">
            Brand identity, social content and advertising.
          </p>

          {/* Button & Partner Logos on the same row (Matching Defiant reference) */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-5 sm:gap-6 lg:gap-7">
            <a
              href="#contact"
              aria-label="Book a discovery call"
              className="group relative inline-flex h-[74px] sm:h-[80px] w-full sm:w-[345px] shrink-0 items-center justify-between rounded-full bg-[#000000] p-[5px] transition-colors duration-200 hover:bg-[#F3FF00] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 select-none"
            >
              {/* Moving / Zooming outer yellow line that breathes in and out continuously */}
              <span
                className="pointer-events-none absolute -inset-[2px] rounded-full border-2 border-[#F3FF00] animate-hero-border-pulse"
                aria-hidden="true"
              />

              {/* Inner subtle charcoal outline inset */}
              <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/20 px-5 sm:px-6 transition-colors duration-200 group-hover:border-[#b8c200]/70">
                {/* Left Text: Book a */}
                <span className="text-[16px] sm:text-[18px] font-medium text-white transition-colors duration-200 group-hover:text-black">
                  Book a
                </span>

                {/* Central Yellow Rounded-Square Icon Tile */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-[14px] bg-[#F3FF00] blur-[10px] opacity-40 transition-opacity duration-200 group-hover:opacity-75" />
                  <div className="relative grid h-[46px] w-[46px] place-items-center rounded-[14px] bg-[#F3FF00] shadow-[0_0_16px_rgba(243,255,0,0.45)]">
                    <ArrowUpRight
                      size={22}
                      className="stroke-[3] text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                {/* Right Text: Discovery Call */}
                <span className="text-[16px] sm:text-[18px] font-medium text-white transition-colors duration-200 group-hover:text-black">
                  Discovery Call
                </span>
              </div>
            </a>

            {/* Partner Logos Image (Matching Defiant Reference) */}
            <div className="flex items-center">
              <img
                src={partnerLogosImg}
                alt="Partner credentials: Meta, Google, Shopify Plus, Klaviyo"
                className="h-[32px] sm:h-[36px] w-auto max-w-[280px] sm:max-w-[320px] object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Right: Seamless Floating Artwork (~52%) */}
        <div className="relative h-[380px] sm:h-[460px] lg:h-full w-full overflow-hidden bg-[#000000]">
          {/* Narrow black gradient overlay at left edge for seamless transition */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-28 bg-gradient-to-r from-[#000000] via-[#000000]/60 to-transparent" />

          {/* Mosaic Artwork Composition */}
          <img
            src={heroMosaicImg}
            alt="Brand It visual showcase"
            className="h-full w-full object-cover object-[72%_center] lg:object-[70%_center] select-none"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
