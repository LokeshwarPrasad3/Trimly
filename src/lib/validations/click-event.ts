import { z } from "zod";

export const createClickEventRequestSchema = z.object({
  ipHash: z.string().max(255).optional(),
  userAgent: z.string().max(1024).optional(),
  referer: z.string().max(2048).optional(),
  country: z.string().max(120).optional(),
  city: z.string().max(120).optional(),
  deviceType: z.string().max(120).optional(),
  browser: z.string().max(120).optional(),
  os: z.string().max(120).optional(),
  isBot: z.boolean().optional(),
});

export type CreateClickEventRequest = z.infer<
  typeof createClickEventRequestSchema
>;
