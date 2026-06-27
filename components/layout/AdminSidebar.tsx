"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { classNames } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/applications", label: "Applications", icon: "inbox" },
  { href: "/admin/members", label: "Members", icon: "users" },
  { href: "/admin/events", label: "Events", icon: "calendar" },
  { href: "/admin/parlors", label: "Parlors", icon: "door" },
  { href: "/admin/payments", label: "Payments", icon: "card" },
];

function Icon({ name }: { name: string }) {
  const c = {
    fill: "none" as const,
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-5 h-5",
  };
  switch (name) {
    case "grid":
      return (
        <svg {...c}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...c}>
          <path d="M3 13l3-9h12l3 9v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z" />
          <path d="M3 13h6l1 2h4l1-2h6" />
        </svg>
      );
    case "users":
      return (
        <svg {...c}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2 21c0-3.5 3-5.5 7-5.5s7 2 7 5.5" />
          <path d="M16 5.5a3.5 3.5 0 010 6M22 21c0-3-2-5-5-5.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...c}>
          <rect x="3" y="5" width="18" height="16" rx="1" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "door":
      return (
        <svg {...c}>
          <path d="M4 21h16M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17" />
          <circle cx="14" cy="12" r="0.5" fill="currentColor" />
        </svg>
      );
    case "card":
      return (
        <svg {...c}>
          <rect x="2" y="5" width="20" height="14" rx="1" />
          <path d="M2 10h20M6 15h4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AdminSidebar({
  pendingCount = 0,
}: {
  pendingCount?: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1 px-3 py-6">
      {items.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={classNames(
              "flex items-center gap-3 px-4 py-3 font-satoshi text-sm tracking-wide transition-colors border-l-2",
              active
                ? "text-brass border-brass bg-brass/5"
                : "text-ivory/60 border-transparent hover:text-ivory hover:bg-ivory/5"
            )}
          >
            <Icon name={item.icon} />
            <span className="flex-1">{item.label}</span>
            {item.href === "/admin/applications" && pendingCount > 0 && (
              <span className="bg-brass text-ink text-[10px] font-bold px-2 py-0.5">
                {pendingCount}
              </span>
            )}
          </Link>
        );
      })}
      <form action="/api/auth/logout" method="POST" className="mt-2">
        <button
          type="submit"
          className="w-full flex items-center gap-3 px-4 py-3 font-satoshi text-sm tracking-wide text-ivory/40 border-l-2 border-transparent hover:text-[#C97A7A] transition-colors"
        >
          <svg {...{
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "w-5 h-5",
          }}>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Sign Out
        </button>
      </form>
    </nav>
  );

  return (
    <>
      <div className="md:hidden flex items-center justify-between border-b border-brass/20 bg-charcoal px-5 py-4 sticky top-0 z-30">
        <Link href="/admin" className="font-archivo text-xl text-ivory">
          GOON <span className="text-brass text-xs tracking-[0.2em]">ADMIN</span>
        </Link>
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
          className="text-brass p-2"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <aside className="hidden md:flex md:w-[240px] md:shrink-0 md:flex-col md:border-r md:border-brass/20 md:bg-ink md:sticky md:top-0 md:h-screen">
        <div className="px-6 py-6 border-b border-brass/15">
          <Link href="/admin" className="font-archivo text-xl text-ivory">
            GOON
          </Link>
          <p className="mt-1 font-satoshi text-[10px] tracking-[0.25em] uppercase text-brass">
            House Steward
          </p>
        </div>
        {nav}
      </aside>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-ink/80" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-charcoal border-r border-brass/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-6 border-b border-brass/15">
              <p className="font-archivo text-xl text-ivory">GOON</p>
            </div>
            {nav}
          </div>
        </div>
      )}
    </>
  );
}
