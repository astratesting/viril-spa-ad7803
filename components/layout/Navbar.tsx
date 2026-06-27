"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { classNames, initials } from "@/lib/utils";

interface NavbarProps {
  name: string;
  membershipTier?: string | null;
  isAdmin?: boolean;
}

const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/members", label: "Directory" },
  { href: "/parlors", label: "Parlors" },
];

export default function Navbar({ name, membershipTier, isAdmin }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-brass/20 bg-ink/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="font-archivo text-xl text-ivory tracking-tight">
            GOON
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={classNames(
                    "font-satoshi text-xs tracking-[0.2em] uppercase transition-colors",
                    active ? "text-brass" : "text-ivory/60 hover:text-brass"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-3"
            aria-label="Account menu"
          >
            <span className="hidden sm:block font-satoshi text-xs tracking-[0.15em] uppercase text-ivory/70">
              {name}
            </span>
            <span className="w-9 h-9 rounded-full bg-brass/15 border border-brass/40 text-brass flex items-center justify-center font-satoshi text-xs font-bold">
              {initials(name)}
            </span>
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
              <div className="absolute right-0 mt-3 w-56 bg-charcoal-soft border border-brass/30 z-40">
                <div className="px-5 py-4 border-b border-ivory/10">
                  <p className="font-satoshi text-sm text-ivory">{name}</p>
                  {membershipTier && (
                    <p className="font-satoshi text-[11px] tracking-[0.15em] uppercase text-brass mt-1">
                      {membershipTier}
                    </p>
                  )}
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 font-satoshi text-sm text-ivory/70 hover:text-brass hover:bg-ivory/5"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 font-satoshi text-sm text-ivory/70 hover:text-brass hover:bg-ivory/5"
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 font-satoshi text-sm text-ivory/70 hover:text-brass hover:bg-ivory/5"
                  >
                    Admin Panel
                  </Link>
                )}
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full text-left px-5 py-3 font-satoshi text-sm text-ivory/70 hover:text-[#C97A7A] hover:bg-ivory/5 border-t border-ivory/10"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
