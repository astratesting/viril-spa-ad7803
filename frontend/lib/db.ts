import { promises as fs } from "fs";
import { existsSync } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import type { Database } from "@/types";

const DATA_FILE = path.join(process.cwd(), "data", "db.json");

let cache: Database | null = null;
let writeChain: Promise<void> = Promise.resolve();

async function seed(): Promise<Database> {
  const now = new Date();
  const iso = now.toISOString();
  const days = (n: number) =>
    new Date(now.getTime() + n * 86400000).toISOString();
  const uid = () => crypto.randomUUID();

  async function mkUser(
    email: string,
    name: string,
    role: Database["users"][number]["role"],
    password: string,
    rest: Partial<Database["users"][number]> = {}
  ): Promise<Database["users"][number]> {
    return {
      id: uid(),
      email: email.trim().toLowerCase(),
      name,
      password_hash: await bcrypt.hash(password, 10),
      phone: null,
      referral_source: null,
      role,
      membership_tier: null,
      membership_expires_at: null,
      avatar_url: null,
      created_at: iso,
      updated_at: iso,
      ...rest,
    };
  }

  const admin = await mkUser("admin@demo.app", "House Steward", "admin", "admin123", {
    phone: "+1 (310) 555-0100",
    membership_tier: "VIP",
    membership_expires_at: days(365),
  });
  const demo = await mkUser("demo@demo.app", "Aurelia Vance", "member", "demo123", {
    phone: "+1 (310) 555-0148",
    referral_source: "Friend",
    membership_tier: "Premium",
    membership_expires_at: days(330),
  });
  const m1 = await mkUser("elena@goon.club", "Elena Marchetti", "member", "demo123", {
    phone: "+1 (310) 555-0177",
    referral_source: "Event",
    membership_tier: "VIP",
    membership_expires_at: days(280),
  });
  const m2 = await mkUser("julian@goon.club", "Julian Okonkwo", "member", "demo123", {
    referral_source: "Social",
    membership_tier: "Premium",
    membership_expires_at: days(200),
  });
  const m3 = await mkUser("rafael@goon.club", "Rafael Santos", "member", "demo123", {
    referral_source: "Friend",
    membership_tier: "Premium",
    membership_expires_at: days(150),
  });
  const m4 = await mkUser("camille@goon.club", "Camille Dubois", "member", "demo123", {
    referral_source: "Other",
    membership_tier: "Basic",
    membership_expires_at: days(95),
  });
  const m5 = await mkUser("theo@goon.club", "Theo Lindqvist", "member", "demo123", {
    referral_source: "Friend",
    membership_tier: "Premium",
    membership_expires_at: days(60),
  });
  const pendingUser = await mkUser("sasha@goon.club", "Sasha Lin", "pending", "demo123", {
    referral_source: "Social",
  });

  const users = [admin, demo, m1, m2, m3, m4, m5, pendingUser];

  const tiers: Database["tiers"] = [
    {
      id: uid(),
      name: "Basic",
      price_cents: 120000,
      description: "Founding access to the salon and the inaugural calendar of events.",
      benefits: ["Access to The Salon", "Members-only events", "House concierge"],
      is_active: true,
      created_at: iso,
    },
    {
      id: uid(),
      name: "Premium",
      price_cents: 220000,
      description: "Expanded access for patrons who shape the character of the house.",
      benefits: ["Everything in Basic", "Priority event RSVP", "Private dining access"],
      is_active: true,
      created_at: iso,
    },
    {
      id: uid(),
      name: "VIP",
      price_cents: 350000,
      description: "The fullest measure of the house — for benefactors who sustain it.",
      benefits: ["Everything in Premium", "Founding table at cellar dinners", "Dedicated concierge line"],
      is_active: true,
      created_at: iso,
    },
  ];

  const applications: Database["applications"] = [
    {
      id: uid(),
      user_id: pendingUser.id,
      full_name: pendingUser.name,
      email: pendingUser.email,
      phone: pendingUser.phone,
      referral_source: "Social",
      status: "pending",
      reviewed_by: null,
      reviewed_at: null,
      rejection_reason: null,
      created_at: days(-3),
    },
    {
      id: uid(),
      user_id: null,
      full_name: "Margaux Lefevre",
      email: "margaux@example.com",
      phone: "+1 (310) 555-0190",
      referral_source: "Event",
      status: "pending",
      reviewed_by: null,
      reviewed_at: null,
      rejection_reason: null,
      created_at: days(-1),
    },
  ];

  const events: Database["events"] = [
    {
      id: uid(),
      title: "Salon No. 1 — Inaugural Reading",
      description: "An intimate evening of poetry and conversation to open the house. Capacity is deliberately small.",
      date: days(10),
      time: "19:00",
      end_time: "22:00",
      location: "The Salon — West Hollywood (address shared with verified members)",
      capacity: 24,
      image_url: null,
      is_private: true,
      created_by: admin.id,
      created_at: iso,
      updated_at: iso,
    },
    {
      id: uid(),
      title: "Private Dinner: Cellar Night",
      description: "A long-table dinner drawn from the cellar. Seven courses, seven wines, twelve seats.",
      date: days(21),
      time: "20:00",
      end_time: "23:00",
      location: "The Dining Room — West Hollywood",
      capacity: 12,
      image_url: null,
      is_private: true,
      created_by: admin.id,
      created_at: iso,
      updated_at: iso,
    },
    {
      id: uid(),
      title: "Founding Salon — Archive Night",
      description: "A look through the salon's archival materials. Past event.",
      date: days(-14),
      time: "19:00",
      end_time: "21:00",
      location: "The Salon — West Hollywood",
      capacity: 20,
      image_url: null,
      is_private: true,
      created_by: admin.id,
      created_at: iso,
      updated_at: iso,
    },
  ];

  const attendees: Database["attendees"] = [
    { id: uid(), event_id: events[0].id, user_id: m1.id, created_at: iso },
    { id: uid(), event_id: events[0].id, user_id: m2.id, created_at: iso },
    { id: uid(), event_id: events[0].id, user_id: demo.id, created_at: iso },
    { id: uid(), event_id: events[1].id, user_id: m3.id, created_at: iso },
  ];

  const payments: Database["payments"] = [
    {
      id: uid(),
      user_id: demo.id,
      stripe_session_id: null,
      stripe_payment_intent: null,
      amount_cents: 220000,
      currency: "usd",
      status: "completed",
      membership_tier: "Premium",
      paid_at: days(-40),
      expires_at: days(325),
      created_at: days(-40),
    },
    {
      id: uid(),
      user_id: m1.id,
      stripe_session_id: null,
      stripe_payment_intent: null,
      amount_cents: 350000,
      currency: "usd",
      status: "completed",
      membership_tier: "VIP",
      paid_at: days(-90),
      expires_at: days(275),
      created_at: days(-90),
    },
  ];

  const parlors: Database["parlors"] = [
    {
      id: uid(),
      name: "The Salon",
      description: "The heart of the house — a refined space for conversation, reading, and intimate gatherings. Accented with art deco flourishes and seating for members.",
      capacity: 30,
      price_cents: null,
      image_url: null,
      is_active: true,
      created_at: iso,
    },
    {
      id: uid(),
      name: "The Dining Room",
      description: "A long oak table seats sixteen under a vaulted ceiling. Ideal for private dinners, wine tastings, and hosted salons.",
      capacity: 16,
      price_cents: 50000,
      image_url: null,
      is_active: true,
      created_at: iso,
    },
    {
      id: uid(),
      name: "The Cellar",
      description: "Below street level, a stone-walled tasting room with controlled temperature and seating for twelve. Perfect for exclusive wine experiences.",
      capacity: 12,
      price_cents: 75000,
      image_url: null,
      is_active: true,
      created_at: iso,
    },
    {
      id: uid(),
      name: "The Study",
      description: "A quiet retreat with leather chairs, a fireplace, and a curated collection of books and periodicals. Capacity is deliberately small.",
      capacity: 8,
      price_cents: null,
      image_url: null,
      is_active: true,
      created_at: iso,
    },
  ];

  const bookings: Database["bookings"] = [];

  const audit_logs: Database["audit_logs"] = [];

  return {
    users,
    waitlist: [{ id: uid(), email: "earlybird@example.com", created_at: days(-7) }],
    applications,
    tiers,
    events,
    attendees,
    parlors,
    bookings,
    payments,
    audit_logs,
  };
}

async function load(): Promise<Database> {
  if (cache) return cache;
  if (!existsSync(DATA_FILE)) {
    cache = await seed();
    await persist(cache);
    return cache;
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    cache = {
      users: parsed.users ?? [],
      waitlist: parsed.waitlist ?? [],
      applications: parsed.applications ?? [],
      tiers: parsed.tiers ?? [],
      events: parsed.events ?? [],
      attendees: parsed.attendees ?? [],
      parlors: parsed.parlors ?? [],
      bookings: parsed.bookings ?? [],
      payments: parsed.payments ?? [],
      audit_logs: parsed.audit_logs ?? [],
    };
  } catch {
    cache = await seed();
    await persist(cache);
  }
  return cache;
}

async function persist(db: Database): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

function write<T>(mutator: (db: Database) => T): Promise<T> {
  const run = async () => {
    const db = await load();
    const result = mutator(db);
    await persist(db);
    return result;
  };
  const next = writeChain.then(run, run);
  writeChain = next.then(() => undefined, () => undefined);
  return next;
}

export async function getDB(): Promise<Database> {
  return load();
}

export async function resetDB(): Promise<Database> {
  cache = await seed();
  await persist(cache);
  return cache;
}

// ---- users ----
export async function findUserByEmail(email: string) {
  const db = await load();
  return db.users.find((u) => u.email === email.trim().toLowerCase()) ?? null;
}
export async function findUserById(id: string) {
  const db = await load();
  return db.users.find((u) => u.id === id) ?? null;
}
export async function createUser(input: {
  email: string;
  password: string;
  name: string;
  phone?: string | null;
  referral_source?: string | null;
  role?: Database["users"][number]["role"];
}) {
  const hash = await bcrypt.hash(input.password, 10);
  const now = new Date().toISOString();
  const user: Database["users"][number] = {
    id: crypto.randomUUID(),
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    password_hash: hash,
    phone: input.phone ?? null,
    referral_source: input.referral_source ?? null,
    role: input.role ?? "pending",
    membership_tier: null,
    membership_expires_at: null,
    avatar_url: null,
    created_at: now,
    updated_at: now,
  };
  await write((db) => db.users.push(user));
  return user;
}
export async function updateUserRole(
  userId: string,
  role: Database["users"][number]["role"],
  patch: Partial<Database["users"][number]> = {}
) {
  return write((db) => {
    const u = db.users.find((x) => x.id === userId);
    if (!u) return null;
    u.role = role;
    Object.assign(u, patch);
    u.updated_at = new Date().toISOString();
    return u;
  });
}
export async function listMembers() {
  const db = await load();
  return db.users.filter((u) => u.role === "member" || u.role === "admin");
}
export async function listAllUsers() {
  const db = await load();
  return db.users;
}

// ---- waitlist ----
export async function addWaitlistEmail(email: string) {
  const norm = email.trim().toLowerCase();
  if ((await load()).waitlist.some((w) => w.email === norm)) return null;
  const entry = { id: crypto.randomUUID(), email: norm, created_at: new Date().toISOString() };
  await write((db) => db.waitlist.push(entry));
  return entry;
}
export async function listWaitlist() {
  const db = await load();
  return db.waitlist;
}

// ---- applications ----
export async function listApplications(status?: string) {
  const db = await load();
  const apps = status ? db.applications.filter((a) => a.status === status) : db.applications;
  return [...apps].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
export async function getApplication(id: string) {
  const db = await load();
  return db.applications.find((a) => a.id === id) ?? null;
}
export async function createApplication(input: {
  user_id?: string | null;
  full_name: string;
  email: string;
  phone?: string | null;
  referral_source?: string | null;
}) {
  const app: Database["applications"][number] = {
    id: crypto.randomUUID(),
    user_id: input.user_id ?? null,
    full_name: input.full_name,
    email: input.email.trim().toLowerCase(),
    phone: input.phone ?? null,
    referral_source: input.referral_source ?? null,
    status: "pending",
    reviewed_by: null,
    reviewed_at: null,
    rejection_reason: null,
    created_at: new Date().toISOString(),
  };
  await write((db) => db.applications.push(app));
  return app;
}
export async function updateApplicationStatus(
  id: string,
  status: "approved" | "rejected",
  reviewerId: string,
  rejectionReason?: string
) {
  return write((db) => {
    const a = db.applications.find((x) => x.id === id);
    if (!a) return null;
    a.status = status;
    a.reviewed_by = reviewerId;
    a.reviewed_at = new Date().toISOString();
    a.rejection_reason = status === "rejected" ? rejectionReason ?? null : null;
    return a;
  });
}

// ---- tiers ----
export async function listTiers() {
  const db = await load();
  return db.tiers.filter((t) => t.is_active);
}
export async function getTierByName(name: string) {
  const db = await load();
  return db.tiers.find((t) => t.name === name) ?? null;
}

// ---- events ----
export async function listEvents() {
  const db = await load();
  return [...db.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
export async function getEvent(id: string) {
  const db = await load();
  return db.events.find((e) => e.id === id) ?? null;
}
export async function createEvent(input: Omit<Database["events"][number], "id" | "created_at" | "updated_at">) {
  const now = new Date().toISOString();
  const ev: Database["events"][number] = { ...input, id: crypto.randomUUID(), created_at: now, updated_at: now };
  await write((db) => db.events.push(ev));
  return ev;
}
export async function deleteEvent(id: string) {
  await write((db) => {
    db.events = db.events.filter((e) => e.id !== id);
    db.attendees = db.attendees.filter((a) => a.event_id !== id);
  });
}
export async function countAttendees(eventId: string) {
  const db = await load();
  return db.attendees.filter((a) => a.event_id === eventId).length;
}
export async function isAttending(eventId: string, userId: string) {
  const db = await load();
  return db.attendees.some((a) => a.event_id === eventId && a.user_id === userId);
}
export async function listAttendees(eventId: string) {
  const db = await load();
  const ids = db.attendees.filter((a) => a.event_id === eventId).map((a) => a.user_id);
  return db.users.filter((u) => ids.includes(u.id));
}
export async function setRsvp(eventId: string, userId: string, action: "rsvp" | "cancel") {
  return write((db) => {
    const ev = db.events.find((e) => e.id === eventId);
    if (!ev) return { ok: false, count: 0, attending: false };
    const existing = db.attendees.find((a) => a.event_id === eventId && a.user_id === userId);
    if (action === "cancel") {
      db.attendees = db.attendees.filter((a) => !(a.event_id === eventId && a.user_id === userId));
    } else if (!existing) {
      const going = db.attendees.filter((a) => a.event_id === eventId).length;
      if (going >= ev.capacity) return { ok: false, count: going, attending: false };
      db.attendees.push({ id: crypto.randomUUID(), event_id: eventId, user_id: userId, created_at: new Date().toISOString() });
    }
    const count = db.attendees.filter((a) => a.event_id === eventId).length;
    return { ok: true, count, attending: action === "rsvp" };
  });
}

// ---- payments ----
export async function listAllPayments() {
  const db = await load();
  return [...db.payments].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
export async function listPaymentsForUser(userId: string) {
  const db = await load();
  return db.payments
    .filter((p) => p.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
export async function createPayment(input: Omit<Database["payments"][number], "id" | "created_at">) {
  const payment: Database["payments"][number] = { ...input, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  await write((db) => db.payments.push(payment));
  return payment;
}

// ---- parlors ----
export async function listParlors() {
  const db = await load();
  return db.parlors.filter((p) => p.is_active);
}
// ---- bookings ----
export async function listBookingsForUser(userId: string) {
  const db = await load();
  return db.bookings
    .filter((b) => b.user_id === userId && b.status === "confirmed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
export async function isSlotAvailable(parlorId: string, date: string, startTime: string, duration: number) {
  const db = await load();
  const startMin = toMin(startTime);
  const endMin = startMin + duration * 60;
  const day = new Date(date).toISOString().slice(0, 10);
  return !db.bookings.some((b) => {
    if (b.parlor_id !== parlorId || b.status !== "confirmed") return false;
    if (new Date(b.date).toISOString().slice(0, 10) !== day) return false;
    const bStart = toMin(b.start_time);
    const bEnd = toMin(b.end_time);
    return startMin < bEnd && endMin > bStart;
  });
}
export async function createBooking(input: {
  parlor_id: string;
  user_id: string;
  date: string;
  start_time: string;
  duration: number;
}) {
  const startMin = toMin(input.start_time);
  const end = fromMin(startMin + input.duration * 60);
  const booking: Database["bookings"][number] = {
    id: crypto.randomUUID(),
    parlor_id: input.parlor_id,
    user_id: input.user_id,
    date: input.date,
    start_time: input.start_time,
    end_time: end,
    duration: input.duration,
    status: "confirmed",
    created_at: new Date().toISOString(),
  };
  await write((db) => {
    db.bookings.push(booking);
  });
  return booking;
}
// ---- audit ----
export async function logAudit(input: { action: string; admin_id?: string | null; target_id?: string | null; description: string }) {
  const entry = { id: crypto.randomUUID(), action: input.action, admin_id: input.admin_id ?? null, target_id: input.target_id ?? null, description: input.description, created_at: new Date().toISOString() };
  await write((db) => db.audit_logs.push(entry));
  return entry;
}
// ---- helpers ----
function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m ?? 0);
}
function fromMin(min: number): string {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
