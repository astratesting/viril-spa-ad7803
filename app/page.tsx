"use client";

import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";
import Navbar from "@/components/Navbar";

const benefits = [
  {
    name: "Bespoke Treatments",
    description:
      "Massages, facials, body treatments, waxing, and grooming — performed by licensed therapists and estheticians in private suites, tailored to each member.",
    icon: "✦",
  },
  {
    name: "Identity-Verified Safe Space",
    description:
      "Membership is identity-verified, ensuring Goon remains a genuinely safe sanctuary for lesbian and gay men — not an afterthought, but the foundation.",
    icon: "◆",
  },
  {
    name: "A Community of One's Own",
    description:
      "A private members' club atmosphere where every detail — from ambiance to service protocols — reflects the community it was built to serve.",
    icon: "⬡",
  },
  {
    name: "Old-World European Luxury",
    description:
      "An aesthetic drawn from old European aristocratic refinement: deep charcoal, muted brass, and the quiet formality of a private salon in the heart of West Hollywood.",
    icon: "◈",
  },
];

const faqs = [
  {
    question: "When and where will Goon open?",
    answer:
      "Goon is currently in pre-launch development. We are finalizing a location in West Hollywood and targeting a 2026 opening. The exact address and launch date will be shared with waitlist members before public announcement.",
  },
  {
    question: "Who is Goon for?",
    answer:
      "Goon is a members-only spa and salon exclusively for lesbian and gay men. Membership is identity-verified to preserve the sanctuary we are building. This is not a generic spa adapted for our community — it was designed for it from the start.",
  },
  {
    question: "How does identity verification work?",
    answer:
      "All prospective members complete an identity-verification step before membership is granted. We are finalizing the verification process and will share specifics with waitlist members ahead of launch. The goal is straightforward: keep Goon a genuinely safe space for the people it serves.",
  },
  {
    question: "What membership tiers will be available?",
    answer:
      "Membership will be tiered, with founding member access offered to early waitlist sign-ups. Specific tiers, pricing, and benefits will be announced closer to launch. Joining the waitlist now places you first in line for founding member consideration — there is no payment or commitment required to join.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* What We're Building */}
      <section id="services" className="py-24 px-6 bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="font-inter text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "#C5A55A" }}
            >
              What We&apos;re Building
            </p>
            <h2
              className="font-playfair text-4xl md:text-5xl font-semibold mb-4"
              style={{ color: "#F5F0EB" }}
            >
              A Sanctuary, Built With Intention
            </h2>
            <div
              className="w-20 mx-auto mb-6"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, #C5A55A, transparent)",
              }}
            />
            <p
              className="font-inter max-w-xl mx-auto"
              style={{ color: "rgba(245, 240, 235, 0.7)" }}
            >
              A premium spa and salon designed exclusively for lesbian and gay
              men — combining bespoke treatments with a verified, community-rooted
              atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.name}
                className="border rounded-sm p-6 transition-colors group"
                style={{
                  background: "#1C1C1E",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(197, 165, 90, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255, 255, 255, 0.06)";
                }}
              >
                <span
                  className="text-3xl mb-4 block group-hover:scale-110 transition-transform"
                  style={{ color: "#C5A55A" }}
                >
                  {b.icon}
                </span>
                <h3
                  className="font-playfair text-xl mb-3"
                  style={{ color: "#F5F0EB" }}
                >
                  {b.name}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: "rgba(245, 240, 235, 0.65)" }}
                >
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-[#1C1C1E]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="font-inter text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "#C5A55A" }}
            >
              Questions
            </p>
            <h2
              className="font-playfair text-4xl md:text-5xl font-semibold mb-4"
              style={{ color: "#F5F0EB" }}
            >
              Frequently Asked Questions
            </h2>
            <div
              className="w-20 mx-auto mb-6"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, #C5A55A, transparent)",
              }}
            />
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border rounded-sm p-6"
                style={{
                  background: "#0A0A0B",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <h3
                  className="font-playfair text-lg mb-3"
                  style={{ color: "#F5F0EB" }}
                >
                  {faq.question}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: "rgba(245, 240, 235, 0.65)" }}
                >
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
      <footer
        className="py-8 px-6 border-t"
        style={{
          background: "#0A0A0B",
          borderColor: "rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-playfair text-sm tracking-[0.25em]"
            style={{ color: "#C5A55A" }}
          >
            GOON
          </p>
          <p
            className="font-inter text-xs"
            style={{ color: "rgba(245, 240, 235, 0.5)" }}
          >
            &copy; {new Date().getFullYear()} Goon. West Hollywood. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
