"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Atmospheric background — layered gradients evoking candlelight on velvet & dark wood */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(184,137,77,0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(75,42,44,0.28) 0%, transparent 60%), linear-gradient(180deg, #1C1C1E 0%, #141415 100%)",
          }}
        />
        {/* Subtle wood-grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(197,165,90,0.6) 0px, rgba(28,28,30,0) 1px, rgba(28,28,30,0) 3px, rgba(197,165,90,0.3) 4px, rgba(28,28,30,0) 7px), repeating-linear-gradient(180deg, rgba(245,240,235,0.15) 0px, rgba(28,28,30,0) 1px, rgba(28,28,30,0) 5px)",
          }}
        />
        {/* Candlelight embers */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl bg-[#B8894D]/5" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl bg-[#4B2A2C]/20" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Coming Soon badge / ribbon */}
        <div className="inline-flex items-center gap-2 border border-[#B8894D]/50 rounded-full px-5 py-2 mb-8 bg-[#B8894D]/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#B8894D] animate-pulse" />
          <span className="text-[#B8894D] text-sm font-inter tracking-[0.25em] uppercase">
            Coming Soon
          </span>
        </div>

        {/* Brand wordmark */}
        <p className="font-playfair text-2xl md:text-3xl text-[#B8894D] tracking-[0.4em] uppercase mb-4">
          Goon
        </p>

        {/* Headline */}
        <h1 className="font-playfair text-5xl md:text-7xl font-semibold italic text-[#F5F0EB] mb-6 leading-tight">
          An Unwritten Chapter
        </h1>

        {/* Subheading */}
        <p className="font-playfair text-lg md:text-2xl text-[#F5F0EB]/85 mb-6 italic tracking-wide">
          West Hollywood&rsquo;s first private members club — for those who
          define culture, not follow it.
        </p>

        {/* Divider */}
        <div className="gold-divider w-32 mx-auto mb-8" />

        {/* Value proposition */}
        <p className="font-inter text-base md:text-lg text-[#F5F0EB]/75 max-w-2xl mx-auto leading-relaxed mb-12">
          Goon brings the unhurried luxury of an old European house to the
          heart of West Hollywood — a private sanctuary forged for
          high-net-worth LGBTQ+ individuals who shape culture rather than chase
          it. Discretion, refinement, and belonging, gathered under one roof.
        </p>

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 border border-[#B8894D] text-[#B8894D] px-10 py-4 rounded-sm font-inter text-sm tracking-[0.2em] uppercase hover:bg-[#B8894D] hover:text-[#1C1C1E] transition-all duration-300"
        >
          Request Founding Membership
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
