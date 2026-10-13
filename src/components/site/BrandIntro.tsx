import { ArrowUpRight } from "lucide-react";

export function BrandIntro() {
  return (
    <section
      id="about"
      aria-label="Welcome to the brandit."
      className="relative w-full overflow-hidden bg-[#000000] rounded-t-[44px] sm:rounded-t-[64px] lg:rounded-t-[88px] py-14 sm:py-18 lg:py-[96px] px-5 sm:px-10 lg:px-12 flex flex-col items-center select-none"
    >
      <div className="mx-auto flex max-w-[1040px] w-full flex-col items-center text-center">
        {/* Main Heading: "Welcome to" + "the brandit." */}
        <div className="flex flex-col items-center">
          <h2 className="text-center font-display text-[34px] sm:text-[46px] lg:text-[clamp(48px,6.2vw,96px)] font-bold lg:font-extrabold tracking-[-0.045em] text-white lg:text-[#D0D0D0] leading-[1.02]">
            Welcome to
          </h2>
          <div
            className="mt-1.5 sm:mt-2.5 lg:mt-3.5 flex items-center justify-center"
            aria-label="the brandit."
          >
            <span className="inline-flex items-baseline font-display font-black tracking-[-0.045em] text-[#F3FF00] text-[40px] sm:text-[52px] lg:text-[clamp(44px,5.8vw,92px)] leading-none select-none drop-shadow-[0_0_35px_rgba(243,255,0,0.22)]">
              the brandit.
            </span>
          </div>
        </div>

        {/* Paragraph 1 */}
        <p className="mt-7 sm:mt-9 lg:mt-10 max-w-[840px] text-center text-[16px] sm:text-[19px] lg:text-[clamp(18px,1.9vw,28px)] font-normal text-[#D2D2D6] lg:text-[#EEEEEE] leading-[1.45] lg:leading-[1.4]">
          You’re here because you’re building something that matters.
          <span className="block mt-1 sm:mt-0 sm:inline">
            {" "}
            A business that wins. A brand that dominates.
          </span>
        </p>

        {/* Paragraph 2 */}
        <p className="mt-4 sm:mt-5 lg:mt-6 max-w-[840px] text-center text-[15px] sm:text-[18px] lg:text-[clamp(18px,1.9vw,28px)] font-normal text-[#A6A6B0] lg:text-[#EEEEEE] leading-[1.45] lg:leading-[1.4]">
          We partner with fast-growing brands to create and scale performance-driven creative
          systems that fuel serious growth.
        </p>

        {/* Reference-Style CTA: "Ready?" [Icon] "Start Now" */}
        <div className="mt-9 sm:mt-12 lg:mt-14 flex justify-center w-full">
          <a
            href="#contact"
            aria-label="Start a project with Brand It"
            className="group relative inline-flex h-[74px] sm:h-[82px] lg:h-[88px] w-full max-w-[330px] sm:max-w-[340px] items-center justify-between rounded-full bg-[#000000] p-[5px] transition-colors duration-200 hover:bg-[#F3FF00] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 select-none"
          >
            {/* Moving / Zooming outer yellow line that breathes in and out continuously */}
            <span
              className="pointer-events-none absolute -inset-[2px] rounded-full border-2 border-[#F3FF00] animate-hero-border-pulse"
              aria-hidden="true"
            />

            {/* Inner subtle charcoal outline inset */}
            <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/20 px-5 sm:px-6 transition-colors duration-200 group-hover:border-[#b8c200]/70">
              {/* Left Text: Ready? */}
              <span className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-white transition-colors duration-200 group-hover:text-black">
                Ready?
              </span>

              {/* Central Yellow Rounded-Square Icon Tile */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-[12px] bg-[#F3FF00] blur-[10px] opacity-50 transition-opacity duration-200 group-hover:opacity-75" />
                <div className="relative grid h-[42px] w-[42px] sm:h-[46px] sm:w-[46px] place-items-center rounded-[12px] bg-[#F3FF00] shadow-[0_0_16px_rgba(243,255,0,0.45)]">
                  <span className="font-display text-[22px] font-black text-black leading-none">
                    b.
                  </span>
                </div>
              </div>

              {/* Right Text: Start Now */}
              <span className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-white transition-colors duration-200 group-hover:text-black">
                Start Now
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
