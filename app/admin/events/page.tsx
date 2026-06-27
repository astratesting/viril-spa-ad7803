import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { listEvents, countAttendees } from "@/lib/db";
import { formatDate, formatTime, isPast } from "@/lib/utils";
import AdminEventForm from "@/components/AdminEventForm";
import type { EventRow } from "@/types";

export default async function AdminEventsPage() {
  const events = await listEvents();
  const withCounts = await Promise.all(
    events.map(async (e) => ({ event: e, count: await countAttendees(e.id) }))
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

      <div className="mb-10">
        <AdminEventForm />
      </div>

      <Table<EventRow>
        empty="No events yet."
        columns={[
          { key: "title", header: "Title", render: (e) => e.title },
          {
            key: "date",
            header: "Date",
            render: (e) => `${formatDate(e.date)} · ${formatTime(e.time)}`,
          },
          { key: "location", header: "Location", render: (e) => e.location },
          {
            key: "attendees",
            header: "Attendees",
            render: (e) => {
              const row = withCounts.find((c) => c.event.id === e.id);
              return `${row?.count ?? 0}/${e.capacity}`;
            },
          },
          {
            key: "status",
            header: "Status",
            render: (e) =>
              isPast(e.date) ? (
                <Badge tone="muted">Past</Badge>
              ) : (
                <Badge tone="green">Upcoming</Badge>
              ),
          },
        ]}
        rows={events}
      />
    </main>
  );
}
