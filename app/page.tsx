import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";

const services = [
  {
    name: "Massage",
    description:
      "From deep tissue to Swedish relaxation, our licensed therapists deliver sessions tailored to release tension and restore balance. Every treatment is performed in a private, calming suite.",
    icon: "✦",
  },
  {
    name: "Facials",
    description:
      "Advanced skincare treatments using premium products to cleanse, hydrate, and rejuvenate. Customized protocols for every skin type, delivered by trained estheticians.",
    icon: "◆",
  },
  {
    name: "Waxing",
    description:
      "Precision waxing services in a comfortable, judgment-free setting. We use high-quality, gentle products for smooth, lasting results.",
    icon: "⬡",
  },
  {
    name: "Body Treatments",
    description:
      "Exfoliating scrubs, detox wraps, and hydrating body therapies designed to refresh your skin and elevate your sense of well-being from head to toe.",
    icon: "◈",
  },
];

const tiers = [
  {
    name: "Essentials",
    price: "$149",
    period: "/mo",
    features: [
      "Access to all spa facilities",
      "One 60-minute service per month",
      "Complimentary refreshments",
      "Locker and towel service",
    ],
  },
  {
    name: "Premium",
    price: "$249",
    period: "/mo",
    features: [
      "Everything in Essentials",
      "Two 60-minute services per month",
      "Priority booking window",
      "Guest pass (1 per month)",
      "Access to member events",
    ],
  },
  {
    name: "Elite",
    price: "$399",
    period: "/mo",
    features: [
      "Everything in Premium",
      "Unlimited 60-minute services",
      "Same-day booking guaranteed",
      "Two guest passes per month",
      "Exclusive quarterly experiences",
      "Complimentary product samples",
    ],
  },
];

const faqs = [
  {
    q: "When does VIRIL open?",
    a: "We're currently in the final stages of development and plan to open our doors in late 2026. Waitlist members will receive early access invitations before the public launch.",
  },
  {
    q: "Is VIRIL only for gay men?",
    a: "VIRIL is designed specifically for gay men and the queer community. Our space, staff training, and services are all crafted with that community in mind. Everyone who respects and affirms our community is welcome.",
  },
  {
    q: "What is the membership model?",
    a: "VIRIL operates on a members-only basis to maintain an intimate, premium experience. Memberships are month-to-month with no long-term commitment required. Founding member pricing will be available to early waitlist signups.",
  },
  {
    q: "Where exactly in West Hollywood?",
    a: "We've secured a prime location in the heart of WeHo. The exact address will be revealed to waitlist members ahead of our public announcement. Expect a sleek, discreet storefront on one of the neighborhood's most walkable streets.",
  },
];

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className="bg-charcoal border border-white/5 rounded-sm p-8 hover:border-gold/20 transition-colors duration-300">
      <span className="text-gold text-2xl mb-4 block">{service.icon}</span>
      <h3 className="font-playfair text-xl font-semibold text-white mb-3">
        {service.name}
      </h3>
      <p className="font-inter text-muted-text text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

function PricingCard({ tier }: { tier: (typeof tiers)[0] }) {
  return (
    <div className="bg-charcoal border border-white/5 rounded-sm p-8 flex flex-col hover:border-gold/20 transition-colors duration-300">
      <h3 className="font-playfair text-xl font-semibold text-white mb-2">
        {tier.name}
      </h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-inter text-4xl font-bold text-gold">
          {tier.price}
        </span>
        <span className="font-inter text-muted-text text-sm">{tier.period}</span>
      </div>
      <ul className="space-y-3 flex-1">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-muted-text text-sm font-inter"
          >
            <span className="text-gold mt-0.5">✦</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-rich-black min-h-screen">
      <Hero />

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-white mb-4">
            Services
          </h2>
          <p className="font-inter text-muted-text text-center max-w-lg mx-auto mb-16">
            A curated menu of treatments designed for the modern man. Every
            service is delivered with precision, discretion, and care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider max-w-6xl mx-auto" />

      {/* Membership */}
      <section id="membership" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-white mb-4">
            Membership
          </h2>
          <p className="font-inter text-muted-text text-center max-w-lg mx-auto mb-16">
            Three tiers, each designed around how often you want to unwind.
            Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <PricingCard key={t.name} tier={t} />
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider max-w-6xl mx-auto" />

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-8">
            Our Mission
          </h2>
          <p className="font-inter text-muted-text text-lg leading-relaxed mb-6">
            VIRIL was founded on a simple belief: gay men deserve a luxury
            wellness space that truly understands them. Not an afterthought in a
            generic spa — a space built from the ground up with our community at
            its center.
          </p>
          <p className="font-inter text-muted-text text-lg leading-relaxed">
            Every detail — from our trained, affirming staff to our
            thoughtfully designed interiors — is crafted to make you feel seen,
            valued, and completely at ease. This is your space.
          </p>
        </div>
      </section>

      <div className="gold-divider max-w-6xl mx-auto" />

      {/* Location */}
      <section id="location" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-6">
            West Hollywood
          </h2>
          <p className="font-inter text-muted-text text-lg leading-relaxed mb-8">
            Nestled in the heart of WeHo — the cultural epicenter of queer Los
            Angeles. Our flagship location offers a discreet, street-level
            entrance and a sanctuary within.
          </p>
          <div className="inline-flex items-center gap-3 border border-white/10 rounded-sm px-6 py-3 bg-charcoal">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-inter text-muted-text text-sm">
              Exact address revealed to waitlist members before public launch
            </span>
          </div>
        </div>
      </section>

      <div className="gold-divider max-w-6xl mx-auto" />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-white mb-16">
            FAQ
          </h2>
          <div className="space-y-6">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="bg-charcoal border border-white/5 rounded-sm p-6"
              >
                <h3 className="font-playfair text-lg font-semibold text-white mb-3">
                  {item.q}
                </h3>
                <p className="font-inter text-muted-text text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider max-w-6xl mx-auto" />

      {/* Waitlist */}
      <Waitlist />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-playfair text-xl text-gold tracking-widest">
            VIRIL
          </span>
          <p className="font-inter text-muted-text text-sm">
            &copy; {new Date().getFullYear()} VIRIL Spa. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
