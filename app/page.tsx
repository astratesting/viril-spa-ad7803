"use client";

import { useState } from "react";

const BENEFITS = [
  {
    glyph: "✦",
    title: "A Sanctuary of One’s Own",
    body: "A members-only spa and salon conceived exclusively for lesbian and gay men. Every detail — from the treatment rooms to the private lounge — is designed for the people it serves, not adapted after the fact.",
  },
  {
    glyph: "❦",
    title: "Identity-Verified Membership",
    body: "Every member is verified before entry. This is not exclusion; it is the foundation of trust that allows a private sanctuary to exist at all. Discretion is not a feature here — it is the architecture.",
  },
  {
    glyph: "✺",
    title: "Old-World Craftsmanship",
    body: "Hand-finished materials, brass fittings, marble basins, and a hush of velvet and oak. We are building a place that feels inherited rather than installed — European refinement, rendered for our community.",
  },
  {
    glyph: "⚜",
    title: "By Invitation, Not Algorithm",
    body: "No public bookings. No walk-ins. Membership grows slowly, by referral and review. A club, in the proper sense — a room of people who chose each other’s company.",
  },
];

const FAQS = [
  {
    q: "Who is Goon for, exactly?",
    a: "Goon is a private members club for lesbian and gay men. Membership is identity-verified and intentionally limited. We are building a sanctuary, not a venue — the difference is who else is in the room.",
  },
  {
    q: "Why identity verification? Isn’t that invasive?",
    a: "Verification is the price of trust. We confirm that every member is who they say they are, and that they belong to the community this club exists for. Your information is held in confidence, used solely for membership review, and never sold. Discretion is the point of the place.",
  },
  {
    q: "Where will Goon be located?",
    a: "Our first house is being prepared in West Hollywood. Exact address and access details are shared only with verified members, after the waitlist review. A second city is under consideration for founding members there.",
  },
  {
    q: "How does pricing and membership work?",
    a: "Membership is by application and invitation, not purchase alone. Founding members are being selected now from the waitlist; thereafter, dues and tiers are disclosed privately as part of the review process. We will not publish a price list — if that is a concern, this is not your club.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
        setMessage(data.message || "Your request has been received. We will be in touch.");
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

  return (
    <main className="font-body">
      {/* ===================== NAVBAR ===================== */}
      <nav className="nav-shell fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-xl tracking-[0.32em]" style={{ color: "var(--gold)" }}>
            GOON
          </a>
          <div className="hidden md:flex items-center gap-10">
            <a href="#benefits" className="nav-link">The Sanctuary</a>
            <a href="#faq" className="nav-link">Questions</a>
            <a href="#waitlist" className="btn-ghost">Join the Waitlist</a>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <a href="#waitlist" className="btn-ghost" style={{ padding: "0.6rem 1rem", fontSize: "0.62rem" }}>Waitlist</a>
          </div>
        </div>
      </nav>

      {/* ===================== HERO ===================== */}
      <section
        id="top"
        className="tx-damask-dark tx-vignette relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Compass-rose / crest watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]" aria-hidden="true">
          <svg width="760" height="760" viewBox="0 0 200 200" fill="none" stroke="#C5A55A" strokeWidth="0.4">
            <circle cx="100" cy="100" r="95" />
            <circle cx="100" cy="100" r="72" />
            <circle cx="100" cy="100" r="48" />
            <circle cx="100" cy="100" r="24" />
            <line x1="100" y1="5" x2="100" y2="195" />
            <line x1="5" y1="100" x2="195" y2="100" />
            <line x1="33" y1="33" x2="167" y2="167" />
            <line x1="167" y1="33" x2="33" y2="167" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Crest */}
          <div className="flex justify-center mb-10 animate-fade-in">
            <div className="crest">
              <span className="monogram">G</span>
            </div>
          </div>

          {/* Coming Soon ribbon */}
          <div className="flex justify-center mb-10 animate-fade-in-delay-1">
            <span className="ribbon">
              <span className="dot" />
              Coming Soon
            </span>
          </div>

          {/* Wordmark */}
          <h1 className="wordmark animate-fade-in-delay-2">GOON</h1>
          <span className="wordmark-underline animate-fade-in-delay-2" />

          {/* Tagline */}
          <p className="font-display italic text-2xl md:text-3xl mt-8 animate-fade-in-delay-2" style={{ color: "var(--gold)" }}>
            Old European Aristocratic Luxury — For Lesbian &amp; Gay Men
          </p>

          {/* Ornate divider */}
          <div className="ornate-divider my-10 animate-fade-in-delay-3">
            <span className="diamond" />
            <span className="fleuron">❦</span>
            <span className="diamond" />
          </div>

          {/* Value proposition */}
          <p className="lede text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-3">
            Goon is an identity-verified, members-only spa and salon — conceived
            exclusively for lesbian and gay men, and built in the spirit of an
            old European private club. A place where our community is not a
            market segment but the founding purpose. Discretion is the
            architecture; belonging is the room.
          </p>

          {/* CTA */}
          <div className="mt-12 animate-fade-in-delay-3">
            <a href="#waitlist" className="btn-gold">Join the Founding Waitlist</a>
          </div>
        </div>
      </section>

      {/* ===================== BENEFITS ===================== */}
      <section id="benefits" className="tx-wood-dark relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="eyebrow mb-5">The Sanctuary</p>
            <h2 className="section-title section-title-ivory mb-6">
              What We Are Building
            </h2>
            <div className="ornate-divider my-8">
              <span className="diamond" />
              <span className="fleuron">✦</span>
              <span className="diamond" />
            </div>
            <p className="lede max-w-2xl mx-auto">
              Four promises that define Goon. Not amenities — principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map((b) => (
              <article key={b.title} className="gold-frame p-10 relative">
                <span className="corner tl" />
                <span className="corner tr" />
                <span className="corner bl" />
                <span className="corner br" />
                <div className="benefit-icon mb-6">{b.glyph}</div>
                <h3 className="font-display text-2xl mb-4" style={{ color: "var(--ivory)" }}>
                  {b.title}
                </h3>
                <div className="gold-rule mb-5" style={{ width: "60px" }} />
                <p className="lede">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WAITLIST ===================== */}
      <section id="waitlist" className="tx-velvet-burgundy relative py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow mb-5">By Invitation</p>
          <h2 className="section-title section-title-ivory mb-6">
            Request an Invitation
          </h2>
          <div className="ornate-divider my-8">
            <span className="diamond" />
            <span className="fleuron">❦</span>
            <span className="diamond" />
          </div>
          <p className="lede max-w-xl mx-auto mb-12">
            Membership is limited and reviewed by hand. Leave your name to be
            considered for the founding cohort. We respond in confidence.
          </p>

          {status === "success" ? (
            <div className="gold-frame p-10 text-center">
              <span className="corner tl" /><span className="corner tr" />
              <span className="corner bl" /><span className="corner br" />
              <div className="benefit-icon mb-4">✦</div>
              <p className="font-display text-2xl mb-3" style={{ color: "var(--gold)" }}>
                Thank you.
              </p>
              <p className="lede">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="gold-frame p-8 md:p-10 text-left relative">
              <span className="corner tl" /><span className="corner tr" />
              <span className="corner bl" /><span className="corner br" />

              <div className="mb-5">
                <label htmlFor="waitlist-name" className="field-label">Name</label>
                <input
                  id="waitlist-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (status !== "idle") setStatus("idle"); }}
                  placeholder="Your full name"
                  className="field"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="waitlist-email" className="field-label">Email</label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                  placeholder="your@email.com"
                  className="field"
                />
              </div>

              <div className="mb-7">
                <label htmlFor="waitlist-interest" className="field-label">Membership Interest</label>
                <select
                  id="waitlist-interest"
                  value={interest}
                  onChange={(e) => { setInterest(e.target.value); if (status !== "idle") setStatus("idle"); }}
                  className="field"
                >
                  <option value="">Select membership interest</option>
                  <option value="founding">Founding Member</option>
                  <option value="full">Full Membership</option>
                  <option value="associate">Associate Membership</option>
                  <option value="undecided">Still deciding</option>
                </select>
              </div>

              {status === "error" && (
                <p className="mb-5 text-sm" style={{ color: "var(--gold-soft)" }}>{message}</p>
              )}

              <div className="text-center">
                <button type="submit" disabled={status === "loading"} className="btn-gold">
                  {status === "loading" ? "Sending…" : "Join the Founding Waitlist"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="tx-marble-ivory relative py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <p className="eyebrow mb-5" style={{ color: "var(--burgundy)" }}>In Confidence</p>
            <h2 className="section-title section-title-dark mb-6">
              Questions, Answered Honestly
            </h2>
            <div className="ornate-divider my-8">
              <span className="diamond" />
              <span className="fleuron">✦</span>
              <span className="diamond" />
            </div>
            <p className="lede max-w-xl mx-auto" style={{ color: "rgba(28,28,30,0.7)" }}>
              No evasion, no marketing-speak. If a question matters to you, it deserves a real answer.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="answer">{item.a}</div>
              </details>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="#waitlist" className="btn-ghost" style={{ color: "var(--burgundy)", borderColor: "rgba(92,26,26,0.5)" }}>
              Join the Founding Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer-shell py-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="crest" style={{ width: "56px", height: "56px" }}>
              <span className="monogram" style={{ fontSize: "1.1rem" }}>G</span>
            </div>
          </div>
          <p className="font-display text-2xl tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
            GOON
          </p>
          <div className="ornate-divider my-6" style={{ opacity: 0.6 }}>
            <span className="diamond" />
            <span className="fleuron">❦</span>
            <span className="diamond" />
          </div>
          <p className="lede text-sm" style={{ color: "var(--ivory-mute)" }}>
            Private Members Club — Est. Coming Soon
          </p>
          <p className="lede text-xs mt-3" style={{ color: "var(--ivory-mute)" }}>
            © {new Date().getFullYear()} Goon. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
