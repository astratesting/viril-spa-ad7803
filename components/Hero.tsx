import DemoButton from "@/components/DemoButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Atmospheric background — candlelit velvet & dark wood */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(197,165,90,0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(75,42,44,0.32) 0%, transparent 60%), linear-gradient(180deg, #1C1C1E 0%, #0A0A0B 100%)",
          }}
        />
        {/* Wood-grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(197,165,90,0.6) 0px, rgba(28,28,30,0) 1px, rgba(28,28,30,0) 3px, rgba(197,165,90,0.3) 4px, rgba(28,28,30,0) 7px)",
          }}
        />
        {/* Candlelight embers */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl bg-brass/8" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl bg-burgundy/25" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 border border-brass/50 rounded-full px-5 py-2 mb-8 bg-brass/5 backdrop-blur-sm brass-glow">
          <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
          <span className="text-brass text-sm font-satoshi tracking-[0.25em] uppercase">
            Coming Soon
          </span>
        </div>

        {/* Brand wordmark */}
        <p className="font-archivo text-6xl md:text-8xl tracking-tight text-ivory mb-6">
          Goon
        </p>

        {/* Tagline */}
        <h1 className="font-playfair text-3xl md:text-5xl italic text-brass-gradient mb-6">
          Discreet Aristocratic Belonging
        </h1>

        <div className="salon-divider w-32 mx-auto mb-8" />

        {/* Value proposition */}
        <p className="font-satoshi text-base md:text-lg text-ivory/75 max-w-2xl mx-auto leading-relaxed mb-12">
          A private sanctuary where old-world elegance meets authentic
          community. Goon is West Hollywood&rsquo;s first members-only club for
          high-net-worth gay and lesbian individuals — a physical venue offering
          curated in-person services in an atmosphere of uncompromising
          discretion and prestige.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-brass text-ink px-10 py-4 font-satoshi text-sm font-bold tracking-[0.2em] uppercase hover:bg-brass-bright transition-all duration-300"
          >
            Apply for Membership
          </a>
          <a
            href="/login"
            className="inline-flex items-center gap-2 border border-ivory/25 text-ivory px-10 py-4 font-satoshi text-sm tracking-[0.2em] uppercase hover:border-brass hover:text-brass transition-all duration-300"
          >
            Member Login
          </a>
          <DemoButton />
        </div>
        <p className="mt-6 font-satoshi text-xs text-ivory/40">
          Demo account ready — one click into the salon.
        </p>
      </div>
    </section>
  );
}
