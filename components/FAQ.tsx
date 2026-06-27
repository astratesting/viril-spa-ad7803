const faqs = [
  {
    q: "Who is Goon for?",
    a: "Goon is a private members club for verified high-net-worth gay and lesbian individuals. Prospective members apply, complete identity verification, and are reviewed before an invitation is extended. This is how the salon stays a sanctuary, not a venue.",
  },
  {
    q: "Where is Goon located?",
    a: "The house is being forged in West Hollywood. The exact address is shared only with verified members, by design. Public access is not part of the model.",
  },
  {
    q: "How is identity verified?",
    a: "After you apply, our membership team conducts a discreet review and identity verification before any invitation or dues are exchanged. The specifics are shared privately with applicants — never publicly.",
  },
  {
    q: "What do the tiers cost and include?",
    a: "Membership is tiered — Basic at $1,200/yr, Premium at $2,200/yr, and VIP at $3,500/yr — graduated by access and founding privileges. Dues are transparent and disclosed in full during the invitation process. There are no hidden fees.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-28 px-6 bg-charcoal border-t border-brass/10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-satoshi text-brass text-xs tracking-[0.3em] uppercase mb-6">
            Honestly Answered
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-ivory">
            Before You <span className="text-brass-gradient">Apply</span>
          </h2>
          <div className="salon-divider w-24 mx-auto mt-8" />
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border border-ivory/15 bg-charcoal-soft px-6 py-5 open:border-brass/40 transition-colors"
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
  );
}
