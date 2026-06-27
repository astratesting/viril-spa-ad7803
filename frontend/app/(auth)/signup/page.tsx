"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { REFERRAL_SOURCES } from "@/types";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    referral_source: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone || null,
          referral_source: form.referral_source || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push(data.redirect ?? "/dashboard");
        router.refresh();
      } else {
        setError(data.error ?? "Could not create account.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-ink">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-archivo text-3xl text-ivory tracking-tight">
            GOON
          </Link>
          <p className="mt-2 font-satoshi text-xs tracking-[0.3em] uppercase text-brass">
            Request Membership
          </p>
        </div>

        <div className="border border-brass/20 bg-charcoal-soft p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="name"
              label="Full Name"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Your name"
            />
            <Input
              id="email"
              type="email"
              label="Email"
              required
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@domain.com"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              required
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="At least 6 characters"
            />
            <Input
              id="phone"
              type="tel"
              label="Phone (optional)"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+1 (310) 555-0000"
            />
            <Select
              id="referral"
              label="How did you hear about us?"
              placeholder="Select a source"
              value={form.referral_source}
              onChange={(e) => set("referral_source", e.target.value)}
              options={REFERRAL_SOURCES.map((s) => ({ value: s, label: s }))}
            />
            {error && (
              <p className="font-satoshi text-sm text-[#C97A7A]">{error}</p>
            )}
            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>
          <p className="mt-6 font-satoshi text-xs text-ivory/45 leading-relaxed">
            Creating an account submits a membership application for review.
            Dues are only collected after approval.
          </p>
        </div>

        <p className="mt-6 text-center font-satoshi text-sm text-ivory/60">
          Already a member?{" "}
          <Link href="/login" className="text-brass hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}