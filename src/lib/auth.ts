import type { Session } from "./session.js";

export type Permission =
  | "user:read"
  | "user:write"
  | "user:delete"
  | "post:read"
  | "post:write"
  | "post:delete";

// TODO: Define ROLE_PERMISSIONS mapping
// admin: all permissions
// editor: user:read, post:read, post:write
// viewer: user:read, post:read

export function assertCan(session: Session, permission: Permission): void {
  // TODO: Check if the session's role has the required permission
  // Throw an Error with message "Forbidden: missing permission <permission>" if not
  throw new Error("Not implemented");
}
