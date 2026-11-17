"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroButton } from "@/components/site/HeroButton";
import { WhoItsFor } from "@/components/site/WhoItsFor";
import ReadyToScale from "@/components/ReadyToScale";
import { OnboardingSection } from "@/components/services/onboarding/OnboardingSection";
import { HowItWorksSection } from "@/components/services/how-it-works/HowItWorksSection";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  X,
} from "lucide-react";
import {
  packageComparisonRows as defaultComparisonRows,
  canonicalServices,
  faqs as defaultFaqs,
} from "@/content/site";
import type { ServicesPageContent } from "@/server/types";

import serviceIdentity from "@/assets/service-identity.jpg";
import serviceSocial from "@/assets/service-social.jpg";
import serviceAds from "@/assets/service-ads.jpg";
import servicePackages from "@/assets/service-packages.jpg";
import rise from "@/assets/work-package-rise.jpg";
import zest from "@/assets/work-social-juice.jpg";

const serviceImageMap: Record<string, any> = {
  "marketing-consultancy": serviceIdentity,
  "website-design-dev": rise,
  "website-design-development": rise,
  "content-creation": serviceSocial,
  "social-media-marketing": zest,
  "seo": serviceAds,
  "email-marketing": servicePackages,
  "meta-ads": serviceAds,
  "google-ads": serviceIdentity,
  "tiktok-vertical-video": serviceSocial,
  "performance-creative": zest,
  "cro-landing-pages": rise,
  "email-sms": servicePackages,
  "web-design-development": rise,
  "branding-visual-direction": serviceIdentity,
};

// tiny scroll-reveal hook
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e && e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface ServicesContentProps {
  data?: ServicesPageContent;
}

export function ServicesContent({ data }: ServicesContentProps) {
  const [showComparison, setShowComparison] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const hero = data?.hero || {
    eyebrow: "SERVICES & PACKAGES",
    headingLine1: "Start where you are.",
    headingLineItalic: "Grow from there.",
    subCopy: "Strategy, websites, and content — packaged around your stage of growth.",
    ctaLeftText: "Book a",
    ctaRightText: "Free Strategy Call",
    ctaHref: "/contact",
    exploreLabel: "Explore packages",
    heroImageUrl: "/servicesHero.png",
  };

  const packages = data?.packages && data.packages.length > 0 ? data.packages : undefined;

  const comparisonRows =
    data?.comparisonRows && data.comparisonRows.length > 0
      ? data.comparisonRows
      : defaultComparisonRows;

  const rawProcessSteps = data?.processSteps && data.processSteps.length > 0 ? data.processSteps : undefined;
  const uniqueProcessSteps = rawProcessSteps
    ? Array.from(new Map(rawProcessSteps.map((s) => [s.title.toLowerCase().trim(), s])).values())
    : undefined;

  const processCopyMap: Record<string, string> = {
    "free strategy call": "30 minutes. We audit your marketing. Zero obligation.",
    "your plan": "One clear plan. Only the moves that matter.",
    "we build": "Dates locked. Kickoff done. We ship.",
  };

  const processSteps = uniqueProcessSteps?.map((ps, idx) => ({
    stepNumber: String(idx + 1).padStart(2, "0"),
    timeLabel: ps.timeLabel,
    title: ps.title,
    desc: processCopyMap[ps.title.toLowerCase().trim()] || ps.desc,
  }));

  const rawChecklist = data?.checklistItems && data.checklistItems.length > 0 ? data.checklistItems : undefined;
  const checklistCopyMap: Record<string, { title: string; desc: string }> = {
    "a plan behind every move": {
      title: "A plan behind every move",
      desc: "Everything ties to your goals.",
    },
    "strategy backed by data": {
      title: "Strategy backed by data",
      desc: "We research before we create.",
    },
    "strategy backed by business intelligence": {
      title: "Strategy backed by data",
      desc: "We research before we create.",
    },
    "plain-language reporting": {
      title: "Plain-language reporting",
      desc: "You always know what's working.",
    },
  };

  const checklistItems = rawChecklist
    ? Array.from(new Map(rawChecklist.map((c) => [c.title.toLowerCase().trim(), c])).values()).map((ci) => {
        const mapped = checklistCopyMap[ci.title.toLowerCase().trim()];
        return {
          title: mapped ? mapped.title : ci.title,
          desc: mapped ? mapped.desc : ci.desc,
        };
      })
    : undefined;

  const rawTimeline = data?.timelineSteps && data.timelineSteps.length > 0 ? data.timelineSteps : undefined;
  const timelineCopyMap: Record<string, { title: string; desc: string }> = {
    "welcome": { title: "Welcome", desc: "A named contact from hour one." },
    "first 48 hours": { title: "First 48 Hours", desc: "30 minutes. One action plan." },
    "kickoff call": { title: "Kickoff Call", desc: "Goals, timeline, deliverables. Locked." },
    "agreed response times": { title: "Kickoff Call", desc: "Goals, timeline, deliverables. Locked." },
    "live delivery": { title: "Live Delivery", desc: "Track progress in real time." },
    "progress you can see": { title: "Live Delivery", desc: "Track progress in real time." },
  };

  const timelineSteps = rawTimeline
    ? Array.from(new Map(rawTimeline.map((t) => [`${t.title.toLowerCase().trim()}-${t.dayLabel.toLowerCase().trim()}`, t])).values()).map((ts) => {
        const mapped = timelineCopyMap[ts.title.toLowerCase().trim()];
        return {
          dayLabel: ts.dayLabel,
          title: mapped ? mapped.title : ts.title,
          desc: mapped ? mapped.desc : ts.desc,
        };
      })
    : undefined;

  const coreServices =
    data?.coreServices && data.coreServices.length > 0
      ? data.coreServices.map((cs) => ({
          id: cs.slug,
          slug: cs.slug,
          title: cs.title,
          serifLine: cs.serifLine || "",
          includedIn: cs.includedIn,
          summary: cs.summary,
          bullets: cs.bullets,
          imageUrl: cs.imageUrl,
          imageAlt: cs.imageAlt || cs.title,
          enquireHref: cs.enquireHref || `/contact?service=${cs.slug}`,
        }))
      : canonicalServices.map((ds) => ({
          id: ds.id,
          slug: ds.slug,
          title: ds.title,
          serifLine: ds.serifLine,
          includedIn: "Kickstart · Accelerate · Authority",
          summary: ds.summary,
          bullets: ds.bullets,
          imageUrl: "",
          imageAlt: `${ds.title} ${ds.serifLine}`,
          enquireHref: ds.enquireHref,
        }));

  const faqs =
    data?.faqs && data.faqs.length > 0
      ? data.faqs.map((f) => ({
          q: f.question,
          a: f.answer,
        }))
      : defaultFaqs;

  const [selectedServiceSlug, setSelectedServiceSlug] = useState(coreServices[0]?.slug || "");

  const [heroEntered, setHeroEntered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const servicesReveal = useReveal();
  const faqReveal = useReveal();

  useEffect(() => {
    const syncServiceFromHash = () => {
      const requestedSlug = window.location.hash.slice(1);
      if (coreServices.some((service) => service.slug === requestedSlug)) {
        setSelectedServiceSlug(requestedSlug);
        window.setTimeout(() => {
          document.getElementById("all-services")?.scrollIntoView({ block: "start" });
        }, 0);
      }
    };

    syncServiceFromHash();
    window.addEventListener("hashchange", syncServiceFromHash);
    return () => window.removeEventListener("hashchange", syncServiceFromHash);
  }, [coreServices]);

  const selectedService =
    coreServices.find((service) => service.slug === selectedServiceSlug) || coreServices[0];
  const selectedServiceIndex = Math.max(
    0,
    coreServices.findIndex((service) => service.slug === selectedService?.slug),
  );
  const selectService = (slug: string) => {
    setSelectedServiceSlug(slug);
    window.history.pushState(null, "", `/services#${slug}`);
  };
  const cycleService = (direction: -1 | 1) => {
    const nextIndex = (selectedServiceIndex + direction + coreServices.length) % coreServices.length;
    const next = coreServices[nextIndex];
    if (next) selectService(next.slug);
  };

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setHeroEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const image = heroImageRef.current;
        if (!image) return;
        const progress = Math.max(-1, Math.min(1, -image.getBoundingClientRect().top / window.innerHeight));
        image.style.setProperty("--hero-parallax-y", `${progress * 28}px`);
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-fg selection:text-bg">
      <Header />
      <main className="flex flex-col">

        {/* 1. CINEMATIC HERO */}
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 md:px-6 pt-2 pb-4">
          <section
            ref={heroRef}
            id="services-hero"
            aria-label="Services & Packages Hero"
            className="services-hero-panel relative mx-auto flex min-h-[520px] w-full select-none flex-col items-center justify-center overflow-hidden rounded-[36px] border border-line bg-panel px-4 py-14 text-center shadow-2xl sm:rounded-[44px] sm:px-6 sm:py-16 md:rounded-[52px] md:px-8 lg:h-[calc(100vh-180px)] lg:min-h-[580px] lg:max-h-[640px]"
          >
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <picture>
                <img
                  ref={heroImageRef}
                  src="/servicesHero.png"
                  alt=""
                  aria-hidden="true"
                  className={`services-hero-art h-[calc(100%+56px)] -translate-y-7 w-full object-cover object-center transition-transform duration-1000 ease-out will-change-transform motion-reduce:transform-none ${heroEntered ? "scale-100" : "scale-105"}`}
                  loading="eager"
                />
              </picture>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-panel/80 via-panel/35 to-panel/90" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--panel)_90%)] opacity-70" />
              <div aria-hidden="true" className="services-hero-grain absolute inset-0 z-10 mix-blend-overlay opacity-[0.05]" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-4xl">
              <div
                style={{ transitionDelay: heroEntered ? "0ms" : "0ms" }}
                className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-4 py-1.5 backdrop-blur-md transition-all duration-700 ease-out ${heroEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-fg/80 sm:text-[12px]">
                  {hero.eyebrow}
                </span>
              </div>

              <h1
                style={{ transitionDelay: heroEntered ? "80ms" : "0ms" }}
                className={`mt-4 select-none font-display text-[clamp(40px,5.8vw,86px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-fg transition-all duration-700 ease-out sm:mt-5 ${heroEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <span className="block">{hero.headingLine1}</span>
                <span className="mt-0.5 block font-serif font-normal italic tracking-[-0.025em] text-fg/75">
                  {hero.headingLineItalic}
                </span>
              </h1>

              <p
                style={{ transitionDelay: heroEntered ? "160ms" : "0ms" }}
                className={`mt-3 max-w-[600px] font-sans text-[15px] leading-relaxed text-muted-foreground transition-all duration-700 ease-out sm:mt-4 sm:text-[17px] ${heroEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                {hero.subCopy}
              </p>

              <div
                style={{ transitionDelay: heroEntered ? "240ms" : "0ms" }}
                className={`mt-7 sm:mt-8 flex flex-col items-center gap-5 w-full transition-all duration-700 ease-out ${heroEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <HeroButton
                  href={hero.ctaHref || "/contact"}
                  leftText={hero.ctaLeftText || "Book a"}
                  rightText={hero.ctaRightText || "Free Strategy Call"}
                  ariaLabel={`${hero.ctaLeftText} ${hero.ctaRightText}`}
                />
                <a
                  href="#packages"
                  className="group inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:text-fg"
                >
                  <span>{hero.exploreLabel || "Explore packages"}</span>
                  <ChevronDown size={13} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-muted-foreground sm:flex">
              <span>Scroll</span>
              <span className="h-8 w-px origin-top animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
            </div>
          </section>
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 pt-5 text-center sm:flex-row sm:justify-between sm:gap-6 sm:pt-6">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Built for ambitious teams
            </span>
            <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:gap-7">
              <span>Strategy</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>Identity</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>Digital</span>
            </div>
          </div>
        </div>

        {/* 2. THE THREE PACKAGES */}
        <WhoItsFor
          id="packages"
          packagesData={packages as any}
          onCompareClick={() => setShowComparison((s) => !s)}
        >
          {/* Collapsible comparison matrix inside packages section */}
          <div className="mt-8">
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShowComparison((s) => !s)}
                aria-expanded={showComparison}
                aria-controls="comparison-matrix"
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface-2 px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:border-fg/30 hover:text-fg"
              >
                <span>{showComparison ? "Hide" : "Show"} Full 24-Point Deliverables Comparison</span>
                <ChevronDown size={14} className={`text-fg transition-transform duration-300 ${showComparison ? "rotate-180" : ""}`} />
              </button>
            </div>

            {showComparison && (
              <div id="comparison-matrix" className="mt-6 animate-in fade-in duration-300 overflow-x-auto rounded-2xl border border-line bg-surface">
                <table className="w-full text-left text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="px-5 py-3.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Feature</th>
                      <th className="px-5 py-3.5 font-display text-[13px] font-bold text-fg">Kickstart</th>
                      <th className="border-x border-line bg-surface-2 px-5 py-3.5 font-display text-[13px] font-bold text-fg">Accelerate</th>
                      <th className="px-5 py-3.5 font-display text-[13px] font-bold text-fg">Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {comparisonRows.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-transparent" : "bg-surface-2/40"}>
                        <td className="px-5 py-3.5 text-[12px] font-semibold text-fg">{row.feature}</td>
                        <td className="px-5 py-3.5 text-[12px] text-muted-foreground">{row.kickstart}</td>
                        <td className="border-x border-line bg-surface-2 px-5 py-3.5 text-[12px] text-fg">{row.accelerate}</td>
                        <td className="px-5 py-3.5 text-[12px] text-muted-foreground">{row.authority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </WhoItsFor>

        {/* 3. HOW IT WORKS */}
        <HowItWorksSection steps={processSteps} />

        {/* 3.5 CLIENT ONBOARDING */}
        <OnboardingSection checklistItems={checklistItems} timelineSteps={timelineSteps} />

        {/* 4. EIGHT-SERVICE EXPLORER */}
        <section
          id="all-services"
          ref={servicesReveal.ref as React.RefObject<HTMLElement>}
          className="scroll-mt-24 bg-bg py-24 md:py-32"
        >
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
            <div className={`mb-10 flex flex-col gap-4 transition-all duration-700 sm:flex-row sm:items-end sm:justify-between ${servicesReveal.visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Capabilities</span>
                <h2 className="mt-3 font-display text-[clamp(28px,3.8vw,48px)] font-extrabold leading-tight tracking-[-0.04em] text-fg">
                  Everything you need to{" "}
                  <span className="font-serif font-normal italic text-muted-foreground">move forward.</span>
                </h2>
              </div>
              <p className="max-w-sm text-[14px] leading-relaxed text-muted-foreground sm:text-right">
                Pick one focused service or combine the system around your stage of growth.
              </p>
            </div>

            <div className="no-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-3">
              {coreServices.map((svc, index) => (
                <button
                  key={svc.slug}
                  type="button"
                  onClick={() => selectService(svc.slug)}
                  aria-pressed={selectedService?.slug === svc.slug}
                  className={`shrink-0 snap-start rounded-full border px-4 py-2.5 text-left text-[13px] font-semibold transition-colors ${
                    selectedService?.slug === svc.slug
                      ? "border-fg bg-fg text-bg"
                      : "border-line bg-surface-2 text-muted-foreground hover:text-fg"
                  }`}
                >
                  <span className="mr-1 font-mono text-[10px]">{String(index + 1).padStart(2, "0")}</span>
                  {svc.title} {svc.serifLine}
                </button>
              ))}
            </div>

            {selectedService && (
              <div className="mt-3 grid min-h-[420px] overflow-hidden rounded-[24px] border border-line bg-surface shadow-2xl lg:grid-cols-[55%_45%]">
                <div className="order-2 flex flex-col justify-between p-6 sm:p-10 lg:order-1">
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      SERVICE {String(selectedServiceIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 max-w-xl font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-fg">
                      {selectedService.title}{" "}
                      <span className="font-serif font-normal italic text-muted-foreground">{selectedService.serifLine}</span>
                    </h3>
                    <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-muted-foreground">
                      {selectedService.summary}
                    </p>
                    <ul className="mt-7 grid gap-3">
                      {selectedService.bullets.slice(0, 4).map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-[14px] text-fg">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={selectedService.enquireHref || `/contact?service=${selectedService.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-[13px] font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                    >
                      Enquire about this service <ArrowUpRight size={15} />
                    </a>
                    <div className="flex items-center gap-2">
                      <button type="button" aria-label="Previous service" onClick={() => cycleService(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg hover:bg-surface-2"><ChevronRight className="rotate-180" size={17} /></button>
                      <button type="button" aria-label="Next service" onClick={() => cycleService(1)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg hover:bg-surface-2"><ChevronRight size={17} /></button>
                    </div>
                  </div>
                </div>
                <div className="relative order-1 min-h-[250px] bg-surface-2 lg:order-2 lg:min-h-full">
                  {(() => {
                    const fallbackImg = serviceImageMap[selectedService.slug] || serviceIdentity;
                    const imgSrc = selectedService.imageUrl?.trim() ? selectedService.imageUrl : fallbackImg;
                    return typeof imgSrc === "string" ? (
                      <img src={imgSrc} alt={selectedService.imageAlt || selectedService.title} className="h-full w-full object-cover" />
                    ) : (
                      <Image src={imgSrc} alt={selectedService.imageAlt || selectedService.title} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-surface-2 px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 max-w-2xl">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Why brandit.</span>
              <h2 className="mt-3 font-display text-[clamp(30px,4vw,52px)] font-extrabold leading-tight tracking-[-0.04em] text-fg">
                A sharper alternative to{" "}
                <span className="font-serif font-normal italic text-muted-foreground">fragmented growth.</span>
              </h2>
            </div>
            <div className="overflow-x-auto rounded-[20px] border border-line bg-surface">
              <table className="min-w-[700px] w-full text-left text-[14px]">
                <thead>
                  <tr className="border-b border-line">
                    <th className="sticky left-0 bg-surface p-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Value</th>
                    <th className="bg-surface-2 p-4 font-display text-[18px] font-bold text-fg">brandit.</th>
                    <th className="p-4 font-semibold text-muted-foreground">Traditional agency</th>
                    <th className="p-4 font-semibold text-muted-foreground">In-house</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {comparisonRows.slice(0, 6).map((row) => (
                    <tr key={row.feature}>
                      <th className="sticky left-0 bg-surface p-4 font-semibold text-fg">{row.feature}</th>
                      <td className="bg-surface-2 p-4"><CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /></td>
                      <td className="p-4 text-muted-foreground"><span className="sr-only">{row.kickstart}</span><X className="h-5 w-5" /></td>
                      <td className="p-4 text-muted-foreground"><span className="sr-only">{row.authority}</span><X className="h-5 w-5" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section aria-label="Trusted by ambitious brands" className="overflow-hidden border-y border-line bg-bg py-8">
          <div className="mx-auto flex max-w-[1240px] items-center gap-8 px-4 sm:px-6">
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Trusted by ambitious brands
            </span>
            <div className="services-logo-marquee min-w-0 overflow-hidden">
              <div className="services-logo-track flex min-w-max items-center gap-10 text-[14px] font-display font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {["APEX", "VOLTEX", "PULSE", "RIVET", "LUMEN", "VOYARA", "APEX", "VOLTEX", "PULSE", "RIVET", "LUMEN", "VOYARA"].map((brand, index) => (
                  <span key={`${brand}-${index}`}>{brand}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQS */}
        <section
          id="faq"
          ref={faqReveal.ref as React.RefObject<HTMLElement>}
          className="border-t border-line bg-surface-2 py-24 md:py-32"
        >
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className={`lg:col-span-4 transition-all duration-700 ${faqReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">FAQ</span>
                <h2 className="mt-3 font-display text-[clamp(26px,3vw,38px)] font-extrabold leading-tight tracking-[-0.04em] text-fg">
                  Common questions before booking
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  Have a different question? Ask it directly on your free 30-minute strategy call.
                </p>
                <div className="mt-6">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-fg transition-colors hover:text-muted-foreground"
                  >
                    Ask a question directly <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-8">
                {(() => {
                  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 5);
                  return (
                    <>
                      <div className="divide-y divide-line">
                        {visibleFaqs.map((item, i) => {
                          const isOpen = openFaq === i;
                          return (
                            <div key={i}>
                              <button
                                type="button"
                                onClick={() => setOpenFaq(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                className="w-full flex items-start justify-between py-5 text-left gap-4 cursor-pointer group"
                              >
                                <span className="font-display text-[15px] font-bold leading-snug text-fg transition-colors group-hover:text-muted-foreground sm:text-[16px]">
                                  {item.q}
                                </span>
                                <span className="mt-0.5 shrink-0 text-muted-foreground transition-colors group-hover:text-fg">
                                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                </span>
                              </button>
                              {isOpen && (
                                <div className="animate-in pb-5 text-[14px] leading-relaxed text-muted-foreground fade-in duration-200">
                                  {item.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {faqs.length > 5 && (
                        <div className="pt-6">
                          <button
                            type="button"
                            onClick={() => setShowAllFaqs((prev) => !prev)}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:border-fg/30 hover:bg-surface-2 hover:text-fg"
                          >
                            <span>
                              {showAllFaqs ? "Show fewer questions" : `View all ${faqs.length} questions`}
                            </span>
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-200 ${showAllFaqs ? "rotate-180 text-fg" : "text-muted-foreground"}`}
                            />
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA: Ready to Scale */}
        <ReadyToScale />

      </main>
      <Footer />
    </div>
  );
}
