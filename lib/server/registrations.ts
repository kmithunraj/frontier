import { sendConfirmationEmail } from "@/lib/server/email";
import { supabaseAdmin, type RegistrationRow } from "@/lib/server/supabase";

/**
 * Marks the registration for an order as paid and sends the confirmation
 * email exactly once. Safe to call from both the checkout callback and the
 * Razorpay webhook — whichever arrives first wins, the other is a no-op.
 */
export async function confirmPayment(
  orderId: string,
  paymentId: string
): Promise<RegistrationRow | null> {
  const db = supabaseAdmin();

  const { error: paidError } = await db
    .from("registrations")
    .update({
      status: "paid",
      razorpay_payment_id: paymentId,
      paid_at: new Date().toISOString(),
    })
    .eq("razorpay_order_id", orderId)
    .neq("status", "paid");
  if (paidError) throw paidError;

  // Atomically claim the email so concurrent callers can't both send it.
  const { data: claimed, error: claimError } = await db
    .from("registrations")
    .update({ confirmation_email_sent_at: new Date().toISOString() })
    .eq("razorpay_order_id", orderId)
    .eq("status", "paid")
    .is("confirmation_email_sent_at", null)
    .select()
    .maybeSingle<RegistrationRow>();
  if (claimError) throw claimError;

  if (claimed) {
    try {
      await sendConfirmationEmail(claimed);
    } catch (err) {
      // Release the claim so a webhook retry can send it later.
      await db
        .from("registrations")
        .update({ confirmation_email_sent_at: null })
        .eq("id", claimed.id);
      console.error("Confirmation email failed", claimed.reference, err);
    }
    return claimed;
  }

  const { data, error } = await db
    .from("registrations")
    .select()
    .eq("razorpay_order_id", orderId)
    .maybeSingle<RegistrationRow>();
  if (error) throw error;
  return data;
}

export async function markFailed(orderId: string): Promise<void> {
  const { error } = await supabaseAdmin()
    .from("registrations")
    .update({ status: "failed" })
    .eq("razorpay_order_id", orderId)
    .eq("status", "pending");
  if (error) throw error;
}

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Human-friendly booking reference, e.g. FTW26-K7Q2MX. */
export function newReference(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "FTW26-" + Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
}
