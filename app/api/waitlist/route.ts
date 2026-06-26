import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

interface WaitlistEntry {
  name: string;
  email: string;
  interest: string;
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

const VALID_INTERESTS = new Set([
  "",
  "founding",
  "full",
  "associate",
  "undecided",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, interest } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your name." },
        { status: 400 }
      );
    }

    const interestValue = typeof interest === "string" ? interest : "";
    if (!VALID_INTERESTS.has(interestValue)) {
      return NextResponse.json(
        { error: "Invalid membership interest selection." },
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

    const entries = await loadEntries();

    if (entries.some((e) => e.email === normalized)) {
      return NextResponse.json(
        {
          message:
            "You're already on the waitlist. We'll be in touch as launch approaches.",
        },
        { status: 200 }
      );
    }

    entries.push({
      name: name.trim(),
      email: normalized,
      interest: interestValue,
      subscribedAt: new Date().toISOString(),
    });
    await saveEntries(entries);

    return NextResponse.json(
      {
        message:
          "Your request has been received. We'll be in touch as launch approaches.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request at this time." },
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
