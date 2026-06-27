import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { listAllPayments } from "@/lib/db";

export async function GET() {
  const session = await requireAdmin().catch(() => null);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payments = await listAllPayments();
  return NextResponse.json({ payments });
}
