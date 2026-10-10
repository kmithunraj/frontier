/**
 * Pass catalog for Bangalore Frontier Tech Week.
 * Shared by the registration form (display) and the API (pricing) —
 * the server always recomputes the amount from here, never trusts the client.
 */

export type PassId = "day" | "summit" | "season";

export type Pass = {
  id: PassId;
  name: string;
  /** Price in rupees. For the day pass this is per day. */
  price: number;
  priceNote?: string;
  summary: string;
  perks: string[];
  featured?: boolean;
};

export const passes: Pass[] = [
  {
    id: "day",
    name: "Day Pass",
    price: 999,
    priceNote: "per day",
    summary: "Pick the days you want to attend.",
    perks: [
      "Choose any day(s) of the week",
      "Main gatherings on chosen days",
      "Networking between sessions",
    ],
  },
  {
    id: "summit",
    name: "Summit Pass",
    price: 4999,
    summary: "The headline summit experience.",
    perks: [
      "Access to the main summit",
      "Curated matchmaking",
      "Select side events",
    ],
    featured: true,
  },
  {
    id: "season",
    name: "Full Season Pass",
    price: 8999,
    summary: "Everything, all week.",
    perks: [
      "All six days, every venue",
      "Priority matchmaking",
      "Side events, dinners & showcases",
    ],
  },
];

/** Event days for Bangalore — Dec 7–12, 2026 (ISO dates). */
export const eventDays = [
  { date: "2026-12-07", label: "Mon", day: "7 Dec" },
  { date: "2026-12-08", label: "Tue", day: "8 Dec" },
  { date: "2026-12-09", label: "Wed", day: "9 Dec" },
  { date: "2026-12-10", label: "Thu", day: "10 Dec" },
  { date: "2026-12-11", label: "Fri", day: "11 Dec" },
  { date: "2026-12-12", label: "Sat", day: "12 Dec" },
] as const;

export const eventDayDates = eventDays.map((d) => d.date) as [
  string,
  ...string[],
];

export function getPass(id: PassId): Pass {
  const pass = passes.find((p) => p.id === id);
  if (!pass) throw new Error(`Unknown pass: ${id}`);
  return pass;
}

/** Total in rupees. Day pass is priced per selected day. */
export function priceFor(passId: PassId, days: string[] = []): number {
  const pass = getPass(passId);
  return passId === "day" ? pass.price * days.length : pass.price;
}

export function formatINR(rupees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function formatDays(days: string[]): string {
  return eventDays
    .filter((d) => days.includes(d.date))
    .map((d) => `${d.label} ${d.day}`)
    .join(", ");
}
