'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useFocusContext } from '@/context/FocusContext';
import Hero from '@/components/Hero';
import CRMHero from '@/components/crm/CRMHero';
import AIMLHero from '@/components/ai-ml/AIMLHero';
import GolfCourseHero from '@/components/tee-sheet/GolfCourseHero';

function AllSolutionsHero() {
  const reduce = useReducedMotion();
  const stripes = useMemo(
    () => [4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92],
    []
  );

  return (
    <section
      id='hero'
      aria-labelledby='hero-heading'
      className='relative mx-auto max-w-[92rem] px-4 sm:px-6 pt-40 sm:pt-48 pb-14 sm:pb-16'
    >
      {/* backdrop lines - same as Hero.tsx */}
      <div className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-10 overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(900px 420px at 50% -10%, rgba(59,130,246,.14), transparent 60%)',
            opacity: 0.7,
          }}
        />
        {!reduce &&
          stripes.map((left, i) => (
            <div key={left}>
              <motion.span
                className='absolute top-[-130%] h-[240%] w-px'
                style={{
                  left: `${left}%`,
                  background:
                    'linear-gradient(180deg, transparent, rgba(59,130,246,.22), rgba(168,85,247,.22), transparent)',
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
                    'radial-gradient(circle, rgba(255,255,255,.85) 0%, rgba(59,130,246,.8) 40%, rgba(168,85,247,.0) 70%)',
                  filter: 'drop-shadow(0 0 8px rgba(99,102,241,.8))',
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

      {/* Simple centered title */}
      <div className='text-center'>
        <p className='inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-zinc-400 mb-4'>
          Swiftware
          <span className='inline-block h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]' />
          Digital craftsmanship
        </p>

        <motion.h1
          id='hero-heading'
          initial={reduce ? { opacity: 1 } : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight'
        >
          Complete software solutions for growing businesses.
        </motion.h1>

        <motion.p
          initial={reduce ? { opacity: 1 } : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed'
        >
          From custom CRMs to AI-powered solutions, we build exactly what your
          business needs to thrive.
        </motion.p>
      </div>
    </section>
  );
}

export default function FocusHero() {
  const { focus } = useFocusContext();
  if (focus === 'crm') return <CRMHero />;
  if (focus === 'ai-ml') return <AIMLHero />;
  if (focus === 'tee-sheet') return <GolfCourseHero />;
  if (focus === 'all-solutions') return <AllSolutionsHero />;
  return <Hero />;
}
