"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import { initials } from "@/lib/utils";

interface Member {
  id: string;
  first_name: string;
  last_initial: string;
  membership_tier: string | null;
  is_self: boolean;
}

function tierTone(tier: string | null) {
  if (tier === "VIP") return "brass" as const;
  if (tier === "Premium") return "amber" as const;
  return "muted" as const;
}

export default function DirectoryPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const t = setTimeout(async () => {
      const res = await fetch(`/api/directory?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (active && res.ok) setMembers(data.members ?? []);
      setLoading(false);
    }, 250);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [q]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">The Directory</p>
          <h1 className="font-playfair text-4xl text-ivory">Members</h1>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name"
            className="w-full bg-charcoal-soft border border-ivory/15 px-4 py-3 pl-10 text-ivory font-satoshi text-sm placeholder:text-ivory/35 focus:border-brass transition-colors"
          />
          <svg className="absolute left-3 top-3.5 w-4 h-4 text-ivory/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <p className="font-satoshi text-xs text-ivory/40 mb-6">
        Discretion first — only first names and last initials are shown.
      </p>

      {loading ? (
        <p className="font-satoshi text-sm text-ivory/50">Loading…</p>
      ) : members.length === 0 ? (
        <p className="font-satoshi text-sm text-ivory/50">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="border border-ivory/10 bg-charcoal-soft p-6 hover:border-brass/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-full bg-brass/15 border border-brass/40 text-brass flex items-center justify-center font-satoshi font-bold">
                  {initials(`${m.first_name} ${m.last_initial}`)}
                </span>
                <div className="min-w-0">
                  <p className="font-playfair text-lg text-ivory truncate">
                    {m.first_name} {m.last_initial}.
                    {m.is_self && (
                      <span className="ml-2 font-satoshi text-[10px] tracking-[0.2em] uppercase text-brass">You</span>
                    )}
                  </p>
                  {m.membership_tier && (
                    <div className="mt-2">
                      <Badge tone={tierTone(m.membership_tier)}>{m.membership_tier}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
