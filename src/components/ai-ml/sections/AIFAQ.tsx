'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Shield, Brain, Database, Zap } from 'lucide-react';

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

const PRIMARY_COLOR = 'var(--color-primary-service)';
const PRIMARY_RGB_VAR = '--color-primary-service-rgb' as const;
const SECONDARY_RGB_VAR = '--color-secondary-service-rgb' as const;

const withAlpha = (cssVar: string, alpha: number) =>
  `rgba(var(${cssVar}), ${alpha})`;

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function AIFAQ() {
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
          style={{ backgroundColor: withAlpha(PRIMARY_RGB_VAR, 0.12) }}
        />
        <div
          className='absolute bottom-1/4 right-1/4 size-80 rounded-full blur-3xl'
          style={{ backgroundColor: withAlpha(SECONDARY_RGB_VAR, 0.1) }}
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
                PRIMARY_RGB_VAR,
                0.75
              )} 50%, ${withAlpha(SECONDARY_RGB_VAR, 0.6)} 100%)`,
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
                  className='
                    w-full cursor-pointer rounded-2xl border p-6 text-left transition-all duration-300
                    border-[color:rgba(var(--color-primary-service-rgb),0.25)]
                    bg-[linear-gradient(135deg,rgba(var(--color-primary-service-rgb),0.08),rgba(var(--color-secondary-service-rgb),0.05))]
                    hover:border-[color:rgba(var(--color-primary-service-rgb),0.4)]
                    hover:shadow-[0_20px_48px_rgba(var(--color-primary-service-rgb),0.18)]
                  '
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-4 flex-1'>
                      <div
                        className='
                          flex-shrink-0 rounded-xl border p-3 transition-transform duration-300
                          border-[color:rgba(var(--color-primary-service-rgb),0.25)]
                          group-hover:scale-110
                        '
                        style={{
                          background: `linear-gradient(135deg, ${withAlpha(
                            PRIMARY_RGB_VAR,
                            0.18
                          )}, ${withAlpha(SECONDARY_RGB_VAR, 0.12)})`,
                        }}
                      >
                        <IconComponent className='h-5 w-5 text-[color:var(--color-primary-service)]' />
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
                        className={`h-5 w-5 transition-colors duration-300 ${
                          isOpen
                            ? 'text-[color:var(--color-primary-service)]'
                            : 'text-muted-foreground'
                        }`}
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
                        className='
                          rounded-b-2xl border border-t-0 p-6 backdrop-blur-sm
                          border-[color:rgba(var(--color-primary-service-rgb),0.2)]
                          bg-[color:rgba(var(--color-secondary-service-rgb),0.08)]
                        '
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
