export default function Footer() {
  return (
    <footer className="border-t border-brass/15 py-14 px-6 bg-ink">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-playfair text-3xl tracking-tight text-ivory mb-2">Goon</p>
        <p className="font-satoshi text-xs text-ivory/45 tracking-[0.3em] uppercase mb-10">
          Discreet Aristocratic Belonging · West Hollywood
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-satoshi text-sm mb-10">
          <a
            href="/login"
            className="text-ivory/70 hover:text-brass transition-colors"
          >
            Member Login
          </a>
          <span className="hidden sm:block text-ivory/20">·</span>
          <a
            href="/signup"
            className="text-ivory/70 hover:text-brass transition-colors"
          >
            Apply for Membership
          </a>
          <span className="hidden sm:block text-ivory/20">·</span>
          <a
            href="mailto:hello@goon.club"
            className="text-ivory/70 hover:text-brass transition-colors"
          >
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
