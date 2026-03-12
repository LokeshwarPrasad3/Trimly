import { z } from "zod";

export const createShortLinkSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters.")
    .max(32, "Slug must be at most 32 characters.")
    .regex(/^[a-zA-Z0-9-_]+$/, "Slug can only contain letters, numbers, hyphens, and underscores."),
  originalUrl: z.url("Enter a valid destination URL."),
});

export const createShortLinkRequestSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    slug: createShortLinkSchema.shape.slug,
    originalUrl: createShortLinkSchema.shape.originalUrl,
    userId: z.string().cuid().optional(),
    guestToken: z.string().min(12).optional(),
    expiresAt: z.coerce.date().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.userId && !value.guestToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either userId or guestToken is required.",
        path: ["userId"],
      });
    }

    if (value.userId && value.guestToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either userId or guestToken, not both.",
        path: ["guestToken"],
      });
    }
  });

export const updateShortLinkRequestSchema = z
  .object({
    title: z.string().trim().min(1).max(120).nullable().optional(),
    slug: createShortLinkSchema.shape.slug.optional(),
    originalUrl: createShortLinkSchema.shape.originalUrl.optional(),
    status: z.enum(["ACTIVE", "DISABLED", "EXPIRED"]).optional(),
    expiresAt: z.coerce.date().nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided.",
  });

export const listShortLinksQuerySchema = z
  .object({
    userId: z.string().cuid().optional(),
    guestToken: z.string().min(12).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.userId && !value.guestToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either userId or guestToken is required.",
        path: ["userId"],
      });
    }

    if (value.userId && value.guestToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either userId or guestToken, not both.",
        path: ["guestToken"],
      });
    }
  });

export type CreateShortLinkInput = z.infer<typeof createShortLinkSchema>;
export type CreateShortLinkRequest = z.infer<typeof createShortLinkRequestSchema>;
export type UpdateShortLinkRequest = z.infer<typeof updateShortLinkRequestSchema>;
export type ListShortLinksQuery = z.infer<typeof listShortLinksQuerySchema>;
