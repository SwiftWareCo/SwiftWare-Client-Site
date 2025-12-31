'use client';
import { motion } from 'motion/react';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { openCalendlyPopup } from '@/lib/calendly';
import { ClickAnimation } from './ClickAnimation';

const heroEase = [0.22, 1, 0.36, 1] as const; // Smooth ease-out curve for hero reveal.

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ease: heroEase,
      duration: 0.4,
    },
  },
};

// Individual variants with distinct timings for each element
const headingFirstLineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: heroEase,
      delay: 0.1, // First line appears first
    },
  },
};

const headingSecondLineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: heroEase,
      delay: 0.35, // Second line appears after first line
    },
  },
};

const textFlipVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: heroEase,
      delay: 0.6, // Text flip appears after second line
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: heroEase,
      delay: 0.9, // Description appears after text flip
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: heroEase,
      delay: 1.2, // Button appears last
    },
  },
};

export const DigitalMarketingHero = () => {
  return (
    <section className='relative min-h-[68vh] overflow-hidden bg-secondary py-20 text-foreground md:min-h-[74vh]'>
      <div className='absolute inset-0'>
        <ClickAnimation />
      </div>
      <motion.div
        className='relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.h1 className='text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
          <motion.span
            className='block'
            variants={headingFirstLineVariants}
            initial='hidden'
            animate='visible'
          >
            Stop hoping for leads.
          </motion.span>
          <motion.span
            className='mt-4 block text-center sm:mt-6'
            variants={headingSecondLineVariants}
            initial='hidden'
            animate='visible'
          >
            <span className='block mb-2 sm:mb-3'>Start getting</span>
          </motion.span>
          <motion.div
            variants={textFlipVariants}
            initial='hidden'
            animate='visible'
            className='mt-2 sm:mt-3'
          >
            <ContainerTextFlip
              words={[
                'qualified pipeline',
                'market dominance',
                'executive leads',
                'predictable growth',
              ]}
              className='mt-0 mx-auto bg-card text-card-foreground'
              textClassName='text-balance tracking-tight'
              interval={3200}
            />
          </motion.div>
        </motion.h1>
        <motion.p
          className='mx-auto mt-8 max-w-2xl text-base text-foreground opacity-80 sm:text-lg'
          variants={descriptionVariants}
          initial='hidden'
          animate='visible'
        >
          We turn your website into a 24/7 lead-generation engine. Our SEO,
          social media, and ad campaigns are built to put you at the top of
          Google and in front of customers who are ready to hire.
        </motion.p>
        <motion.div
          className='mt-10 flex justify-center'
          variants={buttonVariants}
          initial='hidden'
          animate='visible'
        >
          <InteractiveHoverButton
            onClick={() => openCalendlyPopup()}
            text='Request Strategy Briefing'
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
