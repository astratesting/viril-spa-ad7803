import Link from "next/link";
import Table from "@/components/ui/Table";
import { listParlors } from "@/lib/db";
import AdminParlorForm from "@/components/AdminParlorForm";
import type { Parlor } from "@/types";

export default async function AdminParlorsPage() {
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

      <div className="mb-10">
        <AdminParlorForm />
      </div>

      <Table<Parlor>
        empty="No parlors yet."
        columns={[
          { key: "name", header: "Name", render: (p) => p.name },
          { key: "description", header: "Description", render: (p) => p.description },
          { key: "capacity", header: "Capacity", render: (p) => String(p.capacity) },
        ]}
        rows={parlors}
      />
    </main>
  );
}
