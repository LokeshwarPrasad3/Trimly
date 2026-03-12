import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/server/auth/constants";
import { AppError } from "@/server/errors/app-error";
import { sessionService } from "@/server/services/session-service";

export async function getCurrentUserFromCookie() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  return sessionService.getUserFromSessionToken(sessionToken);
}

export async function requireCurrentUserFromCookie() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!sessionToken) {
    throw new AppError(401, "UNAUTHORIZED", "You must be logged in to access this resource.");
  }

  return sessionService.requireUserFromSessionToken(sessionToken);
}
