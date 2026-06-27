"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils";

interface Parlor {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price_cents: number | null;
  is_active: boolean;
}

export default function BookingsPage() {
  const [parlors, setParlors] = useState<Parlor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parlors")
      .then((r) => r.json())
      .then((data) => {
        if (data.parlors) setParlors(data.parlors);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <p className="font-satoshi text-sm text-ivory/50">Loading…</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
          The House
        </p>
        <h1 className="font-playfair text-4xl text-ivory">Parlors</h1>
        <p className="font-satoshi text-sm text-ivory/60 mt-2">
          Private spaces available for members to reserve.
        </p>
      </div>

      {parlors.length === 0 ? (
        <p className="font-satoshi text-sm text-ivory/50">
          No parlors available yet. The house steward is preparing the spaces.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parlors.map((p) => (
            <div
              key={p.id}
              className="border border-ivory/10 bg-charcoal-soft p-6 hover:border-brass/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-playfair text-xl text-ivory">{p.name}</h2>
                {p.price_cents && (
                  <span className="font-satoshi text-sm text-brass">
                    ${(p.price_cents / 100).toLocaleString()}/hr
                  </span>
                )}
              </div>
              <p className="font-satoshi text-sm text-ivory/70 leading-relaxed mb-4">
                {p.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge tone="muted">Capacity: {p.capacity}</Badge>
                <Link
                  href={`/parlors/${p.id}`}
                  className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
                >
                  View & Book →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10">
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