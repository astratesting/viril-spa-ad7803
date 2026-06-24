"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";
import Navbar from "@/components/Navbar";

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

const faqs = [
  {
    question: "When does VIRIL open?",
    answer:
      "We're currently finalizing our space on Santa Monica Blvd in West Hollywood and are targeting a 2026 opening. Join the waitlist to be the first to know the exact date and secure founding member pricing.",
  },
  {
    question: "Is VIRIL only for gay men?",
    answer:
      "Yes. VIRIL was built specifically for gay men — a luxury spa experience designed with intention for our community, not adapted from a generic model. Every detail, from ambiance to service protocols, reflects the people we serve.",
  },
  {
    question: "What services will be offered at launch?",
    answer:
      "Massage (deep tissue, Swedish, sports), facials and skincare, waxing, and body treatments (scrubs, wraps, therapies). Our full menu with pricing will be shared with waitlist members before launch.",
  },
  {
    question: "How does membership work?",
    answer:
      "VIRIL will offer tiered memberships with founding member pricing for early sign-ups. Waitlist members get priority access to founding member rates and booking windows. Specific tiers and pricing will be announced closer to launch.",
  },
];

export default function HomePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.user && setUser(d.user))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar user={user} />

      {/* Hero */}
      <Hero />

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
              What We&apos;re Building
            </h2>
            <div className="gold-divider w-20 mx-auto mb-6" />
            <p className="font-satoshi text-muted-text max-w-xl mx-auto">
              Every service is designed for comfort, results, and an experience
              that keeps you coming back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.name}
                className="bg-charcoal border border-white/5 rounded-sm p-6 hover:border-gold/30 transition-colors group"
              >
                <span className="text-gold text-3xl mb-4 block group-hover:scale-110 transition-transform">
                  {s.icon}
                </span>
                <h3 className="font-playfair text-xl text-white mb-3">{s.name}</h3>
                <p className="font-satoshi text-sm text-muted-text leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
            About VIRIL
          </h2>
          <div className="gold-divider w-20 mx-auto mb-8" />
          <p className="font-satoshi text-lg text-muted-text leading-relaxed mb-8">
            VIRIL was born from a simple idea: the gay men of West Hollywood deserve
            a luxury spa experience built specifically for them. Not an afterthought.
            Not a &ldquo;gender-neutral&rdquo; space that ignores the difference.
            A space designed with intention &mdash; where every detail, from the
            ambiance to the service protocols, reflects the community it serves.
          </p>
          <p className="font-satoshi text-lg text-muted-text leading-relaxed">
            We are committed to providing an affirming, judgment-free environment
            where you can relax, recharge, and feel at home. VIRIL is more than a
            spa &mdash; it&apos;s a statement that luxury and identity belong together.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="gold-divider w-20 mx-auto mb-6" />
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-charcoal border border-white/5 rounded-sm p-6"
              >
                <h3 className="font-playfair text-lg text-white mb-3">
                  {faq.question}
                </h3>
                <p className="font-satoshi text-sm text-muted-text leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <Waitlist />

      {/* Contact / Location */}
      <section id="location" className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
            Visit Us
          </h2>
          <div className="gold-divider w-20 mx-auto mb-8" />
          <p className="font-satoshi text-lg text-muted-text mb-2">
            West Hollywood, CA
          </p>
          <p className="font-inter text-sm text-muted-text mb-8">
            Exact address to be announced at launch. We&apos;re finalizing our space on
            Santa Monica Blvd in the heart of WeHo.
          </p>

          <div className="bg-charcoal border border-white/10 rounded-sm p-8 max-w-lg mx-auto">
            <h3 className="font-playfair text-xl text-white mb-4">Get in Touch</h3>
            <a
              href="mailto:hello@virilspa.com"
              className="font-inter text-gold hover:text-gold-hover transition-colors text-lg"
            >
              hello@virilspa.com
            </a>
            <div className="mt-6 flex items-center justify-center gap-6">
              <a href="#" className="text-muted-text hover:text-white transition-colors text-sm font-inter">
                Instagram
              </a>
              <a href="#" className="text-muted-text hover:text-white transition-colors text-sm font-inter">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-playfair text-gold text-sm tracking-widest">VIRIL</p>
          <p className="font-inter text-xs text-muted-text">
            &copy; {new Date().getFullYear()} VIRIL Spa. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
