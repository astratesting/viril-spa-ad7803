# Goon MVP Technical Roadmap

**Document Version:** 1.0  
**Last Updated:** June 27, 2026  
**Status:** Draft — Planning Phase  

---

## 1. Executive Summary

Goon is an exclusive private members club for high-net-worth (HNW) gay and lesbian individuals, located in West Hollywood / Beverly Hills. We are building a comprehensive digital platform to power membership management, venue booking, event curation, community engagement, and secure payment processing — all behind an invitation-only gate.

This roadmap outlines the 6-week sprint plan to deliver a production-ready MVP.

**Market Context:**
- TAM for private social clubs projected at $18.7B by 2030
- West Hollywood population ~36K with ~40% identifying as LGBTQ+
- No direct competitor combining luxury venue + LGBTQ+ exclusivity in the WeHo/BH corridor
- 68% of gay men willing to pay 20%+ premium for gender-congruent, curated providers

**MVP Targets:**
- 200 founding members by end of Year 1
- Revenue target: $480K ARR
- Membership tiers: Basic $1,200/yr · Premium $2,200/yr · VIP $3,500/yr
- CAC estimate: $280–$420; LTV:CAC ratio 12:1

---

## 2. Product Vision & Scope

### Vision Statement

Goon's digital platform extends the club's physical exclusivity into the digital realm. Members authenticate, book venue spaces, RSVP to curated events, participate in the community forum, and manage their memberships — all within a private, invitation-only application. The platform is the bridge between old-world aristocratic luxury and modern digital discretion.

### MVP Features (In-Scope)

| Category | Features |
|----------|----------|
| **Auth & Onboarding** | Magic link email auth via Supabase Auth; application intake form with vetting pipeline; session management via `@supabase/ssr` |
| **Member Dashboard** | Personalized dashboard greeting; profile management; membership tier selection; payment history; opt-in member directory |
| **Venue Booking** | 4 bookable venue spaces with real-time availability; hourly/daily booking; special request field; booking history |
| **Event Calendar** | Curated event listings; RSVP with guest count; event detail pages; cancellation flow; admin event creation |
| **Community Forum** | Category-based threads; post/comment creation; soft moderation flags; search and filter |
| **Admin Panel** | Member application review; member management; event creation; venue space management; analytics overview |
| **Payments** | Stripe Checkout for tier subscriptions; Stripe Billing for recurring charges; webhook handler for lifecycle events |

### Out-of-Scope (Post-MVP)

- Native mobile apps (iOS/Android)
- Third-party social integrations (Instagram API, etc.)
- Video/virtual event streaming
- External CRM or marketing automation
- White-label partner portals
- Public blog or content marketing engine

### Target Users

| Persona | Description |
|---------|-------------|
| **Founding Member** | HNW gay or lesbian individual in LA metro. Seeks aristocratic social space. Wants discretion, peer community, and old-world luxury. Willing to pay premium. |
| **Club Admin** | Goon operations staff. Reviews applications, manages events, oversees bookings, moderates forum. Needs efficient workflows. |
| **Prospective Applicant** | Interested HNW individual who has received an invitation link. Submits application and awaits vetting. |

---

## 3. Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 (App Router) | SSR, streaming, server components, edge-ready |
| **Language** | TypeScript (strict mode) | Type safety across full stack |
| **Styling** | Tailwind CSS 4 | Utility-first with the Bold Frontier design token extension |
| **Backend & DB** | Supabase (PostgreSQL) | Managed Postgres with built-in auth, realtime, RLS |
| **Authentication** | Supabase Auth — magic link only | Passwordless, matches luxury/discretion brand; no social logins |
| **Session Mgmt** | `@supabase/ssr` | Cookie-based session across client/server/middleware |
| **Payments** | Stripe | Checkout, Billing, Invoices, Webhooks |
| **Email** | Resend | Transactional emails (magic link, booking confirmations, event reminders) |
| **Analytics** | PostHog (self-hosted option) | Privacy-respecting product analytics |
| **Icons** | Lucide React | Lightweight, consistent icon set |
| **Typography** | Satoshi (body) + Archivo Black (headlines) | Bold Frontier archetype; Fontshare + Google Fonts |
| **Hosting** | Vercel | Edge-optimized for Next.js, preview deployments, analytics |
| **Package Manager** | pnpm | Fast, disk-efficient |

### Design Token Reference

```
--color-ink:        #0A0A0B   (near-black backgrounds)
--color-charcoal:   #1C1C1E   (section backgrounds)
--color-flame:      #FF5A00   (flame orange — primary accent)
--color-magenta:    #E6007A   (vivid magenta — secondary accent)
--color-acid:       #39FF14   (acid green — CTA highlights)
--color-bone:       #F5F0EB   (primary text on dark)
--color-ash:        #A3A3A3   (muted text)
--font-satoshi:     Satoshi, system-ui, sans-serif
--font-archivo:     Archivo Black, system-ui, sans-serif
```

---

## 4. Architecture Overview

### Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                          EDGE (Vercel)                               │
│                                                                      │
│  ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌─────────────┐       │
│  │  Landing │  │  Member   │  │   Admin   │  │  Auth Flow  │       │
│  │   Page   │  │ Dashboard │  │   Panel   │  │  /signup    │       │
│  │    /     │  │/dashboard │  │  /admin   │  │  /login     │       │
│  └────┬─────┘  └─────┬─────┘  └─────┬─────┘  └──────┬──────┘       │
│       │              │              │                │               │
│       ▼              ▼              ▼                ▼               │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │                   Next.js 15 App Router                   │      │
│  │                                                          │      │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────┐   │      │
│  │  │  Server    │  │   Route    │  │  Server Actions  │   │      │
│  │  │ Components │  │  Handlers  │  │  (mutations)     │   │      │
│  │  └────────────┘  └────────────┘  └──────────────────┘   │      │
│  └──────────────────────────┬───────────────────────────────┘      │
│                             │                                      │
└─────────────────────────────┼──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         SERVICES                                     │
│                                                                      │
│  ┌───────────────────┐  ┌──────────────┐  ┌─────────────────┐      │
│  │    Supabase       │  │    Stripe    │  │    Resend       │      │
│  │                   │  │              │  │                 │      │
│  │  • Auth (magic)   │  │  • Checkout  │  │  • Magic links  │      │
│  │  • PostgreSQL     │  │  • Billing   │  │  • Booking conf │      │
│  │  • RLS Policies   │  │  • Webhooks  │  │  • Event alerts │      │
│  │  • Realtime       │  │  • Invoices  │  │                 │      │
│  └───────────────────┘  └──────────────┘  └─────────────────┘      │
│                                                                      │
│  ┌──────────────┐  ┌─────────────────────────────────────────┐     │
│  │   PostHog    │  │              Vercel                      │     │
│  │   Analytics  │  │  • Preview Deployments  • Edge Caching  │     │
│  └──────────────┘  └─────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **No Clerk.** Supabase Auth with magic link only. Passwordless = brand-aligned. No third-party auth UI dependency.
2. **`@supabase/ssr`** for session management. Handles cookie-based auth in middleware, server components, route handlers, and client components.
3. **Row Level Security (RLS)** on all user-facing tables. Auth uid = profile id enforcement at the database level.
4. **Server Components by default.** Client components only where interactivity (forms, modals, realtime) requires it.
5. **Stripe webhooks** processed in a dedicated route handler. Stripe is the source of truth for subscription state.
6. **No `dynamic = 'error'`.** The landing page remains static. All dashboard routes are dynamic by default (cookies/headers access).

---

## 5. Database Schema

All tables live in the Supabase-managed PostgreSQL instance. RLS policies are defined per table. Auth users are managed by `auth.users` (Supabase built-in).

### 5.1 Profiles

```sql
CREATE TABLE public.profiles (
  id               UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name        TEXT,
  email            TEXT UNIQUE,
  avatar_url       TEXT,
  bio              TEXT,
  linkedin_url     TEXT,
  phone            TEXT,
  application_status TEXT NOT NULL DEFAULT 'none',
    -- 'none' | 'pending' | 'under_review' | 'approved' | 'rejected'
  membership_tier  TEXT,
    -- 'basic' | 'premium' | 'vip'
  member_since     TIMESTAMPTZ,
  is_admin         BOOLEAN NOT NULL DEFAULT FALSE,
  last_login_at    TIMESTAMPTZ
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5.2 Applications

The member vetting pipeline. Submitted after profile creation.

```sql
CREATE TABLE public.applications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referral_source  TEXT,          -- LinkedIn, member referral name, etc.
  tier_interest    TEXT NOT NULL, -- 'basic' | 'premium' | 'vip'
  reviewed_by      UUID REFERENCES public.profiles(id),
  reviewed_at      TIMESTAMPTZ,
  notes            TEXT,          -- admin review notes
  status           TEXT NOT NULL DEFAULT 'pending'
    -- 'pending' | 'under_review' | 'approved' | 'rejected'
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON public.applications FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own application"
  ON public.applications FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Admins can view all applications"
  ON public.applications FOR SELECT
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);

CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.3 Subscriptions

Stripe-backed membership subscription records.

```sql
CREATE TABLE public.subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_id              UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT UNIQUE,
  stripe_price_id         TEXT,
  status                  TEXT NOT NULL DEFAULT 'incomplete',
    -- 'incomplete' | 'active' | 'past_due' | 'canceled' | 'unpaid'
  tier                    TEXT NOT NULL, -- 'basic' | 'premium' | 'vip'
  current_period_start    TIMESTAMPTZ,
  current_period_end      TIMESTAMPTZ,
  cancel_at_period_end    BOOLEAN NOT NULL DEFAULT FALSE,
  canceled_at             TIMESTAMPTZ
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can view all subscriptions"
  ON public.subscriptions FOR SELECT
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.4 Venue Spaces

The four bookable physical spaces at the Goon house.

```sql
CREATE TABLE public.venue_spaces (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  capacity      INTEGER,
  amenities     JSONB,
  image_url     TEXT,
  hourly_rate   INTEGER NOT NULL,       -- in cents
  status        TEXT NOT NULL DEFAULT 'available'
    -- 'available' | 'maintenance' | 'unavailable'
);

ALTER TABLE public.venue_spaces ENABLE ROW LEVEL SECURITY;

-- Authenticated members can view available spaces
CREATE POLICY "Members can view venue spaces"
  ON public.venue_spaces FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage venue spaces"
  ON public.venue_spaces FOR ALL
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.5 Bookings

```sql
CREATE TABLE public.bookings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  venue_space_id   UUID NOT NULL REFERENCES public.venue_spaces(id) ON DELETE CASCADE,
  start_time       TIMESTAMPTZ NOT NULL,
  end_time         TIMESTAMPTZ NOT NULL,
  total_amount     INTEGER NOT NULL,    -- in cents
  special_requests TEXT,
  status           TEXT NOT NULL DEFAULT 'confirmed'
    -- 'confirmed' | 'canceled' | 'completed' | 'no_show'
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update own bookings"
  ON public.bookings FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.6 Events

```sql
CREATE TABLE public.events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by      UUID NOT NULL REFERENCES public.profiles(id),
  title           TEXT NOT NULL,
  description     TEXT,
  event_date      TIMESTAMPTZ NOT NULL,
  venue_space_id  UUID REFERENCES public.venue_spaces(id),
  max_attendees   INTEGER,
  image_url       TEXT,
  status          TEXT NOT NULL DEFAULT 'draft'
    -- 'draft' | 'published' | 'canceled' | 'completed'
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view published events"
  ON public.events FOR SELECT
  USING (status = 'published' OR status = 'completed');

CREATE POLICY "Admins can manage events"
  ON public.events FOR ALL
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.7 Event RSVPs

```sql
CREATE TABLE public.event_rsvps (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id      UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  status        TEXT NOT NULL DEFAULT 'confirmed',
    -- 'confirmed' | 'canceled'
  guests        INTEGER NOT NULL DEFAULT 0,
  UNIQUE(profile_id, event_id)
);

ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own RSVPs"
  ON public.event_rsvps FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own RSVPs"
  ON public.event_rsvps FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update own RSVPs"
  ON public.event_rsvps FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can view all RSVPs"
  ON public.event_rsvps FOR SELECT
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.8 Forum Posts

```sql
CREATE TABLE public.forum_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  content         TEXT NOT NULL,
  category        TEXT NOT NULL DEFAULT 'general',
    -- 'general' | 'events' | 'venue' | 'introductions' | 'off-topic'
  status          TEXT NOT NULL DEFAULT 'published',
    -- 'published' | 'flagged' | 'archived' | 'deleted'
  likes_count     INTEGER NOT NULL DEFAULT 0,
  comments_count  INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view published posts"
  ON public.forum_posts FOR SELECT
  USING (status = 'published' OR status = 'flagged');

CREATE POLICY "Members can insert posts"
  ON public.forum_posts FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update own posts"
  ON public.forum_posts FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can manage all posts"
  ON public.forum_posts FOR ALL
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.9 Forum Comments

```sql
CREATE TABLE public.forum_comments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  forum_post_id     UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.forum_comments(id) ON DELETE CASCADE,
  content           TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'published'
    -- 'published' | 'deleted'
);

ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view published comments"
  ON public.forum_comments FOR SELECT
  USING (status = 'published');

CREATE POLICY "Members can insert comments"
  ON public.forum_comments FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update own comments"
  ON public.forum_comments FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can manage all comments"
  ON public.forum_comments FOR ALL
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.10 Waitlist

Pre-launch interest capture from the landing page.

```sql
CREATE TABLE public.waitlist (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email            TEXT UNIQUE NOT NULL,
  full_name        TEXT,
  referral_source  TEXT,
  tier_interest    TEXT,  -- 'basic' | 'premium' | 'vip'
  status           TEXT NOT NULL DEFAULT 'pending'
    -- 'pending' | 'invited' | 'converted'
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Landing page form: anonymous insert allowed
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist FOR INSERT
  WITH CHECK (TRUE);

-- Admins can view and manage waitlist
CREATE POLICY "Admins can manage waitlist"
  ON public.waitlist FOR ALL
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);
```

### 5.11 Audit Log

Immutable record of sensitive operations.

```sql
CREATE TABLE public.audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id         UUID REFERENCES public.profiles(id),
  action          TEXT NOT NULL,
    -- e.g., 'application.approved', 'booking.created', 'event.published'
  resource_type   TEXT NOT NULL,
  resource_id     UUID,
  details         JSONB
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Admins only
CREATE POLICY "Admins can view audit log"
  ON public.audit_log FOR SELECT
  USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE);

-- Auth users can insert (triggered by app logic)
CREATE POLICY "Authenticated users can insert audit entries"
  ON public.audit_log FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

---

## 6. Core Features

### 6.1 Member Application & Vetting

**Flow:**
1. Prospective member receives invitation link (or lands on waitlist page).
2. Clicks "Apply for Membership" → magic link sent to email via Resend.
3. Clicks magic link → authenticated → redirected to application form.
4. Submits application: full name, LinkedIn URL, referral source, tier preference.
5. Application status set to `pending` → admin notified.
6. Admin reviews application → `approved` or `rejected`.
7. If approved, member receives Stripe Checkout link for tier subscription.
8. On successful payment, `membership_tier` set on profile, `member_since` date recorded, `application_status` → `approved`.
9. Member gains dashboard access.

### 6.2 Magic Link Auth (Supabase Auth)

- **No passwords.** No social logins. Magic link only.
- `@supabase/ssr` handles cookie-based sessions across:
  - Middleware (route protection)
  - Server Components (data fetching)
  - Client Components (real-time subscriptions)
  - Route Handlers (API auth checks)
- Resend sends the magic link emails (custom SMTP configured in Supabase Auth settings).
- Session refresh is automatic via `@supabase/ssr`.

### 6.3 Member Dashboard

Personalized dashboard visible after authentication and membership approval:
- Greeting by name
- Current membership tier badge
- Quick actions: Book a Space, Upcoming Events, Forum
- Recent activity feed
- Profile completion nudges

### 6.4 Venue Booking System

Four bookable spaces (e.g., The Salon, The Library, The Terrace, The Study):
- Calendar-based availability view
- Hourly booking with start/end time selection
- Special requests field
- Booking confirmation email via Resend
- Booking history with cancel capability

### 6.5 Event Calendar & RSVP

- Event cards with title, date, attending count
- Detail pages with full description, venue, and RSVP button (+ guest count)
- Members can cancel RSVPs
- Admins create/publish events via admin panel

### 6.6 Opt-In Member Directory

- Members can toggle visibility (opt-in only — off by default)
- Visible fields: name, avatar, membership tier, brief bio
- No contact info exposed publicly

### 6.7 Community Forum

- Categories: General, Events, Venue, Introductions, Off-Topic
- Threaded posts with nested comments
- Like button
- Flag/report mechanism
- Admin moderation: archive, delete, restore

### 6.8 Admin Panel

Available only to users with `is_admin = TRUE`:
- **Applications:** Review queue with approve/reject actions
- **Members:** Member list with tier/status management
- **Venue Spaces:** CRUD for spaces
- **Events:** Create, publish, cancel events
- **Forum:** Moderate posts and comments
- **Analytics:** Key metrics dashboard (members, bookings, revenue)

---

## 7. API Endpoints

### 7.1 Authentication

```
POST   /api/auth/signup        # Initiate magic link signup (creates auth.users + profile)
POST   /api/auth/login         # Initiate magic link login (sends email)
GET    /api/auth/verify        # Magic link callback (Supabase handles, redirects)
POST   /api/auth/logout        # End session
GET    /api/auth/session       # Return current session
```

Implemented via Supabase Auth + `@supabase/ssr`. No custom auth logic. Resend handles email delivery.

### 7.2 Applications

```
POST   /api/applications              # Submit membership application
GET    /api/applications/me           # Current user's application status
GET    /api/admin/applications        # Admin: list all applications
PUT    /api/admin/applications/[id]   # Admin: approve/reject
```

### 7.3 Bookings

```
GET    /api/bookings                  # User's bookings
POST   /api/bookings                  # Create booking
GET    /api/bookings/[id]             # Single booking detail
PUT    /api/bookings/[id]             # Update/cancel booking
GET    /api/venues                    # List available venue spaces
GET    /api/venues/[id]               # Single venue with availability
GET    /api/venues/[id]/availability  # Time slots for a date range
```

### 7.4 Events

```
GET    /api/events                    # Published events
GET    /api/events/[id]               # Event detail with RSVP count
POST   /api/events/[id]/rsvp          # RSVP to event
DELETE /api/events/[id]/rsvp          # Cancel RSVP
POST   /api/admin/events              # Admin: create event
PUT    /api/admin/events/[id]         # Admin: update event
```

### 7.5 Members (Directory)

```
GET    /api/members                   # Opt-in member directory
GET    /api/members/me                # Current user's profile
PUT    /api/members/me                # Update own profile
PUT    /api/members/me/visibility     # Toggle directory visibility
```

### 7.6 Forum

```
GET    /api/forum/posts               # List posts (paginated, by category)
GET    /api/forum/posts/[id]          # Single post with comments
POST   /api/forum/posts               # Create post
PUT    /api/forum/posts/[id]          # Edit own post
DELETE /api/forum/posts/[id]          # Delete own post
POST   /api/forum/posts/[id]/comments # Add comment
PUT    /api/forum/comments/[id]       # Edit own comment
DELETE /api/forum/comments/[id]       # Delete own comment
POST   /api/forum/posts/[id]/like     # Toggle like on post
```

### 7.7 Payments

```
POST   /api/payments/checkout         # Create Stripe Checkout session
GET    /api/payments/history          # User's payment history
```

### 7.8 Webhooks

```
POST   /api/webhooks/stripe           # Stripe webhook receiver
```

---

## 8. Authentication & Authorization

### 8.1 Magic Link Flow

```
User clicks "Apply for Membership"
        │
        ▼
Enter email → POST /api/auth/login
        │
        ▼
Supabase Auth triggers magic link email via Resend
        │
        ▼
User clicks link in email
        │
        ▼
Supabase verifies token → sets session cookie (sb-access-token, sb-refresh-token)
        │
        ▼
Redirect to /dashboard (or /apply if no application yet)
```

### 8.2 Session Management with `@supabase/ssr`

```typescript
// lib/supabase/server.ts — Server-side client (Server Components, Route Handlers)
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

```typescript
// lib/supabase/client.ts — Client-side (Client Components)
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 8.3 Middleware

```typescript
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protected routes
  const authRoutes = ["/dashboard", "/admin", "/events", "/forum", "/venues"];
  const isProtected = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Admin routes
  if (pathname.startsWith("/admin") && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### 8.4 Role-Based Access Control

| Role | Scope | How Assigned |
|------|-------|-------------|
| **unauthenticated** | Landing page, waitlist form | Default |
| **applicant** | Application form only | After first magic link, before membership approval |
| **member** | Dashboard, bookings, events, forum, directory | After application approved + Stripe payment |
| **admin** | Admin panel, all member data, analytics | `is_admin = TRUE` flag set manually in Supabase |

---

## 9. Payment Processing

### 9.1 Stripe Integration Overview

- **Stripe Checkout** for initial subscription signup
- **Stripe Billing** for recurring charges and customer portal
- **Stripe Webhooks** for lifecycle event synchronization

### 9.2 Membership Tiers

| Tier | Annual Price | Stripe Price ID (env) | Key Benefits |
|------|-------------|----------------------|--------------|
| Basic | $1,200 | `STRIPE_PRICE_BASIC` | Core venue access, standard events |
| Premium | $2,200 | `STRIPE_PRICE_PREMIUM` | Priority booking, premium events, extended hours |
| VIP | $3,500 | `STRIPE_PRICE_VIP` | 24/7 access, exclusive events, personal concierge |

### 9.3 Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const profileId = session.client_reference_id;
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;

      if (profileId) {
        await supabase.from("subscriptions").upsert({
          profile_id: profileId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: "active",
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({
          status: sub.status,
          current_period_start: new Date(sub.current_period_start! * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end! * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
          canceled_at: sub.canceled_at
            ? new Date(sub.canceled_at * 1000).toISOString()
            : null,
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "invoice.payment_succeeded": {
      // Log payment success; subscription status handled by subscription.updated
      const invoice = event.data.object as Stripe.Invoice;
      await supabase.from("audit_log").insert({
        action: "payment.succeeded",
        resource_type: "invoice",
        resource_id: invoice.id,
        details: { amount_paid: invoice.amount_paid, invoice_pdf: invoice.invoice_pdf },
      });
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      // Subscription status becomes 'past_due' automatically
      await supabase.from("audit_log").insert({
        action: "payment.failed",
        resource_type: "invoice",
        resource_id: invoice.id,
        details: { attempt_count: invoice.attempt_count },
      });
      break;
    }

    case "customer.subscription.trial_will_end": {
      // No trial period in our model; skip
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

### 9.4 Stripe Checkout Session Creation

```typescript
// app/api/payments/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string> = {
  basic: process.env.STRIPE_PRICE_BASIC!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
  vip: process.env.STRIPE_PRICE_VIP!,
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { tier } = body;

  if (!tier || !PRICE_MAP[tier]) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: profile.id,
    customer_email: profile.email,
    line_items: [{ price: PRICE_MAP[tier], quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?payment=canceled`,
    metadata: { tier, profile_id: profile.id },
  });

  return NextResponse.json({ url: session.url });
}
```

---

## 10. Deployment Strategy

### 10.1 Vercel Deployment

1. **Connect Repository:** Link `astratesting/viril-spa-ad7803` to Vercel project
2. **Framework Detection:** Vercel auto-detects Next.js 15
3. **Build Command:** `pnpm build` (or `npm run build`)
4. **Output Directory:** `.next` (default)
5. **Root Directory:** `./` (monorepo root) or `./frontend` if using nested structure

### 10.2 Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...
STRIPE_PRICE_VIP=price_...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_SITE_URL=https://goon.club

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-...
```

### 10.3 Supabase Setup

1. **Create Supabase project** (via dashboard.supabase.com or CLI)
2. **Run schema migrations** for all tables (see Section 5)
3. **Configure Auth:**
   - Disable all providers except "Email"
   - Enable "Email OTP (Magic Link)"
   - Configure custom SMTP with Resend for branded emails
4. **Enable RLS** for all public tables
5. **Set up Supabase CLI** for local development:
   ```bash
   supabase init
   supabase link --project-ref <project-ref>
   supabase db push  # or generate migration files
   ```

### 10.4 Stripe Setup

1. **Create Stripe account** (stripe.com)
2. **Set up Products & Prices:**
   - Goon Basic — $1,200/year (recurring)
   - Goon Premium — $2,200/year (recurring)
   - Goon VIP — $3,500/year (recurring)
3. **Configure Webhook endpoint:**
   - URL: `https://goon.club/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
4. **Get keys:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
5. **Copy Price IDs** into environment variables

### 10.5 CI/CD Pipeline

1. **Feature branches** → automatic Vercel preview deployments per PR
2. **Main branch** → staging deployment (`staging.goon.club`)
3. **Production promotion** → manual via Vercel dashboard
4. **Database migrations** → run against staging first, then production

---

## 11. 6-Week Sprint Schedule

### Week 1: Foundation & Auth (Days 1–5)

**Goal:** Project scaffold, Supabase integration, magic link auth flow, landing page intact.

| Day | Deliverables |
|-----|-------------|
| 1 | Initialize Next.js 15 project with App Router. Configure Tailwind CSS 4 with Bold Frontier design tokens. Install dependencies: `@supabase/ssr`, `stripe`, `resend`, `lucide-react`, `@posthog/next`. Set up `pnpm` as package manager. |
| 2 | Set up Supabase project. Run schema migrations (all tables in Section 5). Configure Auth settings (magic link only, Resend SMTP). Create `lib/supabase/` utilities (server, client, middleware helpers). |
| 3 | Implement magic link auth flow. `POST /api/auth/login` (initiate), `GET /auth/verify` (callback). Create `middleware.ts` with route protection logic. |
| 4 | Build login page (`/login`) — email input, "Send Magic Link" button, loading/success/error states. Build signup page (`/signup`) — same flow but triggered from landing page "Apply" CTA. |
| 5 | Verify landing page remains intact. Test end-to-end auth flow: enter email → receive link → click → authenticated session. Set up Vercel project and deploy to preview. |

**Key Files:**
```
lib/supabase/server.ts
lib/supabase/client.ts
lib/supabase/middleware.ts
middleware.ts
app/(auth)/login/page.tsx
app/(auth)/signup/page.tsx
app/api/auth/login/route.ts
.env.local (or .env)
```

### Week 2: Member Dashboard & Profile (Days 6–10)

**Goal:** Dashboard layout, profile CRUD, application intake, membership tier selection.

| Day | Deliverables |
|-----|-------------|
| 6 | Build dashboard layout (`app/dashboard/layout.tsx`) with sidebar navigation. Dashboard home page with greeting, tier badge, quick actions. Sidebar: Dashboard, Profile, Bookings, Events, Forum. |
| 7 | Profile page: view/edit form (full name, bio, LinkedIn, phone, avatar upload). `PUT /api/members/me`. Profile completion progress indicator. |
| 8 | Application intake form: referral source, tier preference, submit. `POST /api/applications`. Application status page (pending/under review/approved/rejected). |
| 9 | Membership tier selection page. Integration with Stripe Checkout (redirect to Stripe-hosted checkout). Success/cancel callbacks. Tier badge updates after payment. |
| 10 | Admin panel — applications review queue. List all pending applications (`GET /api/admin/applications`), approve/reject actions (`PUT /api/admin/applications/[id]`). |

**Key Files:**
```
app/dashboard/layout.tsx
app/dashboard/page.tsx
app/dashboard/profile/page.tsx
app/dashboard/apply/page.tsx
app/dashboard/membership/page.tsx
app/admin/applications/page.tsx
app/api/applications/route.ts
app/api/admin/applications/[id]/route.ts
components/ProfileForm.tsx
components/ApplicationForm.tsx
components/layout/DashboardSidebar.tsx
components/layout/DashboardNavbar.tsx
```

### Week 3: Venue Booking System (Days 11–15)

**Goal:** Four venue spaces, booking calendar, booking CRUD.

| Day | Deliverables |
|-----|-------------|
| 11 | Venue spaces list page (4 spaces with images, descriptions, rates). Seed venue data. `GET /api/venues`. |
| 12 | Single venue space detail page. Calendar/date picker showing real-time availability. `GET /api/venues/[id]/availability` (query Supabase bookings table for conflicting times). |
| 13 | Booking creation flow: select space → pick date/time → special requests → confirm → email confirmation via Resend. `POST /api/bookings`. |
| 14 | My Bookings page: list of upcoming and past bookings. Cancel booking action. `GET /api/bookings`, `PUT /api/bookings/[id]`. |
| 15 | Admin: Venue space management (CRUD). Admin: All bookings view with filters. |

**Key Files:**
```
app/dashboard/venues/page.tsx
app/dashboard/venues/[id]/page.tsx
app/dashboard/bookings/page.tsx
app/api/venues/route.ts
app/api/venues/[id]/availability/route.ts
app/api/bookings/route.ts
app/api/bookings/[id]/route.ts
components/BookingCalendar.tsx
components/VenueCard.tsx
components/BookingForm.tsx
```

### Week 4: Event Calendar & RSVP (Days 16–20)

**Goal:** Event list, detail, RSVP, admin event creation.

| Day | Deliverables |
|-----|-------------|
| 16 | Events list page: published events with title, date, venue, attendee count. `GET /api/events`. |
| 17 | Event detail page: full description, location, attendee list. RSVP button with guest count. `POST /api/events/[id]/rsvp`, `DELETE /api/events/[id]/rsvp`. |
| 18 | "My Events" section on dashboard: upcoming RSVPs with cancel option. |
| 19 | Admin: Event creation form (title, description, date, venue, max attendees, image). Publish/draft/cancel controls. `POST /api/admin/events`, `PUT /api/admin/events/[id]`. |
| 20 | Event confirmation emails via Resend. Event reminder emails (scheduled via Supabase Edge Functions or manual trigger). |

**Key Files:**
```
app/dashboard/events/page.tsx
app/dashboard/events/[id]/page.tsx
app/api/events/route.ts
app/api/events/[id]/route.ts
app/api/events/[id]/rsvp/route.ts
app/admin/events/page.tsx
components/EventCard.tsx
components/EventRsvpButton.tsx
components/AdminEventForm.tsx
```

### Week 5: Community Forum & Admin Panel (Days 21–25)

**Goal:** Forum with posts/comments, full admin panel, member directory.

| Day | Deliverables |
|-----|-------------|
| 21 | Forum main page: category tabs, post list (paginated). `GET /api/forum/posts`. New post form: title, content, category. `POST /api/forum/posts`. |
| 22 | Single post page: post content, comment thread. Add comment form. Nested replies support. Like button. `POST /api/forum/posts/[id]/comments`. |
| 23 | Opt-in member directory. Members toggle visibility in profile settings. Directory page: member cards (name, avatar, tier, bio). `GET /api/members`. |
| 24 | Admin panel: Member management (list, edit tier, suspend). Forum moderation (flag review, archive, delete). Analytics dashboard (member count, revenue, booking stats). |
| 25 | Admin panel polish: responsive layout, breadcrumbs, audit log viewer. |

**Key Files:**
```
app/dashboard/forum/page.tsx
app/dashboard/forum/[id]/page.tsx
app/api/forum/posts/route.ts
app/api/forum/posts/[id]/route.ts
app/api/forum/posts/[id]/comments/route.ts
app/dashboard/members/page.tsx
app/admin/members/page.tsx
app/admin/forum/page.tsx
app/admin/analytics/page.tsx
components/ForumPostCard.tsx
components/CommentThread.tsx
```

### Week 6: Polish, QA & Deployment (Days 26–30)

**Goal:** Testing, bug fixes, performance optimization, production deployment.

| Day | Deliverables |
|-----|-------------|
| 26 | Cross-browser testing (Chrome, Safari, Firefox). Mobile responsive audit. Accessibility audit (keyboard nav, screen reader). Fix critical issues. |
| 27 | Performance optimization: image optimization (`next/image`), route segment config, edge caching strategy. Lighthouse audit target: >90 Performance, >95 Accessibility. |
| 28 | Security audit: verify RLS policies, test auth edge cases, validate webhook signature verification, CSRF protection. Pen test attempt on auth gates. |
| 29 | Final QA pass on all features. Bug bash. Copy review (tonal consistency, no placeholder text). Seed admin account and test user accounts. |
| 30 | Production deployment. DNS configuration. SSL verification. Stripe live mode switch. Supabase production project final config. PostHog production key. Go-live checklist sign-off. |

**Key Files:**
```
.env.production (verify all vars)
package.json (verify scripts)
README.md (documentation)
```

---

## 12. Timeline & Milestones

```
Week 1  ████████████  Foundation & Auth ──────── ✅ Auth flow complete, landing page intact
Week 2  ████████████  Dashboard & Profile ────── ✅ Membership can be applied, approved, paid
Week 3  ████████████  Venue Booking ──────────── ✅ Members can book spaces
Week 4  ████████████  Event Calendar & RSVP ──── ✅ Events live with RSVP
Week 5  ████████████  Forum & Admin ──────────── ✅ Full community + admin control
Week 6  ████████████  Polish & Launch ────────── ✅ Production deployment
```

| Milestone | Target Date | Success Criteria |
|-----------|------------|-----------------|
| Auth & Landing Live | End of Week 1 | Magic link auth working; landing page unchanged |
| Membership Flow End-to-End | End of Week 2 | Apply → Review → Pay → Dashboard access |
| Booking System Live | End of Week 3 | Members can view, book, and cancel venue spaces |
| Events Live | End of Week 4 | Published events visible; RSVP flow works |
| Community + Admin Live | End of Week 5 | Forum active; admin panel fully functional |
| Production Launch | End of Week 6 | Live at goon.club; zero critical bugs |

---

## 13. Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|------|------------|--------|------------|
| R1 | **Supabase Auth deliverability issues** — magic links go to spam | Medium | High | Configure Resend with custom domain + DKIM/SPF/DMARC. Test deliverability early. Provide manual resend. |
| R2 | **Stripe webhook desync** — subscription state drifts between Stripe and Supabase | Medium | High | Idempotent webhook handler. Reconciliation job. Admin override for manual state fix. |
| R3 | **Database schema migration conflicts** — breaking changes between environments | Low | Medium | Use Supabase migrations. Test against staging before prod. Never run raw SQL on prod. |
| R4 | **Application vetting bottlenecks** — manual review creates backlog | Medium | Medium | Batch review UI. Email alerts for new applications. Establish review SLAs (24h). |
| R5 | **Vercel cold starts** — slow dashboard load for infrequent users | Low | Medium | Use ISR where possible. Optimize bundle size. Consider edge middleware caching. |
| R6 | **Privacy incident** — member data leaked via misconfigured RLS | Low | Critical | Mandatory RLS audit before launch. No queries without RLS check. Pen test auth flows. |
| R7 | **Scope creep** — teams wants features not in MVP spec | High | Medium | Strict adherence to roadmap. Post-MVP backlog for out-of-scope items. Weekly triage. |
| R8 | **Stripe payment failures** — high decline rate for luxury-tier pricing | Medium | Medium | Smart retry logic in Stripe. Graceful error UI. Member communication template. |

---

## 14. Success Metrics

### Business Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Founding members Year 1 | 200 | Stripe active subscriptions |
| Annual revenue Year 1 | $480K | Stripe dashboard / admin analytics |
| Waitlist-to-member conversion | 15% | (members ÷ waitlist signups) |
| Annual renewal rate | 90% | (renewals ÷ expiring subs) |
| ARPU | $2,400 | Total revenue ÷ active members |

### Product Usage Metrics (Post-Launch, First 30 Days)

| Metric | Target | Measurement |
|--------|--------|------------|
| Weekly active members | >50% of total | PostHog / Supabase `last_login_at` |
| Monthly venue bookings | 150+ | Bookings table count |
| Forum posts (first month) | 300+ | Forum posts table count |
| Event RSVP-to-attendance | 75% | RSVPs with `status = confirmed` at event time |

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Homepage Lighthouse Performance | >90 | Vercel Analytics / Lighthouse |
| Dashboard page load (p95) | <2s | Vercel Analytics |
| Platform uptime | 99.9% | Vercel monitoring |
| Auth success rate | >98% | Supabase Auth dashboard |
| Stripe webhook delivery rate | >99% | Stripe dashboard |
| Zero critical security issues at launch | 0 | Security audit report |

### Milestone Exit Criteria

| Milestone | Must-Have Before Proceeding |
|-----------|---------------------------|
| End of Week 1 | Magic link sends and authenticates. No regressions on landing page. |
| End of Week 2 | Full application → approval → payment flow works e2e. Dashboard renders after auth. |
| End of Week 3 | At least one booking can be created, viewed, and canceled. Availability conflict detection works. |
| End of Week 4 | Event RSVP works (confirm and cancel). Admin can create/publish events. |
| End of Week 5 | Forum post + comment + like works. Admin can moderate. Member directory respects opt-in. |
| End of Week 6 | All critical bugs resolved. Production environment configured. Launch checklist signed off. |

---

## Appendix A: Key File Manifest (Post-MVP)

```
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (landing)/
│   │   └── page.tsx                  # Landing page (intact from pre-MVP)
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── apply/page.tsx
│   │   ├── bookings/page.tsx
│   │   ├── events/page.tsx
│   │   ├── events/[id]/page.tsx
│   │   ├── forum/page.tsx
│   │   ├── forum/[id]/page.tsx
│   │   ├── membership/page.tsx
│   │   ├── members/page.tsx
│   │   ├── profile/page.tsx
│   │   └── venues/
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── applications/page.tsx
│   │   ├── events/page.tsx
│   │   ├── forum/page.tsx
│   │   ├── members/page.tsx
│   │   ├── venues/page.tsx
│   │   └── analytics/page.tsx
│   └── api/
│       ├── auth/login/route.ts
│       ├── applications/route.ts
│       ├── bookings/route.ts
│       ├── bookings/[id]/route.ts
│       ├── events/route.ts
│       ├── events/[id]/route.ts
│       ├── events/[id]/rsvp/route.ts
│       ├── forum/posts/route.ts
│       ├── forum/posts/[id]/route.ts
│       ├── forum/posts/[id]/comments/route.ts
│       ├── forum/posts/[id]/like/route.ts
│       ├── members/route.ts
│       ├── members/me/route.ts
│       ├── payments/checkout/route.ts
│       ├── payments/history/route.ts
│       ├── venues/route.ts
│       ├── venues/[id]/availability/route.ts
│       ├── webhooks/stripe/route.ts
│       └── admin/
│           ├── applications/route.ts
│           ├── applications/[id]/route.ts
│           ├── events/route.ts
│           ├── events/[id]/route.ts
│           ├── members/route.ts
│           └── members/[id]/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DashboardSidebar.tsx
│   │   └── AdminSidebar.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Table.tsx
│   │   └── Toast.tsx
│   ├── Hero.tsx                     # Landing page (intact)
│   ├── Vision.tsx                   # Landing page (intact)
│   ├── FAQ.tsx                      # Landing page (intact)
│   ├── Footer.tsx                   # Landing page (intact)
│   ├── WaitlistForm.tsx             # Landing page (intact)
│   ├── ProfileForm.tsx
│   ├── ApplicationForm.tsx
│   ├── BookingCalendar.tsx
│   ├── VenueCard.tsx
│   ├── BookingForm.tsx
│   ├── EventCard.tsx
│   ├── EventRsvpButton.tsx
│   ├── AdminEventForm.tsx
│   ├── ForumPostCard.tsx
│   └── CommentThread.tsx
├── lib/
│   ├── supabase/
│   │   ├── server.ts
│   │   ├── client.ts
│   │   └── middleware.ts
│   ├── stripe.ts
│   ├── resend.ts
│   └── utils.ts
├── middleware.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── docs/
    └── mvp_roadmap.md                # This document
```

---

## Appendix B: Design Token Implementation

```css
/* globals.css custom theme extension */
:root {
  --color-ink: #0A0A0B;
  --color-charcoal: #1C1C1E;
  --color-flame: #FF5A00;
  --color-magenta: #E6007A;
  --color-acid: #39FF14;
  --color-bone: #F5F0EB;
  --color-ash: #A3A3A3;
}
```

```typescript
// tailwind.config.ts — Bold Frontier extension
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        charcoal: '#1C1C1E',
        flame: '#FF5A00',
        magenta: '#E6007A',
        acid: '#39FF14',
        bone: '#F5F0EB',
        ash: '#A3A3A3',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'system-ui', 'sans-serif'],
        archivo: ['Archivo Black', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

---

*End of MVP Roadmap. This document is a living artifact — update after each sprint retrospective.*
