'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Play, TrendingUp, Users, DollarSign } from 'lucide-react';
import { getContentForFocusClient } from '@/lib/focusContent';
import { TeeTimeGrid, CourseLayout, WeatherWidget } from './index';

const HEADLINE = 'GolfSync Operations Dashboard';

interface DashboardStats {
  dailyRevenue: number;
  roundsToday: number;
  memberSatisfaction: number;
  cartUtilization: number;
}

const mockStats: DashboardStats = {
  dailyRevenue: 12450,
  roundsToday: 156,
  memberSatisfaction: 4.8,
  cartUtilization: 87,
};

export default function GolfCourseHero() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'teesheet' | 'course' | 'weather'>(
    'teesheet'
  );
  const [stats] = useState<DashboardStats>(mockStats);
  const data = getContentForFocusClient('tee-sheet');

  const stripes = useMemo(
    () => [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
    []
  );

  return (
    <section
      id='hero'
      aria-labelledby='hero-heading'
      className='relative mx-auto max-w-[92rem] px-4 sm:px-6 pt-32 sm:pt-40 pb-14 sm:pb-16'
    >
      {/* Golf course themed backdrop */}
      <div className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-10 overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(900px 420px at 50% -10%, rgba(16,185,129,.12), rgba(34,197,94,.08), transparent 70%)',
            opacity: 0.8,
          }}
        />
        {!reduce &&
          stripes.map((left, i) => (
            <div key={left}>
              <motion.span
                className='absolute top-[-130%] h-[240%] w-px'
                style={{
                  left: `${left}%`,
                  background:
                    'linear-gradient(180deg, transparent, rgba(16,185,129,.18), rgba(34,197,94,.18), transparent)',
                  opacity: 0.25,
                }}
                initial={{ y: 0 }}
                animate={{ y: '15%' }}
                transition={{
                  duration: 15 + i * 0.3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
              <motion.span
                className='absolute h-1.5 w-1.5 rounded-full'
                style={{
                  left: `calc(${left}% - 3px)`,
                  background:
                    'radial-gradient(circle, rgba(255,255,255,.85) 0%, rgba(16,185,129,.8) 40%, rgba(34,197,94,.0) 70%)',
                  filter: 'drop-shadow(0 0 8px rgba(16,185,129,.6))',
                }}
                initial={{ top: '-10%', opacity: 0.7 }}
                animate={{ top: '110%', opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 6 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
              />
            </div>
          ))}
      </div>

      <div className='grid gap-8 lg:gap-12 place-items-start lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] xl:min-h-[600px]'>
        {/* LEFT — Course Info & CTAs */}
        <div className='relative text-left lg:flex lg:flex-col lg:justify-center w-full'>
          <p className='inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-zinc-400'>
            GolfSync
            <span className='inline-block h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]' />
            Course Operations Platform
          </p>

          <h1 id='hero-heading' className='mt-2'>
            <div className='text-[1.35rem] sm:text-[1.65rem] lg:text-[2.1rem] font-bold leading-tight bg-gradient-to-r from-white via-emerald-100 to-green-100 bg-clip-text text-transparent'>
              {HEADLINE}
            </div>
          </h1>

          {/* GolfSync subline from content */}
          {data?.hero?.subline && (
            <p className='mt-3 text-sm sm:text-base text-zinc-300'>
              {data.hero.subline}
            </p>
          )}

          {/* Quick Stats */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className='mt-6 grid grid-cols-2 gap-4'
          >
            <div className='p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-lg'>
              <div className='flex items-center gap-2 mb-1'>
                <DollarSign className='w-4 h-4 text-emerald-400' />
                <span className='text-xs text-zinc-400'>Daily Revenue</span>
              </div>
              <div className='text-lg font-bold text-emerald-300'>
                ${stats.dailyRevenue.toLocaleString()}
              </div>
            </div>

            <div className='p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg'>
              <div className='flex items-center gap-2 mb-1'>
                <Users className='w-4 h-4 text-blue-400' />
                <span className='text-xs text-zinc-400'>Rounds Today</span>
              </div>
              <div className='text-lg font-bold text-blue-300'>
                {stats.roundsToday}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 1 } : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.45 }}
            className='mt-6 flex flex-wrap items-center gap-3'
          >
            {/* Primary CTA */}
            {data?.hero?.primaryCta ? (
              <Link
                href={data.hero.primaryCta.href}
                className='relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-medium text-white ring-1 ring-zinc-800'
                style={{
                  background:
                    'linear-gradient(90deg, rgb(16 185 129), rgb(34 197 94))',
                }}
                aria-label={data.hero.primaryCta.label}
              >
                <motion.span
                  aria-hidden
                  className='pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-emerald-600/0 via-emerald-600/30 to-green-500/0'
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
                {data.hero.primaryCta.label}
                <ArrowRight className='size-4' />
              </Link>
            ) : (
              <Link
                href='/?contact=open'
                className='relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-medium text-white ring-1 ring-zinc-800'
                style={{
                  background:
                    'linear-gradient(90deg, rgb(16 185 129), rgb(34 197 94))',
                }}
                aria-label='Schedule Demo'
              >
                <motion.span
                  aria-hidden
                  className='pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-emerald-600/0 via-emerald-600/30 to-green-500/0'
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
                Schedule Demo
                <ArrowRight className='size-4' />
              </Link>
            )}

            {/* Secondary CTA - Only show if explicitly provided in content */}
            {data?.hero?.secondaryCta && (
              <Link
                href={data.hero.secondaryCta.href}
                className='group inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm text-zinc-200 hover:bg-zinc-900'
              >
                {data.hero.secondaryCta.label}
                <Play className='size-4 text-zinc-500 group-hover:text-zinc-300 transition-colors' />
              </Link>
            )}
          </motion.div>
        </div>

        {/* RIGHT — Interactive Golf Course Dashboard */}
        <div className='relative w-full' id='dashboard'>
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='bg-zinc-900/40 border border-zinc-700/50 rounded-xl backdrop-blur-sm p-6'
          >
            {/* Dashboard tabs */}
            <div className='flex items-center gap-1 mb-6 p-1 bg-zinc-800/50 rounded-lg'>
              {[
                { key: 'teesheet', label: 'Tee Sheet', icon: TrendingUp },
                { key: 'course', label: 'Course Map', icon: Users },
                { key: 'weather', label: 'Weather', icon: DollarSign },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === key
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'
                  }`}
                >
                  <Icon className='w-4 h-4' />
                  <span className='hidden sm:inline'>{label}</span>
                </button>
              ))}
            </div>

            {/* Dashboard content */}
            <div className='min-h-[400px]'>
              {activeTab === 'teesheet' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TeeTimeGrid />
                </motion.div>
              )}

              {activeTab === 'course' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseLayout />
                </motion.div>
              )}

              {activeTab === 'weather' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <WeatherWidget />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Performance indicators */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className='mt-4 grid grid-cols-2 gap-3 text-sm'
          >
            <div className='flex items-center gap-2 text-zinc-300'>
              <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
              <span>Live Updates</span>
            </div>
            <div className='flex items-center gap-2 text-zinc-300'>
              <TrendingUp className='w-4 h-4 text-blue-400' />
              <span>{stats.memberSatisfaction}/5.0 Rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
