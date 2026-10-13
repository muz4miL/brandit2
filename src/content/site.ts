// Central editable content for the Brand It site.
// Replace concept images by swapping the imports below.
import halo from "@/assets/work-identity-halo.jpg";
import pulse from "@/assets/work-identity-pulse.jpg";
import zest from "@/assets/work-social-juice.jpg";
import voltex from "@/assets/work-ad-sneaker.jpg";
import skin from "@/assets/work-package-skin.jpg";
import rise from "@/assets/work-package-rise.jpg";
import voyara from "@/assets/work-ads-travel.jpg";
import home from "@/assets/work-campaign-home.jpg";

export type Category = "identity" | "social" | "ads" | "packages";

export type Contribution =
  | "Logo only"
  | "Full visual identity"
  | "Social content"
  | "Ad creative"
  | "Campaign management"
  | "Complete package";

export const categoryLabels: Record<Category, string> = {
  identity: "Logos & Identity",
  social: "Social Content",
  ads: "Ads & Campaigns",
  packages: "Full Packages",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
];

export type Service = {
  id: string;
  title: string;
  label: string;
  image: string;
  category: Category;
};

export const services: Service[] = [
  {
    id: "identity",
    title: "Brand Identity",
    label: "Logos, stationery, packaging",
    image: halo,
    category: "identity",
  },
  {
    id: "social",
    title: "Social Content",
    label: "Campaign-ready posts & stories",
    image: zest,
    category: "social",
  },
  {
    id: "ads",
    title: "Ad Campaigns",
    label: "Creative & campaign management",
    image: voltex,
    category: "ads",
  },
  {
    id: "packages",
    title: "Complete Packages",
    label: "Identity to launch, connected",
    image: rise,
    category: "packages",
  },
];

export type Project = {
  id: string;
  title: string;
  categories: Category[];
  contribution: Contribution;
  summary: string;
  deliverables: string[];
  cover: string;
  gallery: string[];
  isConcept: boolean;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "halo",
    title: "Halo Coffee",
    categories: ["identity"],
    contribution: "Full visual identity",
    summary: "A bright, planetary identity for a small-batch roaster.",
    deliverables: ["Logo", "Stationery", "Coffee bag packaging"],
    cover: halo,
    gallery: [halo],
    isConcept: true,
    featured: true,
  },
  {
    id: "zest",
    title: "Zest Juice",
    categories: ["social"],
    contribution: "Social content",
    summary: "A punchy social grid to launch a cold-pressed juice range.",
    deliverables: ["Instagram feed set", "Story templates"],
    cover: zest,
    gallery: [zest],
    isConcept: true,
    featured: true,
  },
  {
    id: "voltex",
    title: "Voltex Runners",
    categories: ["ads"],
    contribution: "Ad creative",
    summary: "Mobile-first ad creative for a performance sneaker drop.",
    deliverables: ["Portrait story ads", "Feed ads"],
    cover: voltex,
    gallery: [voltex],
    isConcept: true,
    featured: true,
  },
  {
    id: "rise",
    title: "Rise Bakery",
    categories: ["packages", "identity", "social"],
    contribution: "Complete package",
    summary: "A warm identity carried from shopfront to social feed.",
    deliverables: ["Logo & identity", "Signage", "Packaging", "Social posts"],
    cover: rise,
    gallery: [rise],
    isConcept: true,
    featured: true,
  },
  {
    id: "pulse",
    title: "Pulse Fitness",
    categories: ["identity"],
    contribution: "Logo only",
    summary: "A sharp, energetic mark built for app icons and gear.",
    deliverables: ["Logo", "Logo variations"],
    cover: pulse,
    gallery: [pulse],
    isConcept: true,
    featured: true,
  },
  {
    id: "voyara",
    title: "Voyara Travel",
    categories: ["ads", "social"],
    contribution: "Ad creative",
    summary: "Sun-soaked story ads for a seasonal travel push.",
    deliverables: ["Story ad set", "Social adaptations"],
    cover: voyara,
    gallery: [voyara],
    isConcept: true,
    featured: true,
  },
  {
    id: "homeware",
    title: "Homeware Retailer",
    categories: ["ads"],
    contribution: "Campaign management",
    summary: "We planned and ran the paid campaign using the client's supplied creative and brand.",
    deliverables: ["Campaign setup", "Placement management", "Ongoing optimisation"],
    cover: home,
    gallery: [home],
    isConcept: true,
    featured: false,
  },
  {
    id: "bloom",
    title: "Bloom Skincare",
    categories: ["packages", "identity"],
    contribution: "Full visual identity",
    summary: "A playful geometric system across a full skincare range.",
    deliverables: ["Pattern system", "Tube & box packaging"],
    cover: skin,
    gallery: [skin, halo],
    isConcept: true,
    featured: false,
  },
];

export const heroTiles = [
  halo,
  voltex,
  zest,
  skin,
  rise,
  pulse,
  voyara,
  home,
  zest,
  halo,
  skin,
  voltex,
];

export const aboutImages = [rise, zest, voltex, skin];

export const serviceOptions = [
  "Brand identity",
  "Social media design",
  "Ad creative & campaigns",
  "Complete brand package",
  "Not sure yet",
];

// Add verified links here only (e.g. { label: "Instagram", href: "https://..." }).
export const socialLinks: { label: string; href: string }[] = [];
