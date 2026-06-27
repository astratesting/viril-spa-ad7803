import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/stripe";
import {
  createPayment,
  findUserById,
  updateUserRole,
  listAllPayments,
} from "@/lib/db";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  const event = verifyWebhookSignature(rawBody, signature);
  if (!event) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      client_reference_id?: string;
      metadata?: { tier?: string; user_id?: string };
      payment_intent?: string | null;
      amount_total?: number;
    };

    const userId = session.metadata?.user_id ?? session.client_reference_id ?? "";
    const tier = session.metadata?.tier ?? "Founding Member";
    const user = await findUserById(userId);
    if (user) {
      const existing = (await listAllPayments()).find(
        (p) => p.stripe_session_id === session.id
      );
      if (!existing) {
        const expiresAt = new Date(Date.now() + 365 * 86400000).toISOString();
        await createPayment({
          user_id: userId,
          stripe_session_id: session.id,
          stripe_payment_intent:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
          amount_cents: session.amount_total ?? 0,
          currency: "usd",
          status: "completed",
          membership_tier: tier,
          paid_at: new Date().toISOString(),
          expires_at: expiresAt,
        });
        await updateUserRole(userId, "member", {
          membership_tier: tier,
          membership_expires_at: expiresAt,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
