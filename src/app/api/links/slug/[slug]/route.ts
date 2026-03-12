import { getShortLinkBySlugController } from "@/server/controllers/short-link-controller";
import { apiError } from "@/server/http/responses";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    return await getShortLinkBySlugController(slug);
  } catch (error) {
    return apiError(error);
  }
}
