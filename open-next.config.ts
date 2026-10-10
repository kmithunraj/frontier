import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The site is static pages + API routes with no ISR, so no incremental cache
// (R2/KV) is needed. Add one here if we start using revalidation.
export default defineCloudflareConfig({});
