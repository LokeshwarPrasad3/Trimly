import { getUserController } from "@/server/controllers/user-controller";
import { apiError } from "@/server/http/responses";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    return await getUserController(id);
  } catch (error) {
    return apiError(error);
  }
}
