'use client';

import { motion } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Deliverable {
  title: string;
  description: string;
  iconName: keyof typeof LucideIcons;
  items: string[];
}

const deliverables: Deliverable[] = [
  {
    title: 'MESSAGE',
    description: 'Core brand storytelling & communication',
    iconName: 'MessageSquare',
    items: [
      'Brand Strategy',
      'Brand Story',
      'Brand Audit',
      'Brand Refresh',
      'Creative Writing',
      'Campaign Messaging',
    ],
  },
  {
    title: 'VISUAL',
    description: 'Creative visual identity & design assets',
    iconName: 'Palette',
    items: [
      'Branding',
      'Logo Development',
      'Identity Applications',
      'Brand Guidelines',
      'Graphics & Illustrations',
      'Infographics',
      'Photography Art Direction',
      'Video Art Direction',
    ],
  },
  {
    title: 'ENVIRONMENTAL',
    description: 'Physical & spatial brand experiences',
    iconName: 'Map',
    items: [
      'Signage',
      'Wayfinding',
      'Tradeshow Booths',
      'Guerilla Marketing',
      'Out of Home',
      'Installation Art Direction',
    ],
  },
  {
    title: 'PRINT',
    description: 'Tangible branded materials & campaigns',
    iconName: 'Printer',
    items: [
      'Print Ad Campaigns',
      'Collateral',
      'Brochures',
      'Annual Reports',
      'Business Cards',
      'Packaging',
      'Menus',
    ],
  },
  {
    title: 'DIGITAL',
    description: 'Online brand presence & campaigns',
    iconName: 'Monitor',
    items: [
      'Web Design',
      'Web Refresh',
      'Digital Ad Campaigns',
      'Social Ad Campaigns',
    ],
  },
  {
    title: 'MEDIA',
    description: 'Video & multimedia storytelling',
    iconName: 'Video',
    items: [
      'Video Concepts',
      'Video Campaigns',
      'Storyboarding',
      'Scripts',
    ],
  },
];

export function BrandDeliverablesShowcase() {
  const { colors } = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % deliverables.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + deliverables.length) % deliverables.length);
  };

  return (
    <section>
      <div className='text-center py-12 mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
          What You Actually Get
        </h2>
        <p className='text-lg text-zinc-400 max-w-2xl mx-auto'>
          Everything you need to launch and maintain your brand across all platforms
        </p>
      </div>

      <div>
        {/* Carousel with Navigation */}
        <div className='flex items-center justify-center gap-4 lg:gap-8'>
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className='flex-shrink-0 p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-900 transition-colors border border-zinc-700/50 cursor-pointer'
            aria-label='Previous slide'
          >
            <ChevronLeft className='h-6 w-6 text-white' />
          </button>

          {/* Carousel Container */}
          <div className='relative flex-1 max-w-4xl'>
            <div className='overflow-hidden'>
              <motion.div
                className='flex gap-6'
                animate={{ x: `-${currentIndex * 50}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {deliverables.map((card, idx) => (
                  <div
                    key={idx}
                    className='flex-shrink-0 w-1/2 px-2'
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className='group relative h-96 p-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/20 hover:border-zinc-700 transition-all flex flex-col'
                    >
                      {/* Gradient background on hover */}
                      <div
                        className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}10 0%, transparent 100%)`,
                        }}
                      />

                      {/* Content */}
                      <div className='relative z-10 flex flex-col h-full'>
                        {/* Top Section - Centered */}
                        <div className='flex flex-col items-center text-center flex-grow justify-center mb-6'>
                          {/* Icon */}
                          <div
                            className='mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl'
                            style={{
                              background: `${colors.primary}20`,
                            }}
                          >
                            {(() => {
                              const IconComponent = LucideIcons[card.iconName] as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
                              return (
                                <IconComponent
                                  className='h-8 w-8'
                                  style={{ color: colors.primary }}
                                />
                              );
                            })()}
                          </div>

                          {/* Title & Description */}
                          <h3 className='text-xl font-bold mb-2 text-white'>
                            {card.title}
                          </h3>
                          <p className='text-zinc-400 text-xs leading-relaxed'>
                            {card.description}
                          </p>
                        </div>

                        {/* Bottom Section - Items List */}
                        <div className='space-y-2 text-left'>
                          {card.items.map((item: string, itemIdx: number) => (
                            <motion.div
                              key={itemIdx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIdx * 0.05, duration: 0.4 }}
                              viewport={{ once: true }}
                              className='flex items-start gap-3'
                            >
                              <div
                                className='h-1.5 w-1.5 rounded-full mt-1 flex-shrink-0'
                                style={{ backgroundColor: colors.primary }}
                              />
                              <span className='text-xs text-zinc-300 leading-snug'>{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className='flex-shrink-0 p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-900 transition-colors border border-zinc-700/50 cursor-pointer'
            aria-label='Next slide'
          >
            <ChevronRight className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Indicators */}
        <div className='flex items-center justify-center gap-2 mt-8'>
          {deliverables.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className='cursor-pointer transition-all'
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: currentIndex === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentIndex === idx ? colors.primary : '#52525b',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className='mt-12 text-center'
      >
        <p className='text-zinc-400 mb-6'>
          All deliverables are provided in multiple formats ready for immediate use across digital and print channels.
        </p>
        <div
          className='inline-flex items-center rounded-full px-4 py-2 text-sm font-medium'
          style={{
            background: `${colors.primary}15`,
            color: colors.primary,
          }}
        >
          Complete Brand Toolkit Included
        </div>
      </motion.div>
    </section>
  );
}
