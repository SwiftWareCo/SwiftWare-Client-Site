"use client";

import { motion, useReducedMotion } from "motion/react";

export default function LaptopSyncTile() {
  const reduce = useReducedMotion();
  const DURATION = 8;

  return (
    <div
      className="
        relative rounded-2xl border border-zinc-800
        bg-zinc-950/80 backdrop-blur p-2 sm:p-3
        shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]
        w-full max-w-[520px]
      "
    >
      <div className="relative aspect-[16/10] rounded-xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 260px at 50% -10%, rgba(59,130,246,.12), transparent 60%)",
          }}
        />

        {/* concentric rings + floating packet */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]">
            <motion.div
              className="absolute inset-0 rounded-full border border-zinc-700/60"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: DURATION, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-6 rounded-full border border-zinc-700/40"
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: DURATION * 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-[10px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,.55), rgba(168,85,247,.55))",
                boxShadow: "0 12px 32px rgba(99,102,241,0.35)",
              }}
              animate={reduce ? {} : { y: [0, -6, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
