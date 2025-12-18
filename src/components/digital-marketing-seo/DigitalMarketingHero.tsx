'use client';
import { motion } from 'motion/react';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { openCalendlyPopup } from '@/lib/calendly';
import { ClickAnimation } from './ClickAnimation';

const heroEase = [0.22, 1, 0.36, 1] as const; // Smooth ease-out curve for hero reveal.

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: heroEase,
      duration: 0.8, // Controls how quickly the hero fades/slides in.
      staggerChildren: 0.15, // Adds breathing room between each child animation.
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }, // Simple fade + rise for headings and body text.
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
        <motion.h1
          className='text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'
          variants={itemVariants}
        >
          <span className='block'>Stop hoping for leads.</span>
          <span className='mt-4 inline-flex flex-nowrap items-center justify-center gap-2 text-pretty sm:mt-6 sm:gap-3'>
            <span className='whitespace-nowrap'>Start getting</span>
            <ContainerTextFlip
              words={[
                'qualified pipeline',
                'market dominance',
                'executive leads',
                'predictable growth',
              ]}
              className='mt-0 align-middle whitespace-nowrap bg-card text-card-foreground shadow-[0_16px_40px_rgba(var(--color-primary-service-rgb),0.28)]'
              textClassName='text-balance tracking-tight whitespace-nowrap'
              interval={3200}
            />
          </span>
        </motion.h1>
        <motion.p
          className='mx-auto mt-8 max-w-2xl text-base text-foreground opacity-80 sm:text-lg'
          variants={itemVariants}
        >
          We turn your website into a 24/7 lead-generation engine. Our SEO,
          social media, and ad campaigns are built to put you at the top of
          Google and in front of customers who are ready to hire.
        </motion.p>
        <motion.div
          className='mt-10  flex justify-center'
          variants={itemVariants}
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
