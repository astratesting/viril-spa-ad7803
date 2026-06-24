"use client";

import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";
import Navbar from "@/components/Navbar";

const benefits = [
  {
    name: "Expert Treatments",
    description:
      "Licensed therapists and estheticians delivering massage, facials, waxing, and body treatments tailored to your needs in private, calming suites.",
    icon: "✦",
  },
  {
    name: "Members-Only Access",
    description:
      "An exclusive experience with tiered memberships, priority booking, and founding member pricing for early sign-ups.",
    icon: "◆",
  },
  {
    name: "Community Atmosphere",
    description:
      "A welcoming, judgment-free space built specifically for gay men — where every detail, from ambiance to service protocols, reflects the community it serves.",
    icon: "⬡",
  },
  {
    name: "West Hollywood Location",
    description:
      "Conveniently located on Santa Monica Blvd in the heart of WeHo, designed as a premium destination you'll want to return to.",
    icon: "◈",
  },
];

const faqs = [
  {
    question: "When does Goon open?",
    answer:
      "We're finalizing our space on Santa Monica Blvd in West Hollywood and are targeting a 2026 opening. Join the waitlist to be the first to know the exact date and secure founding member pricing.",
  },
  {
    question: "Is Goon only for gay men?",
    answer:
      "Yes. Goon was built specifically for gay men — a luxury spa experience designed with intention for our community, not adapted from a generic model. Every detail reflects the people we serve.",
  },
  {
    question: "What services will be offered at launch?",
    answer:
      "Massage (deep tissue, Swedish, sports), facials and skincare, waxing, and body treatments (scrubs, wraps, therapies). Our full menu with pricing will be shared with waitlist members before launch.",
  },
  {
    question: "How does membership work?",
    answer:
      "Goon will offer tiered memberships with founding member pricing for early sign-ups. Waitlist members get priority access to founding member rates and booking windows. Specific tiers and pricing will be announced closer to launch.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* What We're Building */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-manrope text-4xl md:text-5xl font-semibold text-white mb-4">
              What We&apos;re Building
            </h2>
            <div className="gold-divider w-20 mx-auto mb-6" />
            <p className="font-source-sans text-muted-text max-w-xl mx-auto">
              A premium spa experience designed exclusively for gay men —
              combining expert treatments with a welcoming community atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.name}
                className="bg-charcoal border border-white/5 rounded-sm p-6 hover:border-gold/30 transition-colors group"
              >
                <span className="text-gold text-3xl mb-4 block group-hover:scale-110 transition-transform">
                  {b.icon}
                </span>
                <h3 className="font-manrope text-xl text-white mb-3">{b.name}</h3>
                <p className="font-source-sans text-sm text-muted-text leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-charcoal">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-manrope text-4xl md:text-5xl font-semibold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="gold-divider w-20 mx-auto mb-6" />
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-rich-black border border-white/5 rounded-sm p-6"
              >
                <h3 className="font-manrope text-lg text-white mb-3">
                  {faq.question}
                </h3>
                <p className="font-source-sans text-sm text-muted-text leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <Waitlist />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-manrope text-gold text-sm tracking-widest">GOON</p>
          <p className="font-source-sans text-xs text-muted-text">
            &copy; {new Date().getFullYear()} Goon. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
