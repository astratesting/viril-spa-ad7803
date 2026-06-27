"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") ?? "/dashboard";
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, redirect }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push(data.redirect ?? "/dashboard");
        router.refresh();
      } else {
        setError(data.error ?? "Could not sign in.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function tryDemo(role: "member" | "admin") {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push(data.redirect ?? "/dashboard");
        router.refresh();
      } else {
        setError(data.error ?? "Could not start demo.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-ink">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-archivo text-3xl text-ivory tracking-tight">
            GOON
          </Link>
          <p className="mt-2 font-satoshi text-xs tracking-[0.3em] uppercase text-brass">
            Sign In
          </p>
        </div>

        <div className="border border-brass/20 bg-charcoal-soft p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && (
              <p className="font-satoshi text-sm text-[#C97A7A]">{error}</p>
            )}
            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-ivory/10 space-y-3">
            <button
              type="button"
              onClick={() => tryDemo("member")}
              disabled={loading}
              className="w-full text-center font-satoshi text-xs tracking-[0.2em] uppercase text-brass border border-brass/40 py-3 hover:bg-brass hover:text-ink transition-colors"
            >
              Try the live demo →
            </button>
            <button
              type="button"
              onClick={() => tryDemo("admin")}
              disabled={loading}
              className="w-full text-center font-satoshi text-[11px] tracking-[0.15em] uppercase text-ivory/50 hover:text-brass transition-colors"
            >
              Admin preview →
            </button>
            <p className="font-satoshi text-xs text-ivory/40 text-center">
              Demo: demo@demo.app · demo123 · admin@demo.app · admin123
            </p>
          </div>
        </div>

        <p className="mt-6 text-center font-satoshi text-sm text-ivory/60">
          Not a member yet?{" "}
          <Link href="/signup" className="text-brass hover:underline">
            Request access
          </Link>
        </p>
      </div>
    </main>
  );
}