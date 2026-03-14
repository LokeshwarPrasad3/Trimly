export function getAppUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin.replace(/\/$/, "");
  }

  throw new Error("APP_URL or NEXT_PUBLIC_APP_URL is not configured.");
}

export function getShortLinkUrl(slug: string) {
  return `${getAppUrl()}/s/${slug}`;
}
