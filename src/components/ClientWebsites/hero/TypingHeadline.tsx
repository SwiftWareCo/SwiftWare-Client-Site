"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  step?: number;          // seconds per char
  blinkPeriod?: number;   // extra time budget for blinks
};

export default function TypingHeadline({
  text,
  className = "",
  step = 0.065,
  blinkPeriod = 2,
}: Props) {
  const reduce = useReducedMotion();
  const chars = useMemo(() => text.split(""), [text]);
  const total = step * chars.length;

  if (reduce) {
    return (
      <span className={className}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">
          {text}
        </span>
        <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-white/90 animate-pulse align-middle" />
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span className="relative inline-flex flex-wrap items-baseline lg:whitespace-nowrap">
        {chars.map((ch, i) => (
          <span key={`${ch}-${i}`} className="relative inline-block">
            {/* reveal the character */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * step, duration: 0.001 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>

            {/* caret that follows this char WITHOUT affecting layout */}
            {i < chars.length - 1 && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-full top-0 ml-[1px] inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  delay: i * step + 0.02,
                  duration: Math.max(0.04, step * 0.8),
                  ease: "easeInOut",
                }}
              />
            )}
          </span>
        ))}

        {/* final, blinking caret that stays at the end forever */}
        <motion.span
          aria-hidden
          className="ml-[2px] inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0, 1, 0, 1] }}
          transition={{
            duration: total + blinkPeriod,
            times: [
              0,
              total / (total + blinkPeriod),
              total / (total + blinkPeriod),
              (total + 0.5) / (total + blinkPeriod),
              (total + 1.0) / (total + blinkPeriod),
              (total + 1.5) / (total + blinkPeriod),
              1,
            ],
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </span>
    </span>
  );
}


