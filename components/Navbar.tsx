"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rich-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-manrope text-xl text-gold tracking-widest">
          GOON
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="font-manrope text-sm text-muted-text hover:text-white transition-colors">
            What We&apos;re Building
          </a>
          <a href="#faq" className="font-manrope text-sm text-muted-text hover:text-white transition-colors">
            FAQ
          </a>
          <a
            href="#waitlist"
            className="font-manrope text-sm bg-gold text-rich-black px-4 py-2 rounded-sm hover:bg-gold-hover transition-colors"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
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
        <div className="md:hidden bg-charcoal border-t border-white/5 px-6 py-4 space-y-3">
          <a href="#services" onClick={() => setMobileOpen(false)} className="block font-manrope text-sm text-muted-text hover:text-white">
            What We&apos;re Building
          </a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block font-manrope text-sm text-muted-text hover:text-white">
            FAQ
          </a>
          <a href="#waitlist" onClick={() => setMobileOpen(false)} className="block font-manrope text-sm text-gold hover:text-gold-hover">
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}
