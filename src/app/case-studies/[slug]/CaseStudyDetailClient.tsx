"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Quote } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CaseStudyBlocksRenderer } from "@/components/work/CaseStudyBlocksRenderer";
import { WorkClosingCta } from "@/components/work/WorkClosingCta";
import type { WorkProjectDoc } from "@/server/types";

interface CaseStudyClientProps {
  project: WorkProjectDoc;
  nextProject: WorkProjectDoc | null;
  isPreview?: boolean;
}

export function CaseStudyDetailClient({
  project,
  nextProject,
  isPreview = false,
}: CaseStudyClientProps) {
  const searchParams = useSearchParams();
  const fromCategory = searchParams.get("fromCategory");
  const backHref = fromCategory
    ? `/case-studies?category=${encodeURIComponent(fromCategory)}`
    : "/case-studies";

  const [activeSection, setActiveSection] = useState<string>("challenge");

  // Determine which sections actually exist in data
  const hasChallenge = Boolean(project.challenge?.trim());
  const hasApproach = Boolean(project.approach?.trim());
  const hasResults = Boolean(project.results && project.results.length > 0);
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const hasTestimonial = Boolean(project.testimonial?.quote?.trim());

  // Available sections for the sticky sub-navigation
  const navSections = [
    hasChallenge ? { id: "challenge", label: "01. The Challenge" } : null,
    hasApproach ? { id: "approach", label: "02. Our Approach" } : null,
    hasResults ? { id: "results", label: "03. Measured Results" } : null,
    hasGallery ? { id: "gallery", label: "04. Gallery" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  // Scroll spy to highlight active section in sticky nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navSections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-fg selection:text-bg">
      <Header />

      {/* Admin Preview Mode Indicator */}
      {isPreview && (
        <div className="bg-primary px-4 py-2 text-center text-xs font-bold text-primary-foreground tracking-wider uppercase">
          ADMIN PREVIEW MODE — THIS VERSION IS NOT INDEXED BY SEARCH ENGINES
        </div>
      )}

      <main className="flex flex-col">
        {/* ========================================================================= */}
        {/* 1. TOP BREADCRUMB & METADATA BAR                                         */}
        {/* ========================================================================= */}
        <section aria-label="Navigation & Breadcrumb" className="pt-32 sm:pt-36 pb-6 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-[1280px] flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            {/* Back link "← All Case Studies" preserving filter state */}
            <Link
              href={backHref}
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-fg transition-colors"
            >
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
              <span>← All Case Studies</span>
            </Link>

            {/* Client logo / wordmark + Category tag + Year */}
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="font-display font-bold uppercase tracking-tight text-fg">
                {project.clientName}
              </span>
              <span className="text-muted/60">•</span>
              {project.categories && project.categories.length > 0 && (
                <span className="rounded-full border border-line bg-surface-2 px-3 py-0.5 font-mono text-[11px] font-semibold text-muted">
                  {project.categories.join(", ")}
                </span>
              )}
              {project.year && (
                <>
                  <span className="text-muted/60">•</span>
                  <span className="font-mono text-muted">{project.year}</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. HERO HEADLINE & SUMMARY                                               */}
        {/* ========================================================================= */}
        <section aria-label="Case Study Header" className="pt-4 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-[1280px]">
            {/* Metric headline (grotesk + italic-serif mix) */}
            <h1 className="font-display text-[clamp(32px,5.5vw,72px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-fg max-w-5xl">
              {project.title.split("&").map((part, index, arr) => (
                <span key={index}>
                  {index > 0 && <span className="font-serif italic font-normal text-muted px-2">&</span>}
                  {part}
                </span>
              ))}
            </h1>

            {/* One-line summary */}
            {project.summary && (
              <p className="mt-6 text-[17px] sm:text-[20px] text-muted leading-relaxed max-w-3xl font-normal">
                {project.summary}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FULL-WIDTH COVER IMAGE (radius 16px)                                  */}
        {/* ========================================================================= */}
        <section aria-label="Case Study Cover" className="pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[16px] border border-line bg-surface shadow-2xl">
              {project.mediaType === "video" ? (
                <video
                  src={project.heroMediaUrl}
                  poster={project.posterUrl || project.thumbnailUrl}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={project.heroMediaUrl || project.thumbnailUrl}
                  alt={project.altText || project.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. KPI BAND: 3-4 STATS FROM PROJECT DATA                                 */}
        {/* ========================================================================= */}
        {hasResults && (
          <section aria-label="KPI Band" className="pb-16 sm:pb-24 px-4 sm:px-6 md:px-8">
            <div className="mx-auto max-w-[1280px]">
              <div className="rounded-[16px] border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-line">
                  {project.results.map((stat, idx) => (
                    <div key={idx} className={idx > 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""}>
                      <span className="block font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-fg">
                        {stat.metric}
                      </span>
                      <span className="block font-display text-sm sm:text-base font-bold text-fg/90 mt-2">
                        {stat.label}
                      </span>
                      {stat.context && (
                        <span className="block font-mono text-xs text-muted mt-1">
                          {stat.context}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 5. CHALLENGE / APPROACH / RESULTS: STICKY LEFT COLUMN + SCROLLING RIGHT   */}
        {/* ========================================================================= */}
        <section aria-label="Case Narrative" className="pb-20 sm:pb-32 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* STICKY LEFT COLUMN: Section Nav + Client Facts */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
                {/* Mobile / Desktop Section Nav */}
                {navSections.length > 0 && (
                  <div className="rounded-[16px] border border-line bg-surface p-5">
                    <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
                      TABLE OF CONTENTS
                    </span>
                    <nav className="flex lg:flex-col flex-wrap gap-2">
                      {navSections.map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => scrollToSection(sec.id)}
                          className={`text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                            activeSection === sec.id
                              ? "bg-primary text-primary-foreground font-bold shadow-sm"
                              : "text-muted hover:text-fg hover:bg-surface-2"
                          }`}
                        >
                          {sec.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Client Facts Card */}
                <div className="rounded-[16px] border border-line bg-surface p-5 space-y-4">
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
                    CLIENT FACTS
                  </span>
                  <div>
                    <span className="block text-xs text-muted font-mono">CLIENT</span>
                    <span className="block font-display font-semibold text-fg text-sm mt-0.5">
                      {project.clientName}
                    </span>
                  </div>
                  {project.industry && (
                    <div>
                      <span className="block text-xs text-muted font-mono">INDUSTRY</span>
                      <span className="block font-display font-semibold text-fg text-sm mt-0.5">
                        {project.industry}
                      </span>
                    </div>
                  )}
                  {project.services && project.services.length > 0 && (
                    <div>
                      <span className="block text-xs text-muted font-mono mb-1.5">CAPABILITIES</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.services.map((svc, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs font-mono text-muted"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.externalUrl && (
                    <div className="pt-2 border-t border-line">
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg hover:text-muted transition-colors"
                      >
                        <span>Visit Live Project</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </div>
              </aside>

              {/* SCROLLING RIGHT COLUMN: Rich narrative, challenge, approach, blocks */}
              <div className="lg:col-span-8 space-y-16 sm:space-y-20">
                {/* 01. The Challenge */}
                {hasChallenge && (
                  <div id="challenge" className="space-y-4 scroll-mt-28">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted block">
                      01. THE CHALLENGE
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-fg">
                      The Friction Point
                    </h2>
                    <p className="text-[16px] sm:text-[18px] text-muted leading-relaxed font-normal">
                      {project.challenge}
                    </p>
                  </div>
                )}

                {/* 02. Our Approach */}
                {hasApproach && (
                  <div id="approach" className="space-y-4 scroll-mt-28">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted block">
                      02. OUR APPROACH
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-fg">
                      The Purpose-Built Solution
                    </h2>
                    <p className="text-[16px] sm:text-[18px] text-muted leading-relaxed font-normal">
                      {project.approach}
                    </p>
                  </div>
                )}

                {/* Modular Case Study Blocks (Images, Splits, Videos) */}
                {hasBlocks && (
                  <div className="pt-4 border-t border-line">
                    <CaseStudyBlocksRenderer blocks={project.blocks} accentColor={project.accentColor} />
                  </div>
                )}

                {/* 03. Measured Results Details */}
                {hasResults && (
                  <div id="results" className="space-y-6 scroll-mt-28 pt-8 border-t border-line">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted block">
                      03. MEASURED RESULTS
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-fg">
                      Commercial Impact
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.results.map((r, i) => (
                        <div key={i} className="rounded-[14px] border border-line bg-surface p-5">
                          <span className="font-display text-3xl font-black text-fg">{r.metric}</span>
                          <span className="block font-display text-sm font-semibold text-fg/90 mt-1">{r.label}</span>
                          {r.context && (
                            <span className="block font-mono text-xs text-muted mt-0.5">{r.context}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 04. Optional Image Gallery */}
                {hasGallery && (
                  <div id="gallery" className="space-y-6 scroll-mt-28 pt-8 border-t border-line">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted block">
                      04. GALLERY
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.gallery!.map((img, i) => (
                        <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-line bg-surface-2">
                          <Image
                            src={img.url}
                            alt={img.altText || `${project.clientName} gallery image ${i + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                          {img.caption && (
                            <div className="absolute inset-x-0 bottom-0 bg-surface/80 backdrop-blur-sm p-3 text-xs text-muted">
                              {img.caption}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 05. Testimonial Block */}
                {hasTestimonial && (
                  <div className="rounded-[16px] border border-line bg-surface p-6 sm:p-8 relative overflow-hidden">
                    <Quote size={40} className="text-muted/20 absolute right-6 top-6" />
                    <p className="font-serif italic text-[18px] sm:text-[22px] leading-relaxed text-fg">
                      &ldquo;{project.testimonial!.quote}&rdquo;
                    </p>
                    <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                      <div>
                        <span className="block font-display font-bold text-fg text-sm">
                          {project.testimonial!.clientName}
                        </span>
                        <span className="block text-xs font-mono text-muted mt-0.5">
                          {project.testimonial!.clientTitle} • {project.testimonial!.companyName}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. "NEXT CASE STUDY" FOOTER CARD (CYCLES TO NEXT CASE)                   */}
        {/* ========================================================================= */}
        {nextProject && (
          <section aria-label="Next Case Study" className="pb-16 sm:pb-24 px-4 sm:px-6 md:px-8">
            <div className="mx-auto max-w-[1280px]">
              <Link
                href={`/case-studies/${nextProject.slug}${fromCategory ? `?fromCategory=${encodeURIComponent(fromCategory)}` : ""}`}
                className="group block rounded-[20px] border border-line bg-surface p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-fg/30 hover:bg-surface-2"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted block mb-2">
                      NEXT CASE STUDY →
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-fg group-hover:text-muted transition-colors">
                      {nextProject.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-xs sm:text-sm text-muted">
                      <span className="font-display font-semibold text-fg uppercase">{nextProject.clientName}</span>
                      <span>•</span>
                      <span>{nextProject.industry}</span>
                      {nextProject.year && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{nextProject.year}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-fg transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 7. EXISTING MASTERPIECE CTA                                              */}
        {/* ========================================================================= */}
        <WorkClosingCta />
      </main>

      {/* ========================================================================= */}
      {/* 8. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <Footer />
    </div>
  );
}
