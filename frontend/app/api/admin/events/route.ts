import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createEvent } from "@/lib/db";

export async function POST(request: Request) {
  const session = await requireAdmin().catch(() => null);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const date = String(body.date ?? "");
  const time = String(body.time ?? "19:00");
  const location = String(body.location ?? "").trim();
  const capacity = Number(body.capacity ?? 0);

  if (!title || !date || !location || !capacity) {
    return NextResponse.json({ error: "Title, date, location, and capacity are required." }, { status: 400 });
  }
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const ev = await createEvent({
    title,
    description,
    date: parsed.toISOString(),
    time,
    end_time: body.end_time ? String(body.end_time) : null,
    location,
    capacity,
    image_url: null,
    is_private: true,
    created_by: session.userId,
  });
  return NextResponse.json({ ok: true, event: ev }, { status: 201 });
}
