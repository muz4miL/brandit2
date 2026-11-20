import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { ServiceCards } from "@/components/site/ServiceCards";
import { OurWorkSection } from "@/components/site/OurWorkSection";
import { WhoItsFor } from "@/components/site/WhoItsFor";
import { WhyBrandit } from "@/components/site/WhyBrandit";
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

        {/* Section 2 — Trust Strip */}
        <LogoMarquee />

        {/* Section 3 — Services */}
        <ServiceCards />

        {/* Section 4 — Our Work */}
        <OurWorkSection />

        {/* Section 5 — Who It’s For */}
        <WhoItsFor />

        {/* Section 6 — Why brandit. */}
        <WhyBrandit />

        {/* Section 7 — About the CEO */}
        <Leadership />

        {/* Section 8 — Testimonials */}
        <Testimonials />

        {/* Section 9 — FAQ */}
        <FAQ />

        {/* Section 10 — Final CTA */}
        <ReadyToScale />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
