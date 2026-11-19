/**
 * Centralized site URL resolver.
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (explicit production domain or configured public URL)
 * 2. SITE_URL
 * 3. VERCEL_PROJECT_PRODUCTION_URL (Vercel automatic production branch URL)
 * 4. VERCEL_URL (preview deployment URL)
 * 5. Fallback to http://localhost:3000
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
  }
  return "http://localhost:3000";
}

/**
 * Returns a fully qualified absolute URL for a given relative path.
 */
export function absoluteUrl(path: string = "/"): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
