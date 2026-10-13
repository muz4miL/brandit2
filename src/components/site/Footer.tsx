import { nav, socialLinks } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
      <Wordmark className="text-3xl" />
      <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="hover:text-foreground">
            {n.label}
          </a>
        ))}
        {socialLinks.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            {s.label}
          </a>
        ))}
      </nav>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Brand It</p>
    </footer>
  );
}
