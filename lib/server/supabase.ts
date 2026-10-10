import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/server/env";

/**
 * Service-role client — bypasses RLS, so it must only ever run on the server.
 * The registrations table has RLS enabled with no public policies.
 */
export function supabaseAdmin() {
  return createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type RegistrationRow = {
  id: string;
  reference: string;
  created_at: string;
  status: "pending" | "paid" | "failed";
  pass_type: "day" | "summit" | "season";
  pass_days: string[];
  amount_paise: number;
  currency: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  designation: string;
  attendee_type: string;
  linkedin_url: string | null;
  interests: string[];
  heard_from: string | null;
  gstin: string | null;
  consent_terms: boolean;
  consent_updates: boolean;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  paid_at: string | null;
  confirmation_email_sent_at: string | null;
};
