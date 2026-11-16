import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getWorkProjectBySlug,
  getAllPublishedWorkSlugs,
  getPublicWorkPageData,
} from "@/server/work-service";
import { CaseStudyClient } from "@/app/our-work/[slug]/CaseStudyClient";
import type { WorkProjectDoc } from "@/server/types";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export async function generateStaticParams() {
  return await getAllPublishedWorkSlugs();
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  const project = await getWorkProjectBySlug(slug, isPreview);

  if (!project) {
    return {
      title: "Case Study Not Found | brandit.",
    };
  }

  const title = project.seo?.title || `${project.clientName} Case Study — ${project.title} | brandit.`;
  const description =
    project.seo?.description ||
    project.summary ||
    `Explore how brandit. engineered growth and measurable results for ${project.clientName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project.thumbnailUrl ? [{ url: project.thumbnailUrl }] : undefined,
    },
    alternates: {
      canonical: `/case-studies/${project.slug}`,
    },
    robots: isPreview
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function CaseStudyDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  const project = await getWorkProjectBySlug(slug, isPreview);

  if (!project) {
    notFound();
  }

  // Find next published project for navigation
  const { projects } = await getPublicWorkPageData();
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject: WorkProjectDoc | null =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? (projects[currentIndex + 1] ?? null)
      : projects.length > 1
      ? (projects[0] ?? null)
      : null;

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    image: project.heroMediaUrl || project.thumbnailUrl,
    datePublished: project.publishedAt || project.createdAt,
    dateModified: project.updatedAt,
    author: {
      "@type": "Organization",
      name: "brandit.",
      url: "https://brandit.com",
    },
    publisher: {
      "@type": "Organization",
      name: "brandit.",
      logo: {
        "@type": "ImageObject",
        url: "https://brandit.com/wordmark.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyClient project={project} nextProject={nextProject} isPreview={isPreview} />
    </>
  );
}
