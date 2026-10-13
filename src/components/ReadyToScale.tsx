export default function ReadyToScale() {
  const handleScrollToBooking = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "mailto:hello@thebrandit.com?subject=Project%20Discovery";
    }
  };

  return (
    <section
      id="ready-to-scale"
      aria-label="Ready to scale"
      className="relative w-full overflow-x-hidden bg-[#000000] pt-16 pb-16 px-4 md:pt-32 md:pb-24 md:px-8 select-none"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
        {/* Small centered eyebrow */}
        <span className="mb-6 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 md:mb-8 md:text-[11px]">
          YOU MADE IT THIS FAR
        </span>

        {/* Main headline: bold grotesque sans + Instrument Serif italic */}
        <h2 className="flex flex-wrap items-center justify-center text-center font-display text-[clamp(52px,7.5vw,100px)] font-bold tracking-[-0.04em] text-[#d4d4d4] leading-[0.95]">
          <span>Ready to&nbsp;</span>
          <span className="font-serif font-normal italic tracking-[-0.03em] text-[#e5e5e5]">
            Scale?
          </span>
        </h2>

        {/* Supporting text */}
        <p className="mx-auto mt-6 max-w-[560px] text-center font-sans text-[17px] font-normal leading-[1.5] text-white/75 md:mt-8 md:text-[20px]">
          Whether you're starting from scratch or ready to scale, let's build something remarkable
          together.
        </p>

        {/* Main conversion banner */}
        <div
          onClick={handleScrollToBooking}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleScrollToBooking();
            }
          }}
          className="group relative mt-14 w-full max-w-[1360px] cursor-pointer overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0c0c0e] shadow-[0_30px_90px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 md:mt-20 md:rounded-[28px]"
        >
          {/* Banner Graphic */}
          <div className="relative aspect-[1983/793] w-full min-h-[240px] md:min-h-[420px]">
            <img
              src="/Brandit_ Ideas.png"
              alt="Brand It - Ready to Scale banner"
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
