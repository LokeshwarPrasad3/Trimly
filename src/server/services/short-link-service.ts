import {
  createShortLinkRequestSchema,
  listShortLinksQuerySchema,
  updateShortLinkRequestSchema,
  type CreateShortLinkRequest,
  type ListShortLinksQuery,
  type UpdateShortLinkRequest,
} from "@/lib/validations/short-link";
import { FREE_GUEST_LINK_LIMIT } from "@/features/short-links/constants";
import { AppError } from "@/server/errors/app-error";
import { guestIdentityRepository } from "@/server/repositories/guest-identity-repository";
import { shortLinkRepository } from "@/server/repositories/short-link-repository";
import { userRepository } from "@/server/repositories/user-repository";
import { generateSlug, normalizeSlug } from "@/server/utils/slug";

export const shortLinkService = {
  async listShortLinks(query: ListShortLinksQuery) {
    const payload = listShortLinksQuerySchema.parse(query);

    if (payload.userId) {
      const user = await userRepository.findById(payload.userId);
      if (!user) {
        throw new AppError(
          404,
          "USER_NOT_FOUND",
          "The requested user was not found."
        );
      }

      return shortLinkRepository.listByUserId(payload.userId);
    }

    const guestIdentity = await guestIdentityRepository.findByToken(
      payload.guestToken!
    );
    if (!guestIdentity) {
      throw new AppError(
        404,
        "GUEST_IDENTITY_NOT_FOUND",
        "The guest identity was not found."
      );
    }

    return shortLinkRepository.listByGuestIdentityId(guestIdentity.id);
  },

  async listAuthenticatedShortLinks(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError(
        404,
        "USER_NOT_FOUND",
        "The requested user was not found."
      );
    }

    return shortLinkRepository.listByUserId(userId);
  },

  async createShortLink(input: CreateShortLinkRequest) {
    const payload = createShortLinkRequestSchema.parse(input);

    let slug: string;
    if (payload.slug) {
      slug = normalizeSlug(payload.slug);
      const existingLink = await shortLinkRepository.findBySlug(slug);
      if (existingLink) {
        throw new AppError(
          409,
          "SLUG_ALREADY_IN_USE",
          "That short link slug is already in use."
        );
      }
    } else {
      // Auto-generate a unique 7-char base62 slug with collision retry
      let candidate: string;
      let attempts = 0;
      do {
        candidate = generateSlug();
        attempts++;
        if (attempts > 10) {
          throw new AppError(
            500,
            "SLUG_GENERATION_FAILED",
            "Unable to generate a unique slug. Please try again."
          );
        }
      } while (await shortLinkRepository.findBySlug(candidate));
      slug = candidate;
    }

    if (payload.userId) {
      const user = await userRepository.findById(payload.userId);
      if (!user) {
        throw new AppError(
          404,
          "USER_NOT_FOUND",
          "The requested user was not found."
        );
      }

      return shortLinkRepository.create({
        title: payload.title,
        slug,
        originalUrl: payload.originalUrl,
        userId: payload.userId,
        expiresAt: payload.expiresAt,
      });
    }

    const guestIdentity = await guestIdentityRepository.findByToken(
      payload.guestToken!
    );
    if (!guestIdentity) {
      throw new AppError(
        404,
        "GUEST_IDENTITY_NOT_FOUND",
        "The guest identity was not found."
      );
    }

    const guestLinkCount = await shortLinkRepository.countByGuestIdentityId(
      guestIdentity.id
    );
    if (guestLinkCount >= FREE_GUEST_LINK_LIMIT) {
      throw new AppError(
        403,
        "FREE_TIER_EXPIRED",
        "The guest free tier has expired. Log in to continue creating short links."
      );
    }

    return shortLinkRepository.create({
      title: payload.title,
      slug,
      originalUrl: payload.originalUrl,
      guestIdentityId: guestIdentity.id,
      expiresAt: payload.expiresAt,
    });
  },

  async getShortLinkById(id: string) {
    const shortLink = await shortLinkRepository.findById(id);
    if (!shortLink) {
      throw new AppError(
        404,
        "SHORT_LINK_NOT_FOUND",
        "The short link was not found."
      );
    }

    return shortLink;
  },

  async getAuthenticatedShortLinkById(id: string, userId: string) {
    const shortLink = await shortLinkService.getShortLinkById(id);

    if (shortLink.userId !== userId) {
      throw new AppError(
        403,
        "FORBIDDEN",
        "You do not have access to this short link."
      );
    }

    return shortLink;
  },

  async getShortLinkBySlug(slug: string) {
    const shortLink = await shortLinkRepository.findBySlug(normalizeSlug(slug));
    if (!shortLink) {
      throw new AppError(
        404,
        "SHORT_LINK_NOT_FOUND",
        "The short link was not found."
      );
    }

    return shortLink;
  },

  async updateShortLink(id: string, input: UpdateShortLinkRequest) {
    const currentLink = await shortLinkRepository.findById(id);
    if (!currentLink) {
      throw new AppError(
        404,
        "SHORT_LINK_NOT_FOUND",
        "The short link was not found."
      );
    }

    const payload = updateShortLinkRequestSchema.parse(input);
    if (payload.slug) {
      const existingLink = await shortLinkRepository.findBySlug(
        normalizeSlug(payload.slug)
      );
      if (existingLink && existingLink.id !== id) {
        throw new AppError(
          409,
          "SLUG_ALREADY_IN_USE",
          "That short link slug is already in use."
        );
      }
    }

    return shortLinkRepository.update(id, {
      title: payload.title,
      slug: payload.slug ? normalizeSlug(payload.slug) : undefined,
      originalUrl: payload.originalUrl,
      status: payload.status,
      expiresAt: payload.expiresAt,
    });
  },

  async updateAuthenticatedShortLink(
    id: string,
    userId: string,
    input: UpdateShortLinkRequest
  ) {
    const currentLink = await shortLinkService.getAuthenticatedShortLinkById(
      id,
      userId
    );
    return shortLinkService.updateShortLink(currentLink.id, input);
  },

  async deleteShortLink(id: string) {
    const currentLink = await shortLinkRepository.findById(id);
    if (!currentLink) {
      throw new AppError(
        404,
        "SHORT_LINK_NOT_FOUND",
        "The short link was not found."
      );
    }

    await shortLinkRepository.delete(id);

    return { id };
  },

  async deleteAuthenticatedShortLink(id: string, userId: string) {
    const currentLink = await shortLinkService.getAuthenticatedShortLinkById(
      id,
      userId
    );
    return shortLinkService.deleteShortLink(currentLink.id);
  },
};
