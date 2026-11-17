import { MongoClient, Db } from "mongodb";
import type {
  SiteSettingsDoc,
  ServiceDoc,
  PortfolioDoc,
  CaseStudyDoc,
  TestimonialDoc,
  FaqDoc,
  StudioCategoryDoc,
  StudioEquipmentDoc,
  VacancyDoc,
  SubmissionDoc,
  AdminUserDoc,
  ShowcaseItemDoc,
  ShowcaseSettingsDoc,
} from "./types";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let connecting: Promise<Db> | null = null;
let indexesCreated = false;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  if (connecting) return connecting;

  connecting = (async () => {
    const uri = process.env["MONGODB_URI"]?.trim();
    if (!uri) {
      throw new Error(
        "MONGODB_URI environment variable is missing. Please configure it in your server environment or .env.local.",
      );
    }

    cachedClient = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      retryWrites: true,
    });

    try {
      await cachedClient.connect();
      cachedDb = cachedClient.db("brandit");

      if (!indexesCreated) {
        indexesCreated = true;
        createIndexes(cachedDb).catch((err) => {
          console.error("Non-fatal: Failed to ensure database indexes:", err);
        });
      }

      return cachedDb;
    } catch (error) {
      await cachedClient.close().catch(() => undefined);
      cachedClient = null;
      throw new Error(
        `MongoDB Atlas connection failed for the configured MONGODB_URI. Check the Atlas IP allowlist, credentials, and network access. ${
          error instanceof Error ? error.message : String(error)
        }`,
        { cause: error },
      );
    } finally {
      connecting = null;
    }
  })();

  return connecting;
}

export async function getCollections() {
  const db = await getDb();
  return {
    siteSettings: db.collection<SiteSettingsDoc>("site_settings"),
    services: db.collection<ServiceDoc>("services"),
    portfolio: db.collection<PortfolioDoc>("portfolio"),
    caseStudies: db.collection<CaseStudyDoc>("case_studies"),
    testimonials: db.collection<TestimonialDoc>("testimonials"),
    faqs: db.collection<FaqDoc>("faqs"),
    studioCategories: db.collection<StudioCategoryDoc>("studio_categories"),
    studioEquipment: db.collection<StudioEquipmentDoc>("studio_equipment"),
    vacancies: db.collection<VacancyDoc>("vacancies"),
    submissions: db.collection<SubmissionDoc>("submissions"),
    adminUsers: db.collection<AdminUserDoc>("admin_users"),
    showcaseItems: db.collection<ShowcaseItemDoc>("showcase_items"),
    showcaseSettings: db.collection<ShowcaseSettingsDoc>("showcase_settings"),
    statPills: db.collection<Record<string, any>>("stat_pills"),
    marqueeItems: db.collection<Record<string, any>>("marquee_items"),
    statsLogos: db.collection<Record<string, any>>("stats_logos"),
    statsStripSettings: db.collection<Record<string, any>>("stats_strip_settings"),
    spSettings: db.collection<any>("sp_settings"),
    spHero: db.collection<any>("sp_hero"),
    spPackages: db.collection<any>("sp_packages"),
    spComparisonRows: db.collection<any>("sp_comparison_rows"),
    spProcessSteps: db.collection<any>("sp_process_steps"),
    spChecklistItems: db.collection<any>("sp_checklist_items"),
    spTimelineSteps: db.collection<any>("sp_timeline_steps"),
    spCoreServices: db.collection<any>("sp_core_services"),
    spFaqs: db.collection<any>("sp_faqs"),
    workProjects: db.collection<any>("work_projects"),
    workPageSettings: db.collection<any>("work_page_settings"),
  };
}

async function createIndexes(db: Db) {
  try {
    await Promise.all([
      db.collection("services").createIndex({ slug: 1 }, { unique: true }),
      db.collection("services").createIndex({ order: 1, isPublished: 1 }),
      db.collection("portfolio").createIndex({ order: 1, isPublished: 1 }),
      db.collection("case_studies").createIndex({ slug: 1 }, { unique: true }),
      db.collection("case_studies").createIndex({ isPublished: 1 }),
      db.collection("studio_categories").createIndex({ slug: 1 }, { unique: true }),
      db.collection("studio_categories").createIndex({ order: 1 }),
      db.collection("studio_equipment").createIndex({ categoryId: 1, order: 1 }),
      db.collection("vacancies").createIndex({ slug: 1 }, { unique: true }),
      db.collection("vacancies").createIndex({ isOpen: 1, isArchived: 1 }),
      db.collection("submissions").createIndex({ submittedAt: -1, type: 1 }),
      db.collection("admin_users").createIndex({ email: 1 }, { unique: true }),
    ]);
  } catch (err) {
    console.warn("Index creation notice:", err);
  }
}
