import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { getSession } from "@/lib/auth";
import { findUserById, listApplications } from "@/lib/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/admin");
  const user = await findUserById(session.userId);
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const pending = await listApplications("pending");

  return (
    <div className="min-h-screen bg-ink flex flex-col md:flex-row">
      <Sidebar pendingCount={pending.length} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
