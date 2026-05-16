# Codecamp Exercise: Authentication & RBAC

## Learning Objectives

- Implement session-based authentication with login and logout
- Hash passwords securely using bcrypt
- Create role-based access control (RBAC) with `assertCan` guards
- Protect routes using middleware that checks session tokens
- Understand the difference between authentication (who are you?) and authorization (what can you do?)

## Exercise Instructions

### Setup

1. **Fork** this repository and **clone** your fork
2. Run `npm install` to install dependencies
3. Run `npm test` to see the failing tests

### Step 1: Implement Password Hashing (`src/lib/password.ts`)

- `hashPassword(plain)` — hash a plaintext password using bcrypt
- `verifyPassword(plain, hashed)` — compare a plaintext password against a hash

### Step 2: Implement Session Management (`src/lib/session.ts`)

- `createSession(userId, role)` — generate a session token, store it, return it
- `getSession(token)` — retrieve the session data for a token, or `null`
- `deleteSession(token)` — remove a session (logout)

### Step 3: Implement Auth Guards (`src/lib/auth.ts`)

- `assertCan(session, permission)` — throw if the session's role lacks the permission
- Define a role-permission map:
  - `admin`: all permissions (`user:read`, `user:write`, `user:delete`, `post:read`, `post:write`, `post:delete`)
  - `editor`: `user:read`, `post:read`, `post:write`
  - `viewer`: `user:read`, `post:read`

### Step 4: Implement Route Handlers (`src/routes/`)

- `login({ email, password })` — verify credentials, create session, return token
- `logout({ token })` — delete the session
- `getProfile({ token })` — return user data if session is valid
- `deleteUser({ token, userId })` — delete a user (requires `user:delete` permission)

### Step 5: Run Tests

- Run `npm test` to verify your implementations

## Acceptance Criteria

- [ ] Passwords are hashed (never stored in plain text)
- [ ] Sessions use random tokens (not predictable)
- [ ] `assertCan` throws for unauthorized actions
- [ ] Admin can delete users, editor and viewer cannot
- [ ] Login returns a session token, logout invalidates it
- [ ] `npm test` passes with all tests green

## File Structure

```
codecamp-exercise-authentication/
├── README.md
├── LICENSE
├── .gitignore
├── package.json
├── tsconfig.json
├── src/
│   ├── lib/
│   │   ├── password.ts         # TODO: Hash & verify passwords
│   │   ├── session.ts          # TODO: Session management
│   │   └── auth.ts             # TODO: RBAC guards
│   ├── routes/
│   │   └── auth.ts             # TODO: Login, logout, profile, delete
│   ├── store.ts                # In-memory user store (provided)
│   └── __tests__/
│       ├── password.test.ts    # Tests for password hashing
│       ├── auth.test.ts        # Tests for RBAC guards
│       └── routes.test.ts      # Tests for route handlers
```

## Commands

```bash
npm install     # Install dependencies
npm test        # Run all tests
```

## Tips

- Use `crypto.randomUUID()` for session tokens
- Use `bcrypt.hash(password, 10)` and `bcrypt.compare(password, hash)`
- `assertCan` should throw an `Error` with a message like "Forbidden: missing permission user:delete"
- Keep role-permission mappings in a simple object — no need for a database
