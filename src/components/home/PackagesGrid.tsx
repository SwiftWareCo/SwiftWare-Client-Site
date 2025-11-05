'use client';

import { motion } from 'motion/react';

interface Package {
  name: string;
  services: string[];
  description: string;
}

interface PackagesGridProps {
  packages: Package[];
}

export function PackagesGrid({ packages }: PackagesGridProps) {
  return (
    <div className='relative'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24'>
        <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            Service Packages
          </h2>
          <p className='text-lg text-zinc-400 max-w-2xl mx-auto'>
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
              className='p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors'
            >
              <h3 className='text-lg font-semibold mb-2 text-white'>
                {pkg.name}
              </h3>
              <p className='text-sm text-zinc-400 mb-4'>{pkg.description}</p>
              <ul className='space-y-2 mb-6'>
                {pkg.services.map((svc, i) => (
                  <li key={i} className='text-sm text-zinc-300 flex items-start gap-2'>
                    <span className='text-blue-400 mt-0.5'>✓</span>
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
              <button className='w-full py-2 px-4 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors text-sm font-medium text-white'>
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
