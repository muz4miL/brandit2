"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronDown, ArrowUpRight } from "lucide-react";
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
  image: any;
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
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 select-none",
        "site-header h-[76px] min-[920px]:h-[100px]",
        isScrolled
          ? "border-b border-line bg-surface/90 backdrop-blur-[18px] is-scrolled shadow-2xl shadow-black/20"
          : overlay
            ? "border-b border-transparent bg-transparent"
            : "border-b border-transparent bg-bg",
      )}
    >
      {/* Mobile Top Bar (< 920px): Logo pinned LEFT, Hamburger pinned FAR RIGHT */}
      <div className="flex h-full w-full items-center justify-between px-5 min-[920px]:hidden">
        <a
          href="/"
          aria-label="brandit. home"
          className="group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
        >
          <Wordmark variant="theme" glow className="text-[24px] sm:text-[27px] w-auto" />
        </a>

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
            className="relative inline-flex h-[58px] sm:h-[62px] items-center gap-[4px] sm:gap-[6px] rounded-full bg-surface border border-line p-[5px] sm:p-[6px] shadow-lg shadow-black/10"
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

            {/* 3. Services & Packages with dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <a
                  href="/services"
                  className={cn(
                    "flex h-[44px] items-center justify-center pl-4 pr-1.5 text-[15px] transition-colors duration-150 rounded-l-full",
                    activePath.startsWith("/services")
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
                    "flex h-[44px] items-center justify-center pr-3 pl-1 text-[15px] transition-colors duration-150 rounded-r-full",
                    activePath.startsWith("/services") || isServicesOpen
                      ? "bg-surface-2 text-fg ring-1 ring-line"
                      : "bg-transparent text-muted-foreground hover:bg-surface-2 hover:text-fg",
                  )}
                  aria-label="Toggle services menu"
                >
                  <ChevronDown
                    size={15}
                    className={cn(
                      "stroke-[2.5] transition-transform duration-200",
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
            className="inline-flex h-[50px] cursor-pointer select-none items-center gap-2.5 rounded-full btn-shiny px-6 text-[15px] font-bold text-primary-foreground transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-3"
          >
            <span className="font-display font-black text-[17px] leading-none drop-shadow-sm">b.</span>
            <span className="drop-shadow-sm">Get Started</span>
            <ArrowUpRight size={17} className="stroke-[2.5] drop-shadow-sm" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* FULL-WIDTH SERVICES MEGA MENU PANEL */}
      {isServicesOpen && (
        <div
          ref={megaMenuRef}
          id="services-mega-menu"
          role="region"
          aria-label="Services Overview"
          className="absolute left-0 right-0 top-full pt-2 px-[clamp(24px,3vw,56px)] z-50 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="mx-auto max-w-[1440px] rounded-[28px] border border-line bg-surface/95 backdrop-blur-2xl p-5 lg:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.5)] text-fg">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
              {/* Left: canonical 4 x 2 service tile grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {eightServices.map((item) => (
                  <a
                    key={item.id}
                    href={`/services#${item.slug}`}
                    onClick={() => setIsServicesOpen(false)}
                    className="group relative flex min-h-[145px] flex-col justify-end overflow-hidden rounded-[14px] border border-line bg-surface-2 p-3.5 text-left transition-all duration-200 hover:border-fg/30 focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <img
                      src={item.image.src || item.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/55 to-transparent" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-display text-[15px] font-extrabold leading-tight tracking-tight text-fg">
                          {item.title}
                          <span className="block font-serif text-[18px] font-normal italic text-fg/80">{item.serifLine}</span>
                        </span>
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-fg/10 text-fg opacity-0 transition-all group-hover:bg-fg group-hover:text-bg group-hover:opacity-100">
                          <ArrowUpRight size={14} className="stroke-[2.5]" />
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    {/* Visible Tag Row */}
                    <div className="relative z-10 mt-2 flex flex-wrap gap-1.5 border-t border-line pt-2">
                      {item.visibleTags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-line bg-surface/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>

              {/* Right: The 3 Packages Preview Column */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-panel border border-line p-6 text-fg shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-line bg-fg/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-fg">
                    <span>Packages for Every Stage</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-fg xl:text-[26px]">
                    Kickstart · Accelerate · Authority
                  </h3>

                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                    From setting up your online presence in 3 weeks to complete custom market dominance.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col gap-3 mt-6">
                  <div className="flex items-center justify-between border-t border-line pt-3 text-[12px] text-muted-foreground">
                    <span>{siteMeta.trustBarSummary}</span>
                  </div>

                  <a
                    href="/services#packages"
                    onClick={() => setIsServicesOpen(false)}
                    className="flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground transition-transform hover:scale-[1.02] shadow-[0_0_18px_rgba(255,255,255,0.08)]"
                  >
                    <span>Compare All Packages</span>
                    <ArrowUpRight size={16} className="stroke-[2.5]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      <div className="text-[14px] font-bold text-fg">{item.title} <span className="font-serif font-normal italic text-muted-foreground">{item.serifLine}</span></div>
                      <div className="text-[12px] text-muted-foreground line-clamp-1">{item.description}</div>
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

          {/* Mobile Theme Toggle & CTA */}
          <div className="flex items-center gap-3 mt-1">
            <ThemeToggle className="h-[50px] w-[50px] shrink-0" />
            <a
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="flex-1 flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-primary px-5 text-[15px] font-bold text-primary-foreground transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span className="font-display font-black text-[16px]">b.</span>
              <span>Get Started</span>
              <ArrowUpRight size={17} className="stroke-[2.5]" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
