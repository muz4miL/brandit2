import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteMeta, teamMembers } from "@/content/site";
import AboutExperience from "./AboutExperience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Agency story, positioning, approach, founder profile and team/process overview. UAE-forged marketing systems agency.",
  keywords: [
    "about brandit",
    "marketing systems",
    "UAE agency leadership",
    "growth systems",
    "brandit",
  ],
  authors: [{ name: "brandit.", url: "/about" }],
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
    canonical: "/about",
  },
  openGraph: {
    title: "About | brandit.",
    description: "Agency story, positioning, approach, founder profile and team overview.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div style={{ background: "#070709", color: "#f6f6f8", minHeight: "100vh" }}>
      <Header overlay />
      <AboutExperience stats={[]} members={teamMembers} />
      <Footer />
    </div>
  );
}
