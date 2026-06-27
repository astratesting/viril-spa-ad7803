import { NextResponse } from "next/server";
import {
  getTierByName,
  createPayment,
  updateUserRole,
  findUserById,
} from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";

const DEFAULT_TIER = "Founding Member";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "pending_payment" && session.role !== "member") {
    return NextResponse.json(
      { error: "Dues are not yet requested for this account." },
      { status: 400 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const tierName = String(body.tier ?? DEFAULT_TIER);
  const tier = await getTierByName(tierName);
  if (!tier) {
    return NextResponse.json({ error: "Unknown membership tier." }, { status: 400 });
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (isStripeConfigured) {
    const created = await createCheckoutSession({
      tierName: tier.name,
      amountCents: tier.price_cents,
      userId: session.userId,
      userEmail: user.email,
      successUrl: `${appUrl}/dashboard?payment=success`,
      cancelUrl: `${appUrl}/payment?canceled=true`,
    });
    if (created) {
      await createPayment({
        user_id: session.userId,
        stripe_session_id: created.sessionId,
        stripe_payment_intent: null,
        amount_cents: tier.price_cents,
        currency: "usd",
        status: "pending",
        membership_tier: tier.name,
        paid_at: null,
        expires_at: null,
      });
      return NextResponse.json({ ok: true, url: created.url });
    }
  }

  // Demo / no-Stripe path: simulate a successful payment in-app so the flow
  // stays explorable without real Stripe credentials.
  const expiresAt = new Date(Date.now() + 365 * 86400000).toISOString();
  await createPayment({
    user_id: session.userId,
    stripe_session_id: null,
    stripe_payment_intent: null,
    amount_cents: tier.price_cents,
    currency: "usd",
    status: "completed",
    membership_tier: tier.name,
    paid_at: new Date().toISOString(),
    expires_at: expiresAt,
  });
  await updateUserRole(session.userId, "member", {
    membership_tier: tier.name,
    membership_expires_at: expiresAt,
  });

  return NextResponse.json({ ok: true, redirect: "/dashboard?payment=success" });
}
