# Goon MVP Build Plan

## 1. PRODUCT

Goon is a fully-functional private members club platform where verified HNW LGBTQ+ individuals sign up via email+password, complete a membership profile, browse a directory of other verified members, RSVP to exclusive events, and pay for annual membership tiers ($1,200–$3,500/yr) via Stripe. The core value is discretion-first access to an aristocratic queer community — no public names, no social proof, no fabricated community stats. It solves the research-identified pain that Soho House, San Vicente Bungalows, and The Battery fail to provide: identity-verified LGBTQ+ belonging with old-world salon culture, zero discomfort in wellness/spa contexts (53% of gay men have left a spa due to discomfort), and private dining/events that are explicitly queer-safe.

## 2. WHO IT'S FOR

HNW gay and lesbian professionals aged 30–55 in West Hollywood/Beverly Hills metro, earning $100k+/year, who spend $5k–25k/yr on luxury travel, wellness, dining, fashion, and grooming. They are time-poor ops managers and executives who want one tap to access their club — they will abandon a product with nested menus or slow onboarding. They value discretion over visibility: their dashboard shows one primary CTA ("Your Club"), not a feed of strangers. They are 2–3x more likely than straight peers to take luxury international trips, so mobile-first access to directory and events is critical. Research shows 68% prefer brands with authentic queer representation but zero fake social proof — hence all member profiles are real-verified or hidden behind pending status.

## 3. LOOK & FEEL

### Overall Vibe
Old European aristocratic luxury club — think 1920s Parisian salon meets modern digital discretion. Every pixel says "you belong here, and no one else knows." No gradients, no shadows, no rounded corners except minimal. Everything is flat, typographic, and made of light and space.

### Color Palette
```
--charcoal: #1C1C1E       (bg-primary, text-primary)
--brass: #C5A55A          (accents, CTAs, dividers)
--ivory: #F5F0EB          (bg-secondary, card-bg)
--brass-light: #D4BF7A    (hover, subtle highlights)
--ivory-dark: #E8E0D8     (border, disabled)
--red: #8B3A3A            (errors, destructive actions — use sparingly)
--white: #FFFFFF          (text on charcoal, card bg on dark)
```

### Typography
- **Headings:** Playfair Display, 700 weight, tracking 0.02em
- **Body:** Satoshi, 400/500 weight, 16px base, line-height 1.6
- **Small:** Satoshi, 400, 12–14px, uppercase where appropriate
- **Monospace:** JetBrains Mono for verification codes (if applicable)

### Spacing & Layout
- 8px grid system (spacing: 4, 8, 16, 24, 32, 48, 64, 96)
- Max content width: 1280px, centered with padding
- White space is a feature — never crowd elements
- Cards have 24px padding, 1px solid `ivory-dark` border (no shadow)

### Key Components
- **Buttons:** Flat, uppercase, Satoshi 14px/700. Primary = brass bg + white text. Secondary = transparent + brass border + brass text. Ghost = transparent + ivory text. Danger = red bg + white text. All have 2px border, 8px padding horizontal, 12px vertical, 32px height.
- **Inputs:** Ivory bg, 1px ivory-dark border, 12px padding, 16px font, focus: brass border 2px. Label above input in small uppercase Satoshi.
- **Cards:** Ivory bg, 1px ivory-dark border, 24px padding. No shadow ever.
- **Dividers:** 1px solid ivory-dark, 48px margin vertical.
- **Navigation:** Top bar with logo left, member name right (never member count/avatars). Side nav on dashboard with icon + text (icons: 20x20, brass).

### Iconography
Simple line icons, 1.5px stroke, rounded caps, brass color. Use Lucide icons (already in Next.js). Core set: User (profile), Users (directory), Calendar (events), CreditCard (payments), Settings, Shield (verification), LogOut.

### Imagery
No photos of people. Only abstract textures (marble, linen, wood grain) used as subtle backgrounds on hero sections. Images are decorative, never aspirational. Use CSS gradients from charcoal to dark brass for header backgrounds.

### Interaction & Motion
- Hover: buttons shift 1px down, border goes brass-light. Links underline from left.
- Focus: outline 2px brass with 4px offset.
- Transitions: 200ms ease-out on all interactive elements.
- Page transitions: fade (300ms opacity) — no slide, no spring.
- Loading: brass spinner (16x16, border 2px, transparent center) centered in CTA area.
- Errors: shake 150ms (CSS keyframe) on invalid inputs.

### Screen-by-Screen Layout

**Landing Page (existing, enhance)**
- Hero: full-viewport, charcoal bg, "Goon" in Playfair 96px, ivory, centered. Subtitle: "Private Membership for the Discerning." Brass divider line. Below: two CTAs side by side: "Apply for Membership" (primary) and "Member Login" (ghost).
- Below fold: four discrete sections (no images of people): "Club Values" with three value cards (text only), "Membership Tiers" with three tier cards showing price + bullet list of benefits, "The Space" with address + map placeholder, "Apply" section with inline waitlist form (name, email, password, role selector).
- Footer: copyright, privacy, terms — all real routes.

**Auth Pages (Login / Signup)**
- Full-screen centered card (max 440px) on charcoal bg. Logo top center (SVG text "Goon" in Playfair). Email input, password input with show/hide toggle. Submit button primary. Link to other auth page below. Error messages inline red below inputs. No social buttons.
- Login: "Member Login" heading. "Forgot password?" link (sends magic link via Supabase). 
- Signup: "Apply for Membership" heading. Name, email, password, confirm password. Success redirects to profile onboarding.

**Dashboard (after auth)**
- Top nav: "Goon" logo left, member name right (dropdown: Profile, Account Settings, Sign Out).
- Left sidebar (260px): brass border right. Items: Home (shield icon), Profile, Directory, Events, Payments, Admin (only if role=admin). Active item: brass text + left brass border 2px.
- Main content: 3-column grid on desktop, single column mobile. Top: greeting "Welcome, [FirstName]" in Playfair 32px. Below: quick stats cards (2 across) — "Your Membership: [Basic/Premium/VIP]" and "Upcoming Events: [count]". Below: recent directory matches (3 member cards, minimal). Below: next event with RSVP button.

**Profile Page**
- Left: member photo upload (circle, 120px, gray placeholder with camera icon). Input fields vertical: First Name, Last Name, Email (disabled), Phone, Occupation, Industry (dropdown: Tech, Finance, Law, Entertainment, Fashion, Wellness, Other). Bio (textarea, 3 rows). Pronouns (text). Languages (comma-separated).
- Right column: Verification status badge ("Verified" in green or "Pending" in amber). Membership tier with price. Join date. Last active date.
- Action buttons: Save Changes (primary), Cancel (ghost), Delete Account (danger, bottom).

**Member Directory**
- Search bar top: text input with magnifier icon. Filters below as inline tags: Industry (multi-select dropdown), Membership Tier (checkboxes), Location (text). 
- Results: grid of member cards (3 columns desktop, 2 tablet, 1 mobile). Each card: avatar (48px circle), first name + last initial (never full last name), occupation, industry, membership tier badge. Click opens profile (read-only).
- Profile detail: same fields as own profile but read-only. "Connect" button (placeholder — sends connection request, future feature). "Report" link bottom (admin notification).

**Events Page**
- Top: "Create Event" button (admin only). "Upcoming Events" / "Past Events" tabs.
- Event cards in vertical list. Each card: event name (Playfair 24px), date/time, location address, description (1 line, truncated), RSVP status ("Going" / "Not Going" / "Full"), member count badge.
- Event detail page: full description, large location text, RSVP button (toggles between "RSVP" and "Cancel RSVP"). Attendee count (number only, no names).
- Create Event form (admin): name, date/time, location, description (textarea), capacity (number), RSVP deadline (datetime). Submit creates row in events table.

**Payments Page**
- Membership tiers display: three cards showing Basic ($1,200/yr), Premium ($2,200/yr), VIP ($3,500/yr). Current tier highlighted with brass border. 
- "Upgrade" / "Downgrade" buttons (if current tier ≠ selected). "Cancel Membership" link bottom.
- Payment history table: date, tier, amount, status (paid/refunded/cancelled), receipt link.
- Checkout flow: click "Upgrade" → redirects to Stripe Checkout session → success redirects back to dashboard with updated tier.

**Admin Dashboard**
- Only accessible if user.role = 'admin'. Redirect to /dashboard if not admin.
- Top: "Admin" in Playfair. Stats row: Total Members, Pending Verifications, Total Revenue (sum of active memberships), Upcoming Events count. Each stat in a card with number (48px Playfair brass) and label below.
- Tabs: "Members" (table: first name, last initial, email, tier, status, join date, actions[verify, suspend, delete]), "Events" (table: name, date, attendees, actions), "Revenue" (table: date, member, tier, amount, status).
- Each table has inline actions (icons: checkmark for verify, eye for view, trash for delete with confirm modal).
- Search all tables by name/email.

## 4. USER FLOWS

### Flow 1: Signup → Onboarding → Dashboard
1. `/signup` — user enters name, email, password. Submit.
2. Supabase Auth creates user with email+password. Auto-login.
3. Redirect to `/onboarding` (profile creation). User fills: phone, occupation, industry, bio, pronouns, languages. "Save & Continue" button.
4. POST to `/api/profile` creates row in `profiles` table. Sets `status = 'pending'`.
5. Redirect to `/dashboard`. Toast: "Welcome! Your profile is pending verification."

### Flow 2: Login → Dashboard
1. `/login` — user enters email, password. Submit.
2. Supabase Auth validates. Redirect to `/dashboard`.
3. If no profile exists, redirect to `/onboarding` first.

### Flow 3: Browse Directory → View Member Profile
1. Click "Directory" in sidebar → `/directory`.
2. See member cards. Type in search or select filter.
3. Click card → `/directory/[id]` — read-only profile.
4. "Connect" button shows toast: "Connection requests coming soon."

### Flow 4: Event RSVP
1. Click "Events" in sidebar → `/events`.
2. Click event card → `/events/[id]`.
3. Click "RSVP" button → POST to `/api/events/[id]/rsvp` with action='rsvp'.
4. Button changes to "Cancel RSVP". Attendee count increments.

### Flow 5: Payment Upgrade
1. Click "Payments" in sidebar → `/payments`.
2. See current tier highlighted. Click "Upgrade" on different tier.
3. GET `/api/stripe/checkout?tier=premium` → creates Stripe Checkout Session.
4. Redirect to Stripe Checkout URL. User enters card details.
5. On success, Stripe webhook (`/api/stripe/webhook`) updates membership in DB.
6. Redirect back to `/payments?success=true`. Toast: "Membership upgraded!"

### Flow 6: Admin Verify Member
1. Login as admin → `/admin` → Members tab.
2. Find row with status "pending". Click verify icon.
3. PUT `/api/admin/members/[id]/verify` — updates profile.status to 'verified'.
4. Row updates to "verified" in green. Toast: "Member verified."

## 5. PAGES & ROUTES

| Route | Purpose | Layout | Main UI Elements |
|-------|---------|--------|------------------|
| `/` | Landing page | Public hero + sections | Hero, tier cards, waitlist form, footer |
| `/login` | Login form | Centered card | Email input, password with toggle, submit, forgot link |
| `/signup` | Signup form | Centered card | Name, email, password, confirm, submit |
| `/forgot-password` | Password reset | Centered card | Email input, submit, success message |
| `/dashboard` | Main dashboard | Sidebar + content | Greeting, stats cards, directory preview, next event |
| `/onboarding` | Profile setup | Full width form | Avatar upload, text inputs, dropdowns, textareas, save |
| `/profile` | Edit own profile | Sidebar layout | Photo, fields, verification badge, save/delete |
| `/directory` | Member browse | Sidebar layout | Search, filters, card grid |
| `/directory/[id]` | Member detail | Sidebar layout | Read-only profile, connect button, report link |
| `/events` | Event list | Sidebar layout | Tabs (upcoming/past), event cards, create button (admin) |
| `/events/create` | Create event (admin) | Sidebar layout | Form: name, date/time, location, description, capacity, deadline |
| `/events/[id]` | Event detail | Sidebar layout | Description, address, RSVP button, attendee count |
| `/payments` | Payment management | Sidebar layout | Tier cards, current tier highlight, upgrade/downgrade, history table |
| `/admin` | Admin dashboard | Sidebar layout | Stats cards, tabs, tables with inline actions |

## 6. CORE FEATURES

### Auth (Supabase Auth with email+password)
- **Signup:** `supabase.auth.signUp()` with email+password. Auto-confirm (no email verification for MVP — add later if needed). Create profile row on auth trigger.
- **Login:** `supabase.auth.signInWithPassword()`. Error handling for invalid credentials, disabled accounts.
- **Logout:** `supabase.auth.signOut()`. Redirect to `/`.
- **Forgot Password:** `supabase.auth.resetPasswordForEmail()` — sends magic link.
- **Session:** `@supabase/ssr` cookie-based session. Middleware in `middleware.ts` protects dashboard routes, redirects to `/login` if no session.
- **Role:** JWT includes app_metadata.role ('member' or 'admin'). Default 'member'. Admin set via DB trigger or manual.

### Profile Management
- **Fields:** id (uuid, FK to auth.users), first_name, last_name, email, phone, occupation, industry, bio, pronouns, languages (text array), avatar_url, status (enum: pending/verified/suspended), membership_tier (enum: basic/premium/vip), join_date, last_active.
- **CRUD:** User can edit own profile (PUT `/api/profile`). Admin can update status and tier.
- **Verification:** When status='pending', member is invisible in directory. Admin must manually verify. Verified members are visible with "Verified" badge.

### Member Directory
- **Search:** SQL `ilike` query on first_name, last_name, occupation, industry. Returns subset if name matches query.
- **Filters:** Industry (multi-select checkboxes), Membership Tier (checkboxes). Applied via URL search params (`?industry=tech&tier=vip`).
- **Privacy:** Only first name + last initial shown in list. Full last name hidden. Profiles show same limited info. No company names.
- **Pagination:** 12 per page, "Load More" button at bottom (no automatic infinite scroll — respects user's time).

### Events & RSVP
- **Events table:** id, name, description, location, date_time, capacity, rsvp_deadline, created_by (FK to profiles).
- **RSVPs table:** id, event_id (FK), user_id (FK), created_at, status (going/not_going).
- **RSVP logic:** If count of 'going' RSVPs >= capacity, show "Full" badge. If deadline passed, disable RSVP. Admin can edit/delete any event.
- **Event visibility:** All verified members see all events. No public events page.

### Payments via Stripe
- **Tiers:** Fixed prices stored as environment variables. Each tier mapped to a Stripe Price ID.
- **Checkout:** GET `/api/stripe/checkout?tier={slug}` creates Stripe Checkout Session with success_url and cancel_url.
- **Webhook:** POST `/api/stripe/webhook` listens for `checkout.session.completed`. Updates user's `membership_tier` in profiles table. Also creates row in `payments` table: id, user_id, tier, amount, stripe_session_id, status, created_at.
- **Receipts:** Stripe handles email receipts. Payment history table shows date, tier, amount, status with link to Stripe customer portal.
- **Refunds:** Admin can trigger refund via Stripe dashboard (no UI needed for MVP). Payment row status updates via webhook.

### Admin Dashboard
- **Stats:** SQL queries: `SELECT COUNT(*) FROM profiles WHERE status = 'verified'` for member count; `SELECT COUNT(*) FROM profiles WHERE status = 'pending'` for pending; `SELECT SUM(amount) FROM payments WHERE status = 'paid'` for revenue.
- **Member Management:** Table with pagination. Actions: verify (sets status='verified'), suspend (status='suspended'), delete (cascade deletes auth user + all data — admin only, with confirm modal).
- **Event Management:** Same as member table. Actions: delete event (with RSVPs cascade deleted), edit (opens event form pre-filled).
- **Payment Table:** Read-only table from payments table. No direct actions — admin uses Stripe dashboard for refunds.

## 7. DATA MODEL

```sql
-- auth.users (handled by Supabase Auth)

CREATE TYPE member_status AS ENUM ('pending', 'verified', 'suspended');
CREATE TYPE membership_tier AS ENUM ('basic', 'premium', 'vip');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  occupation TEXT,
  industry TEXT,
  bio TEXT,
  pronouns TEXT,
  languages TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  status member_status DEFAULT 'pending',
  membership_tier membership_tier DEFAULT NULL,
  join_date TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  rsvp_deadline TIMESTAMPTZ NOT NULL,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('going', 'not_going')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  tier membership_tier NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  stripe_session_id TEXT UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('paid', 'refunded', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profiles_industry ON profiles(industry);
CREATE INDEX idx_profiles_membership_tier ON profiles(membership_tier);
CREATE INDEX idx_events_date_time ON events(date_time);
CREATE INDEX idx_rsvps_event_id ON rsvps(event_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
```

## 8. AUTH

- **Provider:** Supabase Auth with email+password only. No social providers configured.
- **Client:** `@supabase/ssr` package — creates cookie-based Supabase client for server components and route handlers.
- **Middleware:** `middleware.ts` at root checks for session cookie on all routes under `/dashboard`, `/profile`, `/directory`, `/events`, `/payments`, `/admin`. If no session, redirect to `/login`.
- **Signup flow:** 
  1. `supabase.auth.signUp({ email, password })`
  2. On success, call `/api/create-profile` with user's metadata (first_name, last_name)
  3. Profile row created with `status = 'pending'`
- **Login flow:**
  1. `supabase.auth.signInWithPassword({ email, password })`
  2. If user has no profile row (edge case), redirect to `/onboarding`
- **Role check:** Admin routes check `session.user.app_metadata.role === 'admin'` in server component. If not admin, redirect to `/dashboard`.
- **Logout:** `supabase.auth.signOut()` clears cookies, redirects to `/`.
- **No magic link for signup** — only `forgot-password` flow uses magic link.

## 9. FILES

Below is every file to create or extend in the existing Next.js 15 project. Files in `(new)` are new; others modify existing ones.

```
src/
  app/
    (new) layout.tsx                              // Root layout — wrap with Supabase provider, apply globals.css
    (new) page.tsx                                // Landing page (enhance existing)
    (new) globals.css                             // Already exists — keep as-is
    (new) middleware.ts                           // Auth middleware — protect dashboard routes, check session
    auth/
      (new) login/
        page.tsx                                  // Login form page
      (new) signup/
        page.tsx                                  // Signup form page
      (new) forgot-password/
        page.tsx                                  // Forgot password form page
      (new) callback/
        route.ts                                  // Auth callback route (Supabase redirect handler)
    dashboard/
      (new) page.tsx                              // Dashboard main page — stats, previews
    onboarding/
      (new) page.tsx                              // Profile setup form after first signup
    profile/
      (new) page.tsx                              // Edit own profile
    directory/
      (new) page.tsx                              // Member directory with search/filters
      (new) [id]/
        page.tsx                                  // Read-only member profile
    events/
      (new) page.tsx                              // Event list with tabs
      (new) create/
        page.tsx                                  // Event creation form (admin only)
      (new) [id]/
        page.tsx                                  // Event detail + RSVP
    payments/
      (new) page.tsx                              // Payment management — tiers, history
    admin/
      (new) page.tsx                              // Admin dashboard — stats
    api/
      (new) auth/
        (new) create-profile/
          route.ts                                // POST — create profile row after signup
      (new) profile/
        route.ts                                  // PUT — update own profile
      (new) directory/
        route.ts                                  // GET — search members, filtered
      (new) events/
        (new) route.ts                            // GET all events, POST create event
        (new) [id]/
          (new) route.ts                          // GET event detail
          (new) rsvp/
            route.ts                              // POST toggle RSVP
      (new) stripe/
        (new) checkout/
          route.ts                                // GET — create Stripe Checkout Session
        (new) webhook/
          route.ts                                // POST — Stripe webhook listener
      (new) admin/
        (new) members/
          (new) route.ts                          // GET all members (admin)
          (new) [id]/
            (new) verify/
              route.ts                            // PUT verify member
            (new) suspend/
              route.ts                            // PUT suspend member
            (new) delete/
              route.ts                            // DELETE member

  components/
    (new) ui/
      (new) Button.tsx                            // Reusable button component with variants
      (new) Input.tsx                             // Reusable input with label, error
      (new) Card.tsx                              // Reusable card container
      (new) Spinner.tsx                           // Loading spinner
      (new) Toast.tsx                             // Toast notification (simple, no library)
    (new) layout/
      (new) Sidebar.tsx                           // Left sidebar navigation
      (new) TopNav.tsx                            // Top navigation bar
      (new) DashboardLayout.tsx                   // Layout wrapper for authenticated pages

  lib/
    (new) supabase/
      (new) client.ts                             // Browser Supabase client (from @supabase/ssr)
      (new) server.ts                             // Server-side Supabase client
      (new) middleware.ts                         // Middleware Supabase client
    (new) stripe.ts                               // Stripe client init
    (new) types.ts                                // TypeScript types for DB entities
    (new) utils.ts                                // Helper functions (formatCurrency, etc.)

  hooks/
    (new) useAuth.ts                              // Auth state hook (session, user, profile)
    (new) useDirectory.ts                         // Directory search/filter hook

.env.local                                          // Add: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
```

## 10. ACCEPTANCE CHECKLIST

- [ ] **Auth works entirely with email+password** — signup creates user + profile, login works, logout clears session, forgot-password sends email, middleware protects all `/dashboard/*` and `/admin/*` routes
- [ ] **Landing page** shows hero with "Apply for Membership" and "Member Login" CTAs, membership tier cards with prices and bullet lists, waitlist/signup form collects name+email+password
- [ ] **Onboarding** redirects new users to `/onboarding` where they fill profile fields, on save they land on `/dashboard` with welcome toast
- [ ] **Dashboard** shows greeting with member's first name, quick stats (membership tier, upcoming events count), directory preview (3 member cards), next event with RSVP button
- [ ] **Profile page** allows editing all fields, shows verification badge, has save/cancel/delete actions
- [ ] **Member directory** shows only verified members, search filters by name/industry/tier, cards show first name + last initial only, clicking navigates to read-only profile
- [ ] **Events page** shows upcoming/past tabs, event cards with details, RSVP toggle works (cannot RSVP past deadline or full events), admin can create events via form
- [ ] **Payments page** shows tier cards (current highlighted), upgrade/downgrade triggers Stripe Checkout, webhook handles success and updates membership tier, payment history table shows all transactions
- [ ] **Admin dashboard** shows stats (total members, pending verifications, revenue, upcoming events), member management table with verify/suspend/delete actions, event management table with edit/delete, payment table read-only
- [ ] **Design system** matches spec: charcoal/brass/ivory colors, Playfair+Satoshi fonts, flat buttons with uppercase text, no rounded corners, no shadows, minimal motion
- [ ] **No fabricated social proof** — no fake testimonials, no member counts, no "join 500+ members", no fake reviews
- [ ] **All buttons/links/forms wired** to real routes — no dead UI, no placeholder text, no "Coming Soon" buttons
- [ ] **Stripe integration** works end-to-end: checkout session created, payment processed, webhook received, membership tier updated in DB
- [ ] **Responsive** — mobile (single column, hamburger menu on sidebar), tablet (2 columns), desktop (3 columns)