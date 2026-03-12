import { Globe2, Link2, MousePointerClick } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

type ActivityItem = {
  title: string;
  description: string;
  time: string;
};

type ActivityFeedProps = {
  items: ActivityItem[];
  isLoading?: boolean;
};

const activityIcons = [MousePointerClick, Link2, Globe2];

export function ActivityFeed({ items, isLoading = false }: ActivityFeedProps) {
  return (
    <div className="space-y-3 rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">Recent activity</h3>
        <p className="text-sm text-slate-500">Live link updates and click events from your workspace</p>
      </div>
      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-24 rounded-2xl" />)
          : null}
        {!isLoading && items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm leading-6 text-slate-500">
            Activity will appear here after links start receiving updates and clicks.
          </div>
        ) : null}
        {!isLoading
          ? items.map((item, index) => {
              const Icon = activityIcons[index % activityIcons.length];

              return (
                <div key={`${item.title}-${item.time}-${index}`} className="flex gap-3 rounded-2xl bg-sky-50/70 p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white">
                    <Icon className="size-4 text-sky-700" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-sky-700">{item.time}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export type { ActivityItem };
