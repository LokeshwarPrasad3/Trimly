import type { NextRequest } from "next/server";
import { z } from "zod";

import {
  createShortLinkRequestSchema,
  listShortLinksQuerySchema,
  updateShortLinkRequestSchema,
} from "@/lib/validations/short-link";
import { parseJsonBody } from "@/server/http/requests";
import { apiSuccess } from "@/server/http/responses";
import { shortLinkService } from "@/server/services/short-link-service";

export async function listShortLinksController(request: NextRequest) {
  const query = listShortLinksQuerySchema.parse({
    userId: request.nextUrl.searchParams.get("userId") ?? undefined,
    guestToken: request.nextUrl.searchParams.get("guestToken") ?? undefined,
  });

  const shortLinks = await shortLinkService.listShortLinks(query);
  return apiSuccess(shortLinks);
}

export async function createShortLinkController(request: NextRequest) {
  const payload = await parseJsonBody(request, createShortLinkRequestSchema);
  const shortLink = await shortLinkService.createShortLink(payload);
  return apiSuccess(shortLink, { status: 201 });
}

export async function getShortLinkController(id: string) {
  const shortLink = await shortLinkService.getShortLinkById(z.string().cuid().parse(id));
  return apiSuccess(shortLink);
}

export async function getShortLinkBySlugController(slug: string) {
  const shortLink = await shortLinkService.getShortLinkBySlug(z.string().min(3).parse(slug));
  return apiSuccess(shortLink);
}

export async function updateShortLinkController(request: NextRequest, id: string) {
  const payload = await parseJsonBody(request, updateShortLinkRequestSchema);
  const shortLink = await shortLinkService.updateShortLink(id, payload);
  return apiSuccess(shortLink);
}

export async function deleteShortLinkController(id: string) {
  const result = await shortLinkService.deleteShortLink(z.string().cuid().parse(id));
  return apiSuccess(result);
}
