'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileText, Brain, Zap } from 'lucide-react';
import type { AISearchResult } from '@/types/ai-ml';

const DEMO_QUERIES = [
  'What are our Q3 revenue projections?',
  'Show me customer satisfaction trends',
  'Find documents about product roadmap',
  'Analyze competitor pricing strategies',
];

const DEMO_RESULTS: AISearchResult[] = [
  {
    id: '1',
    title: 'Q3 Financial Report - Revenue Analysis',
    snippet:
      'Revenue projections for Q3 show a 23% increase over Q2, driven primarily by enterprise client acquisitions and improved retention rates...',
    relevanceScore: 0.94,
    source: 'Financial Reports/Q3-2024-analysis.pdf',
    metadata: { department: 'Finance', date: '2024-09-01', pages: 15 },
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey Results',
    snippet:
      'Latest customer satisfaction metrics indicate 87% satisfaction rate, with significant improvements in support response times and product quality...',
    relevanceScore: 0.91,
    source: 'Customer Success/satisfaction-survey-aug-2024.xlsx',
    metadata: {
      department: 'Customer Success',
      date: '2024-08-15',
      responses: 1247,
    },
  },
  {
    id: '3',
    title: 'Product Roadmap - Strategic Initiatives',
    snippet:
      'Our 2024-2025 product roadmap focuses on AI integration, enhanced user experience, and expanded enterprise features...',
    relevanceScore: 0.88,
    source: 'Product/roadmap-2024-2025.docx',
    metadata: { department: 'Product', date: '2024-07-20', version: 'v2.1' },
  },
];

const PRIMARY_COLOR = 'var(--color-primary-service)';
const SECONDARY_COLOR = 'var(--color-secondary-service)';
const PRIMARY_RGB_VAR = '--color-primary-service-rgb' as const;
const SECONDARY_RGB_VAR = '--color-secondary-service-rgb' as const;

const withAlpha = (cssVar: string, alpha: number) =>
  `rgba(var(${cssVar}), ${alpha})`;

export default function AISearchDemo() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setQuery(searchQuery);
    setResults([]);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResults(DEMO_RESULTS);
    setIsSearching(false);
  };

  const handleQuickQuery = (demoQuery: string) => {
    setSelectedQuery(demoQuery);
    performSearch(demoQuery);
  };

  return (
    <div className='mx-auto max-w-4xl p-6'>
      <div className='mb-8 text-center'>
        <h3 className='mb-4 text-2xl font-bold text-foreground'>
          Experience Hybrid AI Search
        </h3>
        <p className='text-muted-foreground'>
          See how our AI combines semantic understanding with keyword precision
        </p>
      </div>

      {/* Search Interface */}
      <div className='relative mb-8'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground' />
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Ask anything about your business data...'
            className='
              w-full rounded-xl border border-white/10 bg-white/[0.05] px-12 py-4 text-foreground
              placeholder:text-muted-foreground focus:bg-white/[0.08] focus:outline-none
              focus:border-[color:rgba(var(--color-primary-service-rgb),0.45)]
              focus:shadow-[0_0_0_3px_rgba(var(--color-primary-service-rgb),0.15)]
              transition-all duration-300
            '
            onKeyPress={(e) =>
              e.key === 'Enter' && query && performSearch(query)
            }
          />
          {query && (
            <button
              onClick={() => performSearch(query)}
              disabled={isSearching}
              className='absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 disabled:opacity-50'
              style={{
                background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
                boxShadow: `0 12px 30px ${withAlpha(PRIMARY_RGB_VAR, 0.18)}`,
              }}
            >
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent'
                />
              ) : (
                'Search'
              )}
            </button>
          )}
        </div>

        {/* Quick Query Suggestions */}
        <div className='mt-4'>
          <p className='mb-3 text-sm text-muted-foreground'>
            Try these sample queries:
          </p>
          <div className='flex flex-wrap gap-2'>
            {DEMO_QUERIES.map((demoQuery, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickQuery(demoQuery)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-all duration-300 ${
                  selectedQuery === demoQuery
                    ? 'border-[color:rgba(var(--color-primary-service-rgb),0.35)] bg-[color:rgba(var(--color-primary-service-rgb),0.18)] text-[color:var(--color-primary-service)]'
                    : 'border-white/15 bg-white/[0.03] text-muted-foreground hover:border-[color:rgba(var(--color-primary-service-rgb),0.3)] hover:text-[color:var(--color-primary-service)]'
                }`}
              >
                {demoQuery}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Processing Animation */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='mb-8 rounded-xl border p-6'
            style={{
              background: `linear-gradient(135deg, ${withAlpha(
                PRIMARY_RGB_VAR,
                0.14
              )}, ${withAlpha(SECONDARY_RGB_VAR, 0.1)})`,
              borderColor: withAlpha(PRIMARY_RGB_VAR, 0.24),
            }}
          >
            <div className='mb-4 flex items-center gap-4'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className='h-6 w-6' style={{ color: PRIMARY_COLOR }} />
              </motion.div>
              <div>
                <h4 className='font-medium text-foreground'>
                  AI Search in Progress
                </h4>
                <p className='text-sm text-muted-foreground'>
                  Analyzing your query and searching knowledge base...
                </p>
              </div>
            </div>

            <div className='space-y-2'>
              {[
                'Semantic analysis',
                'Vector search',
                'Keyword matching',
                'Relevance ranking',
              ].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.4 }}
                  className='flex items-center gap-2 text-sm text-muted-foreground'
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                    className='h-2 w-2 rounded-full'
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  />
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='space-y-4'
          >
            <div className='mb-6 flex items-center gap-2'>
              <Zap className='h-5 w-5' style={{ color: PRIMARY_COLOR }} />
              <span className='font-medium text-foreground'>
                Found {results.length} relevant results in 0.3s
              </span>
            </div>

            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className='
                  group cursor-pointer rounded-xl border p-6 transition-all duration-300
                  border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02]
                  hover:border-[color:rgba(var(--color-primary-service-rgb),0.35)]
                '
              >
                <div className='flex items-start gap-4'>
                  <div
                    className='
                      rounded-lg p-2 transition-colors
                      group-hover:bg-[color:rgba(var(--color-primary-service-rgb),0.2)]
                    '
                    style={{
                      backgroundColor: withAlpha(PRIMARY_RGB_VAR, 0.12),
                    }}
                  >
                    <FileText
                      className='h-5 w-5'
                      style={{ color: PRIMARY_COLOR }}
                    />
                  </div>

                  <div className='flex-1'>
                    <div className='mb-2 flex items-start justify-between'>
                      <h4 className='font-semibold text-foreground transition-colors group-hover:text-primary-foreground'>
                        {result.title}
                      </h4>
                      <div
                        className='flex items-center gap-1 rounded-full px-2 py-1 text-xs'
                        style={{
                          backgroundColor: withAlpha(PRIMARY_RGB_VAR, 0.18),
                          color: PRIMARY_COLOR,
                        }}
                      >
                        <span>
                          {Math.round(result.relevanceScore * 100)}% match
                        </span>
                      </div>
                    </div>

                    <p className='mb-3 text-sm leading-relaxed text-muted-foreground'>
                      {result.snippet}
                    </p>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <span>{result.source}</span>
                        {result.metadata && 'department' in result.metadata && (
                          <>
                            <span>•</span>
                            <span>
                              {String(
                                (result.metadata as Record<string, unknown>)
                                  .department
                              )}
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        className='
                          cursor-pointer text-xs transition-colors
                          hover:text-[color:rgba(var(--color-primary-service-rgb),0.75)]
                        '
                        style={{ color: PRIMARY_COLOR }}
                      >
                        View Document →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
