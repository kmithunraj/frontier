import { optionalEnv } from "@/lib/server/env";
import { verifyWebhookSignature } from "@/lib/server/razorpay";
import { confirmPayment, markFailed } from "@/lib/server/registrations";

type PaymentEntity = { id: string; order_id: string | null };

/**
 * Razorpay webhook — backstop for when the buyer closes the tab before the
 * checkout callback reaches us. Subscribe to: payment.captured, order.paid,
 * payment.failed.
 */
export async function POST(request: Request) {
  const secret = optionalEnv("RAZORPAY_WEBHOOK_SECRET");
  if (!secret) {
    return Response.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  if (!(await verifyWebhookSignature(raw, signature, secret))) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(raw) as {
    event: string;
    payload: { payment?: { entity: PaymentEntity } };
  };
  const payment = event.payload.payment?.entity;
  if (!payment?.order_id) return Response.json({ ok: true });

  try {
    if (event.event === "payment.captured" || event.event === "order.paid") {
      await confirmPayment(payment.order_id, payment.id);
    } else if (event.event === "payment.failed") {
      await markFailed(payment.order_id);
    }
  } catch (err) {
    console.error("Webhook handling failed", event.event, payment.order_id, err);
    // Non-2xx makes Razorpay retry.
    return Response.json({ error: "Retry" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
