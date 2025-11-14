'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

import TypingHeadline from '@/components/hero/TypingHeadline';
import AIVisualization from '@/components/ai-ml/hero/AIVisualization';
import { openCalendlyPopup } from '@/lib/calendly';
import Link from 'next/link';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';

const HEADLINE = 'SwiftMind. AI that works.';
const heroEase = [0.22, 1, 0.36, 1] as const; // Smooth deceleration on hero entrance.
const PRIMARY_COLOR = 'var(--color-primary-service)';
const SECONDARY_COLOR = 'var(--color-secondary-service)';
const PRIMARY_RGB_VAR = '--color-primary-service-rgb' as const;
const SECONDARY_RGB_VAR = '--color-secondary-service-rgb' as const;

const withAlpha = (cssVar: string, alpha: number) =>
  `rgba(var(${cssVar}), ${alpha})`;

const containerVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: heroEase,
      staggerChildren: 0.15, // Cascades hero content for easy timing tweaks.
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: heroEase,
    },
  },
};

export default function AIMLHero() {
  const reduce = useReducedMotion();
  const stripes = useMemo(
    () => [4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92],
    []
  );

  return (
    <section
      id='hero'
      aria-labelledby='hero-heading'
      className='relative mx-auto w-full max-w-[96rem] px-4 pb-14 pt-40 sm:px-6 sm:pb-16 sm:pt-48'
    >
      {/* AI-themed backdrop with falling dots */}
      <div className='pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-[100vw] -translate-x-1/2 overflow-hidden'>
        {/* AI gradient background */}
        <div
          className='absolute inset-0'
          style={{
            background: `radial-gradient(900px 420px at 50% -10%, ${withAlpha(
              PRIMARY_RGB_VAR,
              0.14
            )}, ${withAlpha(SECONDARY_RGB_VAR, 0.12)}, transparent 60%)`,
            opacity: 0.7,
          }}
        />
        {/* Animated falling dots */}
        {!reduce &&
          stripes.map((left, index) => (
            <div key={left}>
              <motion.span
                className='absolute top-[-130%] h-[240%] w-px'
                style={{
                  left: `${left}%`,
                  background: `linear-gradient(180deg, transparent, ${withAlpha(
                    PRIMARY_RGB_VAR,
                    0.22
                  )}, ${withAlpha(SECONDARY_RGB_VAR, 0.22)}, transparent)`,
                  opacity: 0.22,
                }}
                initial={{ y: 0 }}
                animate={{ y: '18%' }}
                transition={{
                  duration: 12 + index * 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: index * 0.15,
                }}
              />
              <motion.span
                className='absolute h-1.5 w-1.5 rounded-full'
                style={{
                  left: `calc(${left}% - 3px)`,
                  background: `radial-gradient(circle, rgba(255,255,255,0.85) 0%, ${withAlpha(
                    PRIMARY_RGB_VAR,
                    0.8
                  )} 40%, transparent 70%)`,
                  filter: `drop-shadow(0 0 8px ${withAlpha(
                    PRIMARY_RGB_VAR,
                    0.7
                  )})`,
                }}
                initial={{ top: '-10%', opacity: 0.6 }}
                animate={{ top: '110%', opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 5.5 + index * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
              />
            </div>
          ))}
      </div>

      <div
        className='
          grid items-center justify-items-center gap-12 lg:gap-16
          md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]
          xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:min-h-[580px]
        '
      >
        {/* LEFT — center on phone; vertically center on xl+ */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='
              relative mx-auto w-full max-w-[44rem] text-center
              md:mx-0 md:max-w-none md:text-left md:justify-self-start
              xl:flex xl:flex-col xl:justify-center
            '
        >
          <motion.p
            variants={itemVariants}
            className='
                inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted
                sm:text-xs md:justify-start
              '
            onClick={() => openCalendlyPopup()}
          >
            SwiftMind
            <span
              className='inline-block h-1 w-1 rounded-full'
              style={{
                backgroundColor: PRIMARY_COLOR,
                boxShadow: `0 0 10px ${withAlpha(PRIMARY_RGB_VAR, 0.8)}`,
              }}
            />
            AI-Powered Intelligence
          </motion.p>

          <motion.h1 variants={itemVariants} id='hero-heading' className='mt-4'>
            <span
              className='inline-block text-transparent'
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${withAlpha(
                  PRIMARY_RGB_VAR,
                  0.75
                )} 55%, ${withAlpha(SECONDARY_RGB_VAR, 0.65)} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              <TypingHeadline
                text={HEADLINE}
                className='text-[1.35rem] font-bold leading-tight sm:text-[1.65rem] lg:text-[2.1rem]'
                step={0.065}
                blinkPeriod={2}
              />
            </span>
          </motion.h1>

          {/* Key AI capabilities bullets */}
          <motion.div variants={itemVariants} className='mt-6'>
            <div className='space-y-3 text-center md:text-left'>
              {[
                'AI-Powered Insights',
                'Real-time Analytics',
                'Intelligent Automation',
              ].map((label, index) => (
                <motion.div
                  key={label}
                  initial={reduce ? { opacity: 1 } : { x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  className='
                      flex items-center justify-center gap-2 text-sm text-muted-foreground
                      md:justify-start
                    '
                >
                  <div
                    className='h-1.5 w-1.5 rounded-full'
                    style={{
                      background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
                      boxShadow: `0 0 8px ${withAlpha(PRIMARY_RGB_VAR, 0.6)}`,
                    }}
                  />
                  <span className='font-medium text-foreground'>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className='mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start'
          >
            {/* Primary CTA */}
       <InteractiveHoverButton
            text='Contact Us'
            onClick={() =>
              openCalendlyPopup('https://calendly.com/swiftwareco/30min')
            }
            className='w-64'
          />

            {/* Secondary CTA */}
            <Link
              href='#'
              className='
                   group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm text-muted-foreground
                   transition-all duration-300 cursor-pointer hover:-translate-y-0.5 bg-[color:var(--color-primary-service)]/50 hover:bg-background/70 
                 '
       
            >
              See Demo
              <Play
                className='size-4 transition-colors'
                style={{ color: PRIMARY_COLOR }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT — AI Visualization */}
        <div className='relative w-full justify-self-center md:justify-self-end'>
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='mx-auto w-full max-w-[min(90vw,580px)]'
          >
            <AIVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
