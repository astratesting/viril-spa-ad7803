import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  getApplication,
  logAudit,
  updateApplicationStatus,
  updateUserRole,
} from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin().catch(() => null);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const action = body.action === "reject" ? "reject" : "approve";
  const rejectionReason = body.rejection_reason ? String(body.rejection_reason) : null;

  const app = await getApplication(id);
  if (!app) return NextResponse.json({ error: "Application not found." }, { status: 404 });

  if (action === "approve") {
    await updateApplicationStatus(id, "approved", session.userId);
    if (app.user_id) {
      await updateUserRole(app.user_id, "pending_payment", { membership_tier: "Basic" });
    }
    await logAudit({
      action: "application_approved",
      admin_id: session.userId,
      target_id: id,
      description: `Approved application for ${app.full_name}.`,
    });
    return NextResponse.json({ ok: true, status: "approved" });
  }

  await updateApplicationStatus(id, "rejected", session.userId, rejectionReason ?? undefined);
  if (app.user_id) {
    await updateUserRole(app.user_id, "pending", { membership_tier: null });
  }
  await logAudit({
    action: "application_rejected",
    admin_id: session.userId,
    target_id: id,
    description: `Rejected application for ${app.full_name}.`,
  });
  return NextResponse.json({ ok: true, status: "rejected" });
}
