import React from "react";
import { Outcome } from "@/types/content";

export default function OutcomeSnapshots({ items }: { items: Outcome[] }) {
  return (
    <section id="outcomes" className="py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {items.map((o, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-3xl font-bold">{o.metric}</div>
            <div className="opacity-80">{o.unit}</div>
            <p className="text-sm opacity-80 mt-2">{o.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


