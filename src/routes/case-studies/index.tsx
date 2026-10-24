import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowUpRight, Sparkles, TrendingUp, Award, Quote } from "lucide-react";
import { getSiteContentFn } from "@/api/public";

export const Route = createFileRoute("/case-studies/")({
  loader: async () => {
    const content = await getSiteContentFn();
    return { caseStudies: content?.caseStudies || [] };
  },
  head: () => ({
    meta: [
      { title: "Case Studies — brandit. | Proven Revenue & Growth Transformations" },
      {
        name: "description",
        content:
          "Explore detailed breakdowns of how brandit. engineered multi-million dollar growth, lower acquisition costs, and dominant brand authority for our clients.",
      },
      { property: "og:title", content: "Case Studies — brandit. Agency" },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const { caseStudies } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <Header />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="border-b border-black/[0.06] pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                <Sparkles size={13} className="text-black" />
                <span>Deep-Dive Analyses</span>
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09090B] leading-[1.1]">
                Real Revenue. <br />
                <span className="font-serif italic font-normal text-[#3F3F46]">
                  Documented Proof.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#52525B]">
                We don’t celebrate vanity impressions. Here is the exact architecture, creative
                testing methodology, and financial outcome behind our client partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies List */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 space-y-16">
            {caseStudies && caseStudies.length > 0 ? (
              caseStudies.map((study: any) => (
                <article
                  key={study.slug}
                  className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm transition-all duration-300 hover:border-black/25 hover:shadow-md"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
                    {/* Left Meta & Summary */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                            {study.industry}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                            Client: {study.client}
                          </span>
                        </div>

                        <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#09090B]">
                          <Link
                            to="/case-studies/$slug"
                            params={{ slug: study.slug }}
                            className="hover:underline"
                          >
                            {study.title}
                          </Link>
                        </h2>

                        <p className="mt-4 text-base leading-relaxed text-[#52525B]">
                          {study.subtitle || study.challenge}
                        </p>

                        {/* Deliverables tags */}
                        {study.deliverables && study.deliverables.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-1.5">
                            {study.deliverables.slice(0, 4).map((del: string, idx: number) => (
                              <span
                                key={idx}
                                className="rounded-md border border-black/10 bg-[#FAFAFA] px-2.5 py-1 text-xs font-medium text-[#3F3F46]"
                              >
                                {del}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Testimonial Quote if available */}
                      {study.testimonialQuote && (
                        <div className="mt-8 border-t border-black/[0.06] pt-5">
                          <div className="flex items-start gap-3">
                            <Quote size={18} className="text-[#A1A1AA] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs sm:text-sm italic text-[#52525B]">
                                “{study.testimonialQuote}”
                              </p>
                              {study.testimonialAuthor && (
                                <p className="mt-1 text-xs font-semibold text-[#09090B]">
                                  {study.testimonialAuthor} —{" "}
                                  <span className="text-[#71717A] font-normal">
                                    {study.testimonialRole}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Results Grid */}
                    <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#09090B] p-6 sm:p-8 text-white">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                          <TrendingUp size={15} />
                          <span>Verified Impact</span>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                          {study.results?.map((res: any, rIdx: number) => (
                            <div
                              key={rIdx}
                              className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                            >
                              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                                {res.metric}
                              </div>
                              <div className="mt-1 text-xs font-medium text-neutral-300">
                                {res.label}
                              </div>
                              {res.context && (
                                <div className="mt-1 text-[11px] text-neutral-400 line-clamp-1">
                                  {res.context}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-neutral-400 font-medium">
                          Full Case Study Breakdown
                        </span>
                        <Link
                          to="/case-studies/$slug"
                          params={{ slug: study.slug }}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-all hover:bg-neutral-200"
                        >
                          <span>Read Full Story</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
                <p className="text-base text-[#52525B]">
                  Case studies are currently being finalized. Check back shortly.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-white py-20 border-t border-black/[0.06] text-center">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090B]">
              Ready to achieve similar metrics for your business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-[#52525B]">
              Let’s conduct a comprehensive audit of your current customer acquisition costs and map
              out an engineering sprint.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-semibold text-white transition-all hover:bg-neutral-800"
              >
                <span>Book a Discovery Call</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="https://wa.me/971525347120"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 bg-white px-7 text-sm font-semibold text-[#09090B] transition-all hover:bg-black/5"
              >
                <span>WhatsApp Umar Directly</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
