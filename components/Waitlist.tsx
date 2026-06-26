"use client";

import { useState } from "react";

const MEMBERSHIP_OPTIONS = [
  { value: "", label: "Select membership interest" },
  { value: "founding", label: "Founding Member" },
  { value: "full", label: "Full Membership" },
  { value: "associate", label: "Associate Membership" },
  { value: "undecided", label: "Still deciding" },
];

export default function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(
          data.message ||
            "Your request has been received. We'll be in touch."
        );
        setName("");
        setEmail("");
        setInterest("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const inputClass =
    "w-full bg-[#0A0A0B] border border-white/10 rounded-sm px-5 py-4 text-[#F5F0EB] font-inter text-sm placeholder:text-white/30 focus:border-[#C5A55A] transition-colors";
  const labelClass =
    "block font-inter text-xs uppercase tracking-[0.2em] mb-2 text-[#C5A55A]";

  return (
    <section id="waitlist" className="py-24 px-6 bg-[#1C1C1E]">
      <div className="max-w-xl mx-auto text-center">
        <h2
          className="font-playfair text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: "#F5F0EB" }}
        >
          Request an Invitation
        </h2>
        <div
          className="w-20 mx-auto mb-6"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #C5A55A, transparent)",
          }}
        />
        <p
          className="font-inter mb-10 max-w-md mx-auto"
          style={{ color: "rgba(245, 240, 235, 0.7)" }}
        >
          Membership is limited. Join the waitlist to be considered for founding
          member access and to receive launch announcements.
        </p>

        {status === "success" ? (
          <div
            className="border rounded-sm p-8"
            style={{
              borderColor: "rgba(197, 165, 90, 0.4)",
              background: "rgba(197, 165, 90, 0.05)",
            }}
          >
            <p
              className="font-playfair text-xl mb-2"
              style={{ color: "#C5A55A" }}
            >
              Thank you.
            </p>
            <p
              className="font-inter text-sm"
              style={{ color: "rgba(245, 240, 235, 0.75)" }}
            >
              {message}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-left"
          >
            <div>
              <label htmlFor="waitlist-name" className={labelClass}>
                Name
              </label>
              <input
                id="waitlist-name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="waitlist-email" className={labelClass}>
                Email
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="waitlist-interest" className={labelClass}>
                Membership Interest
              </label>
              <select
                id="waitlist-interest"
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                className={inputClass}
              >
                {MEMBERSHIP_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0A0A0B] text-[#F5F0EB]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {status === "error" && (
              <p className="font-inter text-sm" style={{ color: "#D4A574" }}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="font-inter text-sm tracking-[0.2em] uppercase px-8 py-4 rounded-sm transition-colors disabled:opacity-60"
              style={{
                background: "#C5A55A",
                color: "#0A0A0B",
              }}
              onMouseEnter={(e) => {
                if (status !== "loading")
                  (e.currentTarget as HTMLButtonElement).style.background = "#D4A574";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#C5A55A";
              }}
            >
              {status === "loading" ? "Sending…" : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
