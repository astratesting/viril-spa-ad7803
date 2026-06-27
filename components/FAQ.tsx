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

export default function FAQ() {
  return (
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
                <span className="font-playfair text-lg text-ivory pr-4">
                  {f.q}
                </span>
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
