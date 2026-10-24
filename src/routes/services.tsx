import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  ArrowUpRight,
  Check,
  Sparkles,
  Layers,
  Zap,
  Target,
  Video,
  Palette,
  Code2,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — brandit. | Growth Systems, Paid Ads, Content, Branding & Web" },
      {
        name: "description",
        content:
          "Explore our 6 core services: Strategy & Growth Systems, Paid Advertising, Content Production, Branding & Design, Web & Shopify Stores, and Influencer Marketing.",
      },
      { property: "og:title", content: "Services — brandit. Marketing Agency" },
    ],
  }),
  component: ServicesPage,
});

interface DetailedService {
  id: string;
  slug: string;
  title: string;
  categoryNumber: string;
  shortDesc: string;
  longDesc: string;
  visibleTags: string[];
  icon: typeof Layers;
  deliverables: string[];
  process: { step: string; title: string; desc: string }[];
}

const servicesData: DetailedService[] = [
  {
    id: "strategy-growth-systems",
    slug: "strategy-growth-systems",
    title: "Strategy & Growth Systems",
    categoryNumber: "01",
    shortDesc: "The operating system behind everything else.",
    longDesc:
      "We map the end-to-end customer journey, build reproducible standard operating procedures (SOPs), and install high-granularity attribution dashboards so you never guess where revenue came from.",
    visibleTags: [
      "Marketing Strategy",
      "Growth Systems",
      "SOPs & Workflows",
      "Reporting & Attribution",
    ],
    icon: Target,
    deliverables: [
      "Full Commercial & Customer Journey Audit",
      "Revenue & Unit Economics Modeling",
      "Channel Prioritization & Budget Allocation",
      "Executive Growth Dashboard & Live Blended ROAS Tracking",
      "Bi-Weekly Strategic Cadence with Leadership",
    ],
    process: [
      {
        step: "01",
        title: "Diagnostic Audit",
        desc: "Deep-dive analysis of historical CAC, LTV, conversion bottlenecks, and competitor ad archives.",
      },
      {
        step: "02",
        title: "Growth Architecture",
        desc: "Build tailored SOPs, creative feedback loops, and tracking setups across your marketing stack.",
      },
      {
        step: "03",
        title: "Continuous Optimization",
        desc: "Ongoing weekly performance calibration and budget rebalancing based on blended contribution margin.",
      },
    ],
  },
  {
    id: "paid-advertising",
    slug: "paid-advertising",
    title: "Paid Advertising",
    categoryNumber: "02",
    shortDesc: "Campaigns built around sales reality, not vanity impressions.",
    longDesc:
      "Precision-targeted ad campaigns engineered on Meta, Google, TikTok, and LinkedIn. Structured to convert cold prospects into repeat customers with systematic creative testing.",
    visibleTags: ["Meta Ads", "Google Ads", "TikTok Ads", "Performance Creative", "Retargeting"],
    icon: Zap,
    deliverables: [
      "Omnichannel Campaign Architecture (Meta, Google Search/PMax, TikTok)",
      "High-Velocity Creative Testing Engine (15-30 variations/month)",
      "Conversion Rate Optimization (CRO) for landing pages",
      "Server-side CAPI and First-party Tracking Setup",
      "Real-time Spend & Profit Reporting",
    ],
    process: [
      {
        step: "01",
        title: "Creative & Audience Matrix",
        desc: "Map demographic hooks, pain points, and buyer segments into dedicated test angles.",
      },
      {
        step: "02",
        title: "Sprint Testing",
        desc: "Deploy small-budget validation sprints to uncover runaway winner creatives within 72 hours.",
      },
      {
        step: "03",
        title: "Aggressive Scaling",
        desc: "Pour capital into proven creative winners while maintaining target ROAS thresholds.",
      },
    ],
  },
  {
    id: "content-production",
    slug: "content-production",
    title: "Content Production",
    categoryNumber: "03",
    shortDesc: "Full in-house crew with top-tier cinema and studio gear.",
    longDesc:
      "From viral organic TikToks and Reels to broadcast-grade commercial films, brand documentaries, and corporate podcasts. Handled in our dedicated Dubai studio or on location.",
    visibleTags: [
      "Video Production",
      "Photography",
      "UGC & Reels",
      "Podcast Production",
      "Post-Production",
    ],
    icon: Video,
    deliverables: [
      "In-House Shoot Days (Cinema 4K, Master Prime Lenses, Lighting Grid)",
      "Performance-Engineered Direct Response Video Ads (Hook-Hold-CTA)",
      "High-Volume Organic Short-Form Content (Reels, TikToks, Shorts)",
      "High-Resolution Product & Editorial Photography",
      "Multi-Cam Studio Podcast Filming & Sound Engineering",
    ],
    process: [
      {
        step: "01",
        title: "Pre-Production & Scripting",
        desc: "Storyboarding, shot listing, script writing, location scouting, and talent sourcing.",
      },
      {
        step: "02",
        title: "Shoot Day Execution",
        desc: "Flawless on-set direction in our soundproof studio with professional cinema crews.",
      },
      {
        step: "03",
        title: "Dynamic Post-Production",
        desc: "Sound design, color grading, motion graphics, captions, and multiple platform aspect ratios.",
      },
    ],
  },
  {
    id: "branding-design",
    slug: "branding-design",
    title: "Branding & Design",
    categoryNumber: "04",
    shortDesc: "Look like the undisputed category leader.",
    longDesc:
      "Complete visual identity systems, brand guideline books, daily social design, packaging, and founder authority personal brands that make your business instantly recognizable.",
    visibleTags: [
      "Brand Identity",
      "Graphic Design",
      "Personal Branding",
      "Ad Creative",
      "Packaging",
    ],
    icon: Palette,
    deliverables: [
      "Comprehensive Brand Identity Systems (Logomark, Color, Type, Grid)",
      "Founder & Executive Personal Branding Toolkits",
      "Product Packaging & Physical Collateral Design",
      "Daily Social Media Templates & Visual Systems",
      "Comprehensive 60+ Page Brand Guideline Manual",
    ],
    process: [
      {
        step: "01",
        title: "Archetype & Positioning",
        desc: "Uncover the authentic market distinction and visual territory you can own completely.",
      },
      {
        step: "02",
        title: "Design Exploration",
        desc: "Craft multiple distinct visual directions with real-world application mockups.",
      },
      {
        step: "03",
        title: "Systemization & Hand-off",
        desc: "Export scalable vectors, Figma libraries, and clear implementation guidelines.",
      },
    ],
  },
  {
    id: "web-stores-automation",
    slug: "web-stores-automation",
    title: "Web, Stores & Automation",
    categoryNumber: "05",
    shortDesc: "Where incoming traffic converts into predictable revenue.",
    longDesc:
      "Ultra-fast custom web applications, high-converting Shopify Plus stores, dedicated lead capture funnels, and automated CRM workflows that work 24/7 without human intervention.",
    visibleTags: [
      "Website Design",
      "Landing Pages",
      "Shopify Stores",
      "AI Automation",
      "CRM Integration",
    ],
    icon: Code2,
    deliverables: [
      "Custom High-Speed Websites & Web Apps (React, Vite, Next.js)",
      "Turnkey Shopify Plus E-Commerce Store Architecture",
      "High-Converting Direct Response Landing Pages (Figma to Code)",
      "AI Follow-Up & WhatsApp / CRM Automated Pipelines",
      "Technical SEO & Core Web Vitals Optimization (95+ score)",
    ],
    process: [
      {
        step: "01",
        title: "Wireframing & UX Flow",
        desc: "Structure information architecture and conversion triggers before any visual coding begins.",
      },
      {
        step: "02",
        title: "Design & Development",
        desc: "High-performance responsive coding with modern frameworks, animations, and micro-interactions.",
      },
      {
        step: "03",
        title: "Automation & Launch",
        desc: "Wire up webhooks, analytics, CRM automations, and run rigorous cross-browser testing.",
      },
    ],
  },
  {
    id: "influencer-collab-marketing",
    slug: "influencer-collab-marketing",
    title: "Influencer & Collab Marketing",
    categoryNumber: "06",
    shortDesc: "Borrow established trust from audiences you haven't built yet.",
    longDesc:
      "End-to-end influencer marketing campaigns across the UAE, GCC, and international markets. We handle creator vetting, contract negotiations, creative briefs, gifting logistics, and performance tracking.",
    visibleTags: [
      "Influencer Campaigns",
      "Creator Sourcing",
      "Brand Collaborations",
      "Seeding & Gifting",
    ],
    icon: Users,
    deliverables: [
      "Creator Vetting & Fake-Follower / Engagement Audits",
      "Campaign Concepting & Creative Brief Generation",
      "Contract Negotiation & Usage Rights Protection",
      "Product Seeding, Gifting & Unboxing Coordination",
      "Whitelisting / Spark Ads Setup for Paid Amplification",
    ],
    process: [
      {
        step: "01",
        title: "Audience Alignment",
        desc: "Identify creators whose follower demographics align with your ideal customer profile.",
      },
      {
        step: "02",
        title: "Briefing & Quality Control",
        desc: "Provide structured briefs that give creators freedom while guaranteeing brand message retention.",
      },
      {
        step: "03",
        title: "Paid Amplification",
        desc: "Take top-performing creator posts and run them as Spark Ads/Partnership Ads for maximum ROI.",
      },
    ],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <Header />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="border-b border-black/[0.06] pt-12 pb-20 md:pt-16 md:pb-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                <Sparkles size={13} className="text-black" />
                <span>Our Capabilities</span>
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09090B] leading-[1.1]">
                Full-Stack Agency Capabilities. <br />
                <span className="font-serif italic font-normal text-[#3F3F46]">
                  Single-Point Accountability.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#52525B]">
                No fragmented freelancers. No hand-off excuses. We engineer and execute the 6
                foundational pillars required to dominate your category.
              </p>

              {/* Jump Nav Quick Links */}
              <div className="mt-8 flex flex-wrap gap-2">
                {servicesData.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#09090B] transition-colors hover:bg-black hover:text-white"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6 Services Deep-Dive Sections */}
        <div className="divide-y divide-black/[0.06]">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isDark = index % 2 === 1;

            return (
              <section
                key={service.id}
                id={service.slug}
                className={`scroll-mt-24 py-20 md:py-28 ${
                  isDark ? "bg-[#09090B] text-white" : "bg-[#FAFAFA] text-[#09090B]"
                }`}
              >
                <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Header, Description & Visible Tags */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-display text-sm font-extrabold tracking-widest ${
                            isDark ? "text-neutral-500" : "text-[#A1A1AA]"
                          }`}
                        >
                          {service.categoryNumber}
                        </span>
                        <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                        <div
                          className={`grid h-9 w-9 place-items-center rounded-xl ${
                            isDark ? "bg-white/10 text-white" : "bg-black text-white"
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                      </div>

                      <h2
                        className={`mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight ${
                          isDark ? "text-white" : "text-[#09090B]"
                        }`}
                      >
                        {service.title}
                      </h2>
                      <p
                        className={`mt-3 text-base font-medium ${
                          isDark ? "text-neutral-400" : "text-[#52525B]"
                        }`}
                      >
                        {service.shortDesc}
                      </p>
                      <p
                        className={`mt-4 text-[15px] leading-relaxed ${
                          isDark ? "text-neutral-300" : "text-[#52525B]"
                        }`}
                      >
                        {service.longDesc}
                      </p>

                      {/* Visible Tags as specified in brief */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.visibleTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`rounded-md px-3 py-1 text-xs font-semibold ${
                              isDark
                                ? "bg-white/10 text-neutral-200 border border-white/15"
                                : "bg-white text-[#3F3F46] border border-black/10 shadow-sm"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8">
                        <a
                          href={`/contact?service=${encodeURIComponent(service.title)}`}
                          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                            isDark
                              ? "bg-white text-black hover:bg-neutral-200"
                              : "bg-black text-white hover:bg-neutral-800"
                          }`}
                        >
                          <span>Inquire for {service.title}</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Deliverables & 3-Step Process */}
                    <div className="lg:col-span-7 space-y-8">
                      {/* Deliverables Card */}
                      <div
                        className={`rounded-2xl border p-6 sm:p-8 ${
                          isDark
                            ? "border-white/10 bg-white/[0.03]"
                            : "border-black/[0.08] bg-white shadow-sm"
                        }`}
                      >
                        <h3
                          className={`font-display text-lg font-bold tracking-tight ${
                            isDark ? "text-white" : "text-[#09090B]"
                          }`}
                        >
                          What You Get (Deliverables)
                        </h3>
                        <ul className="mt-5 space-y-3">
                          {service.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-3">
                              <span
                                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                                  isDark ? "bg-white/10 text-white" : "bg-black/5 text-black"
                                }`}
                              >
                                <Check size={12} className="stroke-[3]" />
                              </span>
                              <span
                                className={`text-sm leading-relaxed ${
                                  isDark ? "text-neutral-300" : "text-[#3F3F46]"
                                }`}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Process Steps */}
                      <div>
                        <h3
                          className={`font-display text-sm font-bold uppercase tracking-widest ${
                            isDark ? "text-neutral-400" : "text-[#71717A]"
                          }`}
                        >
                          How It Works
                        </h3>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          {service.process.map((p, pIdx) => (
                            <div
                              key={pIdx}
                              className={`rounded-xl border p-4 ${
                                isDark
                                  ? "border-white/10 bg-white/[0.02]"
                                  : "border-black/[0.08] bg-white shadow-xs"
                              }`}
                            >
                              <div
                                className={`font-display text-xs font-extrabold ${
                                  isDark ? "text-neutral-400" : "text-[#A1A1AA]"
                                }`}
                              >
                                STEP {p.step}
                              </div>
                              <div
                                className={`mt-2 font-display text-sm font-bold ${
                                  isDark ? "text-white" : "text-[#09090B]"
                                }`}
                              >
                                {p.title}
                              </div>
                              <p
                                className={`mt-1.5 text-xs leading-relaxed ${
                                  isDark ? "text-neutral-400" : "text-[#52525B]"
                                }`}
                              >
                                {p.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Global Services CTA */}
        <section className="bg-white py-20 border-t border-black/[0.06] text-center">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090B]">
              Not sure which service fits your current stage?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-[#52525B]">
              Book a 30-minute discovery call with our growth architects. We will analyze your
              current numbers and recommend the exact roadmap.
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
                href="https://wa.me/971525347120?text=Hi%20brandit.%20team%2C%20I%20would%20like%20to%20discuss%20services%20for%20my%20brand."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 bg-white px-7 text-sm font-semibold text-[#09090B] transition-all hover:bg-black/5"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
