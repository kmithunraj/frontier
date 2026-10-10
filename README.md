# Headstart Frontier Tech Week

Launch site for Headstart's city-week format — starting in **Bangalore, December 7–12, 2026**.

## Launch page flow

1. Hook + CTA  
2. Manifesto / grand vision  
3. Bangalore city week details  
4. Coming soon — Chennai, Mumbai, Delhi  
5. Speakers & partners from [Bangalore Slush'D](https://www.blrslushd.com/)  
6. Previous gathering gallery / proof  

## Registration (`/register`)

Three-step form → Razorpay Checkout → confirmation email.

| Piece | Service | Where |
|---|---|---|
| Hosting + API routes | Cloudflare Workers (via OpenNext) | `wrangler.jsonc`, `open-next.config.ts` |
| Database | Supabase (Postgres) | `supabase/migrations/` |
| Payments | Razorpay Orders + Checkout | `lib/server/razorpay.ts` |
| Email | Resend | `lib/server/email.ts` |

Flow:

1. `POST /api/register` — validates the form, stores a `pending` registration, creates a Razorpay order (amount is always computed server-side from `lib/passes.ts`).
2. Razorpay Checkout opens in the browser.
3. `POST /api/register/verify` — verifies the payment signature, marks the row `paid`, sends the confirmation email.
4. `POST /api/razorpay/webhook` — backstop if the buyer closes the tab before step 3. The email is sent exactly once either way.

Passes, prices and event days live in `lib/passes.ts`; form options in `lib/registration.ts`.

### Setup

1. **Supabase** — create a project, run `supabase/migrations/20261010000000_create_registrations.sql` in the SQL editor. Confirmed attendees: `select * from paid_registrations`.
2. **Razorpay** — generate API keys (test keys first). Add a webhook to `https://<domain>/api/razorpay/webhook` for `payment.captured`, `order.paid`, `payment.failed`. Keep auto-capture on.
3. **Resend** — verify the sending domain and create an API key. Set `EMAIL_FROM` in `wrangler.jsonc` to an address on that domain.
4. Copy `.env.example` → `.env.local` and fill it in.

## Develop

```bash
npm install
npm run dev
```

## Deploy to Cloudflare

Requires Node 22+ for Wrangler.

```bash
npx wrangler login
npx wrangler secret put SUPABASE_URL          # repeat for each secret in .env.example
npm run deploy
```

Or connect the GitHub repo in Cloudflare → Workers & Pages → Create → Import repository, with build command `npx opennextjs-cloudflare build` and deploy command `npx opennextjs-cloudflare deploy`, and add the secrets under Settings → Variables and Secrets. Attach the custom domain under Settings → Domains & Routes.

`npm run preview` runs the production Worker locally (reads secrets from `.dev.vars`).

## Content

Edit `lib/data.ts` for dates, cities, speakers, partners, and copy.
