'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

interface Package {
  name: string;
  services: string[];
  description: string;
}

interface PackagesGridProps {
  packages: Package[];
}

export function PackagesGrid({ packages }: PackagesGridProps) {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);
  return (
    <section className='relative py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-foreground'>
            Service Packages
          </h2>
          <p className='text-lg max-w-2xl mx-auto text-foreground/70'>
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
              className='p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-all'
              style={{
                backgroundColor: 'var(--gray-a3)',
              }}
            >
              <h3 className='text-lg font-semibold mb-2 text-foreground'>
                {pkg.name}
              </h3>
              <p className='text-sm mb-4 text-foreground/70'>{pkg.description}</p>
              <ul className='space-y-2 mb-6'>
                {pkg.services.map((svc, i) => (
                  <li key={i} className='text-sm flex items-start gap-2 text-foreground/80'>
                    <span className='mt-0.5' style={{ color: colors.primary }}>
                      ✓
                    </span>
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
              <button
                className='cursor-pointer w-full py-2 px-4 rounded-lg border transition-all text-sm font-medium text-foreground'
                style={{
                  borderColor: colors.primary,
                  backgroundColor: `rgba(${colorsRGB.primaryRGB}, 0.1)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(${colorsRGB.primaryRGB}, 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(${colorsRGB.primaryRGB}, 0.1)`;
                }}
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
