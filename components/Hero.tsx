"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-[#C8A45C]/5" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-[#6B0F1A]/10" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 border border-[#C8A45C]/40 rounded-full px-5 py-2 mb-10 bg-[#C8A45C]/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#C8A45C] animate-pulse" />
          <span className="text-[#C8A45C] text-sm font-inter tracking-widest uppercase">
            Coming Soon
          </span>
        </div>

        {/* Brand name */}
        <h1 className="font-playfair text-7xl md:text-9xl font-bold tracking-wider text-gold-gradient mb-6">
          Goon
        </h1>

        {/* Tagline */}
        <p className="font-playfair text-2xl md:text-3xl text-[#F5F0E8]/90 italic mb-8">
          A private house of beauty, discretion, and belonging.
        </p>

        {/* Divider */}
        <div className="gold-divider w-32 mx-auto mb-8" />

        {/* Value proposition */}
        <p className="font-inter text-lg md:text-xl text-[#F5F0E8]/70 max-w-2xl mx-auto leading-relaxed mb-12">
          A members-only spa and salon exclusively for verified lesbian women and
          gay men. Where old-world European refinement meets a community of one&apos;s
          own.
        </p>

        {/* CTA — waitlist is the only call to action */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 border border-[#C8A45C] text-[#C8A45C] px-8 py-4 rounded-sm font-inter text-sm tracking-widest uppercase hover:bg-[#C8A45C] hover:text-[#3E2723] transition-all duration-300"
        >
          Request an Invitation
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
