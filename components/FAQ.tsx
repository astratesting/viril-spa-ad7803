const faqs = [
  {
    q: "What exactly is Goon?",
    a: "Goon is a private members club with a physical venue in West Hollywood, delivering an authentic old European aristocratic luxury experience through curated in-person services for high-net-worth gay and lesbian individuals.",
  },
  {
    q: "Why a members-only model?",
    a: "Membership protects the character of the house. By verifying that every member belongs to our community, we create a space where no one has to explain, perform, or defend themselves. Discretion and belonging are the product — not just the services.",
  },
  {
    q: "Who can apply for membership?",
    a: "Gay men and lesbian women of means may request an invitation. Verification is required before membership is granted — this is how we keep Goon what it is.",
  },
  {
    q: "When does Goon open?",
    a: "We are honest: we do not have a fixed opening date. The house is being forged now, and founding members on the waitlist will be the first invited when the doors open.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 bg-[#141415]">
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
              className="group border border-[#B8894D]/20 bg-[#1C1C1E]/60 rounded-sm px-6 py-5 open:border-[#B8894D]/50 transition-colors"
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
