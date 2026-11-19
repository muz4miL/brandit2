"use client";

import { useEffect, useState } from "react";

interface FloatingLogo {
  id: string;
  imageUrl: string;
  altText: string;
  name: string;
  width: number;
  height: number;
}

interface StripSettings {
  marqueeSectionEnabled: boolean;
  marqueeSpeedPixelsPerSec: number;
}

export function LogoMarquee() {
  const [logos, setLogos] = useState<FloatingLogo[]>([]);
  const [settings, setSettings] = useState<StripSettings>({
    marqueeSectionEnabled: true,
    marqueeSpeedPixelsPerSec: 35,
  });

  useEffect(() => {
    fetch("/api/stats-strip")
      .then((r) => r.json())
      .then((data) => {
        if (data.logos?.length) setLogos(data.logos);
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {
        /* use defaults */
      });
  }, []);

  if (!settings.marqueeSectionEnabled) return null;

  return (
    <section
      aria-label="As Featured In"
      className="relative w-full overflow-hidden bg-transparent py-10 sm:py-14 select-none"
    >
      {/* Centered Minimal Monospace Category Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <span className="font-mono text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.24em] text-neutral-400 select-none">
          AS FEATURED IN
        </span>
      </div>

      {/* Floating Logos Track with Soft Edge Fades */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
        <div
          className="marquee-track flex w-max will-change-transform"
          style={{
            animationName: "marquee-scroll",
            animationDuration: `${settings.marqueeSpeedPixelsPerSec ? Math.max(25, Math.round(1400 / settings.marqueeSpeedPixelsPerSec)) : 35}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
            {logos.length > 0
              ? logos.map((logo) => (
                  <img
                    key={logo.id}
                    src={logo.imageUrl}
                    alt={logo.altText || logo.name}
                    width={logo.width || 120}
                    height={logo.height || 36}
                    loading="eager"
                    draggable={false}
                    className="h-[26px] sm:h-[32px] md:h-[36px] w-auto shrink-0 max-w-none object-contain opacity-60 hover:opacity-90 transition-opacity filter brightness-125"
                  />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <img
                    key={`line1-${i}`}
                    src="/Line1-Logos-V2-scaled.png"
                    alt="Featured press publications"
                    width={2560}
                    height={78}
                    loading="eager"
                    draggable={false}
                    className="h-[26px] sm:h-[32px] md:h-[36px] w-auto shrink-0 max-w-none object-contain opacity-60 hover:opacity-90 transition-opacity filter brightness-125"
                  />
                ))}
          </div>

          {/* Track 2 (Identical duplicate for seamless infinite loop) */}
          <div
            className="flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16"
            aria-hidden="true"
          >
            {logos.length > 0
              ? logos.map((logo) => (
                  <img
                    key={`dup-${logo.id}`}
                    src={logo.imageUrl}
                    alt=""
                    width={logo.width || 120}
                    height={logo.height || 36}
                    loading="eager"
                    draggable={false}
                    className="h-[26px] sm:h-[32px] md:h-[36px] w-auto shrink-0 max-w-none object-contain opacity-60 hover:opacity-90 transition-opacity filter brightness-125"
                  />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <img
                    key={`line1-dup-${i}`}
                    src="/Line1-Logos-V2-scaled.png"
                    alt=""
                    width={2560}
                    height={78}
                    loading="eager"
                    draggable={false}
                    className="h-[26px] sm:h-[32px] md:h-[36px] w-auto shrink-0 max-w-none object-contain opacity-60 hover:opacity-90 transition-opacity filter brightness-125"
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
