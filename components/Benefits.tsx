const benefits = [
  {
    title: "Identity-Verified Sanctuary",
    body: "Membership is extended only to verified high-net-worth LGBTQ+ individuals. The result is a private house where you are surrounded by peers — never a room to explain or defend.",
    icon: "✦",
  },
  {
    title: "Old European Aristocratic Ambiance",
    body: "Burgundy velvet, dark wood, polished brass, and cream linen. An atmosphere drawn from the great European houses — quiet, unhurried, and entirely yours.",
    icon: "◆",
  },
  {
    title: "Curated Cultural Events",
    body: "Members-only salons, intimate performances, and gatherings programmed with care — a calendar shaped to deepen the character of the house and the community within it.",
    icon: "⬡",
  },
  {
    title: "Tiered Membership · $1,200–$3,500/yr",
    body: "A graduated membership shaped to your relationship with the house — from associate access to full founding privileges. Dues are transparent; the experience is not.",
    icon: "◈",
  },
];

export default function Benefits() {
  return (
    <section id="vision" className="py-24 px-6 bg-[#1C1C1E]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-inter text-[#B8894D] text-sm tracking-[0.25em] uppercase mb-4">
            What We&rsquo;re Building
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#F5F0EB] mb-6">
            A sanctuary, deliberately forged.
          </h2>
          <p className="font-inter text-base text-[#F5F0EB]/65 max-w-2xl mx-auto leading-relaxed">
            Goon is a private members club built on the belief that true luxury
            is belonging. Every detail of the house is shaped to deliver an
            authentic old European aristocratic experience — for those who
            understand the difference.
          </p>
          <div className="gold-divider w-24 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="border border-[#B8894D]/20 bg-[#4B2A2C]/10 p-8 rounded-sm hover:border-[#B8894D]/50 transition-colors duration-300"
            >
              <div className="text-[#B8894D] text-2xl mb-4">{b.icon}</div>
              <h3 className="font-playfair text-lg font-semibold text-[#F5F0EB] mb-3 leading-snug">
                {b.title}
              </h3>
              <p className="font-inter text-sm text-[#F5F0EB]/70 leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
