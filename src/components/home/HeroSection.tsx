'use client';

import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useColorScheme } from '@/context/ColorSchemeContext';

export function HeroSection() {
  const { colors } = useColorScheme();

  return (
    <div className='relative overflow-hidden pt-20 sm:pt-32 pb-16 sm:pb-24'>
      {/* Gradient background */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute inset-0'
          style={{
            background: `linear-gradient(to bottom, ${colors.primary}08, transparent, transparent)`,
          }}
        />
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 mb-6'
          >
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className='h-4 w-4 text-blue-400 mr-2' />
            </motion.div>
            <span className='text-sm font-medium text-zinc-300'>
              Your all-in-one growth partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'
          >
            <motion.span
              className='bg-clip-text text-transparent inline-block'
              style={{
                backgroundImage: `linear-gradient(to right, white, ${colors.primary}40)`,
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              One Partner.
            </motion.span>
            <br />
            <motion.span
              className='bg-clip-text text-transparent inline-block'
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              Four Services.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-xl sm:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto'
          >
            Stop juggling multiple agencies. We deliver brand design, digital marketing, AI automation, and custom software—all working together as one unified strategy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='cursor-pointer relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-8 py-4 text-base font-medium text-white transition-shadow'
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `0 20px 40px ${colors.primary}40`,
              }}
            >
              <span>Start Your Transformation</span>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ArrowRight className='h-5 w-5' />
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(113, 113, 122, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className='cursor-pointer inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-8 py-4 text-base font-medium text-white transition-colors'
            >
              <span>Explore Our Services</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
