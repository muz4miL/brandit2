import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

async function run() {
  await client.connect();
  const db = client.db("brandit");

  const caseStudies = [
    {
      slug: "fam-properties",
      client: "fäm Properties",
      industry: "Real Estate & Commercial Brokerage",
      title: "Engineering the Content & Lead Acquisition Machine for UAE's Leading Brokerage",
      subtitle:
        "How systematic video production and automated funnels drove 45M+ views and cut CPL by 38%",
      challenge:
        "The UAE property market is intensely competitive. Relying strictly on property portals resulted in diminishing returns and skyrocketing lead acquisition costs. The brand required a predictable, in-house content engine capable of producing cinematic listing films and positioning brokers as trusted market authorities.",
      objectives: [
        "Eliminate dependency on third-party property portal lead generation.",
        "Establish an institutional-grade video production pipeline producing 15+ cinematic assets weekly.",
        "Implement automated WhatsApp and CRM lead capture for high-net-worth foreign buyers.",
      ],
      strategy:
        "brandit. designed and deployed a comprehensive content operating system. We installed standardized shoot scripts, on-set direction protocols, and rapid color-grading pipelines. Simultaneously, we engineered targeted Meta and Google campaigns driving traffic to custom interactive property landing pages.",
      deliverables: [
        "Full Video Production Pipeline (4K Cinema, Drone, Studio)",
        "Over 120+ High-Production Property Films",
        "Executive Leadership & Founder Branding Toolkit",
        "Targeted Multi-Channel Ad Campaigns & Retargeting Funnels",
        "Automated WhatsApp CRM Integration",
      ],
      results: [
        {
          metric: "45M+",
          label: "Organic & Paid Video Views",
          context: "Across YouTube, Instagram, and LinkedIn",
        },
        {
          metric: "-38%",
          label: "Reduction in Cost Per Lead",
          context: "Compared to traditional property portal spend",
        },
        {
          metric: "+340%",
          label: "Increase in Direct Inquiries",
          context: "Direct high-net-worth investor inquiries",
        },
        {
          metric: "$12M+",
          label: "Direct Tracked Property Sales",
          context: "Attributed directly to campaign funnels",
        },
      ],
      testimonialQuote:
        "brandit. brought industrial discipline to our media output. They don't just shoot video; they build scalable client acquisition machines.",
      testimonialAuthor: "Firas Al Msaddi",
      testimonialRole: "CEO & Founder, fäm Properties",
      coverImage: "/lovable-uploads/fam-showcase.jpg",
      isPublished: true,
      publishedAt: new Date("2026-01-15"),
      updatedAt: new Date("2026-01-15"),
    },
    {
      slug: "voltex-athletics",
      client: "Voltex Athletics",
      industry: "Direct-to-Consumer & Athletic Footwear",
      title: "Scaling DTC Performance Ad Spend to $180k/Month at 3.4x Blended ROAS",
      subtitle:
        "Transforming high-velocity creative testing into a predictable global revenue engine",
      challenge:
        "Voltex hit severe creative fatigue across Meta and TikTok when scaling beyond $30,000/month. Ad costs spiked, conversion rates dipped, and their internal design team couldn't keep up with the asset volume required by modern algorithmic ad auctions.",
      objectives: [
        "Break through the $50k/month ad spend ceiling profitably.",
        "Establish a modular creative sprint testing 30+ ad variations per month.",
        "Overhaul mobile landing page conversion rates to support cold paid traffic.",
      ],
      strategy:
        "We introduced our Performance Creative Matrix: breaking product messaging into 4 core emotional hooks, pairing them with distinct visual styles (Studio, UGC, 3D Render), and deploying weekly testing batches. Winning hooks were immediately amplified with high-budget CBO campaigns.",
      deliverables: [
        "Omnichannel Paid Advertising (Meta, TikTok, Google PMax)",
        "Weekly Performance Creative Sprints (30+ video variations)",
        "Custom Shopify Plus High-Speed Landing Pages",
        "Server-Side Conversions API (CAPI) Architecture",
      ],
      results: [
        {
          metric: "$180k/mo",
          label: "Monthly Ad Spend Scaled",
          context: "Maintained profitably across 5 quarters",
        },
        {
          metric: "3.4x",
          label: "Blended Return on Ad Spend (ROAS)",
          context: "Across all direct response channels",
        },
        {
          metric: "+68%",
          label: "Lift in Average Order Value",
          context: "Via strategic product bundle funnels",
        },
        {
          metric: "18,000+",
          label: "New Customers Acquired",
          context: "Net-new customer acquisition",
        },
      ],
      testimonialQuote:
        "brandit. transformed our paid acquisition from an anxious guessing game into our most predictable revenue lever.",
      testimonialAuthor: "Marcus Chen",
      testimonialRole: "Head of Growth, Voltex Athletics",
      coverImage: "/lovable-uploads/voltex-showcase.jpg",
      isPublished: true,
      publishedAt: new Date("2026-02-10"),
      updatedAt: new Date("2026-02-10"),
    },
  ];

  for (const cs of caseStudies) {
    await db
      .collection("case_studies")
      .updateOne({ slug: cs.slug }, { $set: cs }, { upsert: true });
  }

  console.log("Successfully seeded 2 featured case studies!");
  await client.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
