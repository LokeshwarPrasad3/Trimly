import { CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { resolverSignals } from "@/lib/mock-data";
import { linkButtonClass } from "@/lib/ui";

type ShortLinkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ShortLinkPage({ params }: ShortLinkPageProps) {
  const { slug } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(125,170,255,0.18),_transparent_35%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)] px-6 py-10 text-slate-50">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">Resolver preview</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">blink.new/{slug}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            This UI-only intermediate screen shows how trust, campaign context, and redirect intent can be communicated before the product performs the final handoff.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="https://example.com" className={linkButtonClass("primary", "bg-white text-slate-950 hover:bg-white/90")}>
              Continue to destination
              <ExternalLink className="size-4" />
            </Link>
            <Link href="/dashboard/links" className={linkButtonClass("ghost", "text-white hover:bg-white/10 hover:text-white")}>
              Back to dashboard
            </Link>
          </div>
        </section>
        <section className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-200">
            <ShieldCheck className="size-4" />
            Destination verified in preview mode
          </div>
          {resolverSignals.map((signal) => (
            <div key={signal} className="flex gap-3 rounded-2xl bg-white/5 p-4">
              <CheckCircle2 className="mt-0.5 size-4 text-sky-300" />
              <p className="text-sm leading-6 text-slate-200">{signal}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
