import haloImg from "@/assets/work-identity-halo.jpg";
import skinImg from "@/assets/work-package-skin.jpg";
import pulseImg from "@/assets/work-identity-pulse.jpg";
import riseImg from "@/assets/work-package-rise.jpg";
import voltexImg from "@/assets/work-ad-sneaker.jpg";
import juiceImg from "@/assets/work-social-juice.jpg";
import homeImg from "@/assets/work-campaign-home.jpg";
import travelImg from "@/assets/work-ads-travel.jpg";
import serviceImg1 from "@/assets/service-identity.jpg";
import serviceImg2 from "@/assets/service-social.jpg";

export interface PortfolioCard {
  title: string;
  outcome: string;
  image: string;
  alt: string;
}

export const tenPortfolioCards: PortfolioCard[] = [
  {
    title: "fäm Properties",
    outcome: "One content system across an entire enterprise brokerage",
    image: haloImg,
    alt: "fäm Properties luxury real estate video content system",
  },
  {
    title: "Founder Personal Brand",
    outcome: "An executive authority system that scaled to six figures",
    image: skinImg,
    alt: "Founder personal brand visual identity and video production",
  },
  {
    title: "DXB Interact",
    outcome: "Turning market data into a trusted authority platform",
    image: pulseImg,
    alt: "DXB Interact real estate data platform performance creative",
  },
  {
    title: "fäm Luxe",
    outcome: "A luxury content system built for high-net-worth buyers",
    image: riseImg,
    alt: "fäm Luxe luxury real estate cinematic showcase",
  },
  {
    title: "Aesthetic Clinics",
    outcome: "Lead-gen campaigns delivering qualified bookings at efficient cost",
    image: voltexImg,
    alt: "Aesthetic clinics direct-response patient acquisition ads",
  },
  {
    title: "Salons & Beauty",
    outcome: "Consistent conversations and new customers, month over month",
    image: juiceImg,
    alt: "Salons and beauty brand social media and booking campaigns",
  },
  {
    title: "Developers & Off-Plan",
    outcome: "Full project marketing from launch to leads",
    image: homeImg,
    alt: "Property developer off-plan launch campaign creative",
  },
  {
    title: "Luxury Supercars",
    outcome: "Prestige content for high-end automotive brands",
    image: travelImg,
    alt: "Prestige luxury automotive cinematic video production",
  },
  {
    title: "Holiday Homes",
    outcome: "Investor-facing passive-income campaigns",
    image: serviceImg1,
    alt: "Holiday homes investor marketing campaign and photography",
  },
  {
    title: "Personal Brands & Influencers",
    outcome: "Organic growth from small to large audiences",
    image: serviceImg2,
    alt: "Creator and influencer high-retention content system",
  },
];

export function OurWorkSection() {
  return (
    <section
      id="work"
      aria-label="Our Work Portfolio"
      className="relative w-full overflow-hidden bg-[#000000] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="flex h-[38px] items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-5">
            <span className="font-display text-[12px] font-semibold tracking-[0.16em] text-[#A1A1AA] uppercase">
              Our Work
            </span>
          </div>

          <h2 className="mt-4 sm:mt-5">
            <span className="block font-display text-[32px] sm:text-[44px] lg:text-[clamp(44px,5vw,68px)] font-bold lg:font-extrabold leading-[1] tracking-[-0.045em] text-white">
              Content that Converts
            </span>
          </h2>

          <p className="mt-3 text-[16px] sm:text-[18px] lg:text-[20px] text-[#A1A1AA]">
            Ten systems. Ten industries. One standard.
          </p>
        </div>

        {/* 10 Portfolio Cards Grid - Exact Brief requirement: 16:9 media, Title, Outcome line, NO "View Project" buttons */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {tenPortfolioCards.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0F0F14] p-4 transition-all duration-300 hover:border-[#1E6BFF]/50 hover:shadow-2xl"
            >
              {/* 16:9 Media Area */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Outcome Line */}
              <div className="mt-4 px-1 pb-1">
                <h3 className="font-display text-[19px] sm:text-[20px] font-bold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#A1A1AA]">
                  {item.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
