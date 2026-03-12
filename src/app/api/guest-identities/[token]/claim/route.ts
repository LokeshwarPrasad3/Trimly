import type { NextRequest } from "next/server";

import { claimGuestIdentityController } from "@/server/controllers/guest-identity-controller";
import { apiError } from "@/server/http/responses";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { token } = await context.params;
    return await claimGuestIdentityController(request, token);
  } catch (error) {
    return apiError(error);
  }
}
