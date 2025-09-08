"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import TypingHeadline from "@/components/hero/TypingHeadline";
import DesktopBridgeShowcase from "@/components/hero/DesktopBridgeShowcase";
import LaptopSyncTile from "@/components/hero/LaptopSyncTile";

const HEADLINE = "Software. Made to fit.";

export default function Hero() {
  const reduce = useReducedMotion();
  const stripes = useMemo(() => [4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92], []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative mx-auto max-w-[92rem] px-4 sm:px-6 pt-40 sm:pt-48 pb-14 sm:pb-16"
    >
      {/* backdrop lines */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 420px at 50% -10%, rgba(59,130,246,.14), transparent 60%)",
            opacity: 0.7,
          }}
        />
        {!reduce &&
          stripes.map((left, i) => (
            <div key={left}>
              <motion.span
                className="absolute top-[-130%] h-[240%] w-px"
                style={{
                  left: `${left}%`,
                  background:
                    "linear-gradient(180deg, transparent, rgba(59,130,246,.22), rgba(168,85,247,.22), transparent)",
                  opacity: 0.22,
                }}
                initial={{ y: 0 }}
                animate={{ y: "18%" }}
                transition={{
                  duration: 12 + i * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
              <motion.span
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  left: `calc(${left}% - 3px)`,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,.85) 0%, rgba(59,130,246,.8) 40%, rgba(168,85,247,.0) 70%)",
                  filter: "drop-shadow(0 0 8px rgba(99,102,241,.8))",
                }}
                initial={{ top: "-10%", opacity: 0.6 }}
                animate={{ top: "110%", opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 5.5 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            </div>
          ))}
      </div>

      <div
        className="
          grid gap-6 lg:gap-8
          place-items-center
          md:place-items-stretch
          md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
          xl:min-h-[560px]
        "
      >
        {/* LEFT — center on phone; vertically center on xl+ */}
        <div className="relative justify-self-center md:justify-self-auto text-center md:text-left xl:flex xl:flex-col xl:justify-center">
          <p className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-zinc-400">
            Swiftware
            <span className="inline-block h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            Digital craftsmanship
          </p>

          <h1 id="hero-heading" className="mt-2">
            <TypingHeadline
              text={HEADLINE}
              className="text-[1.35rem] sm:text-[1.65rem] lg:text-[2.1rem] font-bold leading-tight"
              step={0.065}
              blinkPeriod={2}
            />
          </h1>

          <motion.div
            initial={reduce ? { opacity: 1 } : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.45 }}
            className="mt-4 flex flex-wrap items-center gap-3 justify-center md:justify-start"
          >
            <Link
              href="/?contact=open"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-medium text-white ring-1 ring-zinc-800"
              style={{ background: "linear-gradient(90deg, rgb(59 130 246), rgb(168 85 247))" }}
              aria-label="Start your project"
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-blue-500/0"
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              Start your project
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              See our work
              <Play className="size-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — <xl compact tile; ≥xl desktop bridge */}
        <div className="relative justify-self-center md:justify-self-auto w-full">
          <div className="xl:hidden w-full max-w-[min(90vw,520px)] mx-auto">
            <LaptopSyncTile />
          </div>
          <div className="hidden xl:block">
            <DesktopBridgeShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
