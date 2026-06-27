import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";
import {
  countAttendees,
  getEvent,
  isAttending,
  listAttendees,
} from "@/lib/db";
import { formatDate, formatTime, initials, isPast } from "@/lib/utils";
import EventRsvpButton from "@/components/EventRsvpButton";
import { redirect } from "next/navigation";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/dashboard/events");
  const user = await findUserById(session.userId);
  if (!user) redirect("/login");
  if (user.role === "pending_payment") redirect("/payment");

  const { id } = await params;
  const event = await getEvent(id);
  if (!event) redirect("/dashboard/events");

  const attendees = await listAttendees(event.id);
  const count = await countAttendees(event.id);
  const attending = await isAttending(event.id, session.userId);
  const past = isPast(event.date);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/dashboard/events" className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline">
        ← All events
      </Link>

      <div className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge tone={past ? "muted" : "brass"}>{formatDate(event.date)}</Badge>
          <span className="font-satoshi text-xs text-ivory/50">
            {formatTime(event.time)}
            {event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
          </span>
        </div>
        <h1 className="font-playfair text-4xl text-ivory mb-3">{event.title}</h1>
        <p className="font-satoshi text-sm text-ivory/60 mb-6">
          {event.location} · Capacity {event.capacity}
        </p>
        <p className="font-satoshi text-base text-ivory/80 leading-relaxed mb-8">{event.description}</p>

        <div className="border-t border-ivory/10 pt-6">
          <EventRsvpButton
            eventId={event.id}
            initialAttending={attending}
            initialCount={count}
            capacity={event.capacity}
            past={past}
          />
        </div>

        {attendees.length > 0 && (
          <div className="mt-10">
            <h2 className="font-playfair text-xl text-ivory mb-4">Who&rsquo;s attending</h2>
            <div className="flex flex-wrap gap-3">
              {attendees.map((a) => (
                <span
                  key={a.id}
                  className="inline-flex items-center gap-2 border border-ivory/10 bg-charcoal-soft px-3 py-2"
                >
                  <span className="w-7 h-7 rounded-full bg-brass/15 border border-brass/40 text-brass flex items-center justify-center font-satoshi text-[10px] font-bold">
                    {initials(a.name)}
                  </span>
                  <span className="font-satoshi text-sm text-ivory/80">{a.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
