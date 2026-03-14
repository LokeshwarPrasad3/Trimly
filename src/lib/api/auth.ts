import { z } from "zod";

import { http, unwrapResponse } from "@/lib/http";
import {
  createUserRequestSchema,
  loginUserRequestSchema,
  publicUserSchema,
  type CreateUserRequest,
  type LoginUserRequest,
} from "@/lib/validations/user";

export type AuthUser = z.infer<typeof publicUserSchema>;

export async function signupUser(input: CreateUserRequest) {
  const payload = createUserRequestSchema.parse(input);
  const data = await unwrapResponse(http.post("/api/users", payload));
  return publicUserSchema.parse(data);
}

export async function loginUser(input: LoginUserRequest) {
  const payload = loginUserRequestSchema.parse(input);
  const data = await unwrapResponse(http.post("/api/auth/login", payload));
  return publicUserSchema.parse(data);
}

export async function getCurrentUser() {
  const data = await unwrapResponse(http.get("/api/auth/me"));
  return publicUserSchema.parse(data);
}

export async function logoutUser() {
  return unwrapResponse(http.post("/api/auth/logout"));
}

export async function claimGuestLinks(guestToken: string, userId: string) {
  const data = await unwrapResponse(
    http.post(`/api/guest-identities/${guestToken}/claim`, { userId })
  );
  return data;
}
