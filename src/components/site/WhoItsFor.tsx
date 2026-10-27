export function WhoItsFor() {
  const segments = [
    {
      title: "Real Estate — Brokerages & Developers",
      body: "Sales content, luxury positioning, off-plan launches, and data-led authority. Our deepest expertise, built inside the UAE’s largest brokerage.",
      number: "01",
    },
    {
      title: "Clinics, Salons & Local Business",
      body: "Aesthetic clinics, dental, beauty, retail. Premium visuals plus lead-gen funnels that fill your calendar instead of your inbox.",
      number: "02",
    },
    {
      title: "E-commerce & Retail Brands",
      body: "Shopify stores, product photography, and paid campaigns built around margin — so growth in revenue is growth in profit.",
      number: "03",
    },
    {
      title: "Founders & Personal Brands",
      body: "CEOs, agents, and creators who need authority. We built the system behind a six-figure founder brand. We’ll build yours.",
      number: "04",
    },
  ];

  return (
    <section
      aria-label="Who This Is Built For"
      className="relative w-full overflow-hidden bg-[#09090D] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 border-t border-b border-white/[0.08] select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Eyebrow and Heading */}
        <div className="max-w-[700px]">
          <div className="inline-flex h-[36px] items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4">
            <span className="font-display text-[12px] font-semibold tracking-[0.16em] text-[#A1A1AA] uppercase">
              Who We Serve
            </span>
          </div>

          <h2 className="mt-4 font-display text-[32px] sm:text-[44px] lg:text-[54px] font-extrabold leading-[1.02] tracking-tight text-white">
            Who this is{" "}
            <span className="font-serif italic font-normal text-[#F4F4F5]">
              Built for
            </span>
          </h2>
        </div>

        {/* 4 Category Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="group relative flex flex-col justify-between rounded-[26px] border border-white/[0.08] bg-[#121217] p-7 sm:p-9 shadow-sm transition-all duration-200 hover:border-[#1E6BFF]/50 hover:shadow-2xl"
            >
              <div>
                <span className="font-display text-xs font-bold text-[#1E6BFF] uppercase tracking-widest">
                  {seg.number}
                </span>
                <h3 className="mt-3 font-display text-[21px] sm:text-[23px] font-bold text-white">
                  {seg.title}
                </h3>
                <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[#A1A1AA]">
                  {seg.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
