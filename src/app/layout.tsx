import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/query-provider";
import { Overpass } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blink | URL Shortener UI",
  description: "UI-first v1 workspace for a modern URL shortener product.",
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
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
