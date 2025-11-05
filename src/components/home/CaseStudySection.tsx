'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function CaseStudySection() {
  return (
    <div className='relative'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24'>
        <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            Our Impact
          </h2>
          <p className='text-lg text-zinc-400 max-w-2xl mx-auto'>
            See real results from real clients
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
              <div className='inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 mb-4 text-emerald-400 text-sm font-medium'>
                Featured Case Study
              </div>
              <h3 className='text-3xl font-bold mb-4 text-white'>
                Vancouver Hood Doctors
              </h3>
              <p className='text-zinc-300 mb-6 leading-relaxed'>
                A local dental practice needed to increase patient acquisition. We implemented SEO and content strategy to rank for high-intent local keywords and built them a custom web portal.
              </p>

              <div className='grid grid-cols-3 gap-4 mb-8'>
                <div>
                  <p className='text-2xl font-bold text-emerald-400'>+150%</p>
                  <p className='text-sm text-zinc-400'>Organic Traffic</p>
                </div>
                <div>
                  <p className='text-2xl font-bold text-emerald-400'>#1</p>
                  <p className='text-sm text-zinc-400'>Local Rankings</p>
                </div>
                <div>
                  <p className='text-2xl font-bold text-emerald-400'>+45%</p>
                  <p className='text-sm text-zinc-400'>Lead Increase</p>
                </div>
              </div>

              <Link href='/case-studies'>
                <button className='inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium'>
                  <span>View Full Case Study</span>
                  <ArrowRight className='h-4 w-4' />
                </button>
              </Link>
            </div>

            <div className='bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-lg p-8 h-96 flex items-center justify-center'>
              <div className='text-center'>
                <p className='text-zinc-400 mb-4'>Professional website &<br />SEO optimization</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
