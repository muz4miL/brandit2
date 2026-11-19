// Starter testimonial set.
// Used as the homepage fallback while the DB collection is empty, and as the
// "Import starter set" source in the admin Testimonials tab. Once imported,
// every field is editable from the admin panel (Mongo `testimonials` collection).

export interface StarterTestimonial {
  quote: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  companyCategory: string;
  companyLogoUrl?: string;
  clientPhotoUrl?: string;
  clientVideoUrl?: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export const starterTestimonials: StarterTestimonial[] = [
  {
    quote:
      "They didn't pitch us a campaign. They rebuilt how we're positioned, and the right clients started finding us.",
    clientName: "Daniel Reeve",
    clientTitle: "Managing Partner",
    companyName: "Apex Strategic Advisory",
    companyCategory: "Management consultancy",
    stat1Value: "+184%",
    stat1Label: "Qualified pipeline",
    stat2Value: "3.2x",
    stat2Label: "Inbound enquiries",
    stat3Value: "-68%",
    stat3Label: "Shorter sales cycle",
  },
  {
    quote:
      "Every drop sold through faster than the last, and we always knew exactly what was shipping next.",
    clientName: "Maya Okafor",
    clientTitle: "Head of Growth",
    companyName: "Voltex Activewear",
    companyCategory: "Athletic apparel",
    stat1Value: "4.6x",
    stat1Label: "Return on ad spend",
    stat2Value: "-32%",
    stat2Label: "Cost per acquisition",
    stat3Value: "120k",
    stat3Label: "New customers",
  },
  {
    quote:
      "Our community finally has something to come back to every week. The content engine just runs.",
    clientName: "Jordan Ellis",
    clientTitle: "Founder",
    companyName: "Pulse Performance",
    companyCategory: "Health & fitness",
    stat1Value: "20",
    stat1Label: "Content pieces a month",
    stat2Value: "+47%",
    stat2Label: "Audience retention",
    stat3Value: "2.4x",
    stat3Label: "Community growth",
  },
  {
    quote:
      "Three weeks from brief to shelf-ready. Over a hundred stockists signed up before we'd even finished unpacking.",
    clientName: "Sofia Marchetti",
    clientTitle: "Co-founder",
    companyName: "Zest Botanicals",
    companyCategory: "Consumer goods",
    stat1Value: "100+",
    stat1Label: "Stockists secured",
    stat2Value: "3",
    stat2Label: "Weeks brief to shelf",
    stat3Value: "+28%",
    stat3Label: "Repeat purchase",
  },
  {
    quote:
      "The redesign paid for itself in retention alone. Baskets got bigger and customers kept coming back.",
    clientName: "Priya Nair",
    clientTitle: "Director of E-commerce",
    companyName: "Lumina Home & Living",
    companyCategory: "Modern retail",
    stat1Value: "+92%",
    stat1Label: "Average order value",
    stat2Value: "+38%",
    stat2Label: "Returning customers",
    stat3Value: "-21%",
    stat3Label: "Acquisition cost",
  },
];
