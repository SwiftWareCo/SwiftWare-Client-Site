'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { openCalendlyPopup } from '@/lib/calendly';

export function CTASection() {
  const { colors } = useColorScheme();
  return (
    <section className='relative py-16 sm:py-24 bg-blue-100 dark:bg-zinc-900'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center'
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-blue-900 dark:text-white'>
            Ready to transform your business?
          </h2>
          <p className='text-lg mb-8 max-w-2xl mx-auto text-blue-800 dark:text-zinc-300'>
            Let&apos;s talk about your goals and how we can help you achieve them.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openCalendlyPopup()}
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
    </section>
  );
}
