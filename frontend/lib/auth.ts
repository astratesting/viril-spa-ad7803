import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserRole,
} from "./db";
import { SESSION_COOKIE, COOKIE_MAX_AGE } from "./session";
import type { SessionUser, UserRole } from "@/types";

function secret(): Uint8Array {
  const raw =
    process.env.AUTH_SECRET ||
    process.env.SECRET_KEY ||
    "goon-dev-secret-change-in-production-please";
  return new TextEncoder().encode(raw);
}

export async function signSession(payload: SessionUser): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(secret());
}

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    const userId = payload.userId as string | undefined;
    const role = payload.role as UserRole | undefined;
    const email = payload.email as string | undefined;
    const name = payload.name as string | undefined;
    if (!userId || !role || !email || !name) return null;
    return {
      userId,
      role,
      email,
      name,
      membership_tier: (payload.membership_tier as string | null) ?? null,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await verifySession(token);
  if (!session) return null;
  const user = await findUserById(session.userId);
  if (!user) return null;
  return {
    userId: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
    membership_tier: user.membership_tier ?? null,
  };
}

export class RedirectError {
  constructor(public destination: string) {}
}
export class AuthError extends Error {}

export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) throw new RedirectError("/login?redirect=/dashboard");
  return session;
}

export async function requireMember(): Promise<SessionUser> {
  const session = await requireUser();
  if (session.role !== "member" && session.role !== "admin") {
    throw new RedirectError("/payment");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireUser();
  if (session.role !== "admin") throw new RedirectError("/dashboard");
  return session;
}

export function setSessionCookie(res: NextResponse, token: string): NextResponse {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

export function clearSessionCookie(res: NextResponse): NextResponse {
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export async function authenticate(email: string, password: string): Promise<SessionUser> {
  const user = await findUserByEmail(email);
  if (!user) throw new AuthError("No account found for that email.");
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new AuthError("Incorrect password. Please try again.");
  return {
    userId: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
    membership_tier: user.membership_tier ?? null,
  };
}

export async function registerUser(input: {
  email: string;
  password: string;
  name: string;
  phone?: string | null;
  referral_source?: string | null;
}): Promise<SessionUser> {
  const existing = await findUserByEmail(input.email);
  if (existing) throw new AuthError("An account with that email already exists.");
  const user = await createUser({
    email: input.email,
    password: input.password,
    name: input.name,
    phone: input.phone ?? null,
    referral_source: input.referral_source ?? null,
    role: "pending",
  });
  return {
    userId: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
    membership_tier: null,
  };
}

export async function ensureDemoAccount(): Promise<SessionUser> {
  const existing = await findUserByEmail("demo@demo.app");
  if (existing) {
    return {
      userId: existing.id,
      role: existing.role,
      email: existing.email,
      name: existing.name,
      membership_tier: existing.membership_tier ?? null,
    };
  }
  const user = await createUser({
    email: "demo@demo.app",
    password: "demo123",
    name: "Aurelia Vance",
    phone: "+1 (310) 555-0148",
    referral_source: "Friend",
    role: "member",
  });
  await updateUserRole(user.id, "member", {
    membership_tier: "Premium",
    membership_expires_at: new Date(Date.now() + 330 * 86400000).toISOString(),
  });
  return {
    userId: user.id,
    role: "member",
    email: user.email,
    name: user.name,
    membership_tier: "Premium",
  };
}

export async function ensureDemoAdmin(): Promise<SessionUser> {
  const existing = await findUserByEmail("admin@demo.app");
  if (existing) {
    return {
      userId: existing.id,
      role: existing.role,
      email: existing.email,
      name: existing.name,
      membership_tier: existing.membership_tier ?? null,
    };
  }
  const user = await createUser({
    email: "admin@demo.app",
    password: "admin123",
    name: "House Steward",
    role: "admin",
  });
  await updateUserRole(user.id, "admin", {
    membership_tier: "VIP",
    membership_expires_at: new Date(Date.now() + 365 * 86400000).toISOString(),
  });
  return {
    userId: user.id,
    role: "admin",
    email: user.email,
    name: user.name,
    membership_tier: "VIP",
  };
}
