import Link from "next/link";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { PerformanceChart, SourceChart } from "@/components/dashboard/charts";
import { LinksTable } from "@/components/dashboard/links-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { dashboardMetrics, quickActions } from "@/lib/mock-data";
import { linkButtonClass } from "@/lib/ui";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,_rgba(14,165,233,0.12),_rgba(255,255,255,0.9)_45%,_rgba(6,182,212,0.12))] p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Dashboard</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">Modern analytics for logged-in users, without the clutter.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Once a user logs in, the product opens a cleaner workspace with analytics, link history, and profile controls.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href} className={linkButtonClass(action.href === "/dashboard/create" ? "primary" : "secondary")}>
                  <Icon className="size-4" />
                  {action.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="grid gap-4 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PerformanceChart />
        <SourceChart />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Recent links</h2>
              <p className="text-sm text-slate-500">Simple link management inside the logged-in workspace</p>
            </div>
            <Link href="/dashboard/links" className="text-sm font-medium text-sky-700 hover:underline">View all</Link>
          </div>
          <LinksTable />
        </div>
        <ActivityFeed />
      </section>
    </div>
  );
}
