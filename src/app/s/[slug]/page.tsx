import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AppError } from "@/server/errors/app-error";
import { clickEventService } from "@/server/services/click-event-service";
import { shortLinkService } from "@/server/services/short-link-service";

type ShortLinkPageProps = {
  params: Promise<{ slug: string }>;
};

function getDeviceType(userAgent: string | null) {
  if (!userAgent) {
    return undefined;
  }

  const value = userAgent.toLowerCase();

  if (/mobile|android|iphone/.test(value)) {
    return "mobile";
  }

  if (/ipad|tablet/.test(value)) {
    return "tablet";
  }

  return "desktop";
}

function getBrowser(userAgent: string | null) {
  if (!userAgent) {
    return undefined;
  }

  const value = userAgent.toLowerCase();

  if (value.includes("edg/")) {
    return "Edge";
  }

  if (value.includes("chrome/")) {
    return "Chrome";
  }

  if (value.includes("firefox/")) {
    return "Firefox";
  }

  if (value.includes("safari/") && !value.includes("chrome/")) {
    return "Safari";
  }

  return "Unknown";
}

function getOs(userAgent: string | null) {
  if (!userAgent) {
    return undefined;
  }

  const value = userAgent.toLowerCase();

  if (value.includes("windows")) {
    return "Windows";
  }

  if (value.includes("mac os") || value.includes("macintosh")) {
    return "macOS";
  }

  if (value.includes("android")) {
    return "Android";
  }

  if (value.includes("iphone") || value.includes("ipad") || value.includes("ios")) {
    return "iOS";
  }

  if (value.includes("linux")) {
    return "Linux";
  }

  return "Unknown";
}

function getClientIp(headerStore: Headers) {
  const forwardedFor = headerStore.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  const realIp = headerStore.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  const cfIp = headerStore.get("cf-connecting-ip");
  if (cfIp) {
    return cfIp.trim();
  }

  const forwarded = headerStore.get("forwarded");
  if (!forwarded) {
    return undefined;
  }

  const match = forwarded.match(/for=(?:"?\[?)([^;\],"]+)/i);
  return match?.[1];
}

export default async function ShortLinkPage({ params }: ShortLinkPageProps) {
  const { slug } = await params;

  let shortLink;

  try {
    shortLink = await shortLinkService.getShortLinkBySlug(slug);
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 404) {
      notFound();
    }

    throw error;
  }

  if (shortLink.status !== "ACTIVE") {
    notFound();
  }

  if (shortLink.expiresAt && new Date(shortLink.expiresAt) <= new Date()) {
    notFound();
  }

  try {
    const headerStore = await headers();
    const userAgent = headerStore.get("user-agent");
    const referer = headerStore.get("referer");
    const ipHash = getClientIp(headerStore);

    await clickEventService.createClickEvent(shortLink.id, {
      ipHash,
      userAgent: userAgent ?? undefined,
      referer: referer ?? undefined,
      deviceType: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      os: getOs(userAgent),
      isBot: false,
    });
  } catch (error) {
    console.error("Failed to record click event", error);
  }

  redirect(shortLink.originalUrl);
}
