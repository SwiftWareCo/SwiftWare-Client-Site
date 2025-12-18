'use client';

import { useEffect, useMemo } from 'react';
import { motion, easeOut } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { openCalendlyPopup } from '@/lib/calendly';
import { renderCanvas } from '@/components/ui/canvas';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18, // cascade content entrance
      delayChildren: 0.25, // wait for palette to settle first
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // smooth upward slide for each section
      ease: easeOut,
    },
  },
};

export function BrandDesignHero() {
  const { colors } = useColorScheme();

  useEffect(() => {
    const cleanupCanvas = renderCanvas();
    return cleanupCanvas;
  }, []);

  const dotPalette = useMemo(
    () => [
      'var(--color-primary-service)',
      'var(--color-secondary-service)',
      'var(--color-service-brand)',
      'var(--color-service-brand-dark)',
      'var(--color-service-software)',
      'var(--color-service-ai)',
    ],
    []
  );

  const dots = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, index) => ({
        id: `dot-${index}`,
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        color: dotPalette[index % dotPalette.length],
      })),
    [dotPalette]
  );

  const ScatteredDots = () => (
    <>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className='absolute rounded-full'
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            background: dot.color,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
          aria-hidden
        />
      ))}
    </>
  );

  return (
    <div className='relative flex min-h-[50vh] items-start justify-center overflow-hidden bg-secondary'>
      <div className='absolute inset-0 overflow-hidden'>
        <canvas
          id='brand-design-canvas'
          className='pointer-events-none absolute inset-0 h-full w-full'
        />
        <ScatteredDots />
      </div>

      <motion.div
        initial='hidden'
        animate='visible'
        className='pointer-events-none absolute inset-0 flex items-start justify-center'
      ></motion.div>

      <div className='relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='flex flex-col items-center justify-center text-center'
        >
          <motion.div variants={itemVariants}>
            <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 backdrop-blur-sm'>
              <div
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: colors.primary }}
              />
              <span className='text-sm font-medium text-muted-foreground'>
                Professional Solutions
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1
              className='mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'
              style={{
                backgroundImage: `linear-gradient(135deg, white 0%, ${colors.primary}80 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Build the Brand That Wins Trust. Instantly.
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className='mb-8 max-w-3xl text-xl text-muted-foreground sm:text-2xl'>
              Stop looking like a startup. We build professional brand
              identities that make you the obvious choice.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className='mb-12 max-w-2xl text-lg text-muted-foreground opacity-80'>
              Your brand is your first impression—the foundation for everything
              else. We create visual identities and messaging systems that are
              memorable, scalable, and perfectly aligned with your business
              goals.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InteractiveHoverButton
              onClick={() => openCalendlyPopup()}
              text='Schedule a Brand Consultation'
            ></InteractiveHoverButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
