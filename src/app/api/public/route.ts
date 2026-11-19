import { NextResponse } from "next/server";
import { getCollections } from "@/server/db";

export const revalidate = 0;

export async function GET() {
  try {
    const { siteSettings, testimonials } = await getCollections();
    const settingsDoc =
      (await siteSettings.findOne({ agencyName: "brandit." })) || (await siteSettings.findOne({}));

    const testimonialDocs = await testimonials
      .find({ isPublished: true })
      .sort({ order: 1, _id: 1 })
      .toArray();

    return NextResponse.json({
      settings: settingsDoc
        ? {
            agencyName: settingsDoc.agencyName,
            tagline: settingsDoc.tagline,
            contactEmail: settingsDoc.contactEmail,
            phoneWhatsApp: settingsDoc.phoneWhatsApp,
            whatsappLink: settingsDoc.whatsappLink,
            socialLinks: settingsDoc.socialLinks,
            globalSeo: settingsDoc.globalSeo,
            founder: settingsDoc.founder ?? null,
          }
        : null,
      testimonials: testimonialDocs.map((d) => ({
        _id: d._id?.toString(),
        quote: d.quote,
        clientName: d.clientName,
        clientTitle: d.clientTitle,
        companyName: d.companyName,
        companyCategory: d.companyCategory ?? "",
        companyLogoUrl: d.companyLogoUrl ?? "",
        clientPhotoUrl: d.clientPhotoUrl ?? "",
        clientVideoUrl: d.clientVideoUrl ?? "",
        stat1Value: d.stat1Value ?? "",
        stat1Label: d.stat1Label ?? "",
        stat2Value: d.stat2Value ?? "",
        stat2Label: d.stat2Label ?? "",
        stat3Value: d.stat3Value ?? "",
        stat3Label: d.stat3Label ?? "",
        order: d.order,
      })),
    });
  } catch (error: unknown) {
    console.error("Public settings API error:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}
