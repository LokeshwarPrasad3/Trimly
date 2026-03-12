const GUEST_TOKEN_KEY = "blink_guest_token";

export function getGuestToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(GUEST_TOKEN_KEY);
}

export function setGuestToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(GUEST_TOKEN_KEY, token);
}

export function clearGuestToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(GUEST_TOKEN_KEY);
}
