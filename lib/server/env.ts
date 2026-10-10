/**
 * Server-only configuration. On Cloudflare these come from Worker
 * vars/secrets (OpenNext exposes them on process.env); locally from .env.local.
 */

type RequiredKey =
  | "SUPABASE_URL"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "RAZORPAY_KEY_ID"
  | "RAZORPAY_KEY_SECRET";

export class ConfigError extends Error {}

export function env(key: RequiredKey): string {
  const value = process.env[key];
  if (!value) throw new ConfigError(`Missing environment variable ${key}`);
  return value;
}

export function optionalEnv(key: string): string | undefined {
  return process.env[key] || undefined;
}
