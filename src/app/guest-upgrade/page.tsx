import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

import { linkButtonClass } from "@/lib/ui";

export default function GuestUpgradePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,_#f9fbff_0%,_#eff4ff_45%,_#ffffff_100%)] px-6 py-10 sm:px-10">
      <div className="grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[2rem] border border-border/70 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Free tier expired</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Your 10 free guest links are finished.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            To access all links and continue using Trimly, the user now needs to log in. For now, the logged-in experience stays free.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/sign-in" className={linkButtonClass("primary")}>
              Login to continue
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/guest-links" className={linkButtonClass("secondary")}>
              Back to guest view
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 size-5 text-amber-700" />
            <div>
              <p className="text-lg font-semibold text-amber-950">What the user should understand</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-800">
                <li>The guest tier gives exactly 10 free short links.</li>
                <li>After that, login is required to open the full workspace.</li>
                <li>The logged-in product remains free for now.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
