"use client";
import React, { useMemo, useState, useCallback, useId, KeyboardEvent } from "react";
import type { CapabilityTile } from "@/types/content";
import { motion, useReducedMotion } from "motion/react";
import Icon from "@/components/ui/Icon";
import clsx from "clsx";

type Props = { tiles: CapabilityTile[]; title?: string };

const PREFERRED_ORDER = ["Essentials", "Advanced", "Integrations"];

function sortCategories(categories: string[]): string[] {
  const preferred = categories.filter((c) => PREFERRED_ORDER.includes(c));
  const remaining = categories.filter((c) => !PREFERRED_ORDER.includes(c)).sort((a, b) => a.localeCompare(b));
  const ordered: string[] = [];
  for (const name of PREFERRED_ORDER) if (preferred.includes(name)) ordered.push(name);
  return [...ordered, ...remaining];
}

function getCategory(tile: CapabilityTile): string {
  return tile.category?.trim() || "Essentials";
}

export default function CapabilitiesSection({ tiles, title = "Capabilities" }: Props) {
  const reduce = useReducedMotion() ?? false;
  const stableId = useId();

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(tiles.map(getCategory)));
    return sortCategories(uniq);
  }, [tiles]);

  const [activeIdx, setActiveIdx] = useState(0);
  const activeCategory = categories[activeIdx] ?? categories[0] ?? "Essentials";

  const onKeyDownTabs = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (categories.length === 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % categories.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + categories.length) % categories.length);
    }
  }, [categories.length]);

  const filtered = useMemo(
    () => tiles.filter((t) => getCategory(t) === activeCategory),
    [tiles, activeCategory]
  );

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 id="capabilities-heading" className="text-xl font-semibold mb-4">{title}</h2>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Capability categories"
          className="flex items-center gap-2 mb-6"
          onKeyDown={onKeyDownTabs}
        >
          {categories.map((cat, idx) => {
            const selected = idx === activeIdx;
            const tabId = `${stableId}-tab-${idx}`;
            const panelId = `${stableId}-panel-${idx}`;
            return (
              <button
                key={cat}
                id={tabId}
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIdx(idx)}
                className={clsx(
                  "rounded-lg px-3.5 py-2 text-sm",
                  selected
                    ? "bg-white/10 text-white ring-1 ring-white/20"
                    : "bg-white/5 text-zinc-300 hover:bg-white/7"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          id={`${stableId}-panel-${activeIdx}`}
          role="tabpanel"
          aria-labelledby={`${stableId}-tab-${activeIdx}`}
        >
          {/* Mobile: horizontal snap carousel */}
          <div className="lg:hidden -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            <ul role="list" className="flex gap-4 snap-x snap-mandatory py-1">
              {filtered.map((t, i) => (
                <li key={i} className="snap-start shrink-0" style={{ minWidth: 280 }}>
                  <CapabilityCard tile={t} index={i} reduce={reduce} asLink />
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: 3-col grid; highlight spans 2 cols */}
          <ul role="list" className="hidden lg:grid grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <li key={i} className={clsx(t.highlight && "col-span-2")}> 
                <CapabilityCard tile={t} index={i} reduce={reduce} asLink />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ tile, index, reduce, asLink }: { tile: CapabilityTile; index: number; reduce: boolean; asLink?: boolean }) {
  const content = (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
      className={clsx(
        "relative rounded-xl border border-white/10 border-t-transparent bg-white/[0.04] p-5",
        "outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "transition-transform will-change-transform",
        "hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
      )}
      aria-label={tile.cta ? `${tile.title} — ${tile.cta}` : tile.title}
    >
      {/* hairline accent */}

      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-lg p-2 bg-white/5 border border-white/10">
          <Icon name={tile.icon} className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug">{tile.title}</h3>
          <p className="text-sm opacity-80 mt-1 max-h-[3.25rem] overflow-hidden">{tile.summary}</p>

          {/* Badge footer: fixed height */}
          <div className="mt-3 flex items-center justify-between h-6">
            {/* Left: first badge or spacer */}
            {tile.badges?.length ? (
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] uppercase tracking-wide opacity-80 truncate max-w-[70%]">
                {tile.badges[0]}
              </span>
            ) : (
              <span aria-hidden className="inline-block opacity-0 select-none">spacer</span>
            )}

            {/* Right: +N or invisible 0 to preserve width */}
            {tile.badges && tile.badges.length > 1 ? (
              <span className="text-[11px] opacity-80">+{tile.badges.length - 1}</span>
            ) : (
              <span aria-hidden className="opacity-0">0</span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );

  if (asLink && tile.href) {
    return (
      <a href={tile.href} className="block rounded-xl outline-none">{content}</a>
    );
  }
  return content;
}


