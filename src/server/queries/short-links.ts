import { shortLinkService } from "@/server/services/short-link-service";

export async function getShortLinkBySlugQuery(slug: string) {
  return shortLinkService.getShortLinkBySlug(slug);
}
