import type { NextRequest } from "next/server";
import { z } from "zod";

import { createClickEventRequestSchema } from "@/lib/validations/click-event";
import { requireCurrentUserFromCookie } from "@/server/auth/session";
import { parseJsonBody } from "@/server/http/requests";
import { apiSuccess } from "@/server/http/responses";
import { clickEventService } from "@/server/services/click-event-service";

export async function listClickEventsController(shortLinkId: string) {
  const currentUser = await requireCurrentUserFromCookie();
  const clickEvents = await clickEventService.listClickEvents(
    z.string().cuid().parse(shortLinkId),
    currentUser.id
  );
  return apiSuccess(clickEvents);
}

export async function createClickEventController(
  request: NextRequest,
  shortLinkId: string
) {
  const payload = await parseJsonBody(request, createClickEventRequestSchema);
  const clickEvent = await clickEventService.createClickEvent(
    shortLinkId,
    payload
  );
  return apiSuccess(clickEvent, { status: 201 });
}
