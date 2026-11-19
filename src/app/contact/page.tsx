import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact information, enquiry form, WhatsApp link and discovery-call booking destination.",
  keywords: [
    "contact brandit",
    "book discovery call",
    "growth systems enquiry",
    "UAE marketing agency contact",
    "brandit",
  ],
  authors: [{ name: "brandit.", url: "/contact" }],
  publisher: "brandit.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | brandit.",
    description:
      "Contact information, enquiry form, WhatsApp link and discovery-call booking destination.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
