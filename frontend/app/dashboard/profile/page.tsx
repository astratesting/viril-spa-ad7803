"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  referral_source: string | null;
  role: string;
  membership_tier: string | null;
  membership_expires_at: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setProfile(data.user);
          setName(data.user.name);
          setPhone(data.user.phone ?? "");
        } else {
          router.replace("/login?redirect=/dashboard/profile");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load your profile.");
        setLoading(false);
      });
  }, [router]);

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

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-12">
        <p className="font-satoshi text-sm text-ivory/50">Loading…</p>
      </main>
    );
  }
  if (!profile) return null;

  const statusTone =
    profile.role === "admin" ? "brass" : profile.role === "member" ? "green" : "amber";

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
        Account
      </p>
      <h1 className="font-playfair text-4xl text-ivory mb-8">Profile</h1>

      <div className="border border-ivory/10 bg-charcoal-soft p-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge tone={statusTone}>{profile.role}</Badge>
          {profile.membership_tier && (
            <span className="font-satoshi text-sm text-ivory/70">
              {profile.membership_tier}
            </span>
          )}
        </div>

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
            value={profile.email}
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
      </div>

      <div className="border border-ivory/10 bg-charcoal-soft p-6 space-y-3 font-satoshi text-sm">
        <div className="flex justify-between">
          <span className="text-ivory/50">Referral source</span>
          <span className="text-ivory/85">{profile.referral_source ?? "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ivory/50">Joined</span>
          <span className="text-ivory/85">{formatDate(profile.created_at)}</span>
        </div>
        {profile.membership_expires_at && (
          <div className="flex justify-between">
            <span className="text-ivory/50">Membership renews</span>
            <span className="text-ivory/85">{formatDate(profile.membership_expires_at)}</span>
          </div>
        )}
      </div>

      <p className="mt-8">
        <Link
          href="/dashboard"
          className="font-satoshi text-xs text-brass hover:underline"
        >
          ← Back to dashboard
        </Link>
      </p>
    </main>
  );
}