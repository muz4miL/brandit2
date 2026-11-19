import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
import { getServicesPageContent } from "@/server/services-page-service";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicesPageContent();
  const settings = content.settings;

  const rawTitle = settings?.seoTitle?.trim();
  const title =
    rawTitle && !rawTitle.includes("Growth Engine") && !rawTitle.includes("Thrides")
      ? rawTitle
      : "Services | brandit.";
  const description =
    settings?.seoDescription ||
    "Six core marketing and growth systems engineered under one roof. UAE-forged, delivered worldwide.";
  const ogImage = settings?.ogImage;

  return {
    title,
    description,
    keywords: [
      "marketing services",
      "growth systems",
      "paid advertising",
      "content production",
      "branding and design",
      "web stores and automation",
      "influencer marketing",
      "brandit services",
    ],
    authors: [{ name: "brandit.", url: "/services" }],
    publisher: "brandit.",
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
      url: "/services",
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
