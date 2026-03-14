import { AppError } from "@/server/errors/app-error";
import { sessionRepository } from "@/server/repositories/session-repository";
import { createSessionToken } from "@/server/utils/crypto";
import { AUTH_SESSION_TTL_DAYS } from "@/server/auth/constants";

export const sessionService = {
  async createSession(userId: string) {
    const token = createSessionToken();
    const expiresAt = new Date(
      Date.now() + AUTH_SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
    );

    const session = await sessionRepository.create({
      token,
      userId,
      expiresAt,
    });

    return {
      token: session.token,
      expiresAt: session.expiresAt,
    };
  },

  async getUserFromSessionToken(token: string) {
    const session = await sessionRepository.findByToken(token);

    if (!session) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      await sessionRepository.deleteByToken(token);
      return null;
    }

    return session.user;
  },

  async requireUserFromSessionToken(token: string) {
    const user = await sessionService.getUserFromSessionToken(token);

    if (!user) {
      throw new AppError(
        401,
        "UNAUTHORIZED",
        "You must be logged in to access this resource."
      );
    }

    return user;
  },

  async deleteSession(token: string) {
    await sessionRepository.deleteByToken(token);
    return { success: true };
  },
};
