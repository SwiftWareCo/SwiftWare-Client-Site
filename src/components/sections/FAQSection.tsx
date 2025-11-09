'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useColorScheme } from '@/context/ColorSchemeContext';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  items: FAQItem[];
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  description,
  items,
}: FAQSectionProps) {
  const { colors } = useColorScheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className='py-16 sm:py-24'>
      <div className='text-center mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-purple-900 dark:text-zinc-100'>
          {title}
        </h2>
        {description && (
          <p className='text-lg text-purple-700 dark:text-zinc-300 max-w-2xl mx-auto'>
            {description}
          </p>
        )}
      </div>

      <div className='max-w-3xl mx-auto space-y-4'>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className='rounded-lg border border-purple-300 dark:border-zinc-700 overflow-hidden bg-white/40 dark:bg-zinc-900/40'
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className='cursor-pointer w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-colors'
              style={{
                borderBottom:
                  openIndex === index
                    ? `2px solid ${colors.primary}`
                    : 'none',
              }}
            >
              <h3 className='text-lg font-semibold text-purple-900 dark:text-zinc-100 pr-4'>
                {item.question}
              </h3>
              <ChevronDown
                className='h-5 w-5 flex-shrink-0 transition-transform'
                style={{
                  color: colors.primary,
                  transform:
                    openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='border-t border-purple-300 dark:border-zinc-700 bg-purple-50/50 dark:bg-zinc-800/50'
                >
                  <div className='px-6 py-4 text-purple-800 dark:text-zinc-300'>
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
