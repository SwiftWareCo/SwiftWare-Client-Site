'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ThemedFocusDropdown from './focus/ThemedFocusDropdown';
import { useFocusContext } from '@/context/FocusContext';


export default function UnifiedHeader() {
  const { setShowContactModal } = useFocusContext();
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });


  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -5]);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <header
      className='fixed top-0 left-0 right-0 z-50'
      onMouseMove={handleMouseMove}
    >
      <div className='relative'>
        <div
          className='pointer-events-none absolute inset-x-0 -top-28 h-60 opacity-60'
          style={{
            background: `radial-gradient(80% 50% at 50% 0%,
              rgba(59, 130, 246, 0.15),
              rgba(168, 85, 247, 0.1),
              transparent 70%)`,
          }}
        />

        <motion.div
          style={{ y: headerY }}
          className='relative mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4'
        >
          <motion.div
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
            className='relative group'
          >
            <motion.div
              animate={{
                borderColor: scrolled
                  ? 'rgb(63 63 70 / 0.8)'
                  : 'rgb(63 63 70 / 0.4)',
                backgroundColor: scrolled
                  ? 'rgb(9 9 11 / 0.9)'
                  : 'rgb(9 9 11 / 0.7)',
                boxShadow: scrolled
                  ? '0 16px 40px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(168, 85, 247, 0.1)'
                  : '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.05)',
                scale: scrolled ? 0.985 : 1,
              }}
              transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
              className='rounded-2xl border backdrop-blur-xl overflow-hidden'
            >
              <motion.div
                className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none'
                style={{
                  background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%,
                    rgba(59,130,246,0.03), transparent 50%)`,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className='relative px-4 sm:px-6 py-2.5 sm:py-3'>
                {/* Mobile: Simple layout - Logo + CTA */}
                <div className='flex items-center justify-between sm:hidden'>
                  <Link
                    href='/'
                    className='group/logo relative flex items-center gap-2 text-base font-bold tracking-wide text-white'
                  >
                    <div className='relative'>
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                        className='size-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
                                   shadow-brand-glow group-hover/logo:shadow-brand-intense transition-all duration-300
                                   flex items-center justify-center p-1'
                      >
                        <Image
                          src='/images/swiftware-logo.png'
                          alt='Swiftware software development company logo'
                          width={20}
                          height={20}
                          className='mix-blend-screen'
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      </motion.div>
                    </div>
                    <div className='leading-tight'>
                      <span className='bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent text-sm'>
                        Swiftware
                      </span>
                      <div className='text-[10px] text-zinc-400'>
                        Digital Excellence
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className='relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg border border-blue-400/20 bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 text-xs font-medium text-white'
                  >
                    <span>Start project</span>
                    <ArrowRight className='size-3' />
                  </button>
                </div>

                {/* Desktop: Single row layout */}
                <div className='hidden sm:flex sm:items-center sm:justify-between'>
                  <Link
                    href='/'
                    className='group/logo relative flex items-center gap-3 text-lg font-bold tracking-wide text-white'
                  >
                    <div className='relative'>
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                        className='size-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
                                   shadow-brand-glow group-hover/logo:shadow-brand-intense transition-all duration-300
                                   flex items-center justify-center p-1'
                      >
                        <Image
                          src='/images/swiftware-logo.png'
                          alt='Swiftware software development company logo'
                          width={22}
                          height={22}
                          className='mix-blend-screen'
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      </motion.div>
                    </div>

                    <div className='leading-tight'>
                      <span className='bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent text-base'>
                        Swiftware
                      </span>
                      <div className='text-xs text-zinc-400'>
                        Digital Excellence
                      </div>
                    </div>
                  </Link>

                  {/* Focus dropdown + CTA */}
                  <motion.div
                    initial={{ x: 16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className='flex items-center gap-3'
                  >
                    <div className='hidden md:block'>
                      <ThemedFocusDropdown />
                    </div>
                    <motion.div
                      initial='rest'
                      animate='rest'
                      whileHover='hover'
                      className='relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-4 py-2 text-sm font-medium text-white ring-1 ring-zinc-800 hover:cursor-pointer'
                      style={{ background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(168, 85, 247))' }}
                    >
                      <motion.span
                        aria-hidden
                        className='pointer-events-none hover:cursor-pointer absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0'
                        variants={{
                          rest: { x: '-100%', opacity: 0 },
                          hover: { x: '100%', opacity: 1 },
                        }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      />
                      <button
                        onClick={() => setShowContactModal(true)}
                        className='relative hover:cursor-pointer z-10 flex items-center gap-2'
                      >
                        <span>Start your project</span>
                        <motion.span
                          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <ArrowRight className='size-4' />
                        </motion.span>
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
                className='absolute bottom-0 inset-x-4 sm:inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent'
                style={{ opacity: scrolled ? 0.8 : 0.5 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
