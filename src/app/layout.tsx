import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import "../styles.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CinematicPreloader } from "@/components/site/CinematicPreloader";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env["SITE_URL"] || "http://localhost:3000"),
  title: {
    default: "brandit. | Digital Creative Agency",
    template: "%s | brandit.",
  },
  description:
    "brandit. is a digital creative agency that puts your brand in front of the right customers, with a purpose behind every move. Book a free strategy call.",
  openGraph: {
    title: "brandit. | Digital Creative Agency",
    description:
      "brandit. is a digital creative agency that puts your brand in front of the right customers, with a purpose behind every move. Book a free strategy call.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} dark`}
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
