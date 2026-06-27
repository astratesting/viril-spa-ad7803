import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import {
  listApplications,
  listAllUsers,
  listAllPayments,
  listEvents,
} from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [applications, users, payments, events] = await Promise.all([
    listApplications("pending"),
    listAllUsers(),
    listAllPayments(),
    listEvents(),
  ]);

  const members = users.filter((u) => u.role === "member").length;
  const revenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount_cents, 0);

  const stats = [
    { label: "Pending Applications", value: String(applications.length), href: "/admin/applications" },
    { label: "Members", value: String(members), href: "/admin/members" },
    { label: "Upcoming Events", value: String(events.filter((e) => new Date(e.date) > new Date()).length), href: "/admin/events" },
    { label: "Dues Collected", value: formatCurrency(revenue), href: "/admin/payments" },
  ];

  return (
    <main className="p-6 md:p-10">
      <h1 className="font-playfair text-3xl text-ivory mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-ivory/10 bg-charcoal-soft p-6 hover:border-brass/40 transition-colors"
          >
            <p className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/50">
              {s.label}
            </p>
            <p className="font-archivo text-3xl text-brass mt-2">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-ivory/10 bg-charcoal-soft p-6">
          <h2 className="font-playfair text-xl text-ivory mb-4">
            Recent Applications
          </h2>
          <div className="space-y-2">
            {applications.slice(0, 5).map((a) => (
              <Link
                key={a.id}
                href={`/admin/applications/${a.id}`}
                className="block font-satoshi text-sm text-ivory/70 hover:text-brass"
              >
                {a.full_name} · {formatDate(a.created_at)}
              </Link>
            ))}
            {applications.length === 0 && (
              <p className="font-satoshi text-sm text-ivory/40">
                No pending applications.
              </p>
            )}
          </div>
        </div>

        <div className="border border-ivory/10 bg-charcoal-soft p-6">
          <h2 className="font-playfair text-xl text-ivory mb-4">
            Recent Payments
          </h2>
          <div className="space-y-2">
            {payments.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="font-satoshi text-sm text-ivory/70 flex justify-between"
              >
                <span>{p.membership_tier}</span>
                <span className="text-brass">{formatCurrency(p.amount_cents)}</span>
              </div>
            ))}
            {payments.length === 0 && (
              <p className="font-satoshi text-sm text-ivory/40">
                No payments yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}