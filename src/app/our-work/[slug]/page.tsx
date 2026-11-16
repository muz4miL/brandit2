import { redirect } from "next/navigation";

export default async function OurWorkSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/case-studies/${slug}`);
}
