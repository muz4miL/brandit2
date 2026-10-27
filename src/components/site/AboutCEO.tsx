import { Instagram, Linkedin } from "lucide-react";
import founderPhoto from "@/assets/work-package-rise.jpg";

export function AboutCEO() {
  return (
    <section
      aria-label="About the Founder & CEO"
      className="relative w-full overflow-hidden bg-[#09090D] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 border-t border-b border-white/[0.08] select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Founder Photo & Social Badges */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[30px] border border-white/10 bg-neutral-900 shadow-2xl">
              <img
                src={founderPhoto}
                alt="Umar Farooq — Founder & CEO of brandit."
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="mt-6 flex flex-col items-center sm:items-start">
              <h3 className="font-display text-[24px] font-bold text-white">
                Umar Farooq
              </h3>
              <p className="text-[15px] font-medium text-[#A1A1AA]">
                Founder & CEO
              </p>

              {/* Instagram and LinkedIn icons beneath name linking to profiles */}
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://instagram.com/brandit.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Umar Farooq Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-colors hover:bg-[#1E6BFF] hover:border-[#1E6BFF]"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://linkedin.com/company/brandit-agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Umar Farooq LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-colors hover:bg-[#1E6BFF] hover:border-[#1E6BFF]"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Heading & Approved Story Body Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex h-[36px] items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4">
              <span className="font-display text-[12px] font-semibold tracking-[0.16em] text-[#A1A1AA] uppercase">
                About the CEO
              </span>
            </div>

            <h2 className="mt-4 font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.02] tracking-tight text-white">
              The system behind{" "}
              <span className="font-serif italic font-normal text-[#F4F4F5]">
                brandit.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-[16px] sm:text-[17px] leading-relaxed text-[#A1A1AA]">
              <p>
                I sharpened my craft inside the UAE — one of the most competitive marketing arenas on earth. I built the content system for the country’s largest real estate brokerage, turned a property data platform into a trusted authority, and grew a founder’s brand to six figures.
              </p>
              <p>
                I’ve personally sat in every seat: shooting, editing, designing, buying media, and writing the strategy. That’s why brandit. runs on systems instead of guesswork — I’m not directing work I’ve never done.
              </p>
              <p>
                Today a trained specialist team executes to those standards, and I stay on every account as the senior strategist. You get senior thinking with full agency capacity, and one person to call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
