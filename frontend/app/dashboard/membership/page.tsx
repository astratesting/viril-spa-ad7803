"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface Tier {
  id: string;
  name: string;
  price_cents: number;
  description: string;
  benefits: string[];
  is_active: boolean;
}

export default function MembershipPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/profile").then((r) => r.json()),
      fetch("/api/parlors").then((r) => r.json()),
    ])
      .then(([p]) => {
        setCurrentTier(p.user?.membership_tier ?? null);
        setTiers([
          {
            id: "1",
            name: "Basic",
            price_cents: 120000,
            description: "Founding access to the salon and the inaugural calendar of events.",
            benefits: ["Access to The Salon", "Members-only events", "House concierge"],
            is_active: true,
          },
          {
            id: "2",
            name: "Premium",
            price_cents: 220000,
            description: "Expanded access for patrons who shape the character of the house.",
            benefits: ["Everything in Basic", "Priority event RSVP", "Private dining access"],
            is_active: true,
          },
          {
            id: "3",
            name: "VIP",
            price_cents: 350000,
            description: "The fullest measure of the house — for benefactors who sustain it.",
            benefits: ["Everything in Premium", "Founding table at cellar dinners", "Dedicated concierge line"],
            is_active: true,
          },
        ]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function checkout(tierName: string) {
    setBusy(tierName);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tierName }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        if (data.url) {
          window.location.href = data.url;
        } else {
          router.push(data.redirect ?? "/dashboard/payments?success=1");
          router.refresh();
        }
      } else {
        toast(data.error ?? "Checkout failed.", "error");
      }
    } catch {
      toast("Network error.", "error");
    }
    setBusy(null);
  }

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-12">
        <p className="font-satoshi text-sm text-ivory/50">Loading…</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
        Membership
      </p>
      <h1 className="font-playfair text-4xl text-ivory mb-8">
        Choose Your Tier
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tiers.map((t) => {
          const isCurrent = currentTier === t.name;
          return (
            <div
              key={t.name}
              className={`border p-6 bg-charcoal-soft flex flex-col ${isCurrent ? "border-brass" : "border-ivory/15"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-playfair text-2xl text-ivory">{t.name}</h2>
                {isCurrent && (
                  <span className="font-satoshi text-[10px] tracking-widest uppercase text-brass border border-brass px-2 py-0.5">
                    Current
                  </span>
                )}
              </div>
              <p className="font-playfair text-3xl text-brass mb-4">
                {formatCurrency(t.price_cents)}
                <span className="font-satoshi text-sm text-ivory/50"> /yr</span>
              </p>
              <p className="font-satoshi text-sm text-ivory/70 mb-4">
                {t.description}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {t.benefits.map((b) => (
                  <li key={b} className="font-satoshi text-sm text-ivory/70 flex items-start gap-2">
                    <span className="text-brass mt-0.5">·</span>
                    {b}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <button disabled className="w-full font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/40 border border-ivory/15 py-3">
                  Your Tier
                </button>
              ) : (
                <button
                  onClick={() => checkout(t.name)}
                  disabled={busy === t.name}
                  className="w-full font-satoshi text-xs tracking-[0.2em] uppercase py-3 transition-colors disabled:opacity-50 bg-brass text-ink border border-brass hover:bg-brass-bright"
                >
                  {busy === t.name ? "Processing…" : `Select ${t.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6">
        <Link
          href="/dashboard/payments"
          className="font-satoshi text-xs text-brass hover:underline"
        >
          View payment history →
        </Link>
      </p>
    </main>
  );
}