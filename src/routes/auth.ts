import { getUserByEmail, getUserById, deleteUser as removeUser } from "../store.js";
import { verifyPassword } from "../lib/password.js";
import { createSession, getSession, deleteSession } from "../lib/session.js";
import { assertCan } from "../lib/auth.js";

export async function login(input: { email: string; password: string }) {
  // TODO: Find user by email, verify password, create session, return { token, user }
  // Throw if user not found or password incorrect
  throw new Error("Not implemented");
}

export function logout(input: { token: string }) {
  // TODO: Delete the session, return { success: true/false }
  throw new Error("Not implemented");
}

export function getProfile(input: { token: string }) {
  // TODO: Get session from token, get user by session.userId, return user (without passwordHash)
  // Throw if session invalid
  throw new Error("Not implemented");
}

export function deleteUser(input: { token: string; userId: string }) {
  // TODO: Get session, assertCan(session, "user:delete"), delete the user
  // Throw if session invalid or unauthorized
  throw new Error("Not implemented");
}
