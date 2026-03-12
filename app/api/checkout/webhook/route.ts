import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const userId = intent.metadata.userId;
    const items = JSON.parse(intent.metadata.items ?? "[]");
    const total = intent.amount / 100;

    if (!userId || userId === "guest" || !items.length) {
      return NextResponse.json({ received: true });
    }

    try {
      // Check order not already created (idempotency)
      const existing = await db.order.findFirst({
        where: { paymentId: intent.id },
      });
      if (existing) return NextResponse.json({ received: true });

      await db.order.create({
        data: {
          userId,
          total,
          status: "PAID",
          paymentId: intent.id,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
    } catch (err) {
      console.error("Failed to create order:", err);
      return NextResponse.json(
        { error: "Order creation failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}

// Required: disable body parsing so Stripe can verify signature
export const runtime = "nodejs";
