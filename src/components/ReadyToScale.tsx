import { ArrowUpRight, MessageSquare } from "lucide-react";

export default function ReadyToScale() {
  return (
    <section
      id="final-cta"
      aria-label="Ready to Grow"
      className="relative w-full overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* High-Contrast Architectural Shell Card */}
        <div className="relative overflow-hidden rounded-[36px] sm:rounded-[44px] bg-[#09090B] px-6 py-16 sm:px-12 sm:py-20 lg:py-24 text-center text-white shadow-2xl">
          <div className="mx-auto max-w-[760px] flex flex-col items-center">
            {/* Eyebrow */}
            <div className="inline-flex h-[36px] items-center justify-center rounded-full border border-white/15 bg-white/[0.08] px-4">
              <span className="font-display text-[12px] font-semibold tracking-[0.16em] text-white/80 uppercase">
                You made it this far.
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-5 font-display text-[38px] sm:text-[54px] lg:text-[68px] font-extrabold leading-[0.96] tracking-tight text-white">
              Ready to Grow?
            </h2>

            {/* Body */}
            <p className="mt-5 max-w-[600px] text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-[#A1A1AA]">
              Whether you’re a founder building authority or a business scaling toward market leadership — you need a system, not just content.
            </p>

            {/* Button */}
            <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a
                href="/contact"
                className="inline-flex h-[60px] items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[16px] font-bold text-[#09090B] transition-all hover:bg-neutral-200 active:scale-[0.98]"
              >
                <span>Book a Discovery Call</span>
                <ArrowUpRight size={18} className="stroke-[2.5]" />
              </a>

              <a
                href="https://wa.me/971525347120"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[60px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageSquare size={17} />
                <span>WhatsApp Directly</span>
              </a>
            </div>

            {/* Contact Line */}
            <div className="mt-8 pt-6 border-t border-white/10 text-[13px] sm:text-[14px] text-[#A1A1AA] flex flex-wrap items-center justify-center gap-3">
              <span>WhatsApp: +971 52 534 7120</span>
              <span>•</span>
              <a href="mailto:info@brandit.agency" className="hover:text-white underline-offset-4 hover:underline">
                info@brandit.agency
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
