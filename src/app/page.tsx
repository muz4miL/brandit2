import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { BrandIntro } from "@/components/site/BrandIntro";
import { ServiceCards } from "@/components/site/ServiceCards";
import { WhoItsFor } from "@/components/site/WhoItsFor";
import { OurWorkSection } from "@/components/site/OurWorkSection";
import { Leadership } from "@/components/site/Leadership";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/FAQ";
import ReadyToScale from "@/components/ReadyToScale";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
  description:
    "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
  keywords: [
    "marketing agency",
    "Meta ads agency",
    "Google ads agency",
    "TikTok ads",
    "content production",
    "branding and design",
    "growth systems",
    "UAE marketing agency",
    "brandit",
  ],
  authors: [{ name: "brandit.", url: "/" }],
  publisher: "brandit.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
    description:
      "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
    description:
      "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Navigation */}
      <Header />

      <main className="flex flex-col">
        {/* Section 1 — Hero */}
        <div className="mx-auto w-full max-w-[1660px] xl:max-w-[1720px] px-3 sm:px-4 lg:px-6 pt-2 sm:pt-3 lg:pt-4 pb-4">
          <Hero />
        </div>

        {/* Section 2 — As Featured In (Floating Logo Strip matching Defiant) */}
        <LogoMarquee />

        {/* Section 3 — Welcome to brandit.® (Defiant Manifesto Section) */}
        <BrandIntro />

        {/* Section 4 — Services Overview (6 Services with Proof Previews) */}
        <ServiceCards />

        {/* Section 5 — Packages (Kickstart, Accelerate, Authority) */}
        <WhoItsFor />

        {/* Section 6 — Selected Proof / Creative Library */}
        <OurWorkSection />

        {/* Section 7 — Executive Leadership */}
        <Leadership />

        {/* Section 9 — Testimonials */}
        <Testimonials />

        {/* Section 10 — Questions Before You Book (FAQ) */}
        <FAQ />

        {/* Section 11 — Final CTA: Ready to be chosen, not just seen? */}
        <ReadyToScale />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
