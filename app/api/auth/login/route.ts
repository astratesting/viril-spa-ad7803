import { NextResponse } from "next/server";
import { validateCredentials, createSession, sanitizeUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = validateCredentials(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = createSession(user.id);
    const response = NextResponse.json({
      user: sanitizeUser(user),
      message: "Login successful.",
    });

    response.cookies.set("viril_session", token, {
      httpOnly: true,
      secure: false, // allow non-HTTPS in dev/preview
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
