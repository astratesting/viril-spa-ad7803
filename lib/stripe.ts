import Stripe from "stripe";
import { isRealEnv } from "@/lib/env";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const isStripeConfigured = isRealEnv(STRIPE_SECRET_KEY);

export function stripeClient(): Stripe | null {
  if (!isStripeConfigured) return null;
  return new Stripe(STRIPE_SECRET_KEY as string);
}

export async function createCheckoutSession(opts: {
  tierName: string;
  amountCents: number;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ url: string; sessionId: string } | null> {
  const stripe = stripeClient();
  if (!stripe) return null;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: opts.userEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: opts.amountCents,
          product_data: {
            name: `Goon Membership — ${opts.tierName}`,
            description: `Annual membership dues (${opts.tierName}).`,
          },
        },
        quantity: 1,
      },
    ],
    client_reference_id: opts.userId,
    metadata: { tier: opts.tierName, user_id: opts.userId },
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
  });

  return { url: session.url as string, sessionId: session.id };
}

export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): Stripe.Event | null {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = stripeClient();
  if (!stripe || !secret) return null;
  try {
    return stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return null;
  }
}
