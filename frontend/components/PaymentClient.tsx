"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/Input";

interface Tier {
  id: string;
  name: string;
  price_cents: number;
  description: string;
  benefits: string[];
}

export default function PaymentClient({
  tiers,
  defaultTier,
  canceled,
  stripeEnabled,
}: {
  tiers: Tier[];
  defaultTier: string;
  canceled: boolean;
  stripeEnabled: boolean;
}) {
  const router = useRouter();
  const [tier, setTier] = useState(defaultTier);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(canceled ? "Payment was canceled." : "");

  const selected = tiers.find((t) => t.name === tier) ?? tiers[0];

  async function pay() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: selected.name }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        if (data.url) {
          window.location.href = data.url;
        } else {
          router.push(data.redirect ?? "/dashboard?payment=success");
          router.refresh();
        }
      } else {
        setError(data.error ?? "Payment failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border border-brass/20 bg-charcoal-soft p-8">
      <div className="text-center mb-8">
        <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-3">
          Complete Your Membership
        </p>
        <h1 className="font-playfair text-3xl text-ivory">Pay Dues</h1>
      </div>

      {tiers.length > 1 && (
        <div className="mb-6">
          <Select
            label="Membership Tier"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            options={tiers.map((t) => ({ value: t.name, label: t.name }))}
          />
        </div>
      )}

      {selected && (
        <div className="border border-ivory/10 bg-ink/40 p-6 mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-playfair text-xl text-ivory">{selected.name}</h2>
            <span className="font-archivo text-2xl text-brass">
              ${(selected.price_cents / 100).toLocaleString()}
              <span className="font-satoshi text-sm text-ivory/50">/yr</span>
            </span>
          </div>
          <p className="font-satoshi text-sm text-ivory/70 leading-relaxed mb-4">
            {selected.description}
          </p>
          <ul className="space-y-2">
            {selected.benefits.map((b) => (
              <li
                key={b}
                className="font-satoshi text-sm text-ivory/70 flex items-start gap-2"
              >
                <span className="text-brass mt-0.5">·</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="mb-4 font-satoshi text-sm text-[#C97A7A]">{error}</p>}

      <button
        onClick={pay}
        disabled={busy}
        className="w-full bg-brass text-ink py-4 font-satoshi text-sm font-bold tracking-[0.25em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
      >
        {busy ? "Processing…" : "Pay with Card"}
      </button>
      <p className="mt-4 text-center font-satoshi text-xs text-ivory/40">
        {stripeEnabled
          ? "Secure checkout via Stripe."
          : "Demo mode — payment is simulated. No real card is charged."}
      </p>
    </div>
  );
}
