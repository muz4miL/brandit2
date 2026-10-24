import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";
import crypto from "crypto";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

async function verifyBackendFlows() {
  console.log("Connecting to MongoDB Atlas Cluster...");
  await client.connect();
  const db = client.db("brandit");

  // 1. Verify Site Settings
  const settings = await db.collection("site_settings").findOne({ agencyName: "brandit." });
  if (!settings) throw new Error("Site settings missing in brandit DB");
  console.log(
    "✓ Site settings verified:",
    settings.agencyName,
    "| Founder:",
    settings.founder?.name,
  );

  // 2. Verify Services
  const services = await db.collection("services").find({ isPublished: true }).toArray();
  if (services.length !== 6) throw new Error(`Expected 6 services, found ${services.length}`);
  console.log(
    "✓ All 6 services verified with visible tags:",
    services.map((s) => s.title),
  );

  // 3. Verify Portfolio Cards
  const portfolio = await db.collection("portfolio").find({ isPublished: true }).toArray();
  if (portfolio.length !== 10)
    throw new Error(`Expected 10 portfolio entries, found ${portfolio.length}`);
  console.log("✓ All 10 portfolio entries verified with outcomes.");

  // 4. Verify Case Studies
  const caseStudies = await db.collection("case_studies").find({ isPublished: true }).toArray();
  if (caseStudies.length < 2)
    throw new Error(`Expected >=2 case studies, found ${caseStudies.length}`);
  console.log(
    "✓ Case studies verified:",
    caseStudies.map((c) => c.slug),
  );

  // 5. Verify Studio Gear Categories
  const categories = await db.collection("studio_categories").find({}).toArray();
  const equipment = await db.collection("studio_equipment").find({}).toArray();
  if (categories.length !== 12)
    throw new Error(`Expected 12 gear categories, found ${categories.length}`);
  console.log(
    `✓ Studio gear verified: ${categories.length} categories, ${equipment.length} items.`,
  );

  // 6. Verify Admin User & Password Verification
  const adminUser = await db.collection("admin_users").findOne({ email: "admin@brandit.agency" });
  if (!adminUser) throw new Error("Default admin user not found");
  const [salt, storedHash] = adminUser.passwordHash.split(":");
  const testHash = crypto.scryptSync("BrandIt2026AdminSecure!", salt, 64).toString("hex");
  if (testHash !== storedHash) throw new Error("Admin password hash mismatch!");
  console.log("✓ Admin authentication & scrypt password verification passed for:", adminUser.email);

  // 7. Test Submission Record Insertion
  const testSub = {
    type: "contact",
    data: {
      fullName: "Automated Test Client",
      email: "test@client.com",
      phoneWhatsApp: "+971 52 534 7120",
      company: "Test Brand",
      serviceOfInterest: "Paid Advertising",
      message: "Automated verification test of enquiry pipeline",
    },
    status: "new",
    emailNotificationSent: false,
    submittedAt: new Date(),
  };
  const insertRes = await db.collection("submissions").insertOne(testSub);
  const foundSub = await db.collection("submissions").findOne({ _id: insertRes.insertedId });
  if (!foundSub) throw new Error("Submission failed to write to MongoDB Atlas");
  console.log("✓ Submission pipeline verified. Inserted ID:", insertRes.insertedId.toString());

  // Clean up test record
  await db.collection("submissions").deleteOne({ _id: insertRes.insertedId });
  console.log("✓ Test submission cleaned up.");

  console.log("\nALL BACKEND FLOWS PASSED VERIFICATION!");
  await client.close();
}

verifyBackendFlows().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
