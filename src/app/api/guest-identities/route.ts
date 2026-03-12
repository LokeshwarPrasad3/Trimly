import { createGuestIdentityController } from "@/server/controllers/guest-identity-controller";
import { apiError } from "@/server/http/responses";

export async function POST() {
  try {
    return await createGuestIdentityController();
  } catch (error) {
    return apiError(error);
  }
}
