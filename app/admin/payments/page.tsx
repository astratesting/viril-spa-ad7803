import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { listAllPayments } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Payment } from "@/types";

const statusTone = (s: string) =>
  s === "completed" ? "green" : s === "refunded" ? "red" : s === "failed" ? "red" : "amber";

export default async function AdminPaymentsPage() {
  const payments = await listAllPayments();

  return (
    <main className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-ivory">Payments</h1>
        <Link
          href="/admin"
          className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
        >
          ← Dashboard
        </Link>
      </div>
      <Table<Payment>
        empty="No payments yet."
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
            key: "date",
            header: "Date",
            render: (p) => (p.paid_at ? formatDate(p.paid_at) : formatDate(p.created_at)),
          },
          {
            key: "status",
            header: "Status",
            render: (p) => <Badge tone={statusTone(p.status)}>{p.status}</Badge>,
          },
        ]}
        rows={payments}
      />
    </main>
  );
}
