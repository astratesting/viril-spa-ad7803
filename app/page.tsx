import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Charter from "@/components/Charter";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1C1C1E]">
      <Hero />
      <Benefits />
      <FAQ />
      <Charter />
      <Waitlist />

      <footer className="border-t border-[#B8894D]/15 py-12 px-6 bg-[#1C1C1E]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-playfair text-2xl text-[#B8894D] tracking-wider mb-2">
            Goon
          </p>
          <p className="font-inter text-xs text-[#F5F0EB]/40 tracking-widest uppercase mb-8">
            West Hollywood · Coming Soon
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-inter text-sm">
            <a
              href="https://instagram.com/goon.la"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#F5F0EB]/70 hover:text-[#B8894D] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  strokeWidth={1.5}
                />
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              @goon.la
            </a>
            <span className="hidden sm:block text-[#B8894D]/30">·</span>
            <a
              href="mailto:hello@goon.la"
              className="inline-flex items-center gap-2 text-[#F5F0EB]/70 hover:text-[#B8894D] transition-colors"
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
              hello@goon.la
            </a>
          </div>

          <p className="font-inter text-xs text-[#F5F0EB]/30 mt-8">
            © {new Date().getFullYear()} Goon. A private members club. By
            invitation only.
          </p>
        </div>
      </footer>
    </main>
  );
}
