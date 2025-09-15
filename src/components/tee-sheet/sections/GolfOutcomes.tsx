'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  Target,
  Award,
} from 'lucide-react';
import type { Outcome } from '@/types/content';

interface GolfOutcomesProps {
  items: Outcome[];
  className?: string;
}

const getOutcomeIcon = (unit?: string) => {
  if (!unit) return TrendingUp;

  if (unit.includes('revenue') || unit.includes('cart')) return DollarSign;
  if (unit.includes('time') || unit.includes('overhead')) return Clock;
  if (unit.includes('satisfaction') || unit.includes('member')) return Users;
  if (unit.includes('utilization') || unit.includes('tee')) return Target;

  return Award;
};

const getOutcomeColor = (metric: string) => {
  if (metric.startsWith('+')) {
    return {
      text: 'text-emerald-400',
      bg: 'from-emerald-500/20 to-green-500/10',
      border: 'border-emerald-400/30',
      glow: 'shadow-emerald-500/20',
    };
  } else if (metric.startsWith('-')) {
    return {
      text: 'text-blue-400',
      bg: 'from-blue-500/20 to-cyan-500/10',
      border: 'border-blue-400/30',
      glow: 'shadow-blue-500/20',
    };
  }

  return {
    text: 'text-purple-400',
    bg: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-400/30',
    glow: 'shadow-purple-500/20',
  };
};

export default function GolfOutcomes({
  items,
  className = '',
}: GolfOutcomesProps) {
  const [counters, setCounters] = useState<number[]>(items.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate counters when component comes into view
  useEffect(() => {
    if (hasAnimated) return;

    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      items.forEach((item, index) => {
        const targetValue = parseFloat(item.metric.replace(/[^\d.-]/g, ''));
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3); // Ease-out animation
          const currentValue = targetValue * easeOut;

          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = currentValue;
            return newCounters;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    };

    const timer = setTimeout(() => {
      animateCounters();
      setHasAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [items, hasAnimated]);

  const formatCounter = (value: number, originalMetric: string) => {
    const prefix = originalMetric.startsWith('+')
      ? '+'
      : originalMetric.startsWith('-')
        ? '-'
        : '';
    const suffix = originalMetric.includes('×')
      ? '×'
      : originalMetric.includes('%')
        ? '%'
        : '';

    if (suffix === '×') {
      return `${prefix}${value.toFixed(1)}×`;
    } else if (suffix === '%') {
      return `${prefix}${Math.round(value)}%`;
    } else {
      return `${prefix}${Math.round(value)}${suffix}`;
    }
  };

  return (
    <div className={`${className}`}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {items.map((item, index) => {
          const IconComponent = getOutcomeIcon(item.unit);
          const colors = getOutcomeColor(item.metric);
          const counter = counters[index];

          return (
            <motion.div
              key={`${item.metric}-${item.unit}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              className={`
                relative p-6 rounded-xl border backdrop-blur-sm
                bg-gradient-to-br ${colors.bg} ${colors.border}
                hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-xl ${colors.glow}
                group cursor-pointer
              `}
            >
              {/* Background golf course pattern */}
              <div className='absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3),transparent_70%)] rounded-xl' />

              {/* Icon */}
              <div className='flex items-center justify-between mb-4'>
                <div
                  className={`
                  p-3 rounded-lg bg-white/10 ${colors.border}
                  group-hover:scale-110 transition-transform duration-300
                `}
                >
                  <IconComponent className={`w-6 h-6 ${colors.text}`} />
                </div>

                {/* Golf-themed decoration */}
                <div className='flex space-x-1'>
                  <div className='w-1 h-1 bg-emerald-400/50 rounded-full animate-pulse' />
                  <div
                    className='w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse'
                    style={{ animationDelay: '0.5s' }}
                  />
                  <div
                    className='w-1 h-1 bg-emerald-400/20 rounded-full animate-pulse'
                    style={{ animationDelay: '1s' }}
                  />
                </div>
              </div>

              {/* Metric */}
              <div className='mb-2'>
                <div className={`text-3xl font-bold ${colors.text} font-mono`}>
                  {formatCounter(counter, item.metric)}
                </div>
                {item.unit && (
                  <div className='text-sm text-zinc-400 font-medium'>
                    {item.unit}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className='text-zinc-300 text-sm leading-relaxed'>
                {item.blurb}
              </p>

              {/* Footnote */}
              {item.footnote && (
                <div className='mt-3 pt-3 border-t border-white/10'>
                  <p className='text-xs text-zinc-400 italic'>
                    {item.footnote}
                  </p>
                </div>
              )}

              {/* Hover effect overlay */}
              <motion.div
                className='absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                initial={false}
              />

              {/* Golf ball trail effect on hover */}
              <motion.div
                className='absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100'
                animate={{
                  scale: [0, 1, 0],
                  x: [0, -10, -20],
                  y: [0, 5, 10],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Golf course statistics summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className='mt-12 p-6 bg-gradient-to-r from-emerald-900/20 to-green-900/10 rounded-xl border border-emerald-500/20 backdrop-blur-sm'
      >
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-white mb-2 flex items-center justify-center gap-2'>
            <Award className='w-5 h-5 text-emerald-400' />
            Golf Course Performance Impact
          </h3>
        </div>

        <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
          <div className='p-4 bg-white/5 rounded-lg'>
            <div className='text-emerald-400 font-semibold'>
              18-Hole Courses
            </div>
            <div className='text-xs text-zinc-400 mt-1'>
              Primary implementation
            </div>
          </div>
          <div className='p-4 bg-white/5 rounded-lg'>
            <div className='text-blue-400 font-semibold'>Member & Public</div>
            <div className='text-xs text-zinc-400 mt-1'>
              All course types supported
            </div>
          </div>
          <div className='p-4 bg-white/5 rounded-lg'>
            <div className='text-purple-400 font-semibold'>Year-Round</div>
            <div className='text-xs text-zinc-400 mt-1'>
              Seasonal optimization
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
