import { useState, type FormEvent } from "react";
import { Wordmark } from "./Wordmark";
import { ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      aria-label="Site footer"
      className="relative w-full overflow-hidden bg-[#050505] pt-20 pb-8 md:pt-28 md:pb-12 text-white select-none"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top Branding & Navigation Area */}
        <div className="grid grid-cols-1 gap-12 min-[900px]:grid-cols-12 min-[900px]:gap-8">
          {/* Brand Info (4 cols) */}
          <div className="min-[900px]:col-span-4">
            <Wordmark className="text-3xl md:text-4xl" />
            <p className="mt-4 max-w-[320px] font-sans text-[15px] leading-relaxed text-white/60 md:text-[16px]">
              Digital experiences that make brands impossible to ignore.
            </p>
          </div>

          {/* Navigation Columns (5 cols) */}
          <div className="grid grid-cols-2 gap-8 min-[900px]:col-span-5">
            {/* Explore Column */}
            <div>
              <h4 className="font-sans text-[15px] font-semibold text-white mb-4 tracking-tight">
                Explore
              </h4>
              <ul className="flex flex-col gap-2.5 font-sans text-[15px] text-white/65">
                <li>
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#who-we-are"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("who-we-are");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#creative"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("creative");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Our Work
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("faq");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-sans text-[15px] font-semibold text-white mb-4 tracking-tight">
                Services
              </h4>
              <ul className="flex flex-col gap-2.5 font-sans text-[15px] text-white/65">
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Performance Creative
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Brand Identity
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Website Design &amp; Dev
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Social Media &amp; Content
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="transition-colors hover:text-white"
                  >
                    Digital Advertising
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Let's Talk / Newsletter Column (3 cols) */}
          <div className="min-[900px]:col-span-3">
            <h4 className="font-sans text-[15px] font-semibold text-white tracking-tight">
              Have a project in mind?
            </h4>
            <p className="mt-1 font-sans text-[14px] text-white/60 mb-4">
              Let's make something worth remembering.
            </p>

            {isSubmitted ? (
              <div className="flex items-center gap-2 rounded-full border border-[#F3FF00]/30 bg-[#121214] px-4 py-2.5 text-[14px] font-medium text-[#F3FF00]">
                <Check className="h-4 w-4" />
                <span>Thank you! We'll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="h-11 w-full rounded-full border border-white/10 bg-[#121214] px-4 pr-24 font-sans text-[14px] text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 flex h-8 items-center gap-1 rounded-full bg-[#F3FF00] px-3.5 font-sans text-[12px] font-semibold text-black transition-all hover:brightness-105 active:scale-95"
                >
                  <span>Submit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Huge Bottom Wordmark */}
        <div className="mt-20 w-full overflow-hidden text-center md:mt-28">
          <div className="w-full font-display font-black text-[22vw] leading-[0.78] tracking-[-0.06em] text-[#1c1c20] select-none pointer-events-none">
            brandit<span className="text-[0.4em] align-top text-[#24242a]">.</span>
            <span className="text-[0.25em] align-super text-[#24242a]">®</span>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-[13px] text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} Brand It. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white/70">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Terms of Service
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white/70"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white/70"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
