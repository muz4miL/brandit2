"use client";

import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { BRAND_TAGLINE, BRAND_COPYRIGHT, siteMeta } from "@/content/site";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
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
      className="relative w-full overflow-hidden bg-bg text-fg select-none"
    >
      {/* Top separator line */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="border-t border-white/10" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Main content row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 pt-14 pb-10">
          {/* Left: Wordmark + tagline */}
          <div className="max-w-sm space-y-4">
            <Link href="/" aria-label="brandit. home" className="inline-block">
              <Wordmark variant="theme" className="text-3xl sm:text-4xl w-auto" />
            </Link>
            <p className="text-[15px] sm:text-[16px] text-white/50 leading-relaxed font-normal max-w-[280px]">
              {BRAND_TAGLINE}
            </p>
          </div>

          {/* Right: Social links */}
          <div className="flex flex-row items-center gap-5">
            {siteMeta.social.instagram && (
              <a
                href={siteMeta.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="brandit. on Instagram"
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            )}
            {siteMeta.social.linkedin && (
              <a
                href={siteMeta.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="brandit. on LinkedIn"
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            )}
            {siteMeta.contact.whatsappLink && (
              <a
                href={siteMeta.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact brandit. on WhatsApp"
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-white/[0.07] py-5 flex items-center justify-between text-[13px] text-white/30">
          <p>{BRAND_COPYRIGHT}. All rights reserved.</p>
        </div>
      </div>

      {/* Giant ghost watermark — like Defiant's huge brand text at footer bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none w-full overflow-hidden mt-2"
      >
        <span className="footer-watermark block font-display font-black tracking-[-0.05em] text-[clamp(80px,18vw,280px)] leading-[0.82] text-center uppercase">
          brandit.
        </span>
      </div>
    </footer>
  );
}
