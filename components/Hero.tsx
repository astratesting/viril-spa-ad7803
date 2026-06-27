"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Atmospheric background — layered gradients evoking forge glow on charcoal */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(184,137,77,0.10) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(107,29,47,0.18) 0%, transparent 60%), linear-gradient(180deg, #1C1C1E 0%, #141415 100%)",
          }}
        />
        {/* Subtle anvil/forge ember motif */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl bg-[#B8894D]/5" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl bg-[#6B1D2F]/15" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 border border-[#B8894D]/50 rounded-full px-5 py-2 mb-10 bg-[#B8894D]/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#B8894D] animate-pulse" />
          <span className="text-[#B8894D] text-sm font-inter tracking-[0.25em] uppercase">
            Coming Soon
          </span>
        </div>

        {/* Brand name */}
        <h1 className="font-playfair text-7xl md:text-9xl font-bold tracking-[0.15em] text-[#F5F0EB] mb-6">
          Goon
        </h1>

        {/* Tagline */}
        <p className="font-playfair text-2xl md:text-3xl text-[#B8894D] italic mb-8 tracking-wide">
          The Last Great Sanctuary
        </p>

        {/* Divider */}
        <div className="gold-divider w-32 mx-auto mb-8" />

        {/* Value proposition */}
        <p className="font-inter text-base md:text-lg text-[#F5F0EB]/75 max-w-2xl mx-auto leading-relaxed mb-12">
          A private members club in West Hollywood delivering authentic old
          European aristocratic luxury for high-net-worth gay and lesbian
          individuals. Forged in discretion, tempered by refinement — a house
          where belonging is the highest privilege.
        </p>

        {/* CTA — the only call to action */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 border border-[#B8894D] text-[#B8894D] px-10 py-4 rounded-sm font-inter text-sm tracking-[0.2em] uppercase hover:bg-[#B8894D] hover:text-[#1C1C1E] transition-all duration-300"
        >
          Apply for Membership
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
