import { getGuestIdentityController } from "@/server/controllers/guest-identity-controller";
import { apiError } from "@/server/http/responses";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { token } = await context.params;
    return await getGuestIdentityController(token);
  } catch (error) {
    return apiError(error);
  }
}
