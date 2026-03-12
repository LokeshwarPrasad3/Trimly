import { prisma } from "@/lib/prisma";

export const sessionRepository = {
  create(data: { token: string; userId: string; expiresAt: Date }) {
    return prisma.session.create({ data });
  },

  findByToken(token: string) {
    return prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
  },

  deleteByToken(token: string) {
    return prisma.session.deleteMany({ where: { token } });
  },

  deleteExpiredSessions() {
    return prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  },
};
