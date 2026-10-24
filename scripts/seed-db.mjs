import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";
import crypto from "crypto";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    const db = client.db("brandit");

    console.log("Seeding Site Settings...");
    await db.collection("site_settings").updateOne(
      { agencyName: "brandit." },
      {
        $set: {
          agencyName: "brandit.",
          tagline: "Marketing systems, content, and performance. UAE-forged. Delivered worldwide.",
          contactEmail: "info@brandit.agency",
          phoneWhatsApp: "+971 52 534 7120",
          whatsappLink: "https://wa.me/971525347120",
          discoveryCallUrl: "#contact",
          socialLinks: {
            instagram: "https://instagram.com/brandit.agency",
            linkedin: "https://linkedin.com/company/brandit-agency",
            whatsapp: "https://wa.me/971525347120",
          },
          founder: {
            name: "Umar Farooq",
            title: "Founder & CEO",
            bioParagraph1:
              "I sharpened my craft inside the UAE — one of the most competitive marketing arenas on earth. I built the content system for the country’s largest real estate brokerage, turned a property data platform into a trusted authority, and grew a founder’s brand to six figures.",
            bioParagraph2:
              "I’ve personally sat in every seat: shooting, editing, designing, buying media, and writing the strategy. That’s why brandit. runs on systems instead of guesswork — I’m not directing work I’ve never done.",
            bioParagraph3:
              "Today a trained specialist team executes to those standards, and I stay on every account as the senior strategist. You get senior thinking with full agency capacity, and one person to call.",
          },
          globalSeo: {
            metaTitle: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
            metaDescription:
              "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
            ogImage: "/og-image.png",
          },
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    console.log("Seeding 6 Services...");
    const services = [
      {
        slug: "strategy-growth-systems",
        title: "Strategy & Growth Systems",
        body: "The operating system behind everything else. We map your content architecture, build the SOPs, align ad spend to real revenue priorities, and report on what actually moved.",
        visibleTags: ["Marketing Strategy", "Growth Systems", "SOPs & Workflows", "Reporting"],
        coverImage: "/assets/service-identity-3-fhRpsX.jpg",
        imageAlt: "Strategy and growth systems planning",
        order: 1,
        isPublished: true,
        detailedContent: {
          summary:
            "A robust operating system aligning all creative, media spend, and operational pipelines directly to business revenue.",
          deliverables: [
            "Comprehensive Content Architecture",
            "Growth Strategy Roadmap & Spend Allocation",
            "Production SOPs & Brand Workflow Guidelines",
            "Executive Reporting Dashboard & Attribution",
          ],
          howItWorks:
            "We assess your current acquisition pipeline, identify bottlenecks, construct standard operating procedures, and align creative production with measurable revenue KPIs.",
        },
      },
      {
        slug: "paid-advertising",
        title: "Paid Advertising",
        body: "Campaigns built around your sales reality, not vanity metrics. We structure spend so your budget goes to what converts, then keep testing until it gets cheaper.",
        visibleTags: ["Meta Ads", "Google Ads", "TikTok Ads", "Performance Creative"],
        coverImage: "/assets/service-ads-CaVYNpNe.jpg",
        imageAlt: "Paid advertising and performance creative campaigns",
        order: 2,
        isPublished: true,
        detailedContent: {
          summary:
            "Targeted, margin-driven paid campaigns built around real revenue and constant creative iteration.",
          deliverables: [
            "Full-Funnel Meta, Google & TikTok Ads Management",
            "Continuous Creative Variation Testing",
            "Audience Segmentation & Precision Retargeting",
            "Real-time ROI Tracking & CAC Reduction",
          ],
          howItWorks:
            "We structure campaigns around true profitability, testing hooks, messaging, and visual formats continuously to scale winning variants at optimal cost per acquisition.",
        },
      },
      {
        slug: "content-production",
        title: "Content Production",
        body: "A full in-house production team — videographers, photographers, editors. Cinematic films, scroll-stopping UGC, and shoot days run to SOPs so nothing is wasted.",
        visibleTags: ["Video Production", "Photography", "UGC & Reels", "Podcast Production"],
        coverImage: "/assets/service-social-D0saNVRn.jpg",
        imageAlt: "In-house content production, studio video and photography",
        order: 3,
        isPublished: true,
        detailedContent: {
          summary:
            "End-to-end studio and location production delivering high-impact short-form, long-form, and editorial visual assets.",
          deliverables: [
            "Cinematic Commercial Films & Brand Videos",
            "High-Volume UGC & Viral Reel Production",
            "High-End Editorial Photography",
            "Multi-Cam Podcast Recording & Distribution",
          ],
          howItWorks:
            "Our in-house production crew handles pre-production storyboarding, studio shoot days, editing, sound design, and color grading according to rigorous quality gates.",
        },
      },
      {
        slug: "branding-design",
        title: "Branding & Design",
        body: "Look like the leader in your category. Complete identity systems, daily creative, and founder brands built for authority.",
        visibleTags: ["Brand Identity", "Graphic Design", "Personal Branding", "Ad Creative"],
        coverImage: "/assets/service-packages-CciERu9K.jpg",
        imageAlt: "Brand identity systems and visual design",
        order: 4,
        isPublished: true,
        detailedContent: {
          summary:
            "Cohesive, architectural visual identities that establish category leadership and executive authority.",
          deliverables: [
            "Full Visual Identity Systems & Guidelines",
            "Executive & Founder Personal Branding",
            "Packaging & Print Collateral Design",
            "High-Converting Digital Ad Design",
          ],
          howItWorks:
            "We craft distinctive typographic systems, color architectures, and visual assets tailored to position your brand as the undisputed authority in your niche.",
        },
      },
      {
        slug: "web-stores-automation",
        title: "Web, Stores & Automation",
        body: "Where traffic becomes revenue. Fast websites, conversion-built landing pages, Shopify stores that sell, and AI automation that handles the follow-up.",
        visibleTags: ["Website Design", "Landing Pages", "Shopify Stores", "AI Automation"],
        coverImage: "/assets/services-mega-featured-VuFH2hri.jpg",
        imageAlt: "Web design, Shopify stores, and AI lead automation",
        order: 5,
        isPublished: true,
        detailedContent: {
          summary:
            "Modern web platforms, high-converting e-commerce stores, and automated backend systems that turn clicks into customers.",
          deliverables: [
            "Custom High-Speed Website Design & Development",
            "Conversion-Engineered Landing Pages",
            "Custom Shopify Store Architecture",
            "AI-Powered Lead Routing & CRM Automations",
          ],
          howItWorks:
            "We build ultra-fast, responsive web interfaces connected directly to lead management systems and automated follow-ups so no lead goes cold.",
        },
      },
      {
        slug: "influencer-collab-marketing",
        title: "Influencer & Collab Marketing",
        body: "Borrow the audiences you haven’t built yet. We source the right creators, run the campaigns, and structure brand collaborations that put you in front of a warm market.",
        visibleTags: [
          "Influencer Campaigns",
          "Creator Sourcing",
          "Brand Collaborations",
          "Seeding & Gifting",
        ],
        coverImage: "/assets/work-social-juice-6pVmFDTU.jpg",
        imageAlt: "Influencer campaigns and brand collaborations",
        order: 6,
        isPublished: true,
        detailedContent: {
          summary:
            "Strategic creator partnerships that amplify reach, generate authentic social proof, and feed directly into paid advertising funnels.",
          deliverables: [
            "Creator Vetting & Audience Authenticity Checks",
            "Campaign Strategy, Briefing & Negotiation",
            "Product Seeding & Gifting Operations",
            "Whitelisting & Paid Ad Sparking",
          ],
          howItWorks:
            "We match your brand with validated creators whose followers match your buyer persona, negotiate deliverables, and repurpose high-performing content across paid ad channels.",
        },
      },
    ];

    for (const service of services) {
      await db.collection("services").updateOne(
        { slug: service.slug },
        {
          $set: {
            ...service,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true },
      );
    }

    console.log("Seeding 10 Portfolio Entries...");
    const portfolio = [
      {
        title: "fäm Properties",
        outcomeLine: "One content system across an entire enterprise brokerage",
        categories: ["Real Estate", "Content Production", "Strategy"],
        mediaType: "image",
        mediaUrl: "/assets/work-identity-halo-BifRpw3S.jpg",
        altText: "fäm Properties enterprise brokerage content system showcase",
        order: 1,
        isPublished: true,
      },
      {
        title: "Founder Personal Brand",
        outcomeLine: "An executive authority system that scaled to six figures",
        categories: ["Personal Brand", "Branding", "Video"],
        mediaType: "image",
        mediaUrl: "/assets/work-package-skin-DVgFXTcE.jpg",
        altText: "Executive personal brand authority content showcase",
        order: 2,
        isPublished: true,
      },
      {
        title: "DXB Interact",
        outcomeLine: "Turning market data into a trusted authority platform",
        categories: ["Tech & Data", "Web", "Paid Ads"],
        mediaType: "image",
        mediaUrl: "/assets/work-identity-pulse-9DdT8_OD.jpg",
        altText: "DXB Interact market data platform marketing visual",
        order: 3,
        isPublished: true,
      },
      {
        title: "fäm Luxe",
        outcomeLine: "A luxury content system built for high-net-worth buyers",
        categories: ["Luxury Real Estate", "Video", "Branding"],
        mediaType: "image",
        mediaUrl: "/assets/work-package-rise-7UuIcQr6.jpg",
        altText: "fäm Luxe ultra-luxury real estate presentation",
        order: 4,
        isPublished: true,
      },
      {
        title: "Aesthetic Clinics",
        outcomeLine: "Lead-gen campaigns delivering qualified bookings at efficient cost",
        categories: ["Healthcare", "Paid Ads", "Lead Generation"],
        mediaType: "image",
        mediaUrl: "/assets/work-ad-sneaker-9rVsZZXg.jpg",
        altText: "Aesthetic clinic lead generation campaign creative",
        order: 5,
        isPublished: true,
      },
      {
        title: "Salons & Beauty",
        outcomeLine: "Consistent conversations and new customers, month over month",
        categories: ["Beauty & Wellness", "Social Content", "Automation"],
        mediaType: "image",
        mediaUrl: "/assets/work-social-juice-6pVmFDTU.jpg",
        altText: "Salons and beauty booking campaigns showcase",
        order: 6,
        isPublished: true,
      },
      {
        title: "Developers & Off-Plan",
        outcomeLine: "Full project marketing from launch to leads",
        categories: ["Property Development", "3D & Video", "Paid Ads"],
        mediaType: "image",
        mediaUrl: "/assets/work-campaign-home-C1uP45aM.jpg",
        altText: "Property developer off-plan launch campaign",
        order: 7,
        isPublished: true,
      },
      {
        title: "Luxury Supercars",
        outcomeLine: "Prestige content for high-end automotive brands",
        categories: ["Automotive", "Cinematic Film", "Branding"],
        mediaType: "image",
        mediaUrl: "/assets/work-ads-travel-Dn3ojiU6.jpg",
        altText: "High-end luxury automotive showcase media",
        order: 8,
        isPublished: true,
      },
      {
        title: "Holiday Homes",
        outcomeLine: "Investor-facing passive-income campaigns",
        categories: ["Hospitality", "Paid Ads", "Photography"],
        mediaType: "image",
        mediaUrl: "/assets/service-identity-3-fhRpsX.jpg",
        altText: "Holiday homes investor marketing campaign",
        order: 9,
        isPublished: true,
      },
      {
        title: "Personal Brands & Influencers",
        outcomeLine: "Organic growth from small to large audiences",
        categories: ["Creators", "Social Growth", "Podcasts"],
        mediaType: "image",
        mediaUrl: "/assets/service-social-D0saNVRn.jpg",
        altText: "Creator and influencer organic growth content",
        order: 10,
        isPublished: true,
      },
    ];

    for (const item of portfolio) {
      await db.collection("portfolio").updateOne(
        { title: item.title },
        {
          $set: {
            ...item,
            createdAt: new Date(),
          },
        },
        { upsert: true },
      );
    }

    console.log("Seeding 12 Studio Equipment Categories...");
    const studioCategories = [
      { name: "Camera Department", slug: "camera-department", order: 1 },
      { name: "Lensing", slug: "lensing", order: 2 },
      { name: "Monitoring & Wireless Video", slug: "monitoring-wireless-video", order: 3 },
      { name: "Lighting - Continuous", slug: "lighting-continuous", order: 4 },
      { name: "Lighting - Strobe (Photography)", slug: "lighting-strobe", order: 5 },
      { name: "Light Shaping & Modifiers", slug: "light-shaping-modifiers", order: 6 },
      { name: "Camera Support", slug: "camera-support", order: 7 },
      { name: "Grip Department", slug: "grip-department", order: 8 },
      { name: "Audio", slug: "audio", order: 9 },
      { name: "Studio Operations", slug: "studio-operations", order: 10 },
      { name: "Power & Electrical", slug: "power-electrical", order: 11 },
      { name: "Data & Server", slug: "data-server", order: 12 },
    ];

    for (const cat of studioCategories) {
      await db.collection("studio_categories").updateOne(
        { slug: cat.slug },
        {
          $set: {
            ...cat,
            isPublished: true,
          },
        },
        { upsert: true },
      );
    }

    // Add illustrative gear items per category
    const initialGear = [
      {
        categorySlug: "camera-department",
        name: "Sony FX6 Full-Frame Cinema Camera",
        availability: "available_at_studio",
        specs: "4K 120fps, Dual Base ISO, S-Cinetone",
      },
      {
        categorySlug: "camera-department",
        name: "Sony FX3 Cinema Line Camera",
        availability: "available_at_studio",
        specs: "Compact cage setup, active cooling, XLR handle",
      },
      {
        categorySlug: "lensing",
        name: "Sony G Master Prime Set (24mm, 35mm, 50mm, 85mm f/1.4)",
        availability: "available_at_studio",
        specs: "High-resolution cinema primes",
      },
      {
        categorySlug: "lensing",
        name: "Sony FE 24-70mm f/2.8 GM II & 70-200mm f/2.8 GM OSS II",
        availability: "available_at_studio",
        specs: "Fast constant aperture zooms",
      },
      {
        categorySlug: "monitoring-wireless-video",
        name: "Atomos Ninja V+ 8K HDR Monitor-Recorder",
        availability: "available_at_studio",
        specs: "ProRes RAW, calibrated 1000nit display",
      },
      {
        categorySlug: "monitoring-wireless-video",
        name: "Hollyland Mars 4K Wireless Video System",
        availability: "available_at_studio",
        specs: "Ultra-low latency transmitter & receiver set",
      },
      {
        categorySlug: "lighting-continuous",
        name: "Aputure LS 600d Pro Daylight LED",
        availability: "available_at_studio",
        specs: "Weather-resistant Bowens mount daylight fixture",
      },
      {
        categorySlug: "lighting-continuous",
        name: "Aputure Amaran 200x Bi-Color LED (x3)",
        availability: "available_at_studio",
        specs: "Key, fill and rim continuous lighting trio",
      },
      {
        categorySlug: "lighting-strobe",
        name: "Profoto B10X Plus Studio Strobe Kit",
        availability: "available_at_studio",
        specs: "500Ws battery/mains flash with AirTTL",
      },
      {
        categorySlug: "light-shaping-modifiers",
        name: "Aputure Light Dome 150cm Softbox",
        availability: "available_at_studio",
        specs: "Ultra-soft portrait and commercial modifier",
      },
      {
        categorySlug: "light-shaping-modifiers",
        name: "Lantern 90 Omnidirectional Soft Light",
        availability: "available_at_studio",
        specs: "360-degree soft ambient fill",
      },
      {
        categorySlug: "camera-support",
        name: "Sachtler Flowtech 75 Carbon Fiber Tripod System",
        availability: "available_at_studio",
        specs: "Smooth fluid head with quick deployment legs",
      },
      {
        categorySlug: "camera-support",
        name: "DJI RS 3 Pro Gimbal Stabilizer Combo",
        availability: "available_at_studio",
        specs: "LiDAR autofocus motor and wireless transmission",
      },
      {
        categorySlug: "grip-department",
        name: "Avenger C-Stands with Grip Heads & Arms (x6)",
        availability: "available_at_studio",
        specs: "Heavy duty steel stands with sandbags",
      },
      {
        categorySlug: "audio",
        name: "Sennheiser MKH 416 Shotgun Microphone",
        availability: "available_at_studio",
        specs: "Industry-standard interference tube mic",
      },
      {
        categorySlug: "audio",
        name: "Røde Wireless PRO Dual-Channel Mic System",
        availability: "available_at_studio",
        specs: "32-bit float onboard recording with lavaliers",
      },
      {
        categorySlug: "studio-operations",
        name: "Motorized 3-Roll Seamless Paper Backdrop System",
        availability: "available_at_studio",
        specs: "White, Black, and Chromakey Green 2.7m rolls",
      },
      {
        categorySlug: "power-electrical",
        name: "EcoFlow Delta 2 Max Portable Power Station",
        availability: "available_at_studio",
        specs: "2048Wh high-output pure sine wave battery",
      },
      {
        categorySlug: "data-server",
        name: "OWC ThunderBay 4 RAID Storage Solution",
        availability: "available_at_studio",
        specs: "High-speed DIT offload workstation",
      },
    ];

    for (const gear of initialGear) {
      await db.collection("studio_equipment").updateOne(
        { name: gear.name },
        {
          $set: {
            categoryId: gear.categorySlug,
            name: gear.name,
            specifications: gear.specs,
            availability: gear.availability,
            order: 1,
            isPublished: true,
          },
        },
        { upsert: true },
      );
    }

    console.log("Seeding FAQ Accordion Data...");
    const faqs = [
      {
        question: "Where are you based — do you work internationally?",
        answer:
          "brandit. was built in the UAE, one of the most competitive markets in the world, and we deliver to clients across industries and borders. Wherever your business is, you get that standard.",
        order: 1,
        isPublished: true,
      },
      {
        question: "Are you an agency or a freelancer?",
        answer:
          "A full agency. You work directly with our founder as senior strategist, and a trained specialist team executes under his systems. Senior thinking, full capacity, one point of contact.",
        order: 2,
        isPublished: true,
      },
      {
        question: "What makes you different?",
        answer:
          "Systems. Most teams make content. We build the operating system around it — architecture, SOPs, quality gates, and ad spend aligned to real revenue — proven inside the UAE’s largest brokerage.",
        order: 3,
        isPublished: true,
      },
      {
        question: "Can you handle everything, or just one service?",
        answer:
          "Either. Some clients take ads only, or a Shopify build only. Others hand us the whole growth engine — strategy, video, photography, design, media buying, website, and automation. Both work.",
        order: 4,
        isPublished: true,
      },
      {
        question: "Do you build websites and online stores too?",
        answer:
          "Yes. Websites, conversion-built landing pages, and Shopify stores. We also set up AI automation for lead follow-up, booking, and reporting, so leads don’t go cold while you’re busy.",
        order: 5,
        isPublished: true,
      },
      {
        question: "How does influencer marketing work with you?",
        answer:
          "We source creators who genuinely match your audience, negotiate and manage the campaign, and fold the resulting content back into your paid ads — so one collaboration works twice.",
        order: 6,
        isPublished: true,
      },
      {
        question: "How soon will I see results?",
        answer:
          "Brand lift shows in the first month. Paid campaigns typically show early traction in 30–60 days as testing finds winners. Compounding growth comes from the system running month over month.",
        order: 7,
        isPublished: true,
      },
      {
        question: "What does it cost?",
        answer:
          "Structured by scope — content only, ads only, a website build, or a full growth system. Share your goal on a call and we’ll send a clear plan and price.",
        order: 8,
        isPublished: true,
      },
    ];

    for (const faq of faqs) {
      await db.collection("faqs").updateOne(
        { question: faq.question },
        {
          $set: {
            ...faq,
          },
        },
        { upsert: true },
      );
    }

    console.log("Seeding Testimonial Placeholders...");
    const testimonials = [
      {
        quote:
          "Brand It transformed our content workflow into a predictable revenue generator. The systems Umar built are unmatched.",
        clientName: "Executive Leadership",
        clientTitle: "Managing Director",
        companyName: "Enterprise Brokerage",
        order: 1,
        isPublished: true,
      },
      {
        quote:
          "Our qualified clinic leads tripled in the first 60 days while our cost-per-acquisition dropped by 42%.",
        clientName: "Clinic Founder",
        clientTitle: "Medical Director",
        companyName: "Aesthetic Healthcare Group",
        order: 2,
        isPublished: true,
      },
      {
        quote:
          "Fast, surgical execution. Having Umar as senior strategist with a specialized team made all the difference.",
        clientName: "Brand Founder",
        clientTitle: "CEO",
        companyName: "E-Commerce Brand",
        order: 3,
        isPublished: true,
      },
    ];

    for (const t of testimonials) {
      await db.collection("testimonials").updateOne(
        { clientName: t.clientName },
        {
          $set: { ...t },
        },
        { upsert: true },
      );
    }

    console.log("Seeding Initial Careers Vacancies...");
    const vacancies = [
      {
        slug: "senior-performance-marketer",
        jobTitle: "Senior Performance Marketer (Meta & Google)",
        location: "Dubai, UAE / Hybrid",
        employmentType: "Full-time",
        description:
          "Lead performance media buying across Meta, Google, and TikTok for high-growth real estate and luxury brands.",
        responsibilities: [
          "Structure, manage and scale six-figure ad budgets across Meta and Google Ads",
          "Analyze CAC, ROAS and conversion metrics to optimize campaign architecture",
          "Collaborate with creative teams to brief and iterate on winning performance video and graphic assets",
        ],
        requirements: [
          "3+ years managing substantial paid media spend with verifiable case results",
          "Deep mastery of Meta Ads Manager, GA4, CAPI and server-side tracking",
          "Strong analytical, mathematical and copywriting instincts",
        ],
        isOpen: true,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "video-editor-motion-designer",
        jobTitle: "Video Editor & Motion Designer",
        location: "Dubai, UAE / In-Studio",
        employmentType: "Full-time",
        description:
          "Transform raw shoot footage into scroll-stopping social reels, cinematic brand films, and performance ad creatives.",
        responsibilities: [
          "Edit fast-paced, high-retention short-form content and cinematic brand films",
          "Develop custom motion graphics, kinetic typography, and audio sound design",
          "Maintain Brand It visual standards and deliver to strict turnaround SOPs",
        ],
        requirements: [
          "Exceptional showreel displaying short-form social hooks and commercial edits",
          "Mastery of Premiere Pro, After Effects, and DaVinci Resolve color grading",
          "Understanding of direct-response video psychology and pacing",
        ],
        isOpen: true,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const v of vacancies) {
      await db.collection("vacancies").updateOne(
        { slug: v.slug },
        {
          $set: { ...v },
        },
        { upsert: true },
      );
    }

    console.log("Seeding Initial Administrator User...");
    const adminEmail = process.env.ADMIN_INITIAL_EMAIL || "admin@brandit.agency";
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "BrandIt2026AdminSecure!";
    await db.collection("admin_users").updateOne(
      { email: adminEmail },
      {
        $setOnInsert: {
          email: adminEmail,
          passwordHash: hashPassword(adminPassword),
          role: "admin",
          failedLoginAttempts: 0,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Database seeding error:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
