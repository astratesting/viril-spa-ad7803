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
        <p className="font-inter text-[#C8A45C] text-sm tracking-widest uppercase mb-4">
          Request an Invitation
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#F5F0E8] mb-4">
          Be the first to be invited
        </h2>
        <p className="font-inter text-[#F5F0E8]/70 mb-10">
          Join the waitlist for founding member pricing and early access. No spam,
          no public list — only a quiet note when the doors open.
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
            className="flex-1 bg-[#3E2723]/40 border border-[#C8A45C]/20 rounded-sm px-5 py-4 text-[#F5F0E8] font-inter placeholder:text-[#F5F0E8]/40 focus:border-[#C8A45C] transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="border border-[#C8A45C] text-[#C8A45C] px-8 py-4 rounded-sm font-inter text-sm tracking-widest uppercase hover:bg-[#C8A45C] hover:text-[#3E2723] transition-all duration-300 disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Request"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 font-inter text-sm ${
              status === "success" ? "text-[#C8A45C]" : "text-[#6B0F1A]"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
