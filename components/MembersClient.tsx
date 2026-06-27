"use client";

import { useEffect, useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { initials } from "@/lib/utils";

interface Member {
  id: string;
  name: string;
  email: string;
  membership_tier: string | null;
  phone: string | null;
  is_self: boolean;
}

function tierTone(tier: string | null) {
  if (tier === "Benefactor") return "brass" as const;
  if (tier === "Patron") return "amber" as const;
  return "muted" as const;
}

export default function MembersClient() {
  const [members, setMembers] = useState<Member[]>([]);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Member | null>(null);

  useEffect(() => {
    let active = true;
    const t = setTimeout(async () => {
      const res = await fetch(`/api/members?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (active && res.ok) setMembers(data.members ?? []);
    }, 300);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [q]);

  const visible = useMemo(() => members.slice(0, 60), [members]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
            The Directory
          </p>
          <h1 className="font-playfair text-4xl text-ivory">Members</h1>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email"
            className="w-full bg-charcoal-soft border border-ivory/15 px-4 py-3 pl-10 text-ivory font-satoshi text-sm placeholder:text-ivory/35 focus:border-brass transition-colors"
          />
          <svg
            className="absolute left-3 top-3.5 w-4 h-4 text-ivory/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="font-satoshi text-sm text-ivory/50">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((m) => (
            <div
              key={m.id}
              className="border border-ivory/10 bg-charcoal-soft p-6 hover:border-brass/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-16 h-16 rounded-full bg-brass/15 border border-brass/40 text-brass flex items-center justify-center font-satoshi font-bold">
                  {initials(m.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-playfair text-lg text-ivory truncate">
                    {m.name}
                    {m.is_self && (
                      <span className="ml-2 font-satoshi text-[10px] tracking-[0.2em] uppercase text-brass">
                        You
                      </span>
                    )}
                  </p>
                  {m.membership_tier && (
                    <div className="mt-2">
                      <Badge tone={tierTone(m.membership_tier)}>
                        {m.membership_tier}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelected(m)}
                className="mt-5 w-full font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/70 border border-ivory/20 py-2.5 hover:border-brass hover:text-brass transition-colors"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : ""}
        footer={
          <button
            onClick={() => setSelected(null)}
            className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass"
          >
            Close
          </button>
        }
      >
        {selected && (
          <div className="space-y-3">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/40">
                Email
              </p>
              <a
                href={`mailto:${selected.email}`}
                className="text-brass hover:underline"
              >
                {selected.email}
              </a>
            </div>
            {selected.phone && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/40">
                  Phone
                </p>
                <p>{selected.phone}</p>
              </div>
            )}
            {selected.membership_tier && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/40">
                  Tier
                </p>
                <p>{selected.membership_tier}</p>
              </div>
            )}
            <p className="text-xs text-ivory/40 pt-2">
              Contact is shared at each member&rsquo;s discretion.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
