export function createSlugFromUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "").split(".")[0] ?? "link";
    const pathPart = parsedUrl.pathname
      .split("/")
      .filter(Boolean)
      .join("-")
      .slice(0, 12);
    const random = Math.random().toString(36).slice(2, 6);
    const base = [host, pathPart].filter(Boolean).join("-").toLowerCase();

    return `${base || "link"}-${random}`.replace(/[^a-z0-9-_]/g, "").slice(0, 32);
  } catch {
    return `link-${Math.random().toString(36).slice(2, 8)}`;
  }
}
