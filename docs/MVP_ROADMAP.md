# Goon MVP Technical Roadmap

> **Document Version**: 2.0  
> **Last Updated**: June 2026  
> **Status**: Pre-build planning  
> **Repository**: [github.com/astratesting/viril-spa-ad7803](https://github.com/astratesting/viril-spa-ad7803)

---

## 1. Executive Summary

**Goon** is an exclusive private members club for high-net-worth (HNW) gay and lesbian individuals, anchored in West Hollywood / Beverly Hills. The club delivers an old European aristocratic luxury experience — the salon returned — combining physical venue access with a curated digital platform for community, events, and concierge services.

This roadmap details the MVP build plan: a full-stack Next.js 15 application backed by Supabase (Auth + PostgreSQL), Stripe subscriptions, Resend transactional email, and PostHog analytics, deployed to Vercel. The MVP targets **200 founding members** across three tiers ($1,200–$3,500/yr), projecting **$480K Year 1 revenue** with a 12:1 LTV:CAC ratio.

---

## 2. Product Vision & Scope

### Vision

Build a digital sanctuary that matches the physical one. Every pixel, permission, and policy reflects discretion, old-world luxury, and the subversive intimacy of a 1920s Parisian salon.

### In-Scope (MVP)

| Feature | Description |
|---------|-------------|
| Membership Management | Three-tier subscriptions (Founding $1,200/yr, Premium $2,200/yr, VIP $3,500/yr) with Stripe billing |
| Invite-Only Signup | Closed registration via admin-issued invitation codes with 7-day expiration |
| Identity Verification | Admin-reviewed vetting: application → document review → approval/rejection |
| Member Profiles | Private profiles with visibility controls and connection management |
| Venue Booking | Hourly/daily booking of venue spaces with availability calendar and conflict detection |
| Event Calendar | Admin-curated events with RSVP tracking, guest counts, waitlists, and reminders |
| Community Forum | Category-based threaded discussions, members-only visibility |
| Admin Panel | Member management, application review, booking oversight, event creation, analytics |
| Payment Processing | Stripe Checkout + Billing with webhook-driven subscription lifecycle |
| Transactional Email | Resend: invitations, booking confirmations, event reminders, receipts |
| Analytics | PostHog for product analytics; Stripe for revenue metrics |

### Out-of-Scope (Post-MVP)

- Mobile native app (iOS/Android)
- Live video / streaming events
- Public marketplace or directory
- Third-party social integration beyond Instagram link
- Physical venue construction — this roadmap covers the digital platform only

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend Framework | **Next.js** | 15 (App Router) | SSR/SSG React framework |
| Language | **TypeScript** | 5.x | Type-safe development |
| Styling | **Tailwind CSS** | 4.x | Utility-first CSS with design tokens |
| Database | **Supabase / PostgreSQL** | 16+ | Relational DB with Auth, Storage, Realtime |
| Authentication | **Supabase Auth** | v2 | PKCE flow, email/password, Row Level Security |
| Payments | **Stripe** | 2024+ API | Checkout Sessions, Billing, Webhooks |
| Email | **Resend** | latest | Transactional email delivery |
| Analytics | **PostHog** | latest | Product analytics, feature flags |
| Hosting | **Vercel** | Pro | Edge deployment, CI/CD |
| Fonts | **Satoshi + Archivo Black** | — | Body + display typography |

### Design Tokens (Bold Frontier)

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#0A0A0B` | Page backgrounds, deep UI surfaces |
| `flame` | `#E8592B` | Primary accent, CTAs |
| `magenta` | `#D42A6E` | Secondary accent, gradients |
| `acid` | `#7DDA5A` | Success states, sparse high-emphasis CTAs |
| `bone` | `#F4F1EC` | Primary text on dark backgrounds |
| `ash` | `#A3A3A3` | Muted secondary text |

---

## 4. Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                              │
│                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────┐     │
│  │  Next.js 15 App Router   │  │     Admin Panel          │     │
│  │  ├─ / (landing)          │  │  ├─ /admin               │     │
│  │  ├─ /dashboard           │  │  ├─ /admin/applications   │     │
│  │  ├─ /dashboard/profile   │  │  ├─ /admin/members       │     │
│  │  ├─ /dashboard/bookings  │  │  ├─ /admin/events        │     │
│  │  ├─ /dashboard/events    │  │  ├─ /admin/parlors       │     │
│  │  ├─ /dashboard/forum     │  │  └─ /admin/payments      │     │
│  │  └─ /dashboard/membership│  │                            │     │
│  └──────────┬───────────────┘  └────────────┬───────────────┘     │
└─────────────┼────────────────────────────────┼────────────────────┘
              │                                │
┌─────────────▼────────────────────────────────▼────────────────────┐
│                     APPLICATION LAYER                              │
│                                                                   │
│  ┌─────────────────────────┐  ┌──────────────────────────────┐   │
│  │  API Route Handlers     │  │  Server Actions / Libs       │   │
│  │  ├─ /api/auth/*         │  │  ├─ lib/auth.ts              │   │
│  │  ├─ /api/profile/*      │  │  ├─ lib/stripe.ts            │   │
│  │  ├─ /api/bookings/*     │  │  ├─ lib/email.ts (Resend)    │   │
│  │  ├─ /api/events/*       │  │  ├─ lib/supabase/server.ts   │   │
│  │  ├─ /api/forum/*        │  │  └─ lib/posthog.ts           │   │
│  │  ├─ /api/admin/*        │  │                               │   │
│  │  ├─ /api/waitlist       │  │  ┌──────────────────────────┐│   │
│  │  └─ /api/webhooks/*     │  │  │  Middleware              ││   │
│  └──────────┬──────────────┘  │  │  ├─ Auth guard           ││   │
│             │                 │  │  ├─ Role enforcement     ││   │
│             │                 │  │  └─ Rate limiting        ││   │
│             │                 │  └──────────────────────────┘│   │
└─────────────┼─────────────────┼──────────────────────────────────┘
              │                 │
┌─────────────▼─────────────────▼──────────────────────────────────┐
│                   DATA & SERVICES LAYER                           │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │  Supabase        │  │  Stripe          │  │  External     │  │
│  │  ├─ PostgreSQL   │  │  ├─ Checkout     │  │  ├─ Resend    │  │
│  │  ├─ Auth (RLS)   │  │  ├─ Billing      │  │  ├─ PostHog   │  │
│  │  ├─ Storage      │  │  ├─ Webhooks     │  │  └─ Vercel    │  │
│  │  └─ Realtime     │  │  └─ Dashboard    │  │     KV/Blob   │  │
│  └──────────────────┘  └──────────────────┘  └───────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow Principles

1. **Server Components first** — fetch data in RSCs; client components receive props, never raw queries
2. **RLS at database layer** — Supabase Row Level Security enforces access, not API route guards alone
3. **Stripe as source of truth** — subscription state lives in Stripe; webhooks sync to `subscriptions` table
4. **PII at rest encrypted** — `members` PII columns encrypted via pgsodium / Supabase Vault
5. **Invite-only gates** — no public registration; signup requires a valid `invitations.code` with expiry

---

## 5. Data Model

### Entity Relationships

```
members ──< membership_tiers
members ──< subscriptions
members ──< invitations (issued_to)
members ──< invitations (issued_by, admin)
members ──< bookings
members ──< event_rsvps
members ──< forum_posts
members ──< forum_comments
members ──< connections (member-member)
members ──< audit_log

events ──< event_rsvps
events ──> venue_spaces (optional)

venue_spaces ──< bookings

forum_posts ──< forum_comments
forum_comments ──< forum_comments (threaded)

waitlist (standalone, pre-signup)
```

### SQL Schema

```sql
-- ============================================================
-- 0. membership_tiers (reference data)
-- ============================================================
CREATE TABLE membership_tiers (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  annual_fee  INTEGER NOT NULL,               -- cents
  benefits    JSONB,
  sort_order  INTEGER DEFAULT 0
);

INSERT INTO membership_tiers (id, name, annual_fee, benefits, sort_order) VALUES
  ('founding', 'Founding Member', 120000, '{"venue":"standard","priority_booking":false,"concierge":false}', 1),
  ('premium',  'Premium',         220000, '{"venue":"extended","priority_booking":true,"concierge":false}',  2),
  ('vip',      'VIP',             350000, '{"venue":"247","priority_booking":true,"concierge":true}',        3);

-- ============================================================
-- 1. members (extends Supabase auth.users)
-- ============================================================
CREATE TABLE members (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now(),
  full_name           TEXT,                    -- PII — encrypt in production
  email               TEXT UNIQUE,
  phone               TEXT,
  date_of_birth       DATE,
  avatar_url          TEXT,
  bio                 TEXT,
  linkedin_url        TEXT,
  instagram_handle    TEXT,
  address_line1       TEXT,
  city                TEXT,
  state               TEXT,
  zip_code            TEXT,
  country             TEXT DEFAULT 'US',
  verification_status TEXT DEFAULT 'unverified',  -- unverified → pending_review → verified → rejected
  verification_notes  TEXT,
  verified_at         TIMESTAMPTZ,
  membership_tier_id  TEXT REFERENCES membership_tiers(id),
  status              TEXT DEFAULT 'provisional',  -- provisional, active, suspended, inactive, banned
  profile_visibility  TEXT DEFAULT 'members_only', -- members_only, connections_only, private
  show_in_directory   BOOLEAN DEFAULT true,
  last_login          TIMESTAMPTZ
);

CREATE INDEX idx_members_tier   ON members(membership_tier_id) WHERE status = 'active';
CREATE INDEX idx_members_status ON members(status);

-- ============================================================
-- 2. invitations
-- ============================================================
CREATE TABLE invitations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),
  expires_at      TIMESTAMPTZ NOT NULL,
  code            TEXT UNIQUE NOT NULL,
  issued_by       UUID REFERENCES members(id),
  issued_to_email TEXT NOT NULL,
  issued_to_name  TEXT,
  tier_offered    TEXT REFERENCES membership_tiers(id),
  status          TEXT DEFAULT 'pending',       -- pending, accepted, expired, revoked
  accepted_by     UUID REFERENCES members(id),
  accepted_at     TIMESTAMPTZ,
  notes           TEXT
);

CREATE INDEX idx_invitations_code  ON invitations(code) WHERE status = 'pending';
CREATE INDEX idx_invitations_email ON invitations(issued_to_email);

-- ============================================================
-- 3. subscriptions (mirrors Stripe state)
-- ============================================================
CREATE TABLE subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id               UUID REFERENCES members(id) ON DELETE CASCADE,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now(),
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT UNIQUE,
  stripe_price_id         TEXT,
  status                  TEXT,                 -- active, past_due, canceled, unpaid, trialing
  tier_id                 TEXT REFERENCES membership_tiers(id),
  current_period_start    TIMESTAMPTZ,
  current_period_end      TIMESTAMPTZ,
  cancel_at_period_end    BOOLEAN DEFAULT false,
  canceled_at             TIMESTAMPTZ
);

CREATE INDEX idx_subscriptions_member ON subscriptions(member_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================================
-- 4. venue_spaces
-- ============================================================
CREATE TABLE venue_spaces (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  name          TEXT NOT NULL,
  description   TEXT,
  capacity      INTEGER,
  amenities     JSONB,
  image_url     TEXT,
  hourly_rate   INTEGER,                        -- cents
  minimum_hours INTEGER DEFAULT 1,
  status        TEXT DEFAULT 'active'           -- active, maintenance, inactive
);

-- ============================================================
-- 5. bookings
-- ============================================================
CREATE TABLE bookings (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now(),
  member_id               UUID REFERENCES members(id) ON DELETE CASCADE,
  venue_space_id          UUID REFERENCES venue_spaces(id) ON DELETE SET NULL,
  event_id                UUID REFERENCES events(id) ON DELETE SET NULL,
  start_time              TIMESTAMPTZ NOT NULL,
  end_time                TIMESTAMPTZ NOT NULL,
  guest_count             INTEGER DEFAULT 1,
  total_amount            INTEGER,              -- cents
  stripe_payment_intent_id TEXT,
  special_requests        TEXT,
  notes                   TEXT,
  status                  TEXT DEFAULT 'confirmed'  -- confirmed, canceled, completed, no_show
);

CREATE INDEX idx_bookings_member ON bookings(member_id);
CREATE INDEX idx_bookings_dates  ON bookings(start_time, end_time);
CREATE INDEX idx_bookings_space  ON bookings(venue_space_id);

-- Conflict prevention
CREATE UNIQUE INDEX idx_bookings_no_overlap
  ON bookings (venue_space_id, start_time, end_time)
  WHERE status = 'confirmed';

-- ============================================================
-- 6. events
-- ============================================================
CREATE TABLE events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  created_by      UUID REFERENCES members(id),
  title           TEXT NOT NULL,
  description     TEXT,
  event_date      TIMESTAMPTZ NOT NULL,
  end_date        TIMESTAMPTZ,
  venue_space_id  UUID REFERENCES venue_spaces(id),
  max_attendees   INTEGER,
  image_url       TEXT,
  is_featured     BOOLEAN DEFAULT false,
  min_tier_id     TEXT REFERENCES membership_tiers(id),
  status          TEXT DEFAULT 'draft'          -- draft, published, canceled, completed
);

CREATE INDEX idx_events_date   ON events(event_date) WHERE status = 'published';
CREATE INDEX idx_events_status ON events(status);

-- ============================================================
-- 7. event_rsvps
-- ============================================================
CREATE TABLE event_rsvps (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT now(),
  member_id     UUID REFERENCES members(id) ON DELETE CASCADE,
  event_id      UUID REFERENCES events(id) ON DELETE CASCADE,
  guest_count   INTEGER DEFAULT 1,
  status        TEXT DEFAULT 'confirmed',       -- confirmed, waitlisted, canceled
  checked_in    BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMPTZ,
  UNIQUE(member_id, event_id)
);

CREATE INDEX idx_rsvps_event  ON event_rsvps(event_id);
CREATE INDEX idx_rsvps_member ON event_rsvps(member_id);

-- ============================================================
-- 8. connections
-- ============================================================
CREATE TABLE connections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT now(),
  requester_id  UUID REFERENCES members(id) ON DELETE CASCADE,
  recipient_id  UUID REFERENCES members(id) ON DELETE CASCADE,
  status        TEXT DEFAULT 'pending',         -- pending, accepted, declined, blocked
  UNIQUE(requester_id, recipient_id),
  CHECK(requester_id != recipient_id)
);

CREATE INDEX idx_connections_requester ON connections(requester_id);
CREATE INDEX idx_connections_recipient ON connections(recipient_id);

-- ============================================================
-- 9. forum_posts
-- ============================================================
CREATE TABLE forum_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  member_id       UUID REFERENCES members(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  content         TEXT NOT NULL,
  category        TEXT,
  is_pinned       BOOLEAN DEFAULT false,
  status          TEXT DEFAULT 'published',     -- published, archived, deleted
  deleted_by      UUID REFERENCES members(id),
  deleted_at      TIMESTAMPTZ,
  likes_count     INTEGER DEFAULT 0,
  comments_count  INTEGER DEFAULT 0
);

CREATE INDEX idx_forum_posts_category ON forum_posts(category) WHERE status = 'published';
CREATE INDEX idx_forum_posts_date     ON forum_posts(created_at DESC);

-- ============================================================
-- 10. forum_comments
-- ============================================================
CREATE TABLE forum_comments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  member_id         UUID REFERENCES members(id) ON DELETE CASCADE,
  forum_post_id     UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES forum_comments(id) ON DELETE CASCADE,
  content           TEXT NOT NULL,
  status            TEXT DEFAULT 'published',   -- published, deleted
  deleted_by        UUID REFERENCES members(id),
  deleted_at        TIMESTAMPTZ
);

CREATE INDEX idx_forum_comments_post ON forum_comments(forum_post_id);

-- ============================================================
-- 11. waitlist
-- ============================================================
CREATE TABLE waitlist (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),
  email           TEXT UNIQUE NOT NULL,
  full_name       TEXT,
  referral_source TEXT,
  tier_interest   TEXT,
  status          TEXT DEFAULT 'pending',       -- pending, invited, converted, declined
  invited_at      TIMESTAMPTZ,
  invitation_id   UUID REFERENCES invitations(id)
);

-- ============================================================
-- 12. audit_log
-- ============================================================
CREATE TABLE audit_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT now(),
  actor_id      UUID REFERENCES members(id),
  action        TEXT NOT NULL,
  resource_type TEXT,
  resource_id   UUID,
  details       JSONB,
  ip_address    INET
);

CREATE INDEX idx_audit_actor    ON audit_log(actor_id);
CREATE INDEX idx_audit_resource ON audit_log(resource_type, resource_id);
CREATE INDEX idx_audit_date     ON audit_log(created_at DESC);
```

### Row Level Security Policies

```sql
ALTER TABLE members        ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE events         ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps    ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections    ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations    ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log      ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist       ENABLE ROW LEVEL SECURITY;

-- ---------- members ----------
CREATE POLICY "members_read_own" ON members FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "members_read_directory" ON members FOR SELECT
  USING (status = 'active' AND show_in_directory = true
    AND profile_visibility IN ('members_only', 'connections_only'));

CREATE POLICY "members_update_own" ON members FOR UPDATE
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "admin_all_members" ON members FOR ALL
  USING (EXISTS (SELECT 1 FROM members m WHERE m.id = auth.uid()
    AND m.status = 'active' AND m.membership_tier_id = 'admin'));

-- ---------- subscriptions ----------
CREATE POLICY "subscriptions_read_own" ON subscriptions FOR SELECT
  USING (member_id = auth.uid());

CREATE POLICY "admin_all_subscriptions" ON subscriptions FOR ALL
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));

-- ---------- bookings ----------
CREATE POLICY "bookings_read_own" ON bookings FOR SELECT
  USING (member_id = auth.uid());

CREATE POLICY "bookings_insert_own" ON bookings FOR INSERT
  WITH CHECK (member_id = auth.uid());

CREATE POLICY "bookings_update_own" ON bookings FOR UPDATE
  USING (member_id = auth.uid());

CREATE POLICY "admin_all_bookings" ON bookings FOR ALL
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));

-- ---------- events ----------
CREATE POLICY "events_read_active_members" ON events FOR SELECT
  USING (status = 'published'
    AND EXISTS (SELECT 1 FROM members WHERE id = auth.uid() AND status = 'active'));

CREATE POLICY "admin_all_events" ON events FOR ALL
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));

-- Tier-gated events
CREATE POLICY "events_tier_gate" ON events FOR SELECT
  USING (min_tier_id IS NULL OR EXISTS (
    SELECT 1 FROM members m JOIN membership_tiers mt ON m.membership_tier_id = mt.id
    WHERE m.id = auth.uid() AND mt.sort_order >=
      (SELECT sort_order FROM membership_tiers WHERE id = events.min_tier_id)
  ));

-- ---------- forum ----------
CREATE POLICY "forum_posts_read_members" ON forum_posts FOR SELECT
  USING (status = 'published'
    AND EXISTS (SELECT 1 FROM members WHERE id = auth.uid() AND status = 'active'));

CREATE POLICY "forum_posts_insert_members" ON forum_posts FOR INSERT
  WITH CHECK (member_id = auth.uid());

CREATE POLICY "forum_posts_update_own" ON forum_posts FOR UPDATE
  USING (member_id = auth.uid());

CREATE POLICY "admin_all_forum_posts" ON forum_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));

CREATE POLICY "forum_comments_read_members" ON forum_comments FOR SELECT
  USING (status = 'published'
    AND EXISTS (SELECT 1 FROM members WHERE id = auth.uid() AND status = 'active'));

CREATE POLICY "forum_comments_insert_members" ON forum_comments FOR INSERT
  WITH CHECK (member_id = auth.uid());

CREATE POLICY "admin_all_forum_comments" ON forum_comments FOR ALL
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));

-- ---------- invitations (admin only) ----------
CREATE POLICY "admin_all_invitations" ON invitations FOR ALL
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));

-- ---------- waitlist (admin reads; anon inserts via API) ----------
CREATE POLICY "admin_all_waitlist" ON waitlist FOR ALL
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));

-- ---------- audit_log (admin reads only; system inserts) ----------
CREATE POLICY "admin_read_audit" ON audit_log FOR SELECT
  USING (EXISTS (SELECT 1 FROM members WHERE id = auth.uid()
    AND membership_tier_id = 'admin'));
```

---

## 6. Security Architecture

### Principles

> **Discretion is the product.** Every security decision must err on the side of privacy.

### PII Encryption

- `members.full_name`, `members.email`, `members.phone`, `members.date_of_birth`, `members.address_line1` encrypted at rest via pgsodium / Supabase Vault
- Decryption keys never leave the database; encryption performed via `pgsodium.crypto_secretbox_*` functions
- API routes receive decrypted values only after RLS check passes

### Invite-Only Signup Flow

```
Admin issues invitation → Resend delivers invite email → Prospective member clicks link
  → Signup page (pre-filled with code) → Supabase Auth signup → Account created as provisional
```

1. Admin creates invitation via `POST /api/admin/invitations`
2. Resend delivers email with unique 16-char alphanumeric code (7-day expiry)
3. Prospective member visits `/signup?code={code}`
4. Signup form validates code against `invitations` table (pending, not expired)
5. On success: `invitations.status = 'accepted'`, `members` row created, verification pipeline triggered
6. Invalid/expired codes → error; no account creation

### Role-Based Access Control

| Role | Permissions |
|------|------------|
| `unverified` | Dashboard limited to profile completion + verification submission |
| `member` (active, any tier) | Full dashboard, bookings, events, forum |
| `moderator` | Member + forum moderation |
| `admin` | Full CRUD, invitation management, analytics, member status changes |

### Private Profiles

- `profile_visibility`: `members_only` → `connections_only` → `private`
- `show_in_directory` flag controls directory listing
- Connection requests require mutual acceptance

### Audit Trail

- `audit_log` captures every state-changing action: who, what, when, from which IP
- Retention: 12 months
- Immutable: no UPDATE or DELETE policies for non-admin roles

### Rate Limiting

- `POST /api/auth/signup`: 3 per hour per IP
- `POST /api/waitlist`: 5 per hour per IP
- Admin endpoints: 100 per minute per authenticated session

---

## 7. Core Features

### 7.1 Membership Management

| Tier | Price | Key Benefits |
|------|-------|-------------|
| **Founding Member** | $1,200/yr | Core venue access, all member events |
| **Premium** | $2,200/yr | Extended hours, priority booking, premium events, guest passes |
| **VIP** | $3,500/yr | 24/7 venue access, personal concierge, exclusive VIP salons, +3 guest passes |

- Stripe Checkout for initial subscription; Customer Portal for payment methods
- Prorated upgrades; downgrade at period end; cancellation with period-end processing
- Resend emails: welcome, receipt, renewal reminders (30/7/1 days), cancellation confirmation

### 7.2 Event Booking & RSVP

- Admin-created events with tier-gating (`min_tier_id`)
- Members browse published events, submit RSVPs with guest count
- RSVP waitlist when event is full; auto-promoted on cancellation
- RSVP reminders via Resend at 48h and 2h before event
- Check-in at event via admin panel

### 7.3 Member Vetting & Verification

```
Waitlist → Invitation → Signup → Profile Completion → Document Upload
  → Admin Review → Approval/Rejection → Stripe Checkout → Active Member
```

### 7.4 Community Forum

- Categories: General, Events, Travel & Recommendations, Introductions
- Threaded comments (post → comments → replies)
- Like system (count only); self-moderation on own content
- Members-only visibility; admin archive/delete/pin

### 7.5 Admin Panel

- **Dashboard**: High-level metrics, PostHog embed
- **Applications**: Identity verification review queue
- **Members**: Directory, search, status management, tier changes
- **Invitations**: Issue, revoke, track redemption
- **Parlors**: Venue space CRUD, availability calendar
- **Bookings**: Overview, conflict resolution
- **Events**: Create/edit/publish, RSVP oversight
- **Forum**: Moderation queue
- **Payments**: Stripe Dashboard embed, subscription overview

---

## 8. API Endpoints

### 8.1 Authentication

```
POST   /api/auth/signup              # email, password, invitation_code
POST   /api/auth/login               # email, password
POST   /api/auth/logout              # session invalidation
POST   /api/auth/reset-password      # trigger reset email
PUT    /api/auth/reset-password      # token, new_password
GET    /api/auth/session             # current session + member data
```

**Example: `POST /api/auth/signup`**

```typescript
// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  invitation_code: z.string().length(16),
});

export async function POST(req: NextRequest) {
  const body = schema.parse(await req.json());
  const supabase = createRouteHandlerClient({ cookies });

  const { data: invitation } = await supabase
    .from("invitations")
    .select("id, expires_at, status, tier_offered")
    .eq("code", body.invitation_code).eq("status", "pending").single();

  if (!invitation || new Date(invitation.expires_at) < new Date()) {
    return NextResponse.json({ error: "Invalid or expired invitation code." }, { status: 403 });
  }

  const { data: auth, error } = await supabase.auth.signUp({
    email: body.email, password: body.password,
    options: { emailRedirectTo: `${req.nextUrl.origin}/dashboard` },
  });

  if (error || !auth.user) {
    return NextResponse.json({ error: error?.message || "Signup failed." }, { status: 400 });
  }

  await supabase.from("members").insert({
    id: auth.user.id, email: body.email,
    membership_tier_id: invitation.tier_offered,
    verification_status: "pending_review", status: "provisional",
  });

  await supabase.from("invitations").update({
    status: "accepted", accepted_by: auth.user.id, accepted_at: new Date().toISOString(),
  }).eq("id", invitation.id);

  await supabase.from("audit_log").insert({
    actor_id: auth.user.id, action: "member.created",
    resource_type: "member", resource_id: auth.user.id,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
```

### 8.2 Members & Profile

```
GET    /api/members                   # directory (paginated, tier/status filters)
GET    /api/members/[id]              # single member profile
PUT    /api/profile                   # update own profile
POST   /api/profile/verify            # submit verification documents
GET    /api/profile/verification      # check verification status
POST   /api/connections               # send connection request
PUT    /api/connections/[id]          # accept/decline connection
DELETE /api/connections/[id]          # remove connection
```

### 8.3 Invitations (Admin)

```
GET    /api/admin/invitations          # list all invitations
POST   /api/admin/invitations          # create new invitation(s)
PUT    /api/admin/invitations/[id]     # update status (revoke)
DELETE /api/admin/invitations/[id]     # delete (if still pending)
```

**Example: `POST /api/admin/invitations`**

```typescript
// app/api/admin/invitations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
const INVITE_EXPIRY_DAYS = 7;

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: member } = await supabase.from("members")
    .select("membership_tier_id").eq("id", session.user.id).single();
  if (member?.membership_tier_id !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { emails, tier_offered, notes } = await req.json();
  const results = [];

  for (const email of emails) {
    const code = randomBytes(8).toString("hex");

    await supabase.from("invitations").insert({
      code, issued_by: session.user.id, issued_to_email: email,
      tier_offered: tier_offered || "founding",
      expires_at: new Date(Date.now() + INVITE_EXPIRY_DAYS * 86400000).toISOString(), notes,
    });

    await resend.emails.send({
      from: "GOON <invitations@goon.club>", to: email,
      subject: "You are invited — GOON",
      html: `<p>An invitation to join GOON awaits.</p>
<p><a href="${process.env.NEXT_PUBLIC_URL}/signup?code=${code}">Claim your invitation</a></p>
<p>Expires in ${INVITE_EXPIRY_DAYS} days.</p>`,
    });

    results.push({ email, code });
  }

  return NextResponse.json({ invitations: results }, { status: 201 });
}
```

### 8.4 Events

```
GET    /api/events                    # list published events (filter: upcoming, featured)
GET    /api/events/[id]               # event detail with RSVP count
POST   /api/admin/events              # create event (admin)
PUT    /api/admin/events/[id]         # update event
DELETE /api/admin/events/[id]         # delete event
POST   /api/events/rsvp               # { event_id, guest_count }
PUT    /api/events/rsvp/[id]          # update RSVP (change guest count, cancel)
GET    /api/events/[id]/rsvps         # admin: list RSVPs for event
```

### 8.5 Bookings

```
GET    /api/bookings                  # member's bookings
GET    /api/bookings/[id]             # single booking
POST   /api/bookings                  # create booking
PUT    /api/bookings/[id]             # update booking
DELETE /api/bookings/[id]             # cancel booking
GET    /api/bookings/availability     # ?venue_space_id&date=YYYY-MM-DD → time slots
```

**Example: `POST /api/bookings`**

```typescript
// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { venue_space_id, start_time, end_time, guest_count, special_requests } = await req.json();

  // Conflict check
  const { data: conflicts } = await supabase.from("bookings")
    .select("id").eq("venue_space_id", venue_space_id)
    .eq("status", "confirmed").lt("start_time", end_time).gt("end_time", start_time);

  if (conflicts?.length) {
    return NextResponse.json({ error: "Space already booked for this time." }, { status: 409 });
  }

  const { data: space } = await supabase.from("venue_spaces")
    .select("hourly_rate, minimum_hours").eq("id", venue_space_id).single();

  const hours = Math.max(space.minimum_hours || 1,
    Math.ceil((new Date(end_time).getTime() - new Date(start_time).getTime()) / 3600000));
  const total_amount = hours * space.hourly_rate;

  const { data: booking, error } = await supabase.from("bookings").insert({
    member_id: session.user.id, venue_space_id, start_time, end_time,
    guest_count: guest_count || 1, total_amount,
    special_requests: special_requests || "", status: "confirmed",
  }).select("id").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("audit_log").insert({
    actor_id: session.user.id, action: "booking.created",
    resource_type: "booking", resource_id: booking.id,
  });

  return NextResponse.json({ booking_id: booking.id, total_amount }, { status: 201 });
}
```

### 8.6 Community (Forum)

```
GET    /api/forum/posts               # paginated posts, filter by category
GET    /api/forum/posts/[id]          # post with comments
POST   /api/forum/posts               # create post
PUT    /api/forum/posts/[id]          # edit own post
DELETE /api/forum/posts/[id]          # delete own post
POST   /api/forum/posts/[id]/comments # add comment
DELETE /api/forum/comments/[id]       # delete own comment
```

### 8.7 Admin

```
GET    /api/admin/applications        # verification queue
PUT    /api/admin/applications/[id]   # approve/reject/request_more
GET    /api/admin/members             # member directory with filters
PUT    /api/admin/members/[id]        # update tier, status, notes
GET    /api/admin/analytics           # aggregate metrics
GET    /api/admin/audit               # audit log with filters
```

### 8.8 Waitlist & Webhooks

```
POST   /api/waitlist                  # { email, full_name, referral_source, tier_interest }
GET    /api/waitlist/count            # public: waitlist count
POST   /api/webhooks/stripe           # Stripe webhook receiver
```

---

## 9. Payment Processing

### Stripe Integration Architecture

```
Browser → POST /api/payments/checkout → Stripe Checkout Session created
  → Redirect to Stripe Checkout → Payment complete
  → Stripe Webhook POST /api/webhooks/stripe → Sync subscriptions + audit_log
```

### Webhook Events Handled

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create/update `subscriptions` row, mark member `active`, send welcome email |
| `customer.subscription.updated` | Sync status, period dates, `cancel_at_period_end` |
| `customer.subscription.deleted` | Set `canceled`, downgrade member status |
| `invoice.payment_succeeded` | Log payment in audit_log, send receipt via Resend |
| `invoice.payment_failed` | Set `past_due`, send failure email, retry after 3/7 days |
| `customer.subscription.trial_will_end` | Send trial ending reminder |

**Webhook Handler:**

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase.from("subscriptions").upsert({
        stripe_customer_id: sub.customer as string,
        stripe_subscription_id: sub.id,
        status: sub.status,
        current_period_start: new Date(sub.current_period_start! * 1000).toISOString(),
        current_period_end: new Date(sub.current_period_end! * 1000).toISOString(),
        cancel_at_period_end: sub.cancel_at_period_end,
      }, { onConflict: "stripe_subscription_id" });
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase.from("subscriptions").update({
        status: "canceled", canceled_at: new Date().toISOString(),
      }).eq("stripe_subscription_id", sub.id);
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      await supabase.from("audit_log").insert({
        action: "payment.succeeded", resource_type: "invoice", resource_id: invoice.id,
        details: { amount_paid: invoice.amount_paid, currency: invoice.currency },
      });
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.customer_email) {
        await resend.emails.send({
          from: "GOON <billing@goon.club>", to: invoice.customer_email,
          subject: "Payment failed — GOON",
          html: "<p>Your latest membership payment could not be processed.</p>",
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

---

## 10. Deployment Strategy

### Infrastructure

| Service | Plan | Purpose |
|---------|------|---------|
| Vercel | Pro | Next.js hosting, edge functions, CI/CD |
| Supabase | Pro | PostgreSQL, Auth, Storage, Realtime |
| Stripe | Live | Payment processing |
| Resend | Growth | Transactional email |
| PostHog | Cloud Free | Product analytics |

### Environments

| Environment | URL | Supabase | Stripe |
|-------------|-----|----------|--------|
| Local | `localhost:3000` | Local Supabase CLI | Test mode |
| Preview | `*.vercel.app` | Staging project | Test mode |
| Staging | `staging.goon.club` | Staging project | Test mode |
| Production | `goon.club` | Production project | Live mode |

### CI/CD (Vercel + GitHub)

```
Git Push → GitHub
  ├─ Feature branch → Vercel Preview Deploy (automatic)
  │   └─ Preview URL comment on PR
  ├─ main → Vercel Staging Deploy (automatic)
  │   └─ Run integration tests
  └─ Production → Manual promotion through Vercel
      └─ Post-deploy health check
```

### Deployment Checklist

- [ ] All environment variables set in Vercel dashboard
- [ ] Supabase RLS policies enabled on all tables
- [ ] Stripe webhook endpoint registered and verified
- [ ] Stripe live keys swapped, test mode disabled
- [ ] Resend domain verified (`goon.club`)
- [ ] PostHog project created, API key configured
- [ ] Custom domain DNS configured and SSL active
- [ ] Rate limiting middleware active
- [ ] Error monitoring configured (Sentry or Vercel Logs)
- [ ] Supabase daily backups enabled
- [ ] `robots.txt` restricts crawlers on `/admin/*`, `/api/*`
- [ ] Lighthouse score > 90 on landing page

---

## 11. Six-Round Sprint Plan

### Round 1: Foundation & Auth (Days 1–3)

| # | Task | Duration |
|---|------|----------|
| 1.1 | Initialize Next.js 15 project with App Router, TypeScript, Tailwind CSS 4 | 2h |
| 1.2 | Integrate Bold Frontier design tokens into Tailwind config | 1h |
| 1.3 | Set up Supabase project, generate types, configure `@supabase/ssr` | 2h |
| 1.4 | Run database migration: all 12 tables + indexes + RLS policies | 3h |
| 1.5 | Landing page (`/`): Hero, Vision, FAQ, WaitlistForm, Footer | 4h |
| 1.6 | Auth routes: signup, login, logout, session | 4h |
| 1.7 | Middleware: session guard for `/dashboard/*`, `/admin/*` | 2h |
| 1.8 | Shared UI components: Button, Card, Badge, Input, Modal, Toast | 4h |
| 1.9 | Environment config (`.env.example`, Vercel env vars) | 1h |
| 1.10 | Deploy to Vercel (preview), verify landing + auth | 1h |

**Key Files:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `lib/supabase/*.ts`, `lib/auth.ts`, `middleware.ts`, `app/api/auth/*`, `components/ui/*.tsx`, `components/Hero.tsx`, `components/Vision.tsx`, `components/WaitlistForm.tsx`, `components/FAQ.tsx`, `components/Footer.tsx`

### Round 2: Dashboard & Profiles (Days 4–6)

| # | Task | Duration |
|---|------|----------|
| 2.1 | Dashboard layout: sidebar nav, header, member greeting | 3h |
| 2.2 | Dashboard home: member stats, upcoming bookings, event previews | 4h |
| 2.3 | Profile page: view/edit form, avatar upload to Supabase Storage | 4h |
| 2.4 | Privacy controls: `profile_visibility`, `show_in_directory` toggles | 2h |
| 2.5 | Verification submission: document upload, status check | 3h |
| 2.6 | `GET/PUT /api/profile`, `POST /api/profile/verify` | 3h |
| 2.7 | Member directory: paginated, tier-filtered list | 3h |
| 2.8 | Membership page: tier comparison, upgrade/downgrade button | 3h |
| 2.9 | `GET /api/members`, `GET /api/members/[id]` | 2h |

**Key Files:** `app/dashboard/layout.tsx`, `app/dashboard/page.tsx`, `app/dashboard/profile/page.tsx`, `app/dashboard/directory/page.tsx`, `app/dashboard/membership/page.tsx`, `components/ProfileForm.tsx`, `components/MembershipCard.tsx`, `components/layout/Sidebar.tsx`, `components/layout/Navbar.tsx`, `app/api/profile/*`, `app/api/members/*`

### Round 3: Events + RSVP + Payments (Days 7–9)

| # | Task | Duration |
|---|------|----------|
| 3.1 | Stripe SDK integration: `lib/stripe.ts` | 2h |
| 3.2 | Checkout session creation for tier subscriptions | 4h |
| 3.3 | Stripe webhook handler (all events) | 4h |
| 3.4 | Events list page with date filters | 3h |
| 3.5 | Event detail page: description, RSVP button, attendee list | 3h |
| 3.6 | RSVP create/cancel API | 3h |
| 3.7 | `GET/POST /api/events`, `GET /api/events/[id]` | 2h |
| 3.8 | Resend: welcome email, booking confirmation, event reminders | 3h |
| 3.9 | Admin events CRUD | 3h |

**Key Files:** `lib/stripe.ts`, `lib/email.ts`, `app/api/payments/checkout/route.ts`, `app/api/webhooks/stripe/route.ts`, `app/dashboard/events/page.tsx`, `app/dashboard/events/[id]/page.tsx`, `app/api/events/*`, `app/api/admin/events/*`, `components/EventCard.tsx`, `components/EventRsvpButton.tsx`

### Round 4: Community Features (Days 10–12)

| # | Task | Duration |
|---|------|----------|
| 4.1 | Forum listing: categories, paginated posts | 4h |
| 4.2 | Forum post detail: post + threaded comments | 4h |
| 4.3 | Create post form, comment form | 3h |
| 4.4 | Forum CRUD API | 3h |
| 4.5 | Connections: send/accept/decline | 3h |
| 4.6 | Connections API | 2h |
| 4.7 | Admin members: search, filter, status changes | 4h |
| 4.8 | Admin members API | 2h |
| 4.9 | Admin forum moderation | 2h |

**Key Files:** `app/dashboard/forum/page.tsx`, `app/dashboard/forum/[id]/page.tsx`, `app/api/forum/*`, `app/api/connections/*`, `app/api/admin/members/*`, `app/admin/members/page.tsx`, `components/ForumPost.tsx`, `components/CommentSection.tsx`

### Round 5: Booking System (Days 13–15)

| # | Task | Duration |
|---|------|----------|
| 5.1 | Venue spaces listing with space cards | 3h |
| 5.2 | Availability calendar: date picker, time slots, conflict visualization | 4h |
| 5.3 | Booking creation flow: space → time → confirm | 5h |
| 5.4 | Booking CRUD API + availability endpoint | 3h |
| 5.5 | My Bookings page: history, upcoming, cancel | 3h |
| 5.6 | Admin parlor CRUD | 2h |
| 5.7 | Admin bookings overview | 3h |
| 5.8 | Admin API endpoints for parlors and bookings | 2h |

**Key Files:** `app/dashboard/bookings/page.tsx`, `app/dashboard/parlors/page.tsx`, `app/api/bookings/*`, `app/api/admin/parlors/*`, `app/admin/parlors/page.tsx`, `app/admin/bookings/page.tsx`, `components/BookingCalendar.tsx`, `components/VenueCard.tsx`

### Round 6: Polish, QA & Deploy (Days 16–18)

| # | Task | Duration |
|---|------|----------|
| 6.1 | Cross-browser testing (Chrome, Safari, Firefox) | 2h |
| 6.2 | Mobile responsive audit | 2h |
| 6.3 | Performance: image optimization, lazy loading, font subsetting | 3h |
| 6.4 | Lighthouse audit: >90 Performance, >95 Accessibility | 2h |
| 6.5 | Security audit: RLS policies, PII encryption, webhook signatures | 3h |
| 6.6 | Rate limiting on auth/waitlist endpoints | 2h |
| 6.7 | Error boundary implementation | 2h |
| 6.8 | PostHog instrumentation: page views, events, conversions | 3h |
| 6.9 | Final environment variable audit | 1h |
| 6.10 | Production deployment + smoke test | 2h |
| 6.11 | Documentation: runbook, API docs, environment setup guide | 6h |

**Key Files:** E2E test suites, `lib/posthog.ts`, error boundary components, deployment runbook

---

## 12. Timeline & Milestones

| Week | Days | Rounds | Milestones | Key Metrics |
|------|------|--------|------------|-------------|
| **Week 1** | 1–6 | R1–R2 | Auth live, dashboard accessible, profiles functional | Auth success >98%, dashboard load <1.5s |
| **Week 2** | 7–12 | R3–R4 | Stripe integration live, events + RSVPs working, forum active | Payment success >99%, first 10 forum posts |
| **Week 3** | 13–18 | R5–R6 | Booking system live, full admin panel, production deployed | All CRUD functional, zero critical bugs |
| **Launch** | Day 18 | — | **MVP GO-LIVE** | — |
| **Post-Launch** | Week 4+ | — | Monitor, iterate, invitation rollout | 200 founding members, $480K ARR |

---

## 13. Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| R1 | Identity verification bottleneck — manual review cannot scale | Medium | High | Pre-built checklist; auto-flag obvious rejections; hire part-time reviewer at 50+ apps |
| R2 | Stripe webhook delivery failure — subscription state drifts | Low | Critical | Idempotent handler; daily reconcile job; Stripe Dashboard as fallback |
| R3 | Low invitation redemption | Medium | High | Compelling email copy; 7-day urgency; personal follow-up on unclaimed |
| R4 | Data privacy incident — RLS misconfiguration | Low | Critical | Pre-launch RLS audit; pgsodium encryption; third-party security review |
| R5 | Performance degradation under load | Medium | Medium | Database indexing; edge caching; Vercel ISR for static pages |
| R6 | Payment disputes / chargebacks | Low | High | Clear terms at checkout; excellent CX; proactive billing communication |

---

## 14. Success Metrics

### Business Metrics

| Metric | Target |
|--------|--------|
| Founding Members (Year 1) | 200 |
| Year 1 Revenue | $480K |
| Waitlist → Member Conversion | 15% |
| Annual Renewal Rate | 90% |
| Average Revenue Per User | $2,400 |

### Product Usage Metrics

| Metric | Target |
|--------|--------|
| Daily Active Users (% of members) | >50% |
| Monthly Venue Bookings (Month 3) | 150+ |
| Forum Engagement (Month 1) | 300+ posts |
| Event RSVP → Attendance | 75% |

### Technical Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | <2s all pages |
| Uptime | 99.9% monthly |
| Auth Success Rate | >98% |
| Payment Processing Success | >99% |

---

## 15. Design System Integration

### Bold Frontier Palette

The landing page and all dashboard/UI components use the Bold Frontier design system:

```
ink     #0A0A0B  →  Backgrounds, deep surfaces
flame   #E8592B  →  Primary CTAs, links, interactive accents
magenta #D42A6E  →  Gradient stops, secondary accents, hover states
acid    #7DDA5A  →  Success indicators, sparse high-emphasis actions
bone    #F4F1EC  →  Primary text on dark backgrounds
ash     #A3A3A3  →  Muted text, disabled states, borders
```

### Typography

- **Archivo Black** — Display headlines, hero wordmarks, page titles
- **Satoshi** — Body text, forms, navigation, labels, UI

### Component Patterns

- Cards: `border border-ink-line` with hover transition to `border-flame/50`
- CTAs: `bg-acid text-ink` with `acid-glow` for primary, `border border-bone/25` for secondary
- Dividers: `salon-divider` (horizontal gradient rule)
- Gradient text: `text-flame-gradient` (flame → magenta linear gradient)

### The landing page and design system must remain intact throughout the build. No other existing pages should be restyled.

---

## 16. Environment Variables

```bash
# ── Supabase ──────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...          # Server-side only

# ── Stripe ────────────────────────────────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (from Stripe Dashboard)
STRIPE_PRICE_FOUNDING=price_xxxxx
STRIPE_PRICE_PREMIUM=price_xxxxx
STRIPE_PRICE_VIP=price_xxxxx

# ── Resend ────────────────────────────────────
RESEND_API_KEY=re_...

# ── PostHog ───────────────────────────────────
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com

# ── App ───────────────────────────────────────
NEXT_PUBLIC_URL=https://goon.club          # Canonical URL
NEXT_PUBLIC_SITE_NAME=GOON

# ── Analytics (optional) ─────────────────────
NEXT_PUBLIC_GA_ID=G-...                    # Google Analytics
```

---

*Document Version: 2.0 — Last Updated: June 2026*