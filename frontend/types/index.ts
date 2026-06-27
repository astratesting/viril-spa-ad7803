export type UserRole =
  | "pending"
  | "pending_payment"
  | "member"
  | "admin";

export type ApplicationStatus = "pending" | "approved" | "rejected";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type BookingStatus = "confirmed" | "cancelled";

export interface User {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  phone?: string | null;
  referral_source?: string | null;
  role: UserRole;
  membership_tier?: string | null;
  membership_expires_at?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

export interface MembershipApplication {
  id: string;
  user_id?: string | null;
  full_name: string;
  email: string;
  phone?: string | null;
  referral_source?: string | null;
  status: ApplicationStatus;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  rejection_reason?: string | null;
  created_at: string;
}

export interface MembershipTierRow {
  id: string;
  name: string;
  price_cents: number;
  description: string;
  benefits: string[];
  is_active: boolean;
  created_at: string;
}

export interface EventRow {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  end_time?: string | null;
  location: string;
  capacity: number;
  image_url?: string | null;
  is_private: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EventAttendee {
  id: string;
  user_id: string;
  event_id: string;
  created_at: string;
}

export interface Parlor {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price_cents?: number | null;
  image_url?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ParlorBooking {
  id: string;
  parlor_id: string;
  user_id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: BookingStatus;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  stripe_session_id?: string | null;
  stripe_payment_intent?: string | null;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  membership_tier: string;
  paid_at?: string | null;
  expires_at?: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  action: string;
  admin_id?: string | null;
  target_id?: string | null;
  description: string;
  created_at: string;
}

export interface SessionUser {
  userId: string;
  role: UserRole;
  email: string;
  name: string;
  membership_tier?: string | null;
}

export interface Database {
  users: User[];
  waitlist: WaitlistEntry[];
  applications: MembershipApplication[];
  tiers: MembershipTierRow[];
  events: EventRow[];
  attendees: EventAttendee[];
  parlors: Parlor[];
  bookings: ParlorBooking[];
  payments: Payment[];
  audit_logs: AuditLog[];
}

export const REFERRAL_SOURCES = ["Friend", "Social", "Event", "Other"] as const;

export const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 9; h <= 20; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
})();
