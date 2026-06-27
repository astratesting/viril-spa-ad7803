import Link from "next/link";
import { ReactNode } from "react";
import { initials } from "@/lib/utils";

interface NavbarProps {
  name: string;
  membershipTier?: string | null;
  isAdmin?: boolean;
}
const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/members", label: "Directory" },
  { href: "/dashboard/bookings", label: "Parlors" },
];

function Icon({ name }: { name: string }): ReactNode {
  const c = {
    fill: "none" as const,
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-6 h-6",
  };
  if (name === "calendar")
    return (
      <svg {...c}>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    );
  if (name === "users")
    return (
      <svg {...c}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2 21c0-3.5 3-5.5 7-5.5s7 2 7 5.5" />
        <path d="M16 5.5a3.5 3.5 0 010 6M22 21c0-3-2-5-5-5.5" />
      </svg>
    );
  if (name === "door")
    return (
      <svg {...c}>
        <path d="M4 21h16M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17" />
        <circle cx="14" cy="12" r="0.5" fill="currentColor" />
      </svg>
    );
  return null;
}

export default function Navbar({ name, membershipTier, isAdmin }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-brass/20 bg-ink/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="font-archivo text-xl text-ivory tracking-tight">
          GOON
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-satoshi text-xs tracking-[0.15em] uppercase text-ivory/70">
            {name}
          </span>
          <span className="w-9 h-9 rounded-full bg-brass/15 border border-brass/40 text-brass flex items-center justify-center font-satoshi text-xs font-bold">
            {initials(name)}
          </span>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              aria-label="Sign out"
              className="text-ivory/40 hover:text-[#C97A7A] transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
