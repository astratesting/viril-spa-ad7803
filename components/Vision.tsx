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

export default function Vision() {
  return (
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
  );
}
