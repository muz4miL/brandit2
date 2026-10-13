import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { BrandIntro } from "@/components/site/BrandIntro";
import { ServiceCards } from "@/components/site/ServiceCards";
import { Footer } from "@/components/site/Footer";
import TrustedBy from "@/components/TrustedBy";
import CreativeShowcase from "@/components/CreativeShowcase";
import StudioSection from "@/components/StudioSection";
import WhoWeAre from "@/components/WhoWeAre";
import FAQ from "@/components/FAQ";
import ReadyToScale from "@/components/ReadyToScale";
import { serviceOptions, type Category } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brand It — Brand identity, social content & advertising" },
      {
        name: "description",
        content:
          "Brand It builds brands: logos and identity, social content, ad creative and campaigns.",
      },
      { property: "og:title", content: "Brand It — We Build Brands." },
      { property: "og:description", content: "Brand identity, social content and advertising." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const catToService: Record<Category, string> = {
  identity: serviceOptions[0] ?? "Brand identity",
  social: serviceOptions[1] ?? "Social media design",
  ads: serviceOptions[2] ?? "Ad creative & campaigns",
  packages: serviceOptions[3] ?? "Complete brand package",
};

function Index() {
  const [service, setService] = useState(serviceOptions[0] ?? "Brand identity");

  const goWork = (c: Category) => {
    setService(catToService[c]);
    document.getElementById("contact")?.scrollIntoView();
  };

  return (
    <>
      <Header onSelectService={goWork} />
      <main className="flex flex-col gap-4 pb-4 md:gap-6">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-6">
          <Hero />
        </div>
        <LogoMarquee />
        <BrandIntro />
        <ServiceCards onSelect={goWork} />
        <TrustedBy />
        <CreativeShowcase />
        <StudioSection />
        <WhoWeAre />
        <FAQ />
        <ReadyToScale />
      </main>
      <Footer />
    </>
  );
}
