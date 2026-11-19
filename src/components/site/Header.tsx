"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
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
            className="group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
          >
            <Wordmark variant="theme" glow className="text-[24px] sm:text-[27px] w-auto" />
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
              className="group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
            >
              <Wordmark variant="theme" glow className="text-[25px] xl:text-[28px] w-auto" />
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

              {/* 4. Case Studies */}
              <a
                href="/case-studies"
                className={cn(
                  "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  activePath.startsWith("/case-studies") || activePath.startsWith("/our-work")
                    ? "bg-primary font-bold text-primary-foreground shadow-md"
                    : "bg-transparent font-medium text-muted-foreground hover:bg-surface-2 hover:text-fg",
                )}
              >
                Case Studies
              </a>

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

                        {/* Top title with bold sans and Fraunces italic serif line */}
                        <div className="relative z-10">
                          <span className="block font-display text-[15px] font-extrabold leading-tight tracking-tight text-white">
                            {item.title}
                          </span>
                          <span className="block font-serif text-[16px] font-normal italic text-neutral-300 leading-snug">
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
                        <span className="font-serif italic font-normal text-white block mt-0.5">
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

        {/* Mobile Navigation Drawer */}
        {isMobileOpen && (
          <nav
            id="mobile-navigation-drawer"
            aria-label="Mobile navigation"
            className="mx-3 mt-2 flex flex-col gap-2 rounded-3xl border border-line bg-surface p-3.5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 min-[920px]:hidden text-fg"
          >
            {/* Home */}
            <a
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex min-h-[46px] items-center rounded-2xl bg-surface-2 px-4 text-[15px] font-medium text-fg transition-colors hover:bg-primary hover:font-bold hover:text-primary-foreground"
            >
              Home
            </a>

            {/* About */}
            <a
              href="/about"
              onClick={() => setIsMobileOpen(false)}
              className="flex min-h-[46px] items-center rounded-2xl bg-surface-2 px-4 text-[15px] font-medium text-fg transition-colors hover:bg-primary hover:font-bold hover:text-primary-foreground"
            >
              About
            </a>

            {/* Services & Packages Accordion */}
            <div className="flex flex-col rounded-2xl bg-surface-2 overflow-hidden">
              <div className="flex items-center justify-between pr-2">
                <a
                  href="/services"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex min-h-[46px] flex-1 items-center px-4 text-[15px] font-medium text-fg hover:text-muted-foreground"
                >
                  Services & Packages
                </a>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center text-fg"
                  aria-expanded={isMobileServicesOpen}
                  onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                  aria-label="Toggle services list"
                >
                  <ChevronDown
                    size={16}
                    className={cn(
                      "stroke-[2.5] transition-transform duration-200",
                      isMobileServicesOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </div>
              {isMobileServicesOpen && (
                <div className="grid grid-cols-2 gap-1.5 border-t border-line bg-panel p-2.5">
                  {eightServices.map((item) => (
                    <a
                      key={item.id}
                      href={`/services#${item.slug}`}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl bg-surface p-3 text-left border border-line hover:border-fg/30 transition-colors"
                    >
                      <div>
                        <div className="text-[14px] font-bold text-fg">
                          {item.title}{" "}
                          <span className="font-serif font-normal italic text-muted-foreground">
                            {item.serifLine}
                          </span>
                        </div>
                        <div className="text-[12px] text-muted-foreground line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                      <ArrowUpRight size={15} className="text-fg shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Case Studies */}
            <a
              href="/case-studies"
              onClick={() => setIsMobileOpen(false)}
              className="flex min-h-[46px] items-center rounded-2xl bg-surface-2 px-4 text-[15px] font-medium text-fg transition-colors hover:bg-primary hover:font-bold hover:text-primary-foreground"
            >
              Case Studies
            </a>

            {/* Contact */}
            <a
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="flex min-h-[46px] items-center rounded-2xl bg-surface-2 px-4 text-[15px] font-medium text-fg transition-colors hover:bg-primary hover:font-bold hover:text-primary-foreground"
            >
              Contact
            </a>

            {/* Mobile CTA */}
            <a
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="mt-1 flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-primary px-5 text-[15px] font-bold text-primary-foreground transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span className="font-display font-black text-[16px]">b.</span>
              <span>Get Started</span>
              <ArrowUpRight size={17} className="stroke-[2.5]" aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>

      {/* Desktop spacer to prevent page jump when header is fixed */}
      <div
        className="hidden min-[920px]:block h-[76px] min-[920px]:h-[100px] w-full shrink-0"
        aria-hidden="true"
      />
    </>
  );
}
