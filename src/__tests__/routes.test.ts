import { describe, it, expect, beforeEach } from "vitest";
import { addUser, clear as clearStore } from "../store.js";
import { clearSessions } from "../lib/session.js";
import { hashPassword } from "../lib/password.js";
import { login, logout, getProfile, deleteUser } from "../routes/auth.js";

beforeEach(async () => {
  clearStore();
  clearSessions();
  const hash = await hashPassword("password123");
  addUser({ id: "1", name: "Admin", email: "admin@test.com", passwordHash: hash, role: "admin" });
  addUser({ id: "2", name: "Viewer", email: "viewer@test.com", passwordHash: hash, role: "viewer" });
});

describe("login", () => {
  it("returns a token on valid credentials", async () => {
    const result = await login({ email: "admin@test.com", password: "password123" });
    expect(result.token).toBeDefined();
    expect(result.token.length).toBeGreaterThan(0);
  });

  it("throws on invalid email", async () => {
    await expect(login({ email: "nobody@test.com", password: "password123" })).rejects.toThrow();
  });

  it("throws on wrong password", async () => {
    await expect(login({ email: "admin@test.com", password: "wrong" })).rejects.toThrow();
  });
});

describe("logout", () => {
  it("invalidates the session", async () => {
    const { token } = await login({ email: "admin@test.com", password: "password123" });
    const result = logout({ token });
    expect(result.success).toBe(true);
  });
});

describe("getProfile", () => {
  it("returns user data for valid session", async () => {
    const { token } = await login({ email: "admin@test.com", password: "password123" });
    const profile = getProfile({ token });
    expect(profile.name).toBe("Admin");
    expect(profile.email).toBe("admin@test.com");
    expect((profile as any).passwordHash).toBeUndefined();
  });

  it("throws for invalid token", () => {
    expect(() => getProfile({ token: "invalid" })).toThrow();
  });
});

describe("deleteUser", () => {
  it("admin can delete another user", async () => {
    const { token } = await login({ email: "admin@test.com", password: "password123" });
    expect(() => deleteUser({ token, userId: "2" })).not.toThrow();
  });

  it("viewer cannot delete users", async () => {
    const { token } = await login({ email: "viewer@test.com", password: "password123" });
    expect(() => deleteUser({ token, userId: "1" })).toThrow("Forbidden");
  });
});
