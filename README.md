# Goon — Private Members Club

Membership management platform for an aristocratic LGBTQ+ private club in West
Hollywood. Public waitlist → application review → dues payment → member
directory → event RSVP → parlor booking.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind ·
Supabase Auth (`@supabase/ssr`) · Prisma + PostgreSQL · Stripe.

## Live demo (no backend required)

The app runs with **placeholder credentials and no real database** by falling
back to a built-in JSON-file store + JWT sessions. Two seeded demo accounts:

| Role   | Email             | Password  | Lands on   |
|--------|-------------------|-----------|------------|
| Member | `demo@demo.app`   | `demo123`  | `/dashboard` |
| Admin  | `admin@demo.app`  | `admin123` | `/admin`     |

**One-click entry:** the landing page (`/`) has a **View Live Demo** button that
starts a demo member session and lands on the dashboard. The login page also has
a **Try the live demo** shortcut.

To reseed the demo store at any time:

```bash
npm run seed
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run seed     # (re)seed the demo JSON store
```

## Environment

Copy `.env.example` to `.env.local`. Every var is optional for the demo:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` /
  `SUPABASE_SERVICE_ROLE_KEY` — Supabase Auth. When unset, credential auth
  (JWT + JSON store) is used.
- `DATABASE_URL` — PostgreSQL URL for Prisma. When unset/placeholder, the JSON
  store is used.
- `AUTH_SECRET` — JWT signing secret.
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` /
  `STRIPE_WEBHOOK_SECRET` — Stripe (test mode). When unset, payments are
  simulated in-app so the flow stays explorable.

## Auth

Email + password only (no social OAuth, no Clerk). Sessions are signed JWTs in
an httpOnly cookie. `middleware.ts` protects `/dashboard`, `/members`, `/events`,
`/parlors`, `/payment`, and `/admin/*`; admin routes require the `admin` role.

Supabase wiring lives in `lib/supabase/{server,client,middleware}.ts` and is
active only when Supabase env vars are configured.

## Data model

`prisma/schema.prisma` defines the production Postgres schema (11 models):
`User`, `WaitlistEntry`, `MembershipApplication`, `MembershipTier`, `Event`,
`EventAttendee`, `Parlor`, `ParlorBooking`, `Payment`, `AuditLog`. The demo
JSON store in `lib/db.ts` mirrors these models.

## Routes

Public: `/`, `/login`, `/signup`
Member: `/dashboard`, `/members`, `/events`, `/events/[id]`, `/parlors`, `/payment`
Admin: `/admin`, `/admin/applications`, `/admin/applications/[id]`,
`/admin/members`, `/admin/events`, `/admin/parlors`, `/admin/payments`

API: `/api/waitlist`, `/api/auth/{signup,login,logout,demo}`,
`/api/members`, `/api/events`, `/api/events/rsvp`, `/api/parlors`,
`/api/parlors/book`, `/api/payments/checkout`, `/api/webhooks/stripe`,
`/api/admin/applications/[id]`, `/api/admin/events`, `/api/admin/parlors`.

## MVP Roadmap

- **Phase 1 — Waitlist site + DB + Admin panel** (this build): public waitlist,
  credential auth, admin application review, member dashboard.
- **Phase 2 — Member directory + Event RSVP** (this build): searchable
  directory, event listing + detail + RSVP with capacity.
- **Phase 3 — Payment integration + Parlor booking** (this build): Stripe
  checkout for dues, parlor browse + booking modal with slot validation.

## Design

Reuses the landing's design system: near-black `#0A0A0B` / charcoal `#1C1C1E`,
muted brass `#C5A55A`, ivory `#F5F0EB`, burgundy `#4B2A2C`; Playfair Display
(headings), Satoshi (body), Archivo Black (display).

## Honesty

No fabricated testimonials, customer names/photos, logos, user counts, ratings,
or revenue figures. Seeded members/events are neutral demo data for product
exploration, not implied real customers.
