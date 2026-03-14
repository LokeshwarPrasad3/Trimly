"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAuthenticatedLink,
  getAuthenticatedLink,
  listAuthenticatedClickEvents,
  listAuthenticatedLinks,
  type CreateAuthenticatedLinkInput,
} from "@/lib/api/links";

export const shortLinkKeys = {
  all: ["authenticated-links"] as const,
  detail: (id: string) => ["authenticated-links", id] as const,
  clickEvents: (id: string) =>
    ["authenticated-links", id, "click-events"] as const,
};

export function useAuthenticatedLinks() {
  return useQuery({
    queryKey: shortLinkKeys.all,
    queryFn: listAuthenticatedLinks,
  });
}

export function useAuthenticatedLink(id: string) {
  return useQuery({
    queryKey: shortLinkKeys.detail(id),
    queryFn: () => getAuthenticatedLink(id),
    enabled: Boolean(id),
  });
}

export function useAuthenticatedClickEvents(id: string) {
  return useQuery({
    queryKey: shortLinkKeys.clickEvents(id),
    queryFn: () => listAuthenticatedClickEvents(id),
    enabled: Boolean(id),
  });
}

export function useCreateAuthenticatedLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAuthenticatedLinkInput) =>
      createAuthenticatedLink(input),
    onSuccess: async (link) => {
      await queryClient.invalidateQueries({ queryKey: shortLinkKeys.all });
      queryClient.setQueryData(shortLinkKeys.detail(link.id), link);
    },
  });
}
