'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';
import * as LucideIcons from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  iconName?: keyof typeof LucideIcons;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface FeaturesSectionProps {
  title?: string;
  description?: string;
  features?: readonly Feature[];
  items?: readonly Feature[]; // Alias for features
  variant?: 'grid' | 'list';
}

export function FeaturesSection({
  title,
  description,
  features,
  items,
  variant = 'grid',
}: FeaturesSectionProps) {
  // Use items as fallback for features
  const featuresList = features || items || [];
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  return (
    <section className='py-16 sm:py-24'>
      {title && (
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
      )}

      {variant === 'grid' ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='group relative p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50'
            >
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none' />

              {(feature.iconName || feature.icon) && (
                <div
                  className='mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg'
                  style={{
                    background: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                  }}
                >
                  {feature.icon ? (
                    <feature.icon
                      className='h-6 w-6'
                      style={{ color: colors.primary }}
                    />
                  ) : feature.iconName ? (
                    (() => {
                      const IconComponent = LucideIcons[
                        feature.iconName
                      ] as React.ComponentType<{
                        className?: string;
                        style?: React.CSSProperties;
                      }>;
                      return (
                        <IconComponent
                          className='h-6 w-6'
                          style={{ color: colors.primary }}
                        />
                      );
                    })()
                  ) : null}
                </div>
              )}

              <h3 className='text-xl font-semibold mb-2 text-white'>
                {feature.title}
              </h3>
              <p className='text-zinc-400'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className='space-y-6'>
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='flex gap-4 items-start p-6 rounded-xl border border-zinc-800 bg-zinc-900/30'
            >
              {(feature.iconName || feature.icon) && (
                <div
                  className='flex-shrink-0 mt-1 inline-flex items-center justify-center w-10 h-10 rounded-lg'
                  style={{
                    background: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                  }}
                >
                  {feature.icon ? (
                    <feature.icon
                      className='h-5 w-5'
                      style={{ color: colors.primary }}
                    />
                  ) : feature.iconName ? (
                    (() => {
                      const IconComponent = LucideIcons[
                        feature.iconName
                      ] as React.ComponentType<{
                        className?: string;
                        style?: React.CSSProperties;
                      }>;
                      return (
                        <IconComponent
                          className='h-5 w-5'
                          style={{ color: colors.primary }}
                        />
                      );
                    })()
                  ) : null}
                </div>
              )}
              <div>
                <h3 className='text-lg font-semibold mb-1 text-white'>
                  {feature.title}
                </h3>
                <p className='text-zinc-400'>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
