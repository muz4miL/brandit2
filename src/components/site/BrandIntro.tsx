import { HeroButton } from "./HeroButton";
import { Wordmark } from "./Wordmark";

export function BrandIntro() {
  return (
    <section
      id="about"
      aria-label="Welcome to brandit"
      className="brand-intro relative w-full overflow-hidden rounded-t-[36px] border-t border-line bg-panel px-5 py-10 text-fg select-none sm:rounded-t-[54px] sm:px-8 sm:py-14 lg:rounded-t-[72px] lg:px-12 lg:py-16"
    >
      {/* Ambient monochrome brand glows */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,color-mix(in_srgb,var(--foreground)_5%,transparent),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[520px] -translate-x-1/2 rounded-full bg-fg/[0.03] blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[960px] w-full flex-col items-center text-center">
        {/* Main Heading: "Welcome to" + Brandit wordmark */}
        <div className="flex flex-col items-center">
          <h2 className="text-center font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg sm:text-[40px] lg:text-[50px]">
            Welcome to
          </h2>
          <div
            className="mt-3 sm:mt-4 flex items-center justify-center relative"
            aria-label="brandit"
          >
            <div className="relative flex items-center">
              <Wordmark variant="theme" className="text-5xl sm:text-6xl lg:text-7xl" />
              <span className="mt-[-2px] ml-1 self-start font-display text-[13px] font-bold text-fg opacity-90 select-none sm:-mt-1 sm:text-[18px] lg:text-[22px]">
                ®
              </span>
            </div>
          </div>
        </div>

        {/* Paragraph 1 - Concise High impact statement */}
        <p className="mt-5 max-w-[760px] text-center text-[16px] font-normal leading-[1.45] tracking-tight text-fg sm:mt-6 sm:text-[19px] lg:text-[22px]">
          You’re here because you’re building something that matters.
          <span className="mt-0.5 block font-medium text-fg sm:mt-0">
            {" "}
            A business that wins. A brand that dominates.
          </span>
        </p>

        {/* Paragraph 2 - Agency capability */}
        <p className="mt-2.5 max-w-[720px] text-center text-[14px] font-normal leading-[1.5] text-muted-foreground sm:mt-3.5 sm:text-[15px] lg:text-[17px]">
          We partner with fast-growing brands doing serious volume to create and scale
          performance-driven creative systems, iconic brand identity, and acquisition engines that
          fuel serious growth.
        </p>

        {/* Shared brand CTA */}
        <div className="mt-7 sm:mt-8 flex justify-center w-full">
          <HeroButton
            href="/contact"
            leftText="Ready?"
            rightText="Start Now"
            ariaLabel="Start a project with brandit."
          />
        </div>
      </div>
    </section>
  );
}
