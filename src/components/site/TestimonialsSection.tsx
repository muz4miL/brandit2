export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Brand It transformed our content workflow into a predictable revenue generator. The systems Umar built are unmatched.",
      clientName: "Executive Leadership",
      clientTitle: "Managing Director",
      companyName: "Enterprise Brokerage",
    },
    {
      quote: "Our qualified clinic leads tripled in the first 60 days while our cost-per-acquisition dropped by 42%.",
      clientName: "Clinic Founder",
      clientTitle: "Medical Director",
      companyName: "Aesthetic Healthcare Group",
    },
    {
      quote: "Fast, surgical execution. Having Umar as senior strategist with a specialized team made all the difference.",
      clientName: "Brand Founder",
      clientTitle: "CEO",
      companyName: "E-Commerce Brand",
    },
  ];

  return (
    <section
      aria-label="Hear from Clients"
      className="relative w-full overflow-hidden bg-[#000000] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[700px]">
          <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.02] tracking-tight text-white">
            Hear from{" "}
            <span className="font-serif italic font-normal text-[#F4F4F5]">
              Clients
            </span>
          </h2>
        </div>

        {/* 3 Placeholder Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-[26px] border border-white/[0.08] bg-[#0F0F14] p-7 sm:p-8 transition-all duration-200 hover:border-[#1E6BFF]/50 hover:shadow-2xl"
            >
              <div>
                <p className="font-serif text-[18px] sm:text-[19px] italic leading-relaxed text-white/90">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <h3 className="font-display text-[16px] font-bold text-white">
                    {t.clientName}
                  </h3>
                  <p className="text-[13px] text-[#A1A1AA]">
                    {t.clientTitle}
                  </p>
                </div>
                <div className="rounded-lg bg-white/[0.06] border border-white/[0.08] px-2.5 py-1 text-[11px] font-medium text-neutral-300">
                  {t.companyName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
