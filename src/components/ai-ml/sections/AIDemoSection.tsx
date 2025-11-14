'use client';

import { motion } from 'motion/react';
import AISearchDemo from '@/components/ai-ml/interactive/AISearchDemo';
import { openCalendlyPopup } from '@/lib/calendly';

const PRIMARY_RGB_VAR = '--color-primary-service-rgb' as const;
const SECONDARY_RGB_VAR = '--color-secondary-service-rgb' as const;
const PRIMARY_COLOR = 'var(--color-primary-service)';
const SECONDARY_COLOR = 'var(--color-secondary-service)';

const withAlpha = (cssVar: string, alpha: number) =>
  `rgba(var(${cssVar}), ${alpha})`;

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function AIDemoSection() {
  return (
    <section
      id='demo'
      className='py-20'
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${withAlpha(
          PRIMARY_RGB_VAR,
          0.08
        )} 45%, transparent 100%)`,
      }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='mb-16 text-center'>
          <motion.h2
            variants={sectionVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='mb-6 text-4xl font-bold text-transparent'
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${withAlpha(
                PRIMARY_RGB_VAR,
                0.75
              )} 50%, ${withAlpha(SECONDARY_RGB_VAR, 0.6)} 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Experience Hybrid AI Search
          </motion.h2>
          <motion.p
            variants={sectionVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='mx-auto max-w-3xl text-xl text-muted-foreground'
          >
            See how our AI combines semantic understanding with keyword
            precision to deliver accurate results.
          </motion.p>
        </div>

        {/* Demo Content */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ delay: 0.2 }}
          className='overflow-hidden rounded-2xl'
          style={{
            border: `1px solid ${withAlpha(PRIMARY_RGB_VAR, 0.18)}`,
            background: `linear-gradient(135deg, rgba(255,255,255,0.04), ${withAlpha(
              PRIMARY_RGB_VAR,
              0.08
            )})`,
          }}
        >
          <AISearchDemo />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ delay: 0.3 }}
          className='mt-12 text-center'
        >
          <p className='mb-6 text-muted-foreground'>
            Ready to see what SwiftMind can do with your data?
          </p>
          <button
            onClick={() =>
              openCalendlyPopup('https://calendly.com/swiftwareco/30min')
            }
            className='cursor-pointer rounded-xl px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300'
            style={{
              background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
              boxShadow: `0 18px 36px ${withAlpha(PRIMARY_RGB_VAR, 0.2)}`,
            }}
          >
            Schedule Live Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
