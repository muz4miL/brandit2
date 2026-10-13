import { useState, useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import logosSequence from "@/assets/logos-sequence.png";

interface LogoMarqueeProps {
  label?: string;
  speedPixelsPerSecond?: number;
}

export function LogoMarquee({
  label = "AS FEATURED IN",
  speedPixelsPerSecond = 40,
}: LogoMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(58);
  const groupRef = useRef<HTMLDivElement>(null);

  // Measure rendered group width to calculate exact animation duration at target pixels per second
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

    const resizeObserver = new ResizeObserver(() => {
      measureWidth();
    });

    if (groupRef.current) {
      resizeObserver.observe(groupRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [speedPixelsPerSecond]);

  return (
    <section
      aria-label="Media coverage and featured brand logos"
      className="relative w-full overflow-hidden bg-[#09090D] pt-20 pb-20 md:pt-[86px] md:pb-[82px] select-none"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4">
        {/* Label and accessible pause/resume control */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-center font-display text-[13px] sm:text-[14px] md:text-[15px] font-semibold tracking-[0.2em] text-[#CECED2] uppercase">
            {label}
          </h2>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Resume logo marquee animation" : "Pause logo marquee animation"}
            className="grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#A0A0AA] transition-colors hover:border-[#F3FF00]/40 hover:text-white focus-visible:outline-2 focus-visible:outline-primary"
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
      <div className="relative mt-9 md:mt-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] focus-within:[&_.marquee-track]:[animation-play-state:paused] hover:[&_.marquee-track]:[animation-play-state:paused]">
        <div
          className="marquee-track flex w-max will-change-transform"
          style={{
            animation: `marquee-scroll ${duration}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* Group 1: Primary accessible group (rendered twice for seamless width >= viewport) */}
          <div ref={groupRef} className="flex shrink-0 items-center" aria-hidden="false">
            <img
              src={logosSequence}
              alt="Featured publication and brand logos sequence"
              className="h-[30px] sm:h-[34px] md:h-[42px] w-auto shrink-0 max-w-none opacity-80"
              loading="eager"
            />
            <img
              src={logosSequence}
              alt=""
              className="h-[30px] sm:h-[34px] md:h-[42px] w-auto shrink-0 max-w-none opacity-80"
              loading="eager"
            />
          </div>

          {/* Group 2: Identical duplicate group for 100% seamless infinite loop */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            <img
              src={logosSequence}
              alt=""
              className="h-[30px] sm:h-[34px] md:h-[42px] w-auto shrink-0 max-w-none opacity-80"
              loading="eager"
            />
            <img
              src={logosSequence}
              alt=""
              className="h-[30px] sm:h-[34px] md:h-[42px] w-auto shrink-0 max-w-none opacity-80"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
