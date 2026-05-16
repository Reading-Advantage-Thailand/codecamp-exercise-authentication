export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "editor" | "viewer";
}

const users: Map<string, User> = new Map();

export function addUser(user: User): void {
  users.set(user.id, user);
}

export function getUserByEmail(email: string): User | undefined {
  return Array.from(users.values()).find((u) => u.email === email);
}

export function getUserById(id: string): User | undefined {
  return users.get(id);
}

export function deleteUser(id: string): boolean {
  return users.delete(id);
}

export function clear(): void {
  users.clear();
}
