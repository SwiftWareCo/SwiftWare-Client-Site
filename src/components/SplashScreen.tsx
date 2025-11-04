'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

interface SplashScreenProps {
  onDone?: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Auto-dismiss after animation completes (~5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isExiting) {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          onDone?.();
        }, 700);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isExiting, onDone]);

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950'
        >
          {/* Animated background */}
          <div className='absolute inset-0'>
            <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950' />
            <motion.div
              className='absolute inset-0'
              animate={{
                background: [
                  'radial-gradient(600px 300px at 30% 40%, rgba(59, 130, 246, 0.1), transparent 50%)',
                  'radial-gradient(800px 400px at 70% 60%, rgba(168, 85, 247, 0.12), transparent 50%)',
                  'radial-gradient(600px 300px at 40% 30%, rgba(59, 130, 246, 0.1), transparent 50%)',
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute size-1 bg-blue-400/20 rounded-full'
                initial={{
                  x:
                    typeof window !== 'undefined'
                      ? Math.random() * window.innerWidth
                      : Math.random() * 1200,
                  y:
                    typeof window !== 'undefined'
                      ? Math.random() * window.innerHeight
                      : Math.random() * 800,
                  opacity: 0,
                }}
                animate={{ y: [0, -50, 0], opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Orbiting electrons */}
            <motion.div
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/15'
              style={{ width: 480, height: 480 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <div className='absolute -top-1.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-blue-400/70 shadow-[0_0_10px_rgba(59,130,246,0.9)]' />
            </motion.div>
            <motion.div
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/15'
              style={{ width: 760, height: 760 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            >
              <div className='absolute -top-1.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-purple-400/70 shadow-[0_0_10px_rgba(168,85,247,0.9)]' />
            </motion.div>
          </div>

          {/* Main content - Logo only, no choice buttons */}
          <div className='relative z-10 flex flex-col items-center gap-8'>
            {/* Logo with pulsing animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className='relative'
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                transition={{
                  rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                }}
                className='size-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-brand-intense'
              />
              <div className='absolute inset-0 m-auto size-12 flex items-center justify-center'>
                <Image
                  src='/images/swiftware-logo.png'
                  alt='SwiftWare software development company logo'
                  width={150}
                  height={150}
                  className='mix-blend-screen'
                  priority
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0, 0.25] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='absolute inset-0 rounded-2xl border-2 border-blue-400'
              />
              <motion.div
                animate={{ scale: [1, 1.7, 1], opacity: [0.18, 0, 0.18] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className='absolute inset-0 rounded-2xl border border-purple-400'
              />
            </motion.div>

            <div className='absolute -top-20 -left-20 size-40 bg-blue-500/5 rounded-full blur-3xl' />
            <div className='absolute -bottom-20 -right-20 size-40 bg-purple-500/5 rounded-full blur-3xl' />
          </div>

          <div className='absolute top-0 left-0 w-32 h-32'>
            <div className='absolute top-4 left-4 w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full' />
            <div className='absolute top-4 left-4 w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full' />
          </div>
          <div className='absolute bottom-0 right-0 w-32 h-32 rotate-180'>
            <div className='absolute top-4 left-4 w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full' />
            <div className='absolute top-4 left-4 w-8 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full' />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
