"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#1C1C1E]">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-forge"
          style={{ background: "rgba(197, 165, 90, 0.08)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-forge"
          style={{ background: "rgba(212, 165, 116, 0.06)", animationDelay: "1.5s" }}
        />
        {/* Compass rose motif */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-[0.04]"
          aria-hidden="true"
        >
          <svg
            width="600"
            height="600"
            viewBox="0 0 200 200"
            fill="none"
            stroke="#C5A55A"
            strokeWidth="0.5"
          >
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="60" />
            <circle cx="100" cy="100" r="30" />
            <line x1="100" y1="10" x2="100" y2="190" />
            <line x1="10" y1="100" x2="190" y2="100" />
            <line x1="36" y1="36" x2="164" y2="164" />
            <line x1="164" y1="36" x2="36" y2="164" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto pt-16">
        {/* Coming Soon badge — Muted Brass */}
        <div
          className="inline-flex items-center gap-2 border rounded-full px-5 py-2 mb-10 backdrop-blur-sm"
          style={{ borderColor: "rgba(197, 165, 90, 0.4)", background: "rgba(197, 165, 90, 0.05)" }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#C5A55A" }}
          />
          <span
            className="text-sm font-inter tracking-[0.25em] uppercase"
            style={{ color: "#C5A55A" }}
          >
            Coming Soon
          </span>
        </div>

        {/* Brand name — Playfair Display */}
        <h1
          className="font-playfair text-7xl md:text-9xl font-semibold tracking-[0.15em] mb-6"
          style={{ color: "#F5F0EB" }}
        >
          GOON
        </h1>

        {/* Tagline */}
        <p
          className="font-playfair italic text-2xl md:text-3xl mb-4"
          style={{ color: "#C5A55A" }}
        >
          A private sanctuary. By invitation, for our own.
        </p>

        {/* Divider */}
        <div
          className="w-32 mx-auto mb-8"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #C5A55A, transparent)",
          }}
        />

        {/* Value proposition */}
        <p
          className="font-inter text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ color: "rgba(245, 240, 235, 0.75)" }}
        >
          A members-only spa and salon in West Hollywood, crafted exclusively for
          lesbian and gay men. Goon is a safe luxury sanctuary — where old-world
          European refinement meets a community that has always deserved more than
          adaptation. Every detail is designed with intention, for the people it
          serves.
        </p>

        {/* CTA — waitlist only */}
        <a
          href="#waitlist"
          className="inline-block font-inter text-sm tracking-[0.2em] uppercase px-8 py-4 rounded-sm transition-colors"
          style={{
            background: "#C5A55A",
            color: "#0A0A0B",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#D4A574";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#C5A55A";
          }}
        >
          Request Membership Invitation
        </a>
      </div>
    </section>
  );
}
