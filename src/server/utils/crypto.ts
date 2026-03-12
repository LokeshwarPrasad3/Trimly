import { randomBytes, scryptSync } from "node:crypto";

export function createGuestToken() {
  return randomBytes(24).toString("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${derivedKey}`;
}
