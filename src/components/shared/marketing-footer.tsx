import Link from "next/link";

import { appName } from "@/lib/mock-data";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-medium text-slate-700">{appName}</p>
          <p className="mt-1">Guest-first short links with a cleaner dashboard after sign in.</p>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/pricing" className="hover:text-slate-950">
            Pricing
          </Link>
          <Link href="/guest-links" className="hover:text-slate-950">
            Guest flow
          </Link>
          <Link href="/sign-in" className="hover:text-slate-950">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
