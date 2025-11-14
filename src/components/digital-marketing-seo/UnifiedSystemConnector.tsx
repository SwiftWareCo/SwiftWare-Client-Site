'use client';
import { motion } from 'motion/react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Keeps the marquee section gliding in without delay.
      ease: [0.25, 0.1, 0.25, 1] as const, // Mirrors the digital brand's polished deceleration.
      staggerChildren: 0.14, // Cascades the headline and tiles quickly.
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4, // Snaps tiles into focus without overstaying on-screen.
      ease: 'easeOut' as const, // Softens the final motion for a premium finish.
    },
  },
} as const;

interface UnifiedSystemConnectorProps {
  className?: string;
}

export const UnifiedSystemConnector = ({
  className,
}: UnifiedSystemConnectorProps) => {
  return (
    <motion.section
      className={cn('py-16 sm:py-24', className)}
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
    >
      <motion.div
        className='mx-auto max-w-7xl px-6 lg:px-8'
        variants={sectionVariants}
      >
        <motion.div className='lg:text-center' variants={cardVariants}>
          <h2 className='text-sm font-semibold uppercase tracking-wide text-service-marketing-dark'>
            The SwiftWare Difference
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Marketing Gets the Lead. Our System Closes the Deal.
          </p>
        </motion.div>
        <motion.div
          className='mt-16 flex flex-col items-center gap-12 lg:flex-row lg:gap-16'
          variants={cardVariants}
        >
          <motion.div
            className='flex-1 text-lg text-muted-foreground lg:max-w-2xl'
            variants={cardVariants}
          >
            <p>
              Getting a lead is only half the battle. Our competitors send you a
              name and number.
              <strong className='ml-1 text-foreground'>
                We build a system.
              </strong>
            </p>
            <p className='mt-4'>
              Our marketing campaigns connect directly to your custom software
              experience and trigger AI automation to follow up in
              seconds—before your competitor knows they even had a new inquiry.
            </p>
          </motion.div>
          <motion.div
            className='flex w-full flex-1 items-center justify-center'
            variants={cardVariants}
          >
            <motion.div
              className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-lg sm:flex-row'
              variants={cardVariants}
            >
              <motion.div
                className='flex flex-col items-center rounded-xl p-4 text-center'
                style={{
                  backgroundColor:
                    'rgba(var(--color-primary-service-rgb), 0.18)',
                }}
                variants={cardVariants}
              >
                <Icon
                  name='Megaphone'
                  className='h-10 w-10 text-service-marketing-dark'
                />
                <span className='mt-2 font-bold text-foreground'>
                  Digital Marketing
                </span>
              </motion.div>
              <ArrowRight className='hidden h-8 w-8 text-muted-foreground sm:block' />
              <motion.div
                className='flex flex-col items-center rounded-xl p-4 text-center'
                style={{
                  backgroundColor:
                    'rgba(var(--color-secondary-service-rgb), 0.12)',
                }}
                variants={cardVariants}
              >
                <Icon name='Bot' className='h-10 w-10 text-foreground' />
                <span className='mt-2 font-semibold text-muted-foreground'>
                  AI Automation
                </span>
              </motion.div>
              <ArrowRight className='hidden h-8 w-8 text-muted-foreground sm:block' />
              <motion.div
                className='flex flex-col items-center rounded-xl p-4 text-center'
                style={{
                  backgroundColor:
                    'rgba(var(--color-secondary-service-rgb), 0.12)',
                }}
                variants={cardVariants}
              >
                <Icon name='Code' className='h-10 w-10 text-foreground' />
                <span className='mt-2 font-semibold text-muted-foreground'>
                  Custom Software
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
