"use client";
import Link from "next/link";
import { ArrowRight, Link2, ShieldCheck, Sparkles } from "lucide-react";

import { MarketingFooter } from "@/components/shared/marketing-footer";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  featureCards,
  guestFlowHighlights,
  marketingStats,
} from "@/lib/mock-data";
import { linkButtonClass } from "@/lib/ui";

import { useState, useRef } from "react";
import { toast } from "sonner";

export default function HomePage() {
  const linkRef = useRef<HTMLParagraphElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const link = linkRef.current?.textContent?.trim();
    if (link) {
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
        // Optionally select the text for visual feedback
        const range = document.createRange();
        range.selectNodeContents(linkRef.current!);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_22%),linear-gradient(180deg,_#f8fbff_0%,_#eef6ff_44%,_#ffffff_100%)]">
      <MarketingHeader />
      <main>
        <section className="mx-auto max-w-7xl px-6 pt-14 pb-16 sm:px-8 lg:pt-18 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
                <Sparkles className="size-4 text-sky-700" />
                Simple URL shortener with a premium product surface
              </div>
              <div className="space-y-5">
                <p className="text-sm font-semibold tracking-[0.24em] text-sky-700 uppercase">
                  Shorten. Share. Track.
                </p>
                <h1 className="max-w-3xl bg-[linear-gradient(135deg,_#0f172a_0%,_#155e75_48%,_#0ea5e9_100%)] bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                  Premium short links. Instantly.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Create short URLs instantly as a guest. When you are ready for
                  analytics and full link management, sign in and continue
                  inside a cleaner dashboard.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/guest-links"
                  className={linkButtonClass(
                    "primary",
                    "h-11 rounded-xl px-5 text-base shadow-[0_20px_45px_-26px_rgba(14,165,233,0.8)]"
                  )}
                >
                  Start with guest links
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/sign-in"
                  className={linkButtonClass(
                    "secondary",
                    "h-11 rounded-xl border border-white/70 bg-white/85 px-5 text-base text-slate-700 shadow-sm hover:bg-white"
                  )}
                >
                  Open dashboard
                </Link>
              </div>
            </div>
            <div className="live_look_right_section relative">
              <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_52%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/80 p-6 shadow-[0_34px_80px_-46px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <div className="rounded-[1.75rem] bg-[linear-gradient(145deg,_rgba(14,165,233,0.12),_rgba(255,255,255,0.95)_50%,_rgba(34,211,238,0.12))] p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold tracking-[0.18em] text-sky-700 uppercase">
                        Guest flow
                      </p>
                      <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
                        Create your short URL in seconds
                      </h2>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-white px-3 py-2 text-left shadow-sm sm:text-right">
                      <p className="text-xs tracking-[0.16em] text-slate-400 uppercase">
                        Free limit
                      </p>
                      <p className="text-lg font-semibold text-slate-950">
                        10 links
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 rounded-[1.5rem] border border-white/70 bg-white/75 p-4 shadow-sm sm:p-5">
                    <div className="min-w-0">
                      <p className="text-sm text-slate-500">Destination</p>
                      <p className="mt-2 text-sm font-medium break-all text-slate-950/80">
                        https://www.linkedin.com/posts/lokeshwar-dewangan-7b2163211_officially-graduated-btech-in-computer-activity-7351670982908047361-XqXH
                      </p>
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm text-slate-500">Short URL</p>
                        <p
                          ref={linkRef}
                          className="mt-2 text-sm font-semibold break-all text-slate-950/80"
                        >
                          https://trimly.lokeshwardewangan.in/ql9hPdy
                        </p>
                      </div>
                      <button
                        onClick={handleCopy}
                        className={`shrink-0 cursor-pointer rounded-xl px-3 py-2 text-sm font-medium shadow-[0_16px_30px_-18px_rgba(14,165,233,0.85)] hover:opacity-90 hover:shadow-sm ${copied ? "bg-emerald-500 text-white" : "bg-sky-600 text-white"}`}
                      >
                        {copied ? "Copied!" : "Copy link"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {marketingStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[1.25rem] border border-white/75 bg-white/70 px-4 py-4 shadow-sm"
                      >
                        <p className="text-base font-semibold tracking-tight text-slate-950">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:py-12">
          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_28px_70px_-50px_rgba(15,23,42,0.28)] backdrop-blur-xl lg:p-8">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps. No confusion."
              description="The product stays focused: create a link as a guest, share it immediately, then move into the dashboard only when you need more control."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {guestFlowHighlights.map((item, index) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(248,250,252,0.95))] p-6 shadow-sm"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#e0f2fe,_#f0f9ff)] text-sm font-semibold text-sky-700 shadow-sm">
                    0{index + 1}
                  </div>
                  <p className="mt-5 text-base leading-7 font-medium text-slate-800">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:py-14">
          <SectionHeading
            eyebrow="Why it feels better"
            title="A small product surface with premium details"
            description="The design stays light and readable, but the cards, gradients, spacing, and motion-ready layout make it feel like a polished product instead of a utility page."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className={`rounded-[1.75rem] border p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.28)] backdrop-blur-xl ${
                    index === 0
                      ? "border-sky-100 bg-[linear-gradient(180deg,_rgba(224,242,254,0.72),_rgba(255,255,255,0.96))]"
                      : "border-white/70 bg-white/78"
                  }`}
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#e0f2fe,_#f8fafc)] text-sky-700 shadow-sm">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-6 pb-16 sm:px-8 lg:pb-24">
          <div className="overflow-hidden rounded-[2.25rem] border border-sky-100 bg-[linear-gradient(135deg,_rgba(14,165,233,0.14),_rgba(255,255,255,0.96)_44%,_rgba(34,211,238,0.16))] p-8 shadow-[0_34px_80px_-46px_rgba(15,23,42,0.32)] lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
                  Ready to try
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Start with the guest flow now. Move into the dashboard when
                  you are ready.
                </h2>
                <p className="text-base leading-7 text-slate-600">
                  The first experience stays intentionally simple. The dashboard
                  adds analytics and link management only after sign in.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/guest-links"
                  className={linkButtonClass(
                    "primary",
                    "h-11 rounded-xl px-5 text-base shadow-[0_20px_45px_-26px_rgba(14,165,233,0.8)]"
                  )}
                >
                  Try guest links
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={linkButtonClass(
                    "secondary",
                    "h-11 rounded-xl border border-white/70 bg-white/85 px-5 text-base text-slate-700 shadow-sm hover:bg-white"
                  )}
                >
                  View pricing
                </Link>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/75 bg-white/78 p-5 shadow-sm">
                <div className="flex items-center gap-3 text-slate-950">
                  <Link2 className="size-4 text-sky-700" />
                  <p className="font-semibold">Guest-first</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Users understand the product before they are asked to create
                  an account.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/75 bg-white/78 p-5 shadow-sm">
                <div className="flex items-center gap-3 text-slate-950">
                  <ShieldCheck className="size-4 text-sky-700" />
                  <p className="font-semibold">Clean dashboard</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Signed-in users get a focused analytics workspace instead of a
                  noisy interface.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/75 bg-white/78 p-5 shadow-sm">
                <div className="flex items-center gap-3 text-slate-950">
                  <Sparkles className="size-4 text-sky-700" />
                  <p className="font-semibold">Premium finish</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Gradients, typography, and spacing are tuned to feel sharp
                  without getting heavy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
