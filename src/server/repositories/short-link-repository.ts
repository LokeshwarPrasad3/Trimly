import { prisma } from "@/lib/prisma";

export const shortLinkRepository = {
  create(data: {
    title?: string;
    slug: string;
    originalUrl: string;
    userId?: string;
    guestIdentityId?: string;
    expiresAt?: Date;
  }) {
    return prisma.shortLink.create({ data });
  },

  findById(id: string) {
    return prisma.shortLink.findUnique({
      where: { id },
      include: {
        user: true,
        guestIdentity: true,
        clickEvents: {
          take: 20,
          orderBy: { clickedAt: "desc" },
        },
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.shortLink.findUnique({ where: { slug } });
  },

  listByUserId(userId: string) {
    return prisma.shortLink.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  listByGuestIdentityId(guestIdentityId: string) {
    return prisma.shortLink.findMany({
      where: { guestIdentityId },
      orderBy: { createdAt: "desc" },
    });
  },

  countByGuestIdentityId(guestIdentityId: string) {
    return prisma.shortLink.count({ where: { guestIdentityId } });
  },

  update(id: string, data: {
    title?: string | null;
    slug?: string;
    originalUrl?: string;
    status?: "ACTIVE" | "DISABLED" | "EXPIRED";
    expiresAt?: Date | null;
  }) {
    return prisma.shortLink.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.shortLink.delete({ where: { id } });
  },

  transferGuestLinksToUser(guestIdentityId: string, userId: string) {
    return prisma.shortLink.updateMany({
      where: { guestIdentityId },
      data: {
        userId,
        guestIdentityId: null,
      },
    });
  },

  incrementClickCount(shortLinkId: string, clickedAt: Date) {
    return prisma.shortLink.update({
      where: { id: shortLinkId },
      data: {
        clickCount: { increment: 1 },
        lastClickedAt: clickedAt,
      },
    });
  },
};
