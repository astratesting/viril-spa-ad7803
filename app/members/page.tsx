import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import MembersClient from "@/components/MembersClient";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export default async function MembersPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/members");
  const user = await findUserById(session.userId);
  if (!user) redirect("/login");
  if (user.role === "pending") redirect("/dashboard");
  if (user.role === "pending_payment") redirect("/payment");

  return (
    <div className="min-h-screen bg-ink">
      <Navbar
        name={user.name}
        membershipTier={user.membership_tier}
        isAdmin={user.role === "admin"}
      />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <MembersClient />
        <p className="mt-10 font-satoshi text-xs text-ivory/40">
          <Link href="/dashboard" className="text-brass hover:underline">
            ← Back to dashboard
          </Link>
        </p>
      </main>
    </div>
  );
}
