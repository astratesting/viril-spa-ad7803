import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import PaymentClient from "@/components/PaymentClient";
import { getSession } from "@/lib/auth";
import { findUserById, listTiers } from "@/lib/db";
import { isStripeConfigured } from "@/lib/stripe";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/payment");
  const user = await findUserById(session.userId);
  if (!user) redirect("/login");

  const params = await searchParams;
  const tiers = await listTiers();
  const defaultTier =
    user.membership_tier && tiers.some((t) => t.name === user.membership_tier)
      ? user.membership_tier
      : "Founding Member";

  return (
    <div className="min-h-screen bg-ink">
      <Navbar
        name={user.name}
        membershipTier={user.membership_tier}
        isAdmin={user.role === "admin"}
      />
      <main className="max-w-xl mx-auto px-6 py-12">
        <PaymentClient
          tiers={tiers.map((t) => ({
            id: t.id,
            name: t.name,
            price_cents: t.price_cents,
            description: t.description,
            benefits: t.benefits,
          }))}
          defaultTier={defaultTier}
          canceled={params.canceled === "true"}
          stripeEnabled={isStripeConfigured}
        />
      </main>
    </div>
  );
}
