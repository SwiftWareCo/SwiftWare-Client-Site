'use client';

import { motion } from 'motion/react';
import { Upload, Brain, Search, BarChart3, CheckCircle } from 'lucide-react';

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
    color: 'from-teal-500 to-teal-600',
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
    color: 'from-blue-500 to-blue-600',
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
    color: 'from-green-500 to-green-600',
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
    color: 'from-purple-500 to-purple-600',
  },
];

export default function AIProcessFlow() {
  return (
    <section className='py-20 bg-gradient-to-b from-transparent via-teal-500/3 to-transparent'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-teal-100 to-blue-100 bg-clip-text text-transparent'
          >
            How SwiftMind Transforms Your Data
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-xl text-zinc-300 max-w-3xl mx-auto'
          >
            From raw documents to intelligent insights, our AI pipeline
            automates the entire process of turning your data into actionable
            business intelligence.
          </motion.p>
        </div>

        {/* Process Flow */}
        <div className='relative max-w-6xl mx-auto'>
          {/* Connection lines */}
          <div className='hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent transform -translate-y-1/2' />

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className='relative group'
                >
                  {/* Step number */}
                  <div className='absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10'>
                    {index + 1}
                  </div>

                  {/* Main card */}
                  <div className='relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-teal-400/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] group-hover:transform group-hover:scale-[1.02]'>
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon className='w-8 h-8 text-white' />
                    </div>

                    {/* Content */}
                    <h3 className='text-xl font-semibold text-white mb-3 group-hover:text-teal-100 transition-colors'>
                      {step.title}
                    </h3>

                    <p className='text-zinc-400 text-sm mb-4 leading-relaxed group-hover:text-zinc-300 transition-colors'>
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className='space-y-2'>
                      {step.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + detailIndex * 0.05 + 0.3,
                          }}
                          className='flex items-center gap-2 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors'
                        >
                          <CheckCircle className='w-3 h-3 text-teal-400 flex-shrink-0' />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className='absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-blue-500/5 pointer-events-none'
                      transition={{ duration: 0.3 }}
                    />

                    {/* Processing indicator */}
                    <div className='absolute top-4 right-4'>
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
                        className='w-2 h-2 rounded-full bg-teal-400'
                      />
                    </div>
                  </div>

                  {/* Arrow connector (hidden on mobile) */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className='hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20'>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        className='w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center'
                      >
                        <motion.div
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className='text-white text-sm'
                        >
                          →
                        </motion.div>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='text-center mt-16'
        >
          <div className='max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-400/20'>
            <h3 className='text-2xl font-semibold text-white mb-4'>
              Ready to See Your Data Come Alive?
            </h3>
            <p className='text-zinc-300 mb-6'>
              Experience the full AI pipeline with your own data in a
              personalized demo.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 cursor-pointer'>
                Book a Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
