"use client";

import Link from "next/link";
import { BarChart3, Plus, ScanSearch } from "lucide-react";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { PerformanceChart, SourceChart } from "@/components/dashboard/charts";
import { LinksTable } from "@/components/dashboard/links-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { useAuthenticatedLinks } from "@/features/short-links/hooks/use-short-links";
import { buildActivityFromLinks, buildDashboardMetrics, buildStatusData, buildTrendData } from "@/features/dashboard/lib/analytics";

export function DashboardOverviewClient() {
  const { data: links = [], isLoading } = useAuthenticatedLinks();
  const metrics = buildDashboardMetrics(links);
  const trendData = buildTrendData(links);
  const statusData = buildStatusData(links);
  const activityItems = buildActivityFromLinks(links);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,_rgba(14,165,233,0.18),_rgba(255,255,255,0.92)_42%,_rgba(34,211,238,0.18))] p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Dashboard</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">Your links, clicks, and recent activity in one clean workspace.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              The dashboard now reads from live authenticated APIs, so the overview reflects the signed-in user instead of mocked data.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/dashboard/create" />}>
              <Plus className="size-4" />
              Create link
            </Button>
            <Button variant="outline" render={<Link href="/dashboard/links" />}>
              <ScanSearch className="size-4" />
              View links
            </Button>
            <Button variant="outline" render={<Link href="/dashboard/analytics" />}>
              <BarChart3 className="size-4" />
              Open analytics
            </Button>
          </div>
        </div>
      </section>
      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PerformanceChart data={trendData} isLoading={isLoading} />
        <SourceChart data={statusData} isLoading={isLoading} />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Recent links</h2>
              <p className="text-sm text-slate-500">Latest authenticated links from your workspace</p>
            </div>
            <Link href="/dashboard/links" className="text-sm font-medium text-sky-700 hover:underline">
              View all
            </Link>
          </div>
          <LinksTable links={links.slice(0, 5)} isLoading={isLoading} />
        </div>
        <ActivityFeed items={activityItems} isLoading={isLoading} />
      </section>
    </div>
  );
}
