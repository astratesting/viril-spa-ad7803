"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "@/lib/utils";

export default function SidebarNav({ nav }: { nav: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 px-3 py-6">
      {nav.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={classNames(
              "block px-4 py-3 font-satoshi text-sm tracking-wide transition-colors border-l-2",
              active
                ? "text-brass border-brass bg-brass/5"
                : "text-ivory/60 border-transparent hover:text-ivory hover:bg-ivory/5"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
