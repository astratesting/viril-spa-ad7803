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
    <section id="waitlist" className="py-24 px-6 bg-[#1C1C1E]">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-inter text-[#B8894D] text-sm tracking-[0.25em] uppercase mb-4">
          Request an Invitation
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#F5F0EB] mb-4">
          Join the Waitlist
        </h2>
        <p className="font-inter text-base text-[#F5F0EB]/70 mb-10 leading-relaxed">
          Founding membership is limited. Leave your address and you will be the
          first invited when the doors of Goon open in West Hollywood. No spam,
          no public list — only a quiet note when the house is ready.
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
            className="flex-1 bg-[#6B1D2F]/15 border border-[#B8894D]/25 rounded-sm px-5 py-4 text-[#F5F0EB] font-inter placeholder:text-[#F5F0EB]/40 focus:border-[#B8894D] transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="border border-[#B8894D] text-[#B8894D] px-8 py-4 rounded-sm font-inter text-sm tracking-[0.2em] uppercase hover:bg-[#B8894D] hover:text-[#1C1C1E] transition-all duration-300 disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Apply for Membership"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 font-inter text-sm ${
              status === "success" ? "text-[#B8894D]" : "text-[#6B1D2F]"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
