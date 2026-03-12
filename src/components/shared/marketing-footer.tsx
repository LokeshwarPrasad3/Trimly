import Link from "next/link";

import { appName } from "@/lib/mock-data";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>{appName} UI starter for v1 product review.</p>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/sign-in" className="hover:text-foreground">
            Sign in
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
