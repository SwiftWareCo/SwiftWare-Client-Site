// types/content.ts

export type CapabilityTile = {
  title: string;
  summary: string;
  icon?: string;
  cta?: string;
  href?: string;
  badges?: string[];
  highlight?: boolean;
  category?: string; // e.g., "Essentials", "Advanced", "Integrations" (default: Essentials)
};

export type Outcome = {
  metric: string; // e.g., "-42%"
  unit?: string; // e.g., "dispatch time"
  timeframe?: string;
  blurb: string; // one-liner reason
  footnote?: string;
};

export type FocusKey = 'crm' | 'tee-sheet' | 'ai-ml' | 'web' | 'all-solutions';

export type FocusContent = {
  focus: FocusKey;
  hero: {
    subline: string; // short, 9–12 words
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
  bullets: { icon?: string; label: string; shortLine: string }[];
  capabilities: CapabilityTile[];
  modules: string[]; // feature modules to mount later (names only)
  outcomes: Outcome[];
  faq?: { q: string; a: string }[];
  engagement?: {
    variants: { name: string; highlight: string; details?: string[] }[];
  };
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
};
