export const event = {
  presenter: "HEADSTART PRESENTS",
  name: "FRONTIER",
  fullName: "Frontier Tech Week",
  year: "2026",
  tagline: "India's startup ecosystem, in one room.",
  subTagline:
    "Not another startup conference. A gathering of India's entire startup ecosystem.",
  dates: "December 2026",
  location: "India — Venue TBA",
  city: "To Be Announced",
  description:
    "A flagship Headstart gathering bringing founders, investors, operators, corporates and ecosystem builders together in India.",
  registerUrl: "#register",
  partnerUrl: "#partners",
  exploreUrl: "#experience",
  matchmakingUrl: "#matchmaking",
  showcaseUrl: "#showcase",
  hostUrl: "#pre-events",
  volunteerUrl: "#get-involved",
};

export const navLinks = [
  { label: "About", href: "#manifesto" },
  { label: "Experience", href: "#experience" },
  { label: "Agenda", href: "#agenda" },
  { label: "Speakers", href: "#speakers" },
  { label: "Tracks", href: "#tracks" },
  { label: "Pre-Events", href: "#pre-events" },
  { label: "Partners", href: "#partners" },
];

export const heroMeta = [
  "FOUNDERS",
  "INVESTORS",
  "STARTUPS",
  "CORPORATES",
  "ECOSYSTEM BUILDERS",
];

export const tickerItems = [
  "FOUNDERS",
  "INVESTORS",
  "CAPITAL",
  "STARTUPS",
  "BUILDERS",
  "CORPORATES",
  "RESEARCH",
  "COMMUNITY",
  "IDEAS",
  "CONNECTIONS",
  "OPERATORS",
  "POLICY",
];

export const manifesto = {
  headline: "THIS IS NOT ANOTHER CONFERENCE.",
  lead: "India does not have a shortage of startup events. It has a shortage of moments where the entire ecosystem can meaningfully converge.",
  body: "Headstart is bringing founders, investors, operators, corporates, researchers, policymakers and ecosystem builders together for one concentrated experience.",
  pillars: [
    "Meaningful connections",
    "Useful conversations",
    "Capital",
    "Collaboration",
    "Discovery",
    "Community",
  ],
};

/** Placeholder targets — replace when confirmed. Not presented as final facts. */
export const stats = [
  { value: 10000, suffix: "+", label: "ATTENDEES", placeholder: true },
  { value: 2000, suffix: "+", label: "FOUNDERS", placeholder: true },
  { value: 500, suffix: "+", label: "INVESTORS", placeholder: true },
  { value: 100, suffix: "+", label: "SPEAKERS", placeholder: true },
  { value: 20, suffix: "+", label: "CITIES", placeholder: true },
  { value: 100, suffix: "+", label: "SIDE EVENTS", placeholder: true },
];

export const experiences = [
  {
    number: "01",
    title: "MEET",
    description:
      "Curated founder, investor and ecosystem connections designed for conversations that lead somewhere.",
  },
  {
    number: "02",
    title: "DISCOVER",
    description:
      "Find the startups, technologies and ideas shaping India's next decade.",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "Founder workshops, operator sessions and practical company-building conversations.",
  },
  {
    number: "04",
    title: "INVEST",
    description:
      "Investor meetings, office hours and capital conversations with intent.",
  },
  {
    number: "05",
    title: "SHOWCASE",
    description:
      "Startups demonstrate what they are actually building — not just pitching slides.",
  },
  {
    number: "06",
    title: "CONNECT",
    description:
      "Dinners, side events, community gatherings and informal conversations across the city.",
  },
];

export const audiences = [
  {
    title: "FOUNDERS",
    description:
      "Investing, hiring, partnerships, customers, community — the people and capital that move companies forward.",
  },
  {
    title: "INVESTORS",
    description:
      "Deal flow, founders, co-investors and market intelligence in one concentrated room.",
  },
  {
    title: "CORPORATES",
    description:
      "Innovation, partnerships, technology and strategic opportunities with India's builders.",
  },
  {
    title: "OPERATORS",
    description:
      "Learn, hire, collaborate and meet peers who have solved the problems you're facing.",
  },
  {
    title: "RESEARCHERS",
    description:
      "Turn research into companies, partnerships and real-world applications.",
  },
  {
    title: "ECOSYSTEM BUILDERS",
    description:
      "Communities, accelerators, incubators, universities and institutions that hold the network together.",
  },
];

export const preEventCities = [
  {
    id: "blr",
    city: "Bengaluru",
    date: "TBA",
    type: "Founder Dinner",
    theme: "Capital & Company Building",
    host: "Host TBA",
    x: 42,
    y: 72,
  },
  {
    id: "mum",
    city: "Mumbai",
    date: "TBA",
    type: "Investor Roundtable",
    theme: "Deal Flow Across India",
    host: "Host TBA",
    x: 28,
    y: 58,
  },
  {
    id: "del",
    city: "Delhi",
    date: "TBA",
    type: "Policy Roundtable",
    theme: "Regulation & Scale",
    host: "Host TBA",
    x: 38,
    y: 28,
  },
  {
    id: "hyd",
    city: "Hyderabad",
    date: "TBA",
    type: "Deep Tech Showcase",
    theme: "Frontier Science to Market",
    host: "Host TBA",
    x: 45,
    y: 62,
  },
  {
    id: "che",
    city: "Chennai",
    date: "TBA",
    type: "Community Meetup",
    theme: "Builders & Operators",
    host: "Host TBA",
    x: 48,
    y: 78,
  },
  {
    id: "pun",
    city: "Pune",
    date: "TBA",
    type: "Startup Demo",
    theme: "Product & Market Fit",
    host: "Host TBA",
    x: 32,
    y: 60,
  },
  {
    id: "amd",
    city: "Ahmedabad",
    date: "TBA",
    type: "Campus Activation",
    theme: "Next-Gen Founders",
    host: "Host TBA",
    x: 30,
    y: 45,
  },
  {
    id: "kol",
    city: "Kolkata",
    date: "TBA",
    type: "Hackathon",
    theme: "Build in Public",
    host: "Host TBA",
    x: 62,
    y: 48,
  },
];

export type SessionType =
  | "KEYNOTE"
  | "PANEL"
  | "WORKSHOP"
  | "DEMO"
  | "INVESTOR"
  | "ROUND TABLE"
  | "NETWORKING"
  | "CLOSED DOOR"
  | "SOCIAL";

export const agendaDays = [
  {
    id: "day-01",
    label: "DAY 01",
    title: "Convergence",
    date: "December 2026 — Day 1",
    sessions: [
      {
        time: "09:00",
        title: "Doors Open & Ecosystem Breakfast",
        description:
          "Arrive, check in, and begin informal conversations before the programme opens.",
        type: "NETWORKING" as SessionType,
      },
      {
        time: "10:00",
        title: "Opening Keynote — Why the Ecosystem Must Converge",
        description:
          "A framing conversation on India's startup density, capital, and the decade ahead.",
        type: "KEYNOTE" as SessionType,
      },
      {
        time: "11:15",
        title: "Founders × Investors: Signal Over Noise",
        description:
          "How high-signal introductions and better conversations change outcomes.",
        type: "PANEL" as SessionType,
      },
      {
        time: "13:00",
        title: "Working Lunch & Open Networking",
        description: "Unstructured time designed for deliberate meetings.",
        type: "NETWORKING" as SessionType,
      },
      {
        time: "14:30",
        title: "Build Tracks Open",
        description:
          "Parallel sessions across AI, climate, deep tech, capital and more.",
        type: "WORKSHOP" as SessionType,
      },
      {
        time: "17:30",
        title: "Investor Office Hours",
        description: "Curated one-to-one conversations. Application-based.",
        type: "INVESTOR" as SessionType,
      },
      {
        time: "19:30",
        title: "Opening Night Gathering",
        description: "Community dinner and informal connections across the city.",
        type: "SOCIAL" as SessionType,
      },
    ],
  },
  {
    id: "day-02",
    label: "DAY 02",
    title: "Density",
    date: "December 2026 — Day 2",
    sessions: [
      {
        time: "09:30",
        title: "Morning Circles",
        description: "Small founder and operator circles by stage and sector.",
        type: "ROUND TABLE" as SessionType,
      },
      {
        time: "11:00",
        title: "What India Is Building — Showcase Block",
        description: "Startups demonstrate products, not pitch decks.",
        type: "DEMO" as SessionType,
      },
      {
        time: "13:00",
        title: "Corporate × Startup Partnerships",
        description: "Structured conversations on innovation and strategic deals.",
        type: "PANEL" as SessionType,
      },
      {
        time: "15:00",
        title: "Capital Conversations",
        description: "Stage-specific investor discussions and market signals.",
        type: "INVESTOR" as SessionType,
      },
      {
        time: "17:00",
        title: "Closed-Door Roundtables",
        description: "Invite-only sessions for operators, LPs and ecosystem leads.",
        type: "CLOSED DOOR" as SessionType,
      },
      {
        time: "19:00",
        title: "Side Events Across the City",
        description: "Dinners, salons and community gatherings beyond the venue.",
        type: "SOCIAL" as SessionType,
      },
    ],
  },
  {
    id: "day-03",
    label: "DAY 03",
    title: "Momentum",
    date: "December 2026 — Day 3",
    sessions: [
      {
        time: "10:00",
        title: "Frontier Themes Deep Dive",
        description: "Intensive sessions across the event's core tracks.",
        type: "WORKSHOP" as SessionType,
      },
      {
        time: "12:00",
        title: "Research to Company",
        description: "Researchers, deep tech founders and institutional partners.",
        type: "PANEL" as SessionType,
      },
      {
        time: "14:00",
        title: "Matchmaking Blocks",
        description: "Dedicated meeting slots for curated introductions.",
        type: "NETWORKING" as SessionType,
      },
      {
        time: "16:30",
        title: "Community Hosts Summit",
        description: "Cities, volunteers and organisers shaping what comes next.",
        type: "ROUND TABLE" as SessionType,
      },
      {
        time: "18:30",
        title: "Closing Gathering",
        description: "The week converges — and the network continues.",
        type: "KEYNOTE" as SessionType,
      },
    ],
  },
];

export const tracks = [
  {
    number: "01",
    title: "AI & Frontier Tech",
    description: "Models, infrastructure, applied intelligence and the companies building India's AI stack.",
    topics: ["Applied AI", "Infra", "Agents", "Enterprise AI"],
  },
  {
    number: "02",
    title: "Climate & Sustainability",
    description: "Energy, materials, mobility and climate solutions with real commercial paths.",
    topics: ["Energy", "Mobility", "Materials", "Carbon"],
  },
  {
    number: "03",
    title: "Deep Tech",
    description: "Hard science, long cycles and the builders turning research into companies.",
    topics: ["Hardware", "Science", "IP", "Labs"],
  },
  {
    number: "04",
    title: "Fintech",
    description: "Payments, credit, wealth and financial infrastructure at Indian scale.",
    topics: ["Credit", "Payments", "Infra", "Inclusion"],
  },
  {
    number: "05",
    title: "Health & Biotech",
    description: "Care delivery, diagnostics, biotech and the next generation of health companies.",
    topics: ["Care", "Diagnostics", "Biotech", "Access"],
  },
  {
    number: "06",
    title: "Space & Defence",
    description: "Dual-use technologies, space economy and strategic capability building.",
    topics: ["Space", "Defence", "Dual-use", "Policy"],
  },
  {
    number: "07",
    title: "Consumer",
    description: "Products, brands and platforms shaping how India lives and buys.",
    topics: ["Brands", "Commerce", "Content", "Distribution"],
  },
  {
    number: "08",
    title: "Enterprise",
    description: "B2B software, infrastructure and the tools Indian companies run on.",
    topics: ["SaaS", "Infra", "Sales", "Global"],
  },
  {
    number: "09",
    title: "Manufacturing",
    description: "Hardware, industrial tech and India's production renaissance.",
    topics: ["Industrial", "Hardware", "Supply chain", "Make"],
  },
  {
    number: "10",
    title: "Future of Work",
    description: "Talent, tools and organisational design for the next decade of companies.",
    topics: ["Talent", "Tools", "Culture", "Remote"],
  },
  {
    number: "11",
    title: "Capital",
    description: "Fundraising, LPs, markets and how money actually moves.",
    topics: ["Seed", "Growth", "LPs", "Exits"],
  },
  {
    number: "12",
    title: "Founder Stories",
    description: "Unfiltered conversations from builders who have been through it.",
    topics: ["Zero to one", "Scale", "Failure", "Craft"],
  },
];

export const speakerFilters = [
  "ALL",
  "FOUNDERS",
  "INVESTORS",
  "OPERATORS",
  "RESEARCHERS",
  "POLICY",
  "CORPORATE",
] as const;

export type SpeakerFilter = (typeof speakerFilters)[number];

/** Speakers TBA — do not invent real people. */
export const speakers = Array.from({ length: 8 }, (_, i) => ({
  id: `speaker-${i + 1}`,
  name: "Announcing Soon",
  designation: "Speaker TBA",
  company: "—",
  category: speakerFilters[(i % 6) + 1] as Exclude<SpeakerFilter, "ALL">,
  announced: false,
}));

export const startups = Array.from({ length: 6 }, (_, i) => ({
  id: `startup-${i + 1}`,
  name: "Startup TBA",
  description: "Company details coming soon.",
  sector: ["AI", "Climate", "Fintech", "Health", "Deep Tech", "Consumer"][i],
  stage: ["Seed", "Series A", "Series B", "Growth", "Seed", "Series A"][i],
  location: ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"][i],
  announced: false,
}));

export const matchmakingPairs = [
  { from: "Founder", to: "Investor" },
  { from: "Founder", to: "Corporate" },
  { from: "Founder", to: "Customer" },
  { from: "Investor", to: "Investor" },
  { from: "Operator", to: "Operator" },
  { from: "Startup", to: "Talent" },
];

export const matchmakingFeatures = [
  {
    title: "Curated introductions",
    description: "High-signal matching based on stage, sector and intent.",
  },
  {
    title: "Meeting requests",
    description: "Request and accept conversations before and during the gathering.",
  },
  {
    title: "Investor office hours",
    description: "Structured access to capital conversations that matter.",
  },
  {
    title: "Founder circles",
    description: "Small peer groups for honest company-building dialogue.",
  },
  {
    title: "Private roundtables",
    description: "Invite-only rooms for focused, closed-door conversations.",
  },
];

export const sideEvents = [
  {
    title: "Founder dinners",
    description: "Intimate tables for builders who prefer conversation over stages.",
  },
  {
    title: "Investor dinners",
    description: "Capital conversations outside the main programme.",
  },
  {
    title: "Community meetups",
    description: "Local communities activating around the week.",
  },
  {
    title: "Private salons",
    description: "Curated rooms for operators, researchers and partners.",
  },
  {
    title: "Startup parties",
    description: "Where the density of the week becomes culture.",
  },
  {
    title: "Workshops",
    description: "Hands-on sessions hosted by operators and partners.",
  },
  {
    title: "Hackathons",
    description: "Build with peers under real constraints and energy.",
  },
  {
    title: "Campus events",
    description: "Universities and student founders joining the network.",
  },
  {
    title: "Partner events",
    description: "Ecosystem partners hosting experiences across the city.",
  },
];

export const partnerCategories = [
  { id: "title", label: "TITLE PARTNER", slots: 1 },
  { id: "strategic", label: "STRATEGIC PARTNERS", slots: 4 },
  { id: "ecosystem", label: "ECOSYSTEM PARTNERS", slots: 6 },
  { id: "community", label: "COMMUNITY PARTNERS", slots: 8 },
  { id: "media", label: "MEDIA PARTNERS", slots: 4 },
];

export const headstartTimeline = [
  { year: "2007", label: "Community begins" },
  { year: "—", label: "Volunteer-driven ecosystem building" },
  { year: "20+", label: "Cities across India" },
  { year: "1000s", label: "Startup ecosystem events" },
  { year: "2024", label: "Bangalore Slush'D" },
  { year: "2026", label: "Frontier Tech Week" },
  { year: "→", label: "The next chapter" },
];

export const getInvolved = [
  {
    id: "attend",
    title: "ATTEND",
    description: "Experience the gathering. Be in the room where the ecosystem converges.",
    cta: "Register",
    href: "#register",
  },
  {
    id: "startup",
    title: "FOUND A STARTUP",
    description: "Showcase what you're building to founders, capital and customers.",
    cta: "Apply to Showcase",
    href: "#showcase",
  },
  {
    id: "invest",
    title: "INVEST",
    description: "Meet the next generation of Indian founders with intent.",
    cta: "Investor Access",
    href: "#register",
  },
  {
    id: "partner",
    title: "PARTNER",
    description: "Put your organisation at the centre of the ecosystem week.",
    cta: "Become a Partner",
    href: "#partners",
  },
  {
    id: "host",
    title: "HOST",
    description: "Bring an official pre-event or side event to your city.",
    cta: "Host an Event",
    href: "#pre-events",
  },
  {
    id: "volunteer",
    title: "VOLUNTEER",
    description: "Help build the experience from inside — the Headstart way.",
    cta: "Volunteer",
    href: "#get-involved",
  },
];

export const faqs = [
  {
    question: "What is the event?",
    answer:
      "Frontier Tech Week is a flagship Headstart gathering designed to bring India's startup ecosystem together — founders, investors, operators, corporates, researchers, policymakers and community builders — for a concentrated, high-signal experience.",
  },
  {
    question: "Who should attend?",
    answer:
      "Founders, investors, operators, corporates, researchers, policymakers, accelerators, incubators, universities, startup communities, media and technology companies. If you build, fund, enable or study India's startup ecosystem — this is for you.",
  },
  {
    question: "When and where is it happening?",
    answer:
      "December 2026 in India. Exact dates, city and venue will be announced. Pre-events and side events will activate across multiple cities leading into the main gathering.",
  },
  {
    question: "How can I register?",
    answer:
      "Registration details will open soon. Join the interest list via the Register CTA to be notified when applications and tickets go live.",
  },
  {
    question: "How can my startup participate?",
    answer:
      "Startups can apply to the showcase, request matchmaking, attend sessions and host or join side events. Showcase applications will open when the programme is announced.",
  },
  {
    question: "How can investors participate?",
    answer:
      "Investors can register for the gathering, host office hours, join capital conversations and participate in curated introductions. Dedicated investor access details will be shared closer to the event.",
  },
  {
    question: "How can I become a partner?",
    answer:
      "Organisations can partner across title, strategic, ecosystem, community and media categories. Reach out via the Become a Partner CTA and we'll share the partnership brief.",
  },
  {
    question: "Can my community host a pre-event?",
    answer:
      "Yes. Communities, accelerators, universities and local organisers can apply to host official pre-events and side events. Use the Host a Pre-Event CTA to start the conversation.",
  },
  {
    question: "Can I volunteer?",
    answer:
      "Absolutely. Headstart is volunteer-driven at its core. Volunteer applications will open as the programme builds — join via Get Involved.",
  },
  {
    question: "Will there be side events?",
    answer:
      "Yes. The official ecosystem extends beyond the main venue — founder dinners, investor gatherings, community meetups, workshops, hackathons, campus activations and partner events across the city.",
  },
  {
    question: "When will the agenda be announced?",
    answer:
      "A detailed agenda will be published as speakers, tracks and session formats are confirmed. The structure on this page reflects the intended experience and will be updated.",
  },
  {
    question: "When will speakers be announced?",
    answer:
      "Speakers will be announced in waves as confirmations land. Follow Headstart channels and this page for updates.",
  },
];

export const footerLinks = {
  explore: [
    { label: "About", href: "#manifesto" },
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Tracks", href: "#tracks" },
    { label: "Pre-Events", href: "#pre-events" },
    { label: "Side Events", href: "#side-events" },
    { label: "Partners", href: "#partners" },
    { label: "Volunteer", href: "#get-involved" },
    { label: "FAQ", href: "#faq" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/headstartnetwork/" },
    { label: "Instagram", href: "https://www.instagram.com/headstartnetwork/" },
    { label: "X", href: "https://x.com/headstart" },
    { label: "YouTube", href: "https://www.youtube.com/@headstartnetwork" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
  ],
};

export const contactEmail = "hello@headstart.co.in";
