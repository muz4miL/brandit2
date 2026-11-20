import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getWorkProjectBySlug,
  getAllPublishedWorkSlugs,
} from "@/server/work-service";
import { CaseStudyDetailClient } from "@/app/case-studies/[slug]/CaseStudyDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string; fromCategory?: string }>;
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
      title: "Project Not Found | brandit.",
    };
  }

  const title =
    project.seo?.title || `${project.clientName} — ${project.title} | Our Work | brandit.`;
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
      canonical: `/our-work/${project.slug}`,
    },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function OurWorkDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  const project = await getWorkProjectBySlug(slug, isPreview);

  if (!project) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <CaseStudyDetailClient
        project={project}
        nextProject={null}
        isPreview={isPreview}
        basePath="/our-work"
      />
    </Suspense>
  );
}
