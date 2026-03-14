import { z } from "zod";

export const claimGuestIdentityRequestSchema = z.object({
  userId: z.string().cuid(),
});

export type ClaimGuestIdentityRequest = z.infer<
  typeof claimGuestIdentityRequestSchema
>;
