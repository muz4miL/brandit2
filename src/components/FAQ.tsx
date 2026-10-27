import { useState } from "react";
import { Plus } from "lucide-react";

export const BRIEF_FAQS = [
  {
    q: "Where are you based — do you work internationally?",
    a: "brandit. was built in the UAE, one of the most competitive markets in the world, and we deliver to clients across industries and borders. Wherever your business is, you get that standard.",
  },
  {
    q: "Are you an agency or a freelancer?",
    a: "A full agency. You work directly with our founder as senior strategist, and a trained specialist team executes under his systems. Senior thinking, full capacity, one point of contact.",
  },
  {
    q: "What makes you different?",
    a: "Systems. Most teams make content. We build the operating system around it — architecture, SOPs, quality gates, and ad spend aligned to real revenue — proven inside the UAE’s largest brokerage.",
  },
  {
    q: "Can you handle everything, or just one service?",
    a: "Either. Some clients take ads only, or a Shopify build only. Others hand us the whole growth engine — strategy, video, photography, design, media buying, website, and automation. Both work.",
  },
  {
    q: "Do you build websites and online stores too?",
    a: "Yes. Websites, conversion-built landing pages, and Shopify stores. We also set up AI automation for lead follow-up, booking, and reporting, so leads don’t go cold while you’re busy.",
  },
  {
    q: "How does influencer marketing work with you?",
    a: "We source creators who genuinely match your audience, negotiate and manage the campaign, and fold the resulting content back into your paid ads — so one collaboration works twice.",
  },
  {
    q: "How soon will I see results?",
    a: "Brand lift shows in the first month. Paid campaigns typically show early traction in 30–60 days as testing finds winners. Compounding growth comes from the system running month over month.",
  },
  {
    q: "What does it cost?",
    a: "Structured by scope — content only, ads only, a website build, or a full growth system. Share your goal on a call and we’ll send a clear plan and price.",
  },
];

export default function FAQ() {
  // All accordion items collapsed on initial page load as required by brief
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BRIEF_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative w-full overflow-hidden bg-[#09090D] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 border-t border-b border-white/[0.08] select-none"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.02] tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion list */}
        <div className="mt-10 sm:mt-12 space-y-3">
          {BRIEF_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121217] transition-colors duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span className="font-display text-[17px] sm:text-[18px] font-bold text-white pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-transform duration-200 ${
                      isOpen ? "rotate-45 text-[#1E6BFF]" : ""
                    }`}
                  >
                    <Plus size={16} className="stroke-[2.5]" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-[15px] sm:text-[16px] leading-relaxed text-[#A1A1AA] border-t border-white/[0.06]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
