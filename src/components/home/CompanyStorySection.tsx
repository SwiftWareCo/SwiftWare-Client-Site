'use client';

import { motion } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';

export function CompanyStorySection() {
  const { colors } = useColorScheme();
  return (
    <div className='relative'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-white'>
              Why We Built SwiftWare
            </h2>
            <p className='text-lg text-zinc-400 mb-4 leading-relaxed'>
              We got tired of seeing businesses work with multiple agencies that didn&apos;t communicate with each other. You&apos;d get a brand from one agency, marketing from another, and software from a third—all disconnected.
            </p>
            <p className='text-lg text-zinc-400 mb-4 leading-relaxed'>
              So we built SwiftWare. One partner. One unified strategy. All four services working together to actually transform your business.
            </p>
            <p className='text-lg text-zinc-400 leading-relaxed'>
              We&apos;re young but proven. We&apos;ve already helped dozens of businesses across North America double their revenue, get ranked on the first page of Google, and build software that actually works.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='rounded-xl p-8 h-96 flex items-center justify-center border border-zinc-800'
            style={{
              background: `linear-gradient(to bottom right, ${colors.primary}10, ${colors.secondary}10)`,
            }}
          >
            <div className='text-center'>
              <p className='text-zinc-400'>Team Section</p>
              <p className='text-sm text-zinc-500 mt-2'>3 specialists across brand, marketing, development, and AI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
