export default function Manifesto() {
  return (
    <section id="manifesto" className="relative py-28 px-6 bg-ink border-t border-ink-line">
      <div className="max-w-4xl mx-auto">
        <p className="font-satoshi text-flame text-xs tracking-[0.3em] uppercase mb-6">
          Manifesto
        </p>
        <h2 className="font-archivo text-5xl md:text-7xl uppercase leading-[0.95] mb-10 text-bone">
          The New
          <br />
          <span className="text-flame-gradient">Aristocracy</span>
        </h2>
        <div className="salon-divider w-32 mb-10" />

        <div className="space-y-6 font-satoshi text-lg md:text-xl text-bone/75 leading-relaxed">
          <p>
            Wealth built the ballrooms. We were never meant to be kept out of
            them — only kept apart. GOON reclaims the salon: the intimate room
            where power, taste, and deviation gather behind a closed door.
          </p>
          <p>
            This is not a bar. Not a brand. Not a network. It is a high-society
            house for queer people who already have everything and want
            somewhere honest to put it — old European luxury, candlelit
            discretion, and the company of equals.
          </p>
          <p className="text-bone">
            Aristocratic in manner. Subversive in nature. Members only, by
            design. The salon was once the most dangerous room in Europe. We
            are bringing it back.
          </p>
        </div>
      </div>
    </section>
  );
}
