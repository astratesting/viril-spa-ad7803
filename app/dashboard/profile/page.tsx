import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Badge from "@/components/ui/Badge";
import ProfileForm from "@/components/ProfileForm";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/dashboard/profile");
  const user = await findUserById(session.userId);
  if (!user) redirect("/login");
  if (user.role === "pending_payment") redirect("/payment");

  const statusTone =
    user.role === "admin"
      ? "brass"
      : user.role === "member"
      ? "green"
      : "amber";

  return (
    <div className="min-h-screen bg-ink">
      <Navbar
        name={user.name}
        membershipTier={user.membership_tier}
        isAdmin={user.role === "admin"}
      />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <p className="font-satoshi text-xs tracking-[0.3em] uppercase text-brass mb-2">
          Account
        </p>
        <h1 className="font-playfair text-4xl text-ivory mb-8">Profile</h1>

        <div className="border border-ivory/10 bg-charcoal-soft p-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge tone={statusTone}>{user.role}</Badge>
            {user.membership_tier && (
              <span className="font-satoshi text-sm text-ivory/70">
                {user.membership_tier}
              </span>
            )}
          </div>
          <ProfileForm
            initial={{
              name: user.name,
              email: user.email,
              phone: user.phone,
              referral_source: user.referral_source,
              membership_tier: user.membership_tier,
              role: user.role,
            }}
          />
        </div>

        <div className="border border-ivory/10 bg-charcoal-soft p-6 space-y-3 font-satoshi text-sm">
          <div className="flex justify-between">
            <span className="text-ivory/50">Referral source</span>
            <span className="text-ivory/85">{user.referral_source ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ivory/50">Joined</span>
            <span className="text-ivory/85">{formatDate(user.created_at)}</span>
          </div>
          {user.membership_expires_at && (
            <div className="flex justify-between">
              <span className="text-ivory/50">Membership renews</span>
              <span className="text-ivory/85">
                {formatDate(user.membership_expires_at)}
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
