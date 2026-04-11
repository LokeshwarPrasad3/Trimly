import type { Metadata } from "next";
import { Overpass } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";

import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const metadataBase = appUrl ? new URL(appUrl.replace(/\/$/, "")) : undefined;

export const metadata: Metadata = {
  metadataBase,
  applicationName: "Trimly",
  title: {
    default: "Trimly | Shorten, share, and track every link",
    template: "%s | Trimly",
  },
  description:
    "Trimly is a modern URL shortener for creating clean short links, sharing them anywhere, and tracking performance from one simple dashboard.",
  keywords: [
    "Trimly",
    "URL shortener",
    "link shortener",
    "short links",
    "link analytics",
    "trackable links",
    "guest link creation",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", rel: "shortcut icon", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Trimly",
    title: "Trimly | Shorten, share, and track every link",
    description:
      "Create short links instantly, share them anywhere, and manage analytics from a clean Trimly dashboard.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Trimly landing page preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trimly | Shorten, share, and track every link",
    description:
      "Create short links instantly, share them anywhere, and manage analytics from a clean Trimly dashboard.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={overpass.className}>
      <body>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
