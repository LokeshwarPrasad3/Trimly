import { z } from "zod";

import { http, unwrapResponse } from "@/lib/http";
import { createShortLinkRequestSchema } from "@/lib/validations/short-link";

const guestIdentitySchema = z.object({
  id: z.string(),
  token: z.string(),
  status: z.enum(["ACTIVE", "CLAIMED", "EXPIRED"]),
  claimedByUserId: z.string().nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
  linksUsed: z.number(),
  remainingLinks: z.number(),
  freeTierExpired: z.boolean(),
});

const shortLinkSchema = z.object({
  id: z.string(),
  title: z.string().nullable().optional(),
  slug: z.string(),
  originalUrl: z.string().url(),
  status: z.enum(["ACTIVE", "DISABLED", "EXPIRED"]),
  clickCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const createGuestLinkSchema = z.object({
  originalUrl: z.url("Enter a valid URL."),
  slug: z.string().trim().min(3).max(32),
  title: z.string().trim().min(1).max(120).optional(),
});

export type GuestIdentity = z.infer<typeof guestIdentitySchema>;
export type GuestShortLink = z.infer<typeof shortLinkSchema>;
export type CreateGuestLinkInput = z.infer<typeof createGuestLinkSchema>;

export async function createGuestIdentity() {
  const data = await unwrapResponse(http.post("/api/guest-identities"));
  return guestIdentitySchema.parse(data);
}

export async function getGuestIdentity(token: string) {
  const data = await unwrapResponse(http.get(`/api/guest-identities/${token}`));
  return guestIdentitySchema.parse(data);
}

export async function listGuestShortLinks(token: string) {
  const data = await unwrapResponse(http.get(`/api/links?guestToken=${encodeURIComponent(token)}`));
  return z.array(shortLinkSchema).parse(data);
}

export async function createGuestShortLink(token: string, input: CreateGuestLinkInput) {
  const payload = createGuestLinkSchema.parse(input);
  const requestBody = createShortLinkRequestSchema.parse({
    guestToken: token,
    originalUrl: payload.originalUrl,
    slug: payload.slug,
    title: payload.title,
  });

  const data = await unwrapResponse(http.post("/api/links", requestBody));
  return shortLinkSchema.parse(data);
}
