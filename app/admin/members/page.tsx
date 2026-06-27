import Link from "next/link";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { listAllUsers } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";

const roleTone = (r: string) =>
  r === "admin" ? "brass" : r === "member" ? "green" : r === "pending_payment" ? "amber" : "muted";

export default async function AdminMembersPage() {
  const users = await listAllUsers();

  return (
    <main className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-ivory">Members</h1>
        <Link
          href="/admin"
          className="font-satoshi text-xs tracking-[0.2em] uppercase text-brass hover:underline"
        >
          ← Dashboard
        </Link>
      </div>
      <Table<User>
        empty="No users yet."
        columns={[
          { key: "name", header: "Name", render: (u) => u.name },
          { key: "email", header: "Email", render: (u) => u.email },
          {
            key: "tier",
            header: "Tier",
            render: (u) => u.membership_tier ?? "—",
          },
          {
            key: "expires",
            header: "Expires",
            render: (u) =>
              u.membership_expires_at ? formatDate(u.membership_expires_at) : "—",
          },
          {
            key: "role",
            header: "Role",
            render: (u) => <Badge tone={roleTone(u.role)}>{u.role}</Badge>,
          },
        ]}
        rows={users}
      />
    </main>
  );
}
