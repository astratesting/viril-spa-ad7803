import { NextResponse } from "next/server";
import { listMembers } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const members = await listMembers();
  const filtered = q
    ? members.filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q))
    : members;

  return NextResponse.json({
    members: filtered.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      membership_tier: m.membership_tier,
      phone: m.phone ?? null,
      is_self: m.id === session.userId,
    })),
  });
}
