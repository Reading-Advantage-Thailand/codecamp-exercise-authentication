import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../lib/password.js";

describe("hashPassword", () => {
  it("returns a hash that is different from the plaintext", async () => {
    const hash = await hashPassword("secret123");
    expect(hash).not.toBe("secret123");
    expect(hash.length).toBeGreaterThan(20);
  });
});

describe("verifyPassword", () => {
  it("returns true for matching password", async () => {
    const hash = await hashPassword("secret123");
    const result = await verifyPassword("secret123", hash);
    expect(result).toBe(true);
  });

  it("returns false for wrong password", async () => {
    const hash = await hashPassword("secret123");
    const result = await verifyPassword("wrongpassword", hash);
    expect(result).toBe(false);
  });
});
