"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        background: "rgba(10, 10, 11, 0.85)",
        borderColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-playfair text-xl tracking-[0.25em]"
          style={{ color: "#C5A55A" }}
        >
          GOON
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="font-inter text-sm transition-colors"
            style={{ color: "rgba(245, 240, 235, 0.7)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#F5F0EB";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(245, 240, 235, 0.7)";
            }}
          >
            What We&apos;re Building
          </a>
          <a
            href="#faq"
            className="font-inter text-sm transition-colors"
            style={{ color: "rgba(245, 240, 235, 0.7)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#F5F0EB";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(245, 240, 235, 0.7)";
            }}
          >
            FAQ
          </a>
          <a
            href="#waitlist"
            className="font-inter text-sm px-4 py-2 rounded-sm transition-colors"
            style={{ background: "#C5A55A", color: "#0A0A0B" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#D4A574";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#C5A55A";
            }}
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ color: "#F5F0EB" }}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{
            background: "#1C1C1E",
            borderColor: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="font-inter text-sm"
            style={{ color: "rgba(245, 240, 235, 0.85)" }}
          >
            What We&apos;re Building
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="font-inter text-sm"
            style={{ color: "rgba(245, 240, 235, 0.85)" }}
          >
            FAQ
          </a>
          <a
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            className="font-inter text-sm px-4 py-2 rounded-sm text-center"
            style={{ background: "#C5A55A", color: "#0A0A0B" }}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}
