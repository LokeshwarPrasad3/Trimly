import type { NextRequest } from "next/server";
import { z } from "zod";

import {
  createShortLinkRequestSchema,
  listShortLinksQuerySchema,
  updateShortLinkRequestSchema,
} from "@/lib/validations/short-link";
import { getCurrentUserFromCookie, requireCurrentUserFromCookie } from "@/server/auth/session";
import { parseJsonBody } from "@/server/http/requests";
import { apiSuccess } from "@/server/http/responses";
import { shortLinkService } from "@/server/services/short-link-service";

export async function listShortLinksController(request: NextRequest) {
  const currentUser = await getCurrentUserFromCookie();

  if (currentUser) {
    const shortLinks = await shortLinkService.listAuthenticatedShortLinks(currentUser.id);
    return apiSuccess(shortLinks);
  }

  const query = listShortLinksQuerySchema.parse({
    guestToken: request.nextUrl.searchParams.get("guestToken") ?? undefined,
  });

  const shortLinks = await shortLinkService.listShortLinks(query);
  return apiSuccess(shortLinks);
}

export async function createShortLinkController(request: NextRequest) {
  const rawBody = await request.json();
  const currentUser = await getCurrentUserFromCookie();
  const payload = createShortLinkRequestSchema.parse(
    currentUser
      ? {
          ...rawBody,
          userId: currentUser.id,
          guestToken: undefined,
        }
      : rawBody
  );

  const shortLink = await shortLinkService.createShortLink(payload);
  return apiSuccess(shortLink, { status: 201 });
}

export async function getShortLinkController(id: string) {
  const currentUser = await requireCurrentUserFromCookie();
  const shortLink = await shortLinkService.getAuthenticatedShortLinkById(z.string().cuid().parse(id), currentUser.id);
  return apiSuccess(shortLink);
}

export async function getShortLinkBySlugController(slug: string) {
  const shortLink = await shortLinkService.getShortLinkBySlug(z.string().min(3).parse(slug));
  return apiSuccess(shortLink);
}

export async function updateShortLinkController(request: NextRequest, id: string) {
  const currentUser = await requireCurrentUserFromCookie();
  const payload = await parseJsonBody(request, updateShortLinkRequestSchema);
  const shortLink = await shortLinkService.updateAuthenticatedShortLink(id, currentUser.id, payload);
  return apiSuccess(shortLink);
}

export async function deleteShortLinkController(id: string) {
  const currentUser = await requireCurrentUserFromCookie();
  const result = await shortLinkService.deleteAuthenticatedShortLink(z.string().cuid().parse(id), currentUser.id);
  return apiSuccess(result);
}
