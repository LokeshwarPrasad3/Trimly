"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  claimGuestLinks,
  getCurrentUser,
  loginUser,
  logoutUser,
  signupUser,
  type AuthUser,
} from "@/lib/api/auth";
import {
  clearGuestToken,
  getGuestToken,
} from "@/features/guest/lib/guest-storage";

const authKeys = {
  currentUser: ["auth-user"] as const,
};

type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

export function useAuthSession() {
  const queryClient = useQueryClient();

  const currentUserQuery = useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getCurrentUser,
    retry: false,
  });

  async function finalizeAuth(user: AuthUser) {
    const guestToken = getGuestToken();
    if (guestToken) {
      await claimGuestLinks(guestToken, user.id);
      clearGuestToken();
      queryClient.removeQueries({ queryKey: ["guest-identity", guestToken] });
      queryClient.removeQueries({ queryKey: ["guest-links", guestToken] });
    }

    queryClient.setQueryData(authKeys.currentUser, user);
    return user;
  }

  const signupMutation = useMutation({
    mutationFn: (payload: AuthPayload) => signupUser(payload),
    onSuccess: finalizeAuth,
  });

  const loginMutation = useMutation({
    mutationFn: (payload: AuthPayload) => loginUser(payload),
    onSuccess: finalizeAuth,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
      queryClient.removeQueries({ queryKey: authKeys.currentUser });
    },
  });

  return {
    currentUserQuery,
    signupMutation,
    loginMutation,
    logoutMutation,
  };
}
