import Image from "next/image";
import Link from "next/link";

import { appName, marketingNav } from "@/lib/mock-data";
import { linkButtonClass } from "@/lib/ui";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-lg font-semibold tracking-tight text-slate-950"
        >
          <Image
            src="/trimly.svg"
            alt="Trimly logo"
            width={36}
            height={36}
            className="size-9"
            priority
          />
          <span className="relative top-0.5">{appName}</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className={linkButtonClass(
              "ghost",
              "hidden rounded-xl px-4 py-2 text-slate-600 hover:bg-white/70 hover:text-slate-950 sm:inline-flex"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/guest-links"
            className={linkButtonClass(
              "primary",
              "rounded-xl px-4 py-2 shadow-[0_18px_35px_-22px_rgba(14,165,233,0.85)]"
            )}
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
