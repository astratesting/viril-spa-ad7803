import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { listMembers } from "@/lib/db";

/** GET /api/directory — browse verified members (discretion-first: first name + last initial). */
export async function GET(request: Request) {
  const session = await requireUser().catch(() => null);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "member" && session.role !== "admin") {
    return NextResponse.json({ error: "Active membership required." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const members = await listMembers();
  const filtered = q
    ? members.filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q))
    : members;

  return NextResponse.json({
    members: filtered.map((m) => {
      const [first, ...rest] = m.name.split(" ");
      const lastInitial = rest.length ? rest[rest.length - 1].charAt(0).toUpperCase() : "";
      return {
        id: m.id,
        first_name: first,
        last_initial: lastInitial,
        membership_tier: m.membership_tier,
        is_self: m.id === session.userId,
      };
    }),
  });
}
