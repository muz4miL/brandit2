import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";

// Fix Windows ISP SRV lookup failure for mongodb+srv
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

async function run() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    const admin = client.db().admin();
    const ping = await admin.ping();
    console.log("MongoDB Atlas ping successful:", ping);
    const dbs = await admin.listDatabases();
    console.log(
      "Databases on cluster:",
      dbs.databases.map((d) => d.name),
    );
  } catch (err) {
    console.error("MongoDB Atlas connection error:", err.message);
  } finally {
    await client.close();
  }
}

run();
