'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';
import { ArrowRight } from 'lucide-react';

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  heroDescription?: string;
  children: ReactNode;
  ctaText?: string;
  ctaSecondary?: string;
}

export function ServicePageTemplate({
  title,
  subtitle,
  heroDescription,
  children,
  ctaText = 'Get Started',
  ctaSecondary = 'Learn More',
}: ServicePageTemplateProps) {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  return (
    <main className='relative pt-20 min-h-screen'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        {/* Gradient background */}
        <div className='absolute inset-0 -z-10'>
          <div
            className='absolute inset-0 opacity-30'
            style={{
              background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.2) 0%, rgba(${colorsRGB.secondaryRGB}, 0.2) 100%)`,
            }}
          />
        </div>

        <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <div className='inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 mb-6'>
              <div
                className='h-2 w-2 rounded-full mr-2'
                style={{ backgroundColor: colors.primary }}
              />
              <span className='text-sm font-medium text-zinc-300'>
                Professional Solutions
              </span>
            </div>

            <h1
              className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6'
              style={{
                backgroundImage: `linear-gradient(135deg, white 0%, rgba(${colorsRGB.primaryRGB}, 0.8) 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </h1>

            <p className='text-xl sm:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto'>
              {subtitle}
            </p>

            {heroDescription && (
              <p className='text-lg text-zinc-400 mb-8 max-w-2xl mx-auto'>
                {heroDescription}
              </p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='flex flex-col sm:flex-row gap-4 justify-center items-center'
            >
              <button
                className='relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-base font-medium text-white'
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                <span>{ctaText}</span>
                <ArrowRight className='h-5 w-5' />
              </button>
              <button className='inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-base font-medium text-white hover:bg-zinc-900/50 transition-colors'>
                <span>{ctaSecondary}</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className='relative'>
        {/* Top gradient accent */}
        <div
          className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none'
          style={{ backgroundColor: colors.primary }}
        />

        <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24'>
          {children}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className='relative border-t border-zinc-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center'
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-white'>
              Ready to transform your business?
            </h2>
            <p className='text-lg text-zinc-400 mb-8 max-w-2xl mx-auto'>
              Let&apos;s discuss how we can help you achieve your goals.
            </p>
            <button
              className='relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-8 py-4 text-base font-medium text-white'
              style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className='h-5 w-5' />
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
