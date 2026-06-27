const faqs = [
  {
    q: "What are the membership criteria?",
    a: "Goon is a private members club for verified high-net-worth gay and lesbian individuals. Prospective members submit a request, complete identity verification, and are reviewed before an invitation is extended. This is how we keep Goon what it is — a sanctuary, not a venue.",
  },
  {
    q: "Where is Goon located?",
    a: "Goon is being forged in West Hollywood — a private physical house, not a pop-up. The exact address is shared only with verified members, by design. Public access is not part of the model.",
  },
  {
    q: "When does Goon open?",
    a: "We are honest: there is no fixed opening date yet. The house is being built now, and founding members on the waitlist will be the first invited when the doors open. We will not promise a date we cannot keep.",
  },
  {
    q: "How much does membership cost?",
    a: "Membership is tiered from $1,200 to $3,500 per year, graduated by the level of access and founding privileges you wish to hold. Dues are transparent and disclosed in full during the invitation process — there are no hidden fees.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 bg-[#1C1C1E]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-inter text-[#B8894D] text-sm tracking-[0.25em] uppercase mb-4">
            Questions, answered honestly
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#F5F0EB] mb-6">
            Before you apply
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border border-[#B8894D]/20 bg-[#141415]/60 rounded-sm px-6 py-5 open:border-[#B8894D]/50 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-playfair text-lg text-[#F5F0EB] pr-4">
                  {f.q}
                </span>
                <span className="text-[#B8894D] text-xl shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="font-inter text-sm text-[#F5F0EB]/70 leading-relaxed mt-4">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
