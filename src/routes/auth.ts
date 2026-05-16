import { getUserByEmail, getUserById, deleteUser as removeUser } from "../store.js";
import { verifyPassword } from "../lib/password.js";
import { createSession, getSession, deleteSession } from "../lib/session.js";
import { assertCan } from "../lib/auth.js";

export async function login(input: { email: string; password: string }) {
  const user = getUserByEmail(input.email);
  if (!user) throw new Error("Invalid credentials");
  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");
  const token = createSession(user.id, user.role);
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export function logout(input: { token: string }) {
  const success = deleteSession(input.token);
  return { success };
}

export function getProfile(input: { token: string }) {
  const session = getSession(input.token);
  if (!session) throw new Error("Invalid session");
  const user = getUserById(session.userId);
  if (!user) throw new Error("User not found");
  const { passwordHash, ...profile } = user;
  return profile;
}

export function deleteUser(input: { token: string; userId: string }) {
  const session = getSession(input.token);
  if (!session) throw new Error("Invalid session");
  assertCan(session, "user:delete");
  removeUser(input.userId);
}
