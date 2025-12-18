'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { openCalendlyPopup } from '@/lib/calendly';
import {
  ChevronDown,
  HelpCircle,
  Users,
  Calendar,
  Smartphone,
  Settings,
  Shield,
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface GolfFAQProps {
  items?: FAQItem[];
  className?: string;
}

const getQuestionIcon = (question: string) => {
  if (
    question.toLowerCase().includes('member') ||
    question.toLowerCase().includes('booking')
  ) {
    return Users;
  } else if (
    question.toLowerCase().includes('mobile') ||
    question.toLowerCase().includes('app')
  ) {
    return Smartphone;
  } else if (
    question.toLowerCase().includes('integrate') ||
    question.toLowerCase().includes('system')
  ) {
    return Settings;
  } else if (
    question.toLowerCase().includes('lottery') ||
    question.toLowerCase().includes('fair')
  ) {
    return Calendar;
  } else if (
    question.toLowerCase().includes('brand') ||
    question.toLowerCase().includes('custom')
  ) {
    return Shield;
  }
  return HelpCircle;
};

const defaultFAQs: FAQItem[] = [
  {
    q: 'How does the lottery system ensure fairness?',
    a: "Our algorithm tracks member booking history and uses fairness scoring to ensure equitable access to prime tee times over time. Members who haven't had recent premium slots get priority in future drawings.",
  },
  {
    q: 'Can members book tee times on mobile?',
    a: 'Yes, the mobile PWA allows members to book tee times, invite guests, manage their reservations, and receive real-time notifications from any device, even when offline.',
  },
  {
    q: 'How does pace-of-play monitoring work?',
    a: 'GPS tracking monitors group positions across all 18 holes, providing real-time pace alerts to staff and automated notifications to slow groups to maintain course flow.',
  },
  {
    q: 'Can we customize it for our course branding?',
    a: 'Yes. Each course gets independent branding, custom color schemes, logo integration, course-specific messaging, and can even white-label the entire system.',
  },
];

export default function GolfFAQ({
  items = defaultFAQs,
  className = '',
}: GolfFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-green-100 bg-clip-text text-transparent'>
            Frequently Asked Questions
          </h2>
          <p className='text-xl text-zinc-300 max-w-3xl mx-auto'>
            Everything you need to know about implementing GolfSync at your
            course
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className='space-y-4'>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const IconComponent = getQuestionIcon(item.q);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group'
              >
                <div
                  className={`
                    relative rounded-xl border backdrop-blur-sm transition-all duration-300 cursor-pointer
                    ${
                      isOpen
                        ? 'bg-gradient-to-r from-emerald-500/10 to-green-500/5 border-emerald-400/30 shadow-lg shadow-emerald-500/10'
                        : 'bg-zinc-900/40 border-zinc-700/50 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                    }
                  `}
                  onClick={() => toggleFAQ(index)}
                >
                  {/* Golf course themed background pattern */}
                  <div className='absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.4),transparent_50%)] rounded-xl' />

                  {/* Question */}
                  <div className='relative p-6 flex items-center justify-between'>
                    <div className='flex items-center gap-4 flex-1 min-w-0'>
                      <div
                        className={`
                        p-2 rounded-lg transition-all duration-300
                        ${
                          isOpen
                            ? 'bg-emerald-500/20 border border-emerald-400/30'
                            : 'bg-zinc-700/50 border border-zinc-600/30 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20'
                        }
                      `}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isOpen
                              ? 'text-emerald-400'
                              : 'text-zinc-400 group-hover:text-emerald-400'
                          }`}
                        />
                      </div>

                      <h3
                        className={`font-semibold text-left transition-colors duration-300 ${
                          isOpen
                            ? 'text-white'
                            : 'text-zinc-200 group-hover:text-white'
                        }`}
                      >
                        {item.q}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`ml-4 transition-colors duration-300 ${
                        isOpen
                          ? 'text-emerald-400'
                          : 'text-zinc-400 group-hover:text-emerald-400'
                      }`}
                    >
                      <ChevronDown className='w-5 h-5' />
                    </motion.div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='overflow-hidden'
                      >
                        <div className='px-6 pb-6'>
                          <div className='pl-14 border-l-2 border-emerald-400/20'>
                            <p className='text-zinc-300 leading-relaxed'>
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Golf ball indicator for open state */}
                  {isOpen && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className='absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50'
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-16 text-center'
        >
          <div className='p-8 bg-gradient-to-r from-emerald-900/20 to-green-900/10 rounded-xl border border-emerald-500/20 backdrop-blur-sm'>
            <h3 className='text-xl font-semibold text-white mb-3 flex items-center justify-center gap-2'>
              <HelpCircle className='w-5 h-5 text-emerald-400' />
              Still have questions?
            </h3>
            <p className='text-zinc-300 mb-6 max-w-2xl mx-auto'>
              Our golf course operations experts are here to help you understand
              how GolfSync can transform your tee sheet management and member
              experience.
            </p>

            <div className='flex justify-center'>
              <button 
                onClick={() => openCalendlyPopup('https://calendly.com/swiftwareco/30min')}
                className='inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300'
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </motion.div>

        {/* Golf course expertise note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='mt-8 text-center'
        >
          <div className='flex items-center justify-center gap-2 text-sm text-zinc-400'>
            <div className='w-1 h-1 bg-emerald-400/50 rounded-full' />
            <span>
              Built by golf operations experts for golf course professionals
            </span>
            <div className='w-1 h-1 bg-emerald-400/50 rounded-full' />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
