"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

interface ProfileFormProps {
  initial: {
    name: string;
    email: string;
    phone: string | null;
    referral_source: string | null;
    membership_tier: string | null;
    role: string;
  };
}

export default function ProfileForm({ initial }: ProfileFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState(initial.name);
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        toast("Profile updated.", "success");
      } else {
        setError(data.error ?? "Could not save.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-5">
      <Input
        id="name"
        label="Full Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id="email"
        label="Email"
        value={initial.email}
        disabled
        hint="Email cannot be changed here. Contact the steward."
      />
      <Input
        id="phone"
        label="Phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+1 (310) 555-0000"
      />
      {error && <p className="font-satoshi text-sm text-[#C97A7A]">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="bg-brass text-ink px-8 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
