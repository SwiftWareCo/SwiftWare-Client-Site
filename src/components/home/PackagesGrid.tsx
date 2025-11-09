'use client';

import { motion } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';

interface Package {
  name: string;
  services: string[];
  description: string;
}

interface PackagesGridProps {
  packages: Package[];
}

export function PackagesGrid({ packages }: PackagesGridProps) {
  const { colors } = useColorScheme();
  return (
    <section className='relative py-16 sm:py-24 bg-purple-100 dark:bg-zinc-800'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-purple-900 dark:text-zinc-100'>
            Service Packages
          </h2>
          <p className='text-lg max-w-2xl mx-auto text-purple-700 dark:text-zinc-300'>
            Bundled solutions designed for different business goals
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='p-6 rounded-lg border border-purple-300 dark:border-zinc-700 bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-colors'
            >
              <h3 className='text-lg font-semibold mb-2 text-purple-900 dark:text-zinc-100'>
                {pkg.name}
              </h3>
              <p className='text-sm mb-4 text-purple-700 dark:text-zinc-300'>{pkg.description}</p>
              <ul className='space-y-2 mb-6'>
                {pkg.services.map((svc, i) => (
                  <li key={i} className='text-sm flex items-start gap-2 text-purple-800 dark:text-zinc-200'>
                    <span className='mt-0.5' style={{ color: colors.primary }}>
                      ✓
                    </span>
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
              <button
                className='cursor-pointer w-full py-2 px-4 rounded-lg border border-purple-400 dark:border-zinc-600 hover:bg-purple-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium text-purple-900 dark:text-zinc-100'
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
