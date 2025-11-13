'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { ArrowRight } from 'lucide-react';
import { initCalendlyScripts, openCalendlyPopup } from '@/lib/calendly';

export function BrandDesignHero() {
  const { colors } = useColorScheme();

  useEffect(() => {
    initCalendlyScripts();
  }, []);

  // Animated paint palette/brush with bigger size
  const PaintPalette = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className='relative w-64 h-64 mb-8'
    >
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className='absolute inset-0 rounded-full border-3 border-transparent'
        style={{
          borderTopColor: colors.primary,
          borderRightColor: colors.secondary,
        }}
      />

      {/* Middle pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className='absolute inset-4 rounded-full border-2 border-zinc-700/40'
      />

      {/* Inner content - palette with paintbrushes */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <motion.div
          animate={{ y: [0, -6, 0], rotateZ: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className='text-8xl'
        >
          🎨
        </motion.div>

        {/* Paintbrush elements orbiting */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`brush-${i}`}
            className='absolute text-4xl'
            animate={{
              x: [0, Math.cos((i * Math.PI * 2) / 3 + Date.now() / 3000) * 80],
              y: [0, Math.sin((i * Math.PI * 2) / 3 + Date.now() / 3000) * 80],
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.3,
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            🖌️
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Scattered colored dots throughout
  const ScatteredDots = () => (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const colors_array = [
          '#06B6D4', // cyan
          '#10B981', // emerald
          '#A855F7', // purple
          '#3B82F6', // blue
          '#EC4899', // pink
          '#F59E0B', // amber
        ];
        const randomColor = colors_array[i % colors_array.length];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;

        return (
          <motion.div
            key={`dot-${i}`}
            className='absolute rounded-full'
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: randomColor,
              left: `${randomX}%`,
              top: `${randomY}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
            }}
          />
        );
      })}
    </>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2 },
    },
  };

  return (
    <div className='relative bg-secondary overflow-hidden min-h-[50vh] flex items-start justify-center'>


      {/* Scattered dots layer */}
      <div className='absolute inset-0 overflow-hidden'>
        <ScatteredDots />
      </div>

      {/* Paint Palette - Behind Text - Appears First */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0 }}
        className='absolute inset-0 flex items-start justify-center pointer-events-none '
      >
        <PaintPalette />
      </motion.div>

      {/* Content - Text Over Paint Palette */}
      <div className='relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-18 lg:py-18'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='flex flex-col items-center justify-center text-center'
        >
          {/* Professional Solutions Badge */}
          <motion.div variants={itemVariants}>
            <div className='inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 mb-8'>
              <div
                className='h-2 w-2 rounded-full mr-2'
                style={{ backgroundColor: colors.primary }}
              />
              <span className='text-sm font-medium text-zinc-300'>
                Professional Solutions
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants}>
            <h1
              className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8'
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

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className='text-xl sm:text-2xl text-zinc-300 mb-8 max-w-3xl'>
              Stop looking like a startup. We build professional brand identities that make you the obvious choice.
            </p>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className='text-lg text-zinc-400 mb-12 max-w-2xl'>
              Your brand is your first impression—the foundation for everything else. We create visual identities and messaging systems that are memorable, scalable, and perfectly aligned with your business goals.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => openCalendlyPopup()}
              className='relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-8 py-4 text-base font-medium text-white cursor-pointer hover:shadow-lg transition-shadow'
              style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <span>Schedule Brand Consultation</span>
              <ArrowRight className='h-5 w-5' />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
