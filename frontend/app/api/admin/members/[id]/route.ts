import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateUserRole } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin().catch(() => null);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const tier = typeof body.tier === "string" ? body.tier : null;
  const updated = await updateUserRole(id, "member", tier ? { membership_tier: tier } : {});
  if (!updated) return NextResponse.json({ error: "Member not found." }, { status: 404 });
  return NextResponse.json({ ok: true, user: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin().catch(() => null);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (id === session.userId) {
    return NextResponse.json({ error: "You cannot remove your own account." }, { status: 400 });
  }
  const { listAllUsers } = await import("@/lib/db");
  // Soft: demote to pending instead of hard delete to preserve audit trail.
  const updated = await updateUserRole(id, "pending", { membership_tier: null, membership_expires_at: null });
  if (!updated) return NextResponse.json({ error: "Member not found." }, { status: 404 });
  await listAllUsers();
  return NextResponse.json({ ok: true });
}
