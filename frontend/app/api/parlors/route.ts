import { NextResponse } from "next/server";
import { listParlors, isSlotAvailable, createBooking } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { TIME_SLOTS } from "@/types";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parlors = await listParlors();
  return NextResponse.json({
    parlors: parlors.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      capacity: p.capacity,
      price_cents: p.price_cents ?? null,
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "member" && session.role !== "admin") {
    return NextResponse.json({ error: "Active membership required to book a parlor." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const parlor_id = String(body.parlor_id ?? "");
  const date = String(body.date ?? "");
  const start_time = String(body.start_time ?? "");
  const duration = Number(body.duration ?? 1);

  if (!parlor_id || !date || !start_time) {
    return NextResponse.json({ error: "Parlor, date, and start time are required." }, { status: 400 });
  }
  if (!(TIME_SLOTS as readonly string[]).includes(start_time)) {
    return NextResponse.json({ error: "Invalid time slot." }, { status: 400 });
  }
  if (![1, 2, 3].includes(duration)) {
    return NextResponse.json({ error: "Duration must be 1, 2, or 3 hours." }, { status: 400 });
  }
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }
  if (parsed.getTime() < new Date(new Date().toDateString()).getTime()) {
    return NextResponse.json({ error: "Cannot book in the past." }, { status: 400 });
  }

  const parlor = (await listParlors()).find((p) => p.id === parlor_id);
  if (!parlor) return NextResponse.json({ error: "Parlor not found." }, { status: 404 });

  const available = await isSlotAvailable(parlor_id, date, start_time, duration);
  if (!available) {
    return NextResponse.json({ error: "That time slot is already booked." }, { status: 409 });
  }

  const booking = await createBooking({
    parlor_id,
    user_id: session.userId,
    date: parsed.toISOString(),
    start_time,
    duration,
  });

  return NextResponse.json({
    ok: true,
    booking: { ...booking, parlor: parlor.name },
    message: `${parlor.name} booked. Check your email for confirmation.`,
  });
}
