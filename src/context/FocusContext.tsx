"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FocusKey, getSavedFocus, saveFocus } from "@/lib/useFocus";

interface FocusContextValue {
  focus: FocusKey | null;
  setFocus: (focus: FocusKey) => void;
  clearFocus: () => void;
}

const FocusContext = createContext<FocusContextValue | undefined>(undefined);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocusState] = useState<FocusKey | null>(null);

  useEffect(() => {
    const initial = getSavedFocus();
    if (initial) setFocusState(initial);
  }, []);

  const setFocus = useCallback((next: FocusKey) => {
    setFocusState(next);
    saveFocus(next);
  }, []);

  const clearFocus = useCallback(() => {
    setFocusState(null);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("swiftware.focus.v1");
      } catch {
        // ignore
      }
    }
  }, []);

  const value = useMemo<FocusContextValue>(() => ({ focus, setFocus, clearFocus }), [focus, setFocus, clearFocus]);

  return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>;
}

export function useFocusContext(): FocusContextValue {
  const ctx = useContext(FocusContext);
  if (!ctx) throw new Error("useFocusContext must be used within a FocusProvider");
  return ctx;
}


