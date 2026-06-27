"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  category: string;
  author_name: string;
  reply_count: number;
  created_at: string;
}

const CATEGORIES = ["General", "Introductions", "Events", "Feedback", "Off-Topic"];

function catTone(cat: string) {
  if (cat === "Events") return "brass" as const;
  if (cat === "Introductions") return "amber" as const;
  return "muted" as const;
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = category
      ? `/api/forum?category=${encodeURIComponent(category)}`
      : "/api/forum";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.posts) setPosts(data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
            Community
          </p>
          <h1 className="font-playfair text-4xl text-ivory">Forum</h1>
        </div>
        <Link
          href="/dashboard/forum/new"
          className="bg-brass text-ink px-6 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors"
        >
          New Thread
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategory(null)}
          className={`font-satoshi text-xs tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${
            category === null
              ? "border-brass text-brass bg-brass/10"
              : "border-ivory/20 text-ivory/60 hover:border-brass/50"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`font-satoshi text-xs tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${
              category === c
                ? "border-brass text-brass bg-brass/10"
                : "border-ivory/20 text-ivory/60 hover:border-brass/50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="font-satoshi text-sm text-ivory/50">Loading…</p>
      ) : posts.length === 0 ? (
        <div className="border border-ivory/10 bg-charcoal-soft p-8 text-center">
          <p className="font-satoshi text-sm text-ivory/50">
            No threads yet. Start the first conversation.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/forum/${p.id}`}
              className="block border border-ivory/10 bg-charcoal-soft p-5 hover:border-brass/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="font-playfair text-lg text-ivory hover:text-brass transition-colors truncate">
                    {p.title}
                  </h2>
                  <p className="font-satoshi text-xs text-ivory/50 mt-1">
                    {p.author_name} · {formatDate(p.created_at)} · {p.reply_count} repl{p.reply_count === 1 ? "y" : "ies"}
                  </p>
                </div>
                <Badge tone={catTone(p.category)}>{p.category}</Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}