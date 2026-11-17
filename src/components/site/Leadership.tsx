"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "./SectionBadge";
import { teamMembers } from "@/content/site";

export function Leadership() {
  const [hasEntered, setHasEntered] = useState(false);
  const [founderData, setFounderData] = useState<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.settings?.founder) {
          setFounderData(data.settings.founder);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dynamically map team members with live Founder/CEO data from Admin Agency Settings
  const dynamicMembers = teamMembers.map((member, index) => {
    if (index === 0 && founderData) {
      const bioText = [founderData.bioParagraph1, founderData.bioParagraph2]
        .filter(Boolean)
        .join(" ")
        .trim();

      return {
        ...member,
        name: founderData.name?.trim() ? founderData.name : member.name,
        role: founderData.role?.trim() ? founderData.role : member.role,
        image: founderData.image?.trim() ? founderData.image : member.image,
        bio: bioText || founderData.bio || member.bio,
      };
    }
    return member;
  });

  return (
    <section
      ref={sectionRef}
      id="leadership"
      aria-label="Executive Leadership Team"
      className="relative w-full overflow-hidden bg-bg text-fg pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 lg:pb-32 border-b border-line select-none scroll-mt-24"
    >
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header Block matching Defiant */}
        <div className="flex flex-col items-center text-center">
          <SectionBadge>LEADERSHIP</SectionBadge>

          <h2 className="mt-5 font-display text-[clamp(36px,5.2vw,72px)] font-extrabold tracking-[-0.03em] text-fg leading-[1.04] max-w-4xl">
            The minds behind <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-fg">the machine</span>
          </h2>

          <p className="mt-5 max-w-[760px] font-sans text-[16px] sm:text-[18px] text-muted-foreground leading-relaxed">
            Senior growth practitioners who personally architect strategy and run operations daily. No account managers passing notes to junior contractors.
          </p>
        </div>

        {/* High-End Team Monogram Grid (Matching About Page) */}
        <div
          className={`mt-14 sm:mt-18 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto transition-all duration-700 ease-out ${
            hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {dynamicMembers.map((member, index) => (
            <article key={member.name} className="group flex flex-col">
              {/* High-End Portrait Image Stage */}
              <div
                style={{
                  background:
                    index % 2 === 0
                      ? "radial-gradient(ellipse at 70% 20%, rgba(209, 173, 105, 0.12) 0%, transparent 65%), var(--surface-2)"
                      : "radial-gradient(ellipse at 30% 80%, rgba(209, 173, 105, 0.08) 0%, transparent 70%), var(--surface-2)",
                }}
                className="relative aspect-[4/5] max-h-[480px] w-full overflow-hidden rounded-2xl border border-line flex items-center justify-center isolate group-hover:border-fg/30 transition-all duration-500 shadow-2xl bg-surface"
              >
                {member.image ? (
                  <>
                    <img
                      src={member.image}
                      alt={member.name}
                      title={`${member.name} — ${member.role}`}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                  </>
                ) : (
                  <>
                    {/* Giant Monogram Fallback */}
                    <strong className="font-display font-medium text-fg/80 text-[clamp(80px,13vw,160px)] tracking-[-0.07em] group-hover:-translate-y-1.5 transition-transform duration-500 select-none">
                      {member.initials}
                    </strong>
                  </>
                )}

                {/* Top-right Index Badge */}
                <span className="absolute right-4 top-4 font-mono text-[9.5px] font-bold tracking-[0.18em] text-white bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 z-10">
                  BRANDIT / 0{index + 1}
                </span>

                {/* Bottom-left discreet pill */}
                <span className="absolute left-4 bottom-4 font-mono text-[9px] font-bold tracking-[0.18em] text-white/90 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 z-10">
                  PARTNER
                </span>
              </div>

              {/* Person Info */}
              <div className="pt-6">
                <h3 className="font-display text-[28px] sm:text-[34px] font-semibold text-fg tracking-tight">
                  {member.name}
                </h3>
                <p className="font-mono text-[10.5px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground mt-2 mb-3.5">
                  {member.role}
                </p>
                <p className="text-sm sm:text-[15px] leading-[1.8] text-muted-foreground max-w-[480px]">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
