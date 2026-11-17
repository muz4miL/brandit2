import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Discovery Call | brandit. — Your Brand, Everywhere. On Purpose.",
  description:
    "Good things start with a conversation. Tell us what you’re building, what needs to change, or where you want to go. Free 30-minute strategy call.",
  keywords: [
    "contact brandit",
    "book strategy call",
    "growth audit",
    "creative performance consultation",
  ],
  authors: [{ name: "brandit.", url: "https://brandit.agency/contact" }],
  publisher: "brandit. Digital Creative Agency",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Discovery Call | brandit.",
    description:
      "Good things start with a conversation. Let’s make your next move count.",
    type: "website",
    url: "https://brandit.agency/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
