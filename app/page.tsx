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
    highlighted: true,
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
    ],
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
              Our Services
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

      {/* Membership */}
      <section id="membership" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
              Membership
            </h2>
            <div className="gold-divider w-20 mx-auto mb-6" />
            <p className="font-satoshi text-muted-text max-w-xl mx-auto">
              Join as a founding member and lock in exclusive early-access pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-charcoal border rounded-sm p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-gold gold-glow"
                    : "border-white/5"
                }`}
              >
                {tier.highlighted && (
                  <span className="font-inter text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-sm w-fit mb-4 uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="font-playfair text-2xl text-white mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="font-inter text-4xl font-semibold text-white">
                    {tier.price}
                  </span>
                  <span className="font-inter text-muted-text">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="font-satoshi text-sm text-muted-text flex items-start gap-2">
                      <span className="text-gold mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`font-satoshi text-sm text-center py-3 rounded-sm transition-colors ${
                    tier.highlighted
                      ? "bg-gold text-rich-black hover:bg-gold-hover"
                      : "border border-gold/30 text-gold hover:bg-gold/10"
                  }`}
                >
                  Join Waitlist
                </a>
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
