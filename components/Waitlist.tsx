"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="waitlist" className="py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
          Be the First
        </h2>
        <p className="font-inter text-muted-text mb-10">
          Join the waitlist for early access and founding member pricing.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="your@email.com"
            className="flex-1 bg-charcoal border border-white/10 rounded-sm px-5 py-4 text-white font-inter placeholder:text-white/30 focus:border-gold transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-gold text-rich-black px-8 py-4 rounded-sm font-inter font-semibold text-sm tracking-widest uppercase hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Joining..." : "Join Waitlist"}
          </button>
        </form>

        {status !== "idle" && (
          <p
            className={`mt-4 font-inter text-sm ${
              status === "success" ? "text-gold" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
