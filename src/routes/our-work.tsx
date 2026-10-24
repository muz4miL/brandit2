import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowUpRight, Sparkles } from "lucide-react";

import halo from "@/assets/work-identity-halo.jpg";
import skin from "@/assets/work-package-skin.jpg";
import pulse from "@/assets/work-identity-pulse.jpg";
import rise from "@/assets/work-package-rise.jpg";
import voltex from "@/assets/work-ad-sneaker.jpg";
import juice from "@/assets/work-social-juice.jpg";
import home from "@/assets/work-campaign-home.jpg";
import travel from "@/assets/work-ads-travel.jpg";
import service1 from "@/assets/service-identity.jpg";
import service2 from "@/assets/service-social.jpg";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — brandit. | Selected Client Work & Outcomes" },
      {
        name: "description",
        content:
          "Browse selected brand identity, performance creative, video production, and digital systems built for leading brands across industries.",
      },
      { property: "og:title", content: "Our Work — brandit. Portfolio" },
    ],
  }),
  component: OurWorkPage,
});

interface PortfolioItem {
  id: string;
  client: string;
  category: "Branding" | "Video & Media" | "Paid Ads" | "Web & Stores";
  title: string;
  outcome: string;
  image: string;
  alt: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: "fam-properties",
    client: "fäm Properties",
    category: "Video & Media",
    title: "Enterprise Brokerage Content System",
    outcome: "One content system across an entire enterprise brokerage.",
    image: halo,
    alt: "fäm Properties luxury real estate video content system",
  },
  {
    id: "founder-brand",
    client: "Founder Personal Brand",
    category: "Branding",
    title: "Executive Authority Architecture",
    outcome: "An executive authority system that scaled to six figures.",
    image: skin,
    alt: "Founder personal brand visual identity and video production",
  },
  {
    id: "dxb-interact",
    client: "DXB Interact",
    category: "Paid Ads",
    title: "Property Data Authority Engine",
    outcome: "Turning market data into a trusted authority platform.",
    image: pulse,
    alt: "DXB Interact real estate data platform performance creative",
  },
  {
    id: "fam-luxe",
    client: "fäm Luxe",
    category: "Video & Media",
    title: "Ultra-High-Net-Worth Showcase",
    outcome: "A luxury content system built for high-net-worth buyers.",
    image: rise,
    alt: "fäm Luxe luxury real estate cinematic showcase",
  },
  {
    id: "aesthetic-clinics",
    client: "Aesthetic Clinics",
    category: "Paid Ads",
    title: "Patient Acquisition Funnels",
    outcome: "Lead-gen campaigns delivering qualified bookings at efficient cost.",
    image: voltex,
    alt: "Aesthetic clinics direct-response patient acquisition ads",
  },
  {
    id: "salons-beauty",
    client: "Salons & Beauty",
    category: "Video & Media",
    title: "DTC Community & Booking Launch",
    outcome: "Consistent conversations and new customers, month over month.",
    image: juice,
    alt: "Salons and beauty brand social media and booking campaigns",
  },
  {
    id: "developers-offplan",
    client: "Developers & Off-Plan",
    category: "Paid Ads",
    title: "Off-Plan Launch & Acquisition",
    outcome: "Full project marketing from launch to leads.",
    image: home,
    alt: "Property developer off-plan launch campaign creative",
  },
  {
    id: "luxury-supercars",
    client: "Luxury Supercars",
    category: "Video & Media",
    title: "Prestige Automotive Production",
    outcome: "Prestige content for high-end automotive brands.",
    image: travel,
    alt: "Prestige luxury automotive cinematic video production",
  },
  {
    id: "holiday-homes",
    client: "Holiday Homes",
    category: "Web & Stores",
    title: "Investor-Facing Yield Portals",
    outcome: "Investor-facing passive-income campaigns.",
    image: service1,
    alt: "Holiday homes investor marketing campaign and photography",
  },
  {
    id: "influencers-creators",
    client: "Personal Brands & Influencers",
    category: "Branding",
    title: "Audience Monetization Systems",
    outcome: "Organic growth from small to large audiences.",
    image: service2,
    alt: "Creator and influencer high-retention content system",
  },
];

const categories = ["All", "Branding", "Video & Media", "Paid Ads", "Web & Stores"] as const;

function OurWorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems =
    selectedCategory === "All"
      ? portfolioData
      : portfolioData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <Header />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="border-b border-black/[0.06] pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                <Sparkles size={13} className="text-black" />
                <span>Selected Portfolio</span>
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09090B] leading-[1.1]">
                Work Engineered for Revenue. <br />
                <span className="font-serif italic font-normal text-[#3F3F46]">
                  Crafted for Longevity.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#52525B]">
                Every project represents an integrated system: high-calibre visual identity,
                performance-driven video creative, and conversion-engineered digital infrastructure.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-black text-white shadow-sm"
                      : "bg-white text-[#52525B] border border-black/10 hover:border-black/30 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid — Strict adherence: 16:9 media, NO "View Project" buttons */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-all duration-300 hover:border-black/25 hover:shadow-md"
                >
                  {/* 16:9 Media Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                        {item.client}
                      </span>
                      <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-[#09090B]">
                        {item.title}
                      </h2>
                    </div>

                    {/* Outcome Metric */}
                    <div className="mt-5 border-t border-black/[0.06] pt-4">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-[#71717A]">
                        Key Outcome
                      </div>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-[#09090B]">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-white py-20 border-t border-black/[0.06] text-center">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090B]">
              Ready to engineer your brand’s next chapter?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-[#52525B]">
              Let’s look at your current numbers and build an integrated creative and media engine
              designed for profit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-semibold text-white transition-all hover:bg-neutral-800"
              >
                <span>Book a Discovery Call</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="/services"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 bg-white px-7 text-sm font-semibold text-[#09090B] transition-all hover:bg-black/5"
              >
                <span>Explore Services</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
