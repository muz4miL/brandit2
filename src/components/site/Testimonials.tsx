"use client";

/**
 * brandit. — Client Testimonials
 *
 * Defiant-style proof section: centred heading, client logo rail with a
 * counter, then one large story card pairing the client's media (video →
 * photo → branded stage) with the quote, attribution and three hard results.
 *
 * Content is managed in the admin console (Testimonials tab) and served by
 * /api/public. The starter set below keeps the section looking finished while
 * the collection is still empty.
 */

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { SectionBadge } from "./SectionBadge";
import { starterTestimonials } from "@/content/testimonials";

export interface PublicTestimonial {
  _id?: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  companyCategory?: string;
  companyLogoUrl?: string;
  clientPhotoUrl?: string;
  clientVideoUrl?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  order?: number;
}

const AUTOPLAY_MS = 9000;
const EASE = [0.22, 1, 0.36, 1] as const;

const starterItems: PublicTestimonial[] = starterTestimonials.map((t, i) => ({
  ...t,
  _id: `starter-${i}`,
  order: i,
}));

const pad = (n: number) => String(n).padStart(2, "0");

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function StageFallback({ item }: { item: PublicTestimonial }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_12%,rgba(255,255,255,0.12),transparent_58%),radial-gradient(ellipse_at_85%_90%,rgba(34,197,94,0.10),transparent_55%),linear-gradient(165deg,#17171d,#0a0a0d_62%)]"
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:46px_46px]" />
      <span className="absolute inset-0 grid select-none place-items-center font-instrument text-[clamp(90px,13vw,190px)] italic leading-none text-white/[0.14]">
        {initials(item.companyName)}
      </span>
    </div>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion() ?? false;
  const [items, setItems] = useState<PublicTestimonial[]>(starterItems);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.testimonials)) {
          setItems(
            (data.testimonials as PublicTestimonial[]).filter((t) => t.quote && t.companyName),
          );
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setActive((prev) => (items.length ? Math.min(prev, items.length - 1) : 0));
  }, [items.length]);

  useEffect(() => {
    setMuted(true);
    if (videoRef.current) videoRef.current.muted = true;
  }, [active]);

  const paused = userPaused || hovering || focusIn;
  const current = items[active] ?? items[0];

  const go = (index: number) => {
    if (items.length === 0) return;
    setActive(((index % items.length) + items.length) % items.length);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const d = delta[e.key];
    if (!d) return;
    e.preventDefault();
    const next = active + d;
    go(next);
    const target = (next + items.length) % items.length;
    tabs.current[target]?.focus();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  if (loaded && items.length === 0) return null;

  if (!current) return null;

  const stats = [
    { value: current.stat1Value ?? "", label: current.stat1Label },
    { value: current.stat2Value ?? "", label: current.stat2Label },
    { value: current.stat3Value ?? "", label: current.stat3Label },
  ].filter((stat) => stat.value.trim().length > 0);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden border-b border-line bg-bg pb-20 pt-20 text-fg select-none scroll-mt-24 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32"
    >
      <style>{`@keyframes ts-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white opacity-[0.035] blur-[150px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <SectionBadge>Testimonials</SectionBadge>

          <h2
            id="testimonials-heading"
            className="mt-5 max-w-4xl font-display text-[clamp(36px,5.2vw,72px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-fg"
          >
            Hear from our{" "}
            <span className="font-instrument font-normal italic text-fg">Clients</span>
          </h2>

          <p className="mt-5 max-w-[760px] font-sans text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
            Founders and marketing leaders on what changed after they partnered with brandit.
          </p>
        </div>

        {/* Client rail + controls */}
        <div className="mt-10 flex flex-col gap-4 sm:mt-12 lg:flex-row lg:items-center">
          <div
            role="tablist"
            aria-label="Choose a client story"
            onKeyDown={onKeyDown}
            className="flex flex-1 items-center justify-start gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item._id ?? `${item.companyName}-${index}`}
                  ref={(el) => {
                    tabs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="testimonial-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(index)}
                  className={`relative flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-4 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 ${
                    isActive
                      ? "border-white/25 bg-white/[0.08] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
                      : "border-transparent text-white/45 hover:border-white/10 hover:text-white/80"
                  }`}
                >
                  {item.companyLogoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.companyLogoUrl}
                      alt={item.companyName}
                      className={`h-4 w-auto max-w-[120px] object-contain transition-opacity sm:h-5 ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`}
                      style={{ filter: "brightness(0) invert(1)" }}
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-display text-[12px] font-semibold tracking-[-0.01em] sm:text-[13px]">
                      {item.companyName}
                    </span>
                  )}

                  {isActive && (
                    <span
                      aria-hidden="true"
                      onAnimationEnd={() => go(active + 1)}
                      className="absolute inset-x-4 bottom-0 h-px origin-left bg-white/70"
                      style={
                        reduce
                          ? { transform: "scaleX(1)" }
                          : {
                              animation: `ts-progress ${AUTOPLAY_MS}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 lg:justify-end">
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? "Resume auto-play" : "Pause auto-play"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/60 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {userPaused ? (
                <Play size={14} aria-hidden="true" />
              ) : (
                <Pause size={14} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/60 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
            <span className="min-w-[58px] text-center font-mono text-[11px] tracking-[0.18em] text-white/45">
              {pad(active + 1)} / {pad(items.length)}
            </span>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/60 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Story card */}
        <div
          id="testimonial-panel"
          role="tabpanel"
          aria-live="polite"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setFocusIn(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocusIn(false);
          }}
          className="mt-8 overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0B0B0E] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)] sm:mt-10 sm:rounded-[32px]"
        >
          <motion.div
            key={current._id ?? current.companyName}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.35fr)]"
          >
            {/* Media */}
            <div className="relative isolate min-h-[300px] overflow-hidden sm:min-h-[380px] lg:min-h-[540px]">
              {current.clientVideoUrl ? (
                <video
                  ref={videoRef}
                  key={current.clientVideoUrl}
                  src={current.clientVideoUrl}
                  poster={current.clientPhotoUrl || undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : current.clientPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={current.clientPhotoUrl}
                  alt={`${current.clientName}, ${current.clientTitle} at ${current.companyName}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <StageFallback item={current} />
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,7,0.88)_0%,rgba(5,5,7,0.18)_42%,transparent_70%)]"
              />

              {current.clientVideoUrl && (
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute client video" : "Mute client video"}
                  className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md transition-colors hover:border-white/35 hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  {muted ? (
                    <VolumeX size={13} aria-hidden="true" />
                  ) : (
                    <Volume2 size={13} aria-hidden="true" />
                  )}
                  {muted ? "Tap for sound" : "Mute"}
                </button>
              )}

              <div className="absolute inset-x-5 bottom-5 max-w-[85%]">
                <p className="font-instrument text-[clamp(22px,2.4vw,32px)] italic leading-tight text-white">
                  {current.companyName}
                </p>
                {current.companyCategory && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                    {current.companyCategory}
                  </p>
                )}
              </div>
            </div>

            {/* Quote + results */}
            <div
              className={`flex flex-col gap-8 p-6 sm:p-9 lg:p-12 ${
                stats.length > 0 ? "justify-between" : "justify-center"
              }`}
            >
              <div>
                <span
                  aria-hidden="true"
                  className="block font-instrument text-5xl leading-[0.6] text-white/25 sm:text-6xl"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-5 text-[clamp(19px,2.2vw,31px)] font-medium leading-[1.32] tracking-[-0.02em] text-white">
                  {current.quote}
                </blockquote>

                <div className="mt-7 flex items-center gap-4">
                  {current.companyLogoUrl && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={current.companyLogoUrl}
                        alt={current.companyName}
                        className="h-9 w-auto max-w-[130px] object-contain"
                        style={{ filter: "brightness(0) invert(1)" }}
                        loading="lazy"
                      />
                      <span aria-hidden="true" className="h-8 w-px bg-white/12" />
                    </>
                  )}
                  <div>
                    <p className="font-display text-[15px] font-semibold tracking-[-0.01em] text-white">
                      {current.clientName}
                    </p>
                    <p className="mt-0.5 text-[13px] text-white/50">
                      {[current.clientTitle, current.companyName].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>

              {stats.length > 0 && (
                <div className="grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6 sm:gap-6">
                  {stats.map((stat) => (
                    <div key={`${stat.value}-${stat.label ?? ""}`} className="min-w-0">
                      <p className="font-display text-[clamp(24px,2.6vw,40px)] font-bold leading-none tracking-[-0.04em] text-emerald-400">
                        {stat.value}
                      </p>
                      {stat.label && (
                        <p className="mt-2 text-[11px] leading-snug text-white/50 sm:text-[13px]">
                          {stat.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { Testimonials };
