import { NextResponse } from "next/server";
import { authenticate, setSessionCookie, signSession, AuthError } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");
    const redirect = String(body.redirect ?? "/dashboard");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const session = await authenticate(email, password);
    const token = await signSession(session);
    const res = NextResponse.json({ ok: true, redirect });
    return setSessionCookie(res, token);
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
