import { ObjectId } from "mongodb";
import { getCollections } from "./db";
import type { PortfolioDoc, PortfolioPageSettingsDoc } from "./types";

export const defaultPortfolioPageSettings: PortfolioPageSettingsDoc = {
  seo: {
    title: "Our Work | brandit.",
    description:
      "Explore brandit. work across real estate, personal brands, wellness, development, automotive, hospitality, and creators.",
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
    return items.map((item) => ({
      ...item,
      _id: item._id?.toString(),
      altText: item.altText?.trim() || `${item.title} — ${item.outcomeLine}`,
    })) as PortfolioDoc[];
  } catch (error) {
    console.error("Could not load published portfolio:", error);
    return [];
  }
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
    return {
      items: items.map((item) => ({ ...item, _id: item._id?.toString() })) as PortfolioDoc[],
      settings: settings
        ? { ...settings, _id: settings._id?.toString() } as PortfolioPageSettingsDoc
        : defaultPortfolioPageSettings,
    };
  } catch (error) {
    console.error("Could not load portfolio admin data:", error);
    return { items: [], settings: defaultPortfolioPageSettings };
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
  if (data.isPublished && mediaUrl && !altText) {
    throw new Error("Alt text is required before publishing an item with media.");
  }

  const now = new Date();
  const { _id, ...fields } = data;
  const mediaType: "image" | "video" =
    data.mediaType === "video" ? "video" : "image";
  const record = {
    ...fields,
    slug: data.slug.trim(),
    title: data.title.trim(),
    outcomeLine: data.outcomeLine.trim(),
    mediaType,
    mediaUrl,
    posterUrl: data.posterUrl?.trim() || "",
    altText,
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
  await portfolioPageSettings.updateOne(
    {},
    { $set: { seo: settings.seo, updatedAt: new Date() } },
    { upsert: true },
  );
  return true;
}
