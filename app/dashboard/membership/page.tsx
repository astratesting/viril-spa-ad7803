"use client";

import { useEffect, useState } from "react";

const tiers = [
  {
    id: "essentials",
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
    id: "premium",
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
    id: "elite",
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

export default function MembershipPage() {
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        setCurrentTier(d.user?.membershipTier || null);
        setSelectedTier(d.user?.membershipTier || null);
      });
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 className="font-playfair text-3xl text-white mb-1">Membership</h1>
      <p className="font-inter text-muted-text mb-2">
        Manage your membership tier and billing.
      </p>
      {currentTier && (
        <p className="font-inter text-sm text-gold mb-8">
          Current plan: {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const isCurrent = currentTier === tier.id;
          const isSelected = selectedTier === tier.id;

          return (
            <div
              key={tier.id}
              className={`bg-charcoal border rounded-sm p-6 flex flex-col ${
                isCurrent
                  ? "border-gold gold-glow"
                  : isSelected
                    ? "border-gold/50"
                    : "border-white/5"
              }`}
            >
              {isCurrent && (
                <span className="font-inter text-xs text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-sm w-fit mb-4">
                  Current Plan
                </span>
              )}
              <h3 className="font-playfair text-xl text-white mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="font-inter text-3xl font-semibold text-white">
                  {tier.price}
                </span>
                <span className="font-inter text-muted-text text-sm">{tier.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="font-inter text-sm text-muted-text flex items-start gap-2">
                    <span className="text-gold mt-0.5">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              {!isCurrent && (
                <button
                  onClick={() => setSelectedTier(tier.id)}
                  className={`font-inter text-sm py-2.5 rounded-sm transition-colors ${
                    isSelected
                      ? "bg-gold text-rich-black"
                      : "border border-gold/30 text-gold hover:bg-gold/10"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Plan"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
