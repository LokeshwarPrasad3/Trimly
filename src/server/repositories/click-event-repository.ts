import { prisma } from "@/lib/prisma";

export const clickEventRepository = {
  create(data: {
    shortLinkId: string;
    ipHash?: string;
    userAgent?: string;
    referer?: string;
    country?: string;
    city?: string;
    deviceType?: string;
    browser?: string;
    os?: string;
    isBot?: boolean;
  }) {
    return prisma.clickEvent.create({ data });
  },

  listByShortLinkId(shortLinkId: string) {
    return prisma.clickEvent.findMany({
      where: { shortLinkId },
      orderBy: { clickedAt: "desc" },
      take: 100,
    });
  },
};
