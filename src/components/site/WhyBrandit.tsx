import { ArrowUpRight } from "lucide-react";

export function WhyBrandit() {
  const brandPillars = [
    {
      channel: "Efficient Spend",
      desc: "Campaigns structured so your budget goes to what actually converts. Consistently strong cost-per-result across markets and industries.",
      number: "01",
    },
    {
      channel: "Qualified Leads",
      desc: "Not just clicks. Real conversations and booked customers, from targeting and creative built around how you actually sell.",
      number: "02",
    },
    {
      channel: "Compounding Growth",
      desc: "Systems that sharpen every month through testing and sales feedback, so results build instead of resetting.",
      number: "03",
    },
  ];

  return (
    <section
      id="belief"
      aria-label="What We Believe & Where Your Brand Shows Up"
      className="relative w-full overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 select-none border-b border-black/[0.06]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Part 1: What We Believe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex h-[36px] items-center justify-center rounded-full border border-black/10 bg-black/[0.04] px-4">
              <span className="font-display text-[12px] font-semibold tracking-[0.16em] text-[#3F3F46] uppercase">
                The Difference
              </span>
            </div>

            <h2 className="mt-4 font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.02] tracking-tight text-[#09090B]">
              Why work with{" "}
              <span className="font-instrument italic font-normal text-[#18181B]">
                brandit.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center pt-2">
            <p className="text-[17px] sm:text-[19px] lg:text-[20px] leading-relaxed text-[#3F3F46] font-medium">
              Anyone can show up everywhere. The hard part is showing up in the right places, with the right message, for a reason you can explain.
            </p>
            <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-[#71717A]">
              That’s the work we do. <strong className="font-semibold text-[#09090B]">brandit.</strong> is a digital creative agency that makes your brand impossible to miss and easy to choose.
            </p>
          </div>
        </div>

        {/* Part 2: Where Your Brand Shows Up */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-black/[0.08]">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {brandPillars.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-[26px] border border-black/[0.08] bg-[#FAFAFA] p-7 transition-all duration-200 hover:border-black/25 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-neutral-400 uppercase tracking-widest">
                      {item.number}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-black/60" />
                  </div>
                  <h4 className="mt-4 font-display text-[21px] font-bold text-[#09090B]">
                    {item.channel}
                  </h4>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#52525B]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
