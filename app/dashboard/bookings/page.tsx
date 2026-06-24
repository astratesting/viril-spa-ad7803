"use client";

import { useState } from "react";

const initialBookings = [
  {
    id: 1,
    service: "Deep Tissue Massage",
    therapist: "Marcus R.",
    date: "2026-07-02",
    time: "2:00 PM",
    duration: "60 min",
    status: "confirmed",
    price: "$140",
  },
  {
    id: 2,
    service: "Signature Facial",
    therapist: "James L.",
    date: "2026-07-09",
    time: "11:00 AM",
    duration: "45 min",
    status: "confirmed",
    price: "$95",
  },
  {
    id: 3,
    service: "Full Body Waxing",
    therapist: "Staff",
    date: "2026-07-16",
    time: "3:30 PM",
    duration: "30 min",
    status: "pending",
    price: "$85",
  },
];

const pastBookings = [
  {
    id: 10,
    service: "Hot Stone Massage",
    therapist: "Marcus R.",
    date: "2026-06-18",
    time: "1:00 PM",
    duration: "75 min",
    status: "completed",
    price: "$165",
  },
  {
    id: 11,
    service: "Detox Body Wrap",
    therapist: "Staff",
    date: "2026-06-04",
    time: "4:00 PM",
    duration: "60 min",
    status: "completed",
    price: "$150",
  },
  {
    id: 12,
    service: "Swedish Massage",
    therapist: "Marcus R.",
    date: "2026-05-20",
    time: "10:30 AM",
    duration: "60 min",
    status: "completed",
    price: "$120",
  },
  {
    id: 13,
    service: "Signature Facial",
    therapist: "James L.",
    date: "2026-05-05",
    time: "2:30 PM",
    duration: "45 min",
    status: "completed",
    price: "$95",
  },
];

export default function BookingsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const bookings = tab === "upcoming" ? initialBookings : pastBookings;

  return (
    <div className="animate-fade-in">
      <h1 className="font-playfair text-3xl text-white mb-1">My Bookings</h1>
      <p className="font-inter text-muted-text mb-6">
        View and manage your upcoming and past appointments.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-charcoal rounded-sm p-1 mb-6 w-fit">
        <button
          onClick={() => setTab("upcoming")}
          className={`font-inter text-sm px-5 py-2 rounded-sm transition-colors ${
            tab === "upcoming"
              ? "bg-gold text-rich-black"
              : "text-muted-text hover:text-white"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setTab("past")}
          className={`font-inter text-sm px-5 py-2 rounded-sm transition-colors ${
            tab === "past"
              ? "bg-gold text-rich-black"
              : "text-muted-text hover:text-white"
          }`}
        >
          Past
        </button>
      </div>

      {/* Bookings list */}
      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-charcoal border border-white/5 rounded-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
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
                  year: "numeric",
                })}{" "}
                at {b.time}
              </span>
              <span className="font-inter text-sm text-gold font-medium">{b.price}</span>
              <span
                className={`font-inter text-xs px-2.5 py-1 rounded-sm ${
                  b.status === "confirmed"
                    ? "bg-acid-green/10 text-acid-green border border-acid-green/20"
                    : b.status === "completed"
                      ? "bg-white/5 text-muted-text border border-white/10"
                      : "bg-gold/10 text-gold border border-gold/20"
                }`}
              >
                {b.status === "confirmed"
                  ? "Confirmed"
                  : b.status === "completed"
                    ? "Completed"
                    : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
