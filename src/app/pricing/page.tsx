import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { MarketingFooter } from "@/components/shared/marketing-footer";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { pricingTiers } from "@/lib/mock-data";
import { linkButtonClass } from "@/lib/ui";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans for a guest-first v1"
          description="The free tier handles the first 10 short links, then the product nudges people into account creation and richer analytics."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article key={tier.name} className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{tier.name}</p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-foreground">{tier.price}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 text-sky-700" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 flex gap-3">
          <Link href="/sign-up" className={linkButtonClass("primary")}>
            Start free
          </Link>
          <Link href="/dashboard" className={linkButtonClass("secondary")}>
            Preview app
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
