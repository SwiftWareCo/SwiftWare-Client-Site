'use client';

import { motion } from 'motion/react';
import { Upload, Brain, Search, BarChart3, CheckCircle } from 'lucide-react';
import { openCalendlyPopup } from '@/lib/calendly';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const PRIMARY_COLOR = 'var(--color-primary-service)';
const SECONDARY_COLOR = 'var(--color-secondary-service)';
const PRIMARY_RGB_VAR = '--color-primary-service-rgb' as const;
const SECONDARY_RGB_VAR = '--color-secondary-service-rgb' as const;

const withAlpha = (cssVar: string, alpha: number) =>
  `rgba(var(${cssVar}), ${alpha})`;

const PROCESS_STEPS = [
  {
    id: 'ingest',
    icon: Upload,
    title: 'Data Ingestion',
    description:
      'Upload documents, connect databases, or integrate with your existing systems',
    details: [
      'PDFs, Word docs, spreadsheets',
      'Database connections',
      'API integrations',
      'Real-time sync',
    ],
    highlightAlpha: 0.22,
  },
  {
    id: 'process',
    icon: Brain,
    title: 'AI Processing',
    description:
      'Intelligent chunking, embedding generation, and metadata extraction',
    details: [
      'Smart document chunking',
      'Vector embeddings',
      'Metadata extraction',
      'Content classification',
    ],
    highlightAlpha: 0.26,
  },
  {
    id: 'search',
    icon: Search,
    title: 'Hybrid Search',
    description:
      'Semantic understanding combined with keyword precision for accurate results',
    details: [
      'Vector similarity search',
      'Keyword matching',
      'Context ranking',
      'Real-time results',
    ],
    highlightAlpha: 0.2,
  },
  {
    id: 'insights',
    icon: BarChart3,
    title: 'AI Insights',
    description:
      'Generate actionable insights and automated analysis from your data',
    details: [
      'Pattern recognition',
      'Trend analysis',
      'Predictive insights',
      'Automated reports',
    ],
    highlightAlpha: 0.24,
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const detailVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export default function AIProcessFlow() {
  return (
    <section
      className='py-20'
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${withAlpha(
          PRIMARY_RGB_VAR,
          0.08
        )} 45%, transparent 100%)`,
      }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='mb-16 text-center'>
          <motion.h2
            variants={fadeInVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
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
            How SwiftMind Transforms Your Data
          </motion.h2>
          <motion.p
            variants={fadeInVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='mx-auto max-w-3xl text-xl text-muted-foreground'
          >
            From raw documents to intelligent insights, our AI pipeline
            automates the entire process of turning your data into actionable
            business intelligence.
          </motion.p>
        </div>

        {/* Process Flow */}
        <div className='relative mx-auto max-w-6xl'>
          {/* Connection lines */}
          <div
            className='absolute left-0 right-0 hidden h-px -translate-y-1/2 transform bg-[linear-gradient(90deg,rgba(0,0,0,0),rgba(var(--color-primary-service-rgb),0.3),rgba(0,0,0,0))] lg:block'
            style={{ top: '50%' }}
          />

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group relative'
                >
                  {/* Step number */}
                  <div
                    className='absolute -left-4 -top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-primary-foreground'
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Main card */}
                  <div
                    className='
                      relative rounded-2xl border p-6 transition-all duration-500
                      border-[color:rgba(var(--color-primary-service-rgb),0.24)]
                      bg-[linear-gradient(135deg,rgba(var(--color-primary-service-rgb),0.08),rgba(var(--color-secondary-service-rgb),0.05))]
                      hover:border-[color:rgba(var(--color-primary-service-rgb),0.4)]
                      hover:shadow-[0_0_30px_rgba(var(--color-primary-service-rgb),0.14)]
                      group-hover:scale-[1.02]
                    '
                  >
                    {/* Icon */}
                    <div
                      className='
                        mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-primary-foreground transition-all duration-300
                        group-hover:shadow-[0_16px_32px_rgba(var(--color-primary-service-rgb),0.2)]
                      '
                      style={{
                        background: `linear-gradient(135deg, ${withAlpha(
                          PRIMARY_RGB_VAR,
                          step.highlightAlpha
                        )}, ${withAlpha(SECONDARY_RGB_VAR, step.highlightAlpha - 0.05)})`,
                      }}
                    >
                      <Icon className='h-8 w-8' />
                    </div>

                    {/* Content */}
                    <h3 className='mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary-foreground'>
                      {step.title}
                    </h3>

                    <p className='mb-4 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground'>
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className='space-y-2'>
                      {step.details.map((detail, detailIndex) => (
                        <motion.li
                          key={`${step.id}-${detail}`}
                          variants={detailVariants}
                          initial='hidden'
                          whileInView='visible'
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + detailIndex * 0.05 + 0.3,
                          }}
                          className='flex items-center gap-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground'
                        >
                          <CheckCircle
                            className='h-3 w-3 flex-shrink-0'
                            style={{ color: PRIMARY_COLOR }}
                          />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className='pointer-events-none absolute inset-0 rounded-2xl'
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `linear-gradient(135deg, ${withAlpha(
                          PRIMARY_RGB_VAR,
                          0.12
                        )}, ${withAlpha(SECONDARY_RGB_VAR, 0.1)})`,
                      }}
                    />

                    {/* Processing indicator */}
                    <div className='absolute right-4 top-4'>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                        className='h-2 w-2 rounded-full'
                        style={{ backgroundColor: PRIMARY_COLOR }}
                      />
                    </div>
                  </div>

                  {/* Arrow connector (hidden on mobile) */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className='absolute -right-4 top-1/2 hidden -translate-y-1/2 transform lg:block'>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        className='flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground'
                        style={{
                          background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
                        }}
                      >
                        <motion.span
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom section */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className='mt-16 text-center'
        >
          <div
            className='
              mx-auto max-w-3xl rounded-2xl border p-8
              border-[color:rgba(var(--color-primary-service-rgb),0.24)]
              bg-[linear-gradient(135deg,rgba(var(--color-primary-service-rgb),0.12),rgba(var(--color-secondary-service-rgb),0.08))]
            '
          >
            <h3 className='mb-4 text-2xl font-semibold text-foreground'>
              Ready to See Your Data Come Alive?
            </h3>
            <p className='mb-6 text-muted-foreground'>
              Experience the full AI pipeline with your own data in a
              personalized demo.
            </p>
            <InteractiveHoverButton
              text='Schedule Live Demo'
              onClick={() =>
                openCalendlyPopup('https://calendly.com/swiftwareco/30min')
              }
              className='mx-auto w-64'
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
