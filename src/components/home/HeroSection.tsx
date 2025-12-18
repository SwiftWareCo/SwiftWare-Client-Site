'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BackgroundLines } from '@/components/ui/background-lines';
import { RotatingServiceKeywords } from './RotatingServiceKeywords';
import { openCalendlyPopup } from '@/lib/calendly';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

export function HeroSection() {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  return (
    <section className='relative min-h-[80vh] overflow-hidden pt-28 sm:pt-40 pb-16 sm:pb-24 bg-background'>
      <div className='absolute inset-0 -z-20'>
        <div
          className='absolute inset-0'
          style={{
            background: `radial-gradient(circle at 16% 22%, rgba(${colorsRGB.primaryRGB}, 0.16), transparent 68%)`,
          }}
        />
        <div
          className='absolute inset-0'
          style={{
            background: `radial-gradient(circle at 82% 30%, rgba(${colorsRGB.secondaryRGB}, 0.14), transparent 72%)`,
          }}
        />
      </div>

      <BackgroundLines
        className='absolute inset-0 z-10 bg-transparent pointer-events-none'
        svgOptions={{ duration: 14 }}
      />

      <div className='mx-auto max-w-7xl px-6'>
        <div className='text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0 }}
            className='mb-6'
          >
            <Badge
              variant='secondary'
              className='inline-flex items-center bg-secondary gap-2'
            >
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles
                  className='h-4 w-4'
                  style={{ color: colors.primary }}
                />
              </motion.div>
              <span>Your all-in-one growth partner</span>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'
          >
            <motion.span
              className='bg-clip-text text-transparent inline-block'
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.primary})`,
              }}
            >
              One Partner.
            </motion.span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'
          >
            <motion.span
              className='bg-clip-text text-transparent inline-block'
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              Four Services.
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className='mb-8 max-w-3xl mx-auto'
          >
            <p className='text-lg sm:text-xl mb-3 text-foreground/80'>
              We specialize in <RotatingServiceKeywords />
            </p>

            <p className='text-xl sm:text-2xl text-foreground/75'>
              Stop juggling multiple agencies. We deliver it all working
              together as one unified strategy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className='flex justify-center'
          >
            <InteractiveHoverButton
              onClick={() => openCalendlyPopup()}
              text='Schedule a Consultation'
              className='w-auto px-10 py-4 text-base'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
