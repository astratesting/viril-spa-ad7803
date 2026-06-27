import { NextResponse } from "next/server";
import { getEvent, setRsvp } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "member" && session.role !== "admin") {
    return NextResponse.json({ error: "Active membership required to RSVP." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const eventId = String(body.event_id ?? "");
  const action = body.action === "cancel" ? "cancel" : "rsvp";

  const event = await getEvent(eventId);
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });
  if (new Date(event.date).getTime() < Date.now()) {
    return NextResponse.json({ error: "This event has already passed." }, { status: 400 });
  }

  const result = await setRsvp(eventId, session.userId, action);
  if (!result.ok && action === "rsvp") {
    return NextResponse.json({ error: "This event is at capacity." }, { status: 409 });
  }
  return NextResponse.json(result);
}
