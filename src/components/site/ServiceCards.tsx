import { ArrowRight, ArrowUpRight } from "lucide-react";
import identityImg from "@/assets/service-identity.jpg";
import socialImg from "@/assets/service-social.jpg";
import adsImg from "@/assets/service-ads.jpg";
import packagesImg from "@/assets/service-packages.jpg";
import skinImg from "@/assets/work-package-skin.jpg";
import pulseImg from "@/assets/work-identity-pulse.jpg";

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  body: string;
  visibleTags: string[];
  image: string;
}

export const servicesList: ServiceData[] = [
  {
    id: "strategy-growth-systems",
    slug: "strategy-growth-systems",
    title: "Strategy & Growth Systems",
    body: "The operating system behind everything else. We map your content architecture, build the SOPs, align ad spend to real revenue priorities, and report on what actually moved.",
    visibleTags: ["Marketing Strategy", "Growth Systems", "SOPs & Workflows", "Reporting"],
    image: identityImg,
  },
  {
    id: "paid-advertising",
    slug: "paid-advertising",
    title: "Paid Advertising",
    body: "Campaigns built around your sales reality, not vanity metrics. We structure spend so your budget goes to what converts, then keep testing until it gets cheaper.",
    visibleTags: ["Meta Ads", "Google Ads", "TikTok Ads", "Performance Creative"],
    image: adsImg,
  },
  {
    id: "content-production",
    slug: "content-production",
    title: "Content Production",
    body: "A full in-house production team — videographers, photographers, editors. Cinematic films, scroll-stopping UGC, and shoot days run to SOPs so nothing is wasted.",
    visibleTags: ["Video Production", "Photography", "UGC & Reels", "Podcast Production"],
    image: socialImg,
  },
  {
    id: "branding-design",
    slug: "branding-design",
    title: "Branding & Design",
    body: "Look like the leader in your category. Complete identity systems, daily creative, and founder brands built for authority.",
    visibleTags: ["Brand Identity", "Graphic Design", "Personal Branding", "Ad Creative"],
    image: packagesImg,
  },
  {
    id: "web-stores-automation",
    slug: "web-stores-automation",
    title: "Web, Stores & Automation",
    body: "Where traffic becomes revenue. Fast websites, conversion-built landing pages, Shopify stores that sell, and AI automation that handles the follow-up.",
    visibleTags: ["Website Design", "Landing Pages", "Shopify Stores", "AI Automation"],
    image: skinImg,
  },
  {
    id: "influencer-collab-marketing",
    slug: "influencer-collab-marketing",
    title: "Influencer & Collab Marketing",
    body: "Borrow the audiences you haven’t built yet. We source the right creators, run the campaigns, and structure brand collaborations that put you in front of a warm market.",
    visibleTags: ["Influencer Campaigns", "Creator Sourcing", "Brand Collaborations", "Seeding & Gifting"],
    image: pulseImg,
  },
];

export function ServiceCards({ onSelect }: { onSelect?: (slug: string) => void }) {
  return (
    <section
      id="services"
      aria-label="Our Services"
      className="relative w-full overflow-hidden bg-[#000000] pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 select-none border-t border-b border-white/[0.08]"
    >
      {/* 1. Centred Section Introduction */}
      <div className="mx-auto flex max-w-[1040px] flex-col items-center px-4 sm:px-6 text-center">
        {/* Eyebrow label */}
        <div className="flex h-[40px] items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-5">
          <span className="font-display text-[12px] font-semibold tracking-[0.16em] text-[#A1A1AA] uppercase">
            What We Do
          </span>
        </div>

        {/* Main Heading: The Art & Science of Scale */}
        <h2 className="mt-4 sm:mt-6 text-center">
          <span className="block font-display text-[32px] sm:text-[44px] lg:text-[clamp(44px,5.2vw,72px)] font-bold lg:font-extrabold leading-[1] tracking-[-0.045em] text-white">
            The Art & Science of Scale
          </span>
        </h2>

        {/* Sub-heading */}
        <p className="mt-3 sm:mt-4 max-w-[620px] text-center text-[15px] sm:text-[18px] lg:text-[20px] font-normal leading-[1.4] text-[#A1A1AA]">
          Strategy, creative, media, and technology — under one roof.
        </p>
      </div>

      {/* 2. Responsive Grid: 3 columns on desktop, 2 columns on tablet, 1 column on mobile */}
      <div className="mx-auto mt-10 sm:mt-14 lg:mt-16 max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {servicesList.map((s) => (
            <a
              key={s.id}
              href={`/services#${s.slug}`}
              onClick={(e) => {
                if (onSelect) {
                  e.preventDefault();
                  onSelect(s.slug);
                }
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/[0.08] bg-[#0F0F14] p-5 sm:p-6 transition-all duration-300 hover:border-[#1E6BFF]/50 hover:shadow-2xl hover:shadow-blue-950/20 hover:-translate-y-1"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-900">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-200 group-hover:bg-[#1E6BFF] group-hover:scale-110">
                  <ArrowUpRight size={17} className="stroke-[2.5]" />
                </span>
              </div>

              {/* Title & Body */}
              <div className="mt-5 flex-1">
                <h3 className="font-display text-[20px] sm:text-[22px] font-bold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[14px] sm:text-[15px] leading-relaxed text-[#A1A1AA]">
                  {s.body}
                </p>
              </div>

              {/* Visible Tag Row (Visible text, NOT tooltips or hover-only) */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                {s.visibleTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/[0.06] border border-white/[0.08] px-3 py-1 text-[11.5px] font-medium text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Section CTA from brief */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] hover:bg-[#1E6BFF] hover:border-[#1E6BFF] px-7 py-3.5 text-[15px] sm:text-[16px] font-semibold text-white shadow-sm transition-all duration-200"
          >
            <span>Not sure what you need? Book a call and we’ll map it</span>
            <ArrowRight size={17} className="stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
