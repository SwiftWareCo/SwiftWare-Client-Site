"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function DesktopBridgeShowcase() {
  const reduce = useReducedMotion();

  // Global loop + windows
  const DURATION = 16; // 0–0.2 desktop load → 0.2–0.3 travel → 0.3–0.5 phone load → 0.5–0.6 travel back
  const LOAD_A = 0.2; // desktop loading ends
  const LOAD_B = 0.5; // phone loading ends
  const FADE = 0.06; // quicker, identical fades

  // Packet windows
  const PACKET_FWD_START = LOAD_A;        // 0.2 → 0.3
  const PACKET_FWD_END   = LOAD_A + 0.1;
  const PACKET_BACK_START = LOAD_B;       // 0.5 → 0.6
  const PACKET_BACK_END   = LOAD_B + 0.1;

  // anchors to compute an exact curve from monitor-screen center to phone-screen center
  const stageRef = useRef<HTMLDivElement | null>(null);
  const startAnchorRef = useRef<HTMLDivElement>(null); // monitor screen center
  const endAnchorRef = useRef<HTMLDivElement>(null);   // phone screen center
  const [pathD, setPathD] = useState<string>("");

  useEffect(() => {
    const recompute = () => {
      const stage = stageRef.current, a = startAnchorRef.current, b = endAnchorRef.current;
      if (!stage || !a || !b) return;

      const sr = stage.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      const sx = ar.left + ar.width / 2 - sr.left;
      const sy = ar.top + ar.height / 2 - sr.top;
      const ex = br.left + br.width / 2 - sr.left;
      const ey = br.top + br.height / 2 - sr.top;

      const dx = ex - sx;
      const arch = Math.max(60, Math.abs(dx) * 0.16);
      const c1x = sx + dx * 0.35;
      const c2x = sx + dx * 0.7;
      const c1y = Math.min(sy, ey) - arch;
      const c2y = Math.min(sy, ey) - arch * 0.9;

      setPathD(`M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`);
    };

    recompute();
    const ro =
      typeof window !== "undefined" && "ResizeObserver" in window
        ? new ResizeObserver(recompute)
        : null;
    if (stageRef.current) ro?.observe(stageRef.current as Element);
    if (startAnchorRef.current) ro?.observe(startAnchorRef.current as Element);
    if (endAnchorRef.current) ro?.observe(endAnchorRef.current as Element);
    window.addEventListener("resize", recompute, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45 }}
      className="
        relative rounded-2xl border border-zinc-800
        bg-zinc-950/80 backdrop-blur shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]
        p-2 sm:p-3 overflow-visible w-full
      "
    >
      <div
        ref={stageRef}
        className="relative aspect-[16/9] lg:aspect-[5/3] min-h-[240px] sm:min-h-[280px] lg:min-h-[300px]
                   rounded-xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden"
      >
        {/* Monitor (left, centered vertically) */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-[clamp(200px,48%,360px)] lg:left-4">
          <MonitorFrame>
            <MonitorScreen
              duration={DURATION}
              centerRef={startAnchorRef}
              loadEnd={LOAD_A}
              fade={FADE}
            />
          </MonitorFrame>
        </div>

        {/* Phone (right, centered vertically) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[clamp(100px,22%,140px)] lg:right-4">
          <PhoneFrame>
            <PhoneScreen
              duration={DURATION}
              centerRef={endAnchorRef}
              fadeInStart={PACKET_FWD_END}
              fadeOutStart={LOAD_B}
              fade={FADE}
            />
          </PhoneFrame>
        </div>

        {/* Connector + packets */}
        {!reduce && pathD && (
          <>
            <svg className="absolute inset-0 w-full h-full" aria-hidden>
              <path
                d={pathD}
                fill="none"
                stroke="rgba(99,102,241,.35)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="8 12"
                style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,.35))" }}
              />
            </svg>

            {/* Desktop -> Phone (aligned with LOAD_A 0.2–0.3) */}
            <Packet
              pathD={pathD}
              duration={DURATION}
              times={[0, PACKET_FWD_START, PACKET_FWD_END, 1]}
              forward
            />
            {/* Phone -> Desktop (aligned with LOAD_B 0.5–0.6) */}
            <Packet
              pathD={pathD}
              duration={DURATION}
              times={[0, PACKET_BACK_START, PACKET_BACK_END, 1]}
              forward={false}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- Monitor (window + loading overlay only) ---------- */

function MonitorFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="rounded-[1.2rem] border border-zinc-700 bg-zinc-950 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)] p-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
          <div className="rounded-md border border-zinc-800/70 bg-zinc-950/80 p-2 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      {/* Stand */}
      <div className="absolute left-1/2 -bottom-4 h-4 w-2 -translate-x-1/2 rounded bg-zinc-700" />
      <div className="absolute left-1/2 -bottom-7 h-3 w-24 -translate-x-1/2 rounded-lg bg-zinc-800 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.6)]" />
    </div>
  );
}

function MonitorScreen({
  duration,
  centerRef,
  loadEnd,
  fade,
}: {
  duration: number;
  centerRef: React.RefObject<HTMLDivElement | null>;
  loadEnd: number;
  fade: number;
}) {
  return (
    <div className="relative h-[150px] sm:h-[170px] lg:h-[190px]">
      {/* path anchor */}
      <div ref={centerRef} className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2" />

      {/* simple window */}
      <div className="absolute inset-2 rounded-lg border border-zinc-800/70 bg-zinc-900/70 p-3">
        <div className="mb-3 flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-500/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-500/70" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md border border-zinc-800/60 bg-zinc-950/60" />
          ))}
        </div>
      </div>

      {/* Desktop loading: visible until loadEnd, quick fade out; fade back in before loop */}
      <motion.div
        className="absolute inset-0 grid place-items-center bg-zinc-950/80 backdrop-blur-[1px]"
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{
          duration,
          times: [0, loadEnd, loadEnd + fade, 1 - fade, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <MonitorLoadingCore duration={duration} progressTimes={[0, loadEnd]} />
      </motion.div>
    </div>
  );
}

/* ---------- Phone (apps + synced loading overlay) ---------- */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.7rem] border border-zinc-700 bg-zinc-900 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
      <div className="h-2.5 w-14 mx-auto mb-1.5 rounded-full bg-zinc-700" />
      <div className="relative">
        <div className="aspect-[9/19] rounded-[1.1rem] border border-zinc-800/60 bg-zinc-950/70 overflow-hidden">
          <div className="absolute inset-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

function PhoneScreen({
  duration,
  centerRef,
  fadeInStart,
  fadeOutStart,
  fade,
}: {
  duration: number;
  centerRef: React.RefObject<HTMLDivElement | null>;
  fadeInStart: number;   // when packet finishes arriving (e.g., 0.3)
  fadeOutStart: number;  // when phone finishes loading (e.g., 0.5)
  fade: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0">
      {/* path anchor */}
      <div ref={centerRef} className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2" />

      {/* normal apps */}
      <motion.div
        className="grid grid-cols-3 gap-2 p-2"
        animate={reduce ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-9 rounded-md"
            style={{
              background:
                "linear-gradient(180deg, rgb(59 130 246 / .20), rgb(168 85 247 / .20))",
            }}
          />
        ))}
      </motion.div>

      {/* Phone loading: fades in right after packet arrives, fades out right after progress finishes */}
      <motion.div
        className="absolute inset-0 grid place-items-center bg-zinc-950/80 backdrop-blur-[1px]"
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{
          duration,
          times: [0, fadeInStart, fadeInStart + fade, fadeOutStart, fadeOutStart + fade, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <PhoneLoadingCore duration={duration} progressTimes={[fadeInStart, fadeOutStart]} />
      </motion.div>
    </div>
  );
}

/* ---------- Monitor-specific loading ---------- */

function MonitorLoadingCore({
  duration,
  progressTimes,
}: {
  duration: number;
  progressTimes: [number, number];
}) {
  const [pStart, pEnd] = progressTimes;
  return (
    <div className="w-full max-w-[320px] px-6">
      <motion.div
        className="mx-auto mb-4 flex items-center justify-center gap-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-blue-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <span className="text-sm text-zinc-300 ml-2">Processing data...</span>
      </motion.div>

      <div className="h-2 rounded bg-zinc-800/60 overflow-hidden">
        <motion.div
          className="h-full rounded"
          style={{
            background:
              "linear-gradient(90deg, rgb(59 130 246 / .75), rgb(168 85 247 / .75))",
          }}
          animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
          transition={{
            duration,
            times: [0, pStart, pEnd, pEnd + 0.001, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}

/* ---------- Phone-specific loading ---------- */

function PhoneLoadingCore({
  duration,
  progressTimes,
}: {
  duration: number;
  progressTimes: [number, number];
}) {
  const [pStart, pEnd] = progressTimes;
  return (
    <div className="w-full max-w-[200px] px-4">
      <motion.div
        className="mx-auto mb-4 flex flex-col items-center gap-2"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="h-6 w-6 rounded-full border-2 border-purple-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-xs text-zinc-300">Syncing...</span>
      </motion.div>

      <div className="h-1.5 rounded bg-zinc-800/60 overflow-hidden">
        <motion.div
          className="h-full rounded"
          style={{
            background:
              "linear-gradient(90deg, rgb(168 85 247 / .75), rgb(59 130 246 / .75))",
          }}
          animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
          transition={{
            duration,
            times: [0, pStart, pEnd, pEnd + 0.001, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}

/* ---------- Packet helper (uses measured px path) ---------- */

function Packet({
  pathD,
  duration,
  times,
  forward,
}: {
  pathD: string;
  duration: number;
  times: number[]; // [start, visibleStart, visibleEnd, end] normalized
  forward: boolean;
}) {
  return (
    <motion.span
      aria-hidden
      className="absolute h-2.5 w-8 rounded-md"
      style={{
        background: forward
          ? "linear-gradient(90deg, rgba(59,130,246,0), rgba(59,130,246,.95), rgba(168,85,247,0))"
          : "linear-gradient(90deg, rgba(168,85,247,0), rgba(168,85,247,.95), rgba(59,130,246,0))",
        filter: "drop-shadow(0 0 12px rgba(99,102,241,.75))",
        offsetPath: `path("${pathD}")`,
        offsetRotate: "auto",
      }}
      animate={{
        offsetDistance: forward
          ? ["0%", "0%", "100%", "100%"]
          : ["100%", "100%", "0%", "0%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration, times, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
