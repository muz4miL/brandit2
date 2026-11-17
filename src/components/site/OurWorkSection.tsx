"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronUp, Star, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

import haloImg from "@/assets/work-identity-halo.jpg";
import pulseImg from "@/assets/work-identity-pulse.jpg";
import zestImg from "@/assets/work-social-juice.jpg";
import voltexImg from "@/assets/work-ad-sneaker.jpg";
import skinImg from "@/assets/work-package-skin.jpg";
import riseImg from "@/assets/work-package-rise.jpg";
import voyaraImg from "@/assets/work-ads-travel.jpg";
import homeImg from "@/assets/work-campaign-home.jpg";
import identityImg from "@/assets/service-identity.jpg";
import creativeImg from "@/assets/service-creative.jpg";
import croImg from "@/assets/service-cro.jpg";
import webImg from "@/assets/service-web.jpg";
import { SectionBadge } from "./SectionBadge";

export type TabKey = "ads" | "emails" | "landing" | "ugc";

export interface VideoMediaItem {
  video: string;
  poster: string;
}

export const ADS_VIDEOS: VideoMediaItem[] = [
  {
    video: "/videos/ads/optimized/13014537_2160_3840_24fps.mp4",
    poster: "/videos/ads/optimized/13014537_2160_3840_24fps.webp",
  },
  {
    video: "/videos/ads/optimized/17084724_1080_1920_29fps.mp4",
    poster: "/videos/ads/optimized/17084724_1080_1920_29fps.webp",
  },
  {
    video: "/videos/ads/optimized/5561960-uhd_2160_3840_25fps.mp4",
    poster: "/videos/ads/optimized/5561960-uhd_2160_3840_25fps.webp",
  },
  {
    video: "/videos/ads/optimized/6664406-uhd_2160_3744_30fps.mp4",
    poster: "/videos/ads/optimized/6664406-uhd_2160_3744_30fps.webp",
  },
  {
    video: "/videos/ads/optimized/7616839-hd_1080_1920_24fps.mp4",
    poster: "/videos/ads/optimized/7616839-hd_1080_1920_24fps.webp",
  },
];

export const UGC_VIDEOS: VideoMediaItem[] = [
  {
    video: "/videos/ads/optimized/17084724_1080_1920_29fps.mp4",
    poster: "/videos/ads/optimized/17084724_1080_1920_29fps.webp",
  },
  {
    video: "/videos/ads/optimized/7616839-hd_1080_1920_24fps.mp4",
    poster: "/videos/ads/optimized/7616839-hd_1080_1920_24fps.webp",
  },
  {
    video: "/videos/ads/optimized/13014537_2160_3840_24fps.mp4",
    poster: "/videos/ads/optimized/13014537_2160_3840_24fps.webp",
  },
  {
    video: "/videos/ads/optimized/6664406-uhd_2160_3744_30fps.mp4",
    poster: "/videos/ads/optimized/6664406-uhd_2160_3744_30fps.webp",
  },
  {
    video: "/videos/ads/optimized/5561960-uhd_2160_3840_25fps.mp4",
    poster: "/videos/ads/optimized/5561960-uhd_2160_3840_25fps.webp",
  },
];

export interface EmailCardData {
  id: string;
  sender: string;
  subject: string;
  tag: string;
  subnav?: string[];
  heroImg: any;
  heading: string;
  subheading: string;
  ctaText: string;
  accentColor: string;
  theme: "dark" | "light";
  footerText?: string;
}

export const EMAILS_DATA: EmailCardData[] = [
  {
    id: "voltex",
    sender: "VOLTEX ACTIVE",
    subject: "The Recon Drop Is Live ⚡",
    tag: "LIMITED EDITION",
    subnav: ["DROP 004", "MEN", "WOMEN", "GEAR"],
    heroImg: voltexImg,
    heading: "NO RESTOCKS. THE RECON DROP.",
    subheading: "Engineered for speed, durability, and relentless focus. Only 250 units worldwide.",
    ctaText: "SECURE YOUR DROP >",
    accentColor: "#EF4444",
    theme: "dark",
    footerText: "Worldwide tracked express dispatch • Unsubscribe",
  },
  {
    id: "temple",
    sender: "TEMPLE & GRACE",
    subject: "Handcrafted Luxury Just For You",
    tag: "FINE JEWELRY",
    subnav: ["Engagement", "Wedding", "Bracelets", "Diamonds"],
    heroImg: haloImg,
    heading: "Welcome to Temple & Grace",
    subheading: "Handcrafted pieces. Honest pricing. Lifetime care. Discover the signature solitaire series.",
    ctaText: "BOOK A SHOWROOM VISIT >",
    accentColor: "#C59B27",
    theme: "light",
    footerText: "Complimentary private showroom champagne consultation • Unsubscribe",
  },
  {
    id: "luminate",
    sender: "HAIR & SKIN SCIENCE",
    subject: "Save $299 On Winter HydraGlow",
    tag: "SPECIAL OFFER",
    subnav: ["Dermatology", "Aesthetics", "HydraGlow", "Clinics"],
    heroImg: skinImg,
    heading: "Save $299 Before Our Offer Ends!",
    subheading: "Prepare for the season by looking and feeling your best with bespoke clinical restorative treatments.",
    ctaText: "CLAIM WINTER SPECIAL >",
    accentColor: "#0284C7",
    theme: "light",
    footerText: "Doctor-led clinical treatments across 14 locations • Unsubscribe",
  },
  {
    id: "rise",
    sender: "RISE BAKERY",
    subject: "Fresh Sourdough & Pastries At Your Door 🥐",
    tag: "MORNING DROP",
    subnav: ["Sourdough", "Croissants", "Pastries", "Coffee"],
    heroImg: riseImg,
    heading: "Baked At 4 AM. Delivered At 7 AM.",
    subheading: "Warm butter croissants, rustic sourdough loaves, and artisan preserves delivered straight to your door.",
    ctaText: "ORDER BREAKFAST BOX >",
    accentColor: "#D97706",
    theme: "light",
    footerText: "Guaranteed oven-warm morning door delivery • Unsubscribe",
  },
  {
    id: "voyara",
    sender: "VOYARA LUXURY STAYS",
    subject: "Exclusive Villas Across 8 Countries 🌴",
    tag: "VIP RETREAT",
    subnav: ["Private Villas", "Sanctuaries", "Concierge", "Dining"],
    heroImg: voyaraImg,
    heading: "Invest in Memories. Grow Your Escape.",
    subheading: "Private oceanfront sanctuaries with dedicated concierges, personal infinity pools, and chef dining.",
    ctaText: "DISCOVER DESTINATIONS >",
    accentColor: "#FFFFFF",
    theme: "dark",
    footerText: "Curated 5-star private residences worldwide • Unsubscribe",
  },
];

export interface LandingCardData {
  id: string;
  client: string;
  url: string;
  projectUrl: string;
  previewImg: any;
  title: string;
  highlight: string;
  description: string;
  stats: { label: string; value: string }[];
  tag: string;
  bgGradient: string;
  accentColor: string;
}

export const LANDING_DATA: LandingCardData[] = [
  {
    id: "capital",
    client: "HAVEN ASSETS",
    url: "havenassets.com/yields",
    projectUrl: "/case-studies/apex",
    previewImg: homeImg,
    title: "Get your commercial assets leased faster, for stronger yields.",
    highlight: "High-Yield Portfolio Acquisition",
    description: "Proven performance marketing and direct-response lead generation for prime commercial holdings.",
    stats: [
      { label: "Asset Volume", value: "$4.6M" },
      { label: "Avg Yield", value: "8.4%" },
      { label: "Close Rate", value: "94%" },
    ],
    tag: "COMMERCIAL B2B",
    bgGradient: "from-[#111116] via-[#161622] to-[#0d0d12]",
    accentColor: "#FBBF24",
  },
  {
    id: "rewards",
    client: "WINBACK APP",
    url: "winback.io/daily-drop",
    projectUrl: "/case-studies/halo",
    previewImg: webImg,
    title: "Win all your daily expenses back. Up to $150k.",
    highlight: "Daily Rewards & Gamified Fintech",
    description: "All without changing the way you shop or carrying extra cards. Backed by top tier banks.",
    stats: [
      { label: "Users Active", value: "180k+" },
      { label: "Cash Rewarded", value: "$1.2M" },
      { label: "App Rating", value: "4.9 ★" },
    ],
    tag: "CONSUMER APP",
    bgGradient: "from-[#0a1e12] via-[#0f2d1b] to-[#09150e]",
    accentColor: "#34D399",
  },
  {
    id: "pulse-gym",
    client: "PULSE FITNESS",
    url: "pulsefitness.com/join",
    projectUrl: "/case-studies/pulse",
    previewImg: pulseImg,
    title: "Move Better. Feel Stronger. Train Without Limits.",
    highlight: "Premium Boutique Studio",
    description: "Personal training, recovery saunas, and science-backed conditioning under one luxury roof.",
    stats: [
      { label: "Members", value: "1,400+" },
      { label: "Retention", value: "92%" },
      { label: "Locations", value: "3" },
    ],
    tag: "HEALTH & FITNESS",
    bgGradient: "from-[#16102a] via-[#211640] to-[#120a22]",
    accentColor: "#A78BFA",
  },
  {
    id: "energymatch",
    client: "SAVER COMPARISON",
    url: "savesmart.com/compare",
    projectUrl: "/case-studies/zest",
    previewImg: zestImg,
    title: "Save Smart. Compare Better. Reduce Utility Bills.",
    highlight: "Utility Comparison Engine",
    description: "Instant tariff matching for electricity, high-speed fiber broadband, and solar incentives.",
    stats: [
      { label: "Avg Saved", value: "$420/yr" },
      { label: "Comparison Time", value: "45s" },
      { label: "Happy Customers", value: "65k+" },
    ],
    tag: "LEAD GENERATION",
    bgGradient: "from-[#1b1c11] via-[#2d2e14] to-[#14150c]",
    accentColor: "#F59E0B",
  },
  {
    id: "equ",
    client: "EQU NUTRITION",
    url: "equhealth.com/programs",
    projectUrl: "/case-studies/voltex",
    previewImg: croImg,
    title: "Ready for real results? We’re your pocket nutrition coach.",
    highlight: "Lifestyle Transformation",
    description: "Dietician-led flexible dieting, metabolic health plans, and community accountability.",
    stats: [
      { label: "Kg Lost", value: "12,000+" },
      { label: "Coaches", value: "24" },
      { label: "Client Success", value: "97%" },
    ],
    tag: "E-COMMERCE & COACHING",
    bgGradient: "from-[#1e1310] via-[#321c16] to-[#160c09]",
    accentColor: "#F43F5E",
  },
];

/* -------------------------------------------------------------
   PHONE CARD MOCKUP (Used for Ads Creative & UGC)
------------------------------------------------------------- */
interface PhoneCardProps {
  item: VideoMediaItem;
  index: number;
  isDuplicate?: boolean;
  isSectionNear: boolean;
}

function PhoneCard({ item, index, isDuplicate, isSectionNear }: PhoneCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSectionNear) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    } else {
      video.pause();
    }
  }, [isSectionNear]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration) && video.duration > 0) {
      try {
        video.currentTime = (index * 1.8 + (isDuplicate ? 1.1 : 0)) % video.duration;
      } catch {
        // Ignore seek error if browser restricts before play
      }
    }
  };

  return (
    <div className="relative h-[260px] w-[136px] shrink-0 select-none sm:h-[310px] sm:w-[162px] md:h-[350px] md:w-[182px] lg:h-[370px] lg:w-[192px] transform-gpu">
      {/* Left side volume buttons */}
      <div className="absolute -left-[2.5px] top-[60px] h-[18px] w-[2.5px] rounded-l-sm bg-gradient-to-b from-[#e8e8ea] via-[#c8c8d0] to-[#8a8a90] sm:top-[72px] sm:h-[22px] md:top-[82px] md:h-[24px]" />
      <div className="absolute -left-[2.5px] top-[82px] h-[18px] w-[2.5px] rounded-l-sm bg-gradient-to-b from-[#e8e8ea] via-[#c8c8d0] to-[#8a8a90] sm:top-[98px] sm:h-[22px] md:top-[112px] md:h-[24px]" />

      {/* Right side power button */}
      <div className="absolute -right-[2.5px] top-[65px] h-[28px] w-[2.5px] rounded-r-sm bg-gradient-to-b from-[#e8e8ea] via-[#c8c8d0] to-[#8a8a90] sm:top-[78px] sm:h-[34px] md:top-[90px] md:h-[38px]" />

      {/* Phone outer frame: titanium silver border */}
      <div className="relative h-full w-full rounded-[24px] bg-gradient-to-b from-[#e8e8ea] via-[#c8c8d0] to-[#8a8a90] p-[2px] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.65)] shadow-[0_12px_32px_rgba(20,20,20,0.08),0_2px_8px_rgba(20,20,20,0.04)] sm:rounded-[28px] md:rounded-[32px]">
        {/* Thin black bezel padding */}
        <div className="relative h-full w-full rounded-[22px] bg-[#0c0c0e] p-[3px] sm:rounded-[26px] sm:p-[4px] md:rounded-[30px] md:p-[4.5px]">
          {/* Inner screen radius with overflow hidden */}
          <div className="relative h-full w-full overflow-hidden rounded-[19px] bg-[#121214] sm:rounded-[22px] md:rounded-[26px]">
            {/* Dynamic island */}
            <div className="pointer-events-none absolute top-[5px] left-1/2 z-20 flex h-[12px] w-[46px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-1 sm:h-[14px] sm:w-[54px] sm:pr-1 md:top-[6px] md:h-[16px] md:w-[62px] md:pr-1.5">
              <div className="h-[3.5px] w-[3.5px] rounded-full bg-[#0d1b2a] shadow-[inset_0_0_2px_#415a77] ring-1 ring-[#1b263b]/70 md:h-[4.5px] md:w-[4.5px]" />
            </div>

            {/* Poster fallback image rendered behind video - ALWAYS VISIBLE FROM MILLISECOND 0 */}
            {item.poster && (
              <img
                src={item.poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
                loading="eager"
              />
            )}

            {/* Video element with instant poster & faststart */}
            <video
              ref={videoRef}
              src={item.video}
              poster={item.poster}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              disablePictureInPicture
              controls={false}
              draggable={false}
              onLoadedMetadata={handleLoadedMetadata}
              className="relative z-10 h-full w-full object-cover transform-gpu"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   EMAIL CARD (Editorial Luxury Minimal Shiny Card)
   Clean, glossy showcase: Large creative visual, brand badge, zero buttons
------------------------------------------------------------- */
function getReadableTextColor(backgroundColor: string) {
  const hex = backgroundColor.replace("#", "");
  if (hex.length !== 6) return "#FFFFFF";

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62 ? "#111111" : "#FFFFFF";
}

function EmailCard({ item }: { item: EmailCardData }) {
  const heroSrc = typeof item.heroImg === "string" ? item.heroImg : item.heroImg?.src || "";
  const badgeTextColor = getReadableTextColor(item.accentColor);

  return (
    <div
      className="group relative h-[430px] w-[260px] sm:h-[480px] sm:w-[290px] md:h-[530px] md:w-[320px] shrink-0 select-none overflow-hidden rounded-[24px] sm:rounded-[28px] border border-line dark:border-white/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] shadow-[0_12px_32px_rgba(20,20,20,0.08),0_2px_8px_rgba(20,20,20,0.04)] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-fg/30 p-3.5 sm:p-4.5 bg-surface text-fg"
    >
      {/* Shiny top hairline reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 dark:via-white/25 to-transparent"
      />

      {/* Top Header: Brand pill + Category Tag */}
      <div className="flex items-center justify-between pb-2.5 border-b border-line">
        <span className="font-display text-[11px] sm:text-[12px] font-black tracking-widest uppercase text-fg">
          {item.sender}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm"
          style={{ backgroundColor: item.accentColor || "#D1AD69", color: badgeTextColor }}
        >
          {item.tag || "CREATIVE"}
        </span>
      </div>

      {/* Main Creative Visual Showcase: Generous, crisp, high-end display */}
      <div className="relative flex-1 w-full my-2.5 overflow-hidden rounded-[18px] bg-surface-2 border border-line/60">
        <img
          src={heroSrc}
          alt={item.heading || item.subject}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Hover subtle glow icon in top right */}
        <div className="absolute top-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight size={13} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Minimal Bottom Caption: Title & Subtle Subject (Zero Buttons, Zero Unsubscribe Clutter!) */}
      <div className="pt-1">
        <h4 className="font-display text-[14px] sm:text-[16px] font-extrabold leading-[1.18] tracking-tight text-fg line-clamp-1">
          {item.heading}
        </h4>
        <p className="mt-0.5 text-[11px] sm:text-[11.5px] text-muted-foreground line-clamp-1 font-mono">
          {item.subject}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   LANDING PAGE CARD MOCKUP (Full Responsive Site UI Mockup)
   Matches Defiant Digital layout: Browser Chrome, Header, Hero, Stats, Link
------------------------------------------------------------- */
function LandingPageCard({ item }: { item: LandingCardData }) {
  const previewSrc = typeof item.previewImg === "string" ? item.previewImg : item.previewImg?.src || "";

  return (
    <a
      href={item.projectUrl || "/case-studies"}
      aria-label={`View landing page for ${item.client}`}
      className="group relative h-[430px] w-[260px] sm:h-[480px] sm:w-[290px] md:h-[530px] md:w-[320px] shrink-0 select-none overflow-hidden rounded-[24px] sm:rounded-[28px] border border-line dark:border-white/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] shadow-[0_12px_32px_rgba(20,20,20,0.08),0_2px_8px_rgba(20,20,20,0.04)] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-fg/40 bg-[#0E0E12] text-white"
    >
      {/* Browser Chrome Header (macOS window controls + URL) */}
      <div className="flex h-9 sm:h-10 shrink-0 items-center justify-between border-b border-white/10 bg-[#15151C] px-3.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#FF5F56]" />
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex h-5 sm:h-6 items-center rounded-md bg-black/50 px-2 sm:px-3 text-[9px] sm:text-[10px] text-neutral-300 font-mono truncate max-w-[140px] sm:max-w-[170px]">
          https://{item.url}
        </div>
        <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-white transition-colors" />
      </div>

      {/* Screen Content: Rich Website UI Layout */}
      <div className={`flex-1 p-3.5 sm:p-4 flex flex-col justify-between bg-gradient-to-b ${item.bgGradient}`}>
        <div>
          {/* Mini website navbar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-display text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white">
              {item.client}
            </span>
            <div className="flex items-center gap-1">
              <span className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black bg-white">
                LIVE
              </span>
            </div>
          </div>

          {/* Full-width site UI hero preview */}
          <div className="relative mt-2.5 aspect-[16/10] w-full overflow-hidden rounded-[12px] border border-white/10 bg-neutral-900 shadow-md">
            <img
              src={previewSrc}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[8px] font-semibold text-white/90 backdrop-blur-md">
                <Sparkles size={9} style={{ color: item.accentColor }} />
                <span>{item.tag}</span>
              </span>
            </div>
          </div>

          {/* Headline & Subcopy */}
          <div className="mt-2.5">
            <h4 className="font-display text-[14px] sm:text-[16px] md:text-[17px] font-extrabold leading-[1.15] tracking-tight text-white line-clamp-2">
              {item.title}
            </h4>
            <p className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-neutral-300 line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-white/10 pt-2.5">
            {item.stats.map((s, idx) => (
              <div key={idx} className="rounded-lg bg-black/40 p-1.5 text-center border border-white/5">
                <span className="block font-display text-[12px] sm:text-[14px] font-black text-white" style={{ color: idx === 0 ? item.accentColor : undefined }}>
                  {s.value}
                </span>
                <span className="block text-[8px] font-medium text-neutral-400 mt-0.5 truncate">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Link */}
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
          <span className="text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-wider">
            {item.highlight}
          </span>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover:underline">
            <span>View Site</span>
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </a>
  );
}

/* -------------------------------------------------------------
   MAIN COMPONENT: Creative that Converts
------------------------------------------------------------- */
const TABS: { id: TabKey; label: string }[] = [
  { id: "ads", label: "Ads Creative" },
  { id: "emails", label: "Emails" },
  { id: "landing", label: "Landing Pages" },
  { id: "ugc", label: "UGC" },
];

export function OurWorkSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("ads");
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionNear, setIsSectionNear] = useState(false);

  // Dynamic CMS data
  const [dynamicItems, setDynamicItems] = useState<any[]>([]);
  const [dynamicSettings, setDynamicSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/showcase")
      .then((res) => res.json())
      .then((data) => {
        if (data.items && Array.isArray(data.items)) {
          setDynamicItems(data.items);
        }
        if (data.settings) {
          setDynamicSettings(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionNear(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute active items per category with zero-regression fallbacks
  const adsItems: VideoMediaItem[] =
    dynamicItems.filter((i) => i.category === "ads" && i.isActive).length > 0
      ? dynamicItems
          .filter((i) => i.category === "ads" && i.isActive)
          .map((i, idx) => {
            const fallback = ADS_VIDEOS[idx % ADS_VIDEOS.length]!;
            return {
              video: i.videoUrl || fallback.video,
              poster: i.posterUrl || fallback.poster,
            };
          })
      : ADS_VIDEOS;

  const ugcItems: VideoMediaItem[] =
    dynamicItems.filter((i) => i.category === "ugc" && i.isActive).length > 0
      ? dynamicItems
          .filter((i) => i.category === "ugc" && i.isActive)
          .map((i, idx) => {
            const fallback = UGC_VIDEOS[idx % UGC_VIDEOS.length]!;
            return {
              video: i.videoUrl || fallback.video,
              poster: i.posterUrl || fallback.poster,
            };
          })
      : UGC_VIDEOS;

  const emailItems: EmailCardData[] =
    dynamicItems.filter((i) => i.category === "emails" && i.isActive).length > 0
      ? dynamicItems
          .filter((i) => i.category === "emails" && i.isActive)
          .map((i, idx) => {
            const fallback = EMAILS_DATA[idx % EMAILS_DATA.length]!;
            const rawHero = i.heroImg;
            const validHero =
              rawHero && typeof rawHero === "string" && !rawHero.includes("case-studies")
                ? rawHero
                : fallback.heroImg;
            return {
              id: i.id,
              sender: i.sender || fallback.sender,
              subject: i.subject || fallback.subject,
              tag: i.tag || fallback.tag,
              subnav: i.subnav || fallback.subnav,
              heroImg: validHero,
              heading: i.heading || fallback.heading,
              subheading: i.subheading || fallback.subheading,
              ctaText: i.ctaText || fallback.ctaText,
              accentColor: i.accentColor || fallback.accentColor,
              theme: (i.theme as "dark" | "light") || fallback.theme,
              footerText: i.footerText || fallback.footerText,
            };
          })
      : EMAILS_DATA;

  const landingItems: LandingCardData[] =
    dynamicItems.filter((i) => i.category === "landing" && i.isActive).length > 0
      ? dynamicItems
          .filter((i) => i.category === "landing" && i.isActive)
          .map((i, idx) => {
            const fallback = LANDING_DATA[idx % LANDING_DATA.length]!;
            const rawPreview = i.previewImg;
            const validPreview =
              rawPreview && typeof rawPreview === "string" && !rawPreview.includes("case-studies")
                ? rawPreview
                : fallback.previewImg;
            return {
              id: i.id,
              client: i.client || fallback.client,
              url: i.url || fallback.url,
              projectUrl: i.projectUrl || fallback.projectUrl,
              previewImg: validPreview,
              title: i.title || fallback.title,
              highlight: i.highlight || fallback.highlight,
              description: i.description || fallback.description,
              stats: Array.isArray(i.stats) && i.stats.length > 0 ? i.stats : fallback.stats,
              tag: i.tag || fallback.tag,
              bgGradient: i.bgGradient || fallback.bgGradient,
              accentColor: i.accentColor || fallback.accentColor,
            };
          })
      : LANDING_DATA;

  if (dynamicSettings?.sectionEnabled === false) return null;

  const badgeText = dynamicSettings?.sectionBadge || "CREATIVE LIBRARY";
  const headingPrefix = dynamicSettings?.headingPrefix || "Creative that";
  const headingItalic = dynamicSettings?.headingItalic || "Converts";
  const durationSec = dynamicSettings?.marqueeSpeedSeconds || 32;

  return (
    <section
      ref={sectionRef}
      id="creative-library"
      aria-label="Creative Library"
      className="relative w-full overflow-hidden bg-bg text-fg pt-16 sm:pt-22 lg:pt-28 pb-16 sm:pb-22 lg:pb-28 select-none scroll-mt-24"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4 text-center">
        {/* Pill badge at top */}
        <SectionBadge>{badgeText}</SectionBadge>

        {/* Section Heading: Creative that Converts */}
        <h2 className="mt-5 sm:mt-7 lg:mt-9 flex flex-col items-center text-center">
          <span className="block font-display text-[34px] sm:text-[50px] lg:text-[clamp(50px,6vw,96px)] font-extrabold leading-[0.98] lg:leading-[0.95] tracking-[-0.04em] text-fg">
            {headingPrefix}
          </span>
          <span className="block font-serif text-[38px] sm:text-[54px] lg:text-[clamp(54px,6.5vw,104px)] font-normal italic leading-[0.98] lg:leading-[0.95] tracking-[-0.02em] text-fg mt-1">
            {headingItalic}
          </span>
        </h2>

        {/* Interactive Category Tabs Switcher */}
        <div
          role="tablist"
          aria-label="Work categories"
          className="mt-8 sm:mt-10 lg:mt-12 inline-flex items-center gap-1 sm:gap-2 rounded-full border border-line bg-surface p-1.5 sm:p-2 backdrop-blur-md shadow-sm"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-[13px] sm:text-[15px] font-semibold transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-fg hover:bg-surface-2"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Moving Row of Mockups with Infinite Marquee */}
      <div className="showcase-row relative mt-10 sm:mt-14 lg:mt-16 w-full overflow-hidden">
        <div
          className="showcase-track flex w-max will-change-transform"
          style={{ animationDuration: `${durationSec}s` }}
        >
          {/* TAB: Ads Creative */}
          {activeTab === "ads" && (
            <>
              {/* Set 1 */}
              <div className="flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-7 pr-4 sm:pr-6 lg:pr-7">
                {adsItems.map((item, idx) => (
                  <PhoneCard
                    key={`ads-1-${idx}`}
                    item={item}
                    index={idx}
                    isSectionNear={isSectionNear}
                  />
                ))}
              </div>
              {/* Set 2 (Duplicate for infinite seamless loop) */}
              <div
                className="flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-7 pr-4 sm:pr-6 lg:pr-7"
                aria-hidden="true"
              >
                {adsItems.map((item, idx) => (
                  <PhoneCard
                    key={`ads-2-${idx}`}
                    item={item}
                    index={idx}
                    isDuplicate
                    isSectionNear={isSectionNear}
                  />
                ))}
              </div>
            </>
          )}

          {/* TAB: Emails */}
          {activeTab === "emails" && (
            <>
              {/* Set 1 */}
              <div className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10 pr-6 sm:pr-8 lg:pr-10">
                {emailItems.map((item) => (
                  <EmailCard key={`email-1-${item.id}`} item={item} />
                ))}
              </div>
              {/* Set 2 (Duplicate for infinite seamless loop) */}
              <div
                className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10 pr-6 sm:pr-8 lg:pr-10"
                aria-hidden="true"
              >
                {emailItems.map((item) => (
                  <EmailCard key={`email-2-${item.id}`} item={item} />
                ))}
              </div>
            </>
          )}

          {/* TAB: Landing Pages */}
          {activeTab === "landing" && (
            <>
              {/* Set 1 */}
              <div className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10 pr-6 sm:pr-8 lg:pr-10">
                {landingItems.map((item) => (
                  <LandingPageCard key={`landing-1-${item.id}`} item={item} />
                ))}
              </div>
              {/* Set 2 (Duplicate for infinite seamless loop) */}
              <div
                className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10 pr-6 sm:pr-8 lg:pr-10"
                aria-hidden="true"
              >
                {landingItems.map((item) => (
                  <LandingPageCard key={`landing-2-${item.id}`} item={item} />
                ))}
              </div>
            </>
          )}

          {/* TAB: UGC */}
          {activeTab === "ugc" && (
            <>
              {/* Set 1 */}
              <div className="flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-7 pr-4 sm:pr-6 lg:pr-7">
                {ugcItems.map((item, idx) => (
                  <PhoneCard
                    key={`ugc-1-${idx}`}
                    item={item}
                    index={idx}
                    isSectionNear={isSectionNear}
                  />
                ))}
              </div>
              {/* Set 2 (Duplicate for infinite seamless loop) */}
              <div
                className="flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-7 pr-4 sm:pr-6 lg:pr-7"
                aria-hidden="true"
              >
                {ugcItems.map((item, idx) => (
                  <PhoneCard
                    key={`ugc-2-${idx}`}
                    item={item}
                    index={idx}
                    isDuplicate
                    isSectionNear={isSectionNear}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 flex w-full max-w-[1140px] flex-col items-center justify-between gap-8 px-5 sm:px-8 md:flex-row md:gap-6">
        {/* Left: "Want more inspiration?" */}
        <div className="text-center md:text-left">
          <p className="font-display text-[26px] sm:text-[30px] font-bold leading-[1.05] tracking-tight text-fg">
            Want more
          </p>
          <p className="font-serif text-[28px] sm:text-[34px] italic font-normal leading-[1.05] tracking-tight text-fg/80 dark:text-neutral-300 mt-0.5">
            inspiration?
          </p>
        </div>

        {/* Center: "Go to Creative Library" pill button */}
        <a
          href="/case-studies#creative-library"
          aria-label="Go to Creative Library"
          className="group inline-flex h-[56px] sm:h-[62px] items-center justify-center gap-3 rounded-full bg-primary px-8 sm:px-10 text-[16px] sm:text-[18px] font-bold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-xl select-none cursor-pointer"
        >
          <span>Go to Creative Library</span>
          <ArrowUpRight
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
        </a>

        {/* Right: Google Reviews Trust Badge */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="inline-flex items-center gap-2">
            {/* Inline Google G logo */}
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            {/* 4.9 | 5★ badge */}
            <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-fg">
              4.9 | 5<span className="text-[#FBBF24]">★</span>
            </span>
          </div>
          <p className="mt-1.5 text-[13px] text-muted-foreground font-medium">
            Discover why 14+ Businesses Choose brandit.
          </p>
        </div>
      </div>
    </section>
  );
}
