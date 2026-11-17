import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteMeta, teamMembers } from "@/content/site";
import AboutExperience from "./AboutExperience";

export const metadata: Metadata = {
  title: "About brandit. | Every Move, On Purpose",
  description: "Meet the people and thinking behind brandit. Strategy, creative and digital experiences built around your business.",
  openGraph: {
    title: "About brandit. | Every Move, On Purpose",
    description: "The people. The thinking. The purpose behind every appearance.",
  },
};

export default function AboutPage() {
  return (
    <div style={{ background: "#070709", color: "#f6f6f8", minHeight: "100vh" }}>
      <Header overlay />
      <AboutExperience stats={siteMeta.trustNumbers} members={teamMembers} />
      <Footer />
    </div>
  );
}
