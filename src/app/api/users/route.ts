import type { NextRequest } from "next/server";

import { createUserController } from "@/server/controllers/user-controller";
import { apiError } from "@/server/http/responses";

export async function POST(request: NextRequest) {
  try {
    return await createUserController(request);
  } catch (error) {
    return apiError(error);
  }
}
