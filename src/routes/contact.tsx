import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  ArrowUpRight,
  Sparkles,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { submitContactEnquiryFn } from "@/api/public";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact brandit. — Book a Discovery Call | Dubai Marketing Agency" },
      {
        name: "description",
        content:
          "Connect with brandit. Book a discovery call, chat via WhatsApp, or submit your project brief for paid ads, content production, branding, or web.",
      },
      { property: "og:title", content: "Contact brandit. Agency" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneWhatsApp, setPhoneWhatsApp] = useState("");
  const [company, setCompany] = useState("");
  const [serviceOfInterest, setServiceOfInterest] = useState("Full-Stack Growth & Performance");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Pre-fill service from URL if provided (?service=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("service");
      if (s) setServiceOfInterest(s);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(null);

    try {
      const res = await submitContactEnquiryFn({
        data: {
          fullName,
          email,
          phoneWhatsApp,
          company,
          serviceOfInterest,
          message,
          _hp: honeypot,
        },
      });

      if (res.success) {
        setSubmissionSuccess(
          "Thank you! Your inquiry has been directly dispatched to our senior leadership team. We will analyze your brand and respond within 24 hours.",
        );
        setFullName("");
        setEmail("");
        setPhoneWhatsApp("");
        setCompany("");
        setMessage("");
      }
    } catch (err: any) {
      setSubmissionError(
        err?.message || "Something went wrong. Please check your information and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <Header />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="border-b border-black/[0.06] pt-12 pb-20 md:pt-16 md:pb-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                <Sparkles size={13} className="text-black" />
                <span>Start a Conversation</span>
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09090B] leading-[1.1]">
                Let’s Engineer Growth. <br />
                <span className="font-serif italic font-normal text-[#3F3F46]">
                  Book Your Discovery Call.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#52525B]">
                We partner with brands ready to take category leadership. Tell us about your goals,
                and we’ll map out the exact creative and media engine to get you there.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Grid Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Agency Channels */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#09090B]">
                    Direct Communication
                  </h2>
                  <p className="mt-2 text-sm text-[#52525B]">
                    Prefer a quick message? Reach our team directly via WhatsApp or email.
                  </p>
                </div>

                {/* Direct Contact Cards */}
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/971525347120?text=Hi%20brandit.%20team%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs transition-all hover:border-black/30 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-black text-white">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                          Instant WhatsApp
                        </div>
                        <div className="font-display text-base font-bold text-[#09090B]">
                          +971 52 534 7120
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-[#A1A1AA]" />
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@brandit.agency"
                    className="flex items-center justify-between rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs transition-all hover:border-black/30 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-black text-white">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                          Direct Inquiries
                        </div>
                        <div className="font-display text-base font-bold text-[#09090B]">
                          info@brandit.agency
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-[#A1A1AA]" />
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-black/5 text-[#09090B]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                        Headquarters
                      </div>
                      <div className="font-display text-base font-bold text-[#09090B]">
                        Dubai, United Arab Emirates
                      </div>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-black/5 text-[#09090B]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                        Working Hours
                      </div>
                      <div className="font-display text-base font-bold text-[#09090B]">
                        Monday — Friday: 09:00 — 18:00 (GST)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-10 shadow-sm">
                  {submissionSuccess ? (
                    <div className="rounded-2xl border border-black/10 bg-[#FAFAFA] p-8 text-center text-[#09090B]">
                      <CheckCircle2 size={42} className="mx-auto text-black mb-4" />
                      <h3 className="font-display text-2xl font-bold">Inquiry Dispatched</h3>
                      <p className="mt-2 text-sm text-[#52525B] leading-relaxed">
                        {submissionSuccess}
                      </p>
                      <button
                        onClick={() => setSubmissionSuccess(null)}
                        className="mt-6 rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white hover:bg-neutral-800"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="border-b border-black/[0.06] pb-4">
                        <h3 className="font-display text-xl font-bold text-[#09090B]">
                          Project Brief & Discovery Request
                        </h3>
                        <p className="mt-1 text-xs text-[#71717A]">
                          Please fill out the form below. We treat all brand numbers and roadmaps
                          with strict NDA confidentiality.
                        </p>
                      </div>

                      {submissionError && (
                        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-50 p-3.5 text-xs text-red-700">
                          <AlertCircle size={16} className="shrink-0" />
                          <span>{submissionError}</span>
                        </div>
                      )}

                      {/* Honeypot */}
                      <input
                        type="text"
                        name="_hp"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm text-[#09090B] placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sarah@brand.com"
                            className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm text-[#09090B] placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={phoneWhatsApp}
                            onChange={(e) => setPhoneWhatsApp(e.target.value)}
                            placeholder="+971 50 123 4567"
                            className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm text-[#09090B] placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                            Company / Brand Name
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Apex Luxury Ltd"
                            className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm text-[#09090B] placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                          Primary Service of Interest
                        </label>
                        <select
                          value={serviceOfInterest}
                          onChange={(e) => setServiceOfInterest(e.target.value)}
                          className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm text-[#09090B] focus:border-black focus:bg-white focus:outline-none"
                        >
                          <option value="Full-Stack Growth & Performance">
                            Full-Stack Growth (Omnichannel Strategy + Ads + Creative)
                          </option>
                          <option value="Paid Advertising (Meta, Google, TikTok)">
                            Paid Advertising (Meta, Google, TikTok)
                          </option>
                          <option value="Content & Video Production (Dubai Studio)">
                            Content & Video Production (Dubai Studio)
                          </option>
                          <option value="Branding & Visual Identity Systems">
                            Branding & Visual Identity Systems
                          </option>
                          <option value="Web Design, Shopify & AI Automation">
                            Web Design, Shopify & AI Automation
                          </option>
                          <option value="Influencer & Collaborative Marketing">
                            Influencer & Collaborative Marketing
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                          Project Goals & Current Challenges
                        </label>
                        <textarea
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Briefly tell us about your current monthly revenue, primary growth bottleneck, or timeline..."
                          className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm text-[#09090B] placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-sm font-bold text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
                      >
                        <span>
                          {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry & Request Call"}
                        </span>
                        <ArrowUpRight size={16} />
                      </button>
                    </form>
                  )}
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
