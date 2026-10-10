import { verifySchema } from "@/lib/registration";
import { verifyPaymentSignature } from "@/lib/server/razorpay";
import { confirmPayment } from "@/lib/server/registrations";

/**
 * Step 2: called by the checkout success handler. Verifies Razorpay's
 * signature, marks the registration paid and sends the acknowledgement email.
 */
export async function POST(request: Request) {
  const parsed = verifySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  try {
    const valid = await verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (!valid) {
      return Response.json({ error: "Payment could not be verified" }, { status: 400 });
    }

    const row = await confirmPayment(razorpay_order_id, razorpay_payment_id);
    if (!row) {
      return Response.json({ error: "Registration not found" }, { status: 404 });
    }

    return Response.json({ reference: row.reference, email: row.email });
  } catch (err) {
    console.error("Payment verification failed", razorpay_order_id, err);
    return Response.json(
      { error: "We received your payment but couldn't confirm it yet. You'll get an email shortly." },
      { status: 500 }
    );
  }
}
