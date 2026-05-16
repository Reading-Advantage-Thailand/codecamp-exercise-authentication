export interface Session {
  userId: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
}

// TODO: Use a Map to store sessions by token

export function createSession(userId: string, role: Session["role"]): string {
  // TODO: Generate a random token (use crypto.randomUUID())
  // Store the session data in the map
  // Return the token
  throw new Error("Not implemented");
}

export function getSession(token: string): Session | null {
  // TODO: Return the session for the given token, or null
  throw new Error("Not implemented");
}

export function deleteSession(token: string): boolean {
  // TODO: Remove the session, return true if it existed
  throw new Error("Not implemented");
}

export function clearSessions(): void {
  // TODO: Clear all sessions (for testing)
  throw new Error("Not implemented");
}
