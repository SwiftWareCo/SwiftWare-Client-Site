'use client';

import { motion } from 'motion/react';

export function MarketingCaseStudy() {
  return (
    <section className='py-16 sm:py-24 border-t border-zinc-800'>
      <div className='text-center mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
          Featured Case Study
        </h2>
        <p className='text-lg text-zinc-400 max-w-2xl mx-auto'>
          See how we helped Vancouver Hood Doctors grow their online presence
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden'
      >
        <div className='p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <h3 className='text-2xl sm:text-3xl font-bold mb-4 text-white'>
              Vancouver Hood Doctors
            </h3>
            <p className='text-zinc-300 mb-6 leading-relaxed'>
              A local dental practice needed to increase their patient acquisition and online visibility. We implemented a comprehensive SEO and content strategy to rank for high-intent local keywords.
            </p>

            <div className='space-y-4 mb-8'>
              <div className='flex items-start gap-3'>
                <div className='text-emerald-500 font-bold text-xl mt-1'>
                  +150%
                </div>
                <div>
                  <p className='font-semibold text-white'>Organic Traffic</p>
                  <p className='text-sm text-zinc-400'>
                    Increased monthly organic visitors
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='text-emerald-500 font-bold text-xl mt-1'>
                  +3
                </div>
                <div>
                  <p className='font-semibold text-white'>
                    Top Keywords Rankings
                  </p>
                  <p className='text-sm text-zinc-400'>
                    Ranked #1 for competitive local terms
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='text-emerald-500 font-bold text-xl mt-1'>
                  +45%
                </div>
                <div>
                  <p className='font-semibold text-white'>Lead Increase</p>
                  <p className='text-sm text-zinc-400'>
                    Qualified appointment requests
                  </p>
                </div>
              </div>
            </div>

            <p className='text-sm text-zinc-400 italic'>
              &quot;SwiftWare took our online presence seriously and delivered results. We&apos;re getting qualified patients from Google now.&quot; - Dr. Hood, Vancouver Hood Doctors
            </p>
          </div>

          <div className='bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-lg p-8 h-full flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-sm text-zinc-400 mb-2'>
                View full case study
              </p>
              <button className='text-emerald-500 font-semibold hover:text-emerald-400 transition-colors'>
                Read More →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
