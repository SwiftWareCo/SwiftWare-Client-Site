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
    <div className='max-w-4xl mx-auto p-6'>
      <div className='text-center mb-8'>
        <h3 className='text-2xl font-bold text-white mb-4'>
          Experience Hybrid AI Search
        </h3>
        <p className='text-zinc-400'>
          See how our AI combines semantic understanding with keyword precision
        </p>
      </div>

      {/* Search Interface */}
      <div className='relative mb-8'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400' />
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Ask anything about your business data...'
            className='w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-teal-400/50 focus:bg-white/[0.08] transition-all duration-300'
            onKeyPress={(e) =>
              e.key === 'Enter' && query && performSearch(query)
            }
          />
          {query && (
            <button
              onClick={() => performSearch(query)}
              disabled={isSearching}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer'
            >
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='w-4 h-4 border-2 border-white border-t-transparent rounded-full'
                />
              ) : (
                'Search'
              )}
            </button>
          )}
        </div>

        {/* Quick Query Suggestions */}
        <div className='mt-4'>
          <p className='text-sm text-zinc-500 mb-3'>
            Try these sample queries:
          </p>
          <div className='flex flex-wrap gap-2'>
            {DEMO_QUERIES.map((demoQuery, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickQuery(demoQuery)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-2 text-sm rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedQuery === demoQuery
                    ? 'bg-teal-500/20 border-teal-400/50 text-teal-300'
                    : 'bg-white/[0.03] border-white/20 text-zinc-400 hover:border-teal-400/30 hover:text-teal-300'
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
            className='mb-8 p-6 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-400/20'
          >
            <div className='flex items-center gap-4 mb-4'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className='w-6 h-6 text-teal-400' />
              </motion.div>
              <div>
                <h4 className='text-white font-medium'>
                  AI Search in Progress
                </h4>
                <p className='text-zinc-400 text-sm'>
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
                  className='flex items-center gap-2 text-sm text-zinc-300'
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                    className='w-2 h-2 rounded-full bg-teal-400'
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
            <div className='flex items-center gap-2 mb-6'>
              <Zap className='w-5 h-5 text-teal-400' />
              <span className='text-white font-medium'>
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
                className='p-6 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-teal-400/30 transition-all duration-300 cursor-pointer group'
              >
                <div className='flex items-start gap-4'>
                  <div className='p-2 rounded-lg bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors'>
                    <FileText className='w-5 h-5 text-teal-400' />
                  </div>

                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-2'>
                      <h4 className='text-white font-semibold group-hover:text-teal-100 transition-colors'>
                        {result.title}
                      </h4>
                      <div className='flex items-center gap-1 px-2 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs'>
                        <span>
                          {Math.round(result.relevanceScore * 100)}% match
                        </span>
                      </div>
                    </div>

                    <p className='text-zinc-400 text-sm mb-3 leading-relaxed'>
                      {result.snippet}
                    </p>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 text-xs text-zinc-500'>
                        <span>{result.source}</span>
                        {result.metadata?.department && (
                          <>
                            <span>•</span>
                            <span>{result.metadata.department}</span>
                          </>
                        )}
                      </div>

                      <button className='text-xs text-teal-400 hover:text-teal-300 transition-colors cursor-pointer'>
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
