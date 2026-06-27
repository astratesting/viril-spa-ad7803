const benefits = [
  {
    title: "A Verified Community",
    body: "Membership is extended only to verified lesbian women and gay men. The result is a private house where you are surrounded by peers — never a venue to explain or defend.",
    icon: "✦",
  },
  {
    title: "Salon & Spa, Together",
    body: "Cut, color, and barbering beside massage, facials, and body therapies — all under one roof, all delivered by licensed practitioners who understand our members.",
    icon: "◆",
  },
  {
    title: "Old-World Refinement",
    body: "Burgundy velvet, dark wood, polished brass, and cream linen. An atmosphere drawn from the great European houses — quiet, unhurried, and unhurriedly yours.",
    icon: "⬡",
  },
  {
    title: "Absolute Discretion",
    body: "Private entrances, single-use suites, and a strict no-photography policy. What happens inside Goon stays inside Goon, always.",
    icon: "◈",
  },
  {
    title: "Membership with Intent",
    body: "Founded on the belief that a sanctuary must be earned, not bought. Invitation and verification protect the character of the house.",
    icon: "✶",
  },
  {
    title: "A House, Not a Chain",
    body: "One location, one community, one standard. Every member is known by name and greeted as such.",
    icon: "❖",
  },
];

export default function Benefits() {
  return (
    <section id="building" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-inter text-[#C8A45C] text-sm tracking-widest uppercase mb-4">
            What We&apos;re Building
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#F5F0E8] mb-6">
            A sanctuary, deliberately small.
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="border border-[#C8A45C]/15 bg-[#3E2723]/30 p-8 rounded-sm hover:border-[#C8A45C]/40 transition-colors duration-300"
            >
              <div className="text-[#C8A45C] text-2xl mb-4">{b.icon}</div>
              <h3 className="font-playfair text-xl font-semibold text-[#F5F0E8] mb-3">
                {b.title}
              </h3>
              <p className="font-inter text-sm text-[#F5F0E8]/70 leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
