"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDate, formatTime, isPast } from "@/lib/utils";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  end_time: string | null;
  location: string;
  capacity: number;
  attendee_count: number;
  attending: boolean;
  past: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/events");
    const data = await res.json();
    if (res.ok) setEvents(data.events ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function rsvp(ev: EventItem) {
    setBusy(ev.id);
    setError("");
    const res = await fetch("/api/events/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: ev.id, action: "rsvp" }),
    });
    const data = await res.json();
    if (res.ok) {
      setEvents((cur) =>
        cur.map((e) =>
          e.id === ev.id
            ? { ...e, attending: true, attendee_count: data.count }
            : e
        )
      );
    } else {
      setError(data.error ?? "Could not RSVP.");
    }
    setBusy(null);
  }

  async function cancel(ev: EventItem) {
    setBusy(ev.id);
    setError("");
    const res = await fetch("/api/events/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: ev.id, action: "cancel" }),
    });
    const data = await res.json();
    if (res.ok) {
      setEvents((cur) =>
        cur.map((e) =>
          e.id === ev.id
            ? { ...e, attending: false, attendee_count: data.count }
            : e
        )
      );
    } else {
      setError(data.error ?? "Could not cancel.");
    }
    setBusy(null);
  }

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <p className="font-satoshi text-sm text-ivory/50">Loading…</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
          The Calendar
        </p>
        <h1 className="font-playfair text-4xl text-ivory">Events</h1>
      </div>

      {error && (
        <p className="mb-4 font-satoshi text-sm text-[#C97A7A]">{error}</p>
      )}

      <div className="space-y-4">
        {events.length === 0 && (
          <p className="font-satoshi text-sm text-ivory/50">
            No events scheduled yet.
          </p>
        )}
        {events.map((ev) => {
          const past = ev.past || isPast(ev.date);
          return (
            <div
              key={ev.id}
              className={`border border-ivory/10 bg-charcoal-soft p-6 flex flex-col md:flex-row md:items-center gap-6 ${
                past ? "opacity-50" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <Link
                  href={`/dashboard/events/${ev.id}`}
                  className="font-playfair text-xl text-ivory hover:text-brass transition-colors"
                >
                  {ev.title}
                </Link>
                <p className="font-satoshi text-xs text-ivory/50 mt-1">
                  {formatTime(ev.time)}
                  {ev.end_time ? ` – ${formatTime(ev.end_time)}` : ""} ·{" "}
                  {ev.location}
                </p>
                <p className="font-satoshi text-xs text-ivory/40 mt-2">
                  {formatDate(ev.date)} · {ev.attendee_count}/{ev.capacity}{" "}
                  attending
                </p>
              </div>
              <div className="shrink-0">
                {past ? (
                  <Badge tone="muted">Past</Badge>
                ) : ev.attending ? (
                  <button
                    onClick={() => cancel(ev)}
                    disabled={busy === ev.id}
                    className="bg-brass text-ink px-6 py-2.5 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
                  >
                    Attending
                  </button>
                ) : (
                  <button
                    onClick={() => rsvp(ev)}
                    disabled={busy === ev.id}
                    className="border border-brass text-brass px-6 py-2.5 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass hover:text-ink transition-colors disabled:opacity-50"
                  >
                    RSVP
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}