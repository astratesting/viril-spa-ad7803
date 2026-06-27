import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { listAllPayments } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Payment } from "@/types";

const statusTone = (s: string) =>
  s === "completed" ? "green" : s === "refunded" ? "red" : s === "pending" ? "amber" : "muted";

export default async function AdminPaymentsPage() {
  const payments = await listAllPayments();
  const revenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount_cents, 0);

  return (
    <main className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl text-ivory mb-1">Payments</h1>
          <p className="font-satoshi text-sm text-brass">
            Total revenue: {formatCurrency(revenue)}
          </p>
        </div>
        <Link
          href="/admin"
          className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
        >
          ← Dashboard
        </Link>
      </div>
      <Table<Payment>
        empty="No payments recorded."
        columns={[
          {
            key: "tier",
            header: "Tier",
            render: (p) => p.membership_tier,
          },
          {
            key: "amount",
            header: "Amount",
            render: (p) => formatCurrency(p.amount_cents),
          },
          {
            key: "status",
            header: "Status",
            render: (p) => (
              <Badge tone={statusTone(p.status)}>{p.status}</Badge>
            ),
          },
          {
            key: "paid",
            header: "Paid",
            render: (p) => (p.paid_at ? formatDate(p.paid_at) : "—"),
          },
        ]}
        rows={payments}
      />
    </main>
  );
}