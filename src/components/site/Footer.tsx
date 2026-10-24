import { Wordmark } from "./Wordmark";
import { Instagram, Linkedin, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative w-full overflow-hidden bg-[#09090B] text-white pt-14 pb-12 select-none border-t border-black/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand & Tagline */}
          <div className="max-w-[460px]">
            <a href="/" aria-label="brandit. home" className="inline-block text-white">
              <Wordmark className="text-3xl text-white" />
            </a>
            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#A1A1AA]">
              Marketing systems, content, and performance. UAE-forged. Delivered worldwide.
            </p>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/brandit.agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              <Instagram size={15} />
              <span>Instagram</span>
            </a>

            <a
              href="https://linkedin.com/company/brandit-agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://wa.me/971525347120"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              <MessageSquare size={15} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright bar - strictly no navigation links as required by brief */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#71717A]">
          <p>© brandit. 2026. All rights reserved.</p>
          <p>Forged in the UAE. Delivered worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
