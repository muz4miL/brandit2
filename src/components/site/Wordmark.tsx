// Placeholder until the supplied "the brandit." wordmark file is provided.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-display font-extrabold tracking-[-0.05em] text-foreground ${className}`}
      aria-label="the brandit."
    >
      <span className="mr-1 font-serif text-[0.9em] font-normal italic tracking-normal">the</span>
      brandit<span className="text-primary">.</span>
    </span>
  );
}
