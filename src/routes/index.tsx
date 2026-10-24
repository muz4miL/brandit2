import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { ServiceCards } from "@/components/site/ServiceCards";
import { OurWorkSection } from "@/components/site/OurWorkSection";
import { WhoItsFor } from "@/components/site/WhoItsFor";
import { WhyBrandit } from "@/components/site/WhyBrandit";
import { AboutCEO } from "@/components/site/AboutCEO";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import FAQ from "@/components/FAQ";
import ReadyToScale from "@/components/ReadyToScale";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "brandit. — Marketing Agency | Ads, Content, Branding & Web" },
      {
        name: "description",
        content:
          "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
      },
      {
        property: "og:title",
        content: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
      },
      {
        property: "og:description",
        content:
          "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      {/* Navigation */}
      <Header />

      <main className="flex flex-col">
        {/* Section 1 — Hero */}
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 md:px-6 pt-2 pb-4">
          <Hero />
        </div>

        {/* Section 2 — Trust Strip */}
        <LogoMarquee />

        {/* Section 3 — Services (6-service 3/2/1 grid with visible tags) */}
        <ServiceCards />

        {/* Section 4 — Our Work (10 supplied portfolio cards with 16:9 media, no View Project buttons) */}
        <OurWorkSection />

        {/* Section 5 — Who It’s For */}
        <WhoItsFor />

        {/* Section 6 — Why brandit. */}
        <WhyBrandit />

        {/* Section 7 — About the CEO (Umar Farooq) */}
        <AboutCEO />

        {/* Section 8 — Testimonials (3 structured cards) */}
        <TestimonialsSection />

        {/* Section 9 — FAQ (Initially collapsed) */}
        <FAQ />

        {/* Section 10 — Final CTA */}
        <ReadyToScale />
      </main>

      {/* Footer (No navigation links) */}
      <Footer />
    </div>
  );
}
