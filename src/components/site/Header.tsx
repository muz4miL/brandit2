import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ArrowUpRight, Star } from "lucide-react";
import { type Category } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

import halo from "@/assets/work-identity-halo.jpg";
import zest from "@/assets/work-social-juice.jpg";
import voltex from "@/assets/work-ad-sneaker.jpg";
import rise from "@/assets/work-package-rise.jpg";
import skin from "@/assets/work-package-skin.jpg";
import pulse from "@/assets/work-identity-pulse.jpg";
import voyara from "@/assets/work-ads-travel.jpg";
import featuredPhone from "@/assets/services-mega-featured.jpg";

interface HeaderProps {
  onSelectService?: (category: Category) => void;
}

export interface MegaServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  visibleTags: string[];
  image: string;
}

export const sixServices: MegaServiceItem[] = [
  {
    id: "strategy-growth-systems",
    slug: "strategy-growth-systems",
    title: "Strategy & Growth Systems",
    description: "The operating system behind everything else. We map content architecture, SOPs, and revenue priorities.",
    visibleTags: ["Marketing Strategy", "Growth Systems", "SOPs & Workflows", "Reporting"],
    image: halo,
  },
  {
    id: "paid-advertising",
    slug: "paid-advertising",
    title: "Paid Advertising",
    description: "Campaigns built around sales reality. Spend structured to convert and test continuously.",
    visibleTags: ["Meta Ads", "Google Ads", "TikTok Ads", "Performance Creative"],
    image: voltex,
  },
  {
    id: "content-production",
    slug: "content-production",
    title: "Content Production",
    description: "Full in-house crew — videographers, photographers, editors. Films, UGC, and SOP shoot days.",
    visibleTags: ["Video Production", "Photography", "UGC & Reels", "Podcast Production"],
    image: zest,
  },
  {
    id: "branding-design",
    slug: "branding-design",
    title: "Branding & Design",
    description: "Look like the leader. Complete identity systems, daily creative, and founder brands built for authority.",
    visibleTags: ["Brand Identity", "Graphic Design", "Personal Branding", "Ad Creative"],
    image: skin,
  },
  {
    id: "web-stores-automation",
    slug: "web-stores-automation",
    title: "Web, Stores & Automation",
    description: "Where traffic becomes revenue. Fast websites, landing pages, Shopify stores, and AI follow-up.",
    visibleTags: ["Website Design", "Landing Pages", "Shopify Stores", "AI Automation"],
    image: rise,
  },
  {
    id: "influencer-collab-marketing",
    slug: "influencer-collab-marketing",
    title: "Influencer & Collab Marketing",
    description: "Borrow audiences you haven’t built yet. Creator sourcing, campaigns, and warm market collaborations.",
    visibleTags: ["Influencer Campaigns", "Creator Sourcing", "Brand Collaborations", "Seeding & Gifting"],
    image: pulse,
  },
];

export function Header({ onSelectService }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for translucent blurred header & section active state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      if (window.scrollY < 100) {
        setActiveSection(null);
        return;
      }

      const sections = [
        { id: "about", name: "about" },
        { id: "services", name: "services" },
        { id: "work", name: "work" },
      ];

      const scrollPos = window.scrollY + 180;
      let matched: string | null = null;

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            matched = s.name;
            break;
          }
        }
      }

      setActiveSection(matched);
    };

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

  const handleSelectMegaItem = useCallback(
    (item: MegaServiceItem) => {
      setIsServicesOpen(false);
      setIsMobileOpen(false);

      if (item.targetId) {
        const el = document.getElementById(item.targetId);
        el?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (onSelectService) {
        onSelectService(item.category);
      } else {
        const el = document.getElementById("work") || document.getElementById("services");
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onSelectService],
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        "h-[76px] min-[920px]:h-[100px]",
        isScrolled
          ? "border-b border-black/[0.08] bg-white/85 backdrop-blur-[18px] is-scrolled shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "border-b border-transparent bg-[#FAFAFA]",
      )}
    >
      {/* Mobile Top Bar (< 920px): Logo pinned LEFT, Hamburger pinned FAR RIGHT */}
      <div className="flex h-full w-full items-center justify-between px-5 min-[920px]:hidden">
        <a
          href="#top"
          aria-label="the brandit. home"
          className="group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
        >
          <Wordmark className="text-[26px]" />
        </a>

        <button
          ref={mobileToggleRef}
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] text-black transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-primary"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMobileOpen((o) => !o)}
        >
          {isMobileOpen ? (
            <X size={24} className="stroke-[2.2] text-black" />
          ) : (
            <div className="flex flex-col gap-[5px] w-[22px]">
              <span className="block h-[2px] w-full bg-black rounded-full" />
              <span className="block h-[2px] w-full bg-black rounded-full" />
              <span className="block h-[2px] w-full bg-black rounded-full" />
            </div>
          )}
        </button>
      </div>

      {/* Desktop Top Bar (>= 920px) */}
      <div className="hidden h-full w-full max-w-[1440px] mx-auto min-[920px]:grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(24px,3vw,56px)]">
        {/* Left: Brand It Logo */}
        <div className="flex items-center justify-self-start">
          <a
            href="#top"
            aria-label="the brandit. home"
            className="group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
          >
            <Wordmark className="text-[32px]" />
          </a>
        </div>

        {/* Centre: Navigation Capsule */}
        <div className="flex items-center justify-self-center">
          <nav
            aria-label="Main navigation"
            className="relative inline-flex h-[60px] items-center gap-[4px] sm:gap-[6px] rounded-full bg-[#EAEAEA] border border-black/[0.06] p-[6px] shadow-sm"
          >
            {/* 1. About */}
            <a
              href="/about"
              className={cn(
                "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2",
                activeSection === "about"
                  ? "bg-black font-semibold text-white shadow-sm"
                  : "bg-transparent font-medium text-[#222226] hover:bg-black hover:font-semibold hover:text-white",
              )}
            >
              About
            </a>

            {/* 2. Services Disclosure */}
            <div className="relative">
              <button
                ref={servicesTriggerRef}
                type="button"
                id="services-disclosure-button"
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
                aria-controls="services-mega-menu"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={cn(
                  "flex h-[44px] items-center justify-center gap-1.5 rounded-full px-4 text-[15px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2",
                  activeSection === "services" || isServicesOpen
                    ? "bg-black font-semibold text-white shadow-sm"
                    : "bg-transparent font-medium text-[#222226] hover:bg-black hover:font-semibold hover:text-white",
                )}
              >
                <span>Services</span>
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

            {/* 3. Our Work */}
            <a
              href="/our-work"
              className={cn(
                "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2",
                activeSection === "work"
                  ? "bg-black font-semibold text-white shadow-sm"
                  : "bg-transparent font-medium text-[#222226] hover:bg-black hover:font-semibold hover:text-white",
              )}
            >
              Our Work
            </a>

            {/* 4. Case Studies */}
            <a
              href="/case-studies"
              className={cn(
                "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2",
                activeSection === "case-studies"
                  ? "bg-black font-semibold text-white shadow-sm"
                  : "bg-transparent font-medium text-[#222226] hover:bg-black hover:font-semibold hover:text-white",
              )}
            >
              Case Studies
            </a>

            {/* 5. brandit. Studio */}
            <a
              href="/studio"
              className={cn(
                "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2",
                activeSection === "studio"
                  ? "bg-black font-semibold text-white shadow-sm"
                  : "bg-transparent font-medium text-[#222226] hover:bg-black hover:font-semibold hover:text-white",
              )}
            >
              brandit. Studio
            </a>

            {/* 6. Careers */}
            <a
              href="/careers"
              className={cn(
                "flex h-[44px] items-center justify-center rounded-full px-4 text-[15px] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2",
                activeSection === "careers"
                  ? "bg-black font-semibold text-white shadow-sm"
                  : "bg-transparent font-medium text-[#222226] hover:bg-black hover:font-semibold hover:text-white",
              )}
            >
              Careers
            </a>
          </nav>
        </div>

        {/* Right: Contact button labelled "Get Started →" */}
        <div className="flex items-center gap-3 justify-self-end">
          <a
            href="/contact"
            className="inline-flex h-[56px] min-w-[175px] items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-6 text-[15px] font-semibold text-white select-none transition-all duration-150 hover:bg-neutral-800 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-3"
          >
            <span>Get Started</span>
            <ArrowUpRight size={17} className="stroke-[2.5]" aria-hidden="true" />
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
          <div className="mx-auto max-w-[1440px] rounded-[28px] border border-black/10 bg-white p-5 lg:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
              {/* Left: 6 Service Cards Grid (3 cols x 2 rows) matching the 6 brief services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {sixServices.map((item) => (
                  <a
                    key={item.id}
                    href={`/services#${item.slug}`}
                    onClick={() => setIsServicesOpen(false)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.08] bg-[#F7F7F8] p-4 text-left transition-all duration-200 hover:border-black/30 hover:bg-[#EFEFF2] focus-visible:outline-2 focus-visible:outline-primary min-h-[145px]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-[17px] font-bold tracking-tight text-[#09090B]">
                          {item.title}
                        </span>
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 text-[#09090B] transition-all group-hover:bg-black group-hover:text-white">
                          <ArrowUpRight size={14} className="stroke-[2.5]" />
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#52525B] line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Visible Tag Row as specified in brief */}
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.06]">
                      {item.visibleTags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-white border border-black/[0.08] px-2 py-0.5 text-[10.5px] font-medium text-[#3F3F46]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>


              {/* Right Section: Large Featured Showcase Card */}
              <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-[#09090B] p-5 sm:p-6 lg:min-h-full text-white">
                {/* Background subtle glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.04] blur-3xl" />

                {/* Top Section: Google Rating Badge & Headline */}
                <div className="relative z-10">
                  {/* Google 4.9 Rating pill */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-1.5 backdrop-blur-md">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-xs font-semibold text-white">4.9</span>
                    <div className="flex items-center text-[#FBBC05]">
                      <Star size={11} className="fill-current" />
                      <Star size={11} className="fill-current" />
                      <Star size={11} className="fill-current" />
                      <Star size={11} className="fill-current" />
                      <Star size={11} className="fill-current" />
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-white xl:text-[28px]">
                    All the services you need to build & scale
                  </h3>
                </div>

                {/* Middle: Phone Mockup showcase image */}
                <div className="relative my-3 flex items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#141416]">
                  <img
                    src={featuredPhone}
                    alt="Brand It mobile experience preview"
                    className="max-h-[190px] w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09090B] to-transparent" />
                </div>

                {/* Bottom: Partner Badges & Quick Action */}
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-3 text-[11px] text-[#A1A1AA]">
                    <span className="font-medium text-white/90">Meta Partner</span>
                    <span>•</span>
                    <span className="font-medium text-white/90">Shopify Plus</span>
                    <span>•</span>
                    <span className="font-medium text-white/90">Klaviyo Partner</span>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => setIsServicesOpen(false)}
                    className="flex h-[46px] w-full items-center justify-center gap-2 rounded-full border border-white bg-white font-semibold text-[#09090B] transition-transform hover:bg-neutral-200"
                  >
                    <span>Get started with Brand It</span>
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
          className="mx-3 mt-2 flex flex-col gap-2 rounded-3xl border border-black/10 bg-white p-3.5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 min-[920px]:hidden"
        >
          {/* About */}
          <a
            href="#about"
            onClick={() => setIsMobileOpen(false)}
            className="flex min-h-[46px] items-center rounded-2xl bg-[#F4F4F6] px-4 text-[15px] font-medium text-[#09090B] transition-colors hover:bg-black hover:font-semibold hover:text-white"
          >
            About
          </a>

          {/* Services Accordion with rich previews */}
          <div className="flex flex-col rounded-2xl bg-[#F4F4F6] overflow-hidden">
            <button
              type="button"
              className="flex min-h-[46px] w-full items-center justify-between px-4 text-[15px] font-medium text-[#09090B] transition-colors hover:text-black"
              aria-expanded={isMobileServicesOpen}
              onClick={() => setIsMobileServicesOpen((prev) => !prev)}
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={cn(
                  "stroke-[2.5] transition-transform duration-200",
                  isMobileServicesOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {isMobileServicesOpen && (
              <div className="grid grid-cols-1 gap-1.5 border-t border-black/[0.08] bg-[#EEEEF0] p-2.5">
                {sixServices.map((item) => (
                  <a
                    key={item.id}
                    href={`/services#${item.slug}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl bg-white p-3 text-left border border-black/[0.06] hover:bg-neutral-50 transition-colors"
                  >
                    <div>
                      <div className="text-[14px] font-bold text-[#09090B]">{item.title}</div>
                      <div className="text-[12px] text-[#52525B] line-clamp-1">{item.description}</div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#09090B] shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Our Work */}
          <a
            href="/our-work"
            onClick={() => setIsMobileOpen(false)}
            className="flex min-h-[46px] items-center rounded-2xl bg-[#F4F4F6] px-4 text-[15px] font-medium text-[#09090B] transition-colors hover:bg-black hover:font-semibold hover:text-white"
          >
            Our Work
          </a>

          {/* Case Studies */}
          <a
            href="/case-studies"
            onClick={() => setIsMobileOpen(false)}
            className="flex min-h-[46px] items-center rounded-2xl bg-[#F4F4F6] px-4 text-[15px] font-medium text-[#09090B] transition-colors hover:bg-black hover:font-semibold hover:text-white"
          >
            Case Studies
          </a>

          {/* brandit. Studio */}
          <a
            href="/studio"
            onClick={() => setIsMobileOpen(false)}
            className="flex min-h-[46px] items-center rounded-2xl bg-[#F4F4F6] px-4 text-[15px] font-medium text-[#09090B] transition-colors hover:bg-black hover:font-semibold hover:text-white"
          >
            brandit. Studio
          </a>

          {/* Careers */}
          <a
            href="/careers"
            onClick={() => setIsMobileOpen(false)}
            className="flex min-h-[46px] items-center rounded-2xl bg-[#F4F4F6] px-4 text-[15px] font-medium text-[#09090B] transition-colors hover:bg-black hover:font-semibold hover:text-white"
          >
            Careers
          </a>

          {/* Mobile CTA */}
          <a
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="mt-1 flex min-h-[50px] items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-5 text-[15px] font-semibold text-white transition-transform hover:bg-neutral-800"
          >
            <span>Get Started</span>
            <ArrowUpRight size={17} className="stroke-[2.5]" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
