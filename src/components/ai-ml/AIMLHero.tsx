'use client';

import { useMemo, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

import TypingHeadline from '@/components/hero/TypingHeadline';
import AIVisualization from '@/components/ai-ml/hero/AIVisualization';
import { getContentForFocusClient } from '@/lib/focusContent';
import { useFocusContext } from '@/context/FocusContext';

const HEADLINE = 'SwiftMind. AI that works.';

export default function AIMLHero() {
  const reduce = useReducedMotion();
  const stripes = useMemo(
    () => [4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92],
    []
  );
  const data = getContentForFocusClient('ai-ml');
  const { setShowContactModal } = useFocusContext();

  useEffect(() => {
    document.title = "AI & Machine Learning Solutions | Swiftware";
  }, []);

  return (
    <section
      id='hero'
      aria-labelledby='hero-heading'
      className='relative mx-auto max-w-[92rem] px-4 sm:px-6 pt-40 sm:pt-48 pb-14 sm:pb-16'
    >
      {/* AI-themed backdrop with falling dots */}
      <div className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-10 overflow-hidden'>
        {/* AI gradient background */}
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(900px 420px at 50% -10%, rgba(15,76,92,.14), rgba(0,212,255,.08), transparent 60%)',
            opacity: 0.7,
          }}
        />
        {/* Animated falling dots */}
        {!reduce &&
          stripes.map((left, i) => (
            <div key={left}>
              <motion.span
                className='absolute top-[-130%] h-[240%] w-px'
                style={{
                  left: `${left}%`,
                  background:
                    'linear-gradient(180deg, transparent, rgba(15,76,92,.22), rgba(0,212,255,.22), transparent)',
                  opacity: 0.22,
                }}
                initial={{ y: 0 }}
                animate={{ y: '18%' }}
                transition={{
                  duration: 12 + i * 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
              <motion.span
                className='absolute h-1.5 w-1.5 rounded-full'
                style={{
                  left: `calc(${left}% - 3px)`,
                  background:
                    'radial-gradient(circle, rgba(255,255,255,.85) 0%, rgba(0,212,255,.8) 40%, rgba(15,76,92,.0) 70%)',
                  filter: 'drop-shadow(0 0 8px rgba(0,212,255,.8))',
                }}
                initial={{ top: '-10%', opacity: 0.6 }}
                animate={{ top: '110%', opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 5.5 + i * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            </div>
          ))}
      </div>

      <div
        className='
          grid gap-6 lg:gap-8
          place-items-center
          md:place-items-stretch
          md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
          xl:min-h-[560px]
        '
      >
        {/* LEFT — center on phone; vertically center on xl+ */}
        <div className='relative justify-self-center md:justify-self-auto text-center md:text-left xl:flex xl:flex-col xl:justify-center'>
          <p className='inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-zinc-400'>
            SwiftMind
            <span className='inline-block h-1 w-1 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(0,212,255,0.8)]' />
            AI-Powered Intelligence
          </p>

          <h1 id='hero-heading' className='mt-2'>
            <TypingHeadline
              text={HEADLINE}
              className='text-[1.35rem] sm:text-[1.65rem] lg:text-[2.1rem] font-bold leading-tight bg-gradient-to-r from-white via-teal-100 to-blue-100 bg-clip-text text-transparent'
              step={0.065}
              blinkPeriod={2}
            />
          </h1>

          {/* AI/ML subline from content */}
          {data?.hero?.subline && (
            <p className='mt-3 text-sm sm:text-base text-zinc-300'>
              {data.hero.subline}
            </p>
          )}

          {/* Key AI capabilities bullets */}
          {data?.bullets && (
            <motion.div
              initial={reduce ? { opacity: 1 } : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className='mt-4 space-y-2'
            >
              {data.bullets.slice(0, 3).map((bullet, index) => (
                <motion.div
                  key={bullet.label}
                  initial={reduce ? { opacity: 1 } : { x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  className='flex items-center gap-2 text-sm text-zinc-400'
                >
                  <div className='w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 shadow-[0_0_8px_rgba(0,212,255,0.6)]' />
                  <span className='font-medium text-zinc-300'>
                    {bullet.label}
                  </span>
                  <span className='text-zinc-500'>—</span>
                  <span>{bullet.shortLine}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={reduce ? { opacity: 1 } : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.45 }}
            className='mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start'
          >
            {/* Primary CTA - Always opens contact modal */}
            <button
              onClick={() => setShowContactModal(true)}
              className='relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-medium text-white ring-1 ring-teal-500/30'
              style={{
                background:
                  'linear-gradient(90deg, rgb(15 76 92), rgb(0 212 255))',
              }}
              aria-label='Start Free Trial'
            >
              <motion.span
                aria-hidden
                className='pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-teal-600/0 via-blue-400/30 to-teal-400/0'
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
              {data?.hero?.primaryCta?.label || 'Start Free Trial'}
              <ArrowRight className='size-4' />
            </button>

            {/* Secondary CTA from AI/ML content */}
            <Link
              href={data?.hero?.secondaryCta?.href ?? '#demo'}
              className='group inline-flex items-center gap-2 rounded-xl border border-teal-700/50 bg-teal-900/20 px-6 py-3 text-sm text-zinc-200 hover:bg-teal-900/30 hover:border-teal-500/50 transition-all duration-300'
            >
              {data?.hero?.secondaryCta?.label ?? 'See Demo'}
              <Play className='size-4 text-teal-500 group-hover:text-teal-300 transition-colors' />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — AI Visualization */}
        <div className='relative justify-self-center md:justify-self-auto w-full'>
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='w-full max-w-[min(90vw,520px)] mx-auto'
          >
            <AIVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
