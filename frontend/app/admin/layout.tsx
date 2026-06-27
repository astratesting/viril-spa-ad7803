import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";
import { listApplications } from "@/lib/db";
import { initials } from "@/lib/utils";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/bookings", label: "Parlors" },
  { href: "/admin/payments", label: "Payments" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/admin");
  const user = await findUserById(session.userId);
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const pending = await listApplications("pending");

  return (
    <div className="min-h-screen bg-ink flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-[240px] md:shrink-0 md:flex-col md:border-r md:border-brass/20 md:bg-charcoal md:sticky md:top-0 md:h-screen">
        <div className="px-6 py-6 border-b border-brass/15">
          <Link href="/admin" className="font-archivo text-xl text-ivory">
            GOON
          </Link>
          <p className="mt-1 font-satoshi text-[10px] tracking-[0.25em] uppercase text-ivory/40">
            Admin
          </p>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-6">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 font-satoshi text-sm tracking-wide transition-colors border-l-2 ${
                item.href === "/admin/applications"
                  ? "text-brass border-brass bg-brass/5"
                  : "text-ivory/60 border-transparent hover:text-ivory hover:bg-ivory/5"
              }`}
            >
              {item.label}
              {item.href === "/admin/applications" && pending.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brass/20 text-brass text-[10px]">
                  {pending.length}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-3 pb-4">
          <Link
            href="/dashboard"
            className="block px-4 py-3 font-satoshi text-sm tracking-wide text-ivory/40 hover:text-brass transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <form action="/api/auth/logout" method="POST" className="px-1">
            <button
              type="submit"
              className="w-full text-left px-4 py-3 font-satoshi text-sm tracking-wide text-ivory/40 hover:text-[#C97A7A] transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between border-b border-brass/20 bg-charcoal px-5 py-4 sticky top-0 z-30">
          <Link href="/admin" className="font-archivo text-xl text-ivory">
            GOON
          </Link>
          <span className="font-satoshi text-xs uppercase text-ivory/60">
            Admin
          </span>
        </header>
        {children}
      </div>
    </div>
  );
}