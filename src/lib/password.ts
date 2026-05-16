// TODO: Implement password hashing using bcrypt

export async function hashPassword(plain: string): Promise<string> {
  // TODO: Hash the plaintext password with bcrypt (salt rounds = 10)
  throw new Error("Not implemented");
}

export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  // TODO: Compare the plaintext password against the bcrypt hash
  throw new Error("Not implemented");
}
