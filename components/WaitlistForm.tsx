"use client";

import { useState } from "react";

const TIERS = [
  { value: "founding", label: "Founding Member — $1,200/yr" },
  { value: "patron", label: "Patron — $2,200/yr" },
  { value: "benefactor", label: "Benefactor — $3,500/yr" },
];

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");
  const [tier, setTier] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !tier) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, referral, tier }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Your interest has been received.");
        setName("");
        setEmail("");
        setReferral("");
        setTier("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const fieldClass =
    "w-full bg-ink-soft border border-ink-line px-5 py-4 text-bone font-satoshi placeholder:text-bone/35 focus:border-flame transition-colors";
  const labelClass =
    "block font-satoshi text-xs tracking-[0.25em] uppercase text-bone/60 mb-2";

  return (
    <section id="waitlist" className="relative py-28 px-6 bg-ink border-t border-ink-line">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-satoshi text-acid text-xs tracking-[0.3em] uppercase mb-6">
            Membership Interest
          </p>
          <h2 className="font-archivo text-4xl md:text-6xl uppercase leading-[0.95] mb-6 text-bone">
            Submit <span className="text-flame-gradient">Interest</span>
          </h2>
          <div className="salon-divider w-32 mx-auto mb-6" />
          <p className="font-satoshi text-base text-bone/70 leading-relaxed">
            Founding membership is limited. Submit your interest and you will be
            the first contacted when invitations open. No public list — only a
            quiet note from the house.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="referral" className={labelClass}>
              LinkedIn / Referral — how did you hear about us?
            </label>
            <input
              id="referral"
              type="text"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="linkedin.com/in/… or a member&rsquo;s name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="tier" className={labelClass}>
              Membership Tier Interest
            </label>
            <select
              id="tier"
              required
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className={`${fieldClass} appearance-none cursor-pointer`}
            >
              <option value="" disabled>
                Select a tier
              </option>
              {TIERS.map((t) => (
                <option key={t.value} value={t.value} className="bg-ink-soft text-bone">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-acid text-ink py-4 font-satoshi text-sm font-bold tracking-[0.25em] uppercase acid-glow hover:brightness-110 transition-all duration-300 disabled:opacity-50"
          >
            {status === "loading" ? "Submitting…" : "Submit Interest"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 font-satoshi text-sm ${
              status === "success" ? "text-acid" : "text-magenta"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
