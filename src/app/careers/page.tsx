import type { Metadata } from "next";
import { CareersContent } from "./CareersContent";
import { getCollections } from "@/server/db";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open vacancies and candidate application form at brandit.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | brandit.",
    description:
      "Open vacancies and candidate application form at brandit.",
  },
};

export default async function CareersPage() {
  let vacancies: any[] = [];

  try {
    const { vacancies: vacCol } = await getCollections();
    vacancies = await vacCol
      .find({ isOpen: true, isArchived: false }, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (err) {
    console.error("Careers DB load error (using fallback):", err);
  }

  return <CareersContent vacancies={vacancies} />;
}
