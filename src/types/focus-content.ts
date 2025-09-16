export type FocusKey = "crm" | "tee-sheet" | "ai-ml" | "web";

export type CapabilityTile = {
  title: string;
  summary: string;
  icon?: string;         // Lucide icon name, e.g., "Clipboard", "Calendar"
  cta?: string;
  href?: string;
  badges?: string[];     // Optional pills like ["Offline", "RLS"]
  highlight?: boolean;   // For “Build on request” style
};

export type Outcome = {
  metric: string;
  unit?: string;
  timeframe?: string;
  blurb: string;
  footnote?: string;
};

export type FocusContent = {
  focus: FocusKey;
  subline: string;
  bullets: { label: string; shortLine: string; icon?: string }[];
  capabilities: CapabilityTile[];
  outcomes: Outcome[];
  modules: string[];
};


