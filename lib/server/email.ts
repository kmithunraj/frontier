import { contactEmail } from "@/lib/data";
import { formatDays, formatINR, getPass } from "@/lib/passes";
import { optionalEnv } from "@/lib/server/env";
import type { RegistrationRow } from "@/lib/server/supabase";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function confirmationContent(row: RegistrationRow) {
  const pass = getPass(row.pass_type);
  const firstName = row.full_name.split(/\s+/)[0];
  const rows: [string, string][] = [
    ["Reference", row.reference],
    ["Pass", pass.name],
    ...(row.pass_type === "day"
      ? ([["Days", formatDays(row.pass_days)]] as [string, string][])
      : []),
    ["Amount paid", formatINR(row.amount_paise / 100)],
    ["Payment ID", row.razorpay_payment_id ?? "—"],
  ];

  const subject = `You're in — Frontier Tech Week Bangalore (${row.reference})`;

  const text = [
    `Hi ${firstName},`,
    "",
    "Your registration for Headstart Frontier Tech Week — Bangalore, December 7–12, 2026 is confirmed.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Venue details, schedules and your attendee dashboard will be shared closer to the week.",
    `Questions? Reply to this email or write to ${contactEmail}.`,
    "",
    "— Team Headstart",
  ].join("\n");

  const tableRows = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e3da;color:#6e6a62;font-size:13px;width:40%">${escapeHtml(k)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e3da;color:#111;font-size:14px;font-weight:600">${escapeHtml(v)}</td>
        </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ea;padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e3da">
          <tr><td style="background:#090909;padding:24px 28px">
            <p style="margin:0;color:#75fe72;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace">Headstart presents</p>
            <p style="margin:6px 0 0;color:#f3f1ea;font-size:22px;font-weight:800">Frontier Tech Week</p>
            <p style="margin:4px 0 0;color:#a8a49a;font-size:13px">Bangalore · December 7–12, 2026</p>
          </td></tr>
          <tr><td style="padding:28px">
            <p style="margin:0 0 12px;font-size:16px;color:#111">Hi ${escapeHtml(firstName)},</p>
            <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:#333">
              You're registered. Your spot at Headstart Frontier Tech Week — Bangalore is confirmed.
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
            <p style="margin:24px 0 0;font-size:14px;line-height:1.55;color:#333">
              Venue details, schedules and your attendee dashboard will be shared closer to the week.
            </p>
            <p style="margin:12px 0 0;font-size:14px;line-height:1.55;color:#333">
              Questions? Reply to this email or write to
              <a href="mailto:${contactEmail}" style="color:#111">${contactEmail}</a>.
            </p>
            <p style="margin:24px 0 0;font-size:14px;color:#111">— Team Headstart</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

/** Sends the payment confirmation via Resend's REST API. */
export async function sendConfirmationEmail(row: RegistrationRow): Promise<void> {
  const apiKey = optionalEnv("RESEND_API_KEY");
  const from = optionalEnv("EMAIL_FROM");
  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY / EMAIL_FROM not configured");
  }

  const { subject, text, html } = confirmationContent(row);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Resend dedupes retries with the same key for 24h.
      "Idempotency-Key": `confirmation-${row.id}`,
    },
    body: JSON.stringify({
      from,
      to: [row.email],
      reply_to: optionalEnv("EMAIL_REPLY_TO") ?? contactEmail,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend failed (${res.status}): ${await res.text()}`);
  }
}
