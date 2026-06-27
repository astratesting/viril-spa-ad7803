import { NextResponse } from "next/server";
import {
  ensureDemoAccount,
  ensureDemoAdmin,
  setSessionCookie,
  signSession,
} from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    const body = isJson
      ? await request.json().catch(() => ({}))
      : Object.fromEntries(new URLSearchParams(await request.text()));
    const asAdmin = body.role === "admin";

    const session = asAdmin ? await ensureDemoAdmin() : await ensureDemoAccount();
    const token = await signSession(session);
    const target = asAdmin ? "/admin" : "/dashboard";

    if (isJson) {
      const res = NextResponse.json({ ok: true, redirect: target });
      return setSessionCookie(res, token);
    }

    const res = NextResponse.redirect(new URL(target, request.url), 303);
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch {
    return NextResponse.json(
      { error: "Could not start the demo session." },
      { status: 500 }
    );
  }
}
