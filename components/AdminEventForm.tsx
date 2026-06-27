"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";

export default function AdminEventForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "19:00",
    location: "",
    capacity: "20",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        date: form.date,
        time: form.time,
        location: form.location,
        capacity: Number(form.capacity),
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setForm({ title: "", description: "", date: "", time: "19:00", location: "", capacity: "20" });
      router.refresh();
    } else {
      setError(data.error ?? "Could not create event.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="border border-ivory/10 bg-charcoal-soft p-6">
      <h2 className="font-playfair text-xl text-ivory mb-4">Create Event</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Title" required value={form.title} onChange={(e) => set("title", e.target.value)} />
        <Input label="Location" required value={form.location} onChange={(e) => set("location", e.target.value)} />
        <Input label="Date" type="date" required value={form.date} onChange={(e) => set("date", e.target.value)} />
        <Input label="Time" type="time" value={form.time} onChange={(e) => set("time", e.target.value)} />
        <Input label="Capacity" type="number" required value={form.capacity} onChange={(e) => set("capacity", e.target.value)} />
        <Input label="Description" value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>
      {error && <p className="mt-4 font-satoshi text-sm text-[#C97A7A]">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 bg-brass text-ink px-6 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
      >
        {busy ? "Creating…" : "Create Event"}
      </button>
    </form>
  );
}
