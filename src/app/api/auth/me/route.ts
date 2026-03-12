import { NextResponse } from "next/server";

import { getCurrentUserFromCookie } from "@/server/auth/session";
import { apiError } from "@/server/http/responses";
import { userService } from "@/server/services/user-service";

export async function GET() {
  try {
    const user = await getCurrentUserFromCookie();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "You must be logged in.",
          },
        },
        { status: 401 }
      );
    }

    const publicUser = await userService.getUserById(user.id);
    return NextResponse.json({ success: true, data: publicUser });
  } catch (error) {
    return apiError(error);
  }
}
