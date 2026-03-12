const AUTH_USER_ID_KEY = "blink_auth_user_id";

export function getStoredUserId() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_USER_ID_KEY);
}

export function setStoredUserId(userId: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_USER_ID_KEY, userId);
}

export function clearStoredUserId() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_USER_ID_KEY);
}
