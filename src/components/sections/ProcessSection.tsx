'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';
import { ArrowRight } from 'lucide-react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title: string;
  description?: string;
  steps: ProcessStep[];
}

export function ProcessSection({
  title,
  description,
  steps,
}: ProcessSectionProps) {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  return (
    <section className='py-16 sm:py-24'>
      <div className='text-center mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
          {title}
        </h2>
        {description && (
          <p className='text-lg text-zinc-400 max-w-2xl mx-auto'>
            {description}
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'>
        {/* Connection lines (desktop only) */}
        <div className='hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent' />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className='relative'
          >
            {/* Step number circle */}
            <div className='mb-6 relative'>
              <div
                className='flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl border-2 relative'
                style={{
                  borderColor: colors.primary,
                  background: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                }}
              >
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <ArrowRight
                  className='hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 h-6 w-6'
                  style={{ color: colors.primary }}
                />
              )}
            </div>

            <h3 className='text-xl font-semibold mb-3 text-white'>
              {step.title}
            </h3>
            <p className='text-zinc-400 leading-relaxed'>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
