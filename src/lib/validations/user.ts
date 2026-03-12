import { z } from "zod";

export const createUserRequestSchema = z.object({
  email: z.email("Enter a valid email address.").toLowerCase(),
  name: z.string().trim().min(1).max(80).optional(),
  password: z.string().min(8, "Use at least 8 characters."),
});

export const loginUserRequestSchema = z.object({
  email: z.email("Enter a valid email address.").toLowerCase(),
  password: z.string().min(8, "Use at least 8 characters."),
});

export const publicUserSchema = z.object({
  id: z.string().cuid(),
  email: z.email(),
  name: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
