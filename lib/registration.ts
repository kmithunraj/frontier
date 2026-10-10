import { z } from "zod";
import { eventDayDates } from "@/lib/passes";

export const attendeeTypes = [
  "Founder",
  "Investor",
  "Operator / Professional",
  "Corporate",
  "Researcher / Academic",
  "Student",
  "Government / Policy",
  "Ecosystem enabler",
  "Other",
] as const;

export const interestOptions = [
  "AI / ML",
  "Deep tech",
  "Climate & energy",
  "Space",
  "Defence",
  "Semiconductors",
  "Robotics",
  "Biotech & health",
  "Fintech",
  "Mobility",
] as const;

export const heardFromOptions = [
  "Headstart community",
  "Bangalore Slush'D",
  "LinkedIn",
  "Instagram",
  "X / Twitter",
  "WhatsApp group",
  "Friend or colleague",
  "Other",
] as const;

const trimmed = (max: number) => z.string().trim().max(max);

export const registrationSchema = z
  .object({
    passType: z.enum(["day", "summit", "season"]),
    passDays: z.array(z.enum(eventDayDates)).max(eventDayDates.length).default([]),

    fullName: trimmed(120).min(2, { error: "Enter your full name" }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(200)
      .pipe(z.email({ error: "Enter a valid email" })),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9][0-9\s-]{7,16}$/, { error: "Enter a valid phone number" }),
    city: trimmed(80).min(2, { error: "Enter your city" }),
    organization: trimmed(160).min(1, { error: "Enter your organisation" }),
    designation: trimmed(120).min(1, { error: "Enter your role" }),
    attendeeType: z.enum(attendeeTypes, { error: "Choose what describes you" }),
    linkedinUrl: z
      .union([
        z.literal(""),
        z
          .string()
          .trim()
          .max(300)
          .pipe(z.url({ protocol: /^https?$/, error: "Enter a valid URL" }))
          .refine((v) => /^https?:\/\/([a-z0-9-]+\.)*linkedin\.com\//i.test(v), {
            error: "Enter a LinkedIn profile URL",
          }),
      ])
      .default(""),

    interests: z.array(z.enum(interestOptions)).max(interestOptions.length).default([]),
    heardFrom: z.union([z.literal(""), z.enum(heardFromOptions)]).default(""),
    gstin: z
      .union([
        z.literal(""),
        z
          .string()
          .trim()
          .toUpperCase()
          .regex(/^[0-9]{2}[A-Z0-9]{13}$/, { error: "Enter a valid 15-character GSTIN" }),
      ])
      .default(""),

    consentTerms: z.literal(true, { error: "Please accept to continue" }),
    consentUpdates: z.boolean().default(false),

    /** Honeypot — real users never fill this. */
    website: z.string().max(0).optional(),
  })
  .refine((data) => data.passType !== "day" || data.passDays.length > 0, {
    path: ["passDays"],
    error: "Pick at least one day",
    // Run even when other fields are invalid, so step 1 of the form can show it.
    when: (payload) => {
      const v = payload.value as { passType?: unknown; passDays?: unknown };
      return v?.passType === "day" && Array.isArray(v.passDays);
    },
  });

export type RegistrationInput = z.input<typeof registrationSchema>;
export type Registration = z.output<typeof registrationSchema>;

export const verifySchema = z.object({
  razorpay_order_id: z.string().min(1).max(64),
  razorpay_payment_id: z.string().min(1).max(64),
  razorpay_signature: z.string().min(1).max(256),
});

/** Flatten zod issues into { field: message } for the form. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
