import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Badge from "@/components/ui/Badge";
import { getSession } from "@/lib/auth";
import {
  findUserById,
  listEvents,
  listBookingsForUser,
  countAttendees,
} from "@/lib/db";
import { formatDate, formatTime, isPast } from "@/lib/utils";
import type { ReactNode } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/dashboard");

  const user = await findUserById(session.userId);
  if (!user) redirect("/login");

  if (user.role === "pending_payment") redirect("/payment");

  const params = await searchParams;
  const showSuccess = params.payment === "success";

  const allEvents = await listEvents();
  const upcoming = allEvents.filter((e) => !isPast(e.date)).slice(0, 3);
  const upcomingWithCounts = await Promise.all(
    upcoming.map(async (e) => ({ event: e, count: await countAttendees(e.id) }))
  );
  const bookings = await listBookingsForUser(session.userId);

  const statusBadge =
    user.role === "admin" ? (
      <Badge tone="brass">Administrator</Badge>
    ) : user.role === "member" ? (
      <Badge tone="green">Active Member</Badge>
    ) : (
      <Badge tone="amber">Under Review</Badge>
    );

  return (
    <div className="min-h-screen bg-ink">
      <Navbar
        name={user.name}
        membershipTier={user.membership_tier}
        isAdmin={user.role === "admin"}
      />

      {showSuccess && (
        <div className="bg-brass/10 border-b border-brass/30 px-6 py-3 text-center font-satoshi text-sm text-brass">
          Welcome to the house — your membership is active.
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section>
          <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-3">
            Welcome
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="font-playfair text-4xl md:text-5xl text-ivory">
              {user.name}
            </h1>
            <div className="flex items-center gap-3">
              {statusBadge}
              {user.membership_tier && (
                <span className="font-satoshi text-sm text-ivory/60">
                  {user.membership_tier}
                </span>
              )}
            </div>
          </div>
          {user.membership_expires_at && (
            <p className="mt-2 font-satoshi text-sm text-ivory/45">
              Membership renews {formatDate(user.membership_expires_at)}.
            </p>
          )}
        </section>

        {user.role === "pending" ? (
          <div className="border border-brass/20 bg-charcoal-soft p-8">
            <h2 className="font-playfair text-2xl text-ivory mb-3">
              Your application is under review.
            </h2>
            <p className="font-satoshi text-sm text-ivory/70 leading-relaxed">
              The house steward reviews each application personally. You will be
              contacted at <span className="text-brass">{user.email}</span> when
              your membership is approved. There is nothing more to do here.
            </p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Tile
                href="/events"
                icon="calendar"
                label="Upcoming Events"
                value={`${upcoming.length}`}
              />
              <Tile
                href="/members"
                icon="users"
                label="Member Directory"
                value="Browse"
              />
              <Tile
                href="/parlors"
                icon="door"
                label="Book a Parlor"
                value="Reserve"
              />
            </section>

            {bookings.length > 0 && (
              <section>
                <h2 className="font-playfair text-2xl text-ivory mb-5">
                  My Bookings
                </h2>
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="border border-ivory/10 bg-charcoal-soft px-6 py-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-satoshi text-sm text-ivory">
                          {b.parlor}
                        </p>
                        <p className="font-satoshi text-xs text-ivory/50 mt-1">
                          {formatDate(b.date)} · {formatTime(b.start_time)} · {b.duration}h
                        </p>
                      </div>
                      <Badge tone="brass">Confirmed</Badge>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-playfair text-2xl text-ivory">
                  Coming up at the house
                </h2>
                <Link
                  href="/events"
                  className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
                >
                  All events
                </Link>
              </div>
              {upcoming.length === 0 ? (
                <p className="font-satoshi text-sm text-ivory/50">
                  No events scheduled yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcomingWithCounts.map(({ event, count }) => (
                    <EventCard key={event.id} event={event} count={count} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function Tile({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <Link
      href={href}
      className="group border border-ivory/10 bg-charcoal-soft p-8 hover:border-brass/50 hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="text-brass mb-4">{iconSvg(icon)}</div>
      <p className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/50">
        {label}
      </p>
      <p className="font-playfair text-3xl text-ivory mt-1 group-hover:text-brass transition-colors">
        {value}
      </p>
    </Link>
  );
}

function EventCard({
  event,
  count,
}: {
  event: { id: string; title: string; date: string; time: string };
  count: number;
}) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="block border border-ivory/10 bg-charcoal-soft p-6 hover:border-brass/50 transition-colors"
    >
      <p className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass">
        {formatDate(event.date)} · {formatTime(event.time)}
      </p>
      <p className="font-playfair text-lg text-ivory mt-2">{event.title}</p>
      <p className="font-satoshi text-xs text-ivory/50 mt-2">{count} attending</p>
    </Link>
  );
}

function iconSvg(name: string): ReactNode {
  const c = {
    fill: "none" as const,
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-6 h-6",
  };
  if (name === "calendar")
    return (
      <svg {...c}>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    );
  if (name === "users")
    return (
      <svg {...c}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2 21c0-3.5 3-5.5 7-5.5s7 2 7 5.5" />
        <path d="M16 5.5a3.5 3.5 0 010 6M22 21c0-3-2-5-5-5.5" />
      </svg>
    );
  return (
    <svg {...c}>
      <path d="M4 21h16M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17" />
      <circle cx="14" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}
