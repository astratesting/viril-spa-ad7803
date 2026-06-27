import Link from "next/link";
import { redirect } from "next/navigation";
import Badge from "@/components/ui/Badge";
import { getSession } from "@/lib/auth";
import {
  findUserById,
  listEvents,
  countAttendees,
} from "@/lib/db";
import { formatDate, formatTime, isPast } from "@/lib/utils";

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

  const statusBadge =
    user.role === "admin" ? (
      <Badge tone="brass">Administrator</Badge>
    ) : user.role === "member" ? (
      <Badge tone="green">Active Member</Badge>
    ) : (
      <Badge tone="amber">Under Review</Badge>
    );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {showSuccess && (
        <div className="bg-brass/10 border border-brass/30 px-6 py-3 text-center font-satoshi text-sm text-brass">
          Welcome to the house — your membership is active.
        </div>
      )}

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
              href="/dashboard/events"
              label="Upcoming Events"
              value={`${upcoming.length}`}
            />
            <Tile
              href="/dashboard/directory"
              label="Member Directory"
              value="Browse"
            />
            <Tile
              href="/dashboard/bookings"
              label="Book a Parlor"
              value="Reserve"
            />
          </section>

          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-playfair text-2xl text-ivory">
                Coming up at the house
              </h2>
              <Link
                href="/dashboard/events"
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
                  <Link
                    key={event.id}
                    href={`/dashboard/events/${event.id}`}
                    className="block border border-ivory/10 bg-charcoal-soft p-6 hover:border-brass/50 transition-colors"
                  >
                    <p className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass">
                      {formatDate(event.date)} · {formatTime(event.time)}
                    </p>
                    <p className="font-playfair text-lg text-ivory mt-2">
                      {event.title}
                    </p>
                    <p className="font-satoshi text-xs text-ivory/50 mt-2">
                      {count} attending
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

function Tile({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  return (
    <Link
      href={href}
      className="group border border-ivory/10 bg-charcoal-soft p-8 hover:border-brass/50 hover:-translate-y-0.5 transition-all duration-300"
    >
      <p className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/50">
        {label}
      </p>
      <p className="font-playfair text-3xl text-ivory mt-1 group-hover:text-brass transition-colors">
        {value}
      </p>
    </Link>
  );
}