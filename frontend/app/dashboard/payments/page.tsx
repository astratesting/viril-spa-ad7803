"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Payment {
  id: string;
  amount_cents: number;
  currency: string;
  status: string;
  membership_tier: string;
  paid_at: string | null;
  created_at: string;
}

const TIERS = [
  { name: "Basic", price_cents: 120000, perks: ["Access to The Salon", "Members-only events", "House concierge"] },
  { name: "Premium", price_cents: 220000, perks: ["Everything in Basic", "Priority event RSVP", "Private dining access"] },
  { name: "VIP", price_cents: 350000, perks: ["Everything in Premium", "Founding table at cellar dinners", "Dedicated concierge line"] },
];

export default function PaymentsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/profile").then((r) => r.json()),
      fetch("/api/payments").then((r) => r.json()),
    ])
      .then(([p, pay]) => {
        setCurrentTier(p.user?.membership_tier ?? null);
        setPayments(pay.payments ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (params.get("success")) {
      toast("Membership updated.", "success");
      router.replace("/dashboard/payments");
    } else if (params.get("canceled")) {
      toast("Checkout canceled.", "info");
      router.replace("/dashboard/payments");
    }
  }, [params, router, toast]);

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
      <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">Membership</p>
      <h1 className="font-playfair text-4xl text-ivory mb-8">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {TIERS.map((t) => {
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
              <ul className="space-y-2 mb-6 flex-1">
                {t.perks.map((p) => (
                  <li key={p} className="font-satoshi text-sm text-ivory/70 flex items-start gap-2">
                    <span className="text-brass mt-0.5">·</span>
                    {p}
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
                  className={`w-full font-satoshi text-xs tracking-[0.2em] uppercase py-3 transition-colors disabled:opacity-50 ${
                    currentTier ? "border border-brass text-brass hover:bg-brass hover:text-ink" : "bg-brass text-ink border border-brass hover:bg-brass-bright"
                  }`}
                >
                  {busy === t.name ? "Processing…" : `Select ${t.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="font-playfair text-2xl text-ivory mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p className="font-satoshi text-sm text-ivory/50">No payments yet. Select a tier above to begin.</p>
      ) : (
        <div className="border border-ivory/15 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ivory/15 bg-ink">
                {["Date", "Tier", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left font-satoshi text-xs tracking-widest uppercase text-ivory/50 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-ivory/10 last:border-0">
                  <td className="px-4 py-3 font-satoshi text-sm text-ivory/80">{formatDate(p.paid_at ?? p.created_at)}</td>
                  <td className="px-4 py-3 font-satoshi text-sm text-ivory/80">{p.membership_tier}</td>
                  <td className="px-4 py-3 font-satoshi text-sm text-ivory/80">{formatCurrency(p.amount_cents)}</td>
                  <td className="px-4 py-3 font-satoshi text-sm">
                    <span className={p.status === "completed" ? "text-[#7DDA5A]" : p.status === "refunded" ? "text-[#C97A7A]" : "text-ivory/50"}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
