import { ReactNode } from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";
import { redirect } from "next/navigation";
import { initials } from "@/lib/utils";
import SidebarNav from "@/components/layout/SidebarNav";

const NAV = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/directory", label: "Directory" },
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/bookings", label: "Parlors" },
  { href: "/dashboard/payments", label: "Payments" },
  { href: "/dashboard/forum", label: "Forum" },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/dashboard");
  const user = await findUserById(session.userId);
  if (!user) redirect("/login");
  if (user.role === "pending_payment") redirect("/payment");

  const nav = [...NAV];
  if (user.role === "admin") nav.push({ href: "/admin", label: "Admin" });

  return (
    <div className="min-h-screen bg-ink flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-[240px] md:shrink-0 md:flex-col md:border-r md:border-brass/20 md:bg-charcoal md:sticky md:top-0 md:h-screen">
        <div className="px-6 py-6 border-b border-brass/15">
          <Link href="/dashboard" className="font-archivo text-xl text-ivory">
            GOON
          </Link>
          <p className="mt-1 font-satoshi text-[10px] tracking-[0.25em] uppercase text-ivory/40 truncate">
            {user.name}
          </p>
        </div>
        <SidebarNav nav={nav} />
        <form action="/api/auth/logout" method="POST" className="px-3 mt-2">
          <button
            type="submit"
            className="w-full text-left px-4 py-3 font-satoshi text-sm tracking-wide text-ivory/40 hover:text-[#C97A7A] transition-colors"
          >
            Sign Out
          </button>
        </form>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between border-b border-brass/20 bg-charcoal px-5 py-4 sticky top-0 z-30">
          <Link href="/dashboard" className="font-archivo text-xl text-ivory">
            GOON
          </Link>
          <Link href="/dashboard/profile">
            <span className="w-9 h-9 rounded-full bg-brass/15 border border-brass/40 text-brass flex items-center justify-center font-satoshi text-xs font-bold">
              {initials(user.name)}
            </span>
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}