"use client";

import { useState, useEffect } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp(
  isInView: boolean,
  options: UseCountUpOptions
): string {
  const {
    start = 0,
    end,
    duration = 2,
    delay = 0,
    decimals = 0,
    suffix = "",
    prefix = "",
  } = options;

  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const startValue = start;

      const updateValue = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // Ease out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (end - startValue) * easedProgress;

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      requestAnimationFrame(updateValue);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, start, end, duration, delay]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toString();

  return `${prefix}${formattedValue}${suffix}`;
}
