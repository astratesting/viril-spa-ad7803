const faqs = [
  {
    q: "Who is GOON for?",
    a: "GOON is a private members club for verified high-net-worth gay and lesbian individuals. Prospective members submit interest, complete identity verification, and are reviewed before an invitation is extended. This is how the salon stays a sanctuary, not a venue.",
  },
  {
    q: "When does the house open?",
    a: "We will be honest: there is no fixed opening date yet. The house is being forged now and founding members on the waitlist will be the first invited when the doors open. We will not promise a date we cannot keep.",
  },
  {
    q: "How is identity verified?",
    a: "After you submit interest, our membership team conducts a discreet review and identity verification before any invitation or dues are exchanged. The specifics are shared privately with applicants — never publicly.",
  },
  {
    q: "What do the tiers cost and include?",
    a: "Membership is tiered — Founding Member at $1,200/yr, Patron at $2,200/yr, and Benefactor at $3,500/yr — graduated by access and founding privileges. Dues are transparent and disclosed in full during the invitation process. There are no hidden fees.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-28 px-6 bg-ink border-t border-ink-line">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-satoshi text-acid text-xs tracking-[0.3em] uppercase mb-6">
            Honestly Answered
          </p>
          <h2 className="font-archivo text-4xl md:text-6xl uppercase leading-[0.95] text-bone">
            Before You <span className="text-flame-gradient">Apply</span>
          </h2>
          <div className="salon-divider w-24 mx-auto mt-8" />
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border border-ink-line bg-ink-soft px-6 py-5 open:border-flame/40 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-satoshi text-lg text-bone pr-4">{f.q}</span>
                <span className="text-flame text-xl shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="font-satoshi text-sm text-bone/70 leading-relaxed mt-4">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
