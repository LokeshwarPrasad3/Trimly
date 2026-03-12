import type { NextRequest } from "next/server";

import {
  createClickEventController,
  listClickEventsController,
} from "@/server/controllers/click-event-controller";
import { apiError } from "@/server/http/responses";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    return await listClickEventsController(id);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    return await createClickEventController(request, id);
  } catch (error) {
    return apiError(error);
  }
}
