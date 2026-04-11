import { z } from "zod";

import { http, unwrapResponse } from "@/lib/http";

export const shortLinkApiSchema = z.object({
  id: z.string().cuid(),
  title: z.string().nullable().optional(),
  slug: z.string(),
  originalUrl: z.string().url(),
  status: z.enum(["ACTIVE", "DISABLED", "EXPIRED"]),
  clickCount: z.number(),
  lastClickedAt: z.string().datetime().nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string().nullable().optional(),
  guestIdentityId: z.string().nullable().optional(),
});

export const clickEventApiSchema = z.object({
  id: z.string().cuid(),
  shortLinkId: z.string().cuid(),
  clickedAt: z.string().datetime(),
  ipHash: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  referer: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  deviceType: z.string().nullable().optional(),
  browser: z.string().nullable().optional(),
  os: z.string().nullable().optional(),
  isBot: z.boolean(),
});

export const createAuthenticatedLinkSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  slug: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(
      z
        .string()
        .min(3, "Alias must be at least 3 characters.")
        .max(32, "Alias must be at most 32 characters.")
        .regex(
          /^[a-zA-Z0-9-_]+$/,
          "Only letters, numbers, hyphens, and underscores allowed."
        )
        .optional()
    )
    .optional(),
  originalUrl: z.url("Enter a valid destination URL."),
});

export type ApiShortLink = z.infer<typeof shortLinkApiSchema>;
export type ApiClickEvent = z.infer<typeof clickEventApiSchema>;
export type CreateAuthenticatedLinkInput = z.infer<
  typeof createAuthenticatedLinkSchema
>;

export async function listAuthenticatedLinks() {
  const data = await unwrapResponse(http.get("/api/links"));
  return z.array(shortLinkApiSchema).parse(data);
}

export async function getAuthenticatedLink(id: string) {
  const data = await unwrapResponse(http.get(`/api/links/${id}`));
  return shortLinkApiSchema.parse(data);
}

export async function createAuthenticatedLink(
  input: CreateAuthenticatedLinkInput
) {
  const payload = createAuthenticatedLinkSchema.parse(input);
  const data = await unwrapResponse(http.post("/api/links", payload));
  return shortLinkApiSchema.parse(data);
}

export async function listAuthenticatedClickEvents(id: string) {
  const data = await unwrapResponse(http.get(`/api/links/${id}/click-events`));
  return z.array(clickEventApiSchema).parse(data);
}
