"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest: "" }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(
          data.message ??
            "Your request has been received. We'll be in touch as launch approaches."
        );
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Unable to process your request at this time.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to process your request at this time.");
    }
  }

  return (
    <section
      id="waitlist"
      className="relative py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, #1C1C1E 0%, #2A1A15 60%, #3E2723 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow animate-fade-in">By Invitation</p>
        <h2 className="section-title mt-4 animate-fade-in-delay-1">
          Request Membership
        </h2>
        <div className="ornate-divider mt-6">
          <span className="diamond" aria-hidden />
        </div>
        <p
          className="lede mt-8 animate-fade-in-delay-2"
          style={{ fontSize: "1.05rem", maxWidth: "36rem", marginInline: "auto" }}
        >
          Membership is limited and reviewed by hand. Leave your name and email
          to be considered for the founding list. All correspondence is held in
          confidence.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 grid gap-5 text-left"
          aria-label="Join the waitlist"
        >
          <div>
            <label htmlFor="waitlist-name" className="field-label">
              Name
            </label>
            <input
              id="waitlist-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="field"
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label htmlFor="waitlist-email" className="field-label">
              Email
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="field"
              disabled={status === "loading"}
            />
          </div>

          <div className="text-center mt-2">
            <button
              type="submit"
              className="btn-gold"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Join the Waitlist"}
            </button>
          </div>

          {message && (
            <p
              role="status"
              aria-live="polite"
              className="font-body text-center mt-2"
              style={{
                color:
                  status === "success"
                    ? "var(--gold)"
                    : status === "error"
                    ? "#D9B5B5"
                    : "var(--ivory-dim)",
                fontSize: "1rem",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
