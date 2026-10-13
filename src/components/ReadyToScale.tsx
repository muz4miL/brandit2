export default function ReadyToScale() {
  const handleScrollToBooking = () => {
    window.location.href = "mailto:hello@thebrandit.com?subject=Project%20Discovery";
  };

  return (
    <section
      id="ready-to-scale"
      aria-label="Ready to scale"
      className="relative w-full overflow-x-hidden bg-[#000000] pt-12 pb-16 px-4 md:pt-20 md:pb-24 md:px-8 select-none"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
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
          className="group relative w-full max-w-[1360px] cursor-pointer overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0c0c0e] shadow-[0_30px_90px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 md:rounded-[28px]"
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
