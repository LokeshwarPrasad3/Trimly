import { prisma } from "@/lib/prisma";

export const userRepository = {
  create(data: { email: string; name?: string; passwordHash: string }) {
    return prisma.user.create({ data });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
};
