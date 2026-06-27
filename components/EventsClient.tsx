"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
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

export default function EventsClient() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [pendingCancel, setPendingCancel] = useState<EventItem | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/events");
    const data = await res.json();
    if (res.ok) setEvents(data.events ?? []);
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
    setPendingCancel(null);
    setBusy(null);
  }

  return (
    <>
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
          const d = new Date(ev.date);
          return (
            <div
              key={ev.id}
              className={`border border-ivory/10 bg-charcoal-soft p-6 flex flex-col md:flex-row md:items-center gap-6 ${
                past ? "opacity-50" : ""
              }`}
            >
              <div className="flex md:flex-col items-center md:items-start md:w-24 shrink-0">
                <span className="font-archivo text-3xl text-brass leading-none">
                  {d.getDate()}
                </span>
                <span className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/50 md:mt-1 ml-2 md:ml-0">
                  {d.toLocaleString("en-US", { month: "short" })}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/events/${ev.id}`}
                  className="font-playfair text-xl text-ivory hover:text-brass transition-colors"
                >
                  {ev.title}
                </Link>
                <p className="font-satoshi text-xs text-ivory/50 mt-1">
                  {formatTime(ev.time)}
                  {ev.end_time ? ` – ${formatTime(ev.end_time)}` : ""} · {ev.location}
                </p>
                <p className="font-satoshi text-xs text-ivory/40 mt-2">
                  {ev.attendee_count}/{ev.capacity} attending
                </p>
              </div>
              <div className="shrink-0">
                {past ? (
                  <Badge tone="muted">Past</Badge>
                ) : ev.attending ? (
                  <button
                    onClick={() => setPendingCancel(ev)}
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

      <Modal
        open={!!pendingCancel}
        onClose={() => setPendingCancel(null)}
        title="Cancel RSVP?"
        footer={
          <>
            <button
              onClick={() => setPendingCancel(null)}
              className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass"
            >
              No
            </button>
            <button
              onClick={() => pendingCancel && cancel(pendingCancel)}
              disabled={busy === pendingCancel?.id}
              className="bg-[#8B3A3A] text-ivory px-6 py-2.5 font-satoshi text-xs tracking-[0.2em] uppercase hover:brightness-110 disabled:opacity-50"
            >
              Yes, cancel
            </button>
          </>
        }
      >
        <p>You will no longer be on the list for this event.</p>
      </Modal>
    </>
  );
}
