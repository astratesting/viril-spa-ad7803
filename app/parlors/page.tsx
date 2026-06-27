import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ParlorsClient from "@/components/ParlorsClient";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export default async function ParlorsPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/parlors");
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
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
            The House
          </p>
          <h1 className="font-playfair text-4xl text-ivory">Parlors</h1>
        </div>
        <ParlorsClient />
      </main>
    </div>
  );
}
