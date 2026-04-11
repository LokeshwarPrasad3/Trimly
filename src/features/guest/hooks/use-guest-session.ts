"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import {
  createGuestIdentity,
  createGuestShortLink,
  getGuestIdentity,
  listGuestShortLinks,
  type CreateGuestLinkInput,
} from "@/lib/api/guest";
import {
  getGuestToken,
  setGuestToken,
} from "@/features/guest/lib/guest-storage";

const guestKeys = {
  token: ["guest-token"] as const,
  identity: (token: string) => ["guest-identity", token] as const,
  links: (token: string) => ["guest-links", token] as const,
};

export function useGuestSession() {
  const [token, setTokenState] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const hasAttemptedCreationRef = useRef(false);
  const queryClient = useQueryClient();

  // Read token from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const storedToken = getGuestToken();
    if (storedToken) {
      setTokenState(storedToken);
    }
    setHasHydrated(true);
  }, []);

  const createGuestMutation = useMutation({
    mutationFn: createGuestIdentity,
    onSuccess: (guestIdentity) => {
      setGuestToken(guestIdentity.token);
      setTokenState(guestIdentity.token);
      queryClient.setQueryData(
        guestKeys.identity(guestIdentity.token),
        guestIdentity
      );
    },
  });

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }
    if (token || hasAttemptedCreationRef.current) {
      return;
    }

    hasAttemptedCreationRef.current = true;
    createGuestMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, token]); // intentionally omit createGuestMutation — it's a new ref each render

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
    mutationFn: (input: CreateGuestLinkInput) => {
      if (!token) {
        throw new Error("Guest workspace is not ready yet.");
      }

      return createGuestShortLink(token, input);
    },
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
    isInitializing:
      !hasHydrated ||
      createGuestMutation.isPending ||
      (!token && createGuestMutation.isIdle && !createGuestMutation.isError),
    initializationError: createGuestMutation.error,
  };
}
