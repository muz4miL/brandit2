import { heroTiles } from "@/content/site";

const spans = [
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
  "",
  "",
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
];

export function HeroMosaic() {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-tile md:h-full md:min-h-[620px]">
      <div className="mosaic-drift absolute -inset-[30%] grid grid-cols-4 auto-rows-[140px] gap-3 md:auto-rows-[170px] md:gap-4">
        {[...heroTiles, ...heroTiles].map((src, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-tile bg-surface ${spans[i % spans.length]}`}
          >
            <img
              src={src}
              alt=""
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
              loading={i < 8 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
      <span className="absolute bottom-4 right-4 rounded-full bg-panel/80 px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
        Concept previews
      </span>
    </div>
  );
}
