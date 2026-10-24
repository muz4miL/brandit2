export function WhyBrandit() {
  const pillars = [
    {
      title: "Efficient Spend",
      body: "Campaigns structured so your budget goes to what actually converts. Consistently strong cost-per-result across markets and industries.",
    },
    {
      title: "Qualified Leads",
      body: "Not just clicks. Real conversations and booked customers, from targeting and creative built around how you actually sell.",
    },
    {
      title: "Compounding Growth",
      body: "Systems that sharpen every month through testing and sales feedback, so results build instead of resetting.",
    },
  ];

  return (
    <section
      aria-label="Why Work With Brandit"
      className="relative w-full overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[700px]">
          <div className="inline-flex h-[36px] items-center justify-center rounded-full border border-black/10 bg-black/[0.04] px-4">
            <span className="font-display text-[12px] font-semibold tracking-[0.16em] text-[#3F3F46] uppercase">
              The Difference
            </span>
          </div>

          <h2 className="mt-4 font-display text-[32px] sm:text-[44px] lg:text-[54px] font-extrabold leading-[1.02] tracking-tight text-[#09090B]">
            Why work with{" "}
            <span className="font-serif italic font-normal text-[#18181B]">
              brandit.
            </span>
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-[26px] border border-black/[0.08] bg-[#FAFAFA] p-7 sm:p-8 transition-all duration-200 hover:border-black/25 hover:shadow-md"
            >
              <h3 className="font-display text-[21px] font-bold text-[#09090B]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#52525B]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
