export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #3E2723 0%, #2A1A15 45%, #1C1C1E 100%)",
      }}
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none animate-flicker"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(197,168,76,0.16) 0%, transparent 55%)",
        }}
      />

      {/* Crest */}
      <div className="crest mb-10 animate-fade-in">
        <span className="monogram">G</span>
      </div>

      {/* COMING SOON badge */}
      <div className="ribbon animate-fade-in-delay-1">
        <span className="dot" aria-hidden />
        <span>Coming Soon</span>
      </div>

      {/* Wordmark */}
      <h1 className="wordmark mt-8 animate-fade-in-delay-1">GOON</h1>
      <span className="wordmark-underline" aria-hidden />

      {/* Tagline */}
      <p
        className="font-display italic mt-10 animate-fade-in-delay-2"
        style={{
          color: "#F5F0E8",
          fontSize: "clamp(1.25rem, 2.4vw, 1.9rem)",
          letterSpacing: "0.02em",
          lineHeight: 1.4,
          maxWidth: "44rem",
        }}
      >
        A private sanctuary, by invitation only.
      </p>

      {/* Value prop */}
      <p
        className="font-body mt-6 animate-fade-in-delay-3"
        style={{
          color: "rgba(245, 240, 232, 0.74)",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          maxWidth: "40rem",
        }}
      >
        An identity-verified, members-only spa and salon conceived exclusively
        for lesbian and gay men — built in the spirit of an old European
        private members club. Discretion is not a feature here; it is the
        architecture.
      </p>

      {/* CTA */}
      <a
        href="#waitlist"
        className="btn-gold mt-12 animate-fade-in-delay-3"
        aria-label="Join the waitlist"
      >
        Join the Waitlist
      </a>

      {/* Bottom gold rule */}
      <div className="ornate-divider mt-20 opacity-80">
        <span className="fleuron">✦</span>
      </div>
    </section>
  );
}
