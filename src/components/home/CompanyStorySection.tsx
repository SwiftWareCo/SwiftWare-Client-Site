'use client';

import { motion } from 'motion/react';

export function CompanyStorySection() {
  return (
    <section className='relative py-16 sm:py-24 bg-blue-100 dark:bg-zinc-900'>
      <div className='mx-auto max-w-4xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-blue-900 dark:text-zinc-100'>
            Why We Built SwiftWare
          </h2>
          <p className='text-lg sm:text-xl mb-6 leading-relaxed text-blue-800 dark:text-zinc-300'>
            We got tired of seeing businesses work with multiple agencies that didn&apos;t communicate with each other. You&apos;d get a brand from one agency, marketing from another, and software from a third—all disconnected.
          </p>
          <p className='text-lg sm:text-xl mb-6 leading-relaxed text-blue-800 dark:text-zinc-300'>
            So we built SwiftWare. One partner. One unified strategy. All four services working together to actually transform your business.
          </p>
          <p className='text-lg sm:text-xl leading-relaxed text-blue-800 dark:text-zinc-300'>
            We&apos;re young but proven. We&apos;ve already helped dozens of businesses across North America double their revenue, get ranked on the first page of Google, and build software that actually works.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
