"use client";
import * as Lucide from "lucide-react";
import React from "react";

/**
 * Icon wrapper that resolves a Lucide icon by name at runtime.
 * If not found, falls back to Sparkles.
 */
export default function Icon({
  name,
  className = "w-5 h-5",
  "aria-hidden": ariaHidden = true
}: { name?: string; className?: string; "aria-hidden"?: boolean }) {
  if (!name) {
    const Fallback = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>>)["Sparkles"] ?? (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>>).Circle;
    return <Fallback className={className} aria-hidden={ariaHidden} />;
  }
  const Comp = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>>)[name];
  const Resolved = Comp ?? (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>>)["Sparkles"] ?? (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>>).Circle;
  return <Resolved className={className} aria-hidden={ariaHidden} />;
}


