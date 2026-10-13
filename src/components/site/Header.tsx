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

interface MegaServiceItem {
  id: string;
  sans: string;
  serif: string;
  image?: string;
  category: Category;
  targetId?: string;
  isFaq?: boolean;
}

const megaServices: MegaServiceItem[] = [
  {
    id: "identity",
    sans: "Brand",
    serif: "Identity",
    image: halo,
    category: "identity",
  },
  {
    id: "social",
    sans: "Social",
    serif: "Content",
    image: zest,
    category: "social",
  },
  {
    id: "ads",
    sans: "Ad",
    serif: "Campaigns",
    image: voltex,
    category: "ads",
  },
  {
    id: "packages",
    sans: "Full",
    serif: "Packages",
    image: rise,
    category: "packages",
  },
  {
    id: "packaging",
    sans: "Packaging",
    serif: "Design",
    image: skin,
    category: "packages",
  },
  {
    id: "apparel",
    sans: "Fitness &",
    serif: "Apparel",
    image: pulse,
    category: "identity",
  },
  {
    id: "performance",
    sans: "Performance",
    serif: "Ad Creative",
    image: voyara,
    category: "ads",
  },
  {
    id: "faq",
    sans: "FAQ",
    serif: "& Process",
    category: "packages",
    targetId: "services",
    isFaq: true,
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
          ? "border-b border-white/[0.08] bg-[#08080B]/80 backdrop-blur-[18px] is-scrolled"
          : "border-b border-transparent bg-[#08080B]",
      )}
    >
      <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(24px,3vw,56px)]">
        {/* Left: Brand It Logo */}
        <div className="flex items-center justify-self-start">
          <a
            href="#top"
            aria-label="the brandit. home"
            className="group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
          >
            <Wordmark className="text-[26px] min-[920px]:text-[32px]" />
          </a>
        </div>

        {/* Centre: Navigation Capsule */}
        <div className="hidden items-center justify-self-center min-[920px]:flex">
          <nav
            aria-label="Main navigation"
            className="relative inline-flex h-[66px] items-center gap-[8px] rounded-full bg-[#0D0D10] p-[9px] shadow-lg shadow-black/40"
          >
            {/* About Pill */}
            <a
              href="#about"
              className={cn(
                "flex h-[48px] items-center justify-center rounded-full px-6 text-[16px] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                activeSection === "about"
                  ? "bg-[#F3FF00] font-semibold text-[#0D0D10]"
                  : "bg-[#1B1B20] font-medium text-[#F5F5F5] hover:bg-[#F3FF00] hover:font-semibold hover:text-[#0D0D10]",
              )}
            >
              About
            </a>

            {/* Services Pill & Working Disclosure */}
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
                  "flex h-[48px] items-center justify-center gap-1.5 rounded-full px-6 text-[16px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  activeSection === "services" || isServicesOpen
                    ? "bg-[#F3FF00] font-semibold text-[#0D0D10]"
                    : "bg-[#1B1B20] font-medium text-[#F5F5F5] hover:bg-[#F3FF00] hover:font-semibold hover:text-[#0D0D10]",
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

            {/* Our Work Pill */}
            <a
              href="#work"
              className={cn(
                "flex h-[48px] items-center justify-center rounded-full px-6 text-[16px] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                activeSection === "work"
                  ? "bg-[#F3FF00] font-semibold text-[#0D0D10]"
                  : "bg-[#1B1B20] font-medium text-[#F5F5F5] hover:bg-[#F3FF00] hover:font-semibold hover:text-[#0D0D10]",
              )}
            >
              Our Work
            </a>
          </nav>
        </div>

        {/* Right: Main CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 justify-self-end">
          {/* Desktop Main CTA */}
          <a
            href="#contact"
            className="hidden h-[62px] min-w-[195px] items-center justify-center gap-2.5 rounded-full border-[2.5px] border-[#b8c200] bg-[#F3FF00] px-7 text-[16px] font-semibold text-[#0D0D10] select-none transition-all duration-150 hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-3 min-[920px]:inline-flex"
          >
            <span>Let’s talk</span>
            <ArrowUpRight size={18} className="stroke-[2.5]" aria-hidden="true" />
          </a>

          {/* Compact CTA on intermediate screens */}
          <a
            href="#contact"
            className="hidden h-[42px] items-center gap-1.5 rounded-full border-2 border-[#b8c200] bg-[#F3FF00] px-4 text-sm font-semibold text-[#0D0D10] transition-transform hover:brightness-105 min-[480px]:inline-flex min-[920px]:hidden"
          >
            <span>Let’s talk</span>
            <ArrowUpRight size={15} className="stroke-[2.5]" aria-hidden="true" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={mobileToggleRef}
            type="button"
            className="grid h-[44px] w-[44px] place-items-center rounded-full border border-white/10 bg-[#1B1B20] text-[#F5F5F5] transition-colors hover:bg-[#F3FF00] hover:text-[#0D0D10] focus-visible:outline-2 focus-visible:outline-primary min-[920px]:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMobileOpen((o) => !o)}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
          <div className="mx-auto max-w-[1440px] rounded-[28px] border border-white/10 bg-[#0D0D10] p-4 lg:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
              {/* Left Section: 8 Service Cards Grid (4 cols x 2 rows) */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {megaServices.map((item) => {
                  if (item.isFaq) {
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectMegaItem(item)}
                        className="group relative flex aspect-[1.35/1] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#17171C] p-4 text-left transition-all duration-200 hover:border-[#F3FF00]/40 hover:bg-[#1E1E26] focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display text-[19px] font-bold tracking-tight text-white group-hover:text-[#F3FF00] transition-colors">
                            {item.sans}
                          </span>
                          <span className="font-serif text-[17px] italic text-[#9E9EA8] group-hover:text-white transition-colors">
                            {item.serif}
                          </span>
                        </div>
                        <div className="mt-auto flex items-end justify-between">
                          <span className="font-display text-4xl font-extrabold tracking-tighter text-white/[0.08] select-none">
                            d.
                          </span>
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-white/60 transition-all group-hover:bg-[#F3FF00] group-hover:text-[#0D0D10]">
                            <ArrowUpRight size={16} />
                          </span>
                        </div>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectMegaItem(item)}
                      className="group relative aspect-[1.35/1] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141418] text-left transition-all duration-300 hover:border-[#F3FF00]/50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      {/* Background image preview */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                        />
                      )}
                      {/* Dark gradient overlay for pristine text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 transition-opacity group-hover:from-black/85 group-hover:via-black/35" />

                      {/* Content Header: Bold Sans + Italic Serif */}
                      <div className="relative z-10 flex h-full flex-col justify-between p-3.5 sm:p-4">
                        <div>
                          <div className="font-display text-[17px] sm:text-[19px] font-bold leading-tight tracking-tight text-white drop-shadow-sm">
                            {item.sans}
                          </div>
                          <div className="font-serif text-[16px] sm:text-[18px] italic leading-tight text-white/90 drop-shadow-sm group-hover:text-[#F3FF00] transition-colors">
                            {item.serif}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-all group-hover:bg-[#F3FF00] group-hover:text-[#0D0D10] group-hover:scale-105">
                            <ArrowUpRight size={14} className="stroke-[2.5]" />
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Section: Large Featured Showcase Card (Matching Defiant reference) */}
              <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#08080B] p-5 sm:p-6 lg:min-h-full">
                {/* Background decorative glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#F3FF00]/10 blur-3xl" />

                {/* Top Section: Google Rating Badge & Headline */}
                <div className="relative z-10">
                  {/* Google 4.9 Rating pill */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 backdrop-blur-md">
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
                <div className="relative my-3 flex items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#0E0E12]">
                  <img
                    src={featuredPhone}
                    alt="Brand It mobile experience preview"
                    className="max-h-[190px] w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#08080B] to-transparent" />
                </div>

                {/* Bottom: Partner Badges & Quick Action */}
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-3 text-[11px] text-[#9E9EA8]">
                    <span className="font-medium text-white/80">Meta Partner</span>
                    <span>•</span>
                    <span className="font-medium text-white/80">Shopify Plus</span>
                    <span>•</span>
                    <span className="font-medium text-white/80">Klaviyo Partner</span>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => setIsServicesOpen(false)}
                    className="flex h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[#b8c200] bg-[#F3FF00] font-semibold text-[#0D0D10] transition-transform hover:brightness-105"
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
          className="mx-3 mt-2 flex flex-col gap-2 rounded-3xl border border-white/10 bg-[#0D0D10] p-3.5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 min-[920px]:hidden"
        >
          {/* About */}
          <a
            href="#about"
            onClick={() => setIsMobileOpen(false)}
            className="flex min-h-[46px] items-center rounded-2xl bg-[#1B1B20] px-4 text-[15px] font-medium text-[#F5F5F5] transition-colors hover:bg-[#F3FF00] hover:font-semibold hover:text-[#0D0D10]"
          >
            About
          </a>

          {/* Services Accordion with rich previews */}
          <div className="flex flex-col rounded-2xl bg-[#1B1B20] overflow-hidden">
            <button
              type="button"
              className="flex min-h-[46px] w-full items-center justify-between px-4 text-[15px] font-medium text-[#F5F5F5] transition-colors hover:text-[#F3FF00]"
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
              <div className="grid grid-cols-2 gap-2 border-t border-white/[0.08] bg-[#141418] p-2.5">
                {megaServices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectMegaItem(item)}
                    className="relative aspect-[1.3/1] overflow-hidden rounded-xl border border-white/[0.08] bg-[#1B1B20] p-2.5 text-left"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/65" />
                    <div className="relative z-10 flex h-full flex-col justify-end">
                      <span className="text-xs font-bold text-white">{item.sans}</span>
                      <span className="font-serif text-[11px] italic text-[#F3FF00]">
                        {item.serif}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Our Work */}
          <a
            href="#work"
            onClick={() => setIsMobileOpen(false)}
            className="flex min-h-[46px] items-center rounded-2xl bg-[#1B1B20] px-4 text-[15px] font-medium text-[#F5F5F5] transition-colors hover:bg-[#F3FF00] hover:font-semibold hover:text-[#0D0D10]"
          >
            Our Work
          </a>

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={() => setIsMobileOpen(false)}
            className="mt-1 flex min-h-[50px] items-center justify-center gap-2 rounded-full border-2 border-[#b8c200] bg-[#F3FF00] px-5 text-[15px] font-semibold text-[#0D0D10] transition-transform hover:brightness-105"
          >
            <span>Let’s talk</span>
            <ArrowUpRight size={17} className="stroke-[2.5]" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
