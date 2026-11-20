import type { Metadata } from "next";
import { getPublicWorkPageData } from "@/server/work-service";
import { OurWorkClient } from "./OurWorkClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPublicWorkPageData();
  const title = settings?.seo?.title || "Our Work | brandit.";
  const description =
    settings?.seo?.description ||
    "Where top brands come to scale. Explore measured performance systems, creative strategy, and digital experiences engineered by brandit.";

  return {
    title,
    description,
    alternates: { canonical: "/our-work" },
    openGraph: {
      title,
      description,
      ...(settings?.seo?.ogImage ? { images: [settings.seo.ogImage] } : {}),
    },
  };
}

export default async function OurWorkPage() {
  const { settings, projects } = await getPublicWorkPageData();
  return <OurWorkClient settings={settings} projects={projects} />;
}
