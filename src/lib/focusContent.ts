import type { FocusContent, FocusKey } from "@/types/content";

// Client-side content map via static JSON imports
// NOTE: relies on tsconfig resolveJsonModule=true
// Relative path: from src/lib → project root → content/crm.json
import crmJson from "../../content/crm.json" assert { type: "json" };

export function getContentForFocusClient(focus: FocusKey | null): FocusContent | null {
  if (focus === "crm") return crmJson as FocusContent;
  return null;
}


