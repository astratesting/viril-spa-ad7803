import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getDB,
  listBookingsForUser,
  listParlors,
} from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await listBookingsForUser(session.userId);
  const parlors = await listParlors();
  const parlorMap = new Map(parlors.map((p) => [p.id, p]));

  const enriched = await Promise.all(
    bookings.map(async (b) => {
      const parlor = parlorMap.get(b.parlor_id);
      return {
        ...b,
        parlor_name: parlor?.name ?? "Unknown",
        parlor_capacity: parlor?.capacity ?? 0,
      };
    })
  );

  return NextResponse.json({ bookings: enriched });
}