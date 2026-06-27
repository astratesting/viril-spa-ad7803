import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

interface WaitlistEntry {
  name: string;
  email: string;
  referral: string;
  tier: string;
  subscribedAt: string;
}

async function loadEntries(): Promise<WaitlistEntry[]> {
  try {
    if (!existsSync(DATA_FILE)) return [];
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveEntries(entries: WaitlistEntry[]) {
  const dir = path.dirname(DATA_FILE);
  if (!existsSync(dir)) {
    const { mkdir } = await import("fs/promises");
    await mkdir(dir, { recursive: true });
  }
  await writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

const VALID_TIERS = new Set(["founding", "patron", "benefactor"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, referral, tier } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!tier || !VALID_TIERS.has(tier)) {
      return NextResponse.json(
        { error: "Please select a membership tier." },
        { status: 400 }
      );
    }

    const entry: WaitlistEntry = {
      name: name.trim(),
      email: normalized,
      referral: typeof referral === "string" ? referral.trim() : "",
      tier,
      subscribedAt: new Date().toISOString(),
    };

    const entries = await loadEntries();

    if (entries.some((e) => e.email === normalized)) {
      return NextResponse.json(
        { message: "You're already on the list. We'll be in touch." },
        { status: 200 }
      );
    }

    entries.push(entry);
    await saveEntries(entries);

    return NextResponse.json(
      { message: "Your interest has been received. The house will be in touch." },
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
  try {
    const entries = await loadEntries();
    return NextResponse.json({ count: entries.length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
