"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({ user }: { user?: { name: string; email: string } | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rich-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-playfair text-xl text-gold tracking-widest">
          VIRIL
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="font-inter text-sm text-muted-text hover:text-white transition-colors">
            Services
          </a>
          <a href="#about" className="font-inter text-sm text-muted-text hover:text-white transition-colors">
            About
          </a>
          <a href="#faq" className="font-inter text-sm text-muted-text hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#location" className="font-inter text-sm text-muted-text hover:text-white transition-colors">
            Location
          </a>
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="font-inter text-sm text-gold hover:text-gold-hover transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="font-inter text-sm text-muted-text hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="font-inter text-sm text-muted-text hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="font-inter text-sm bg-gold text-rich-black px-4 py-2 rounded-sm hover:bg-gold-hover transition-colors"
              >
                Join
              </Link>
            </div>
          )}
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
          <a href="#services" onClick={() => setMobileOpen(false)} className="block font-inter text-sm text-muted-text hover:text-white">
            Services
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)} className="block font-inter text-sm text-muted-text hover:text-white">
            About
          </a>
          <a href="#membership" onClick={() => setMobileOpen(false)} className="block font-inter text-sm text-muted-text hover:text-white">
            Membership
          </a>
          <a href="#location" onClick={() => setMobileOpen(false)} className="block font-inter text-sm text-muted-text hover:text-white">
            Location
          </a>
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block font-inter text-sm text-gold">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block font-inter text-sm text-muted-text hover:text-white">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block font-inter text-sm text-muted-text hover:text-white">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="block font-inter text-sm text-gold">
                Join
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
