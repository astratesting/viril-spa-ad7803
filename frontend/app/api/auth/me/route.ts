import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await findUserById(session.userId);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      membership_tier: user.membership_tier,
      membership_expires_at: user.membership_expires_at,
    },
  });
}