import { useState, useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import logosSequence from "@/assets/logos-sequence.png";

interface LogoMarqueeProps {
  label?: string;
  speedPixelsPerSecond?: number;
}

export function LogoMarquee({
  label = "Trusted by 100+ brands across industries and borders",
  speedPixelsPerSecond = 40,
}: LogoMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(58);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureWidth = () => {
      if (groupRef.current) {
        const width = groupRef.current.offsetWidth;
        if (width > 0) {
          const calculatedDuration = Math.max(15, Math.round(width / speedPixelsPerSecond));
          setDuration(calculatedDuration);
        }
      }
    };

    measureWidth();
    const resizeObserver = new ResizeObserver(() => measureWidth());
    if (groupRef.current) resizeObserver.observe(groupRef.current);
    return () => resizeObserver.disconnect();
  }, [speedPixelsPerSecond]);

  const brands = [
    "fäm Properties",
    "DXB Interact",
    "fäm Luxe",
    "Louis Aesthetic",
  ];

  return (
    <section
      aria-label="Trusted by 100+ brands across industries and borders"
      className="relative w-full overflow-hidden bg-white py-10 sm:py-14 select-none border-b border-black/[0.06]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4">
        {/* Heading and accessible pause/resume control */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-center font-display text-[13px] sm:text-[14px] md:text-[15px] font-semibold tracking-[0.16em] text-[#71717A] uppercase">
            {label}
          </h2>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Resume logo marquee animation" : "Pause logo marquee animation"}
            className="grid h-6 w-6 place-items-center rounded-full border border-black/10 bg-black/[0.04] text-[#71717A] transition-colors hover:border-black hover:text-black focus-visible:outline-2 focus-visible:outline-black"
            title={isPaused ? "Resume marquee" : "Pause marquee"}
          >
            {isPaused ? (
              <Play size={10} className="ml-0.5 fill-current" />
            ) : (
              <Pause size={10} className="fill-current" />
            )}
          </button>
        </div>
      </div>

      {/* Overflow-clipped horizontal marquee track */}
      <div className="relative mt-7 sm:mt-9 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] focus-within:[&_.marquee-track]:[animation-play-state:paused] hover:[&_.marquee-track]:[animation-play-state:paused]">
        <div
          className="marquee-track flex w-max will-change-transform"
          style={{
            animation: `marquee-scroll ${duration}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* Repeat 4 times for smooth continuous scroll */}
          {[0, 1, 2, 3].map((rep) => (
            <div
              key={rep}
              ref={rep === 0 ? groupRef : undefined}
              className="flex shrink-0 items-center gap-10 sm:gap-16 px-6 sm:px-8"
              aria-hidden={rep > 0}
            >
              {brands.map((brand, bIdx) => (
                <div
                  key={bIdx}
                  className="flex items-center gap-3 text-[18px] sm:text-[22px] font-bold text-[#09090B] tracking-tight opacity-75 hover:opacity-100 transition-opacity"
                >
                  <span className="font-display">{brand}</span>
                  <span className="text-[#A1A1AA] text-sm">•</span>
                </div>
              ))}
              <img
                src={logosSequence}
                alt="Partner and media logos"
                className="h-[28px] sm:h-[34px] w-auto max-w-none opacity-60 grayscale hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
