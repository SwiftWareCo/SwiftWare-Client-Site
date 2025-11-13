'use client';

import { motion } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { ScheduleButton } from '@/components/ui/ScheduleButton';
import Image from 'next/image';
import { useState } from 'react';

export function UnifiedSystemConnector() {
  const { colors } = useColorScheme();
  const [showAfter, setShowAfter] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className='py-16 sm:py-24'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/20'
      >
        {/* Decorative gradient background */}
        <div className='absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none' style={{ backgroundColor: colors.primary }} />
        <div className='absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none' style={{ backgroundColor: colors.secondary }} />

        <div className='relative z-10 p-8 sm:p-12 lg:p-16'>
          {/* Headline */}
          <div className='text-center mb-8 sm:mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-white'>
              Brand Design is Just the Blueprint
            </h2>
            <p className='text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto'>
              A great brand is useless if no one sees it. We don&apos;t just design brands—we <span className='font-semibold text-white'>integrate them into a complete growth system</span>.
            </p>
          </div>

          {/* Your Brand Flows Into Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='mb-16 max-w-3xl mx-auto bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-zinc-800/50'
          >
            <div className='space-y-4'>
              <div>
                <h4 className='font-semibold text-white mb-2'>Your brand flows into:</h4>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='p-4 rounded-lg bg-zinc-800/20 border border-zinc-700/30'>
                  <p className='text-sm text-emerald-400 font-medium mb-2'>Digital Marketing Strategy</p>
                  <p className='text-sm text-zinc-400'>Consistent messaging across SEO, content, and ads</p>
                </div>
                <div className='p-4 rounded-lg bg-zinc-800/20 border border-zinc-700/30'>
                  <p className='text-sm text-indigo-400 font-medium mb-2'>Website & Tech</p>
                  <p className='text-sm text-zinc-400'>A conversion-optimized site that embodies your brand</p>
                </div>
                <div className='p-4 rounded-lg bg-zinc-800/20 border border-zinc-700/30'>
                  <p className='text-sm text-cyan-400 font-medium mb-2'>Business Operations</p>
                  <p className='text-sm text-zinc-400'>Every customer interaction reinforces your promise</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CJS Golf Academy Logo Before/After Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='mb-12 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/30 to-zinc-900/10 overflow-hidden p-8 sm:p-12'
          >
            <div className='text-center mb-8'>
              <h3 className='text-2xl sm:text-3xl font-bold mb-2 text-white'>
                Brand Transformation in Action
              </h3>
              <p className='text-zinc-400'>CJS Golf Academy - Brand Refresh</p>
            </div>

            <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12'>
              {/* Logo Before/After Container */}
              <div className='relative w-full lg:w-1/2 max-w-sm'>
                <div
                  className='relative h-64 rounded-2xl overflow-visible bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center border border-zinc-800 cursor-pointer'
                  onMouseEnter={() => setShowAfter(true)}
                  onMouseLeave={() => setShowAfter(false)}
                  onClick={() => setShowAfter(!showAfter)}
                >
                  {/* Before */}
                  <motion.div
                    animate={{ opacity: showAfter ? 0 : 1, x: showAfter ? -50 : 0 }}
                    transition={{ duration: 0.3 }}
                    className='absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-2xl'
                  >
                    <div className='relative w-32 h-32 mb-4'>
                      <Image
                        src='/images/oldcjslogo.jpg'
                        alt='Old CJS Golf Academy Logo'
                        fill
                        className='object-contain rounded-full'
                      />
                    </div>
                    <p className='text-base text-zinc-300 font-semibold'>Before</p>
                    <p className='text-xs text-zinc-500'>Generic Golf Identity</p>
                  </motion.div>

                  {/* After */}
                  <motion.div
                    animate={{ opacity: showAfter ? 1 : 0, x: showAfter ? 0 : 50 }}
                    transition={{ duration: 0.3 }}
                    className='absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-cyan-900/90 to-teal-900/90 rounded-2xl'
                  >
                    <div className='relative w-32 h-32 mb-4'>
                      <Image
                        src='/images/cjslogo.png'
                        alt='New CJS Golf Academy Logo'
                        fill
                        className='object-contain rounded-full'
                      />
                    </div>
                    <p className='text-base text-white font-semibold'>After</p>
                    <p className='text-xs text-cyan-100'>Modern Golf Brand</p>
                  </motion.div>

                  {/* Hover/Tap Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    viewport={{ once: true }}
                    className='absolute top-full left-1/2 -translate-x-1/2 mt-4 text-xs text-cyan-400 pointer-events-none font-semibold whitespace-nowrap'
                  >
                    <span className='hidden sm:inline'>Hover to see transformation →</span>
                    <span className='sm:hidden'>Tap to see transformation →</span>
                  </motion.div>
                </div>
              </div>

              {/* Impact Text */}
              <div className='flex-1'>
                <div className='space-y-6'>
                  <div>
                    <h4 className='text-base font-bold mb-3 flex items-center gap-2' style={{ color: '#EF4444' }}>
                      ● The Challenge
                    </h4>
                    <p className='text-zinc-300 text-sm leading-relaxed'>
                      CJS Golf Academy needed a brand identity that would stand out in a competitive golf instruction market. Their old logo felt generic and failed to convey the premium experience and expertise they offered to aspiring golfers.
                    </p>
                  </div>
                  <div>
                    <h4 className='text-base font-bold mb-3 flex items-center gap-2' style={{ color: '#10B981' }}>
                      ● The Solution
                    </h4>
                    <p className='text-zinc-300 text-sm leading-relaxed'>
                      We created a vibrant, modern brand identity with a cartoon-inspired aesthetic designed to appeal to newer golfers while maintaining credibility. The playful yet professional logo gives CJS a youthful, approachable feel, making golf instruction feel accessible and fun—exactly what the academy needed to attract the next generation of golfers.
                    </p>
                  </div>
                  <div>
                    <h4 className='text-base font-bold mb-3 flex items-center gap-2' style={{ color: '#3B82F6' }}>
                      ● The Result
                    </h4>
                    <p className='text-zinc-300 text-sm leading-relaxed'>
                      The rebrand positioned CJS Golf Academy as a premium instruction provider, resulting in a 45% increase in membership inquiries and stronger brand recognition within the local golf community.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='mt-8 pt-6 border-t border-zinc-700/30 text-center'
            >
              <p className='text-zinc-400 mb-4'>
                Let&apos;s discuss how we can build your complete brand ecosystem:
              </p>
              <ScheduleButton text='Schedule Consultation' className='px-6 py-2 text-sm' />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
