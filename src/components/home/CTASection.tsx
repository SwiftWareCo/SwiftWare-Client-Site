'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useColorScheme } from '@/context/ColorSchemeContext';

export function CTASection() {
  const { colors } = useColorScheme();
  return (
    <div className='relative'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center'
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-white'>
            Ready to transform your business?
          </h2>
          <p className='text-lg text-zinc-400 mb-8 max-w-2xl mx-auto'>
            Let&apos;s talk about your goals and how we can help you achieve them.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer relative inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-medium transition-all'
            style={{
              background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 20px 40px ${colors.primary}40`,
            }}
          >
            <span>Schedule a Consultation</span>
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowRight className='h-5 w-5' />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
