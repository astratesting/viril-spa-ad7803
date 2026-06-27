"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

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
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [error, setError] = useState("");

  async function rsvp() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/events/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId, action: "rsvp" }),
    });
    const data = await res.json();
    if (res.ok) {
      setAttending(true);
      setCount(data.count);
    } else {
      setError(data.error ?? "Could not RSVP.");
    }
    setBusy(false);
  }

  async function cancel() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/events/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId, action: "cancel" }),
    });
    const data = await res.json();
    if (res.ok) {
      setAttending(false);
      setCount(data.count);
    } else {
      setError(data.error ?? "Could not cancel.");
    }
    setConfirmCancel(false);
    setBusy(false);
  }

  if (past) {
    return <span className="font-satoshi text-xs text-ivory/40">This event has passed.</span>;
  }

  return (
    <>
      <div className="flex items-center gap-4">
        {attending ? (
          <button
            onClick={() => setConfirmCancel(true)}
            disabled={busy}
            className="bg-brass text-ink px-8 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
          >
            Attending
          </button>
        ) : (
          <button
            onClick={rsvp}
            disabled={busy}
            className="border border-brass text-brass px-8 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass hover:text-ink transition-colors disabled:opacity-50"
          >
            RSVP
          </button>
        )}
        <span className="font-satoshi text-sm text-ivory/60">
          {count}/{capacity} attending
        </span>
      </div>
      {error && <p className="mt-3 font-satoshi text-sm text-[#C97A7A]">{error}</p>}

      <Modal
        open={confirmCancel}
        onClose={() => setConfirmCancel(false)}
        title="Cancel RSVP?"
        footer={
          <>
            <button
              onClick={() => setConfirmCancel(false)}
              className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass"
            >
              No
            </button>
            <button
              onClick={cancel}
              disabled={busy}
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
