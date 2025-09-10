"use client";

import { useMemo } from "react";
import { useFocusContext } from "@/context/FocusContext";
import VerticalRenderer from "@/components/VerticalRenderer";

export default function FocusAwareHome() {
  const { focus } = useFocusContext();

  const copy = useMemo(() => {
    switch (focus) {
      case "crm":
        return "CRMs that field teams actually use.";
      case "tee-sheet":
        return "Operations that run themselves.";
      case "ai-ml":
        return "AI where it matters (RAG, workflows).";
      case "web":
        return "Websites & portals that convert.";
      default:
        return "Choose a focus to tailor the content.";
    }
  }, [focus]);

  return (
    <section aria-live="polite" className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <p className="text-sm text-zinc-300">
          {copy}
        </p>
      </div>

      {/* Vertical-specific content mounts below, using existing Hero above */}
      <div className="mt-4">
        <VerticalRenderer />
      </div>
    </section>
  );
}


