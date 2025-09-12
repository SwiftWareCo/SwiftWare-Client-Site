import React, { useState, useEffect } from "react";
import { motion} from "motion/react";
import { Outcome } from "@/types/content";
import { TrendingUp, ArrowUpRight, Zap } from "lucide-react";

const getIcon = (index: number) => {
  const icons = [TrendingUp, ArrowUpRight, Zap];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className="w-6 h-6" />;
};

const AnimatedNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Extract numeric value and determine animation duration
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
  const isPercentage = value.includes('%');
  const hasDecimal = numericValue % 1 !== 0;

  const duration = isPercentage ? 2000 : hasDecimal ? 1500 : 1000;

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = numericValue * easeOutQuart;

      if (hasDecimal) {
        setCount(Math.round(currentValue * 10) / 10);
      } else {
        setCount(Math.round(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue, duration, hasDecimal, isVisible]);

  // Format display value
  const formatValue = (num: number) => {
    if (hasDecimal) {
      return num.toFixed(1);
    }
    return num.toString();
  };

  return (
    <span
      ref={(el) => {
        if (el && !isVisible) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
              }
            },
            { threshold: 0.3 }
          );
          observer.observe(el);
        }
      }}
      className="tabular-nums"
    >
      {isVisible ? formatValue(count) : '0'}
      {suffix}
    </span>
  );
};

export default function OutcomeSnapshots({ items }: { items: Outcome[] }) {
  return (
    <section id="outcomes" className="py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {items.map((o, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative"
          >
            {/* Card */}
            <div className="relative p-8 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
              {/* Background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(i)}
                </div>

                {/* Metric */}
                <div className="mb-2">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                    <AnimatedNumber value={o.metric} />
                  </div>
                  <div className="text-sm font-medium text-blue-300 uppercase tracking-wider">
                    {o.unit}
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base group-hover:text-zinc-200 transition-colors duration-300">
                  {o.blurb}
                </p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Floating tooltip effect */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}


