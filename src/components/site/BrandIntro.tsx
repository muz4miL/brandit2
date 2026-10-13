import { ArrowUpRight } from "lucide-react";

export function BrandIntro() {
  return (
    <section
      aria-label="Welcome to the brandit."
      className="relative w-full overflow-hidden bg-[#000000] rounded-t-[64px] sm:rounded-t-[76px] lg:rounded-t-[88px] py-20 lg:py-[96px] px-6 sm:px-10 lg:px-12 flex flex-col items-center select-none"
    >
      <div className="mx-auto flex max-w-[1040px] w-full flex-col items-center text-center">
        {/* Main Heading: "Welcome to" + "the brandit." wordmark */}
        <div className="flex flex-col items-center">
          <h2 className="text-center font-display text-[clamp(48px,6.2vw,96px)] font-extrabold tracking-[-0.055em] text-[#D0D0D0] leading-[0.98]">
            Welcome to
          </h2>
          <div
            className="mt-2.5 sm:mt-3.5 flex items-center justify-center"
            aria-label="the brandit."
          >
            <span className="inline-flex items-baseline font-display font-extrabold tracking-[-0.05em] text-[#F3FF00] text-[clamp(44px,5.8vw,92px)] leading-none select-none drop-shadow-[0_0_35px_rgba(243,255,0,0.18)]">
              <span className="mr-2 sm:mr-3 font-serif text-[0.9em] font-normal italic tracking-normal text-[#F3FF00]">
                the
              </span>
              brandit.
            </span>
          </div>
        </div>

        {/* Paragraph 1 */}
        <p className="mt-9 sm:mt-10 max-w-[920px] text-center text-[clamp(18px,1.9vw,28px)] font-normal text-[#EEEEEE] leading-[1.4]">
          Your business has something worth showing.{" "}
          <span className="sm:inline block">Let’s make sure people see it.</span>
        </p>

        {/* Paragraph 2 */}
        <p className="mt-5 sm:mt-6 max-w-[920px] text-center text-[clamp(18px,1.9vw,28px)] font-normal text-[#EEEEEE] leading-[1.4]">
          From logos and brand identities to social content and ad campaigns,{" "}
          <span className="sm:inline block">we bring your brand together.</span>
        </p>

        {/* Prominent Reference-Style CTA: "Ready?" [Icon] "Let's Talk" */}
        <div className="mt-12 sm:mt-14 flex justify-center w-full">
          <a
            href="#contact"
            aria-label="Start a project with Brand It"
            className="group relative inline-flex h-[82px] sm:h-[88px] w-full max-w-[340px] items-center justify-between rounded-full bg-[#000000] p-[5px] transition-colors duration-200 hover:bg-[#F3FF00] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 select-none"
          >
            {/* Moving / Zooming outer yellow line that breathes in and out continuously */}
            <span
              className="pointer-events-none absolute -inset-[2px] rounded-full border-2 border-[#F3FF00] animate-hero-border-pulse"
              aria-hidden="true"
            />

            {/* Inner subtle charcoal outline inset */}
            <div className="relative z-10 flex h-full w-full items-center justify-between rounded-full border border-white/20 px-5 sm:px-6 transition-colors duration-200 group-hover:border-[#b8c200]/70">
              {/* Left Text: Ready? */}
              <span className="text-[17px] sm:text-[18px] font-medium text-white transition-colors duration-200 group-hover:text-black">
                Ready?
              </span>

              {/* Central Yellow Rounded-Square Icon Tile */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-[12px] bg-[#F3FF00] blur-[10px] opacity-40 transition-opacity duration-200 group-hover:opacity-75" />
                <div className="relative grid h-[44px] w-[44px] sm:h-[46px] sm:w-[46px] place-items-center rounded-[12px] bg-[#F3FF00] shadow-[0_0_16px_rgba(243,255,0,0.45)]">
                  <ArrowUpRight
                    size={22}
                    className="stroke-[3] text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>

              {/* Right Text: Let’s Talk */}
              <span className="text-[17px] sm:text-[18px] font-medium text-white transition-colors duration-200 group-hover:text-black">
                Let’s Talk
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
