"use client";

import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { BRAND_TAGLINE, BRAND_COPYRIGHT, siteMeta } from "@/content/site";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16 3C8.268 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.94 13.94 0 0 0 16 31c7.732 0 14-6.268 14-14S23.732 3 16 3Zm0 2.154C9.458 5.154 4.154 10.458 4.154 17c0 2.527.79 4.868 2.138 6.79l-1.061 3.98 4.049-1.013A11.83 11.83 0 0 0 16 28.846c6.542 0 11.846-5.304 11.846-11.846S22.542 5.154 16 5.154Z"
        clipRule="evenodd"
      />
      <path d="M12.5 9.5c-.333-.668-.844-.609-1.36-.609-.922 0-2.36 1.104-2.36 3.159 0 1.684.743 3.528 3.243 6.286 2.414 2.661 5.585 4.038 8.218 3.991 2.633-.046 3.174-2.312 3.174-3.077 0-.339-.21-.508-.355-.554-.897-.43-2.552-1.233-2.929-1.384-.376-.151-.573.053-.695.164-.341.325-1.018 1.284-1.25 1.5-.232.216-.577.107-.721.025-.53-.212-1.965-.85-3.107-1.959-1.415-1.371-1.497-1.842-1.764-2.262-.214-.336-.057-.542.021-.632.305-.352.725-.895.914-1.165.189-.27.039-.679-.051-.934-.387-1.097-.714-2.016-.978-2.55Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative w-full overflow-hidden bg-bg text-fg pt-16 sm:pt-20 pb-8 sm:pb-10 select-none border-t border-line"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main Footer Block: Brand, Tagline, and Direct Social/WhatsApp Channels */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 sm:pb-16 border-b border-line">
          {/* Left: Brand Wordmark & Official Brief Tagline */}
          <div className="max-w-xl space-y-4">
            <Link href="/" aria-label="brandit. home" className="inline-block">
              <Wordmark variant="theme" glow className="text-4xl sm:text-5xl w-auto" />
            </Link>
            <p className="text-[17px] sm:text-[19px] text-muted-foreground leading-relaxed font-normal">
              {BRAND_TAGLINE}
            </p>
          </div>

          {/* Right: Direct Social & Communication Channels */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[14px] sm:text-[15px] font-medium text-muted-foreground">
            <a
              href={siteMeta.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
            >
              Instagram
            </a>
            <span className="text-line" aria-hidden="true">
              ·
            </span>
            <a
              href={siteMeta.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-line" aria-hidden="true">
              ·
            </span>
            <a
              href={siteMeta.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fg font-semibold hover:opacity-80 transition-opacity"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp: {siteMeta.contact.whatsapp}</span>
            </a>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-muted-foreground">
          <p>{BRAND_COPYRIGHT}</p>
        </div>

        {/* Ambient Ghost Wordmark */}
        <div className="mt-12 sm:mt-16 w-full overflow-hidden select-none pointer-events-none text-center relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-2/3 rounded-full bg-white/[0.03] blur-[80px]"
          />
          <span className="footer-watermark relative block font-display font-black tracking-[-0.06em] text-[clamp(72px,17vw,250px)] leading-[0.76] uppercase select-none bg-clip-text text-transparent">
            brandit.
          </span>
        </div>
      </div>
    </footer>
  );
}
