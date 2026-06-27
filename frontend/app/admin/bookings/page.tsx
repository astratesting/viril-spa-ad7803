import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { listParlors } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import type { Parlor } from "@/types";

export default async function AdminBookingsPage() {
  const parlors = await listParlors();

  return (
    <main className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-ivory">Parlors</h1>
        <Link
          href="/admin"
          className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
        >
          ← Dashboard
        </Link>
      </div>
      <Table<Parlor>
        empty="No parlors configured."
        columns={[
          { key: "name", header: "Name", render: (p) => p.name },
          {
            key: "capacity",
            header: "Capacity",
            render: (p) => String(p.capacity),
          },
          {
            key: "rate",
            header: "Rate",
            render: (p) =>
              p.price_cents ? formatCurrency(p.price_cents) + "/hr" : "—",
          },
          {
            key: "active",
            header: "Status",
            render: (p) => (
              <Badge tone={p.is_active ? "green" : "muted"}>
                {p.is_active ? "Active" : "Inactive"}
              </Badge>
            ),
          },
        ]}
        rows={parlors}
      />
    </main>
  );
}