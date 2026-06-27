const benefits = [
  {
    title: "A Sanctuary Forged for Our Own",
    body: "Membership is extended only to verified gay men and lesbian women of means. The result is a private house where you are surrounded by peers — never a room to explain or defend.",
    icon: "✦",
  },
  {
    title: "Old European Aristocratic Refinement",
    body: "Burgundy velvet, dark wood, polished brass, and cream linen. An atmosphere drawn from the great European houses — quiet, unhurried, and entirely yours.",
    icon: "◆",
  },
  {
    title: "Curated In-Person Services",
    body: "Grooming, spa, table, and lounge — each delivered by practitioners who understand the character of the house and the members it serves.",
    icon: "⬡",
  },
  {
    title: "Absolute Discretion",
    body: "Private entrances, single-use suites, and a strict no-photography policy. What happens inside Goon stays inside Goon — always.",
    icon: "◈",
  },
];

export default function Benefits() {
  return (
    <section id="vision" className="py-24 px-6 bg-[#1C1C1E]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-inter text-[#B8894D] text-sm tracking-[0.25em] uppercase mb-4">
            Our Vision
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
              className="border border-[#B8894D]/20 bg-[#6B1D2F]/10 p-8 rounded-sm hover:border-[#B8894D]/50 transition-colors duration-300"
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
