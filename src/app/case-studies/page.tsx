import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublicWorkPageData } from "@/server/work-service";
import { CaseStudiesPageClient } from "./CaseStudiesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPublicWorkPageData();

  return {
    title: "Case Studies | brandit.",
    description:
      settings?.seo?.description ||
      "Learn more about the tactics that grew our clients' brands. Explore measured client growth engineered by brandit.",
    openGraph: {
      title: "Case Studies | brandit.",
      description:
        settings?.seo?.description ||
        "Learn more about the tactics that grew our clients' brands. Explore measured client growth engineered by brandit.",
      images: settings?.seo?.ogImage ? [{ url: settings.seo.ogImage }] : undefined,
    },
    alternates: {
      canonical: "/case-studies",
    },
  };
}

export default async function CaseStudiesPage() {
  const { settings, projects } = await getPublicWorkPageData();

  // JSON-LD structured data for creative work portfolio
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies | brandit.",
    description:
      "Learn more about the tactics that grew our clients' brands. Explore measured client growth engineered by brandit.",
    url: "https://brandit.com/case-studies",
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      headline: p.title,
      description: p.summary,
      creator: {
        "@type": "Organization",
        name: "brandit.",
      },
      image: p.thumbnailUrl,
      url: `https://brandit.com/case-studies/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#070709]" />}>
        <CaseStudiesPageClient settings={settings} projects={projects} />
      </Suspense>
    </>
  );
}
