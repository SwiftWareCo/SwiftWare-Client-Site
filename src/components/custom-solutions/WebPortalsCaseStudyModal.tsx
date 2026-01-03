'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Smartphone, Monitor, Zap } from 'lucide-react';
import Image from 'next/image';

interface Project {
  name: string;
  logo: string;
  description: string;
  metrics: string;
  website: string;
  poster: string;
  techStack: string[];
  industry: string;
  isApp?: boolean;
}

const projects: Project[] = [
  {
    name: 'CJS Academy',
    logo: '/images/cjslogo.png',
    description:
      "Golf lesson booking platform driving more student enrollment. We built a modern, conversion-focused website that showcases CJS Golf Academy's coaching expertise and makes it effortless for students to book lessons online.",
    metrics: '3x more bookings',
    website: 'https://www.cjsgolfacademy.ca/',
    poster: '/images/cjs-demo.jpg',
    techStack: ['React', 'Next.js', 'Stripe'],
    industry: 'Sports & Education',
  },
  {
    name: 'VHD',
    logo: '/images/vvc-logo.png',
    description:
      'HVAC company achieving 140% conversion increase. Vancouver Hood Doctors needed a website that could convert local search traffic into booked jobs. We delivered a blazing-fast, SEO-optimized site that ranks and converts.',
    metrics: '+140% conversions',
    website: 'https://vancouverventcleaning.ca',
    poster: '/images/vvc-screenshot.png',
    techStack: ['React', 'Next.js', 'TypeScript'],
    industry: 'HVAC/Trades',
  },
  {
    name: 'Beacon',
    logo: '/images/beacon-logo.webp',
    description:
      'Location-based mobile app with seamless user experience. A cross-platform mobile application helping users discover and connect with local experiences through an intuitive, beautiful interface.',
    metrics: 'App store ready',
    website: 'https://beacon-topaz.vercel.app',
    poster: '/images/beacon-demo.jpg',
    techStack: ['React Native', 'TypeScript', 'Firebase'],
    industry: 'Mobile App',
    isApp: true,
  },
];

interface WebPortalsCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

export default function WebPortalsCaseStudyModal({
  isOpen,
  onClose,
  onContactClick,
}: WebPortalsCaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const currentProject = projects[activeTab];

  return (
    <AnimatePresence mode='wait' initial={false}>
      {isOpen && (
        <motion.div
          key='web-portals-case-study-modal'
          role='dialog'
          aria-modal='true'
          aria-label='Web Portals Case Studies'
          className='fixed inset-0 z-50 grid place-items-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.button
            aria-hidden
            className='fixed inset-0 bg-black/70 cursor-pointer'
            onClick={onClose}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ backdropFilter: 'blur(12px)' }}
          />

          {/* Main modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className='relative w-[min(1000px,95vw)] max-h-[90vh] overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]'
          >
            {/* Top accent - purple for web theme */}
            <motion.div
              className='h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Header */}
            <motion.header
              className='flex items-center justify-between px-6 py-5 border-b border-zinc-800/40'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'>
                  Web & Client Portals
                </h2>
                <p className='mt-1 text-sm text-zinc-400'>
                  See how we&apos;ve helped businesses establish their online
                  presence
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className='group relative cursor-pointer p-2 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-200'
                aria-label='Close case study'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className='size-5 text-zinc-400 group-hover:text-white transition-colors' />
              </motion.button>
            </motion.header>

            {/* Tabs */}
            <div className='px-6 pt-4'>
              <div className='flex gap-2 overflow-x-auto pb-2 justify-center'>
                {projects.map((project, index) => (
                  <button
                    key={project.name}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      activeTab === index
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent'
                    }`}
                  >
                    {project.isApp ? (
                      <Smartphone className='w-4 h-4' />
                    ) : (
                      <Monitor className='w-4 h-4' />
                    )}
                    {project.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className='p-6 overflow-y-auto max-h-[calc(90vh-200px)]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='grid gap-8 lg:grid-cols-2'>
                    {/* Left Column - Project Preview */}
                    <div>
                      <div className='relative aspect-video rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-900'>
                        <Image
                          src={currentProject.poster}
                          alt={`${currentProject.name} preview`}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, 500px'
                        />
                        {/* Overlay with live indicator */}
                        <div className='absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/50 backdrop-blur-sm'>
                          <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                          <span className='text-xs text-zinc-300 font-mono'>
                            Live
                          </span>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {currentProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className='px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          >
                            {tech}
                          </span>
                        ))}
                        <span className='px-3 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50'>
                          {currentProject.industry}
                        </span>
                      </div>
                    </div>

                    {/* Right Column - Project Details */}
                    <div>
                      <div className='flex items-start gap-4 mb-6'>
                        <div className='relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-900 flex-shrink-0'>
                          <Image
                            src={currentProject.logo}
                            alt={`${currentProject.name} logo`}
                            fill
                            className='object-contain p-2'
                            sizes='64px'
                          />
                        </div>
                        <div>
                          <h3 className='text-xl font-bold text-white'>
                            {currentProject.name}
                          </h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <span className='px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium'>
                              {currentProject.metrics}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className='text-zinc-300 leading-relaxed mb-6'>
                        {currentProject.description}
                      </p>

                      {/* Key Features */}
                      <div className='mb-6'>
                        <h4 className='text-sm font-semibold text-white mb-3 flex items-center gap-2'>
                          <Zap className='w-4 h-4 text-purple-400' />
                          What We Delivered
                        </h4>
                        <ul className='space-y-2 text-zinc-400'>
                          <li className='flex items-start gap-2'>
                            <div className='w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0' />
                            <span className='text-sm'>
                              Custom responsive design optimized for all devices
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0' />
                            <span className='text-sm'>
                              SEO optimization for local search visibility
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0' />
                            <span className='text-sm'>
                              Fast loading speeds (90+ Lighthouse score)
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0' />
                            <span className='text-sm'>
                              Conversion-focused user experience
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Visit Site Button */}
                      <a
                        href={currentProject.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 text-sm font-medium rounded-lg border border-zinc-700/50 transition-all duration-200'
                      >
                        Visit Live Site
                        <ExternalLink className='w-4 h-4' />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className='mt-8 p-6 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm text-center'
              >
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Ready for a website that converts?
                </h3>
                <p className='text-zinc-400 text-sm mb-4'>
                  Let&apos;s discuss how we can build your next web project.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onContactClick?.();
                  }}
                  className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer'
                >
                  Start Your Project
                </button>
              </motion.div>
            </div>

            {/* Floating particles */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className='absolute size-1 bg-purple-400/30 rounded-full'
                  initial={{
                    x: Math.random() * 1000,
                    y: Math.random() * 800,
                    opacity: 0,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
