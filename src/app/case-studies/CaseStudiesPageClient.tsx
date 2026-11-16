"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [activeCategory, setActiveCategory] = useState<string>("All");

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
    <div className="min-h-screen bg-[#070709] text-white selection:bg-white selection:text-black">
      <Header />

      <main className="flex flex-col">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section
          aria-label="Case Studies Hero"
          className="relative pt-36 sm:pt-40 md:pt-48 pb-12 sm:pb-16 text-center px-4 sm:px-6"
        >
          <div className="mx-auto max-w-[1280px] flex flex-col items-center">
            {/* Centered small "b." brand mark (~40px) */}
            <div className="mb-6 sm:mb-8 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.08)]">
                <span className="font-display font-extrabold text-[22px] leading-none text-white tracking-tighter">
                  b<span className="text-white/60">.</span>
                </span>
              </div>
            </div>

            {/* H1: "Case Studies" — "Case" in 800 grotesk, "Studies" in italic serif */}
            <h1 className="font-display text-[clamp(56px,8vw,112px)] leading-[0.92] tracking-[-0.03em] text-white">
              <span className="font-[800]">Case </span>
              <span className="font-serif italic font-normal tracking-[-0.01em] text-[#F5F5F7]">
                Studies
              </span>
            </h1>

            {/* Subcopy: 16px, muted, max-width 480px */}
            <p className="mt-6 text-[16px] text-neutral-400 max-w-[480px] leading-relaxed mx-auto font-normal">
              Learn more about the tactics that grew our clients&apos; brands.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FILTER PILLS                                                           */}
        {/* ========================================================================= */}
        <section
          aria-label="Case Study Filters"
          className="pb-12 sm:pb-16 px-4 sm:px-6"
        >
          <div className="mx-auto max-w-[1280px]">
            {/* Mobile: horizontal scroll row with edge fades | Desktop: centered */}
            <div className="relative">
              {/* Left/Right subtle edge gradient fades on mobile */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#070709] to-transparent z-10 md:hidden" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#070709] to-transparent z-10 md:hidden" />

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
                          ? "bg-white text-black font-semibold shadow-md shadow-black/40"
                          : "bg-white/[0.04] text-neutral-400 hover:text-white border border-[#232323] hover:border-white/30 hover:bg-white/[0.08]"
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
          className="pb-24 sm:pb-32 px-4 sm:px-6"
        >
          <div className="mx-auto max-w-[1280px]">
            {filteredProjects.length === 0 ? (
              /* 5. Empty filter state */
              <div className="py-20 text-center rounded-[24px] border border-[#232323] bg-[#0E0E12] px-6 max-w-xl mx-auto">
                <div className="mx-auto w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-400 mb-4">
                  <span className="font-display font-bold text-lg">0</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  No case studies found
                </h3>
                <p className="text-sm text-neutral-400 mb-6">
                  There are no published case studies matching &ldquo;{activeCategory}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className="inline-flex h-[40px] items-center justify-center px-6 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
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
                      className="group flex flex-col justify-between rounded-[16px] bg-[#0E0E12] border border-[#232323] p-4 sm:p-6 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
                    >
                      {/* Top Anatomy: Client logo/wordmark (~28px tall) */}
                      <div>
                        <div className="h-[28px] flex items-center mb-4">
                          <span className="font-display text-lg font-bold tracking-tight text-white uppercase opacity-95">
                            {project.clientName}
                          </span>
                        </div>

                        {/* Metric-led headline: 20px/1.3, weight 700, white, min-height 3 lines */}
                        <h2 className="font-display text-[20px] leading-[1.3] font-bold text-white min-h-[4rem] sm:min-h-[4.8rem] line-clamp-3 mb-5">
                          {project.title}
                        </h2>

                        {/* Cover image: aspect 16/10, object-cover, radius 12px, hover scale 1.04 */}
                        <Link
                          href={`/case-studies/${project.slug}`}
                          className="block relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-neutral-900 mb-5"
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
                        href={`/case-studies/${project.slug}`}
                        className="group/btn mt-auto flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#232323] bg-[#14141A] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1E1E26] hover:border-white/20"
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
        {/* 6. FINAL CTA ("Your brand. Our next masterpiece.")                        */}
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
