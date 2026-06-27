import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

const benefits = [
  {
    title: "Private Dining",
    body: "An old European salon table — intimate dinners and rare cellars, served where conversation is the point.",
    icon: "✦",
  },
  {
    title: "Concierge Services",
    body: "A discreet house concierge attending to reservations, transport, and the quiet logistics of a well-lived life.",
    icon: "◆",
  },
  {
    title: "Curated Events",
    body: "Salons, recitals, and gatherings programmed in the spirit of 1920s Paris — culture gathered behind a closed door.",
    icon: "⬡",
  },
  {
    title: "Identity-Verified Community",
    body: "Membership extended only to verified high-net-worth gay and lesbian individuals. A room of peers — never a room to explain.",
    icon: "◈",
  },
];

const faqs = [
  {
    q: "Where is Goon located?",
    a: "Goon is being forged in West Hollywood — a private physical venue, not a pop-up. The exact address is shared only with verified members, by design. Public access is not part of the model.",
  },
  {
    q: "How much does membership cost?",
    a: "Membership is tiered from $1,200 to $3,500 per year, graduated by the level of access and founding privileges you wish to hold. Dues are transparent and disclosed in full during the invitation process — there are no hidden fees.",
  },
  {
    q: "How does the verification process work?",
    a: "After you apply, our membership team conducts a discreet review and identity verification before any invitation or dues are exchanged. The specifics are shared privately with applicants — never publicly. This is how Goon stays a sanctuary.",
  },
  {
    q: "When does Goon open?",
    a: "We are honest: there is no fixed opening date yet. The house is being built now, and founding members on the waitlist will be the first invited when the doors open. We will not promise a date we cannot keep.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(197,165,90,0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(75,42,44,0.32) 0%, transparent 60%), linear-gradient(180deg, #1C1C1E 0%, #0A0A0B 100%)",
            }}
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl bg-brass/8" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-brass/50 rounded-full px-5 py-2 mb-8 bg-brass/5 backdrop-blur-sm brass-glow">
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="text-brass text-sm font-satoshi tracking-[0.25em] uppercase">
              Coming Soon
            </span>
          </div>
          <p className="font-archivo text-6xl md:text-8xl tracking-tight text-ivory mb-6">
            Goon
          </p>
          <h1 className="font-playfair text-3xl md:text-5xl italic text-brass-gradient mb-6">
            Discreet Aristocratic Belonging
          </h1>
          <div className="salon-divider w-32 mx-auto mb-8" />
          <p className="font-satoshi text-base md:text-lg text-ivory/75 max-w-2xl mx-auto leading-relaxed mb-12">
            A private sanctuary where old-world elegance meets authentic
            community. Goon is West Hollywood&rsquo;s first members-only club for
            high-net-worth gay and lesbian individuals — a physical venue
            offering curated in-person services in an atmosphere of
            uncompromising discretion and prestige.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-brass text-ink px-10 py-4 font-satoshi text-sm font-bold tracking-[0.2em] uppercase hover:bg-brass-bright transition-all duration-300"
            >
              Apply for Membership
            </a>
            <form action="/api/auth/demo" method="post" className="inline">
              <input type="hidden" name="role" value="member" />
              <button
                type="submit"
                className="inline-flex items-center gap-2 border border-brass text-brass px-10 py-4 font-satoshi text-sm tracking-[0.2em] uppercase hover:bg-brass hover:text-ink transition-all duration-300"
              >
                View Live Demo
              </button>
            </form>
            <Link
              href="/login"
              className="font-satoshi text-xs tracking-[0.25em] uppercase text-ivory/50 hover:text-brass transition-colors"
            >
              Member Login
            </Link>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-24 px-6 bg-charcoal border-t border-brass/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-satoshi text-brass text-sm tracking-[0.25em] uppercase mb-4">
              Our Vision
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-ivory mb-6">
              Inherit the salon.
            </h2>
            <p className="font-satoshi text-base text-ivory/70 max-w-2xl mx-auto leading-relaxed">
              Goon draws its spirit from the 1920s Parisian salon — the private
              rooms where queer aristocrats, artists, and patrons gathered to
              trade ideas, beauty, and secrets. We are not reviving a theme. We
              are returning a tradition to the people who earned it.
            </p>
            <div className="salon-divider w-24 mx-auto mt-8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="border border-brass/20 bg-burgundy/10 p-8 hover:border-brass/50 transition-colors duration-300"
              >
                <div className="text-brass text-2xl mb-4">{b.icon}</div>
                <h3 className="font-playfair text-lg font-semibold text-ivory mb-3 leading-snug">
                  {b.title}
                </h3>
                <p className="font-satoshi text-sm text-ivory/70 leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaitlistForm />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-charcoal border-t border-brass/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-satoshi text-brass text-sm tracking-[0.25em] uppercase mb-4">
              Questions, answered honestly
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-ivory mb-6">
              Before you apply
            </h2>
            <div className="salon-divider w-24 mx-auto" />
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group border border-brass/20 bg-charcoal-soft/60 px-6 py-5 open:border-brass/50 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-playfair text-lg text-ivory pr-4">{f.q}</span>
                  <span className="text-brass text-xl shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="font-satoshi text-sm text-ivory/70 leading-relaxed mt-4">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brass/10 py-12 px-6 bg-ink">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-archivo text-2xl tracking-tight text-brass mb-2">Goon</p>
          <p className="font-satoshi text-xs text-ivory/40 tracking-[0.25em] uppercase mb-8">
            West Hollywood · Coming Soon
          </p>
          <p className="font-satoshi text-xs text-ivory/30">
            © {new Date().getFullYear()} Goon. A private members club. By
            invitation only.
          </p>
        </div>
      </footer>
    </main>
  );
}
