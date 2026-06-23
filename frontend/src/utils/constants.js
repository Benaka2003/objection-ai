export const API_BASE = "http://localhost:3001";

export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "analytics", label: "Analytics" },
  { key: "history", label: "History" },
  { key: "settings", label: "Settings" },
];

export const STYLE_THEME = {
  empathetic: {
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.35)",
    bg: "rgba(124,58,237,0.08)",
    label: "Empathetic",
  },
  logical: {
    color: "#60A5FA",
    glow: "rgba(96,165,250,0.35)",
    bg: "rgba(59,130,246,0.08)",
    label: "Logical",
  },
  assertive: {
    color: "#FB923C",
    glow: "rgba(251,146,60,0.35)",
    bg: "rgba(251,146,60,0.08)",
    label: "Assertive",
  },
};

export const CATEGORY_COLORS = {
  price: "#8B5CF6",
  trust: "#3B82F6",
  timing: "#10B981",
  authority: "#FB923C",
};

export const EXAMPLE_OBJECTIONS = [
  "Your product is too expensive",
  "I need to check with my manager first",
  "We're already using a competitor",
  "I don't see how this is different from what we have",
];

export const MAX_OBJECTION_CHARS = 600;
