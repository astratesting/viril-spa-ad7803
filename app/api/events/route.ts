import { NextResponse } from "next/server";
import {
  listEvents,
  countAttendees,
  isAttending,
} from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await listEvents();
  const out = await Promise.all(
    events.map(async (e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      date: e.date,
      time: e.time,
      end_time: e.end_time,
      location: e.location,
      capacity: e.capacity,
      is_private: e.is_private,
      attendee_count: await countAttendees(e.id),
      attending: await isAttending(e.id, session.userId),
      past: new Date(e.date).getTime() < Date.now(),
    }))
  );

  return NextResponse.json({ events: out });
}
