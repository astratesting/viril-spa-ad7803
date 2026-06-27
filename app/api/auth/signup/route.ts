import { NextResponse } from "next/server";
import { registerUser, setSessionCookie, signSession, AuthError } from "@/lib/auth";
import { createApplication } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");
    const name = String(body.name ?? "").trim();
    const phone = body.phone ? String(body.phone).trim() : null;
    const referral_source = body.referral_source ? String(body.referral_source) : null;

    if (!name) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });

    const session = await registerUser({ email, password, name, phone, referral_source });
    await createApplication({
      user_id: session.userId,
      full_name: name,
      email,
      phone,
      referral_source,
    });

    const token = await signSession(session);
    const res = NextResponse.json({ ok: true, redirect: "/dashboard" });
    return setSessionCookie(res, token);
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
