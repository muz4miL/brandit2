import { HeroButton } from "./HeroButton";

export function BrandIntro() {
  return (
    <section
      id="about"
      aria-label="Welcome to brandit"
      className="relative w-full max-w-[1660px] xl:max-w-[1720px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 select-none"
    >
      {/* Expansive Rounded Luxury Card matching Hero & Defiant */}
      <div className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[38px] md:rounded-[46px] lg:rounded-[56px] border border-white/[0.08] bg-[#07070A] px-6 py-20 text-white sm:px-12 sm:py-28 lg:px-16 lg:py-36 shadow-[0_32px_96px_rgba(0,0,0,0.85)]">
        {/* Ambient Subtle Radial Brand Glows */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_15%,rgba(255,255,255,0.035),transparent_70%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[560px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex max-w-[960px] w-full flex-col items-center text-center">
          {/* Main Monumental Heading: "Welcome to" + "brandit.®" */}
          <div className="flex flex-col items-center">
            <h2 className="font-display text-[46px] sm:text-[68px] md:text-[88px] lg:text-[104px] font-black leading-[0.98] tracking-[-0.04em] text-white">
              Welcome to
            </h2>
            <div className="relative mt-2 sm:mt-3 flex items-start justify-center">
              <span className="font-display text-[52px] sm:text-[76px] md:text-[98px] lg:text-[116px] font-black leading-[0.98] tracking-[-0.04em] text-white">
                brandit.
              </span>
              <sup className="font-display text-[16px] sm:text-[22px] md:text-[28px] font-bold text-white/70 ml-1.5 -top-3 sm:-top-5 md:-top-7 select-none">
                ®
              </sup>
            </div>
          </div>

          {/* High-Impact Statement 1 */}
          <div className="mt-8 sm:mt-12 max-w-[840px] text-center font-display text-[20px] sm:text-[24px] md:text-[27px] font-semibold leading-[1.35] tracking-tight text-white/95">
            <p>You’re here because you’re building something that matters.</p>
            <p className="mt-1">A business that wins. A brand that dominates.</p>
          </div>

          {/* Agency Capability Statement 2 */}
          <p className="mt-6 sm:mt-7 max-w-[760px] text-center font-sans text-[15px] sm:text-[17px] md:text-[19px] font-normal leading-[1.65] text-neutral-400">
            We partner with fast-growing brands doing serious volume to create and scale
            performance-driven creative systems, iconic brand identity, and acquisition engines that
            fuel serious growth.
          </p>

          {/* Luxury Action CTA */}
          <div className="mt-10 sm:mt-14 flex justify-center w-full">
            <HeroButton
              href="/contact"
              leftText="Ready?"
              rightText="Start Now"
              ariaLabel="Ready? Start Now"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
