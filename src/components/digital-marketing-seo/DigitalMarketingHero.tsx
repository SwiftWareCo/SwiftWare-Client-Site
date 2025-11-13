'use client';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { openCalendlyPopup, initCalendlyScripts } from '@/lib/calendly';
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
  useEffect(() => {
    initCalendlyScripts();
  }, []);

  return (
    <section className='relative min-h-[60vh] py-20 bg-background text-white overflow-hidden'>
      <div className='absolute inset-0'>
        <ClickAnimation />
      </div>
      <motion.div
        className='relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.h1
          className='text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'
          variants={itemVariants}
        >
          Stop Hoping for Leads. Start Getting Found.
        </motion.h1>
        <motion.p
          className='mx-auto mt-6 max-w-3xl text-xl text-gray-300'
          variants={itemVariants}
        >
          We turn your website into a 24/7 lead-generation engine. Our SEO,
          social media, and ad campaigns are built to put you at the top of
          Google and in front of customers who are ready to hire.
        </motion.p>
        <motion.div className='mt-10' variants={itemVariants}>
          <Button
            size='lg'
            variant='default'
            onClick={() => openCalendlyPopup()}
          >
            Get My Free Marketing Plan
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
