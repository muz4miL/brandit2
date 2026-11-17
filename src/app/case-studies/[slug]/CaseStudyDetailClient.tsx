"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CaseStudyBlocksRenderer } from "@/components/work/CaseStudyBlocksRenderer";
import { WorkClosingCta } from "@/components/work/WorkClosingCta";
import type { WorkProjectDoc } from "@/server/types";

/* Change this to wherever your "start a project" flow lives */
const CONTACT_HREF = "/contact";
const CTA_LABEL = "Start a project";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

interface CaseStudyClientProps {
  project: WorkProjectDoc;
  nextProject: WorkProjectDoc | null;
  isPreview?: boolean;
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

/** Counts the number inside a metric string ("+240%", "3.2x", "$1.2M", "12,000+") once, on view. */
function CountUp({ value, reduce }: { value: string; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const m = value.match(/^(\D*?)(\d[\d,]*\.?\d*)(.*)$/);
    if (!m) return;
    const prefix = m[1] ?? "";
    const num = m[2];
    const suffix = m[3] ?? "";
    if (!num) return;
    const target = parseFloat(num.replace(/,/g, ""));
    if (Number.isNaN(target)) return;
    const decimals = num.includes(".") ? (num.split(".")[1]?.length ?? 0) : 0;
    const grouped = num.includes(",");

    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) =>
        setText(
          prefix +
            v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
              useGrouping: grouped,
            }) +
            suffix,
        ),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{text}</span>;
}

/** Long copy collapses to 4 lines. Skimmers get the point, readers can expand. */
function Prose({ text, className = "" }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 260;
  return (
    <div>
      <p className={`whitespace-pre-line ${className} ${long && !open ? "line-clamp-4" : ""}`}>
        {text}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={`mt-3 text-sm font-semibold text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-fg ${focusRing}`}
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-fg">{children}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

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

  const reduce = useReducedMotion() ?? false;

  const results = (project.results ?? []).slice(0, 4);
  const gallery = project.gallery ?? [];
  const hasChallenge = Boolean(project.challenge?.trim());
  const hasApproach = Boolean(project.approach?.trim());
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);
  const hasTestimonial = Boolean(project.testimonial?.quote?.trim());
  const hasServices = Boolean(project.services && project.services.length > 0);
  const accent = project.accentColor || null;

  /* Cover parallax */
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  /* Floating CTA: shows after the hero, hides when the closing CTA is on screen */
  const [pastHero, setPastHero] = useState(false);
  const closingRef = useRef<HTMLDivElement>(null);
  const closingInView = useInView(closingRef, { margin: "0px 0px -20% 0px" });

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showPill = pastHero && !closingInView;

  /* The one orchestrated moment: hero stagger on load */
  const heroContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const statCols: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
  };

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-fg selection:text-bg">
      <Header />

      {isPreview && (
        <div className="bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground">
          Admin preview. This version is not indexed by search engines.
        </div>
      )}

      <main className="flex flex-col">
        {/* ============================================================ */}
        {/* HERO: who, what, so what, and the next step                  */}
        {/* ============================================================ */}
        <section aria-label="Case study header" className={`${WRAP} pt-32 sm:pt-36`}>
          <motion.div variants={heroContainer} initial={reduce ? false : "hidden"} animate="show">
            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm"
            >
              <Link
                href={backHref}
                className={`group inline-flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-fg ${focusRing}`}
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                All case studies
              </Link>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="font-display font-bold text-fg">{project.clientName}</span>
                {project.categories && project.categories.length > 0 && (
                  <span className="rounded-full border border-line px-3 py-0.5 text-xs font-medium text-muted-foreground">
                    {project.categories.join(", ")}
                  </span>
                )}
                {project.year && <span className="text-muted-foreground">{project.year}</span>}
              </div>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mt-10 max-w-5xl text-balance font-display text-[clamp(38px,6.4vw,92px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-fg sm:mt-14"
            >
              {project.title}
            </motion.h1>

            {project.summary && (
              <motion.p
                variants={heroItem}
                className="mt-6 max-w-2xl text-[18px] leading-relaxed text-muted-foreground sm:text-[21px]"
              >
                {project.summary}
              </motion.p>
            )}

            <motion.div variants={heroItem} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={CONTACT_HREF}
                className={`group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${focusRing}`}
              >
                {CTA_LABEL}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-fg transition-colors hover:bg-surface-2 ${focusRing}`}
                >
                  Visit live site
                  <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* COVER: parallax, per-project glow                            */}
        {/* ============================================================ */}
        <section aria-label="Cover" className={`${WRAP} relative mt-12 sm:mt-16`}>
          {accent && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 -top-10 h-3/4 opacity-25 blur-3xl"
              style={{
                background: `radial-gradient(60% 60% at 50% 0%, ${accent}, transparent 70%)`,
              }}
            />
          )}

          <div
            ref={coverRef}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-line bg-surface-2 md:aspect-[21/9]"
          >
            {project.mediaType === "video" ? (
              <video
                src={project.heroMediaUrl}
                poster={project.posterUrl || project.thumbnailUrl}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <motion.div
                className="absolute inset-[-8%]"
                style={{ y: reduce ? 0 : coverY }}
              >
                <Image
                  src={project.heroMediaUrl || project.thumbnailUrl}
                  alt={project.altText || project.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* RESULTS: the proof, right under the image                    */}
        {/* ============================================================ */}
        {results.length > 0 && (
          <section aria-label="Results" className={`${WRAP} mt-14 sm:mt-20`}>
            <div className="border-y border-line py-10 sm:py-14">
              <dl
                className={`grid grid-cols-2 gap-x-6 gap-y-10 lg:gap-x-0 lg:divide-x lg:divide-line ${
                  statCols[results.length] ?? "lg:grid-cols-4"
                }`}
              >
                {results.map((stat, i) => (
                  <div key={i} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                    <dd className="font-display text-[clamp(40px,5.2vw,76px)] font-black leading-none tracking-tight tabular-nums text-fg">
                      <CountUp value={stat.metric} reduce={reduce} />
                    </dd>
                    <dt className="mt-3 font-display text-sm font-bold text-fg sm:text-base">
                      {stat.label}
                    </dt>
                    {stat.context && (
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        {stat.context}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* STORY: short, skimmable, facts pinned on the side            */}
        {/* ============================================================ */}
        {(hasChallenge || hasApproach) && (
          <section aria-label="The story" className={`${WRAP} mt-16 sm:mt-24`}>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:sticky lg:top-28 lg:col-span-4">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-1">
                  <Fact label="Client">{project.clientName}</Fact>
                  {project.industry && <Fact label="Industry">{project.industry}</Fact>}
                  {project.year && <Fact label="Year">{project.year}</Fact>}
                  {hasServices && (
                    <div className="col-span-2 lg:col-span-1">
                      <dt className="text-xs text-muted-foreground">What we did</dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {project.services!.map((svc, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {svc}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </aside>

              <div className="lg:col-span-8">
                {hasChallenge && (
                  <div className="border-t border-line pt-6">
                    <h2 className="text-sm font-semibold text-muted-foreground">The problem</h2>
                    <div className="mt-4 max-w-2xl">
                      <Prose
                        text={project.challenge!}
                        className="text-[17px] leading-relaxed text-muted-foreground sm:text-[19px]"
                      />
                    </div>
                  </div>
                )}

                {hasApproach && (
                  <div className={`border-t border-line pt-6 ${hasChallenge ? "mt-12" : ""}`}>
                    <h2 className="text-sm font-semibold text-muted-foreground">What we built</h2>
                    <div className="mt-4 max-w-2xl">
                      <Prose
                        text={project.approach!}
                        className="font-display text-[20px] font-medium leading-snug text-fg sm:text-[26px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* VISUAL BLOCKS: let the work speak                            */}
        {/* ============================================================ */}
        {hasBlocks && (
          <section aria-label="The work" className={`${WRAP} mt-20 sm:mt-28`}>
            <CaseStudyBlocksRenderer blocks={project.blocks} accentColor={project.accentColor} />
          </section>
        )}

        {/* ============================================================ */}
        {/* GALLERY: bento when there are 3+, plain grid otherwise       */}
        {/* ============================================================ */}
        {gallery.length > 0 && (
          <section aria-label="Gallery" className={`${WRAP} mt-20 sm:mt-28`}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {gallery.map((img, i) => {
                const feature = gallery.length >= 3 && i === 0;
                return (
                  <figure
                    key={i}
                    className={`group relative overflow-hidden rounded-[16px] border border-line bg-surface-2 ${
                      feature
                        ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || `${project.clientName} gallery image ${i + 1}`}
                      fill
                      sizes={
                        feature ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    {img.caption && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-xs text-white">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* TESTIMONIAL: social proof right before the ask               */}
        {/* ============================================================ */}
        {hasTestimonial && (
          <section aria-label="Client testimonial" className={`${WRAP} mt-24 sm:mt-32`}>
            <figure className="max-w-4xl">
              <blockquote className="font-serif text-[clamp(24px,3.6vw,44px)] italic leading-[1.25] text-fg">
                &ldquo;{project.testimonial!.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <span className="block font-display text-sm font-bold text-fg">
                  {project.testimonial!.clientName}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {project.testimonial!.clientTitle}, {project.testimonial!.companyName}
                </span>
              </figcaption>
            </figure>
          </section>
        )}

        {/* ============================================================ */}
        {/* NEXT CASE: keeps people browsing                             */}
        {/* ============================================================ */}
        {nextProject && (
          <section aria-label="Next case study" className={`${WRAP} mt-24 sm:mt-32`}>
            <Link
              href={`/case-studies/${nextProject.slug}${
                fromCategory ? `?fromCategory=${encodeURIComponent(fromCategory)}` : ""
              }`}
              className={`group grid grid-cols-1 items-center gap-8 rounded-[24px] border border-line bg-surface p-5 transition-colors duration-300 hover:border-fg/30 sm:p-8 md:grid-cols-2 md:gap-12 ${focusRing}`}
            >
              <div className="order-2 md:order-1">
                <span className="text-sm text-muted-foreground">Next case study</span>
                <h3 className="mt-3 text-balance font-display text-[clamp(26px,3.4vw,44px)] font-extrabold leading-[1.08] tracking-tight text-fg">
                  {nextProject.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {nextProject.clientName}
                  {nextProject.industry ? `, ${nextProject.industry}` : ""}
                </p>
                <span className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface-2 text-fg transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight
                    size={20}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>

              <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-[16px] border border-line bg-surface-2 md:order-2">
                <Image
                  src={nextProject.thumbnailUrl || nextProject.heroMediaUrl}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </Link>
          </section>
        )}

        {/* ============================================================ */}
        {/* CLOSING CTA                                                  */}
        {/* ============================================================ */}
        <div ref={closingRef} className="mt-24 sm:mt-32">
          <WorkClosingCta />
        </div>
      </main>

      <Footer />

      {/* Floating CTA: always one tap from converting */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
        <AnimatePresence>
          {showPill && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-line bg-surface/80 p-1.5 pl-5 shadow-2xl backdrop-blur-xl"
            >
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Want results like this?
              </span>
              <Link
                href={CONTACT_HREF}
                className={`group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${focusRing}`}
              >
                {CTA_LABEL}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
