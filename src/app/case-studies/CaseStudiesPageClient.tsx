"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WorkClosingCta } from "@/components/work/WorkClosingCta";
import type { WorkProjectDoc, WorkPageSettingsDoc } from "@/server/types";

interface CaseStudiesPageClientProps {
  settings: WorkPageSettingsDoc;
  projects: WorkProjectDoc[];
}

export function CaseStudiesPageClient({
  settings,
  projects,
}: CaseStudiesPageClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Filter categories that have at least 1 published case study
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      p.categories?.forEach((c) => cats.add(c));
    });

    // Desired display priority: Ecom, Services, SaaS, followed by any other
    const preferredOrder = ["Ecom", "Services", "SaaS"];
    const ordered: string[] = [];

    preferredOrder.forEach((cat) => {
      if (cats.has(cat)) {
        ordered.push(cat);
        cats.delete(cat);
      }
    });

    cats.forEach((cat) => ordered.push(cat));

    return ["All", ...ordered];
  }, [projects]);

  // Live client-side filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.categories?.includes(activeCategory));
  }, [projects, activeCategory]);

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-fg selection:text-bg transition-colors duration-200">
      <Header />

      <main className="flex flex-col">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section
          aria-label="Case Studies Hero"
          className="case-studies-hero relative flex min-h-[388px] items-center justify-center rounded-[36px] border border-line bg-surface px-4 py-12 text-center sm:rounded-[42px] sm:px-6"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col items-center">
            {/* Centered small "b." brand mark (~40px) */}
            <div className="mb-10 flex items-center justify-center sm:mb-11">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-line bg-surface-2 shadow-[0_0_24px_rgba(255,255,255,0.04)]">
                <span className="font-display text-[23px] font-extrabold leading-none tracking-tighter text-fg">
                  b<span className="opacity-60">.</span>
                </span>
              </div>
            </div>

            {/* H1: "Case Studies" — "Case" in 800 grotesk, "Studies" in italic serif */}
            <h1 className="font-display text-[clamp(56px,8vw,112px)] leading-[0.92] tracking-[-0.03em] text-fg">
              <span className="font-[800]">Case </span>
              <span className="font-instrument italic font-normal tracking-[-0.01em]">
                Studies
              </span>
            </h1>

            {/* Subcopy: 16px, muted, max-width 480px */}
            <p className="mx-auto mt-8 max-w-[480px] text-[16px] font-normal leading-relaxed text-muted-foreground">
              Learn more about the tactics that grew our clients&apos; brands.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FILTER PILLS                                                           */}
        {/* ========================================================================= */}
        <section
          aria-label="Case Study Filters"
          className="case-studies-filter-band rounded-t-[36px] border-x border-t border-line bg-surface-2 px-4 pb-3 pt-6 sm:rounded-t-[42px] sm:px-6 sm:pt-7"
        >
          <div className="mx-auto max-w-[1280px]">
            {/* Mobile: horizontal scroll row with edge fades | Desktop: centered */}
            <div className="relative">
              {/* Left/Right subtle edge gradient fades on mobile */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-bg to-transparent z-10 md:hidden" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-bg to-transparent z-10 md:hidden" />

              <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-1 px-2">
                {availableCategories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`h-[40px] px-6 rounded-full text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-md"
                          : "border border-line bg-surface text-muted-foreground hover:border-fg/30 hover:text-fg"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CASE STUDIES GRID                                                      */}
        {/* ========================================================================= */}
        <section
          aria-label="Case Studies Showcase"
          className="case-studies-grid-band bg-surface-2 px-4 pb-24 pt-0 sm:px-6 sm:pb-32"
        >
          <div className="mx-auto max-w-[1280px]">
            {filteredProjects.length === 0 ? (
              /* 5. Empty filter state */
              <div className="py-20 text-center rounded-[24px] border border-line bg-surface px-6 max-w-xl mx-auto shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface-2 text-muted-foreground">
                  <span className="font-display font-bold text-lg">0</span>
                </div>
                <h3 className="font-display text-xl font-bold text-fg mb-2">
                  No case studies found
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  There are no published case studies matching &ldquo;{activeCategory}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className="inline-flex h-[40px] items-center justify-center px-6 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  View all cases
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProjects.map((project) => (
                    <motion.article
                      key={project.slug}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="group flex flex-col justify-between rounded-[16px] bg-surface border border-line p-4 sm:p-6 transition-all duration-300 hover:border-fg/30 hover:shadow-md"
                    >
                      {/* Top Anatomy: Client logo/wordmark (~28px tall) */}
                      <div>
                        <div className="h-[28px] flex items-center mb-4">
                          <span className="font-display text-lg font-bold tracking-tight text-fg uppercase opacity-95">
                            {project.clientName}
                          </span>
                        </div>

                        {/* Metric-led headline: 20px/1.3, weight 700, white/ink, min-height 3 lines */}
                        <h2 className="font-display text-[20px] leading-[1.3] font-bold text-fg min-h-[4rem] sm:min-h-[4.8rem] line-clamp-3 mb-5">
                          {project.title}
                        </h2>

                        {/* Cover image: aspect 16/10, object-cover, radius 12px, hover scale 1.04 */}
                        <Link
                          href={`/case-studies/${project.slug}${activeCategory !== "All" ? `?fromCategory=${encodeURIComponent(activeCategory)}` : ""}`}
                          className="block relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-surface-2 mb-5 border border-line"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <Image
                            src={project.thumbnailUrl}
                            alt={project.altText || `${project.clientName} case study`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />
                        </Link>
                      </div>

                      {/* Bottom: full-width "Read More ↗" button, 44px tall, radius 10px, 1px border */}
                      <Link
                        href={`/case-studies/${project.slug}${activeCategory !== "All" ? `?fromCategory=${encodeURIComponent(activeCategory)}` : ""}`}
                        className="group/btn mt-auto flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border border-line bg-surface-2 text-sm font-semibold text-fg transition-all duration-200 hover:bg-surface hover:border-fg/20"
                      >
                        <span>Read More</span>
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FINAL CTA ("Your brand. Our next masterpiece.")                        */}
        {/* ========================================================================= */}
        <WorkClosingCta settings={settings} />
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <Footer />
    </div>
  );
}
