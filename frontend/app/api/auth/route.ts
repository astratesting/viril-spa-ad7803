import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });
  const user = await findUserById(session.userId);
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      membership_tier: user.membership_tier,
      membership_expires_at: user.membership_expires_at,
    },
  });
}
