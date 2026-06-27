const TILES = Array.from({ length: 8 }, (_, i) => i);

export default function InstagramGallery() {
  return (
    <section id="gallery" className="relative py-28 px-6 bg-ink-soft border-t border-ink-line">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-satoshi text-flame text-xs tracking-[0.3em] uppercase mb-6">
            The Signal
          </p>
          <h2 className="font-archivo text-4xl md:text-6xl uppercase leading-[0.95] mb-6 text-bone">
            Follow the <span className="text-flame-gradient">House</span>
          </h2>
          <p className="font-satoshi text-base text-bone/65 max-w-xl mx-auto leading-relaxed">
            No fabricated moments, no staged faces. A blank grid awaiting the
            salon&rsquo;s first images — when the doors open, the feed fills.
          </p>
        </div>

        {/* Grid placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {TILES.map((i) => (
            <div
              key={i}
              className="relative aspect-square border border-ink-line bg-ink overflow-hidden group"
              style={{
                background:
                  i % 2 === 0
                    ? "radial-gradient(circle at 30% 30%, rgba(232,89,43,0.12), transparent 60%), #0A0A0B"
                    : "radial-gradient(circle at 70% 70%, rgba(212,42,110,0.12), transparent 60%), #0A0A0B",
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center font-satoshi text-[10px] tracking-[0.3em] uppercase text-bone/30">
                Soon
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://instagram.com/goon.club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-bone/25 text-bone/80 px-10 py-4 font-satoshi text-sm tracking-[0.25em] uppercase hover:border-acid hover:text-acid transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.5} />
              <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            Follow @goon.club
          </a>
        </div>
      </div>
    </section>
  );
}
