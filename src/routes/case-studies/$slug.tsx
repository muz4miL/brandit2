import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowLeft, ArrowUpRight, Check, Quote, TrendingUp } from "lucide-react";
import { getCaseStudyBySlugFn } from "@/api/public";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: async ({ params }) => {
    const study = await getCaseStudyBySlugFn({ data: params.slug });
    if (!study) {
      throw notFound();
    }
    return { study };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.study
      ? `${loaderData.study.client} Case Study — brandit.`
      : "Case Study — brandit.";
    const description =
      loaderData?.study?.subtitle ||
      `How brandit. engineered measurable growth for ${loaderData?.study?.client || "our client"}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CaseStudyDetailPage,
});

function CaseStudyDetailPage() {
  const { study } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <Header />

      <main className="flex flex-col">
        {/* Breadcrumb & Navigation */}
        <div className="border-b border-black/[0.06] bg-white py-4">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 flex items-center justify-between">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#52525B] transition-colors hover:text-black"
            >
              <ArrowLeft size={14} />
              <span>Back to all Case Studies</span>
            </Link>
            <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">
              {study.industry}
            </span>
          </div>
        </div>

        {/* Title Header */}
        <section className="border-b border-black/[0.06] pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#09090B]">
                <span>Client: {study.client}</span>
              </div>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#09090B] leading-[1.15]">
                {study.title}
              </h1>
              {study.subtitle && (
                <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[#52525B]">
                  {study.subtitle}
                </p>
              )}
            </div>

            {/* Impact Metric Bar */}
            {study.results && study.results.length > 0 && (
              <div className="mt-12 rounded-3xl bg-[#09090B] p-6 sm:p-10 text-white shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                  <TrendingUp size={16} />
                  <span>Verified Key Metrics</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {study.results.map((res: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-white/20 pl-4">
                      <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                        {res.metric}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-semibold text-neutral-200">
                        {res.label}
                      </div>
                      {res.context && (
                        <div className="mt-1 text-xs text-neutral-400">{res.context}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main Content Body */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Detailed Narrative */}
              <div className="lg:col-span-8 space-y-12">
                {/* The Challenge */}
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090B]">
                    The Challenge
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#52525B]">
                    {study.challenge}
                  </p>
                </div>

                {/* The Objectives */}
                {study.objectives && study.objectives.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090B]">
                      Core Objectives
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {study.objectives.map((obj: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black text-white text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-base text-[#3F3F46] leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* The Strategy & Execution */}
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090B]">
                    The Strategy & Execution
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#52525B]">
                    {study.strategy}
                  </p>
                </div>

                {/* Testimonial Quote */}
                {study.testimonialQuote && (
                  <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
                    <Quote size={28} className="text-[#A1A1AA]" />
                    <p className="mt-4 text-lg italic text-[#09090B] leading-relaxed">
                      “{study.testimonialQuote}”
                    </p>
                    {study.testimonialAuthor && (
                      <div className="mt-4 pt-4 border-t border-black/[0.06]">
                        <p className="font-display font-bold text-[#09090B]">
                          {study.testimonialAuthor}
                        </p>
                        <p className="text-xs text-[#71717A]">{study.testimonialRole}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Sidebar Specs & Deliverables */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm">
                  <h3 className="font-display text-base font-bold uppercase tracking-wider text-[#71717A]">
                    Scope of Deliverables
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {study.deliverables?.map((del: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check size={16} className="text-black shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-[#3F3F46]">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Consultation Card */}
                <div className="rounded-2xl bg-black p-6 text-white shadow-md">
                  <h3 className="font-display text-lg font-bold">Need Similar Results?</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                    We will analyze your current marketing stack and engineer a tailored roadmap.
                  </p>
                  <a
                    href="/contact"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-bold text-black transition-all hover:bg-neutral-200"
                  >
                    <span>Schedule Growth Call</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
