"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin() {
    setEmail("demo@demo.app");
    setPassword("demo123");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@demo.app", password: "demo123" }),
      });

      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        setError("Demo login failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <h1 className="font-playfair text-4xl font-semibold text-white text-center mb-2">
        Welcome Back
      </h1>
      <p className="font-inter text-muted-text text-center mb-8">
        Sign in to your VIRIL member account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-flame/10 border border-flame/30 text-flame text-sm px-4 py-3 rounded-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block font-inter text-sm text-muted-text mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-3 text-white font-inter placeholder:text-white/30 focus:border-gold transition-colors"
          />
        </div>

        <div>
          <label className="block font-inter text-sm text-muted-text mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-3 text-white font-inter placeholder:text-white/30 focus:border-gold transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-rich-black font-inter font-semibold py-3 rounded-sm hover:bg-gold-hover transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-muted-text text-xs font-inter uppercase">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <button
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full border border-gold/40 text-gold font-inter py-3 rounded-sm hover:bg-gold/10 transition-colors disabled:opacity-50"
      >
        Try Demo Account
      </button>

      <p className="text-center text-muted-text text-sm font-inter mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-gold hover:text-gold-hover transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}
