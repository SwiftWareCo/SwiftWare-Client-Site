'use client';

import { motion } from 'motion/react';
import { useFocusContext } from '@/context/FocusContext';
import type { CapabilityTile } from '@/types/content';
import Icon from '@/components/ui/Icon';

interface SolutionOverviewProps {
  capabilities: CapabilityTile[];
}

export default function SolutionOverview({
  capabilities,
}: SolutionOverviewProps) {
  const { setFocus, setShowContactModal } = useFocusContext();

  // Filter to only show solution cards (not contact cards)
  const solutionCards = capabilities.filter(
    (cap) => cap.category === 'Solutions'
  );
  const contactCards = capabilities.filter((cap) => cap.category === 'Contact');

  const handleCardClick = (capability: CapabilityTile) => {
    if (capability.href?.startsWith('#focus-')) {
      // Scroll to top first, then navigate to specific focus
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const focusKey = capability.href?.replace('#focus-', '');
        if (
          focusKey === 'crm' ||
          focusKey === 'tee-sheet' ||
          focusKey === 'ai-ml' ||
          focusKey === 'web'
        ) {
          setFocus(focusKey);
        }
      }, 500); // Small delay to let scroll finish
    } else if (capability.href === '#scheduling') {
      // Scroll to scheduling section
      const element = document.querySelector('#scheduling');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (capability.href === '#contact') {
      // Open contact modal
      setShowContactModal(true);
    }
  };

  return (
    <section id='solutions' className='py-20 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent'
          >
            Our Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-xl text-zinc-300 max-w-3xl mx-auto'
          >
            Choose a solution area to learn more, or schedule a call to discuss
            your specific needs.
          </motion.p>
        </div>

        {/* Solution Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {solutionCards.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className='group cursor-pointer'
              onClick={() => handleCardClick(capability)}
            >
              <div className='h-full bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.08] hover:border-blue-500/50 transition-all duration-300'>
                <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300'>
                  <Icon
                    name={capability.icon || 'Sparkles'}
                    className='w-6 h-6 text-white'
                  />
                </div>

                <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors'>
                  {capability.title}
                </h3>

                <p className='text-zinc-400 text-sm mb-4 leading-relaxed'>
                  {capability.summary}
                </p>

                <div className='flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors'>
                  <span>{capability.cta || 'Learn More'}</span>
                  <motion.svg
                    className='w-4 h-4 ml-2'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    viewBox='0 0 24 24'
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
          {contactCards.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className='group cursor-pointer'
              onClick={() => handleCardClick(capability)}
            >
              <div
                className={`h-full backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
                  capability.highlight
                    ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-zinc-900/40 border-blue-500/30 hover:border-blue-500/50'
                    : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-purple-500/50'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300 ${
                    capability.highlight
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-blue-500/25'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500 group-hover:shadow-lg group-hover:shadow-purple-500/25'
                  }`}
                >
                  <Icon
                    name={capability.icon || 'Sparkles'}
                    className='w-6 h-6 text-white'
                  />
                </div>

                <h3
                  className={`text-lg font-semibold mb-2 transition-colors ${
                    capability.highlight
                      ? 'text-white group-hover:text-blue-300'
                      : 'text-white group-hover:text-purple-300'
                  }`}
                >
                  {capability.title}
                </h3>

                <p className='text-zinc-400 text-sm mb-4 leading-relaxed'>
                  {capability.summary}
                </p>

                <div
                  className={`flex items-center text-sm font-medium transition-colors ${
                    capability.highlight
                      ? 'text-blue-400 group-hover:text-blue-300'
                      : 'text-purple-400 group-hover:text-purple-300'
                  }`}
                >
                  <span>{capability.cta || 'Learn More'}</span>
                  <motion.svg
                    className='w-4 h-4 ml-2'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    viewBox='0 0 24 24'
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
