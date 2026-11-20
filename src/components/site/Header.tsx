"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, ChevronDown, ArrowUpRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { StaticImageData } from "next/image";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";
import { canonicalServices, siteMeta } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export interface MegaServiceItem {
  id: string;
  slug: string;
  title: string;
  serifLine: string;
  description: string;
  visibleTags: string[];
  image: StaticImageData | string;
}

export const eightServices: MegaServiceItem[] = canonicalServices.map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  serifLine: s.serifLine,
  description: s.summary,
  visibleTags: s.bullets.slice(0, 3),
  image: s.image,
}));

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const headerRef = useRef<HTMLElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Instant hover-in with timeout cancellation
  const handleMouseEnterServices = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  }, []);

  // Smooth hover-out with small grace period so cursor can cross into mega-menu without closing
  const handleMouseLeaveServices = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  }, []);

  // Scroll detection for translucent blurred header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Close mega menu on outside click or Escape
  useEffect(() => {
    if (!isServicesOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(target) &&
        servicesTriggerRef.current &&
        !servicesTriggerRef.current.contains(target)
      ) {
        setIsServicesOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
        servicesTriggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isServicesOpen]);

  // Close mobile navigation on Escape
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  // Lock page scroll (Lenis + native) while the mobile takeover is open
  useEffect(() => {
    if (!isMobileOpen) return;

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "relative min-[920px]:fixed min-[920px]:top-0 min-[920px]:inset-x-0 z-50 w-full transition-all duration-300 select-none",
          "site-header h-[76px] min-[920px]:h-[100px]",
          isScrolled
            ? "border-b border-white/[0.08] bg-[#070709]/80 backdrop-blur-[24px] is-scrolled shadow-2xl shadow-black/35"
            : overlay
              ? "border-b border-transparent bg-transparent"
              : "border-b border-transparent bg-bg/95 min-[920px]:bg-transparent",
        )}
      >
        {/* Mobile Top Bar (< 920px): Logo pinned LEFT, theme toggle + menu pinned RIGHT */}
        <div className="flex h-full w-full items-center justify-between px-5 min-[920px]:hidden">
          <a
            href="/"
            aria-label="brandit. home"
            className={cn(
              "group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4",
              isScrolled || overlay ? "focus-visible:outline-white" : "focus-visible:outline-fg",
            )}
          >
            <Wordmark
              variant={isScrolled || overlay ? "white" : "theme"}
              glow
              className="text-[24px] sm:text-[27px] w-auto"
            />
          </a>

          <div className="flex items-center gap-1">
            <ThemeToggle className="h-10 w-10 shrink-0" />
            <button
              ref={mobileToggleRef}
              type="button"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] text-fg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-primary"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMobileOpen((o) => !o)}
            >
              {isMobileOpen ? (
                <X size={24} className="stroke-[2.2] text-fg" />
              ) : (
                <div className="flex flex-col gap-[5px] w-[22px]">
                  <span className="block h-[2px] w-full bg-fg rounded-full" />
                  <span className="block h-[2px] w-full bg-fg rounded-full" />
                  <span className="block h-[2px] w-full bg-fg rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Top Bar (>= 920px) */}
        <div className="hidden h-full w-full max-w-[1440px] mx-auto min-[920px]:grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(24px,3vw,56px)]">
          {/* Left: brandit. Logo */}
          <div className="flex items-center justify-self-start">
            <a
              href="/"
              aria-label="brandit. home"
              className={cn(
                "group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4",
                isScrolled || overlay ? "focus-visible:outline-white" : "focus-visible:outline-fg",
              )}
            >
              <Wordmark
                variant={isScrolled || overlay ? "white" : "theme"}
                glow
                className="text-[25px] xl:text-[28px] w-auto"
              />
            </a>
          </div>

          {/* Centre: Navigation Capsule */}
          <div className="flex items-center justify-self-center">
            <nav
              aria-label="Main navigation"
              className="relative inline-flex h-[58px] sm:h-[62px] items-center gap-[4px] sm:gap-[6px] rounded-full bg-surface/90 border border-line p-[5px] sm:p-[6px] shadow-lg shadow-black/15 backdrop-blur-xl"
            >
              {/* 1. Home */}
              <a
                href="/"
                className={cn(
                  "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  activePath === "/"
                    ? "bg-primary font-bold text-primary-foreground shadow-md"
                    : "bg-transparent font-medium text-muted-foreground hover:bg-surface-2 hover:text-fg",
                )}
              >
                Home
              </a>

              {/* 2. About */}
              <a
                href="/about"
                className={cn(
                  "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  activePath.startsWith("/about")
                    ? "bg-primary font-bold text-primary-foreground shadow-md"
                    : "bg-transparent font-medium text-muted-foreground hover:bg-surface-2 hover:text-fg",
                )}
              >
                About
              </a>

              {/* 3. Services with Instant Hover Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterServices}
                onMouseLeave={handleMouseLeaveServices}
              >
                <div className="flex items-center">
                  <a
                    href="/services"
                    className={cn(
                      "flex h-[44px] items-center justify-center pl-4 pr-1.5 text-[15px] transition-all duration-150 rounded-l-full",
                      activePath.startsWith("/services") || isServicesOpen
                        ? "bg-surface-2 font-bold text-fg ring-1 ring-line"
                        : "bg-transparent font-medium text-muted-foreground hover:bg-surface-2 hover:text-fg",
                    )}
                  >
                    Services & Packages
                  </a>
                  <button
                    ref={servicesTriggerRef}
                    type="button"
                    id="services-disclosure-button"
                    aria-haspopup="true"
                    aria-expanded={isServicesOpen}
                    aria-controls="services-mega-menu"
                    onClick={() => setIsServicesOpen((prev) => !prev)}
                    className={cn(
                      "flex h-[44px] items-center justify-center pr-3 pl-1 text-[15px] transition-all duration-150 rounded-r-full",
                      activePath.startsWith("/services") || isServicesOpen
                        ? "bg-surface-2 text-fg ring-1 ring-line"
                        : "bg-transparent text-muted-foreground hover:bg-surface-2 hover:text-fg",
                    )}
                    aria-label="Toggle services menu"
                  >
                    <ChevronDown
                      size={15}
                      className={cn(
                        "stroke-[2.5] transition-transform duration-250 ease-out",
                        isServicesOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>

              {/* 4. Our Work */}
              <Link
                href="/our-work"
                className={cn(
                  "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  activePath.startsWith("/our-work")
                    ? "bg-primary font-bold text-primary-foreground shadow-md"
                    : "bg-transparent font-medium text-muted-foreground hover:bg-surface-2 hover:text-fg",
                )}
              >
                Our Work
              </Link>

              {/* 5. Case Studies */}
              <Link
                href="/case-studies"
                className={cn(
                  "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  activePath.startsWith("/case-studies")
                    ? "bg-primary font-bold text-primary-foreground shadow-md"
                    : "bg-transparent font-medium text-muted-foreground hover:bg-surface-2 hover:text-fg",
                )}
              >
                Case Studies
              </Link>

              {/* 5. Contact */}
              <a
                href="/contact"
                className={cn(
                  "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  activePath.startsWith("/contact")
                    ? "bg-primary font-bold text-primary-foreground shadow-md"
                    : "bg-transparent font-medium text-muted-foreground hover:bg-surface-2 hover:text-fg",
                )}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Right: Standout CTA Button + Theme Toggle */}
          <div className="flex items-center gap-3 justify-self-end">
            <ThemeToggle />
            <a
              href="/contact"
              className="inline-flex h-[50px] cursor-pointer select-none items-center gap-2.5 rounded-full btn-shiny px-6 text-[15px] font-bold text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-3"
            >
              <span className="font-display font-black text-[17px] leading-none drop-shadow-sm">
                b.
              </span>
              <span className="drop-shadow-sm">Get Started</span>
              <ArrowUpRight size={17} className="stroke-[2.5] drop-shadow-sm" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* FULL-WIDTH SERVICES MEGA MENU PANEL WITH INSTANT HOVER ANIMATION */}
        <AnimatePresence>
          {isServicesOpen && (
            <motion.div
              ref={megaMenuRef}
              id="services-mega-menu"
              role="region"
              aria-label="Services Overview"
              initial={{ opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={handleMouseEnterServices}
              onMouseLeave={handleMouseLeaveServices}
              className="absolute left-0 right-0 top-full pt-3 px-[clamp(20px,3vw,56px)] z-50 pointer-events-auto"
            >
              <div className="mx-auto max-w-[1440px] rounded-[28px] border border-white/10 bg-[#0A0A0F]/95 backdrop-blur-3xl p-5 lg:p-6 shadow-[0_25px_80px_rgba(0,0,0,0.75)] text-fg">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
                  {/* Left: Clean 4×2 Service Card Grid matching Defiant Digital */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {eightServices.map((item) => (
                      <a
                        key={item.id}
                        href={`/services#${item.slug}`}
                        onClick={() => setIsServicesOpen(false)}
                        className="group relative flex min-h-[118px] flex-col justify-between overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#12131A] p-4 text-left transition-all duration-300 hover:border-white/30 hover:scale-[1.02] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        {/* Artwork background with rich gradient overlay */}
                        <img
                          src={typeof item.image === "string" ? item.image : item.image.src}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-500 ease-out group-hover:scale-[1.08] group-hover:opacity-65"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />

                        {/* Top title with bold sans and Instrument Serif italic line */}
                        <div className="relative z-10">
                          <span className="block font-display text-[15px] font-extrabold leading-tight tracking-tight text-white">
                            {item.title}
                          </span>
                          <span className="block font-instrument text-[18px] font-normal italic text-neutral-300 leading-snug">
                            {item.serifLine}
                          </span>
                        </div>

                        {/* Bottom row with action arrow that glows on hover */}
                        <div className="relative z-10 flex items-center justify-between pt-2">
                          <span className="text-[11px] font-medium text-neutral-400 group-hover:text-white transition-colors">
                            Explore Service
                          </span>
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-all duration-200 group-hover:bg-white group-hover:text-black group-hover:scale-110">
                            <ArrowUpRight size={13} className="stroke-[2.5]" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Right: High-End Hero Feature Card matching Defiant Digital */}
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br from-[#12131C] to-[#0A0B10] border border-white/[0.1] p-6 lg:p-7 text-white shadow-lg">
                    {/* Background subtle radial glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/[0.04] blur-2xl"
                    />

                    <div className="relative z-10 space-y-4">
                      {/* Google Rating Badge */}
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11.5px] font-semibold text-neutral-300">
                        <span className="font-bold text-white">G</span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star size={11} fill="currentColor" />
                          <Star size={11} fill="currentColor" />
                          <Star size={11} fill="currentColor" />
                          <Star size={11} fill="currentColor" />
                          <Star size={11} fill="currentColor" />
                        </div>
                        <span className="font-bold text-white">5.0</span>
                      </div>

                      {/* Headline with serif italic accent */}
                      <h3 className="font-display text-[26px] lg:text-[28px] font-extrabold leading-[1.08] tracking-tight text-white">
                        All the services{" "}
                        <span className="font-instrument italic font-normal text-white text-[1.08em] block mt-0.5">
                          you need to scale
                        </span>
                      </h3>

                      <p className="text-[13px] leading-relaxed text-neutral-400 max-w-[280px]">
                        Strategy, paid media, creative production, and web engineering — united
                        under one roof.
                      </p>
                    </div>

                    {/* Bottom Action & Platform Badges */}
                    <div className="relative z-10 pt-6 border-t border-white/[0.08] space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                        <span>Meta</span>
                        <span>·</span>
                        <span>Google</span>
                        <span>·</span>
                        <span>TikTok</span>
                        <span>·</span>
                        <span>Shopify</span>
                      </div>

                      <a
                        href="/services#packages"
                        onClick={() => setIsServicesOpen(false)}
                        className="flex h-[44px] w-full items-center justify-center gap-2 rounded-full bg-white text-black font-bold text-[13.5px] transition-transform duration-200 hover:scale-[1.02] shadow-md"
                      >
                        <span>Compare Growth Packages</span>
                        <ArrowUpRight size={15} className="stroke-[2.5]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* Mobile full-screen navigation takeover */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-[#050506] text-white [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[920px]:hidden"
          >
            {/* Top bar */}
            <div className="flex h-[76px] shrink-0 items-center justify-between px-5">
              <a
                href="/"
                aria-label="brandit. home"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Wordmark variant="white" className="w-auto text-[26px]" />
              </a>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <X size={28} className="stroke-[1.8]" />
                </button>
              </div>
            </div>

            <div className="flex flex-col px-5 pb-[max(32px,env(safe-area-inset-bottom))]">
              {/* Conversion row */}
              <div className="flex items-center justify-between gap-4 border-y border-white/10 py-5">
                <p className="font-display text-[24px] font-extrabold tracking-tight text-white">
                  Ready to <span className="font-instrument font-normal italic">chat?</span>
                </p>
                <a
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex h-[46px] shrink-0 items-center rounded-full border border-white/70 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Book Now
                </a>
              </div>

              {/* Services — shown immediately as the menu opens */}
              <div className="flex flex-col gap-3 pt-5">
                {eightServices.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`/services#${item.slug}`}
                    onClick={() => setIsMobileOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 + index * 0.045,
                      duration: 0.42,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative flex h-[136px] w-full shrink-0 items-center overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0D0E14] px-6 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <img
                      src={typeof item.image === "string" ? item.image : item.image.src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 ease-out group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/5" />
                    <div className="relative z-10">
                      <span className="block font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-white">
                        {item.title}
                      </span>
                      <span className="block font-instrument text-[26px] font-normal italic leading-[1.05] text-white">
                        {item.serifLine}
                      </span>
                    </div>
                  </motion.a>
                ))}

                <motion.a
                  href="/services"
                  onClick={() => setIsMobileOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 + eightServices.length * 0.045,
                    duration: 0.42,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-2 flex h-14 shrink-0 items-center justify-between rounded-[18px] border border-white/15 px-6 transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span className="text-[15px] font-semibold text-white/80">
                    All services & packages
                  </span>
                  <ArrowUpRight size={18} className="text-white/50" aria-hidden="true" />
                </motion.a>
              </div>

              {/* Nav links — after the services, matching Defiant */}
              <nav aria-label="Primary" className="mt-9 flex flex-col border-t border-white/10 pt-3">
                {mobileNavItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="group flex items-center gap-3 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <ArrowUpRight
                      size={19}
                      className="shrink-0 text-white/40 transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="font-display text-[clamp(23px,6.8vw,31px)] font-extrabold leading-none tracking-[-0.03em] text-white transition-colors group-hover:text-white/70">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Brand sign-off */}
              <div className="mt-10 border-t border-white/10 pt-8">
                <h3 className="font-display text-[clamp(28px,8vw,36px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
                  All the <span className="font-instrument font-normal italic">services</span>
                  <span className="block">
                    you need to{" "}
                    <span className="font-instrument font-normal italic">scale</span>
                  </span>
                </h3>
                <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-white/40">
                  {siteMeta.tagline}
                </p>
                <a
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-6 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-bold text-black transition-transform active:scale-[0.99]"
                >
                  <span className="font-display text-[16px] font-black">b.</span>
                  <span>Get Started</span>
                  <ArrowUpRight size={17} className="stroke-[2.5]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop spacer to prevent page jump when header is fixed */}
      <div
        className="hidden min-[920px]:block h-[76px] min-[920px]:h-[100px] w-full shrink-0"
        aria-hidden="true"
      />
    </>
  );
}
