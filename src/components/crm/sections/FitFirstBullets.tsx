import React from "react";

type Item = { icon?: string; label: string; shortLine: string };

export default function FitFirstBullets({ items }: { items: Item[] }) {
  return (
    <section id="fit-bullets" className="py-12">
      <div className="max-w-5xl mx-auto grid gap-4">
        {items.map((it, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="font-medium">{it.label}</p>
            <p className="text-sm opacity-80">{it.shortLine}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


