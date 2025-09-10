// lib/content.ts
import { FocusContent } from "@/types/content";
import fs from "node:fs";
import path from "node:path";

export function loadFocusContent(key: string): FocusContent {
  const filepath = path.join(process.cwd(), "content", `${key}.json`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const data = JSON.parse(raw) as FocusContent;

  // minimal runtime checks
  if (data.focus !== key) throw new Error(`Focus mismatch in ${key}.json`);
  if (!data.hero?.subline) throw new Error(`Missing hero.subline in ${key}.json`);
  return data;
}


