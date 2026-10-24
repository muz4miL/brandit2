import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  ArrowUpRight,
  CheckCircle2,
  Linkedin,
  Instagram,
  Sparkles,
  Shield,
  TrendingUp,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About brandit. — UAE-Forged Growth & Creative Agency" },
      {
        name: "description",
        content:
          "Learn about brandit., our systems-first philosophy, founder Umar Farooq, and how we engineer profitable brand growth across the UAE and worldwide.",
      },
      { property: "og:title", content: "About brandit. — UAE-Forged Growth & Creative Agency" },
      {
        property: "og:description",
        content:
          "Full-service agency combining paid ads, content production, branding, and web infrastructure.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <Header />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-black/[0.06]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                <Sparkles size={13} className="text-black" />
                <span>Our Story & Philosophy</span>
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09090B] leading-[1.1]">
                We Engineer Growth. <br />
                <span className="font-serif italic font-normal text-[#3F3F46]">
                  Not Just Noise.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#52525B]">
                brandit. was built on a simple premise: marketing without revenue architecture is
                just expensive entertainment. We combine high-calibre creative production with
                rigorous performance engineering.
              </p>
            </div>

            {/* Metrics Strip */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              {[
                { number: "100+", label: "Brands Scaled Worldwide" },
                { number: "$25M+", label: "Ad Spend Managed Profitably" },
                { number: "120M+", label: "Organic & Paid Video Views" },
                { number: "1 In-House", label: "Production Studio in Dubai" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm transition-all hover:border-black/20"
                >
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#09090B]">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-medium text-[#71717A]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Philosophy / Systems-First Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#71717A]">
                  How We Think
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#09090B]">
                  Creative backed by numbers.{" "}
                  <span className="font-serif italic font-normal">Built for scale.</span>
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#52525B]">
                  Most agencies hand off fragmented pieces: a video team that doesn’t understand ad
                  auctions, a media buyer who doesn’t understand design, and a developer who doesn’t
                  track conversions.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#52525B]">
                  At brandit., every asset is tied to a feedback loop. Creative fuels the ads, ads
                  inform the conversion funnel, and real-time revenue data guides the next
                  production cycle.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Shield,
                    title: "Strategy Before Execution",
                    desc: "We diagnose before we prescribe. Content architectures, customer journeys, and unit economics are locked before a single camera rolls.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Performance Engineering",
                    desc: "Creative is tested against strict CPA and ROAS benchmarks. What wins gets scaled; what doesn't gets iterated or killed swiftly.",
                  },
                  {
                    icon: Layers,
                    title: "Full-Stack Ownership",
                    desc: "In-house production studio, dedicated media buyers, Shopify engineers, and branding strategists all collaborating under one roof.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Radical Transparency",
                    desc: "No vanity impressions or opaque retainer hours. Live dashboards, transparent media spend, and direct Slack communication.",
                  },
                ].map((pillar, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm transition-all hover:border-black/20"
                  >
                    <div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white">
                        <pillar.icon size={20} />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-[#09090B]">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#52525B]">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Umar Farooq / Leadership Section */}
        <section className="bg-[#09090B] py-20 md:py-28 text-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto aspect-[4/5] max-w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl">
                  <img
                    src="/lovable-uploads/eebc3f68-1994-4903-8392-80ba2d7aee2a.png"
                    alt="Umar Farooq — Founder & CEO of brandit."
                    className="h-full w-full object-cover object-top filter grayscale contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-xl font-bold text-white">Umar Farooq</p>
                    <p className="text-xs uppercase tracking-wider text-neutral-400">
                      Founder & Chief Executive Officer
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-medium text-neutral-300">
                  Leadership & Vision
                </div>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Meet the Founder
                </h2>
                <div className="mt-6 space-y-4 text-[15px] sm:text-base leading-relaxed text-neutral-300">
                  <p>
                    Umar Farooq founded brandit. to bridge the massive chasm between high-gloss
                    brand aesthetics and cold, hard performance metrics. Having worked hands-on with
                    leading regional players including fäm Properties, DXB Interact, and
                    international luxury operators, he saw brands continually burning cash on
                    disconnected agency retainers.
                  </p>
                  <p>
                    Under his leadership, brandit. operates as an end-to-end growth partner —
                    engineering every campaign from initial market research and creative scripting
                    through to multi-million dollar ad management and conversion infrastructure.
                  </p>
                  <p>
                    Based in Dubai, UAE, Umar frequently advises high-growth e-commerce founders,
                    property conglomerates, and corporate executives on personal branding and
                    scalable media engines.
                  </p>
                </div>

                {/* Social Connects */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/umarfarooq-brandit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <Linkedin size={15} />
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="https://www.instagram.com/umarfarooq.dxb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <Instagram size={15} />
                    <span>Follow on Instagram</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Delivery Strip */}
        <section className="py-20 border-b border-black/[0.06]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#71717A]">
              Operating Worldwide
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#09090B]">
              UAE-Forged. Globally Delivered.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[#52525B]">
              Headquartered in Dubai’s premier media district with clients across the GCC, Europe,
              the United Kingdom, and the United States.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
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
                <span>Explore Our Services</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
