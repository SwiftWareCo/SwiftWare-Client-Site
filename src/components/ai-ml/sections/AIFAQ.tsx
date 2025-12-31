'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Shield, Brain, Database, Zap } from 'lucide-react';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'why-need-this',
    question: 'Why do you need this?',
    answer:
      'Most businesses have valuable insights trapped in documents, emails, and databases that are impossible to access quickly. SwiftMind transforms this scattered information into an intelligent, searchable knowledge base that provides instant answers, accelerates decision-making, and eliminates time wasted searching for information.',
    icon: Brain,
  },
  {
    id: 'data-security',
    question: 'How secure is our data?',
    answer:
      'Enterprise-grade encryption with multi-tenant isolation, role-based access control, and comprehensive audit logging. Your data never leaves your secure environment.',
    icon: Shield,
  },
  {
    id: 'file-formats',
    question: 'What file formats are supported?',
    answer:
      'We support PDFs, Word docs, Excel files, CSVs, plain text, and can integrate with your existing document management systems.',
    icon: Database,
  },
  {
    id: 'hybrid-search',
    question: 'How does the hybrid search work?',
    answer:
      'Our system combines semantic vector search for contextual understanding with traditional keyword matching for precision, giving you the best of both approaches.',
    icon: Zap,
  },
];

const withAlpha = (rgb: string, alpha: number) => `rgba(${rgb}, ${alpha})`;

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function AIFAQ() {
  const pathname = usePathname();
  const colorsRGB = getColorsRGBFromPath(pathname);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className='relative overflow-hidden py-20'>
      {/* Background effects */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute left-1/4 top-1/4 size-96 rounded-full blur-3xl'
          style={{ backgroundColor: withAlpha(colorsRGB.primaryRGB, 0.12) }}
        />
        <div
          className='absolute bottom-1/4 right-1/4 size-80 rounded-full blur-3xl'
          style={{ backgroundColor: withAlpha(colorsRGB.secondaryRGB, 0.1) }}
        />
      </div>

      <div className='mx-auto max-w-4xl px-4 sm:px-6'>
        <motion.div
          variants={fadeVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='mb-16 text-center'
        >
          <h2
            className='mb-6 text-4xl font-bold text-transparent'
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${withAlpha(
                colorsRGB.primaryRGB,
                0.75
              )} 50%, ${withAlpha(colorsRGB.secondaryRGB, 0.6)} 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className='mx-auto max-w-2xl text-xl text-muted-foreground'>
            Everything you need to know about our AI-powered business
            intelligence platform.
          </p>
        </motion.div>

        <div className='space-y-4'>
          {FAQ_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            const isOpen = openItems.has(item.id);

            return (
              <motion.div
                key={item.id}
                variants={fadeVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='group'
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className='w-full cursor-pointer rounded-2xl border p-6 text-left transition-all duration-300'
                  style={{
                    borderColor: `rgba(${colorsRGB.primaryRGB}, 0.25)`,
                    background: `linear-gradient(135deg, rgba(${colorsRGB.primaryRGB}, 0.08), rgba(${colorsRGB.secondaryRGB}, 0.05))`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colorsRGB.primaryRGB}, 0.4)`;
                    e.currentTarget.style.boxShadow = `0 20px 48px rgba(${colorsRGB.primaryRGB}, 0.18)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colorsRGB.primaryRGB}, 0.25)`;
                    e.currentTarget.style.boxShadow = '';
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-4 flex-1'>
                      <div
                        className='
                          flex-shrink-0 rounded-xl border p-3 transition-transform duration-300
                          group-hover:scale-110
                        '
                        style={{
                          background: `linear-gradient(135deg, ${withAlpha(
                            colorsRGB.primaryRGB,
                            0.18
                          )}, ${withAlpha(colorsRGB.secondaryRGB, 0.12)})`,
                          borderColor: `rgba(${colorsRGB.primaryRGB}, 0.25)`,
                        }}
                      >
                        <IconComponent className='h-5 w-5 text-service-ai' />
                      </div>
                      <h3 className='text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-foreground'>
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className='flex-shrink-0'
                    >
                      <ChevronDown
                        className='h-5 w-5 transition-colors duration-300'
                        style={{
                          color: isOpen
                            ? `rgba(${colorsRGB.primaryRGB}, 1)`
                            : undefined,
                        }}
                      />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <div
                        id={`faq-answer-${item.id}`}
                        className='rounded-b-2xl border border-t-0 p-6 backdrop-blur-sm'
                        style={{
                          borderColor: `rgba(${colorsRGB.primaryRGB}, 0.2)`,
                          backgroundColor: `rgba(${colorsRGB.secondaryRGB}, 0.08)`,
                        }}
                      >
                        <p className='leading-relaxed text-muted-foreground'>
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
