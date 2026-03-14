import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/server/auth/constants";
import { sessionService } from "@/server/services/session-service";
import { apiError } from "@/server/http/responses";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (sessionToken) {
      await sessionService.deleteSession(sessionToken);
    }

    const response = NextResponse.json({
      success: true,
      data: { loggedOut: true },
    });
    response.cookies.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    return apiError(error);
  }
}
