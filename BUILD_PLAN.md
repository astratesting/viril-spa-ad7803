# Goon Membership System — Complete Build Plan

## 1. PRODUCT

Goon is a waitlist and membership management system for an exclusive private members club targeting HNW LGBTQ+ individuals in Los Angeles. The system processes pre-launch applications through a branded waitlist form, enables admin review/approval of candidates, and provisions approved members with accounts and tiered access. Core value: a discrete, aristocratic application pipeline that feels exclusive yet welcoming — no public signup, only invite-based account creation after admin approval. Primary user is the club's membership director (admin) who reviews applications and manages member tiers. Specific pain solved: HNW LGBTQ+ professionals ($200K+ income, 30-55) have no venue that provides old-world aristocratic queer belonging in LA — existing clubs (Soho House, San Vicente Bungalows) fail on authentic LGBTQ+ cultural ownership and safety. This system gates membership to ensure only vetted, aligned individuals enter the community.

## 2. WHO IT'S FOR

- **Primary admins**: Club management (1-3 people) who need a single-pane-of-glass view of applications, member status, and audit logs. They are time-poor — dashboard must show key metrics without secondary clicks. No nested menus.
- **Applicants**: HNW gay/lesbian professionals 30-55, $200K+ income, living in WeHo/Beverly Hills/Hollywood Hills. They expect elegant, frictionless digital experiences. The waitlist form is their first brand touchpoint — must feel luxurious and exclusive, not like a Google Form.
- **Members**: Pre-launch approved members who receive an invitation email with a signup link. After account creation, they see a "Coming Soon" member dashboard with club updates.
- **Tone**: Opulent but not ostentatious. "You belong here" — confident, warm, exclusive without being cold. No "Join now" CTAs — use "Apply for Membership" or "Submit Application."

## 3. LOOK & FEEL

### Visual System

**Vibe**: "Aristocratic queer salon" — dark, warm, intimate. Think 1920s Parisian salon meets modern luxury brand. Chrome, velvet, candlelight. High contrast, sparing use of color as accent.

**Color Palette** (exact from existing globals.css):
- `bg-black` (#000000) — full screen backgrounds
- `bg-[#1C1C1E]` — cards, surfaces, form fields
- `text-white` (#FFFFFF) — primary text
- `text-[#8E8E93]` — secondary/placeholder text
- `border-[#3A3A3C]` — subtle dividers, inputs
- `bg-[#FF3B30]` (flame) — primary CTAs, status indicators, error states, accent icons
- `text-[#FF9500]` (orange) — warning states, secondary highlights
- `text-[#34C759]` (green) — approved/success states, confirmations

**Typography**:
- Display: `font-['Archivo_Black']` — club name, page titles, hero text (ALL CAPS by default)
- UI: `font-['Satoshi']` — body text, labels, table content, navigation
- Sizes: h1 = text-5xl (48px), h2 = text-3xl (30px), h3 = text-xl (20px), body = text-sm (14px), small = text-xs (12px)
- Weights: Satoshi 400 (regular), 500 (medium), 700 (bold). Archivo Black is 900 only.

**Spacing/Layout**:
- Max content width: 7xl (80rem / 1280px) for public pages, 6xl (72rem) for dashboard
- Vertical rhythm: space-y-6 between sections, space-y-4 between related items
- Section padding: px-4 sm:px-6 lg:px-8, py-12 sm:py-16 lg:py-24
- Cards: rounded-2xl with subtle border (border border-[#3A3A3C]/50)
- Input fields: rounded-xl bg-[#1C1C1E] border border-[#3A3A3C] px-4 py-3 text-white

**Key Components**:
- `Button` — variants: primary (bg-[#FF3B30] text-black hover:bg-[#FF3B30]/90), secondary (bg-transparent border border-white/20 text-white hover:bg-white/5), ghost (text-[#8E8E93] hover:text-white)
- `Input` — dark surface, white text, subtle border focus ring [color primary/50]
- `Select` — styled dropdown matching input theme
- `Badge` — status indicators: pending = bg-[#FF9500]/20 text-[#FF9500], approved = bg-[#34C759]/20 text-[#34C759], rejected = bg-[#FF3B30]/20 text-[#FF3B30], waitlisted = bg-[#8E8E93]/20 text-[#8E8E93]
- `Table` — dark with row hover effects, sticky header, sortable column headers
- `Sidebar` — fixed left, dark surface, active state uses primary color indicator

**Iconography**: Minimal. Use SVG icons (lucide-react) — User, Mail, Check, X, Eye, Filter, LogOut, LayoutDashboard, ClipboardList, Settings, ArrowRight, ChevronDown, Search, Clock

**Imagery**: None needed for admin dashboard. Public waitlist page uses the existing hero from landing page (luxury venue photography). Members page shows a brand-consistent "Coming Soon" illustration (SVG or gradient).

**Interaction/Motion**:
- Hover transitions: 200ms ease-out on buttons, cards
- Form submission: spinner replaces button text on submit, disabled state
- Status changes: subtle pulse animation on approval/rejection
- Page transitions: instant (no artificial loading)
- Toast notifications: bottom-right, slide-up, auto-dismiss after 4s

### Screen Layouts

**Public Waitlist Form** (`/waitlist`):
- Full-screen dark background
- Centered card (max-w-lg) with subtle glow border-top (primary color)
- Card header: GOON wordmark (Archivo Black, text-3xl, letterspaced), tagline "Apply for Membership"
- Fields stacked vertically: Email, First Name, Last Name, Phone (optional), Income Range (dropdown), How Did You Hear (dropdown), Message (optional textarea)
- Submit button: full width, "Submit Application", primary color
- Footer: "Already a member? Sign in" link to login page
- Success state replaces form: green checkmark, "Application Received. You'll hear from us within 48 hours."

**Login** (`/login`):
- Same centered card layout
- "Welcome Back" heading
- Email + Password fields
- "Sign In" primary button
- Link to signup: "No account? Apply for membership"
- Error states inline below fields

**Signup** (`/signup`):
- Same layout, but only accessible via invitation link (not public nav)
- "Create Your Account" heading
- Email (prefilled from invite), Password, Confirm Password
- "Create Account" primary button
- After success: redirect to member dashboard

**Admin Dashboard** (`/dashboard`):
- Sidebar (w-64) fixed left: logo at top, nav items: Dashboard, Waitlist, Members (future), Settings (future)
- Main content area: padding p-6
- Top bar: greeting "Good morning, [Name]", member count badge
- Stats row: 4 cards (Total Applications, Pending, Approved, Rejected) — each with icon, number, label
- Below stats: Recent Applications table (compact, last 10) with status badges and action buttons

**Waitlist Admin** (`/dashboard/waitlist`):
- Full table view with search bar and status filter (All, Pending, Approved, Rejected, Waitlisted)
- Table columns: Name, Email, Income Range, Status, Submitted (date), Actions
- Actions: Approve (green), Reject (red), View (eye icon) — opens detail modal/panel
- Detail panel (slide-in from right): full application data, admin notes textarea, action buttons
- Pagination: 20 per page

**Member Dashboard** (`/member`):
- Minimal "Coming Soon" layout
- Left: "Welcome to Goon" message with member name
- Center: stylized "Coming Soon — Q1 2026" with club promises animation
- Right: Member details (tier, member since date)
- Footer: "Logout" link

## 4. USER FLOWS

### Flow 1: Prospect Applies

1. **Entry**: User lands on `/waitlist` from social/link/word-of-mouth
2. **Fill Form**: Completes all required fields (email, first_name, last_name, income_range, how_did_you_hear)
3. **Submit**: Clicks "Submit Application" → button shows spinner, fields lock
4. **Success**: Form replaced with success state → green checkmark, "Application Received. You'll hear from us within 48 hours."
5. **Email Sent**: System sends confirmation to applicant email via Resend (`sendWaitlistConfirmation`)
6. **Admin Notified**: System sends notification to admin email (`sendAdminNotification`)

### Flow 2: Admin Reviews Application

1. **Login**: Admin navigates to `/login`, enters credentials
2. **Dashboard**: Redirected to `/dashboard` — sees 4 stats cards, recent applications table
3. **View All**: Clicks "View All" or navigates to `/dashboard/waitlist`
4. **Review**: Clicks "View" on an application → slide-in panel shows full details
5. **Approve**: Clicks "Approve" → confirmation dialog → application status changes to 'approved'
6. **Audit Logged**: System logs action in audit_log table
7. **Email Sent**: System sends welcome/approval email to applicant with signup link (`sendApprovalEmail`)
8. **Member Created**: System creates entry in members table (status: 'pending', tier: 'founding')
9. **Toast**: Success notification appears in dashboard

### Flow 3: Approved Member Signs Up

1. **Email**: Member receives invitation email with "Create Your Account" button linking to `/signup?email=xxx&token=xxx`
2. **Signup**: Clicks link → prefilled email, sets password
3. **Submit**: Clicks "Create Account" → Supabase Auth creates user
4. **Redirect**: Auto-redirects to `/member` dashboard
5. **Member Dashboard**: Shows "Welcome, [Name] — Coming Soon" with tier and member number

### Flow 4: Auth Session Management

1. **Middleware Check**: On every request to `/dashboard/*` or `/member/*`, middleware checks Supabase session
2. **Valid Session**: Proceed to requested page
3. **Expired Session**: Refresh token via middleware → if refresh fails, redirect to `/login`
4. **No Session**: Redirect to `/login` with `?redirect=original_url`
5. **Logout**: Click "Logout" → POST to `/api/auth/logout` → clear cookies → redirect to landing page

## 5. PAGES/ROUTES

### Public Routes (no auth required)

| Route | Purpose | Layout | UI Elements |
|-------|---------|--------|-------------|
| `/` | Existing landing page | Full screen hero | Existing components — KEEP AS-IS |
| `/waitlist` | Application form | Centered card | WaitlistForm component, success state |
| `/login` | Auth sign-in | Centered card | EmailInput, PasswordInput, SubmitButton |
| `/signup` | New account creation | Centered card | EmailInput, PasswordInput, ConfirmInput, SubmitButton |

### Protected Routes (auth required)

| Route | Purpose | Layout | UI Elements |
|-------|---------|--------|-------------|
| `/dashboard` | Admin main view | Sidebar + content | StatsCard × 4, WaitlistTable (compact) |
| `/dashboard/waitlist` | Full waitlist management | Sidebar + content | SearchBar, FilterDropdown, WaitlistTable (full), DetailPanel |
| `/dashboard/members` | Member management (future) | Sidebar + content | Placeholder "Coming Soon" |
| `/dashboard/settings` | Admin settings (future) | Sidebar + content | Placeholder "Coming Soon" |
| `/member` | Member portal | Centered content | WelcomeMessage, TierBadge, StatusInfo |

### API Routes

| Route | Method | Purpose | Auth |
|-------|--------|---------|------|
| `/api/waitlist` | POST | Submit application | Public |
| `/api/waitlist` | GET | List all applications | Admin only |
| `/api/waitlist/[id]` | GET | Get single application | Admin only |
| `/api/waitlist/[id]` | PATCH | Update status/notes | Admin only |
| `/api/waitlist/[id]` | DELETE | Remove application | Admin only |
| `/api/auth/logout` | POST | Clear auth session | Authenticated |
| `/api/members/me` | GET | Get current member profile | Authenticated |

## 6. CORE FEATURES

### Feature 1: Supabase Auth Integration (fully working)

**How it works**:
- `frontend/lib/supabase/client.ts`: Creates browser client using `createBrowserClient` from `@supabase/ssr` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `frontend/lib/supabase/server.ts`: Creates server client using `createServerClient` from `@supabase/ssr` — reads cookies via `cookies()` from `next/headers`, sets cookie options for secure HTTP-only transmission
- `frontend/lib/supabase/middleware.ts`: Exports `createClient` function for middleware that uses `next/headers` cookies, refreshes session if expired
- `frontend/middleware.ts`: Exports `config` with `matcher: ['/dashboard/:path*', '/member/:path*', '/api/dashboard/:path*']`. Checks session on every matched request. If no session = redirect to `/login`. If session exists but no member record = create one from auth metadata
- `frontend/app/(auth)/login/page.tsx`: Client component with form. On submit → calls `supabase.auth.signInWithPassword({ email, password })` → on success `router.push('/dashboard')` (or redirect param). On error → show inline message
- `frontend/app/(auth)/signup/page.tsx`: Client component. On submit → calls `supabase.auth.signUp({ email, password, options: { data: { first_name, last_name } } })` → on success → show "Check your email to confirm" message. **Note**: Email confirmation is ON by default in Supabase. If testing locally, disable email confirmation in Supabase dashboard
- `frontend/app/(auth)/auth/callback/route.ts`: Route handler for OAuth callbacks (future use). Reads `code` from query, exchanges for session via `supabase.auth.exchangeCodeForSession`, redirects to `/dashboard`

### Feature 2: Waitlist Application System

**How it works**:
- `frontend/components/WaitlistForm.tsx`: Client component with controlled form state using `useState`. Fields: `email` (type email, required), `first_name` (text, required), `last_name` (text, required), `phone` (tel, optional), `income_range` (select, required — options: "$200k-$500k", "$500k-$1M", "$1M-$5M", "$5M+"), `how_did_you_hear` (select, required — options: "Friend/Family", "Social Media", "Google", "Article/News", "Event", "Other"), `message` (textarea, optional). On submit → POST to `/api/waitlist` with JSON body. Shows loading state, then success/error state
- `frontend/app/api/waitlist/route.ts`: Route handler. POST: validates body with Zod schema (email string().email(), first_name string().min(1), last_name string().min(1), phone optional, income_range enum, how_did_you_hear enum, message optional). If invalid → 400 with errors. If valid → insert into `waitlist_applications` table via `supabaseAdmin` (service role client). Return 201 with `{ success: true, id }`. Send confirmation email (async, don't await). GET: requires admin auth. Returns paginated list with search/filter params
- `frontend/app/api/waitlist/[id]/route.ts`: Route handler with GET/PATCH/DELETE. All require admin auth. PATCH accepts `status` (enum pending/approved/rejected/waitlisted) and `admin_notes` (text). On status change to 'approved' → create member record from application data, send approval email. DELETE removes application and sends cancellation email (optional)
- **Zod schema** (shared in `frontend/lib/validations/waitlist.ts`): Exports `waitlistSchema` and `waitlistStatusSchema` for reuse across form and API

### Feature 3: Admin Dashboard

**How it works**:
- `frontend/app/dashboard/layout.tsx`: Server component layout. Fetches current user session. If no session → redirect to `/login`. Renders `<Sidebar>` component and main content area (children). Sidebar is fixed left (w-64), content has `ml-64 pl-6 pr-6`
- `frontend/components/dashboard/Sidebar.tsx`: Client component. Logo at top (Archivo Black "GOON"). Nav items with lucide icons: Dashboard (`/dashboard`), Waitlist (`/dashboard/waitlist`), Members (`/dashboard/members`), Settings (`/dashboard/settings`). Active state highlights with primary color. Logout button at bottom
- `frontend/app/dashboard/page.tsx`: Server component. Queries `waitlist_applications` for counts: `{ total: count(*), pending: count(status='pending'), approved: count(status='approved'), rejected: count(status='rejected') }`. Passes to `StatsCard` components. Also queries last 10 applications for compact table
- `frontend/components/dashboard/StatsCard.tsx`: Props: `icon`, `label`, `value`, `color` (string for text color). Renders dark card with icon, number (text-3xl font-bold), label (text-sm text-[#8E8E93])
- `frontend/components/dashboard/WaitlistTable.tsx`: Props: `applications`, `onApprove`, `onReject`, `onView`. Renders table with sortable columns (click header to sort asc/desc). Each row shows: name (first + last), email, income_range, status badge, created_at (formatted), action buttons (approve/reject/view). Uses `useState` for sort state

### Feature 4: Database Schema & RLS

**Implementation**: `frontend/supabase/schema.sql` — run this in Supabase SQL Editor. Creates 3 tables with RLS policies. The `members` table links to `auth.users` via `user_id` foreign key. `members.is_admin` boolean gates admin access. `audit_log` tracks all admin actions for accountability

### Feature 5: Email Integration (Resend)

**Implementation**:
- `frontend/lib/email.ts`: Three functions:
  - `sendWaitlistConfirmation(email, firstName)`: Sends HTML email with GOON branding (dark background, Archivo Black "GOON" header). Body: "Dear {firstName}, thank you for applying to Goon. We review applications within 48 hours..."
  - `sendAdminNotification(application)`: Sends to admin email (from env var `ADMIN_EMAIL`). Body: "New application from {firstName} {lastName} ({email}) — Income: {income_range}"
  - `sendApprovalEmail(application)`: Sends to applicant. Body: "Welcome to Goon, {firstName}. Your application has been approved. Create your account: {signupLink}" with button styled in primary color
- All use `resend.emails.send({ from: 'Goon <goon@resend.dev>', to, subject, html })`
- HTML templates use inline styles for email client compatibility

### Feature 6: Admin Auth Helper

**Implementation**:
- `frontend/lib/admin.ts`: Exports `isAdmin()` function. Gets current user from Supabase server client. Queries `members` table with `user_id = auth.uid()`. Returns boolean from `is_admin` field. If no member record or user not found → returns false. Used in all admin API routes and dashboard layout

### Feature 7: Unit Tests

**Implementation**:
- `frontend/__tests__/api/waitlist.test.ts`: Tests POST with valid data → 201. POST with invalid email → 400. GET without auth → 401. GET with auth → 200 with data
- `frontend/__tests__/api/admin.test.ts`: Tests PATCH on waitlist without admin role → 403. Tests PATCH with admin role → 200
- `frontend/__tests__/components/WaitlistForm.test.ts`: Tests form renders all fields. Tests submit with empty required field → shows error. Tests submit with valid data → calls API
- Setup: `vitest.config.ts` with React testing library, `jest-dom` matchers

## 7. DATA MODEL

### waitlist_applications

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, default gen_random_uuid() | Auto-generated |
| email | TEXT | UNIQUE, NOT NULL | Must be unique |
| first_name | TEXT | NOT NULL | |
| last_name | TEXT | NOT NULL | |
| phone | TEXT | NULLABLE | |
| income_range | TEXT | NULLABLE | ENUM in app logic |
| how_did_you_hear | TEXT | NULLABLE | ENUM in app logic |
| message | TEXT | NULLABLE | |
| status | TEXT | NOT NULL, DEFAULT 'pending', CHECK IN ('pending','approved','rejected','waitlisted') | |
| admin_notes | TEXT | NULLABLE | Internal notes |
| ip_address | TEXT | NULLABLE | For abuse prevention |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | Updated via trigger |

### members

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, default gen_random_uuid() | |
| user_id | UUID | UNIQUE, NOT NULL, FK → auth.users(id) ON DELETE CASCADE | Links to Supabase Auth |
| email | TEXT | UNIQUE, NOT NULL | Denormalized from auth |
| first_name | TEXT | NOT NULL | |
| last_name | TEXT | NOT NULL | |
| phone | TEXT | NULLABLE | |
| membership_tier | TEXT | NOT NULL, DEFAULT 'founding', CHECK IN ('founding','premium','vip') | |
| membership_status | TEXT | NOT NULL, DEFAULT 'pending', CHECK IN ('pending','active','suspended','cancelled') | |
| is_admin | BOOLEAN | NOT NULL, DEFAULT false | Admin gate |
| bio | TEXT | NULLABLE | |
| interests | TEXT[] | NULLABLE | PostgreSQL array |
| photo_url | TEXT | NULLABLE | |
| waitlist_application_id | UUID | FK → waitlist_applications(id) | Reference back |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

### audit_log

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, default gen_random_uuid() | |
| actor_id | UUID | FK → auth.users(id) | Who did it |
| action | TEXT | NOT NULL | e.g. 'approved_application', 'rejected_application', 'updated_member_tier' |
| entity_type | TEXT | NOT NULL | e.g. 'waitlist_application', 'member' |
| entity_id | UUID | NULLABLE | Which record |
| metadata | JSONB | NULLABLE | Extra context |
| ip_address | TEXT | NULLABLE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

### Relationships

- `waitlist_applications.id` → `members.waitlist_application_id` (optional 1:1)
- `auth.users.id` → `members.user_id` (1:1, unique constraint)
- `auth.users.id` → `audit_log.actor_id` (1:many)

## 8. AUTH

**Implementation**: Pure Supabase Auth via `@supabase/ssr` — no NextAuth, no Clerk.

- **Sign up**: Email + password only. User data (first_name, last_name) passed via `options.data` in `signUp()`. Email confirmation required.
- **Sign in**: Email + password. Session stored in HTTP-only cookies managed by `@supabase/ssr`.
- **Session refresh**: Middleware checks and refreshes token on every request to protected routes.
- **Logout**: API route calls `supabase.auth.signOut()` and clears cookies.
- **Authorization**: Admin access gated by `members.is_admin` column via `admin.ts` helper — not by role claims in auth metadata (simpler, more transparent for this scale).
- **Route protection**: Middleware redirects unauthenticated users to `/login`. Dashboard layout re-checks session and admin status on server.

**No OAuth buttons** — dead social buttons are worse than none. Pure email/password is the right choice for a small, admin-only system pre-launch.

## 9. FILES

**Existing files to KEEP AS-IS**:
- `app/page.tsx` (landing page)
- `app/globals.css` (design system vars)
- `tailwind.config.ts` (color extensions)
- All existing layout and component files in `app/` that are part of landing page

**Files to CREATE**:

```json
[
  "frontend/lib/supabase/client.ts",
  "frontend/lib/supabase/server.ts",
  "frontend/lib/supabase/middleware.ts",
  "frontend/middleware.ts",
  "frontend/app/(auth)/login/page.tsx",
  "frontend/app/(auth)/signup/page.tsx",
  "frontend/app/(auth)/auth/callback/route.ts",
  "frontend/app/api/auth/logout/route.ts",
  "frontend/app/api/waitlist/route.ts",
  "frontend/app/api/waitlist/[id]/route.ts",
  "frontend/app/(public)/waitlist/page.tsx",
  "frontend/components/WaitlistForm.tsx",
  "frontend/app/dashboard/layout.tsx",
  "frontend/app/dashboard/page.tsx",
  "frontend/app/dashboard/waitlist/page.tsx",
  "frontend/app/dashboard/members/page.tsx",
  "frontend/app/member/page.tsx",
  "frontend/components/dashboard/Sidebar.tsx",
  "frontend/components/dashboard/StatsCard.tsx",
  "frontend/components/dashboard/WaitlistTable.tsx",
  "frontend/lib/email.ts",
  "frontend/lib/admin.ts",
  "frontend/lib/validations/waitlist.ts",
  "frontend/supabase/schema.sql",
  "frontend/__tests__/api/waitlist.test.ts",
  "frontend/__tests__/api/admin.test.ts",
  "frontend/__tests__/components/WaitlistForm.test.ts",
  "frontend/vitest.config.ts",
  ".env.example"
]
```

## 10. ACCEPTANCE CHECKLIST

- [ ] `frontend/supabase/schema.sql` executed in Supabase SQL Editor — all 3 tables + RLS policies created
- [ ] Supabase Auth enabled (email/password, email confirmation ON)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` set in `.env.local`
- [ ] `RESEND_API_KEY` set in `.env.local` — Resend verified sender `goon@resend.dev`
- [ ] `npm install @supabase/ssr @supabase/supabase-js resend zod vitest @testing-library/react @testing-library/jest-dom`
- [ ] Public `/waitlist` page renders branded form, submits application, shows success state
- [ ] Waitlist form validation: empty required fields show error messages, invalid email rejected, valid submission saved to DB
- [ ] API `POST /api/waitlist` returns 201 with valid data, 400 with invalid data
- [ ] API `GET /api/waitlist` returns 401 without auth, 200 with auth + admin role
- [ ] API `PATCH /api/waitlist/[id]` approves application → creates member record → sends approval email
- [ ] Waitlist confirmation email sent on submission (check Resend dashboard)
- [ ] Admin notification email sent on new application
- [ ] Approval email sent with signup link when admin approves
- [ ] Login page renders, authenticates with valid credentials, redirects to `/dashboard`
- [ ] Login page shows error for invalid credentials
- [ ] Signup page creates auth user, shows confirmation message
- [ ] Middleware protects `/dashboard/*` — redirects to `/login` without session
- [ ] Dashboard layout renders with sidebar navigation
- [ ] Dashboard page shows 4 stats cards with correct counts from DB
- [ ] Dashboard waitlist page shows full table with search, filter, sort
- [ ] Waitlist table row actions: approve, reject, view detail (slide-in panel)
- [ ] Approval creates member record, rejection does not
- [ ] Audit log entries created for approve/reject actions
- [ ] `/member` route shows "Coming Soon" member dashboard
- [ ] Logout clears session and redirects to landing page
- [ ] Admin-only API routes return 403 for non-admin users
- [ ] All vitest tests pass (`npx vitest run`)
- [ ] No dead OAuth buttons or placeholder features
- [ ] Existing landing page unchanged and functional