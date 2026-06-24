import { cookies } from "next/headers";

// In-memory user store for demo (no real DB needed in preview)
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "member" | "admin";
  createdAt: string;
  membershipTier: "essentials" | "premium" | "elite" | null;
  waitlistPosition: number;
}

const DEMO_USERS: User[] = [
  {
    id: "demo-001",
    email: "demo@demo.app",
    password: "demo123",
    name: "Demo User",
    role: "member",
    createdAt: "2026-01-15T10:00:00Z",
    membershipTier: "premium",
    waitlistPosition: 42,
  },
  {
    id: "admin-001",
    email: "admin@virilspa.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    createdAt: "2025-12-01T08:00:00Z",
    membershipTier: "elite",
    waitlistPosition: 1,
  },
];

// In-memory user store (persists across requests in same server process)
let users: User[] = [...DEMO_USERS];

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(
  email: string,
  password: string,
  name: string
): User | null {
  if (findUserByEmail(email)) return null;
  const user: User = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase(),
    password,
    name,
    role: "member",
    createdAt: new Date().toISOString(),
    membershipTier: null,
    waitlistPosition: users.length + 1,
  };
  users.push(user);
  return user;
}

export function validateCredentials(
  email: string,
  password: string
): User | null {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return null;
  return user;
}

// Simple session token management
const sessions = new Map<string, string>(); // token -> userId

export function createSession(userId: string): string {
  const token = `sess_${userId}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  sessions.set(token, userId);
  return token;
}

export function getSessionUser(token: string): User | null {
  const userId = sessions.get(token);
  if (!userId) return null;
  return findUserById(userId) ?? null;
}

export function destroySession(token: string): void {
  sessions.delete(token);
}

// Next.js server-side helpers
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("viril_session")?.value;
  if (!token) return null;
  return getSessionUser(token);
}

export function sanitizeUser(user: User) {
  const { password, ...safe } = user;
  return safe;
}
