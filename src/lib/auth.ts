import type { Session } from "./session.js";

export type Permission =
  | "user:read"
  | "user:write"
  | "user:delete"
  | "post:read"
  | "post:write"
  | "post:delete";

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: ["user:read", "user:write", "user:delete", "post:read", "post:write", "post:delete"],
  editor: ["user:read", "post:read", "post:write"],
  viewer: ["user:read", "post:read"],
};

export function assertCan(session: Session, permission: Permission): void {
  const allowed = ROLE_PERMISSIONS[session.role] || [];
  if (!allowed.includes(permission)) {
    throw new Error(`Forbidden: missing permission ${permission}`);
  }
}
