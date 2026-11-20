import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
if (!uri) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const items = [
  ["fam-properties", "fäm Properties", "One content system across an entire enterprise brokerage", 1],
  ["founder-personal-brand", "Founder Personal Brand", "An executive authority system that scaled to six figures", 2],
  ["dxb-interact", "DXB Interact", "Turning market data into a trusted authority platform", 3],
  ["fam-luxe", "fäm Luxe", "A luxury content system built for high-net-worth buyers", 4],
  ["aesthetic-clinics", "Aesthetic Clinics", "Lead-gen campaigns delivering qualified bookings at efficient cost", 5],
  ["salons-beauty", "Salons & Beauty", "Consistent conversations and new customers, month over month", 6],
  ["developers-off-plan", "Developers & Off-Plan", "Full project marketing from launch to leads", 7],
  ["luxury-supercars", "Luxury Supercars", "Prestige content for high-end automotive brands", 8],
  ["holiday-homes", "Holiday Homes", "Investor-facing passive-income campaigns", 9],
  ["personal-brands-influencers", "Personal Brands & Influencers", "Organic growth from small to large audiences", 10],
];

const legacySlugs = [
  "founder-brand",
  "developers-offplan",
  "influencers-creators",
];

const client = new MongoClient(uri);
try {
  await client.connect();
  const portfolio = client.db("brandit").collection("portfolio");
  await portfolio.createIndex(
    { slug: 1 },
    {
      unique: true,
      partialFilterExpression: { slug: { $type: "string" } },
    },
  );

  await portfolio.deleteMany({
    $or: [
      { source: "legacy-our-work" },
      { slug: { $in: legacySlugs }, source: { $ne: "portfolio" } },
    ],
  });

  for (const [slug, title, outcomeLine, order] of items) {
    await portfolio.updateOne(
      { slug },
      {
        $set: { slug },
        $setOnInsert: {
          title,
          outcomeLine,
          mediaType: "image",
          mediaUrl: "",
          posterUrl: "",
          altText: "",
          detailUrl: "",
          order,
          isPublished: false,
          source: "portfolio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );
  }
  console.log("Portfolio seed complete: 10 items. Existing admin edits were preserved.");
} finally {
  await client.close();
}
