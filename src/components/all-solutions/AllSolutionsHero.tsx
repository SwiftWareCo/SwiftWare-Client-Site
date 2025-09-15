'use client';

import { motion } from 'motion/react';
import type { FocusContent } from '@/types/content';

interface AllSolutionsHeroProps {
  content: FocusContent;
}

export default function AllSolutionsHero({ content }: AllSolutionsHeroProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='relative overflow-hidden py-20 lg:py-28'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-transparent' />
      <motion.div
        className='absolute inset-0'
        animate={{
          background: [
            'radial-gradient(600px 400px at 50% 20%, rgba(59, 130, 246, 0.15), transparent 50%)',
            'radial-gradient(800px 500px at 80% 40%, rgba(168, 85, 247, 0.12), transparent 50%)',
            'radial-gradient(600px 400px at 20% 60%, rgba(59, 130, 246, 0.15), transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight'
          >
            {content.hero.subline}
          </motion.h1>

          {/* Hero Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className='text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-8 leading-relaxed'
          >
            From custom CRMs to AI-powered solutions, we build exactly what your
            business needs to thrive.
          </motion.p>

          {/* Hero Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className='flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base'
          >
            {content.bullets.map((bullet, index) => (
              <div
                key={index}
                className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10'
              >
                <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full' />
                <span className='text-zinc-200 font-medium'>
                  {bullet.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            {content.hero.primaryCta && (
              <motion.button
                onClick={() => scrollToSection(content.hero.primaryCta!.href)}
                className='group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer'
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Sheen Effect */}
                <motion.div
                  className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12'
                  initial={false}
                  whileHover={{
                    x: '200%',
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }}
                />
                <span className='relative z-10'>
                  {content.hero.primaryCta.label}
                </span>
              </motion.button>
            )}

            {content.hero.secondaryCta && (
              <motion.button
                onClick={() => scrollToSection(content.hero.secondaryCta!.href)}
                className='group inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-600 text-zinc-300 font-medium rounded-xl hover:border-blue-500/50 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer'
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{content.hero.secondaryCta.label}</span>
                <motion.svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </motion.svg>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-blue-400/40 rounded-full'
            initial={{
              x:
                Math.random() *
                (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  );
}
