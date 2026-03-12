import type { NextRequest } from "next/server";
import { z } from "zod";

import { createUserRequestSchema } from "@/lib/validations/user";
import { parseJsonBody } from "@/server/http/requests";
import { apiSuccess } from "@/server/http/responses";
import { userService } from "@/server/services/user-service";

export async function createUserController(request: NextRequest) {
  const payload = await parseJsonBody(request, createUserRequestSchema);
  const user = await userService.createUser(payload);

  return apiSuccess(user, { status: 201 });
}

export async function getUserController(id: string) {
  const user = await userService.getUserById(z.string().cuid().parse(id));
  return apiSuccess(user);
}
