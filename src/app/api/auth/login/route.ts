import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { loginUserController } from "@/server/controllers/user-controller";
import { AUTH_COOKIE_NAME } from "@/server/auth/constants";
import { apiError } from "@/server/http/responses";
import { sessionService } from "@/server/services/session-service";

export async function POST(request: NextRequest) {
  try {
    const response = await loginUserController(request);
    const body = await response.json();
    const session = await sessionService.createSession(body.data.id);
    const nextResponse = NextResponse.json(body, { status: response.status });

    nextResponse.cookies.set(AUTH_COOKIE_NAME, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: session.expiresAt,
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    return apiError(error);
  }
}
