"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  createGuestIdentity,
  createGuestShortLink,
  getGuestIdentity,
  listGuestShortLinks,
  type CreateGuestLinkInput,
} from "@/lib/api/guest";
import { getGuestToken, setGuestToken } from "@/features/guest/lib/guest-storage";

const guestKeys = {
  token: ["guest-token"] as const,
  identity: (token: string) => ["guest-identity", token] as const,
  links: (token: string) => ["guest-links", token] as const,
};

export function useGuestSession() {
  const [token, setTokenState] = useState<string | null>(() => getGuestToken());
  const queryClient = useQueryClient();

  const createGuestMutation = useMutation({
    mutationFn: createGuestIdentity,
    onSuccess: (guestIdentity) => {
      setGuestToken(guestIdentity.token);
      setTokenState(guestIdentity.token);
      queryClient.setQueryData(guestKeys.identity(guestIdentity.token), guestIdentity);
    },
  });

  useEffect(() => {
    if (token || createGuestMutation.isPending || createGuestMutation.isSuccess) {
      return;
    }

    createGuestMutation.mutate();
  }, [createGuestMutation, token]);

  const identityQuery = useQuery({
    queryKey: token ? guestKeys.identity(token) : guestKeys.token,
    queryFn: () => getGuestIdentity(token!),
    enabled: Boolean(token),
  });

  const linksQuery = useQuery({
    queryKey: token ? guestKeys.links(token) : guestKeys.token,
    queryFn: () => listGuestShortLinks(token!),
    enabled: Boolean(token),
  });

  const createLinkMutation = useMutation({
    mutationFn: (input: CreateGuestLinkInput) => createGuestShortLink(token!, input),
    onSuccess: async () => {
      if (!token) {
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: guestKeys.identity(token) }),
        queryClient.invalidateQueries({ queryKey: guestKeys.links(token) }),
      ]);
    },
  });

  return {
    token,
    identityQuery,
    linksQuery,
    createLinkMutation,
    isInitializing: createGuestMutation.isPending || (!token && !createGuestMutation.isError),
    initializationError: createGuestMutation.error,
  };
}
