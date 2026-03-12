import { createClickEventRequestSchema, type CreateClickEventRequest } from "@/lib/validations/click-event";
import { AppError } from "@/server/errors/app-error";
import { clickEventRepository } from "@/server/repositories/click-event-repository";
import { shortLinkRepository } from "@/server/repositories/short-link-repository";

export const clickEventService = {
  async listClickEvents(shortLinkId: string, userId: string) {
    const shortLink = await shortLinkRepository.findById(shortLinkId);

    if (!shortLink) {
      throw new AppError(404, "SHORT_LINK_NOT_FOUND", "The short link was not found.");
    }

    if (shortLink.userId !== userId) {
      throw new AppError(403, "FORBIDDEN", "You do not have access to this short link.");
    }

    return clickEventRepository.listByShortLinkId(shortLinkId);
  },

  async createClickEvent(shortLinkId: string, input: CreateClickEventRequest) {
    const shortLink = await shortLinkRepository.findById(shortLinkId);

    if (!shortLink) {
      throw new AppError(404, "SHORT_LINK_NOT_FOUND", "The short link was not found.");
    }

    const payload = createClickEventRequestSchema.parse(input);
    const clickedAt = new Date();

    const clickEvent = await clickEventRepository.create({
      shortLinkId,
      ...payload,
    });

    await shortLinkRepository.incrementClickCount(shortLinkId, clickedAt);

    return clickEvent;
  },
};
