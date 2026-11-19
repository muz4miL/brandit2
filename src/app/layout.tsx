import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Fraunces } from "next/font/google";
import "../styles.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CinematicPreloader } from "@/components/site/CinematicPreloader";
import { getSiteUrl } from "@/lib/site-url";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
    template: "%s | brandit.",
  },
  description:
    "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
  keywords: [
    "marketing agency",
    "growth systems",
    "paid advertising agency",
    "performance creative",
    "content production",
    "brand identity",
    "web stores and automation",
    "influencer marketing",
    "UAE marketing agency",
    "brandit",
  ],
  authors: [{ name: "brandit.", url: siteUrl }],
  creator: "brandit.",
  publisher: "brandit.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
    description:
      "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
    type: "website",
    siteName: "brandit.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "brandit. — Marketing Agency | Ads, Content, Branding & Web",
    description:
      "Full-service marketing agency. Meta, Google & TikTok ads, video and photography production, branding, websites, Shopify and AI automation. UAE-forged, delivered worldwide.",
  },
  icons: {
    icon: [{ url: "/brandit-favicon.png?v=2", type: "image/png" }],
    shortcut: "/brandit-favicon.png?v=2",
    apple: "/brandit-favicon.png?v=2",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${fraunces.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('brandit-theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <CinematicPreloader />
          <QueryProvider>
            <SmoothScroll />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
