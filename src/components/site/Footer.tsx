"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Wordmark } from "./Wordmark";
import {
  BRAND_TAGLINE,
  footerNav,
  footerNewsletterSlides,
  footerServices,
  siteMeta,
} from "@/content/site";

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

type NewsletterStatus = "idle" | "sending" | "done";

export function Footer() {
  const [slide, setSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [error, setError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setSlide((s) => (s + 1) % footerNewsletterSlides.length),
      6000,
    );
    return () => window.clearInterval(id);
  }, []);

  const currentSlide = footerNewsletterSlides[slide] ?? footerNewsletterSlides[0]!;

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          sourcePage: window.location.pathname,
          _hp: honeypotRef.current?.value ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not join. Please try again.");
      }
      setStatus("done");
      setEmail("");
    } catch (err: unknown) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Could not join. Please try again.");
    }
  };

  return (
    <footer
      id="site-footer"
      aria-label="Site footer"
      className="relative w-full overflow-hidden border-t border-white/[0.08] bg-[#070708] text-white select-none"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pt-14 sm:px-10 sm:pt-18 lg:px-14 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.05fr_0.95fr_1.05fr] lg:gap-12">
          {/* Brand + primary navigation */}
          <div>
            <Link href="/" aria-label="brandit. home" className="inline-flex">
              <Wordmark variant="white" className="text-[32px] sm:text-[36px] w-auto" />
            </Link>
            <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-white/55">
              {BRAND_TAGLINE}
            </p>

            <div className="mt-5 flex items-center gap-4">
              {siteMeta.social.instagram && (
                <a
                  href={siteMeta.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="brandit. on Instagram"
                  className="text-white/40 hover:text-white transition-colors duration-200"
                >
                  <InstagramIcon className="w-[18px] h-[18px]" />
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
                  <LinkedInIcon className="w-[18px] h-[18px]" />
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
                  <WhatsAppIcon className="w-[18px] h-[18px]" />
                </a>
              )}
            </div>

            <nav aria-label="Footer navigation" className="mt-9 sm:mt-10">
              <ul className="space-y-1.5">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block font-display text-[29px] sm:text-[33px] font-bold leading-[1.15] tracking-[-0.02em] text-white transition-colors duration-200 hover:text-white/55"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="border-t border-white/[0.10] pt-7 sm:border-t-0 sm:pt-0">
            <h3 className="font-instrument text-[30px] font-normal italic leading-none text-white sm:font-display sm:text-[28px] sm:not-italic sm:tracking-[-0.01em]">
              Services
            </h3>
            <ul className="mt-4 w-full max-w-[330px] divide-y divide-white/[0.09]">
              {footerServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="block py-2.5 text-[15px] leading-snug text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter card */}
          <div className="lg:flex lg:justify-end">
            <div className="w-full max-w-[430px] self-start rounded-xl border border-white/[0.14] bg-[#101012] p-5 sm:p-6">
              <div className="text-center sm:text-left">
                <p className="text-[17px] font-semibold leading-snug text-white">
                  {currentSlide.title}
                </p>
                <p className="mt-1 text-[14px] text-white/55">{currentSlide.subtitle}</p>
              </div>

              <div
                className="mt-5 flex items-center justify-center gap-1.5 sm:justify-start"
                role="tablist"
                aria-label="Community highlights"
              >
                {footerNewsletterSlides.map((s, index) => (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    aria-selected={index === slide}
                    aria-label={`Show message ${index + 1}`}
                    onClick={() => setSlide(index)}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                      index === slide ? "bg-white" : "bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {status === "done" ? (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.05] px-3.5 py-3 text-[13px] font-medium text-white sm:justify-start">
                  <Check size={14} />
                  <span>You&rsquo;re in &mdash; watch your inbox.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="h-10 w-full min-w-0 rounded-md border border-white/15 bg-[#18181A] px-3 text-[13px] text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none sm:flex-1"
                  />
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-4 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-white/20 disabled:opacity-60 cursor-pointer sm:w-auto"
                  >
                    <span>{status === "sending" ? "Sending…" : "Submit"}</span>
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}

              {error && <p className="mt-2 text-center text-[11px] text-red-400 sm:text-left">{error}</p>}

              <p className="mt-2.5 text-center text-[10.5px] text-white/35 sm:text-left">
                No spam. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Giant cropped wordmark — like Defiant's oversized footer type */}
      <div
        className="relative mt-10 flex justify-center sm:mt-14 lg:mt-16 select-none"
        aria-hidden="true"
      >
        <div className="pointer-events-none select-none">
          <span className="block translate-y-[14%] whitespace-nowrap text-center font-display text-[clamp(104px,19vw,320px)] font-black leading-[0.78] tracking-[-0.06em] text-white/[0.06]">
            brandit.
          </span>
        </div>
        <span className="pointer-events-none absolute right-4 top-[14%] grid h-7 w-7 place-items-center rounded-full border border-white/20 text-[12px] text-white/30 sm:right-10 sm:top-[16%] sm:h-8 sm:w-8 sm:text-[13px]">
          &reg;
        </span>
      </div>
    </footer>
  );
}
