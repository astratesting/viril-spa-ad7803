import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  listAllPayments,
  listAllUsers,
  listApplications,
  listEvents,
  countAttendees,
} from "@/lib/db";

export async function GET() {
  const session = await requireAdmin().catch(() => null);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [users, payments, events, applications] = await Promise.all([
    listAllUsers(),
    listAllPayments(),
    listEvents(),
    listApplications("pending"),
  ]);

  const revenue = payments.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount_cents, 0);
  const members = users.filter((u) => u.role === "member").length;
  const pending = applications.length;
  const upcoming = events.filter((e) => new Date(e.date).getTime() >= Date.now()).length;

  return NextResponse.json({
    stats: { members, pending, revenue, upcoming },
    members: users,
    payments,
    events: await Promise.all(events.map(async (e) => ({ ...e, attendees: await countAttendees(e.id) }))),
    applications,
  });
}
