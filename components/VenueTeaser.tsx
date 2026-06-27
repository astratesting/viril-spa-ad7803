export default function VenueTeaser() {
  return (
    <section id="venue" className="relative py-28 px-6 bg-ink-soft border-t border-ink-line">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-satoshi text-magenta text-xs tracking-[0.3em] uppercase mb-6">
            The House
          </p>
          <h2 className="font-archivo text-4xl md:text-6xl uppercase leading-[0.95] mb-8 text-bone">
            West Hollywood
            <br />
            <span className="text-bone/50">/</span> Beverly Hills
          </h2>
          <div className="salon-divider w-32 mb-8" />
          <p className="font-satoshi text-lg text-bone/75 leading-relaxed mb-6">
            A private physical house is being forged at the seam of West
            Hollywood and Beverly Hills — the old-money edge of a neighborhood
            that has always belonged to us. The exact address is shared only
            with verified members.
          </p>
          <p className="font-satoshi text-base text-bone/55 leading-relaxed">
            A rendezvous for the salon. Discretion by architecture, not by
            promise.
          </p>
        </div>

        {/* Luxury map / location hint */}
        <div className="relative aspect-[4/3] border border-ink-line bg-ink overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(232,89,43,0.14) 0%, transparent 45%), radial-gradient(circle at 30% 75%, rgba(212,42,110,0.12) 0%, transparent 50%), #0A0A0B",
            }}
          />
          {/* Grid lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            preserveAspectRatio="none"
            viewBox="0 0 400 300"
          >
            <defs>
              <pattern id="streets" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 H40 M20 0 V40" stroke="#2a2a2e" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#streets)" />
            <path d="M0 180 Q200 120 400 200" stroke="#E8592B" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M80 0 L160 300" stroke="#D42A6E" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
          {/* Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="w-3 h-3 rounded-full bg-acid acid-glow" />
            <span className="mt-2 font-satoshi text-[10px] tracking-[0.3em] uppercase text-bone/70 bg-ink/80 px-2 py-1">
              Confidential
            </span>
          </div>
          <div className="absolute bottom-4 left-4 font-satoshi text-[11px] tracking-[0.25em] uppercase text-bone/40">
            34.0900° N · 118.3617° W
          </div>
        </div>
      </div>
    </section>
  );
}
