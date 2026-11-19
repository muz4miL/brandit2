import { NextResponse } from "next/server";
import { getCollections } from "@/server/db";

export const revalidate = 0;

export async function GET() {
  try {
    const { siteSettings } = await getCollections();
    const settingsDoc =
      (await siteSettings.findOne({ agencyName: "brandit." })) || (await siteSettings.findOne({}));

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
    });
  } catch (error: unknown) {
    console.error("Public settings API error:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}
