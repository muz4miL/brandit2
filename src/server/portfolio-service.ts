import { ObjectId } from "mongodb";
import { getCollections } from "./db";
import type { PortfolioDoc, PortfolioPageSettingsDoc } from "./types";

export const defaultPortfolioItems: PortfolioDoc[] = [
  {
    slug: "fam-properties",
    client: "fäm Properties",
    category: "Video & Media",
    title: "Enterprise Brokerage Content System",
    outcomeLine: "One content system across an entire enterprise brokerage.",
    mediaType: "image",
    mediaUrl: "/images/work/work-identity-halo.jpg",
    altText: "fäm Properties luxury real estate video content system",
    order: 1,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "founder-brand",
    client: "Founder Personal Brand",
    category: "Branding",
    title: "Executive Authority Architecture",
    outcomeLine: "An executive authority system that scaled to six figures.",
    mediaType: "image",
    mediaUrl: "/images/work/work-package-skin.jpg",
    altText: "Founder personal brand visual identity and video production",
    order: 2,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "dxb-interact",
    client: "DXB Interact",
    category: "Paid Ads",
    title: "Property Data Authority Engine",
    outcomeLine: "Turning market data into a trusted authority platform.",
    mediaType: "image",
    mediaUrl: "/images/work/work-identity-pulse.jpg",
    altText: "DXB Interact real estate data platform performance creative",
    order: 3,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "fam-luxe",
    client: "fäm Luxe",
    category: "Video & Media",
    title: "Ultra-High-Net-Worth Showcase",
    outcomeLine: "A luxury content system built for high-net-worth buyers.",
    mediaType: "image",
    mediaUrl: "/images/work/work-package-rise.jpg",
    altText: "fäm Luxe luxury real estate cinematic showcase",
    order: 4,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "aesthetic-clinics",
    client: "Aesthetic Clinics",
    category: "Paid Ads",
    title: "Patient Acquisition Funnels",
    outcomeLine: "Lead-gen campaigns delivering qualified bookings at efficient cost.",
    mediaType: "image",
    mediaUrl: "/images/work/work-ad-sneaker.jpg",
    altText: "Aesthetic clinics direct-response patient acquisition ads",
    order: 5,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "salons-beauty",
    client: "Salons & Beauty",
    category: "Video & Media",
    title: "DTC Community & Booking Launch",
    outcomeLine: "Consistent conversations and new customers, month over month.",
    mediaType: "image",
    mediaUrl: "/images/work/work-social-juice.jpg",
    altText: "Salons and beauty brand social media and booking campaigns",
    order: 6,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "developers-offplan",
    client: "Developers & Off-Plan",
    category: "Paid Ads",
    title: "Off-Plan Launch & Acquisition",
    outcomeLine: "Full project marketing from launch to leads.",
    mediaType: "image",
    mediaUrl: "/images/work/work-campaign-home.jpg",
    altText: "Property developer off-plan launch campaign creative",
    order: 7,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "luxury-supercars",
    client: "Luxury Supercars",
    category: "Video & Media",
    title: "Prestige Automotive Production",
    outcomeLine: "Prestige content for high-end automotive brands.",
    mediaType: "image",
    mediaUrl: "/images/work/work-ads-travel.jpg",
    altText: "Prestige luxury automotive cinematic video production",
    order: 8,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "holiday-homes",
    client: "Holiday Homes",
    category: "Web & Stores",
    title: "Investor-Facing Yield Portals",
    outcomeLine: "Investor-facing passive-income campaigns.",
    mediaType: "image",
    mediaUrl: "/images/work/service-identity.jpg",
    altText: "Holiday homes investor marketing campaign and photography",
    order: 9,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    slug: "personal-brands",
    client: "Personal Brands & Influencers",
    category: "Branding",
    title: "Organic Authority & Scaling",
    outcomeLine: "Organic audience growth engineered from ground up.",
    mediaType: "image",
    mediaUrl: "/images/work/service-social.jpg",
    altText: "Personal brands and creators audience scaling system",
    order: 10,
    isPublished: true,
    source: "portfolio",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
];

export const defaultPortfolioPageSettings: PortfolioPageSettingsDoc = {
  heroBadgeText: "brandit.® Work",
  heroHeadingLine1: "Where top brands",
  heroHeadingLine2: "come to create",
  heroSupportingCopy:
    "Performance marketing, cinematic production, and conversion systems built for high-growth brands.",
  heroCtaText: "Discovery Call",
  heroCtaUrl: "/contact",
  heroVideoUrl: "",
  quoteText:
    "Their superpower is combining scale and performance execution, unmatched by any agency I've worked with.",
  quoteAuthor: "Marcus Sterling",
  quoteRole: "Senior Managing Partner",
  quoteCompany: "Apex Strategic Advisory",
  capabilitiesHeading: "A standard built to inspire.",
  capabilitiesSubheading:
    "From high-impact performance ads to full-scale enterprise digital experiences, we engineer every layer in-house.",
  capabilitiesList: [
    { title: "Meta & Instagram Direct-Response Ads", category: "Paid Performance" },
    { title: "Google Search & High-Intent Shopping", category: "Paid Performance" },
    { title: "Performance Ad Creative & UGC Systems", category: "Creative Strategy" },
    { title: "Conversion Rate Optimization (CRO)", category: "Growth Systems" },
    { title: "Bespoke Web Design & Next.js Architecture", category: "Digital Engineering" },
    { title: "Full-Funnel Lifecycle Email & SMS Marketing", category: "Retention" },
    { title: "Executive Brand Identity & Design Systems", category: "Branding" },
    { title: "Enterprise Automation & Lead Pipelines", category: "Automation" },
  ],
  faqs: [
    {
      question: "How does brandit. structure client engagements?",
      answer:
        "We operate as a dedicated growth and creative partner. Every partnership is bespoke—spanning sprint-based positioning transformations, ongoing performance ad management, or full-funnel digital infrastructure builds.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We partner primarily with fast-scaling E-Commerce brands, high-ticket Professional Services, SaaS platforms, and enterprise advisories looking for disciplined performance marketing and premium positioning.",
    },
    {
      question: "How quickly do we see measurable results?",
      answer:
        "Paid media and ad creative sprints go live within 10–14 days. Strategic positioning and full-scale web platforms typically deploy within 3–4 weeks, with live analytics and attributed pipeline tracking from day one.",
    },
    {
      question: "Do you create all creative and video in-house?",
      answer:
        "Yes. Everything from creative strategy, scriptwriting, and production to post-production and motion design is executed in-house by our dedicated creatives and editors.",
    },
  ],
  closingCtaHeadingLine1: "Ready to",
  closingCtaHeadingLine2: "Scale?",
  closingCtaCopy:
    "Partner with a performance creative agency that builds high-converting systems engineered for serious growth.",
  closingCtaButtonText: "Book a Strategy Call",
  closingCtaDestination: "/contact",
  seo: {
    title: "Our Work | brandit.",
    description:
      "Where top brands come to create. Explore selected brand identities, campaigns, video systems, and digital platforms built by brandit.",
    ogImage: "/images/work/work-identity-halo.jpg",
  },
  updatedAt: new Date("2026-01-01"),
};

export async function getPublicPortfolioSettings(): Promise<PortfolioPageSettingsDoc> {
  try {
    const { portfolioPageSettings } = await getCollections();
    const settings = await portfolioPageSettings.findOne({});
    return settings
      ? ({ ...settings, _id: settings._id?.toString() } as PortfolioPageSettingsDoc)
      : defaultPortfolioPageSettings;
  } catch {
    return defaultPortfolioPageSettings;
  }
}

export async function getPublicPortfolio(): Promise<PortfolioDoc[]> {
  try {
    const { portfolio } = await getCollections();
    const items = await portfolio.find({ isPublished: true }).sort({ order: 1 }).toArray();
    if (items.length > 0) {
      return items.map((item) => ({
        ...item,
        _id: item._id?.toString(),
        altText: item.altText?.trim() || `${item.title} — ${item.outcomeLine}`,
      })) as PortfolioDoc[];
    }
  } catch (error) {
    console.error("Could not load published portfolio from DB, using fallback:", error);
  }
  return defaultPortfolioItems;
}

export async function getAdminPortfolio(): Promise<{
  items: PortfolioDoc[];
  settings: PortfolioPageSettingsDoc;
}> {
  try {
    const { portfolio, portfolioPageSettings } = await getCollections();
    const [items, settings] = await Promise.all([
      portfolio.find({}).sort({ order: 1 }).toArray(),
      portfolioPageSettings.findOne({}),
    ]);
    const cleanItems = items.length > 0
      ? items.map((item) => ({ ...item, _id: item._id?.toString() }))
      : defaultPortfolioItems;
    return {
      items: cleanItems as PortfolioDoc[],
      settings: settings
        ? ({ ...settings, _id: settings._id?.toString() } as PortfolioPageSettingsDoc)
        : defaultPortfolioPageSettings,
    };
  } catch (error) {
    console.error("Could not load portfolio admin data:", error);
    return { items: defaultPortfolioItems, settings: defaultPortfolioPageSettings };
  }
}

export async function saveAdminPortfolioItem(
  data: Partial<PortfolioDoc> & { _id?: string },
): Promise<{ success: boolean; id: string }> {
  if (!data.slug?.trim() || !data.title?.trim() || !data.outcomeLine?.trim()) {
    throw new Error("Slug, title, and outcome line are required.");
  }
  const mediaUrl = data.mediaUrl?.trim() || "";
  const altText = data.altText?.trim() || "";

  const now = new Date();
  const { _id, ...fields } = data;
  const mediaType: "image" | "video" = data.mediaType === "video" ? "video" : "image";
  const record = {
    ...fields,
    slug: data.slug.trim(),
    title: data.title.trim(),
    client: data.client?.trim() || data.title.trim(),
    category: data.category?.trim() || "Branding",
    outcomeLine: data.outcomeLine.trim(),
    mediaType,
    mediaUrl,
    posterUrl: data.posterUrl?.trim() || "",
    altText: altText || `${data.title} — ${data.outcomeLine}`,
    detailUrl: data.detailUrl?.trim() || "",
    order: Number.isFinite(data.order) ? Number(data.order) : 1,
    isPublished: Boolean(data.isPublished),
    source: "portfolio" as const,
    updatedAt: now,
  };

  const { portfolio } = await getCollections();
  if (_id && ObjectId.isValid(_id)) {
    await portfolio.updateOne({ _id: new ObjectId(_id) }, { $set: record });
    return { success: true, id: _id };
  }
  const existing = await portfolio.findOne({ slug: record.slug });
  if (existing) {
    await portfolio.updateOne({ _id: existing._id }, { $set: record });
    return { success: true, id: existing._id.toString() };
  }
  const result = await portfolio.insertOne({ ...record, createdAt: now } as PortfolioDoc);
  return { success: true, id: result.insertedId.toString() };
}

export async function deleteAdminPortfolioItem(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const { portfolio } = await getCollections();
  await portfolio.deleteOne({ _id: new ObjectId(id) });
  return true;
}

export async function saveAdminPortfolioSettings(
  settings: Partial<PortfolioPageSettingsDoc>,
): Promise<boolean> {
  const { portfolioPageSettings } = await getCollections();
  const { _id, ...fields } = settings;
  await portfolioPageSettings.updateOne(
    {},
    { $set: { ...fields, updatedAt: new Date() } },
    { upsert: true },
  );
  return true;
}
