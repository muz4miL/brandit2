"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Sparkles,
  ChevronRight,
  Star,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroButton } from "@/components/site/HeroButton";
import type { WorkProjectDoc, WorkPageSettingsDoc } from "@/server/types";

interface OurWorkClientProps {
  settings: WorkPageSettingsDoc;
  projects: WorkProjectDoc[];
}

export function OurWorkClient({ settings, projects }: OurWorkClientProps) {
  // Category filter state
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Video chassis play / mute state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Category list derived from projects and settings
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      p.categories?.forEach((c) => set.add(c));
    });

    const preferredOrder = ["Ecom", "Services", "SaaS"];
    const ordered: string[] = [];

    preferredOrder.forEach((c) => {
      if (set.has(c)) {
        ordered.push(c);
        set.delete(c);
      }
    });

    set.forEach((c) => ordered.push(c));
    return ["All", ...ordered];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.categories?.includes(activeCategory));
  }, [projects, activeCategory]);

  // Featured hero project (first featured or first project)
  const heroProject = useMemo(() => {
    return projects.find((p) => p.isFeatured) || projects[0] || null;
  }, [projects]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      void videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const faqs = settings.faqs && settings.faqs.length > 0 ? settings.faqs : [
    {
      question: "How does brandit. structure client engagements?",
      answer:
        "We operate as a dedicated growth and creative partner. Every partnership is bespoke—spanning sprint-based positioning transformations, ongoing performance ad management, or full-funnel digital infrastructure builds.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We partner primarily with fast-scaling E-Commerce brands, high-ticket Professional Services, SaaS platforms, and enterprise advisories looking for disciplined performance marketing and premium positioning.",
    },
    {
      question: "How quickly do we see measurable results?",
      answer:
        "Paid media and ad creative sprints go live within 10–14 days. Strategic positioning and full-scale web platforms typically deploy within 3–4 weeks, with live analytics and attributed pipeline tracking from day one.",
    },
    {
      question: "Do you create all creative and video in-house?",
      answer:
        "Yes. Everything from creative strategy, scriptwriting, and production to post-production and motion design is executed in-house by our dedicated creatives and editors.",
    },
  ];

  const capabilitiesList = settings.capabilitiesList && settings.capabilitiesList.length > 0
    ? settings.capabilitiesList
    : [
        { title: "Meta & Instagram Direct-Response Ads", category: "Paid Performance" },
        { title: "Google Search & High-Intent Shopping", category: "Paid Performance" },
        { title: "Performance Ad Creative & UGC Systems", category: "Creative Strategy" },
        { title: "Conversion Rate Optimization (CRO)", category: "Growth Systems" },
        { title: "Bespoke Web Design & Next.js Architecture", category: "Digital Engineering" },
        { title: "Full-Funnel Lifecycle Email & SMS Marketing", category: "Retention" },
        { title: "Executive Brand Identity & Design Systems", category: "Branding" },
        { title: "Enterprise Automation & Lead Pipelines", category: "Automation" },
      ];

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-white selection:text-black">
      <Header />

      <main className="relative flex flex-col pt-32 sm:pt-36 lg:pt-40">
        {/* Ambient Top Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[640px] w-full max-w-[1400px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.06] via-white/[0.01] to-transparent blur-[120px]"
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Exactly matches Defiant Studio screenshot)                */}
        {/* ========================================================================= */}
        <section
          aria-label="Our Work Hero"
          className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 text-center sm:px-6 lg:px-10"
        >
          {/* Top Brand Wordmark: brandit.® Work */}
          <div className="mb-4 sm:mb-6 flex items-center justify-center gap-1 select-none">
            <span className="font-display font-black text-2xl sm:text-3xl text-amber-300">
              brandit.
            </span>
            <span className="text-[10px] font-mono font-bold text-white/60 align-super -mt-2">
              ®
            </span>
            <span className="font-display font-semibold text-2xl sm:text-3xl text-white ml-0.5">
              Work
            </span>
          </div>

          {/* Monumental Headline: Exactly matches Defiant screenshot */}
          <h1 className="max-w-6xl text-center select-none">
            <span className="block font-display text-[clamp(54px,9.2vw,132px)] font-black leading-[0.92] tracking-[-0.04em] text-white">
              {settings.heroHeadingLine1 || "Where top brands"}
            </span>
            <span className="mt-1 sm:mt-2 block font-instrument text-[clamp(62px,10.4vw,146px)] font-normal italic leading-[0.92] tracking-tight text-white">
              {settings.heroHeadingLine2 || "come to create"}
            </span>
          </h1>

          {/* Bouncy Hero Button with Glowing Ring & b. badge positioned exactly like Defiant's */}
          <div className="mt-9 sm:mt-12 flex justify-center w-full">
            <HeroButton
              href={settings.heroCtaUrl || "/contact"}
              leftText="Book a"
              rightText="Discovery Call"
              className="max-w-[320px] sm:max-w-[360px]"
            />
          </div>

          {/* ========================================================================= */}
          {/* 2. FEATURED SHOWCASE CHASSIS (Video/Media Player matching Defiant)       */}
          {/* ========================================================================= */}
          <div className="mt-14 sm:mt-18 lg:mt-20 w-full">
            <div className="relative mx-auto w-full max-w-[1440px] xl:max-w-[1660px] overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] border border-white/10 bg-[#07070B] shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
              {/* Media viewport */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0A0A0E]">
                {heroProject?.mediaType === "video" || settings.heroVideoUrl ? (
                  <video
                    ref={videoRef}
                    src={settings.heroVideoUrl || heroProject?.heroMediaUrl}
                    poster={heroProject?.thumbnailUrl || "/images/work/work-identity-halo.jpg"}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={heroProject?.heroMediaUrl || "/images/work/work-identity-halo.jpg"}
                    alt={heroProject?.title || "brandit. featured showcase"}
                    fill
                    sizes="(max-width: 1440px) 100vw, 1660px"
                    priority
                    className="object-cover"
                  />
                )}

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                {/* Top overlay controls */}
                <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-auto">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/90">
                      FEATURED SHOWCASE
                    </span>
                  </div>

                  {/* Sound / Mute Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 backdrop-blur-md text-xs font-medium text-white transition-all hover:bg-black/80 hover:border-white/40 cursor-pointer"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span>{isMuted ? "Tap for sound" : "Sound on"}</span>
                  </button>
                </div>

                {/* Center Play/Pause button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="pointer-events-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-lg shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause size={24} className="fill-current" />
                    ) : (
                      <Play size={24} className="fill-current translate-x-0.5" />
                    )}
                  </button>
                </div>

                {/* Floating Bottom Project Bar */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 rounded-2xl border border-white/15 bg-black/70 p-4 sm:p-5 backdrop-blur-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                        {heroProject?.clientName || "Apex Strategic Advisory"}
                      </span>
                      <span className="text-white/30">·</span>
                      <span className="text-xs text-white/60">
                        {heroProject?.industry || "Management Consultancy"}
                      </span>
                    </div>
                    <h2 className="mt-1 font-display text-lg sm:text-2xl font-bold text-white leading-tight">
                      {heroProject?.title ||
                        "+184% qualified pipeline & $4.2M attributed enterprise revenue in 90 days"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    {heroProject?.results?.[0] && (
                      <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-right">
                        <span className="font-display text-lg sm:text-xl font-black text-emerald-400 block leading-none">
                          {heroProject.results[0].metric}
                        </span>
                        <span className="text-[10px] font-mono font-semibold uppercase text-emerald-300/80 mt-0.5 block">
                          {heroProject.results[0].label}
                        </span>
                      </div>
                    )}
                    {heroProject && (
                      <Link
                        href={`/our-work/${heroProject.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black shadow-lg transition-all hover:bg-white/90 shrink-0"
                      >
                        <span>View Project</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. EDITORIAL MANIFESTO / CLIENT QUOTE                                      */}
        {/* ========================================================================= */}
        <section
          aria-label="Editorial Endorsement"
          className="mx-auto my-24 sm:my-32 max-w-4xl px-6 text-center"
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-10 left-1/2 -translate-x-1/2 font-instrument text-7xl text-white/10 select-none pointer-events-none"
            >
              “
            </span>
            <blockquote className="font-sans text-[22px] sm:text-[32px] font-normal leading-relaxed text-white/90">
              “{settings.quoteText ||
                "Their superpower is combining scale and performance execution, unmatched by any agency I've worked with."}”
            </blockquote>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center">
            <span className="font-display text-base font-bold text-white">
              {settings.quoteAuthor || "Marcus Sterling"}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">
              {settings.quoteRole || "Senior Managing Partner"} ·{" "}
              {settings.quoteCompany || "Apex Strategic Advisory"}
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE SHOWCASE & CATEGORY FILTERS                                 */}
        {/* ========================================================================= */}
        <section
          id="showcase-grid"
          aria-label="Selected Work Systems"
          className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10"
        >
          {/* Section Heading matching Defiant */}
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-3xl">
              <span className="block font-display text-[clamp(34px,5.5vw,68px)] font-black tracking-[-0.03em] text-white leading-[1.02]">
                Everything you need
              </span>
              <span className="mt-1 block font-instrument text-[clamp(40px,6.8vw,82px)] font-normal italic text-white leading-[0.98]">
                in one System
              </span>
            </h2>

            {/* Category Filter Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                        : "border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-[#0B0B10] shadow-xl transition-all duration-300 hover:border-white/30 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              >
                {/* Media thumbnail */}
                <Link
                  href={`/our-work/${project.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 block"
                >
                  <Image
                    src={project.thumbnailUrl || project.heroMediaUrl}
                    alt={project.altText || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {project.categories?.[0] || project.industry}
                    </span>

                    {project.isFeatured && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/30 bg-black/60 text-amber-300 backdrop-blur-md">
                        <Star size={12} className="fill-current" />
                      </span>
                    )}
                  </div>

                  {/* Result metric pill pinned at bottom of thumbnail */}
                  {project.results?.[0] && (
                    <div className="absolute bottom-3 left-3 rounded-lg border border-emerald-400/30 bg-black/80 px-2.5 py-1 backdrop-blur-md">
                      <span className="font-display text-sm font-black text-emerald-400 leading-none">
                        {project.results[0].metric}
                      </span>
                      <span className="ml-1 text-[10px] font-mono text-white/70">
                        {project.results[0].label}
                      </span>
                    </div>
                  )}
                </Link>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/50 mb-1.5 font-mono">
                      <span>{project.clientName}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-white/90 leading-snug">
                      <Link href={`/our-work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-white/60 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.services?.slice(0, 2).map((srv) => (
                        <span
                          key={srv}
                          className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10.5px] font-mono text-white/60"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/our-work/${project.slug}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all group-hover:bg-white group-hover:text-black"
                      aria-label={`View ${project.clientName} case study`}
                    >
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. A STANDARD BUILT TO INSPIRE (Capabilities Matrix)                      */}
        {/* ========================================================================= */}
        <section
          aria-label="Capabilities Overview"
          className="mx-auto my-28 sm:my-36 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10"
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-2xl">
              <span className="block font-display text-[clamp(32px,5vw,64px)] font-black tracking-[-0.03em] text-white leading-tight">
                {settings.capabilitiesHeading || "A standard built to inspire."}
              </span>
              <span className="mt-1 block font-instrument text-[clamp(38px,6vw,74px)] font-normal italic text-white">
                to outperform.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/60">
              {settings.capabilitiesSubheading ||
                "From high-impact performance ads to full-scale enterprise digital experiences, we engineer every layer in-house."}
            </p>
          </div>

          {/* Clean 2-column checklist matching Defiant's "Gear up for Results" */}
          <div className="mt-14 sm:mt-18 mx-auto max-w-4xl">
            <div className="rounded-[28px] border border-white/10 bg-[#09090E] p-6 sm:p-10 shadow-2xl">
              <h3 className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold mb-6">
                ENGINEERED FOR MEASURABLE RESULTS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {capabilitiesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-white/[0.08]"
                  >
                    <span className="text-sm font-semibold text-white/90">
                      {item.title}
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {item.category || "Standard"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FREQUENTLY ASKED QUESTIONS (Defiant Accordion Style)                    */}
        {/* ========================================================================= */}
        <section
          aria-label="Frequently Asked Questions"
          className="mx-auto mb-28 sm:mb-36 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <h2>
              <span className="block font-display text-[clamp(32px,5vw,60px)] font-extrabold text-white tracking-tight">
                Frequently Asked
              </span>
              <span className="block font-instrument text-[clamp(38px,6vw,70px)] font-normal italic text-white mt-1">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#0A0A0F] overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 sm:p-7 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/[0.06] px-6 sm:px-7 pb-6 pt-3 text-sm sm:text-base leading-relaxed text-white/70">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CLOSING CTA (Ready to Scale?)                                           */}
        {/* ========================================================================= */}
        <section
          aria-label="Closing Call to Action"
          className="mx-auto mb-20 sm:mb-28 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10"
        >
          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] border border-white/15 bg-[#08080C] px-6 py-16 sm:py-24 text-center shadow-2xl">
            {/* Background Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[100px]"
            />

            <h2 className="font-display text-[clamp(40px,7vw,86px)] font-black tracking-[-0.03em] text-white leading-none">
              {settings.closingCtaHeadingLine1 || "Ready to"}{" "}
              <span className="font-instrument font-normal italic">
                {settings.closingCtaHeadingLine2 || "Scale?"}
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm sm:text-lg text-white/60 leading-relaxed">
              {settings.closingCtaCopy ||
                "Partner with a performance creative agency that builds high-converting systems engineered for serious growth."}
            </p>

            <div className="mt-8 sm:mt-10 flex justify-center">
              <Link
                href={settings.closingCtaDestination || "/contact"}
                className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white px-8 py-4 text-sm font-bold text-black shadow-2xl transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]"
              >
                <span>{settings.closingCtaButtonText || "Book a Strategy Call"}</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
