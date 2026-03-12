import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingFooter } from "@/components/shared/marketing-footer";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { featureCards, guestFlowHighlights, marketingStats } from "@/lib/mock-data";
import { linkButtonClass } from "@/lib/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f9fbff_0%,_#eff4ff_45%,_#ffffff_100%)]">
      <MarketingHeader />
      <main>
        <section className="mx-auto max-w-6xl px-6 py-18 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Simple URL shortener</p>
            <h1 className="mt-5 bg-gradient-to-r from-slate-950 via-sky-700 to-cyan-500 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl">
              Shorten long URLs fast, then log in only when you need more.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Blink lets guest users create up to 10 short links for free. After that, users can log in and continue using the product for free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/guest-links" className={linkButtonClass("primary", "px-5 py-3 text-base")}>
                Try guest links
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/sign-in" className={linkButtonClass("secondary", "px-5 py-3 text-base")}>
                Login for dashboard
              </Link>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {marketingStats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-border/70 bg-white/85 p-5 text-center shadow-sm">
                <p className="text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="A very simple flow"
            description="The product is easier to understand when it is explained in three small steps instead of a large dashboard story."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {guestFlowHighlights.map((item, index) => (
              <article key={item} className="rounded-[1.5rem] border border-border/70 bg-white p-6 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-sm font-semibold text-sky-700">
                  0{index + 1}
                </div>
                <p className="mt-5 text-base font-medium leading-7 text-foreground">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
          <SectionHeading
            eyebrow="What you get"
            title="Clear, minimal screens that are easy to read"
            description="The product surface is being simplified so users understand the core action first: shorten links."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featureCards.slice(0, 3).map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-[1.5rem] border border-border/70 bg-white p-6 shadow-sm">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
          <div className="rounded-[2rem] border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-cyan-50 p-8 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Ready to try</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Create 10 short links for free as a guest.</h2>
              </div>
              <Link href="/guest-links" className={linkButtonClass("primary", "px-5 py-3 text-base")}>
                Open guest flow
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

