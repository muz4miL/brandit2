import { aboutImages } from "@/content/site";

export function AboutPanel() {
  return (
    <section
      id="about"
      className="shell grid gap-8 overflow-hidden p-4 md:grid-cols-2 md:items-center md:p-6"
    >
      <div className="p-3 md:p-10">
        <h2 className="text-[44px] md:text-[clamp(52px,4.8vw,70px)]">
          <span className="display-sans block">One team.</span>
          <span className="display-serif block text-[1.08em]">Your brand, connected.</span>
        </h2>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          We bring identity, content and campaigns together, helping businesses present themselves
          clearly and consistently.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {["Identity", "Content", "Campaigns"].map((l) => (
            <li key={l} className="pill-label text-foreground">
              {l}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {aboutImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width={1024}
            height={1024}
            loading="lazy"
            className={`aspect-square w-full rounded-tile object-cover ${i % 2 ? "translate-y-6" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
