import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function createGuestToken() {
  return randomBytes(24).toString("hex");
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, existingHash] = storedHash.split(":");

  if (!salt || !existingHash) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, 64);
  const existingKey = Buffer.from(existingHash, "hex");

  if (derivedKey.length !== existingKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, existingKey);
}
