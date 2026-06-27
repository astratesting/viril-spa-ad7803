"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import { Select } from "@/components/ui/Input";
import { TIME_SLOTS } from "@/types";
import { formatTime } from "@/lib/utils";

interface Parlor {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price_cents: number | null;
}

export default function ParlorsClient() {
  const [parlors, setParlors] = useState<Parlor[]>([]);
  const [open, setOpen] = useState<Parlor | null>(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("1");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/parlors")
      .then((r) => r.json())
      .then((d) => setParlors(d.parlors ?? []));
  }, []);

  function openBooking(p: Parlor) {
    setOpen(p);
    setError("");
    setSuccess("");
    setStartTime("");
    setDuration("1");
    const today = new Date();
    setDate(today.toISOString().slice(0, 10));
  }

  async function confirm() {
    if (!open) return;
    setBusy(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/parlors/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parlor_id: open.id,
        date,
        start_time: startTime,
        duration: Number(duration),
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setSuccess(data.message ?? "Parlor booked.");
      setOpen(null);
    } else {
      setError(data.error ?? "Could not book.");
    }
    setBusy(false);
  }

  return (
    <>
      {success && (
        <div className="mb-6 border border-brass/30 bg-brass/10 px-5 py-3 font-satoshi text-sm text-brass">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parlors.map((p) => (
          <div
            key={p.id}
            className="border border-ivory/10 bg-charcoal-soft p-6 hover:border-brass/40 transition-colors"
          >
            <h3 className="font-playfair text-2xl text-ivory">{p.name}</h3>
            <p className="font-satoshi text-sm text-ivory/60 mt-2 leading-relaxed">
              {p.description}
            </p>
            <div className="mt-4 flex items-center gap-4 font-satoshi text-xs tracking-[0.15em] uppercase text-ivory/50">
              <span>Up to {p.capacity} guests</span>
              <span>·</span>
              <span>Included in membership</span>
            </div>
            <button
              onClick={() => openBooking(p)}
              className="mt-5 border border-brass text-brass px-6 py-2.5 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass hover:text-ink transition-colors"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        title={open ? `Book ${open.name}` : ""}
        footer={
          <>
            <button
              onClick={() => setOpen(null)}
              className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass"
            >
              Cancel
            </button>
            <button
              onClick={confirm}
              disabled={busy || !startTime}
              className="bg-brass text-ink px-6 py-2.5 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
            >
              {busy ? "Booking…" : "Confirm Booking"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-charcoal border border-ivory/15 px-4 py-3 text-ivory font-satoshi focus:border-brass"
            />
          </div>
          <Select
            label="Start time"
            placeholder="Select a time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            options={TIME_SLOTS.map((t) => ({ value: t, label: formatTime(t) }))}
          />
          <Select
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            options={[
              { value: "1", label: "1 hour" },
              { value: "2", label: "2 hours" },
              { value: "3", label: "3 hours" },
            ]}
          />
          {error && <p className="font-satoshi text-sm text-[#C97A7A]">{error}</p>}
        </div>
      </Modal>

      <p className="mt-10 font-satoshi text-xs text-ivory/40">
        <Link href="/dashboard" className="text-brass hover:underline">
          ← Back to dashboard
        </Link>
      </p>
    </>
  );
}
