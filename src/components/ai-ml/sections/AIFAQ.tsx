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
    <section className='py-20 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/4 left-1/4 size-96 bg-teal-500/3 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 size-80 bg-blue-500/4 rounded-full blur-3xl' />
      </div>

      <div className='max-w-4xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-teal-100 to-blue-100 bg-clip-text text-transparent'>
            Frequently Asked Questions
          </h2>
          <p className='text-xl text-zinc-300 max-w-2xl mx-auto'>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='group'
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className='w-full text-left p-6 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-teal-500/5 via-blue-500/3 to-zinc-900/40 backdrop-blur-sm hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 cursor-pointer'
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-4 flex-1'>
                      <div className='flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-500/30 group-hover:scale-110 transition-transform duration-300'>
                        <IconComponent className='w-5 h-5 text-teal-300' />
                      </div>
                      <h3 className='text-lg font-semibold text-white group-hover:text-teal-100 transition-colors duration-300'>
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className='flex-shrink-0'
                    >
                      <ChevronDown className='w-5 h-5 text-zinc-400 group-hover:text-teal-300 transition-colors duration-300' />
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
                        className='p-6 rounded-2xl border border-zinc-800/30 bg-zinc-900/20 backdrop-blur-sm border-t-0 rounded-t-none'
                      >
                        <p className='text-zinc-300 leading-relaxed'>
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
