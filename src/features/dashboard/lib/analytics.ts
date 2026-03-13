import type { ApiClickEvent, ApiShortLink } from "@/lib/api/links";

export function getLinkHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function formatClickEventLabel(event: ApiClickEvent) {
  const place = [event.city, event.country].filter(Boolean).join(", ");

  if (place) {
    return place;
  }

  const ipLabel = event.ipHash ? `IP ${event.ipHash}` : null;
  const agentLabel = [event.browser, event.os].filter(Boolean).join(" on ");
  const deviceLabel = event.deviceType ? `${event.deviceType} device` : null;

  return [ipLabel, agentLabel, deviceLabel].filter(Boolean).join(" | ") || "Direct visit";
}

export function buildDashboardMetrics(links: ApiShortLink[]) {
  const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);
  const activeLinks = links.filter((link) => link.status === "ACTIVE").length;
  const averageClicks = links.length > 0 ? Math.round(totalClicks / links.length) : 0;
  const lastUpdated = links[0]?.updatedAt;

  return [
    { label: "Total clicks", value: totalClicks.toLocaleString(), change: `${links.length} links` },
    { label: "Active links", value: activeLinks.toString(), change: `${links.length - activeLinks} inactive` },
    { label: "Average clicks", value: averageClicks.toLocaleString(), change: "per link" },
    {
      label: "Latest update",
      value: lastUpdated ? new Date(lastUpdated).toLocaleDateString() : "No links",
      change: "workspace",
    },
  ];
}

export function buildTrendData(links: ApiShortLink[]) {
  const bucket = new Map<string, { name: string; clicks: number; links: number }>();

  for (const link of links) {
    const day = new Date(link.createdAt).toLocaleDateString("en-US", { weekday: "short" });
    const current = bucket.get(day) ?? { name: day, clicks: 0, links: 0 };
    current.clicks += link.clickCount;
    current.links += 1;
    bucket.set(day, current);
  }

  return Array.from(bucket.values());
}

export function buildStatusData(links: ApiShortLink[]) {
  const counts = {
    ACTIVE: 0,
    DISABLED: 0,
    EXPIRED: 0,
  };

  for (const link of links) {
    counts[link.status] += 1;
  }

  return [
    { name: "Active", value: counts.ACTIVE, fill: "var(--color-chart-1)" },
    { name: "Disabled", value: counts.DISABLED, fill: "var(--color-chart-3)" },
    { name: "Expired", value: counts.EXPIRED, fill: "var(--color-chart-5)" },
  ].filter((item) => item.value > 0);
}

export function buildActivityFromLinks(links: ApiShortLink[], clickEvents: ApiClickEvent[] = []) {
  const linkItems = links.slice(0, 3).map((link) => ({
    title: `Link updated: ${link.title ?? link.slug}`,
    description: `${link.clickCount.toLocaleString()} clicks on ${getLinkHost(link.originalUrl)}`,
    time: new Date(link.updatedAt).toLocaleDateString(),
  }));

  const clickItems = clickEvents.slice(0, 2).map((event) => ({
    title: "New click recorded",
    description: formatClickEventLabel(event),
    time: new Date(event.clickedAt).toLocaleString(),
  }));

  return [...clickItems, ...linkItems];
}
