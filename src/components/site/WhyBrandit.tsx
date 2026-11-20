import { SectionBadge } from "./SectionBadge";

export function WhyBrandit() {
  const brandPillars = [
    {
      number: "01",
      serif: "Efficient",
      sans: "Spend",
      desc: "Campaigns structured so your budget goes to what actually converts. Consistently strong cost-per-result across markets and industries.",
    },
    {
      number: "02",
      serif: "Qualified",
      sans: "Leads",
      desc: "Not just clicks. Real conversations and booked customers, from targeting and creative built around how you actually sell.",
    },
    {
      number: "03",
      serif: "Compounding",
      sans: "Growth",
      desc: "Systems that sharpen every month through testing and sales feedback, so results build instead of resetting.",
    },
  ];

  return (
    <section
      id="belief"
      aria-label="What We Believe & Where Your Brand Shows Up"
      className="relative w-full overflow-hidden bg-[#060608] pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 lg:pb-32 select-none border-b border-white/[0.08]"
    >
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[140px]"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Part 1: Top Statement matching Defiant's Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <SectionBadge>THE DIFFERENCE</SectionBadge>

            <h2 className="mt-5 font-display text-[clamp(36px,5vw,62px)] font-extrabold leading-[1.0] tracking-[-0.035em] text-white">
              Why work with{" "}
              <span className="font-instrument italic font-normal text-white">
                brandit.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center pt-2 lg:pt-4">
            <p className="text-[18px] sm:text-[21px] lg:text-[23px] leading-[1.5] text-white/90 font-medium tracking-tight">
              Anyone can show up everywhere. The hard part is showing up in the right places, with the right message, for a reason you can explain.
            </p>
            <p className="mt-4 text-[15px] sm:text-[17px] leading-relaxed text-[#A1A1AA]">
              That’s the work we do. <strong className="font-semibold text-white">brandit.</strong> is a digital creative agency that makes your brand impossible to miss and easy to choose.
            </p>
          </div>
        </div>

        {/* Part 2: 3 Cards Grid with Defiant-style typography & shiny silver hover */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {brandPillars.map((item) => (
              <div
                key={item.number}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/[0.09] bg-[#0C0C10] p-8 sm:p-10 transition-all duration-500 hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(255,255,255,0.1)]"
              >
                {/* Silver specular sheen on top border */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Silver metallic ambient light layer on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-[28px] sm:rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent"
                />

                {/* Silver subtle radial spotlight in top right */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-white/[0.05] blur-2xl group-hover:scale-150 transition-transform duration-700"
                />

                <div className="relative z-10 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Top row with number and luminous dot */}
                    <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                      <span className="font-mono text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
                        {item.number}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-white/40 group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300" />
                    </div>

                    {/* Heading: Italic Calligraphic Accent + Sans Bold */}
                    <div className="mt-8 flex flex-col">
                      <span className="font-instrument text-[36px] sm:text-[42px] italic font-normal leading-[0.98] text-white">
                        {item.serif}
                      </span>
                      <span className="font-display text-[26px] sm:text-[30px] font-extrabold leading-[1.05] tracking-tight text-white mt-1">
                        {item.sans}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-[#A1A1AA]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
