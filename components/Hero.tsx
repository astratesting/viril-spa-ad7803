export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-ink">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 15%, rgba(232,89,43,0.18) 0%, transparent 50%), radial-gradient(ellipse at 85% 90%, rgba(212,42,110,0.20) 0%, transparent 55%), linear-gradient(180deg, #0A0A0B 0%, #070708 100%)",
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(244,241,236,0.4) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px)",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full blur-3xl bg-flame/8" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* COMING SOON / WAITLIST NOW badge */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-3 border border-flame/60 rounded-full px-5 py-2 mb-10 bg-flame/5 backdrop-blur-sm hover:bg-flame/15 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
          <span className="text-flame text-xs font-satoshi tracking-[0.3em] uppercase">
            Coming Soon · Waitlist Now
          </span>
        </a>

        {/* Brand wordmark */}
        <p className="font-archivo text-[15vw] md:text-[11rem] leading-[0.85] tracking-tight text-bone mb-6">
          GOON
        </p>

        {/* Tagline */}
        <h1 className="font-archivo text-3xl md:text-5xl uppercase tracking-tight mb-8 text-flame-gradient">
          The Salon Returns
        </h1>

        <div className="salon-divider w-40 mx-auto mb-8" />

        {/* Value proposition */}
        <p className="font-satoshi text-lg md:text-xl text-bone/75 max-w-2xl mx-auto leading-relaxed mb-12">
          An aristocratic queer sanctuary for high-net-worth gay and lesbian
          individuals. Old European luxury, subversive society, and the return
          of the private salon — arriving in West Hollywood.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-acid text-ink px-10 py-4 font-satoshi text-sm font-bold tracking-[0.2em] uppercase acid-glow hover:brightness-110 transition-all duration-300"
          >
            Join the Waitlist
            <span aria-hidden>→</span>
          </a>
          <a
            href="#manifesto"
            className="inline-flex items-center gap-2 border border-bone/25 text-bone/80 px-10 py-4 font-satoshi text-sm tracking-[0.2em] uppercase hover:border-flame hover:text-flame transition-all duration-300"
          >
            Read the Manifesto
          </a>
        </div>
      </div>
    </section>
  );
}
