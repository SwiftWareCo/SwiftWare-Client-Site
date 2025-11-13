'use client';

import { motion } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function BrandProblemSolution() {
  useColorScheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className='py-16 sm:py-24'>
      <div className='text-center mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
          Brand Foundation Matters
        </h2>
        <p className='text-lg text-zinc-400 max-w-2xl mx-auto'>
          The difference between being forgotten and being unforgettable
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='grid grid-cols-1 md:grid-cols-2 gap-8'
      >
        {/* Problem Side */}
        <motion.div
          variants={itemVariants}
          className='relative p-8 sm:p-10 rounded-2xl border border-red-900/30 bg-gradient-to-br from-red-950/20 to-red-900/10 overflow-hidden'
        >
          <div className='absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none' style={{ backgroundColor: '#ef4444' }} />

          <div className='relative z-10'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 rounded-lg bg-red-500/20'>
                <AlertCircle className='h-6 w-6 text-red-400' />
              </div>
              <h3 className='text-2xl font-bold text-red-400'>Without a Brand</h3>
            </div>

            <div className='space-y-4'>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>You blend in with every other company in your industry</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Customers struggle to understand what makes you different</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Your marketing message lacks clarity and consistency</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Trust is harder to build, and leads are left untapped</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Your budget is wasted on marketing that doesn&apos;t convert</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solution Side */}
        <motion.div
          variants={itemVariants}
          className='relative p-8 sm:p-10 rounded-2xl border border-emerald-900/30 bg-gradient-to-br from-emerald-950/20 to-emerald-900/10 overflow-hidden'
        >
          <div className='absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none' style={{ backgroundColor: '#10b981' }} />

          <div className='relative z-10'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 rounded-lg bg-emerald-500/20'>
                <CheckCircle2 className='h-6 w-6 text-emerald-400' />
              </div>
              <h3 className='text-2xl font-bold text-emerald-400'>With a Strategic Brand</h3>
            </div>

            <div className='space-y-4'>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>You become instantly recognizable and memorable</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Customers immediately understand your value proposition</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Every touchpoint tells a consistent, compelling story</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Trust is built instantly, and loyalty follows naturally</p>
              </div>
              <div className='flex gap-3'>
                <div className='h-1.5 w-1.5 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0' />
                <p className='text-zinc-300'>Your marketing efforts amplify—every channel works harder</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
