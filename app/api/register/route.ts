import { fieldErrors, registrationSchema } from "@/lib/registration";
import { priceFor } from "@/lib/passes";
import { ConfigError, env } from "@/lib/server/env";
import { createOrder } from "@/lib/server/razorpay";
import { newReference } from "@/lib/server/registrations";
import { supabaseAdmin } from "@/lib/server/supabase";

/**
 * Step 1: validate the form, store a pending registration and create a
 * Razorpay order for it. The client then opens Razorpay Checkout.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please fix the highlighted fields", fields: fieldErrors(parsed.error) },
      { status: 422 }
    );
  }
  const data = parsed.data;
  const passDays = data.passType === "day" ? data.passDays : [];
  const amountPaise = priceFor(data.passType, passDays) * 100;
  const reference = newReference();

  try {
    const db = supabaseAdmin();
    const { data: row, error } = await db
      .from("registrations")
      .insert({
        reference,
        status: "pending",
        pass_type: data.passType,
        pass_days: passDays,
        amount_paise: amountPaise,
        currency: "INR",
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        organization: data.organization,
        designation: data.designation,
        attendee_type: data.attendeeType,
        linkedin_url: data.linkedinUrl || null,
        interests: data.interests,
        heard_from: data.heardFrom || null,
        gstin: data.gstin || null,
        consent_terms: data.consentTerms,
        consent_updates: data.consentUpdates,
        user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
      })
      .select("id")
      .single();
    if (error) throw error;

    let order;
    try {
      order = await createOrder({
        amountPaise,
        receipt: reference,
        notes: { registration_id: row.id, reference, pass: data.passType },
      });
    } catch (err) {
      await db.from("registrations").update({ status: "failed" }).eq("id", row.id);
      throw err;
    }

    const { error: orderError } = await db
      .from("registrations")
      .update({ razorpay_order_id: order.id })
      .eq("id", row.id);
    if (orderError) throw orderError;

    return Response.json({
      reference,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env("RAZORPAY_KEY_ID"),
      prefill: { name: data.fullName, email: data.email, contact: data.phone },
    });
  } catch (err) {
    console.error("Registration failed", reference, err);
    const message =
      err instanceof ConfigError
        ? "Registrations are not open yet. Please check back shortly."
        : "Something went wrong. Please try again.";
    return Response.json({ error: message }, { status: 500 });
  }
}
