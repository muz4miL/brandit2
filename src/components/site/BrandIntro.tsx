import { HeroButton } from "./HeroButton";
import { Wordmark } from "./Wordmark";

export function BrandIntro() {
  return (
    <section
      id="about"
      aria-label="Welcome to brandit"
      className="relative w-full overflow-hidden bg-[#000000] rounded-t-[36px] sm:rounded-t-[54px] lg:rounded-t-[72px] py-10 sm:py-14 lg:py-16 px-5 sm:px-8 lg:px-12 flex flex-col items-center select-none border-t border-white/[0.08]"
    >
      {/* Ambient monochrome brand glows */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[200px] bg-white/[0.03] blur-[100px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[960px] w-full flex-col items-center text-center">
        {/* Main Heading: "Welcome to" + Brandit wordmark */}
        <div className="flex flex-col items-center">
          <h2 className="text-center font-display text-[28px] sm:text-[40px] lg:text-[50px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
            Welcome to
          </h2>
          <div
            className="mt-3 sm:mt-4 flex items-center justify-center relative"
            aria-label="brandit"
          >
            {/* Ambient monochrome glow behind mark */}
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-4 bg-white/10 blur-[35px] rounded-full"
              aria-hidden="true"
            />
            <div className="relative flex items-center">
              <Wordmark glow className="text-5xl sm:text-6xl lg:text-7xl drop-shadow-[0_0_24px_rgba(255,255,255,0.15)]" />
              <span className="font-display font-bold text-white text-[13px] sm:text-[18px] lg:text-[22px] self-start -mt-0.5 sm:-mt-1 ml-1 opacity-90 select-none">
                ®
              </span>
            </div>
          </div>
        </div>

        {/* Paragraph 1 - Concise High impact statement */}
        <p className="mt-5 sm:mt-6 max-w-[760px] text-center text-[16px] sm:text-[19px] lg:text-[22px] font-normal text-[#E4E4E7] leading-[1.45] tracking-tight">
          You’re here because you’re building something that matters.
          <span className="block mt-0.5 sm:mt-0 font-medium text-white">
            {" "}A business that wins. A brand that dominates.
          </span>
        </p>

        {/* Paragraph 2 - Agency capability */}
        <p className="mt-2.5 sm:mt-3.5 max-w-[720px] text-center text-[14px] sm:text-[15px] lg:text-[17px] font-normal text-[#A1A1AA] leading-[1.5]">
          We partner with fast-growing brands doing serious volume to create and scale performance-driven creative systems, iconic brand identity, and acquisition engines that fuel serious growth.
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
