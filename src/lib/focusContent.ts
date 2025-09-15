import type { FocusContent, FocusKey } from '@/types/content';

// Client-side content map via static JSON imports
// NOTE: relies on tsconfig resolveJsonModule=true
// Relative path: from src/lib → project root → content/
import crmJson from '../../content/crm.json' assert { type: 'json' };
import aiMlJson from '../../content/ai-ml.json' assert { type: 'json' };

export function getContentForFocusClient(
  focus: FocusKey | null
): FocusContent | null {
  if (focus === 'crm') return crmJson as FocusContent;
  if (focus === 'ai-ml') return aiMlJson as FocusContent;
  return null;
}
