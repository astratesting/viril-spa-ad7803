import { NextResponse } from "next/server";
import { listParlors } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
