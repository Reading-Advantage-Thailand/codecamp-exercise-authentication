export interface Session {
  userId: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
}

const sessions = new Map<string, Session>();

export function createSession(userId: string, role: Session["role"]): string {
  const token = crypto.randomUUID();
  sessions.set(token, { userId, role, createdAt: new Date() });
  return token;
}

export function getSession(token: string): Session | null {
  return sessions.get(token) ?? null;
}

export function deleteSession(token: string): boolean {
  return sessions.delete(token);
}

export function clearSessions(): void {
  sessions.clear();
}
