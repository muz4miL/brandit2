import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-center text-fg">
      <div className="max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">404</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-muted">
          The page you requested does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-80"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
