import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { findUserById, updateUserRole } from "@/lib/db";

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
      phone: user.phone,
      referral_source: user.referral_source,
      role: user.role,
      membership_tier: user.membership_tier,
      membership_expires_at: user.membership_expires_at,
      created_at: user.created_at,
    },
  });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : null;

  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });

  const updated = await updateUserRole(session.userId, session.role, { name, phone: phone || null });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      role: updated.role,
      membership_tier: updated.membership_tier,
    },
  });
}
