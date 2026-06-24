import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("viril_session")?.value;
  if (token) {
    destroySession(token);
  }

  const response = NextResponse.json({ message: "Logged out." });
  response.cookies.set("viril_session", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
