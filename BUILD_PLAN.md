# Goon App Build Plan

## 1. PRODUCT

Goon is an invite-only digital clubhouse and membership management platform for high-net-worth LGBTQ+ individuals. It provides secure member profiles, event RSVP with Stripe payment integration, private member directory with connection requests, and a discretion-first community forum — all wrapped in an old-world aristocratic salon aesthetic. The core value is a trusted digital counterpart to a physical private club where members can manage their membership, discover and book member-only events, and connect with vetted peers without sacrificing privacy. The primary pain solved: HNW LGBTQ+ individuals lack a digital platform that combines the exclusivity of San Vicente Bungalows with the warmth of 1920s Parisian salon culture, without the data-mining and low-trust patterns of mainstream social apps.

## 2. WHO IT'S FOR

ICP: High-net-worth LGBTQ+ individuals aged 30-65, concentrated in West Hollywood/Beverly Hills, with $500k+ annual household income. Time-poor professionals who value discretion, old-world privacy, and authentic queer community. They spend $5k-25k+/year on luxury fashion, $200B+ globally on luxury travel, and will pay 20%+ premium for LGBTQ+-congruent services. They have left services due to discomfort (53% of gay men from spas). This shapes the product: no public profiles, no social feed noise, no data exploitation. The tone is warm but formal — like a handwritten invitation from a trusted friend. The dashboard opens on a single Today view with one primary CTA ("View Events"); no nested menus for core actions. Copy uses "Member" not "User", "Salon" not "Forum", "Invitation" not "Request".

## 3. LOOK & FEEL

### Visual System

**Vibe:** Old-world aristocratic salon meets modern queer luxury. Dark, warm, intimate. Think: wood-paneled library, candlelight, velvet, gilded frames. Digital equivalent: deep gradients, subtle textures, generous whitespace.

**Color Palette (from globals.css):**
- Background: `#1a1a1a` (near-black), `#2a2a2a` (card bg)
- Text: `#f5f5f0` (warm white), `#a0a090` (muted text)
- Accent Flame: `#ff6b35` (primary actions, CTAs)
- Accent Magenta: `#e91e63` (secondary, highlights)
- Accent Green: `#00e676` (success, online status)
- Border: `#3a3a3a` (subtle divider)

**Typography:**
- Headings: `font-heading` (Satoshi, sans-serif), large tracking on display text
- Body: `font-sans` (Satoshi regular), 16px base, 1.6 line-height
- Accent: `font-mono` (JetBrains Mono, for dates/prices)

**Spacing/Layout:**
- 12-column grid, max-width 1200px
- Section padding: `py-16 lg:py-24`
- Card padding: `p-6 lg:p-8`
- Border radius: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons

**Key Components:**
- `Card` - dark bg, subtle border, hover lift with `shadow-lg`
- `Button` - flame orange primary (`bg-accent hover:bg-accent/90`), outline secondary with border-accent
- `Input` - dark input with border, focus:ring-accent
- `Avatar` - circular, with online indicator (green dot)
- `Badge` - for membership tier display
- `Modal` - overlay with backdrop blur, for RSVP/connection actions
- `Toast` - for success/error feedback

**Iconography:**
- Lucide icons, consistent 20px stroke width
- Custom icons for: Membership tiers (crown, star, diamond), Events (calendar), Directory (users), Settings (gear)

**Imagery:**
- No stock photography. Use abstract gradients, geometric patterns, subtle textures (noise overlay on bg)
- Member profile: avatar upload only
- Event: venue photo upload by admin

**Interaction/Motion:**
- Page transitions: fade in 300ms
- Hover: subtle scale (1.02) on cards, color shift on buttons
- Modal: slide up 200ms, backdrop blur
- Toast: slide in from right, auto-dismiss 4s
- No parallax, no heavy animations — performance matters

### Screen Layouts

**Dashboard (`/dashboard`):**
- Top: App bar with Goon logo (left), search icon (right, expands on click)
- Below: Greeting "Good evening, [Name]" with date
- Main: Single column, two sections:
  1. "Your Next Event" card: event image (placeholder gradient), title, date/time, location, RSVP button (if not yet RSVP'd), "View Details" link
  2. "Recent Activity" feed: 3-4 items from forum/connections (minimal, no scroll)
- Bottom: Tab bar (mobile) or sidebar (desktop): Dashboard, Events, Directory, Salon (Forum), Profile, Settings

**Events Page (`/events`):**
- Top: "Upcoming Events" heading + filter pills (All, This Week, This Month)
- Grid: 2 columns desktop, 1 mobile. Each card: event image placeholder, title, date, time, location, RSVP count, RSVP button
- Detail page (click card): full event info with Stripe payment embed if paid

**Directory (`/directory`):**
- Top: Search bar + filter by membership tier
- Grid: 3 columns desktop, 2 tablet, 1 mobile. Each card: avatar, first name + last initial, membership tier badge, "Connect" button
- No full names, no contact info until connection accepted

**Salon (`/salon`):**
- Top: "The Salon" heading + "New Post" button
- List: Thread cards with title, author (first name + last initial), reply count, last activity timestamp

**Profile (`/profile`):**
- Top: Avatar + name + membership tier + member since
- Sections: Bio (optional), Tags (interests), Connected Members count, Settings gear

## 4. USER FLOWS

### Flow 1: Sign Up (Invite Only)
1. User receives invitation link with token
2. Lands on `/invite/[token]` - shows club branding + "You've been invited"
3. Enters email, creates password (show password requirements)
4. Clicks "Accept Invitation"
5. Supabase Auth creates user, token validated
6. Redirect to `/onboarding`

### Flow 2: Onboarding
1. `/onboarding` step 1: Upload avatar + set display name (first name + last initial)
2. Step 2: Select interests/tags (Art, Travel, Wine, etc.)
3. Step 3: Review membership tier (from invitation)
4. Step 4: Enter payment info (Stripe) if paid tier
5. Complete → redirect to `/dashboard`

### Flow 3: RSVP to Event
1. From dashboard or events page, click event card
2. `/events/[id]` shows event details
3. Click "RSVP" button
4. If paid: Stripe payment sheet opens in modal
5. On success: toast "You're in! See you there" + RSVP count updates
6. Event appears in "Your Events" on dashboard

### Flow 4: Connect with Member
1. Directory page, click "Connect" on member card
2. Modal: "Send connection request to [Name]?"
3. Click "Send Request"
4. Recipient gets notification (in-app + email)
5. Recipient can Accept/Decline from their "Requests" tab on directory
6. On accept: both appear in each other's connections list

### Flow 5: Create Forum Post
1. Salon page, click "New Post"
2. Modal: title input + rich text body
3. Optional: add tags
4. Click "Post to Salon"
5. Post appears in thread list, timestamp "just now"

### States
- **Loading:** Skeleton screens (gray animated cards)
- **Empty:** "Nothing here yet" with illustration + CTA
- **Error:** "Something went wrong" with retry button
- **Offline:** Banner "You're offline. Some features may not work."

## 5. PAGES/ROUTES

| Route | Purpose | Layout | UI Elements |
|-------|---------|--------|-------------|
| `/` | Landing (existing) | Full-width hero, features, tiers, waitlist | Hero, cards, waitlist form |
| `/invite/[token]` | Accept invitation | Centered card, branding | Form, validation |
| `/onboarding` | New member setup | Step wizard | Avatar upload, tags, payment |
| `/dashboard` | Member home | App shell + main content | Greeting, event card, activity |
| `/events` | Event listing | Grid with filter | Event cards, filter pills |
| `/events/[id]` | Event detail | Centered card | Image, details, RSVP, payment |
| `/directory` | Member finder | Search + grid | Search, member cards, connect |
| `/salon` | Forum threads | List | Thread cards, new post |
| `/salon/[id]` | Thread detail | Container | Posts, reply form |
| `/profile` | Own profile | Centered card | Avatar, info, settings |
| `/profile/[id]` | Member profile (connection only) | Centered card | Limited info |
| `/settings` | Account settings | Form | Email, password, notifications |
| `/admin` | Club admin (tier: club_admin) | Dashboard | Members, events, invitations management |

## 6. CORE FEATURES

### 6.1 Invite-Only Signup
- Generate unique token on member creation
- Token stored in `invitations` table with expiry (7 days)
- `/invite/[token]` validates token, shows member name + tier
- On accept: token marked used, auth user created, member record created
- No public signup page exists

### 6.2 Membership Tiers
- Three tiers: Founding ($1,200/yr), Premium ($2,200/yr), VIP ($3,500/yr)
- Stored in `membership_tiers` table with price, features (JSON), max_connections
- Member has tier_id + renewal_date
- Stripe subscription per tier (monthly/annual options)
- Tier badge shown on profile + directory

### 6.3 Event RSVP with Payments
- Admin creates events in admin panel (or via seed)
- Members view events, see RSVP count (not who)
- RSVP button: if free, instant; if paid, Stripe payment sheet
- On success: insert into `event_rsvps` with payment status
- Event card shows "X members attending"
- Check-in: admin can mark attended via admin panel

### 6.4 Private Member Directory
- Search members by name, filter by tier
- Each member card shows: first name + last initial, avatar, tier badge
- "Connect" button (not "Follow" or "Add Friend")
- Connection system: request → accept → both connected
- No full names, no contact info, no public profiles
- Profile only visible to connections

### 6.5 Salon (Private Forum)
- Thread-based, no public visibility
- Create post: title + body (rich text)
- Reply to threads
- Tags for filtering (Art, Travel, Current Affairs)
- Only members can view or post
- No likes, only replies (keeps it conversational, not performative)

### 6.6 PII Encryption
- Fields: email, full name, phone, address
- Encrypted at rest using Supabase Vault or pgcrypto
- Only member can decrypt their own PII
- Admin sees masked: j***@example.com

### 6.7 Audit Trail
- `audit_log` table: actor_id, action, target_id, timestamp
- Actions: login, invite_accepted, rsvp_created, connection_requested, profile_updated
- Read-only for admin, immutable

### 6.8 RLS (Row Level Security)
- Members table: user can read own; admin reads all; basic info visible to connected members
- Events: all members can read; admin write
- Event RSVPs: member sees own; admin sees all
- Salon posts: all members can read/write
- Connections: involved members only
- Invitations: admin only

### 6.9 Stripe Integration
- Webhook handlers for: checkout.session.completed, subscription.updated
- On checkout complete: update member tier + renewal_date
- On subscription failed: send warning email, downgrade after grace period
- Payment method management in settings

## 7. DATA MODEL

### Tables (in `supabase/migrations/`)

```sql
-- members
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users UNIQUE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_initial TEXT NOT NULL,
  avatar_url TEXT,
  tier_id UUID REFERENCES membership_tiers(id),
  renewal_date TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  bio TEXT,
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- membership_tiers
CREATE TABLE membership_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  interval TEXT DEFAULT 'year',
  features JSONB DEFAULT '[]',
  max_connections INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- invitations
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  tier_id UUID REFERENCES membership_tiers(id),
  invited_by UUID REFERENCES members(id),
  used BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  venue_name TEXT,
  venue_address TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  price_cents INTEGER,
  max_attendees INTEGER,
  image_url TEXT,
  created_by UUID REFERENCES members(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- event_rsvps
CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id),
  status TEXT DEFAULT 'confirmed', -- confirmed, waitlist, cancelled
  payment_status TEXT, -- paid, free, refunded
  stripe_session_id TEXT,
  checked_in BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, member_id)
);

-- connections
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES members(id),
  recipient_id UUID REFERENCES members(id),
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- forum_posts
CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_id UUID REFERENCES members(id),
  tags TEXT[] DEFAULT '{}',
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- forum_comments
CREATE TABLE forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES members(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- waitlist (existing)
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- audit_log
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES members(id),
  action TEXT NOT NULL,
  target_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Relationships
- Member → Membership Tier (belongs_to)
- Event → Event RSVP (has_many)
- Member → Event RSVP (has_many)
- Forum Post → Forum Comment (has_many)
- Member → Connection (has_many through connections)
- Invitation → Member (belongs_to inviter)

## 8. AUTH

### Implementation: Supabase Auth (email+password)

**Setup:**
- `@supabase/supabase-js` + `@supabase/ssr` for Next.js
- Supabase project configured with email/password auth
- Disable public signup (invite-only: create user via admin API)

**Flow:**
1. Invitation accepted → admin creates user via `supabase.auth.admin.createUser()`
2. User receives email with "Set your password" link
3. User sets password, logs in
4. Session managed via cookies (`@supabase/ssr` middleware)

**Key files:**
```typescript
// lib/supabase/client.ts - browser supabase client
// lib/supabase/server.ts - server supabase client  
// middleware.ts - refresh session on route changes
// app/(auth)/login/page.tsx - login form
// app/(auth)/callback/route.ts - auth callback handler
```

**Security:**
- RLS policies on all tables (see section 6.8)
- Rate limiting on login (Supabase built-in)
- Session timeout: 7 days
- No OAuth buttons (per spec, no provisioned credentials)

## 9. FILES

```json
[
  "app/layout.tsx",
  "app/page.tsx",
  "app/globals.css",
  "app/(auth)/login/page.tsx",
  "app/(auth)/invite/[token]/page.tsx",
  "app/(auth)/callback/route.ts",
  "app/(dashboard)/layout.tsx",
  "app/(dashboard)/dashboard/page.tsx",
  "app/(dashboard)/events/page.tsx",
  "app/(dashboard)/events/[id]/page.tsx",
  "app/(dashboard)/directory/page.tsx",
  "app/(dashboard)/salon/page.tsx",
  "app/(dashboard)/salon/[id]/page.tsx",
  "app/(dashboard)/profile/page.tsx",
  "app/(dashboard)/profile/[id]/page.tsx",
  "app/(dashboard)/settings/page.tsx",
  "app/(dashboard)/onboarding/page.tsx",
  "app/(dashboard)/admin/page.tsx",
  "app/(dashboard)/admin/members/page.tsx",
  "app/(dashboard)/admin/events/page.tsx",
  "app/api/auth/signup/route.ts",
  "app/api/auth/invite/route.ts",
  "app/api/members/route.ts",
  "app/api/members/[id]/route.ts",
  "app/api/events/route.ts",
  "app/api/events/[id]/rsvp/route.ts",
  "app/api/connections/route.ts",
  "app/api/connections/[id]/route.ts",
  "app/api/salon/posts/route.ts",
  "app/api/salon/posts/[id]/comments/route.ts",
  "app/api/stripe/webhook/route.ts",
  "app/api/stripe/create-checkout/route.ts",
  "lib/supabase/client.ts",
  "lib/supabase/server.ts",
  "lib/supabase/middleware.ts",
  "lib/stripe/client.ts",
  "lib/stripe/webhooks.ts",
  "lib/utils/cn.ts",
  "lib/utils/format.ts",
  "lib/utils/encryption.ts",
  "components/ui/Button.tsx",
  "components/ui/Card.tsx",
  "components/ui/Input.tsx",
  "components/ui/Modal.tsx",
  "components/ui/Badge.tsx",
  "components/ui/Avatar.tsx",
  "components/ui/Toast.tsx",
  "components/ui/Skeleton.tsx",
  "components/layout/AppShell.tsx",
  "components/layout/Sidebar.tsx",
  "components/layout/TopBar.tsx",
  "components/dashboard/EventCard.tsx",
  "components/dashboard/ActivityFeed.tsx",
  "components/events/EventGrid.tsx",
  "components/events/RSVPModal.tsx",
  "components/directory/MemberCard.tsx",
  "components/directory/ConnectModal.tsx",
  "components/salon/ThreadCard.tsx",
  "components/salon/NewPostModal.tsx",
  "components/salon/ReplyForm.tsx",
  "middleware.ts",
  "supabase/migrations/001_init.sql",
  "supabase/migrations/002_seed_tiers.sql",
  "supabase/seed.sql",
  "docs/MVP_ROADMAP.md",
  "next.config.js",
  "tailwind.config.ts",
  "tsconfig.json",
  "package.json",
  ".env.local.example"
]
```

## 10. ACCEPTANCE

- [ ] Landing page intact, design system preserved (globals.css, tailwind)
- [ ] Auth: email+password login works via Supabase, no public signup
- [ ] Invite flow: token generation → email → accept → onboard → dashboard
- [ ] Dashboard: shows greeting, next event, recent activity
- [ ] Events: listing, detail, RSVP (free + paid via Stripe)
- [ ] Directory: search, filter, send/accept connection requests
- [ ] Salon: create post, reply, thread list
- [ ] Profile: view own, edit, view connected members
- [ ] Membership tiers: seeded, displayed, stripe subscription functional
- [ ] RLS: members see only what they should (own RSVPs, basic member info, etc.)
- [ ] PII encryption: email/full name encrypted at rest
- [ ] Audit trail: key actions logged to audit_log
- [ ] Admin panel: manage members, events, invitations
- [ ] Stripe webhook: handles checkout + subscription events
- [ ] Responsive: mobile-first, works on tablet/desktop
- [ ] Error states: loading skeletons, empty states, error toasts
- [ ] Deployed to Vercel with env vars configured