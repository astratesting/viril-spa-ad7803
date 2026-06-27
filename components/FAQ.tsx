const faqs = [
  {
    q: "What exactly is Goon?",
    a: "Goon is a members-only spa and salon exclusively for verified lesbian women and gay men. It is a private house offering cut, color, barbering, massage, facials, and body therapies in a setting designed for our community.",
  },
  {
    q: "Why a members-only model?",
    a: "Membership protects the character of the house. By verifying that every member belongs to our community, we create a space where no one has to explain, perform, or defend themselves. Discretion and belonging are the product, not just the services.",
  },
  {
    q: "Who can join?",
    a: "Lesbian women and gay men over the age of 18 may request an invitation. Verification is required before membership is granted — this is how we keep Goon what it is.",
  },
  {
    q: "How does verification work?",
    a: "We are finalizing the verification process and will share details with waitlist members first. It will be respectful, confidential, and as lightweight as we can make it while keeping the house trustworthy.",
  },
  {
    q: "Where will Goon be located?",
    a: "We are not announcing a location yet. When you join the waitlist you will be among the first to receive those details as they are confirmed.",
  },
  {
    q: "When does Goon open?",
    a: "We are honest: we do not have a fixed opening date. Build is underway, and founding members on the waitlist will be the first invited when we open our doors.",
  },
  {
    q: "How much does membership cost?",
    a: "Pricing tiers for founding members will be shared with the waitlist before public launch. We are not publishing numbers today because they are not final.",
  },
  {
    q: "Is my membership confidential?",
    a: "Yes. Membership is never published, sold, or shared. Private entrances, single-use suites, and a strict no-photography policy are part of the house standard.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-inter text-[#C8A45C] text-sm tracking-widest uppercase mb-4">
            Questions, answered honestly
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#F5F0E8] mb-6">
            Before you request an invitation
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border border-[#C8A45C]/15 bg-[#3E2723]/30 rounded-sm px-6 py-5 open:border-[#C8A45C]/40 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-playfair text-lg text-[#F5F0E8] pr-4">
                  {f.q}
                </span>
                <span className="text-[#C8A45C] text-xl shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="font-inter text-sm text-[#F5F0E8]/70 leading-relaxed mt-4">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
