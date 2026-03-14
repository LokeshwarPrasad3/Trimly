import type { NextRequest } from "next/server";
import { z } from "zod";

import { claimGuestIdentityRequestSchema } from "@/lib/validations/guest-identity";
import { parseJsonBody } from "@/server/http/requests";
import { apiSuccess } from "@/server/http/responses";
import { guestIdentityService } from "@/server/services/guest-identity-service";

export async function createGuestIdentityController() {
  const guestIdentity = await guestIdentityService.createGuestIdentity();
  return apiSuccess(guestIdentity, { status: 201 });
}

export async function getGuestIdentityController(token: string) {
  const guestIdentity = await guestIdentityService.getGuestIdentityByToken(
    z.string().min(12).parse(token)
  );
  return apiSuccess(guestIdentity);
}

export async function claimGuestIdentityController(
  request: NextRequest,
  token: string
) {
  const payload = await parseJsonBody(request, claimGuestIdentityRequestSchema);
  const guestIdentity = await guestIdentityService.claimGuestIdentity(
    token,
    payload
  );
  return apiSuccess(guestIdentity);
}
