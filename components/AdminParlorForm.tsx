"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";

export default function AdminParlorForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", capacity: "12" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/parlors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        capacity: Number(form.capacity),
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setForm({ name: "", description: "", capacity: "12" });
      router.refresh();
    } else {
      setError(data.error ?? "Could not create parlor.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="border border-ivory/10 bg-charcoal-soft p-6">
      <h2 className="font-playfair text-xl text-ivory mb-4">Add Parlor</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <Input label="Capacity" type="number" required value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))} />
        <Input label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
      </div>
      {error && <p className="mt-4 font-satoshi text-sm text-[#C97A7A]">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 bg-brass text-ink px-6 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
      >
        {busy ? "Adding…" : "Add Parlor"}
      </button>
    </form>
  );
}
