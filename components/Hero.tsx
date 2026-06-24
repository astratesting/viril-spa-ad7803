"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-forge" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-flame/3 rounded-full blur-3xl animate-forge" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-5 py-2 mb-10 bg-gold/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-sm font-inter tracking-widest uppercase">
            Coming Soon
          </span>
        </div>

        {/* Brand name */}
        <h1 className="font-archivo text-7xl md:text-9xl font-bold tracking-wider text-gold-gradient mb-6">
          VIRIL
        </h1>

        {/* Tagline */}
        <p className="font-playfair text-2xl md:text-3xl text-white/90 italic mb-4">
          West Hollywood&apos;s First Luxury Spa Exclusively for Gay Men
        </p>

        {/* Divider */}
        <div className="gold-divider w-32 mx-auto mb-8" />

        {/* Value proposition */}
        <p className="font-satoshi text-lg md:text-xl text-muted-text max-w-2xl mx-auto leading-relaxed mb-12">
          A space crafted with intention &mdash; where relaxation meets community,
          and every detail is designed for you. Massage, facials, waxing, and body
          treatments in an affirming, upscale environment.
        </p>

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-4 rounded-sm font-satoshi
                     hover:bg-gold hover:text-rich-black transition-all duration-300 text-sm tracking-widest uppercase"
        >
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}
