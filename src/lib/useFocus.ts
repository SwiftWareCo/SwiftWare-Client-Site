"use client";

export type FocusKey = "crm" | "tee-sheet" | "ai-ml" | "web";

const STORAGE_KEY = "swiftware.focus.v1";

export function isValidFocus(value: unknown): value is FocusKey {
  return value === "crm" || value === "tee-sheet" || value === "ai-ml" || value === "web";
}

export function getSavedFocus(): FocusKey | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isValidFocus(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function saveFocus(focus: FocusKey): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, focus);
  } catch {
    // ignore write errors
  }
}


