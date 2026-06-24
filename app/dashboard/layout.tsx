"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  membershipTier: string | null;
  waitlistPosition: number;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) {
          router.push("/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <div className="text-gold font-inter text-sm animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { label: "Overview", href: "/dashboard" },
    { label: "My Bookings", href: "/dashboard/bookings" },
    { label: "Membership", href: "/dashboard/membership" },
    { label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-rich-black flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-charcoal border-r border-white/5 flex-col">
        <div className="px-6 py-5 border-b border-white/5">
          <Link href="/" className="font-playfair text-xl text-gold tracking-widest">
            VIRIL
          </Link>
        </div>

        <div className="px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-inter text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-inter text-sm text-white">{user.name}</p>
              <p className="font-inter text-xs text-muted-text">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-inter text-sm text-muted-text hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full font-inter text-sm text-muted-text hover:text-white px-3 py-2.5 text-left rounded-sm hover:bg-white/5 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-6 h-14 bg-charcoal border-b border-white/5">
          <Link href="/" className="font-playfair text-lg text-gold tracking-widest">
            VIRIL
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="font-inter text-sm text-muted-text">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="font-inter text-sm text-muted-text">
              Sign Out
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
