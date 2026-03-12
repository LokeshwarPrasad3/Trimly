import { z } from "zod";

export const createUserRequestSchema = z.object({
  email: z.email("Enter a valid email address.").toLowerCase(),
  name: z.string().trim().min(1).max(80).optional(),
  password: z.string().min(8, "Use at least 8 characters."),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
