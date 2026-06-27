import { NextResponse } from "next/server";
import { addWaitlistEmail, listWaitlist } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email : "";
    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const entry = await addWaitlistEmail(normalized);
    if (!entry) {
      return NextResponse.json(
        { error: "This email is already on our list." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: true, message: "You've been added to the waiting list. We'll be in touch." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const waitlist = await listWaitlist();
  return NextResponse.json({ count: waitlist.length });
}
