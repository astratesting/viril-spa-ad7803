"use client";

import { useState } from "react";

export default function EventRsvpButton({
  eventId,
  initialAttending,
  initialCount,
  capacity,
  past,
}: {
  eventId: string;
  initialAttending: boolean;
  initialCount: number;
  capacity: number;
  past: boolean;
}) {
  const [attending, setAttending] = useState(initialAttending);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function call(action: "rsvp" | "cancel") {
    setBusy(true);
    setError("");
    const res = await fetch("/api/events/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId, action }),
    });
    const data = await res.json();
    if (res.ok) {
      setAttending(action === "rsvp");
      setCount(data.count);
    } else {
      setError(data.error ?? "Could not update RSVP.");
    }
    setBusy(false);
  }

  if (past) {
    return <span className="font-satoshi text-xs text-ivory/40">This event has passed.</span>;
  }

  return (
    <div className="flex items-center gap-4">
      {attending ? (
        <button
          onClick={() => call("cancel")}
          disabled={busy}
          className="bg-brass text-ink px-8 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
        >
          Attending
        </button>
      ) : (
        <button
          onClick={() => call("rsvp")}
          disabled={busy}
          className="border border-brass text-brass px-8 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass hover:text-ink transition-colors disabled:opacity-50"
        >
          RSVP
        </button>
      )}
      <span className="font-satoshi text-sm text-ivory/60">
        {count}/{capacity} attending
      </span>
      {error && <span className="font-satoshi text-sm text-[#C97A7A]">{error}</span>}
    </div>
  );
}
