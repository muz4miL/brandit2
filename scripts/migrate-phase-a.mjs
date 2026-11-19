import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.log("INFO: MONGODB_URI not set in environment or .env.local. Skipping direct DB migration.");
  process.exit(0);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

async function runPhaseAMigration() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    const db = client.db("brandit");

    console.log("1. Cleaning up Site Settings (Agency Settings)...");
    await db.collection("site_settings").updateMany(
      {},
      {
        $set: {
          agencyName: "brandit.",
          tagline: "Marketing systems, content, and performance. UAE-forged. Delivered worldwide.",
          phoneWhatsApp: "+971 52 534 7120",
          whatsappLink: "https://wa.me/971525347120",
          "globalSeo.metaTitle": "brandit. — Marketing Agency | Ads, Content, Branding & Web",
          "globalSeo.metaDescription":
            "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
          "founder.name": "Umar Farooq",
          "founder.title": "Founder & CEO",
          "founder.bioParagraph1":
            "I sharpened my craft inside the UAE — one of the most competitive marketing arenas on earth. I built the content system for the country’s largest real estate brokerage, turned a property data platform into a trusted authority, and grew a founder’s brand to six figures.",
          "founder.bioParagraph2":
            "I’ve personally sat in every seat: shooting, editing, designing, buying media, and writing the strategy. That’s why brandit. runs on systems instead of guesswork — I’m not directing work I’ve never done.",
          "founder.bioParagraph3":
            "Today a trained specialist team executes to those standards, and I stay on every account as the senior strategist. You get senior thinking with full agency capacity, and one person to call.",
          updatedAt: new Date(),
        },
        $unset: {
          address: "",
          peshawarAddress: "",
          officeAddress: "",
        },
      },
      { upsert: false }
    );

    console.log("2. Cleaning up Services Page Settings...");
    await db.collection("services_page_settings").updateMany(
      {
        $or: [
          { seoTitle: { $regex: /growth engine|thrides/i } },
          { seoTitle: { $exists: false } },
        ],
      },
      {
        $set: {
          seoTitle: "Services | brandit.",
          seoDescription:
            "Six core marketing and growth systems engineered under one roof. UAE-forged, delivered worldwide.",
          updatedAt: new Date(),
        },
      }
    );

    console.log("3. Removing legacy Thrides references across collections...");
    await db.collection("site_settings").deleteMany({ agencyName: "Thrides" });

    console.log("Phase A Database Migration Completed Successfully.");
  } catch (err) {
    console.error("Migration error:", err.message);
  } finally {
    await client.close();
  }
}

runPhaseAMigration();
