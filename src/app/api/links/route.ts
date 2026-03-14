import type { NextRequest } from "next/server";

import {
  createShortLinkController,
  listShortLinksController,
} from "@/server/controllers/short-link-controller";
import { apiError } from "@/server/http/responses";

export async function GET(request: NextRequest) {
  try {
    return await listShortLinksController(request);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return await createShortLinkController(request);
  } catch (error) {
    return apiError(error);
  }
}
