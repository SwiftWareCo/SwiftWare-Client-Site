import React from "react";
import { CapabilityTile } from "@/types/content";

export default function CapabilitiesGrid({ tiles }: { tiles: CapabilityTile[] }) {
  return (
    <section id="capabilities" className="py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiles.map((t, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm opacity-80 mt-1">{t.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


