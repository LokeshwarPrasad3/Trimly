"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { PerformanceChart, SourceChart } from "@/components/dashboard/charts";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { useAuthenticatedClickEvents, useAuthenticatedLinks } from "@/features/short-links/hooks/use-short-links";
import { buildActivityFromLinks, buildDashboardMetrics, buildStatusData, buildTrendData } from "@/features/dashboard/lib/analytics";

export function AnalyticsPageClient() {
  const { data: links = [], isLoading: isLinksLoading } = useAuthenticatedLinks();
  const mostActiveLink = [...links].sort((first, second) => second.clickCount - first.clickCount)[0];
  const { data: clickEvents = [], isLoading: isEventsLoading } = useAuthenticatedClickEvents(mostActiveLink?.id ?? "");

  const metrics = buildDashboardMetrics(links);
  const trendData = buildTrendData(links);
  const statusData = buildStatusData(links);
  const activityItems = buildActivityFromLinks(links, clickEvents);
  const isLoading = isLinksLoading || (Boolean(mostActiveLink) && isEventsLoading);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,_rgba(56,189,248,0.18),_rgba(255,255,255,0.94)_44%,_rgba(14,165,233,0.14))] p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)] lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Analytics</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Live workspace analytics for authenticated users.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              This page now reads your real links and click events instead of mocked chart data.
            </p>
          </div>
          <Button variant="outline" render={<Link href="/dashboard/links" />}>
            Review links
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PerformanceChart data={trendData} isLoading={isLoading} title="Clicks by creation day" />
        <SourceChart data={statusData} isLoading={isLinksLoading} title="Current link status" />
      </section>
      <ActivityFeed items={activityItems} isLoading={isLoading} />
    </div>
  );
}
