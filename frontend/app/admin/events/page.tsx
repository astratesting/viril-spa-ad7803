import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { listEvents, countAttendees } from "@/lib/db";
import { formatDate, formatTime } from "@/lib/utils";
import type { EventRow } from "@/types";

export default async function AdminEventsPage() {
  const events = await listEvents();
  const eventsWithCounts = await Promise.all(
    events.map(async (e) => ({
      ...e,
      attendees: await countAttendees(e.id),
    }))
  );

  return (
    <main className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-ivory">Events</h1>
        <Link
          href="/admin"
          className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
        >
          ← Dashboard
        </Link>
      </div>
      <Table<EventRow & { attendees: number }>
        empty="No events yet."
        columns={[
          {
            key: "title",
            header: "Event",
            render: (e) => (
              <div>
                <p className="text-ivory">{e.title}</p>
                <p className="text-xs text-ivory/40">
                  {e.location}
                </p>
              </div>
            ),
          },
          {
            key: "date",
            header: "Date",
            render: (e) => (
              <div>
                <p>{formatDate(e.date)}</p>
                <p className="text-xs text-ivory/50">{formatTime(e.time)}</p>
              </div>
            ),
          },
          {
            key: "capacity",
            header: "Capacity",
            render: (e) => (
              <span>
                {e.attendees}/{e.capacity}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (e) => {
              const past = new Date(e.date).getTime() < Date.now();
              return (
                <Badge tone={past ? "muted" : "brass"}>
                  {past ? "Past" : "Upcoming"}
                </Badge>
              );
            },
          },
        ]}
        rows={eventsWithCounts}
      />
    </main>
  );
}