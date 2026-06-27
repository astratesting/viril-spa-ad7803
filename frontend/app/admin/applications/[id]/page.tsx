import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import ApplicationActions from "@/components/admin/ApplicationActions";
import { getApplication } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const statusTone = (s: string) =>
  s === "approved" ? "green" : s === "rejected" ? "red" : "amber";

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getApplication(id);
  if (!app) notFound();

  const rows: { label: string; value: string }[] = [
    { label: "Email", value: app.email },
    { label: "Phone", value: app.phone ?? "—" },
    { label: "Referral source", value: app.referral_source ?? "—" },
    { label: "Submitted", value: formatDate(app.created_at) },
    ...(app.reviewed_at
      ? [{ label: "Reviewed", value: formatDate(app.reviewed_at) }]
      : []),
    ...(app.rejection_reason
      ? [{ label: "Rejection reason", value: app.rejection_reason }]
      : []),
  ];

  return (
    <main className="p-6 md:p-10 max-w-2xl">
      <Link
        href="/admin/applications"
        className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
      >
        ← Applications
      </Link>

      <div className="mt-4 flex items-center gap-3 mb-6">
        <h1 className="font-playfair text-3xl text-ivory">{app.full_name}</h1>
        <Badge tone={statusTone(app.status)}>{app.status}</Badge>
      </div>

      <div className="border border-ivory/10 bg-charcoal-soft p-6 mb-8">
        <dl className="space-y-4">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-col">
              <dt className="font-satoshi text-[10px] tracking-[0.2em] uppercase text-ivory/40">
                {r.label}
              </dt>
              <dd className="font-satoshi text-sm text-ivory/85 mt-1">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {app.status === "pending" && (
        <ApplicationActions applicationId={app.id} />
      )}
    </main>
  );
}