import type { Metadata } from "next";
import { getPublicPortfolio, getPublicPortfolioSettings } from "@/server/portfolio-service";
import { OurWorkClient } from "./OurWorkClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicPortfolioSettings();
  const title = settings?.seo?.title || "Our Work | brandit.";
  const description =
    settings?.seo?.description ||
    "Where top brands come to create. Explore selected brand identities, campaigns, video systems, and digital platforms built by brandit.";

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
  const [items, settings] = await Promise.all([
    getPublicPortfolio(),
    getPublicPortfolioSettings(),
  ]);

  return <OurWorkClient settings={settings} items={items} />;
}
