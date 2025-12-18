'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import type { Outcome } from '@/types/content';
import { TrendingUp, ArrowUpRight, Zap } from 'lucide-react';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

const getIcon = (index: number) => {
  const icons = [TrendingUp, ArrowUpRight, Zap];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className='h-6 w-6' />;
};

const withAlpha = (rgb: string, alpha: number) => `rgba(${rgb}, ${alpha})`;

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 }, // Controls raise/fade timing for each card.
  },
};

const AnimatedNumber = ({
  value,
  suffix = '',
}: {
  value: string;
  suffix?: string;
}) => {
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
      className='tabular-nums'
    >
      {isVisible ? formatValue(count) : '0'}
      {suffix}
    </span>
  );
};

interface AIOutcomesSectionProps {
  items: Outcome[];
}

export default function AIOutcomesSection({ items }: AIOutcomesSectionProps) {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);
  return (
    <section id='outcomes' className='py-16'>
      <div className='mx-auto grid max-w-6xl gap-8 md:grid-cols-3'>
        {items.map((o, index) => (
          <motion.div
            key={`outcome-${index}`}
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className='group relative'
          >
            {/* Card */}
            <div
              className='relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 group'
              style={{
                borderColor: `rgba(${colorsRGB.primaryRGB}, 0.28)`,
                background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.08), rgba(${colorsRGB.secondaryRGB}, 0.05))`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colorsRGB.primaryRGB}, 0.45)`;
                e.currentTarget.style.boxShadow = `0 0 36px rgba(${colorsRGB.primaryRGB}, 0.15)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colorsRGB.primaryRGB}, 0.28)`;
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Background gradient animation */}
              <div
                className='
                  absolute inset-0 opacity-0 transition-opacity duration-500
                  group-hover:opacity-100
                '
                style={{
                  background: `linear-gradient(135deg, ${withAlpha(
                    colorsRGB.primaryRGB,
                    0.18
                  )}, ${withAlpha(colorsRGB.secondaryRGB, 0.1)})`,
                }}
              />

              {/* Floating particles */}
              <div
                className='absolute right-4 top-4 h-2 w-2 animate-pulse rounded-full opacity-60'
                style={{ backgroundColor: colors.primary }}
              />
              <div
                className='absolute bottom-4 left-4 h-1.5 w-1.5 animate-pulse rounded-full opacity-40'
                style={{
                  animationDelay: '1s',
                  backgroundColor: colors.secondary,
                }}
              />

              <div className='relative z-10 text-center text-foreground'>
                {/* Icon */}
                <div
                  className='
                    mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border text-primary-foreground transition-transform duration-300
                    group-hover:scale-110
                  '
                  style={{
                    background: `linear-gradient(135deg, ${withAlpha(
                      colorsRGB.primaryRGB,
                      0.16
                    )}, ${withAlpha(colorsRGB.secondaryRGB, 0.12)})`,
                    borderColor: `rgba(${colorsRGB.primaryRGB}, 0.24)`,
                  }}
                >
                  {getIcon(index)}
                </div>

                {/* Metric */}
                <div className='mb-2'>
                  <div
                    className='
                      text-4xl font-bold text-transparent transition-transform duration-300 md:text-5xl
                      group-hover:scale-105
                    '
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${withAlpha(
                        colorsRGB.primaryRGB,
                        0.75
                      )} 50%, ${withAlpha(colorsRGB.secondaryRGB, 0.6)} 100%)`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                    }}
                  >
                    <AnimatedNumber value={o.metric} />
                  </div>
                  <div
                    className='text-sm font-medium uppercase tracking-wider'
                    style={{ color: colors.primary }}
                  >
                    {o.unit}
                  </div>
                </div>

                {/* Description */}
                <p className='text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground md:text-base'>
                  {o.blurb}
                </p>
              </div>

              {/* Hover effect border */}
              <div
                className='absolute inset-0 rounded-2xl border border-transparent transition-all duration-500'
                style={{
                  borderColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(${colorsRGB.primaryRGB}, 0.28)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div
                  className='
                    absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
                    group-hover:opacity-100
                  '
                  style={{
                    background: `linear-gradient(90deg, transparent, ${withAlpha(
                      colorsRGB.primaryRGB,
                      0.14
                    )}, transparent)`,
                  }}
                />
              </div>

              {/* Bottom accent */}
              <div
                className='absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 rounded-b-2xl transition-transform duration-500 group-hover:scale-x-100'
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                }}
              />
            </div>

            {/* Floating tooltip effect */}
            <div
              className='absolute -right-2 -top-2 h-4 w-4 animate-pulse rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100'
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
