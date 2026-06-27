import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { listApplications } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import type { MembershipApplication } from "@/types";

const statusTone = (s: string) =>
  s === "approved" ? "green" : s === "rejected" ? "red" : "amber";

export default async function AdminApplicationsPage() {
  const applications = await listApplications();

  return (
    <main className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-ivory">Applications</h1>
        <Link
          href="/admin"
          className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
        >
          ← Dashboard
        </Link>
      </div>
      <Table<MembershipApplication>
        empty="No applications yet."
        columns={[
          {
            key: "name",
            header: "Applicant",
            render: (a) => (
              <Link href={`/admin/applications/${a.id}`} className="text-ivory hover:text-brass">
                {a.full_name}
              </Link>
            ),
          },
          { key: "email", header: "Email", render: (a) => a.email },
          {
            key: "referral",
            header: "Referral",
            render: (a) => a.referral_source ?? "—",
          },
          {
            key: "date",
            header: "Submitted",
            render: (a) => formatDate(a.created_at),
          },
          {
            key: "status",
            header: "Status",
            render: (a) => <Badge tone={statusTone(a.status)}>{a.status}</Badge>,
          },
        ]}
        rows={applications}
      />
    </main>
  );
}
