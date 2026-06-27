export default function Footer() {
  return (
    <footer className="border-t border-brass/10 py-12 px-6 bg-ink">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-archivo text-2xl tracking-tight text-brass mb-2">
          Goon
        </p>
        <p className="font-satoshi text-xs text-ivory/40 tracking-[0.25em] uppercase mb-8">
          West Hollywood · Coming Soon
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-satoshi text-sm mb-8">
          <a
            href="https://instagram.com/goon.club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ivory/70 hover:text-brass transition-colors"
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
            @goon.club
          </a>
          <span className="hidden sm:block text-brass/30">·</span>
          <a
            href="mailto:hello@goon.club"
            className="inline-flex items-center gap-2 text-ivory/70 hover:text-brass transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
              />
            </svg>
            hello@goon.club
          </a>
        </div>

        <p className="font-satoshi text-xs text-ivory/30">
          © {new Date().getFullYear()} Goon. A private members club. By
          invitation only.
        </p>
      </div>
    </footer>
  );
}
