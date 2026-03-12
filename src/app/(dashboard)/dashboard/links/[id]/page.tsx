import { notFound } from "next/navigation";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shortLinks } from "@/lib/mock-data";

type LinkDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LinkDetailPage({ params }: LinkDetailPageProps) {
  const { id } = await params;
  const link = shortLinks.find((item) => item.id === id);

  if (!link) {
    notFound();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Card className="rounded-[1.75rem] border-border/70 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Link detail</p>
              <CardTitle className="mt-3 text-3xl">{link.title}</CardTitle>
            </div>
            <Badge className="bg-sky-50 text-sky-700 hover:bg-sky-50">{link.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <div className="rounded-2xl bg-muted/50 p-5">
            <p className="text-muted-foreground">Short URL</p>
            <p className="mt-2 font-semibold text-foreground">blink.new/{link.slug}</p>
          </div>
          <div className="rounded-2xl bg-muted/50 p-5">
            <p className="text-muted-foreground">Destination</p>
            <p className="mt-2 font-semibold text-foreground">{link.destination}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-muted/50 p-5">
              <p className="text-muted-foreground">Clicks</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{link.clicks.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-5">
              <p className="text-muted-foreground">Source</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{link.source}</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-5">
              <p className="text-muted-foreground">Updated</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{link.updatedAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <ActivityFeed />
    </div>
  );
}
