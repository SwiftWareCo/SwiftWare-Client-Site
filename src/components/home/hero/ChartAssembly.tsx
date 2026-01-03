'use client';

import { motion, useReducedMotion, useInView } from 'motion/react';
import { useRef } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from 'recharts';

// SEO/Marketing chart data
const trafficData = [
  { month: 'Jan', organic: 1200 },
  { month: 'Feb', organic: 1400 },
  { month: 'Mar', organic: 1800 },
  { month: 'Apr', organic: 2200 },
  { month: 'May', organic: 2800 },
  { month: 'Jun', organic: 3400 },
];

const keywordData = [
  { position: 'Top 3', count: 45 },
  { position: 'Top 10', count: 89 },
  { position: 'Top 20', count: 156 },
];

const conversionData = [
  { day: 'Mon', rate: 8.2 },
  { day: 'Tue', rate: 9.1 },
  { day: 'Wed', rate: 11.3 },
  { day: 'Thu', rate: 10.8 },
  { day: 'Fri', rate: 12.4 },
  { day: 'Sat', rate: 14.2 },
];

export default function ChartAssembly() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (reduce) {
    return <StaticCharts />;
  }

  return (
    <div ref={ref} className='relative w-full max-w-[900px] mx-auto'>
      {/* Container with device frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]'
      >
        <div className='relative aspect-[16/10] rounded-xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden'>
          {/* Background gradient */}
          <div
            className='absolute inset-0'
            style={{
              background:
                'radial-gradient(600px 260px at 50% -10%, rgba(16,185,129,.08), transparent 60%)',
            }}
          />

          {/* Charts Assembly Container */}
          <div className='relative h-full p-4 grid grid-cols-2 gap-3'>
            {/* Traffic Growth Chart */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className='col-span-2'
            >
              <div className='rounded-lg border border-zinc-800/60 bg-zinc-900/80 p-3 shadow-lg'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-emerald-400' />
                    <span className='text-xs text-zinc-400 font-medium'>
                      Organic Traffic
                    </span>
                  </div>
                  <span className='text-xs text-emerald-400 font-semibold'>
                    +163%
                  </span>
                </div>
                <div className='h-16'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={trafficData}>
                      <defs>
                        <linearGradient
                          id='trafficGradient'
                          x1='0'
                          y1='0'
                          x2='0'
                          y2='1'
                        >
                          <stop
                            offset='5%'
                            stopColor='#10b981'
                            stopOpacity={0.3}
                          />
                          <stop
                            offset='95%'
                            stopColor='#10b981'
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type='monotone'
                        dataKey='organic'
                        stroke='#10b981'
                        strokeWidth={2}
                        fill='url(#trafficGradient)'
                        animationDuration={1500}
                        animationBegin={800}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Keyword Rankings Chart */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{
                delay: 1.0,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className='h-full rounded-lg border border-zinc-800/60 bg-zinc-900/80 p-3 shadow-lg'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-2 h-2 rounded-full bg-blue-400' />
                  <span className='text-xs text-zinc-400 font-medium'>
                    Keywords
                  </span>
                </div>
                <div className='h-20'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={keywordData} layout='vertical'>
                      <XAxis type='number' hide />
                      <Bar
                        dataKey='count'
                        fill='#3b82f6'
                        radius={[0, 4, 4, 0]}
                        animationDuration={1200}
                        animationBegin={1200}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Conversion Rate Chart */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{
                delay: 1.3,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className='h-full rounded-lg border border-zinc-800/60 bg-zinc-900/80 p-3 shadow-lg'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-2 h-2 rounded-full bg-purple-400' />
                  <span className='text-xs text-zinc-400 font-medium'>
                    Conversions
                  </span>
                </div>
                <div className='h-20'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={conversionData}>
                      <defs>
                        <linearGradient
                          id='conversionGradient'
                          x1='0'
                          y1='0'
                          x2='0'
                          y2='1'
                        >
                          <stop
                            offset='5%'
                            stopColor='#a855f7'
                            stopOpacity={0.3}
                          />
                          <stop
                            offset='95%'
                            stopColor='#a855f7'
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type='monotone'
                        dataKey='rate'
                        stroke='#a855f7'
                        strokeWidth={2}
                        fill='url(#conversionGradient)'
                        animationDuration={1500}
                        animationBegin={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Metrics Cards Grid */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                delay: 1.6,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className='col-span-2 grid grid-cols-4 gap-2'
            >
              {[
                {
                  label: 'Sessions',
                  value: '47.2K',
                  change: '+28%',
                  color: 'emerald',
                },
                {
                  label: 'Page Views',
                  value: '156K',
                  change: '+42%',
                  color: 'blue',
                },
                {
                  label: 'Bounce Rate',
                  value: '32%',
                  change: '-8%',
                  color: 'purple',
                },
                {
                  label: 'Avg. Duration',
                  value: '4:32',
                  change: '+15%',
                  color: 'cyan',
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: 1.8 + index * 0.1,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className='rounded-md border border-zinc-800/60 bg-zinc-900/60 p-2 text-center'
                >
                  <div className='text-sm font-bold text-white'>
                    {metric.value}
                  </div>
                  <div className='text-[10px] text-zinc-500'>
                    {metric.label}
                  </div>
                  <div
                    className={`text-[10px] font-medium ${
                      metric.change.startsWith('+')
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {metric.change}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Performance metrics badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className='absolute -bottom-2 right-4 text-xs text-zinc-400 font-mono'
      >
        <div className='flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-900/80 border border-zinc-800'>
          <span className='inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
          <span>Live Analytics</span>
        </div>
      </motion.div>
    </div>
  );
}

// Static version for reduced motion
function StaticCharts() {
  return (
    <div className='relative w-full max-w-[680px] mx-auto'>
      <div className='relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]'>
        <div className='relative aspect-[16/10] rounded-xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden p-4'>
          <div className='grid grid-cols-2 gap-3 h-full'>
            {/* Static traffic chart placeholder */}
            <div className='col-span-2 rounded-lg border border-zinc-800/60 bg-zinc-900/80 p-3'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-2 h-2 rounded-full bg-emerald-400' />
                <span className='text-xs text-zinc-400'>Organic Traffic</span>
              </div>
              <div className='h-12 bg-gradient-to-t from-emerald-500/10 to-transparent rounded' />
            </div>

            {/* Static keyword chart */}
            <div className='rounded-lg border border-zinc-800/60 bg-zinc-900/80 p-3'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-2 h-2 rounded-full bg-blue-400' />
                <span className='text-xs text-zinc-400'>Keywords</span>
              </div>
              <div className='space-y-1'>
                {[75, 55, 40].map((w, i) => (
                  <div
                    key={i}
                    className={`h-3 bg-blue-500/30 rounded`}
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Static conversion chart */}
            <div className='rounded-lg border border-zinc-800/60 bg-zinc-900/80 p-3'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-2 h-2 rounded-full bg-purple-400' />
                <span className='text-xs text-zinc-400'>Conversions</span>
              </div>
              <div className='h-12 bg-gradient-to-t from-purple-500/10 to-transparent rounded' />
            </div>

            {/* Static metrics */}
            <div className='col-span-2 grid grid-cols-4 gap-2'>
              {['47.2K', '156K', '32%', '4:32'].map((val, i) => (
                <div
                  key={i}
                  className='rounded-md border border-zinc-800/60 bg-zinc-900/60 p-2 text-center'
                >
                  <div className='text-sm font-bold text-white'>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
