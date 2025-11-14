'use client';
import { motion } from 'motion/react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { cn } from '@/lib/utils';

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.14,
    },
  },
} as const;

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
} as const;

interface FinalCTASectionProps {
  className?: string;
  tone?: 'default' | 'contrast';
}

export const FinalCTASection = ({
  className,
  tone = 'contrast',
}: FinalCTASectionProps) => {
  const textClasses =
    tone === 'contrast' ? 'text-secondary-foreground' : 'text-foreground';
  const paragraphClasses =
    tone === 'contrast'
      ? 'mx-auto mt-4 max-w-2xl text-lg opacity-80 text-secondary-foreground'
      : 'mx-auto mt-4 max-w-2xl text-lg text-foreground opacity-80';
  const sectionBackground =
    tone === 'contrast' ? 'bg-service-marketing' : 'bg-secondary';

  return (
    <motion.section
      className={cn(sectionBackground, className)}
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
    >
      <motion.div
        className={cn(
          'mx-auto max-w-7xl px-6 py-16 text-center sm:py-24 lg:px-8',
          textClasses
        )}
        variants={ctaVariants}
      >
        <motion.h2
          className='text-3xl font-extrabold tracking-tight sm:text-4xl'
          variants={ctaVariants}
        >
          Ready to Own Your Local Market?
        </motion.h2>
        <motion.p className={paragraphClasses} variants={ctaVariants}>
          Book a free marketing consult and we&apos;ll show you exactly what
          your competitors are doing—and the plan that puts you back on top.
        </motion.p>
        <motion.div className='mt-8 w-[20%] mx-auto' variants={ctaVariants}>
          <InteractiveHoverButton text='Schedule a Consultation' />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
