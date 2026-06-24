"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <h1 className="font-playfair text-4xl font-semibold text-white text-center mb-2">
        Join VIRIL
      </h1>
      <p className="font-inter text-muted-text text-center mb-8">
        Create your member account and get early access.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-flame/10 border border-flame/30 text-flame text-sm px-4 py-3 rounded-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block font-inter text-sm text-muted-text mb-1.5">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-3 text-white font-inter placeholder:text-white/30 focus:border-gold transition-colors"
          />
        </div>

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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-3 text-white font-inter placeholder:text-white/30 focus:border-gold transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-rich-black font-inter font-semibold py-3 rounded-sm hover:bg-gold-hover transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-muted-text text-sm font-inter mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:text-gold-hover transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
