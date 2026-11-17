import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { BrandIntro } from "@/components/site/BrandIntro";
import { ServiceCards } from "@/components/site/ServiceCards";
import { WhoItsFor } from "@/components/site/WhoItsFor";
import { OurWorkSection } from "@/components/site/OurWorkSection";
import CreativeShowcase from "@/components/CreativeShowcase";
import { Leadership } from "@/components/site/Leadership";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/FAQ";
import ReadyToScale from "@/components/ReadyToScale";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "brandit. | Digital Creative Agency",
  description:
    "brandit. is a digital creative agency that puts your brand in front of the right customers, with a purpose behind every move. Book a free strategy call.",
  openGraph: {
    title: "brandit. | Digital Creative Agency",
    description:
      "brandit. is a digital creative agency that puts your brand in front of the right customers, with a purpose behind every move. Book a free strategy call.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#08080B] text-white">
      {/* Navigation */}
      <Header />

      <main className="flex flex-col">
        {/* Section 1 — Hero */}
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 md:px-6 pt-2 pb-4">
          <Hero />
        </div>

        {/* Section 2 — Trust Bar (3 years · 14+ businesses · 8 countries) */}
        <LogoMarquee />

        {/* Section 3 — Welcome to brandit.® (Defiant Manifesto Section) */}
        <BrandIntro />

        {/* Section 4 — Services Overview (6 Services with Proof Previews) */}
        <ServiceCards />

        {/* Section 5 — Packages (Kickstart, Accelerate, Authority) */}
        <WhoItsFor />

        {/* Section 6 — Selected Proof / Our Work */}
        <OurWorkSection />

        {/* Section 7 — Creative Library */}
        <CreativeShowcase />

        {/* Section 8 — Executive Leadership */}
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
