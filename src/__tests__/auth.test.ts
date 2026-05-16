import { describe, it, expect } from "vitest";
import { assertCan } from "../lib/auth.js";
import type { Session } from "../lib/session.js";

function makeSession(role: Session["role"]): Session {
  return { userId: "1", role, createdAt: new Date() };
}

describe("assertCan", () => {
  it("admin can do everything", () => {
    const session = makeSession("admin");
    expect(() => assertCan(session, "user:read")).not.toThrow();
    expect(() => assertCan(session, "user:delete")).not.toThrow();
    expect(() => assertCan(session, "post:write")).not.toThrow();
  });

  it("editor can read and write posts but not delete users", () => {
    const session = makeSession("editor");
    expect(() => assertCan(session, "post:read")).not.toThrow();
    expect(() => assertCan(session, "post:write")).not.toThrow();
    expect(() => assertCan(session, "user:delete")).toThrow("Forbidden");
  });

  it("viewer can only read", () => {
    const session = makeSession("viewer");
    expect(() => assertCan(session, "user:read")).not.toThrow();
    expect(() => assertCan(session, "post:read")).not.toThrow();
    expect(() => assertCan(session, "post:write")).toThrow("Forbidden");
    expect(() => assertCan(session, "user:delete")).toThrow("Forbidden");
  });
});
