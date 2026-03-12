import Link from "next/link";

import { appName, marketingNav } from "@/lib/mock-data";
import { linkButtonClass } from "@/lib/ui";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          {appName}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className={linkButtonClass("ghost", "hidden sm:inline-flex")}>
            Sign in
          </Link>
          <Link href="/sign-up" className={linkButtonClass("primary")}>
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}

