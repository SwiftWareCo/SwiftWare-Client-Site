'use client';

import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { RotatingServiceKeywords } from './RotatingServiceKeywords';
import { openCalendlyPopup } from '@/lib/calendly';

export function HeroSection() {
  const { colors } = useColorScheme();

  return (
    <section className='relative overflow-hidden pt-28 sm:pt-40 pb-16 sm:pb-24 bg-blue-100 dark:bg-zinc-900'>
      {/* Gradient background */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute inset-0'
          style={{
            background: `linear-gradient(to bottom, ${colors.primary}08, transparent, transparent)`,
          }}
        />
      </div>

      <div className='mx-auto max-w-7xl px-6'>
        <div className='text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='inline-flex items-center rounded-full border px-4 py-1.5 mb-6'
            style={{
              borderColor: 'var(--gray-a6)',
              backgroundColor: 'var(--gray-a3)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className='h-4 w-4 mr-2' style={{ color: colors.primary }} />
            </motion.div>
            <span className='text-sm font-medium text-blue-900 dark:text-zinc-100'>
              Your all-in-one growth partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'
          >
            <motion.span
              className='bg-clip-text text-transparent inline-block'
              style={{
                backgroundImage: `linear-gradient(to right, #1e40af, ${colors.primary})`,
              }}
            >
              One Partner.
            </motion.span>
            <br />
            <motion.span
              className='bg-clip-text text-transparent inline-block'
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              Four Services.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-lg sm:text-xl mb-3 max-w-3xl mx-auto text-blue-900 dark:text-zinc-200'
          >
            We specialize in <RotatingServiceKeywords /> for modern businesses.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className='text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-blue-800 dark:text-zinc-300'
          >
            Stop juggling multiple agencies. We deliver brand design, digital
            marketing, AI automation, and custom software—all working together
            as one unified strategy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openCalendlyPopup()}
              className='cursor-pointer relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-8 py-4 text-base font-medium text-white transition-shadow'
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `0 20px 40px ${colors.primary}40`,
              }}
            >
              <span>Schedule a Consultation</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className='h-5 w-5' />
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className='cursor-pointer inline-flex items-center gap-2 rounded-lg border border-blue-400 dark:border-zinc-600 px-8 py-4 text-base font-medium transition-colors text-blue-900 dark:text-zinc-100 hover:bg-blue-200/50 dark:hover:bg-zinc-800/50'
            >
              <span>View Our Portfolio</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
