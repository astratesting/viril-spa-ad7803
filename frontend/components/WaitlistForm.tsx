"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
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
        setMessage(data.message || "Your application has been received.");
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
    <section id="waitlist" className="py-24 px-6 bg-charcoal border-t border-brass/10">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-satoshi text-brass text-sm tracking-[0.25em] uppercase mb-4">
          Founding Membership
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-ivory mb-4">
          Apply for Membership
        </h2>
        <p className="font-satoshi text-base text-ivory/70 mb-10 leading-relaxed">
          Founding membership is limited. Leave your address and you will be the
          first contacted when invitations open. No spam, no public list — only
          a quiet note from the house.
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
            className="flex-1 bg-burgundy/15 border border-brass/25 px-5 py-4 text-ivory font-satoshi placeholder:text-ivory/40 focus:border-brass transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="border border-brass text-brass px-8 py-4 font-satoshi text-sm tracking-[0.2em] uppercase hover:bg-brass hover:text-ink transition-all duration-300 disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Apply for Membership"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-6 font-satoshi text-sm ${
              status === "success" ? "text-brass" : "text-[#C97A7A]"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
