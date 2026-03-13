import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BellRing,
  ChartSpline,
  CircleUserRound,
  Command,
  CreditCard,
  LayoutDashboard,
  Link2,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export const appName = "Blink";

export type NavItem = {
  href: string;
  label: string;
  icon?: LucideIcon;
};

export type LinkStatus = "Active" | "Scheduled" | "Needs review";

export const marketingNav: NavItem[] = [
  { href: "/", label: "Overview" },
  { href: "/pricing", label: "Pricing" },
  { href: "/sign-in", label: "Sign in" },
];

export const guestFlowHighlights = [
  "Paste a long URL and get a short one instantly",
  "Use up to 10 links for free as a guest",
  "Log in after the free tier expires to keep using it forever",
];

export const dashboardNav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/create", label: "Create link", icon: Plus },
  { href: "/dashboard/links", label: "Links", icon: Link2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/profile", label: "Profile", icon: CircleUserRound },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const marketingStats = [
  { label: "Free guest links", value: "10" },
  { label: "Logged-in plan", value: "Forever free" },
  { label: "What it does", value: " Fast shorten" },
];

export const featureCards = [
  {
    title: "Link operations that stay readable",
    description:
      "Create, review, and manage short links with an interface built like a product dashboard, not a utility form.",
    icon: Command,
  },
  {
    title: "Analytics your team can actually use",
    description:
      "Trend lines, source mix, recent activity, and link-level insights are surfaced from the first screen.",
    icon: ChartSpline,
  },
  {
    title: "Designed for guest-first onboarding",
    description:
      "The product makes anonymous creation feel native while clearly guiding people into account upgrades.",
    icon: Zap,
  },
  {
    title: "Trust and control built into the UX",
    description:
      "Visible status states, destination previews, and alert patterns make the platform feel reliable immediately.",
    icon: ShieldCheck,
  },
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Use 10 links as a guest, then log in to keep creating short URLs for free.",
    features: ["10 guest links", "Forever free after login", "Simple URL management", "Analytics after login"],
  },
  {
    name: "Growth",
    price: "$12/mo",
    description: "Built for creators and small teams who need more control and cleaner reporting.",
    features: ["Unlimited links", "Advanced filters", "Priority support", "Custom branding placeholders"],
  },
  {
    name: "Scale",
    price: "$49/mo",
    description: "For teams that want operational visibility, governance, and heavier traffic management.",
    features: ["Team seats", "Audit-ready dashboards", "Webhook placeholders", "Premium support"],
  },
];

export const dashboardMetrics = [
  { label: "Total clicks", value: "128.2k", change: "+14.8%" },
  { label: "Links managed", value: "42", change: "+8 new" },
  { label: "Best source", value: "Instagram", change: "38% share" },
  { label: "Plan", value: "Forever free", change: "Logged in" },
];

export const guestLinks = [
  { slug: "launch-01", url: "https://acme.com/spring-launch" },
  { slug: "kit-02", url: "https://acme.com/creator-kit" },
  { slug: "note-03", url: "https://acme.com/founder-note" },
  { slug: "event-04", url: "https://acme.com/event-pass" },
  { slug: "offer-05", url: "https://acme.com/offer" },
  { slug: "bio-06", url: "https://acme.com/bio" },
  { slug: "press-07", url: "https://acme.com/press" },
];

export const clicksTrend = [
  { name: "Mon", clicks: 4200, conversions: 880 },
  { name: "Tue", clicks: 5200, conversions: 1020 },
  { name: "Wed", clicks: 4900, conversions: 970 },
  { name: "Thu", clicks: 6100, conversions: 1280 },
  { name: "Fri", clicks: 7200, conversions: 1420 },
  { name: "Sat", clicks: 6600, conversions: 1180 },
  { name: "Sun", clicks: 5800, conversions: 1040 },
];

export const trafficSources = [
  { name: "Instagram", value: 38, fill: "var(--color-chart-1)" },
  { name: "WhatsApp", value: 24, fill: "var(--color-chart-2)" },
  { name: "Direct", value: 18, fill: "var(--color-chart-3)" },
  { name: "X / Twitter", value: 12, fill: "var(--color-chart-4)" },
  { name: "Other", value: 8, fill: "var(--color-chart-5)" },
];

export const shortLinks = [
  {
    id: "lnk_1",
    slug: "spring-launch",
    title: "Spring campaign launch",
    destination: "https://acme.com/launch",
    status: "Active" as LinkStatus,
    clicks: 18432,
    updatedAt: "2h ago",
    source: "Instagram",
  },
  {
    id: "lnk_2",
    slug: "founder-note",
    title: "Founder note",
    destination: "https://acme.com/blog/founder-note",
    status: "Scheduled" as LinkStatus,
    clicks: 924,
    updatedAt: "6h ago",
    source: "Email",
  },
  {
    id: "lnk_3",
    slug: "qr-event-pass",
    title: "Offline event QR",
    destination: "https://acme.com/events/pass",
    status: "Needs review" as LinkStatus,
    clicks: 2487,
    updatedAt: "1d ago",
    source: "QR",
  },
  {
    id: "lnk_4",
    slug: "creator-kit",
    title: "Creator toolkit",
    destination: "https://acme.com/toolkit",
    status: "Active" as LinkStatus,
    clicks: 6122,
    updatedAt: "3d ago",
    source: "Direct",
  },
];

export const activityFeed = [
  {
    title: "Traffic spike detected",
    description: "spring-launch is trending 42% above its usual hourly pattern.",
    time: "4 min ago",
    icon: BellRing,
  },
  {
    title: "Logged-in workspace active",
    description: "Analytics and link history are now available because this account is signed in.",
    time: "18 min ago",
    icon: Sparkles,
  },
  {
    title: "Link requires review",
    description: "qr-event-pass has a destination mismatch warning in the mock resolver flow.",
    time: "1 hr ago",
    icon: ShieldCheck,
  },
];

export const profileSummary = {
  name: "Lokeshwar Rao",
  role: "Product builder",
  email: "lokeshwar@example.com",
  location: "Bengaluru, India",
  plan: "Starter",
  streak: "12 days shipping",
};

export const settingsSections = [
  {
    title: "Workspace defaults",
    description: "Brand tone, slug pattern, and analytics display preferences.",
  },
  {
    title: "Notifications",
    description: "Traffic alerts, quota warnings, and activity summaries.",
  },
  {
    title: "Billing placeholders",
    description: "Reserved for upgrade plans, invoices, and subscription actions.",
  },
];

export const createLinkChecklist = [
  "Readable custom alias",
  "Destination preview before publish",
  "Clean destination info",
  "Analytics available after login",
];

export const resolverSignals = [
  "Verified destination preview",
  "Campaign context panel",
  "Safe redirect handoff",
];

export const quickActions = [
  { title: "Create short link", href: "/dashboard/create", icon: Plus },
  { title: "Review analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Manage billing", href: "/pricing", icon: CreditCard },
];
