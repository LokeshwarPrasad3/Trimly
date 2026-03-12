import type { NextRequest } from "next/server";
import { z } from "zod";

import { createClickEventRequestSchema } from "@/lib/validations/click-event";
import { parseJsonBody } from "@/server/http/requests";
import { apiSuccess } from "@/server/http/responses";
import { clickEventService } from "@/server/services/click-event-service";

export async function listClickEventsController(shortLinkId: string) {
  const clickEvents = await clickEventService.listClickEvents(z.string().cuid().parse(shortLinkId));
  return apiSuccess(clickEvents);
}

export async function createClickEventController(request: NextRequest, shortLinkId: string) {
  const payload = await parseJsonBody(request, createClickEventRequestSchema);
  const clickEvent = await clickEventService.createClickEvent(shortLinkId, payload);
  return apiSuccess(clickEvent, { status: 201 });
}
