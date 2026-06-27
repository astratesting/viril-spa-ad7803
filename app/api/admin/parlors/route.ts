import { NextResponse } from "next/server";
import { createParlor } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();
  const capacity = Number(body.capacity ?? 0);

  if (!name || !capacity) {
    return NextResponse.json(
      { error: "Name and capacity are required." },
      { status: 400 }
    );
  }

  const parlor = await createParlor({
    name,
    description,
    capacity,
    price_cents: body.price_cents ? Number(body.price_cents) : null,
    image_url: null,
    is_active: true,
  });

  return NextResponse.json({ ok: true, parlor });
}
