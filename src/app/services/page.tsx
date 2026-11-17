import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
import { getServicesPageContent } from "@/server/services-page-service";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicesPageContent();
  const settings = content.settings;

  const title = settings?.seoTitle || "Services & Packages | brandit. Growth Engine";
  const description =
    settings?.seoDescription ||
    "Start where you are. Grow from there. Dedicated marketing packages for every stage: Kickstart, Accelerate, and Authority.";
  const ogImage = settings?.ogImage;

  return {
    title,
    description,
    keywords: [
      "services and packages",
      "performance creative",
      "Meta ads management",
      "Google ads agency",
      "TikTok vertical video",
      "CRO landing pages",
      "email marketing",
      "web design development",
      "branding and visual direction",
      "brandit packages",
    ],
    authors: [{ name: "brandit.", url: "https://brandit.agency/services" }],
    publisher: "brandit. Digital Creative Agency",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://brandit.agency/services",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ServicesPage() {
  const content = await getServicesPageContent();
  return <ServicesContent data={content} />;
}
