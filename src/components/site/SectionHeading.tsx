export function SectionHeading({
  label,
  sans,
  serif,
}: {
  label: string;
  sans: string;
  serif: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="pill-label">{label}</span>
      <h2 className="text-[46px] md:text-[clamp(56px,5.2vw,76px)]">
        <span className="display-sans block">{sans}</span>
        <span className="display-serif block text-[1.08em]">{serif}</span>
      </h2>
    </div>
  );
}
