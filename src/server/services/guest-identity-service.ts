import { prisma } from "@/lib/prisma";
import { claimGuestIdentityRequestSchema } from "@/lib/validations/guest-identity";
import { FREE_GUEST_LINK_LIMIT } from "@/features/short-links/constants";
import { AppError } from "@/server/errors/app-error";
import { guestIdentityRepository } from "@/server/repositories/guest-identity-repository";
import { shortLinkRepository } from "@/server/repositories/short-link-repository";
import { userRepository } from "@/server/repositories/user-repository";
import { createGuestToken } from "@/server/utils/crypto";

function serializeGuestIdentity(guestIdentity: Awaited<ReturnType<typeof guestIdentityRepository.findByToken>>) {
  if (!guestIdentity) {
    throw new AppError(404, "GUEST_IDENTITY_NOT_FOUND", "The guest identity was not found.");
  }

  const linksUsed = guestIdentity.shortLinks.length;

  return {
    id: guestIdentity.id,
    token: guestIdentity.token,
    status: guestIdentity.status,
    claimedByUserId: guestIdentity.claimedByUserId,
    expiresAt: guestIdentity.expiresAt,
    createdAt: guestIdentity.createdAt,
    updatedAt: guestIdentity.updatedAt,
    linksUsed,
    remainingLinks: Math.max(FREE_GUEST_LINK_LIMIT - linksUsed, 0),
    freeTierExpired: linksUsed >= FREE_GUEST_LINK_LIMIT,
  };
}

export const guestIdentityService = {
  async createGuestIdentity() {
    const token = createGuestToken();
    await guestIdentityRepository.create({ token });
    const guestIdentity = await guestIdentityRepository.findByToken(token);

    return serializeGuestIdentity(guestIdentity);
  },

  async getGuestIdentityByToken(token: string) {
    const guestIdentity = await guestIdentityRepository.findByToken(token);
    return serializeGuestIdentity(guestIdentity);
  },

  async claimGuestIdentity(token: string, input: { userId: string }) {
    const payload = claimGuestIdentityRequestSchema.parse(input);
    const [guestIdentity, user] = await Promise.all([
      guestIdentityRepository.findByToken(token),
      userRepository.findById(payload.userId),
    ]);

    if (!guestIdentity) {
      throw new AppError(404, "GUEST_IDENTITY_NOT_FOUND", "The guest identity was not found.");
    }

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "The requested user was not found.");
    }

    if (guestIdentity.status === "CLAIMED") {
      throw new AppError(409, "GUEST_IDENTITY_ALREADY_CLAIMED", "This guest identity is already claimed.");
    }

    await prisma.$transaction([
      shortLinkRepository.transferGuestLinksToUser(guestIdentity.id, user.id),
      guestIdentityRepository.updateClaim(guestIdentity.id, user.id),
    ]);

    return guestIdentityService.getGuestIdentityByToken(token);
  },
};
