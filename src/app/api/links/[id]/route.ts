import type { NextRequest } from "next/server";

import {
  deleteShortLinkController,
  getShortLinkController,
  updateShortLinkController,
} from "@/server/controllers/short-link-controller";
import { apiError } from "@/server/http/responses";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    return await getShortLinkController(id);
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    return await updateShortLinkController(request, id);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    return await deleteShortLinkController(id);
  } catch (error) {
    return apiError(error);
  }
}
