"use client";

import Link from "next/link";
import { CheckIcon, Copy } from "lucide-react";
import { useState } from "react";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  buildActivityFromLinks,
  formatClickEventLabel,
  getLinkHost,
} from "@/features/dashboard/lib/analytics";
import {
  useAuthenticatedClickEvents,
  useAuthenticatedLink,
} from "@/features/short-links/hooks/use-short-links";
import { getShortLinkUrl } from "@/lib/short-url";

type LinkDetailClientProps = {
  id: string;
};

const statusClassName = {
  ACTIVE: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  DISABLED: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  EXPIRED: "bg-amber-50 text-amber-700 hover:bg-amber-50",
};

export function LinkDetailClient({ id }: LinkDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const {
    data: link,
    isLoading: isLinkLoading,
    error,
  } = useAuthenticatedLink(id);
  const { data: clickEvents = [], isLoading: isEventsLoading } =
    useAuthenticatedClickEvents(id);

  async function handleCopy(shortUrl: string) {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  }

  if (isLinkLoading) {
    return (
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[1.75rem] border-white/60 bg-white/85 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
          </CardContent>
        </Card>
        <ActivityFeed items={[]} isLoading />
      </div>
    );
  }

  if (!link || error) {
    return (
      <Card className="rounded-[1.75rem] border-white/60 bg-white/85 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-semibold text-slate-950">
            Link not found
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            This link could not be loaded from the authenticated API, or it does
            not belong to the current user.
          </p>
          <Link
            href="/dashboard/links"
            className="text-sm font-medium text-sky-700 hover:underline"
          >
            Back to links
          </Link>
        </CardContent>
      </Card>
    );
  }

  const activityItems = buildActivityFromLinks([link], clickEvents);
  const shortUrl = getShortLinkUrl(link.slug);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Card className="rounded-[1.75rem] border-white/60 bg-white/85 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
                Link detail
              </p>
              <CardTitle className="mt-3 text-3xl text-slate-950">
                {link.title ?? link.slug}
              </CardTitle>
            </div>
            <Badge className={statusClassName[link.status]}>
              {link.status.toLowerCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <div className="rounded-2xl bg-slate-50/80 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-slate-500">Short URL</p>
                <p className="mt-2 font-semibold break-all text-slate-950">
                  {shortUrl}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => handleCopy(shortUrl)}
              >
                {copied ? (
                  <CheckIcon className="size-4 text-emerald-600" />
                ) : (
                  <Copy className="size-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50/80 p-5">
            <p className="text-slate-500">Destination</p>
            <p className="mt-2 font-semibold break-all text-slate-950">
              {link.originalUrl}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Host: {getLinkHost(link.originalUrl)}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50/80 p-5">
              <p className="text-slate-500">Clicks</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {link.clickCount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/80 p-5">
              <p className="text-slate-500">Last click</p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                {link.lastClickedAt
                  ? new Date(link.lastClickedAt).toLocaleString()
                  : "No clicks yet"}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/80 p-5">
              <p className="text-slate-500">Updated</p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                {new Date(link.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Recent click events
            </h2>
            <div className="mt-4 space-y-3">
              {isEventsLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-14 rounded-2xl" />
                ))
              ) : clickEvents.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No click events have been recorded for this link yet.
                </p>
              ) : (
                clickEvents.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl bg-slate-50/80 px-4 py-3"
                  >
                    <p className="font-medium text-slate-950">
                      {formatClickEventLabel(event)}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {new Date(event.clickedAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <ActivityFeed items={activityItems} isLoading={isEventsLoading} />
    </div>
  );
}
