"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { SectionBadge } from "./SectionBadge";
import { teamMembers } from "@/content/site";
import type { SiteSettingsDoc } from "@/server/types";

type FounderData = NonNullable<SiteSettingsDoc["founder"]>;
type PublicContactSettings = Pick<SiteSettingsDoc, "phoneWhatsApp" | "whatsappLink">;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true" fill="none">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 3C8.268 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.94 13.94 0 0 0 16 31c7.732 0 14-6.268 14-14S23.732 3 16 3Zm0 2.154C9.458 5.154 4.154 10.458 4.154 17c0 2.527.79 4.868 2.138 6.79l-1.061 3.98 4.049-1.013A11.83 11.83 0 0 0 16 28.846c6.542 0 11.846-5.304 11.846-11.846S22.542 5.154 16 5.154Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M12.5 9.5c-.333-.668-.844-.609-1.36-.609-.922 0-2.36 1.104-2.36 3.159 0 1.684.743 3.528 3.243 6.286 2.414 2.661 5.585 4.038 8.218 3.991 2.633-.046 3.174-2.312 3.174-3.077 0-.339-.21-.508-.355-.554-.897-.43-2.552-1.233-2.929-1.384-.376-.151-.573.053-.695.164-.341.325-1.018 1.284-1.25 1.5-.232.216-.577.107-.721.025-.53-.212-1.965-.85-3.107-1.959-1.415-1.371-1.497-1.842-1.764-2.262-.214-.336-.057-.542.021-.632.305-.352.725-.895.914-1.165.189-.27.039-.679-.051-.934-.387-1.097-.714-2.016-.978-2.55Z"
      />
    </svg>
  );
}

export function Leadership() {
  const [hasEntered, setHasEntered] = useState(false);
  const [founderData, setFounderData] = useState<FounderData | null>(null);
  const [contactSettings, setContactSettings] = useState<PublicContactSettings | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.settings) {
          setFounderData(data.settings.founder ?? null);
          setContactSettings({
            phoneWhatsApp: data.settings.phoneWhatsApp ?? "",
            whatsappLink: data.settings.whatsappLink ?? "",
          });
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
      { threshold: 0.15 },
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
  const phoneNumber = contactSettings?.phoneWhatsApp?.trim() || "";
  const phoneHref = phoneNumber ? `tel:${phoneNumber.replace(/[^\d+]/g, "")}` : "";
  const whatsappHref =
    contactSettings?.whatsappLink?.trim() ||
    (phoneNumber ? `https://wa.me/${phoneNumber.replace(/\D/g, "")}` : "");

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
            Senior growth practitioners who personally architect strategy and run operations daily.
            No account managers passing notes to junior contractors.
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

                {index === 0 && (phoneHref || whatsappHref) && (
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                    {phoneHref && (
                      <a
                        href={phoneHref}
                        aria-label={`Call ${member.name}`}
                        title={`Call ${member.name}`}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-white/50 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
                      >
                        <Phone size={16} aria-hidden="true" />
                      </a>
                    )}
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Message ${member.name} on WhatsApp`}
                        title={`Message ${member.name} on WhatsApp`}
                        className="grid h-10 w-10 place-items-center rounded-full border border-emerald-300/40 bg-emerald-500/80 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-emerald-300"
                      >
                        <WhatsAppIcon />
                      </a>
                    )}
                  </div>
                )}
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
