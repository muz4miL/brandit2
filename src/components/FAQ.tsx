import { useId, useState } from "react";
import { Plus } from "lucide-react";

// TODO: replace with real answers
export const FAQS: { q: string; a: string }[] = [
  // Left Column (1-5)
  {
    q: "What type of brands do you work best with?",
    a: "We work best with ambitious direct-to-consumer and high-growth brands that already have validated product-market fit and are looking to scale profitably. Whether you're scaling to $1M/month or heading towards $100M+ in valuation, our creative systems are built to accelerate your performance.",
  },
  {
    q: "What makes Brand It different from other agencies?",
    a: "Unlike traditional agencies that separate creative and performance, Brand It combines state-of-the-art production studios, high-velocity creative testing, and paid media strategy under one roof. We operate like an agile in-house team rather than an external vendor.",
  },
  {
    q: "How much creative volume do you produce?",
    a: "We produce between 20 to 50+ unique creative assets, video variations, and design concepts every single month depending on your tier. This volume ensures continuous testing and prevents ad fatigue across Meta, TikTok, and Google.",
  },
  {
    q: "How soon will I see results?",
    a: "Most brand partners see significant performance improvements and winning creative hooks within the first 14 to 30 days of launch. Rapid creative deployment and weekly iterative testing allow us to find scale quickly.",
  },
  {
    q: "How does Brand It track success?",
    a: "We track primary business metrics that actually matter: blended MER, first-party ROAS, CAC, and net profit scale. We align our creative optimization directly with your P&L rather than vanity platform metrics.",
  },
  // Right Column (6-10)
  {
    q: "What does “Growth Partner” actually mean?",
    a: "Being a growth partner means we take full ownership of your creative strategy, visual identity, and performance outcomes. We plug directly into your Slack, roadmap alongside your founders, and share skin in the game for your long-term success.",
  },
  {
    q: "What if we already have an in-house team?",
    a: "We complement and empower existing in-house teams seamlessly. We can handle high-volume ad production, specialized studio shoots, or rapid concept testing while your internal designers focus on core brand initiatives.",
  },
  {
    q: "What’s the minimum investment to work with us?",
    a: "Our partnerships typically start at $5,000 to $10,000/month for comprehensive creative and performance production. We customize each engagement based on your monthly ad spend and required asset volume.",
  },
  {
    q: "How does onboarding work?",
    a: "Onboarding takes less than 7 days. We conduct an in-depth brand audit, integrate into your analytics and creative library, align on sprint goals, and deliver your first batch of production-ready assets within week one.",
  },
  {
    q: "What results have you achieved for other brands?",
    a: "We have helped generate over $150M+ in tracked client revenue, lowered blended CAC by an average of 34%, and scaled multiple brands from six figures to eight figures in valuation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const leftColumnFaqs = FAQS.slice(0, 5);
  const rightColumnFaqs = FAQS.slice(5, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
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
      aria-label="Frequently asked questions"
      className="relative w-full overflow-x-hidden bg-[#000000] pt-[72px] pb-20 md:pt-[120px] md:pb-[140px] select-none"
    >
      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Heading Block */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4 text-center">
        <h2 className="flex flex-wrap items-center justify-center text-center font-display text-[clamp(40px,6.2vw,104px)] font-bold tracking-[-0.04em] text-[#d4d4d4] leading-none">
          <span>Frequently Asked&nbsp;</span>
          <span className="font-serif font-normal italic tracking-[-0.03em] text-[#e5e5e5]">
            Questions
          </span>
        </h2>
      </div>

      {/* Full-width 1px divider line edge to edge of viewport */}
      <div className="mt-14 w-full border-t border-white/[0.08] md:mt-[72px]" />

      {/* Accordion Layout: 2 independent flex columns on desktop */}
      <div className="mx-auto mt-16 max-w-[1180px] px-5 min-[900px]:mt-[100px] min-[900px]:px-10">
        <div className="grid grid-cols-1 items-start gap-0 min-[900px]:grid-cols-2 min-[900px]:gap-[90px]">
          {/* Left Column (Items 1-5) */}
          <div className="flex w-full flex-col items-start">
            {leftColumnFaqs.map((faq, index) => {
              const actualIdx = index;
              const isOpen = openIndex === actualIdx;
              const questionId = `${baseId}-q-${actualIdx}`;
              const answerId = `${baseId}-a-${actualIdx}`;

              return (
                <div key={actualIdx} className="w-full">
                  <h3 className="w-full">
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(actualIdx)}
                      className="group flex min-h-[76px] w-full cursor-pointer items-center justify-between py-6 text-left transition-colors duration-250 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-4"
                    >
                      <span
                        className={`font-sans text-[18px] leading-[1.3] tracking-[-0.01em] transition-colors duration-250 min-[900px]:text-[20px] xl:text-[22px] ${
                          isOpen
                            ? "font-medium text-white"
                            : "text-white/85 group-hover:font-medium group-hover:text-white"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <Plus
                        className={`ml-4 h-[22px] w-[22px] shrink-0 text-white transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {/* Expandable answer panel */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`max-w-[90%] pb-6 pr-12 font-sans text-[16px] leading-[1.6] text-white/65 transition-opacity duration-300 md:text-[18px] ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (Items 6-10) */}
          <div className="flex w-full flex-col items-start">
            {rightColumnFaqs.map((faq, index) => {
              const actualIdx = index + 5;
              const isOpen = openIndex === actualIdx;
              const questionId = `${baseId}-q-${actualIdx}`;
              const answerId = `${baseId}-a-${actualIdx}`;

              return (
                <div key={actualIdx} className="w-full">
                  <h3 className="w-full">
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(actualIdx)}
                      className="group flex min-h-[76px] w-full cursor-pointer items-center justify-between py-6 text-left transition-colors duration-250 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-4"
                    >
                      <span
                        className={`font-sans text-[18px] leading-[1.3] tracking-[-0.01em] transition-colors duration-250 min-[900px]:text-[20px] xl:text-[22px] ${
                          isOpen
                            ? "font-medium text-white"
                            : "text-white/85 group-hover:font-medium group-hover:text-white"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <Plus
                        className={`ml-4 h-[22px] w-[22px] shrink-0 text-white transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {/* Expandable answer panel */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`max-w-[90%] pb-6 pr-12 font-sans text-[16px] leading-[1.6] text-white/65 transition-opacity duration-300 md:text-[18px] ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
