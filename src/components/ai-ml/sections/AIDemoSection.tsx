'use client';

import { motion } from 'motion/react';
import AISearchDemo from '@/components/ai-ml/interactive/AISearchDemo';
import { openCalendlyPopup } from '@/lib/calendly';

export default function AIDemoSection() {
  return (
    <section
      id='demo'
      className='py-20 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-teal-100 to-blue-100 bg-clip-text text-transparent'
          >
            Experience Hybrid AI Search
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-xl text-zinc-300 max-w-3xl mx-auto'
          >
            See how our AI combines semantic understanding with keyword
            precision to deliver accurate results.
          </motion.p>
        </div>

        {/* Demo Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 rounded-2xl overflow-hidden'
        >
          <AISearchDemo />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-center mt-12'
        >
          <p className='text-zinc-400 mb-6'>
            Ready to see what SwiftMind can do with your data?
          </p>
          <button
            onClick={() =>
              openCalendlyPopup('https://calendly.com/swiftwareco/30min')
            }
            className='px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 cursor-pointer'
          >
            Schedule Live Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
