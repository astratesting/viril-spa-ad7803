"use client";

import { useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
  membershipTier: string | null;
  waitlistPosition: number;
}

const upcomingBookings = [
  {
    id: 1,
    service: "Deep Tissue Massage",
    therapist: "Marcus R.",
    date: "2026-07-02",
    time: "2:00 PM",
    duration: "60 min",
    status: "confirmed",
  },
  {
    id: 2,
    service: "Signature Facial",
    therapist: "James L.",
    date: "2026-07-09",
    time: "11:00 AM",
    duration: "45 min",
    status: "confirmed",
  },
  {
    id: 3,
    service: "Full Body Waxing",
    therapist: "Staff",
    date: "2026-07-16",
    time: "3:30 PM",
    duration: "30 min",
    status: "pending",
  },
];

const recentActivity = [
  { action: "Booked Deep Tissue Massage", date: "Jun 20, 2026" },
  { action: "Membership renewed — Premium", date: "Jun 15, 2026" },
  { action: "Booked Signature Facial", date: "Jun 10, 2026" },
  { action: "Account created", date: "Jan 15, 2026" },
];

const availableServices = [
  { name: "Swedish Massage", duration: "60 min", price: "$120" },
  { name: "Deep Tissue Massage", duration: "60 min", price: "$140" },
  { name: "Hot Stone Massage", duration: "75 min", price: "$165" },
  { name: "Signature Facial", duration: "45 min", price: "$95" },
  { name: "Anti-Aging Facial", duration: "60 min", price: "$135" },
  { name: "Full Body Waxing", duration: "30 min", price: "$85" },
  { name: "Detox Body Wrap", duration: "60 min", price: "$150" },
  { name: "Exfoliating Scrub", duration: "45 min", price: "$110" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, []);

  if (!user) return null;

  const tierLabel =
    user.membershipTier === "elite"
      ? "Elite"
      : user.membershipTier === "premium"
        ? "Premium"
        : user.membershipTier === "essentials"
          ? "Essentials"
          : "Waitlisted";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="font-playfair text-3xl text-white mb-1">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="font-inter text-muted-text">
          Here&apos;s your member overview for VIRIL Spa.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal border border-white/5 rounded-sm p-5">
          <p className="font-inter text-xs text-muted-text uppercase tracking-wider mb-1">
            Membership
          </p>
          <p className="font-inter text-2xl font-semibold text-gold">{tierLabel}</p>
        </div>
        <div className="bg-charcoal border border-white/5 rounded-sm p-5">
          <p className="font-inter text-xs text-muted-text uppercase tracking-wider mb-1">
            Upcoming Visits
          </p>
          <p className="font-inter text-2xl font-semibold text-white">3</p>
        </div>
        <div className="bg-charcoal border border-white/5 rounded-sm p-5">
          <p className="font-inter text-xs text-muted-text uppercase tracking-wider mb-1">
            Waitlist Position
          </p>
          <p className="font-inter text-2xl font-semibold text-white">
            #{user.waitlistPosition}
          </p>
        </div>
        <div className="bg-charcoal border border-white/5 rounded-sm p-5">
          <p className="font-inter text-xs text-muted-text uppercase tracking-wider mb-1">
            Total Visits
          </p>
          <p className="font-inter text-2xl font-semibold text-white">12</p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div>
        <h2 className="font-playfair text-xl text-white mb-4">Upcoming Bookings</h2>
        <div className="space-y-3">
          {upcomingBookings.map((b) => (
            <div
              key={b.id}
              className="bg-charcoal border border-white/5 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <p className="font-inter text-white font-medium">{b.service}</p>
                <p className="font-inter text-sm text-muted-text">
                  {b.therapist} &middot; {b.duration}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-inter text-sm text-muted-text">
                  {new Date(b.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  at {b.time}
                </span>
                <span
                  className={`font-inter text-xs px-2.5 py-1 rounded-sm ${
                    b.status === "confirmed"
                      ? "bg-acid-green/10 text-acid-green border border-acid-green/20"
                      : "bg-gold/10 text-gold border border-gold/20"
                  }`}
                >
                  {b.status === "confirmed" ? "Confirmed" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: Services + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Services */}
        <div>
          <h2 className="font-playfair text-xl text-white mb-4">Services Menu</h2>
          <div className="bg-charcoal border border-white/5 rounded-sm divide-y divide-white/5">
            {availableServices.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-inter text-sm text-white">{s.name}</p>
                  <p className="font-inter text-xs text-muted-text">{s.duration}</p>
                </div>
                <p className="font-inter text-sm text-gold font-medium">{s.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="font-playfair text-xl text-white mb-4">Recent Activity</h2>
          <div className="bg-charcoal border border-white/5 rounded-sm divide-y divide-white/5">
            {recentActivity.map((a, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <p className="font-inter text-sm text-white">{a.action}</p>
                <p className="font-inter text-xs text-muted-text whitespace-nowrap ml-4">
                  {a.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
