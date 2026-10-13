import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { type Category } from "@/content/site";

import identityImg from "@/assets/service-identity.jpg";
import socialImg from "@/assets/service-social.jpg";
import adsImg from "@/assets/service-ads.jpg";
import packagesImg from "@/assets/service-packages.jpg";

interface ServiceItem {
  id: string;
  titleSans: string;
  titleSerif: string;
  category: Category;
  image: string;
  alt: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "identity",
    titleSans: "Brand",
    titleSerif: "Identity",
    category: "identity",
    image: identityImg,
    alt: "Brand identity design, coffee packaging and stationery",
  },
  {
    id: "social",
    titleSans: "Social",
    titleSerif: "Content",
    category: "social",
    image: socialImg,
    alt: "Social media content creation and creator recording demo",
  },
  {
    id: "ads",
    titleSans: "Ad",
    titleSerif: "Campaigns",
    category: "ads",
    image: adsImg,
    alt: "Performance ad creative showcase on smartphone",
  },
  {
    id: "packages",
    titleSans: "Complete",
    titleSerif: "Packages",
    category: "packages",
    image: packagesImg,
    alt: "Complete brand packaging and launch suite",
  },
];

export function ServiceCards({ onSelect }: { onSelect: (c: Category) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  // Update active pagination indicator based on scroll position
  const updateActiveIndex = () => {
    if (!trackRef.current) return;
    const { scrollLeft } = trackRef.current;
    const cards = trackRef.current.children;
    if (cards.length === 0) return;

    let closest = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardLeft = card.offsetLeft - trackRef.current.offsetLeft;
      const diff = Math.abs(cardLeft - scrollLeft);
      if (diff < minDistance) {
        minDistance = diff;
        closest = i;
      }
    }
    setActiveIndex(closest);
  };

  const scrollToIndex = (index: number) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const targetLeft = card.offsetLeft - trackRef.current.offsetLeft;
      trackRef.current.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  };

  // Mouse dragging support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftStart.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    if (Math.abs(walk) > 6) {
      hasMoved.current = true;
    }
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="services"
      aria-label="Our Services"
      className="relative w-full overflow-hidden bg-[#000000] pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 select-none"
    >
      {/* 1. Centred Section Introduction */}
      <div className="mx-auto flex max-w-[1040px] flex-col items-center px-4 sm:px-6 text-center">
        {/* Restrained wide capsule label (hidden on small mobile like Defiant) */}
        <div className="hidden sm:flex h-[46px] w-[240px] sm:h-[52px] sm:w-[320px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
          <span className="font-display text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] text-[#CECED2] uppercase">
            OUR SERVICES
          </span>
        </div>

        {/* Main Heading: We Mastered / The Art & Science of Scale */}
        <h2 className="mt-2 sm:mt-10 lg:mt-11 select-none text-center">
          <span className="block font-display text-[32px] sm:text-[44px] lg:text-[clamp(48px,5.6vw,96px)] font-bold lg:font-extrabold leading-[0.98] lg:leading-[0.96] tracking-[-0.045em] text-[#D0D0D0]">
            We Mastered
          </span>
          <span className="block font-serif text-[34px] sm:text-[46px] lg:text-[clamp(50px,5.8vw,100px)] font-normal italic leading-[0.98] lg:leading-[0.96] tracking-[-0.02em] text-[#D0D0D0] mt-0.5 sm:mt-1">
            The Art & Science of Scale
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-4 sm:mt-8 lg:mt-10 max-w-[560px] text-center text-[15px] sm:text-[18px] lg:text-[21px] font-normal leading-[1.4] text-[#A0A0AA]">
          Brand identities, social content and ad campaigns. Built to work together.
        </p>
      </div>

      {/* 2. Horizontal Carousel Geometry (4:5 Portrait Cards with partially visible next card) */}
      <div className="relative mt-8 sm:mt-16 lg:mt-20 w-full overflow-hidden">
        <div
          ref={trackRef}
          onScroll={updateActiveIndex}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto [scrollbar-width:none] pl-5 pr-10 sm:pl-[6vw] sm:pr-[10vw] cursor-grab active:cursor-grabbing pb-2"
        >
          {servicesData.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                if (hasMoved.current) return;
                onSelect(s.category);
              }}
              className="group relative shrink-0 snap-start overflow-hidden rounded-[24px] sm:rounded-[34px] bg-[#141418] text-left transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-primary aspect-[4/5] w-[80vw] max-w-[340px] sm:w-[340px] md:w-[380px] lg:w-[420px] xl:w-[440px]"
            >
              {/* Full-colour bright photographic image */}
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
              />

              {/* Subtle top-left local gradient for optimal typography readability */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

              {/* Card Title placed absolutely at TOP LEFT */}
              <div className="relative z-10 p-5 sm:p-7 lg:p-8 flex flex-col">
                <span className="font-display text-[26px] sm:text-[32px] lg:text-[40px] font-extrabold leading-[0.92] tracking-tight text-white drop-shadow-md">
                  {s.titleSans}
                </span>
                <span className="font-serif text-[28px] sm:text-[34px] lg:text-[42px] font-normal italic leading-[0.92] tracking-normal text-white drop-shadow-md mt-0.5">
                  {s.titleSerif}
                </span>
              </div>

              {/* Restrained circular dark arrow control placed at BOTTOM RIGHT */}
              <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-10">
                <span className="grid h-10 w-10 sm:h-[44px] sm:w-[44px] place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all duration-200 group-hover:bg-black/90 group-hover:scale-105">
                  <ArrowRight size={18} className="stroke-[2.5]" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Small Pagination Dots Centred Beneath Carousel */}
      <div className="mt-7 sm:mt-10 lg:mt-12 flex items-center justify-center gap-2">
        {servicesData.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="p-1.5 -m-1.5 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-primary rounded-full"
          >
            <span
              className={`block transition-all duration-300 ${
                activeIndex === i
                  ? "h-1.5 w-6 sm:h-2 sm:w-7 rounded-full bg-white"
                  : "h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/35 hover:bg-white/55"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
