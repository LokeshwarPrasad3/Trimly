import { prisma } from "@/lib/prisma";

export const guestIdentityRepository = {
  create(data: { token: string; expiresAt?: Date }) {
    return prisma.guestIdentity.create({ data });
  },

  findByToken(token: string) {
    return prisma.guestIdentity.findUnique({
      where: { token },
      include: { shortLinks: true, claimedByUser: true },
    });
  },

  updateClaim(id: string, userId: string) {
    return prisma.guestIdentity.update({
      where: { id },
      data: {
        status: "CLAIMED",
        claimedByUserId: userId,
      },
    });
  },
};
