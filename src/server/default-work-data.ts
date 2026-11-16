import type { WorkProjectDoc, WorkPageSettingsDoc } from "./types";

export const defaultWorkPageSettings: WorkPageSettingsDoc = {
  heroEyebrow: "CASE STUDIES",
  heroHeadingLine1: "Case",
  heroHeadingLine2: "Studies",
  heroSupportingCopy:
    "Learn more about the tactics that grew our clients' brands.",
  heroMediaUrl: "/images/work/work-identity-halo.jpg",
  heroProjectAnnotation: "Apex Strategic Advisory — Digital Experience & Positioning",
  heroProjectSlug: "apex-advisory",
  galleryIntro:
    "A curated exhibition of strategic positioning, high-converting platforms, and performance creative engineered across 8 countries.",
  closingCtaHeadingLine1: "Your brand.",
  closingCtaHeadingLine2: "Our next masterpiece.",
  closingCtaCopy:
    "Whether scaling to category leadership or expanding across borders, brandit. becomes your strategic partner in creative, digital, and market positioning.",
  closingCtaButtonText: "Book a Strategy Call",
  closingCtaDestination: "/contact",
  motionPreset: "standard",
  categoryOrder: [
    "all",
    "Ecom",
    "Services",
    "SaaS",
  ],
  managedCategories: [
    { id: "Ecom", label: "Ecom" },
    { id: "Services", label: "Services" },
    { id: "SaaS", label: "SaaS" },
  ],
  seo: {
    title: "Case Studies | brandit.",
    description:
      "Learn more about the tactics that grew our clients' brands. Explore measured client growth engineered by brandit.",
    ogImage: "/images/work/work-identity-halo.jpg",
  },
  updatedAt: new Date("2026-01-01"),
};

export const defaultWorkProjects: WorkProjectDoc[] = [
  {
    slug: "apex-advisory",
    title: "+184% qualified pipeline & $4.2M attributed enterprise revenue in 90 days",
    clientName: "Apex Strategic Advisory",
    summary:
      "Positioning architecture, executive branding, and a conversion-engineered 5-page digital experience that generated $4.2M in qualified pipeline within 90 days.",
    industry: "Management Consultancy",
    services: ["Strategic Positioning", "Website Architecture", "Executive Branding", "Lead Funnel"],
    categories: ["Services", "SaaS"],
    year: "2025",
    externalUrl: "https://apex-advisory.demo",
    isPublished: true,
    isDraft: false,
    isFeatured: true,
    featuredOrder: 1,
    order: 1,
    mediaType: "image",
    thumbnailUrl: "/images/work/work-identity-halo.jpg",
    heroMediaUrl: "/images/work/work-identity-halo.jpg",
    altText: "Apex Strategic Advisory executive branding and digital experience",
    focalPoint: { x: 50, y: 50 },
    accentColor: "#FFFFFF",
    isConceptWork: false,
    challenge:
      "Apex had decades of boardroom tier-1 advisory experience, yet their digital presence appeared dated and undifferentiated against international conglomerates. Prospective enterprise clients could not immediately grasp their unique advisory thesis or proprietary valuation frameworks.",
    approach:
      "brandit. conducted comprehensive competitor positioning audits across Zurich, London, and New York. We distilled their core value proposition into 'Decisive Clarity in Volatile Markets' and engineered a streamlined 5-page editorial web platform with bespoke interactive frameworks and executive lead capture.",
    results: [
      { metric: "+184%", label: "Qualified Pipeline", context: "Compared to prior 12 months" },
      { metric: "$4.2M", label: "Attributed Pipeline", context: "Direct enterprise inquiries" },
      { metric: "14 Days", label: "Delivery Cadence", context: "Accelerate package scope" },
    ],
    testimonial: {
      quote:
        "brandit. transformed how the global market perceives our advisory practice. Their ability to translate complex corporate strategy into an unmistakable digital authority is unmatched.",
      clientName: "Marcus Sterling",
      clientTitle: "Senior Managing Partner",
      companyName: "Apex Strategic Advisory",
    },
    blocks: [
      {
        id: "block-1",
        type: "editorial_text",
        eyebrow: "THE POSITIONING IMPERATIVE",
        heading: "Moving from generic consulting to unmistakable authority",
        body: "Enterprise decision makers evaluate advisory firms in seconds. We stripped away standard consulting jargon and replaced it with high-conviction positioning: clear methodologies, proven deal structures, and undeniable executive proof.",
        highlight: "Strategic differentiation is never accidental — it is engineered on purpose.",
      },
      {
        id: "block-2",
        type: "full_width_image",
        url: "/images/work/service-identity.jpg",
        altText: "Corporate brand guidelines and executive typography system",
        caption: "Bespoke executive typography and restrained monochromatic visual language.",
        aspectRatio: "16/9",
      },
      {
        id: "block-3",
        type: "verified_results",
        title: "Measured Commercial Impact",
        subtitle: "Audit completed 90 days post-launch against client baseline metrics.",
        metrics: [
          { metric: "+184%", label: "Pipeline Velocity", context: "Enterprise inquiries under review" },
          { metric: "4.8 min", label: "Avg Session Duration", context: "Up from 48 seconds" },
          { metric: "68%", label: "Lead Qualification Rate", context: "Decision-maker tier submissions" },
        ],
      },
    ],
    seo: {
      title: "Apex Advisory Case Study — Enterprise Positioning & Digital Platform | brandit.",
      description:
        "How brandit. engineered an unmistakable digital presence and +184% qualified pipeline for Apex Strategic Advisory.",
      ogImage: "/images/work/work-identity-halo.jpg",
    },
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-20"),
    publishedAt: new Date("2025-01-20"),
  },
  {
    slug: "voltex-active",
    title: "4.4x ROAS & $1.8M drop revenue through high-velocity performance creative",
    clientName: "Voltex Active",
    summary:
      "Full e-commerce platform redesign, limited-edition drop landing pages, and batch-produced short-form video ads that drove a 4.4x blended return on ad spend.",
    industry: "Performance Athletic Apparel",
    services: ["E-Commerce Redesign", "Paid Media Creative", "Short-Form Video", "Email Flows"],
    categories: ["Ecom"],
    year: "2025",
    externalUrl: "https://voltex-active.demo",
    isPublished: true,
    isDraft: false,
    isFeatured: true,
    featuredOrder: 2,
    order: 2,
    mediaType: "video",
    thumbnailUrl: "/images/work/work-ad-sneaker.jpg",
    heroMediaUrl: "/videos/ads/13014537_2160_3840_24fps.mp4",
    posterUrl: "/images/work/work-ad-sneaker.jpg",
    altText: "Voltex Active limited drop campaign visual",
    focalPoint: { x: 50, y: 50 },
    accentColor: "#FFFFFF",
    isConceptWork: false,
    challenge:
      "Voltex faced saturated fitness apparel competition on Meta and TikTok, suffering from high customer acquisition costs ($58 CAC) and low first-time conversion rates on their previous monolithic store.",
    approach:
      "We restructured their product launches into limited-batch 'Recon Drops', rebuilt their storefront on Next.js for sub-second load times, and filmed 20 high-tempo vertical video creatives focused on technical fabric testing and relentless athletic movement.",
    results: [
      { metric: "4.4x", label: "Blended ROAS", context: "Across Meta and TikTok paid campaigns" },
      { metric: "+240%", label: "First-Week Sellout", context: "250 units sold out in 48 hours" },
      { metric: "38%", label: "Repeat Purchase Rate", context: "Driven by automated Klaviyo flows" },
    ],
    testimonial: {
      quote:
        "The creative pacing and storefront speed brandit. built changed our trajectory entirely. Every drop now sells out before our initial media budget is spent.",
      clientName: "Elena Rostova",
      clientTitle: "Head of Growth & E-Commerce",
      companyName: "Voltex Active",
    },
    blocks: [
      {
        id: "block-1",
        type: "editorial_text",
        eyebrow: "THE DROP ARCHITECTURE",
        heading: "Scarcity, technical storytelling, and zero checkout friction",
        body: "Modern activewear buyers demand authenticity and kinetic energy. We turned product photography into dynamic motion and paired high-tempo vertical video with instant 1-click checkouts.",
      },
      {
        id: "block-2",
        type: "verified_results",
        title: "Growth Metrics",
        metrics: [
          { metric: "4.4x", label: "Blended ROAS", context: "Top of funnel acquisition" },
          { metric: "$24", label: "Reduced Blended CAC", context: "Down from $58 previously" },
          { metric: "< 0.8s", label: "Storefront LCP", context: "Core Web Vitals optimized" },
        ],
      },
    ],
    seo: {
      title: "Voltex Activewear Case Study — 4.4x ROAS E-Commerce Strategy | brandit.",
      description:
        "Discover how brandit. engineered sub-second storefronts and high-velocity drop campaigns for Voltex Activewear.",
      ogImage: "/images/work/work-ad-sneaker.jpg",
    },
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-10"),
    publishedAt: new Date("2025-02-10"),
  },
  {
    slug: "halo-identity",
    title: "+132% qualified pipeline and $4.2M closed deal value in 90 days",
    clientName: "Halo",
    summary:
      "Complete luxury brand positioning, bespoke digital design system, and multi-channel acquisition funnel elevating Halo to category dominance.",
    industry: "Luxury Architecture & Design",
    services: ["Brand Identity", "Digital Platform", "Acquisition Architecture", "Art Direction"],
    categories: ["Services"],
    year: "2025",
    externalUrl: "https://halo.demo",
    isPublished: true,
    isDraft: false,
    isFeatured: true,
    featuredOrder: 3,
    order: 3,
    mediaType: "image",
    thumbnailUrl: "/images/work/work-identity-halo.jpg",
    heroMediaUrl: "/images/work/work-identity-halo.jpg",
    altText: "Halo luxury brand identity and architectural spatial design",
    focalPoint: { x: 50, y: 50 },
    accentColor: "#FFFFFF",
    isConceptWork: false,
    challenge:
      "Halo commanded exceptional prestige in bespoke architectural fitouts, but lacked a digital authority system capable of pre-qualifying ultra-high-net-worth clients and commercial developers.",
    approach:
      "We engineered an ultra-refined monochromatic identity system, tactile portfolio showcase with cinematic media pacing, and a multi-touch attribution funnel targeting commercial developers.",
    results: [
      { metric: "+132%", label: "Qualified Pipeline", context: "High-value developer briefs" },
      { metric: "$4.2M", label: "Closed Deal Value", context: "Generated within 90 days of launch" },
      { metric: "3.8x", label: "Inquiry Velocity", context: "Direct executive inbound" },
    ],
    testimonial: {
      quote:
        "brandit. understood the nuances of ultra-luxury positioning instantly. The inbound caliber of our architectural commissions shifted immediately after rollout.",
      clientName: "Julian Vance",
      clientTitle: "Founder & Creative Principal",
      companyName: "Halo",
    },
    blocks: [
      {
        id: "block-1",
        type: "editorial_text",
        eyebrow: "ARCHITECTURAL AUTHORITY",
        heading: "Engineering prestige for high-value spatial commissions",
        body: "In ultra-high-net-worth architecture, every detail communicates value. We aligned typography, interactive rhythm, and editorial photography to eliminate price resistance before the first client call.",
      },
      {
        id: "block-2",
        type: "verified_results",
        title: "Commercial Outcomes",
        metrics: [
          { metric: "+132%", label: "Qualified Pipeline", context: "Developer engagements" },
          { metric: "$4.2M", label: "Closed Value", context: "Within 90 days" },
          { metric: "100%", label: "Target Tier Match", context: "Accredited clientele" },
        ],
      },
    ],
    seo: {
      title: "Halo Case Study — Luxury Identity & Pipeline Architecture | brandit.",
      description:
        "How brandit. engineered +132% qualified pipeline and $4.2M closed deal value in 90 days for Halo.",
      ogImage: "/images/work/work-identity-halo.jpg",
    },
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-25"),
    publishedAt: new Date("2025-01-25"),
  },
  {
    slug: "pulse-performance",
    title: "1.2M monthly organic reach & +320% membership inquiries via video engine",
    clientName: "Pulse Performance",
    summary:
      "A structured 30-day content engine delivering 12 monthly carousels and 8 short-form vertical reels, scaling organic impressions to 1.2M/month and generating steady membership inquiries.",
    industry: "Health, Wellness & Performance",
    services: ["Content Strategy", "Short-Form Video", "Community Management", "Organic Social"],
    categories: ["Services"],
    year: "2024",
    externalUrl: "https://pulse-performance.demo",
    isPublished: true,
    isDraft: false,
    isFeatured: false,
    featuredOrder: 4,
    order: 4,
    mediaType: "image",
    thumbnailUrl: "/images/work/work-identity-pulse.jpg",
    heroMediaUrl: "/images/work/work-identity-pulse.jpg",
    altText: "Pulse Performance editorial brand and social creative",
    focalPoint: { x: 50, y: 50 },
    accentColor: "#FFFFFF",
    isConceptWork: false,
    challenge:
      "Pulse had an elite training facility and top-tier coaches, but their social media was posted sporadically with zero visual coherence. Enquiries came in waves rather than a reliable weekly cadence.",
    approach:
      "Under our Accelerate package, we set up a repeatable monthly production system: 1 studio shoot day per month, creating 12 carousel graphics, 8 edited reels, and high-impact member spotlights with a cohesive dark-aesthetic brand identity.",
    results: [
      { metric: "1.2M", label: "Monthly Organic Reach", context: "Instagram & TikTok combined" },
      { metric: "+320%", label: "Membership Inquiries", context: "Direct profile link bookings" },
      { metric: "62%", label: "Engagement Lift", context: "Comments and saves per post" },
    ],
    testimonial: {
      quote:
        "brandit. gave us consistency without the headache. Our trainers focus on clients while brandit. ensures our gym looks like a world-class training destination every single week.",
      clientName: "Tariq Mansoor",
      clientTitle: "Co-Founder & Head Coach",
      companyName: "Pulse Performance",
    },
    blocks: [
      {
        id: "block-1",
        type: "editorial_text",
        eyebrow: "THE CONTENT CADENCE",
        heading: "Turning daily coaching insights into compounding social equity",
        body: "Consistency beats occasional perfection. By establishing weekly themes — Technique Tuesday, Member Milestones, Coach Breakdowns — we gave the audience a reason to tune in regularly and take the step from follower to active gym member.",
      },
      {
        id: "block-2",
        type: "verified_results",
        title: "Audience & Acquisition Results",
        metrics: [
          { metric: "1.2M", label: "Monthly Impressions", context: "100% organic without ad spend" },
          { metric: "185", label: "Monthly Trial Bookings", context: "Direct form conversions" },
          { metric: "84%", label: "Trial to Member Conversion", context: "Attributed to pre-conditioned trust" },
        ],
      },
    ],
    seo: {
      title: "Pulse Performance Case Study — Organic Social Growth & Inquiries | brandit.",
      description:
        "How brandit. generated 1.2M monthly organic impressions and +320% inquiries for Pulse Performance.",
      ogImage: "/images/work/work-identity-pulse.jpg",
    },
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2024-11-20"),
    publishedAt: new Date("2024-11-20"),
  },
  {
    slug: "zest-botanicals",
    title: "100+ retail stockists secured & +450% DTC pre-orders in 3-week sprint",
    clientName: "Zest Botanicals",
    summary:
      "Fast-turnaround packaging visuals, product launch microsite, and batch-produced social creative that secured 100+ stockists under the Kickstart package.",
    industry: "Consumer Goods / Beverage",
    services: ["Launch Microsite", "Product Packaging Visuals", "Retail One-Pager", "Social Kit"],
    categories: ["Ecom"],
    year: "2024",
    externalUrl: "https://zest-botanicals.demo",
    isPublished: true,
    isDraft: false,
    isFeatured: false,
    featuredOrder: 5,
    order: 5,
    mediaType: "image",
    thumbnailUrl: "/images/work/work-social-juice.jpg",
    heroMediaUrl: "/images/work/work-social-juice.jpg",
    altText: "Zest Botanical Refreshers product packaging and vibrant social imagery",
    focalPoint: { x: 50, y: 50 },
    accentColor: "#FFFFFF",
    isConceptWork: false,
    challenge:
      "Zest needed to launch their botanical functional beverage within 3 weeks ahead of a major food & beverage expo, with zero existing web presence, digital assets, or retailer pitch materials.",
    approach:
      "Through our Kickstart package, we delivered a vibrant 1-page launch experience, photographed their 4 core SKUs, designed buyer-focused one-sheets, and launched their initial 8 social posts on schedule.",
    results: [
      { metric: "100+", label: "Retail Stockists", context: "Signed during launch month" },
      { metric: "+450%", label: "DTC Pre-Orders", context: "Surpassing initial production run" },
      { metric: "3 Weeks", label: "Total Timeline", context: "Concept to published live deployment" },
    ],
    testimonial: {
      quote:
        "We had 21 days before our largest retail meeting of the year. brandit. delivered our entire digital face, product photography, and sell sheets on time without a single cut corner.",
      clientName: "Chloe Nguyen",
      clientTitle: "Founder & Product Lead",
      companyName: "Zest Botanicals",
    },
    blocks: [
      {
        id: "block-1",
        type: "editorial_text",
        eyebrow: "THE 3-WEEK LAUNCH SPRINT",
        heading: "Speed without sacrificing brand prestige",
        body: "For emerging consumer brands, speed to shelf determines survival. We prioritized the exact touchpoints retail buyers scrutinize: clean ingredient transparency, vibrant shelf presence, and an unmistakable digital storefront.",
      },
      {
        id: "block-2",
        type: "verified_results",
        title: "Retail Launch Performance",
        metrics: [
          { metric: "100+", label: "Stockists Signed", context: "In month 1" },
          { metric: "+450%", label: "Pre-Order Goal", context: "Sellout" },
          { metric: "21 Days", label: "Speed to Market", context: "End-to-end execution" },
        ],
      },
    ],
    seo: {
      title: "Zest Botanicals Case Study — 3-Week Retail Go-To-Market | brandit.",
      description:
        "How brandit. delivered a complete retail launch visual identity and microsite in 3 weeks for Zest Botanicals.",
      ogImage: "/images/work/work-social-juice.jpg",
    },
    createdAt: new Date("2024-09-05"),
    updatedAt: new Date("2024-09-25"),
    publishedAt: new Date("2024-09-25"),
  },
  {
    slug: "lumina-living",
    title: "+92% average order value & 34% email revenue share via retention redesign",
    clientName: "Lumina Home & Living",
    summary:
      "Architectural home goods storefront redesign with automated Klaviyo retention flows, increasing average order value by +92% and boosting repeat customer revenue.",
    industry: "Modern Retail / Home",
    services: ["E-Commerce Architecture", "Email Marketing Automation", "SEO Intent Mapping", "Art Direction"],
    categories: ["Ecom"],
    year: "2024",
    externalUrl: "https://lumina-living.demo",
    isPublished: true,
    isDraft: false,
    isFeatured: false,
    featuredOrder: 6,
    order: 6,
    mediaType: "image",
    thumbnailUrl: "/images/work/work-campaign-home.jpg",
    heroMediaUrl: "/images/work/work-campaign-home.jpg",
    altText: "Lumina Home & Living architectural furniture and interior design layout",
    focalPoint: { x: 50, y: 50 },
    accentColor: "#FFFFFF",
    isConceptWork: false,
    challenge:
      "Lumina had exceptional craftsmanship and high price-point furniture, but their site felt like a sterile catalog. Abandoned cart rates were over 74% and past customers rarely received targeted re-engagement.",
    approach:
      "We transformed their website into an editorial design publication with room-by-room inspiration galleries, architect-focused sample kits, and an automated 5-step retention email sequence tailored to customer purchase history.",
    results: [
      { metric: "+92%", label: "Average Order Value", context: "Through room-bundle merchandising" },
      { metric: "34%", label: "Email Revenue Share", context: "Automated nurture sequences" },
      { metric: "28.4%", label: "Cart Abandon Recovery", context: "Dynamic personalized SMS & email" },
    ],
    testimonial: {
      quote:
        "brandit. treated our furniture like works of art while ensuring every pixel drove revenue. Our retention sequences are now our highest-margin sales channel.",
      clientName: "Arthur Vance",
      clientTitle: "Creative Director",
      companyName: "Lumina Home & Living",
    },
    blocks: [
      {
        id: "block-1",
        type: "editorial_text",
        eyebrow: "RETENTION ARCHITECTURE",
        heading: "Elevating home goods from transactional to heirloom status",
        body: "High-value furniture is rarely an impulse purchase. We built an automated narrative sequence that educates buyers on timber sourcing, joinery craftsmanship, and architectural room harmony before prompting the final purchase.",
      },
      {
        id: "block-2",
        type: "verified_results",
        title: "Retention & Commerce Performance",
        metrics: [
          { metric: "+92%", label: "Average Order Value", context: "$1,840 average basket" },
          { metric: "34%", label: "Revenue from Email", context: "Klaviyo VIP & Abandonment flows" },
          { metric: "4.2x", label: "CLV Expansion", context: "Customer lifetime value in year 1" },
        ],
      },
    ],
    seo: {
      title: "Lumina Home & Living Case Study — E-Commerce & Retention Strategy | brandit.",
      description:
        "How brandit. drove +92% AOV and 34% email revenue share for Lumina Home & Living.",
      ogImage: "/images/work/work-campaign-home.jpg",
    },
    createdAt: new Date("2024-08-12"),
    updatedAt: new Date("2024-08-30"),
    publishedAt: new Date("2024-08-30"),
  },
];
