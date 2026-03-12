import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { PerformanceChart, SourceChart } from "@/components/dashboard/charts";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-border/60 bg-background p-6 shadow-sm lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Analytics</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">A cleaner analytics layer for v1 review.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          This route focuses on the chart rhythm, card density, and summary hierarchy before real data plumbing starts.
        </p>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PerformanceChart />
        <SourceChart />
      </section>
      <ActivityFeed />
    </div>
  );
}
