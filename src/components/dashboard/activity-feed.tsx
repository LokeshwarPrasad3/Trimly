import { activityFeed } from "@/lib/mock-data";

export function ActivityFeed() {
  return (
    <div className="space-y-3 rounded-[1.75rem] border border-white/60 bg-white/75 p-5 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Recent activity</h3>
        <p className="text-sm text-muted-foreground">Mocked system notices and link events</p>
      </div>
      <div className="space-y-3">
        {activityFeed.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex gap-3 rounded-2xl bg-sky-50/70 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-background">
                <Icon className="size-4 text-sky-700" />
              </div>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-sky-700">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

