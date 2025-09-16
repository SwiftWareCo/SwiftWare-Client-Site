'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Brain, Search, FileText, Zap } from 'lucide-react';

const AI_FEATURES = [
  { icon: Brain, label: 'RAG Engine', delay: 0 },
  { icon: Search, label: 'Hybrid Search', delay: 0.2 },
  { icon: FileText, label: 'Doc Processing', delay: 0.4 },
  { icon: Zap, label: 'AI Insights', delay: 0.6 },
];

export default function AIVisualization() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className='relative w-full max-w-[520px] mx-auto aspect-[4/3] bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl border border-teal-500/20 p-8'>
        <div className='grid grid-cols-2 gap-6 h-full'>
          {AI_FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className='flex flex-col items-center justify-center p-4 bg-white/[0.02] rounded-xl border border-white/10'
            >
              <Icon className='w-8 h-8 text-teal-400 mb-2' />
              <span className='text-xs text-zinc-300 text-center'>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='relative w-full max-w-[520px] mx-auto aspect-[4/3]'>
      {/* Main container with AI-themed gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className='relative w-full h-full bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl border border-teal-500/20 overflow-hidden'
      >
        {/* Background glow effect */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(15,76,92,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(0,212,255,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(0,255,136,0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(15,76,92,0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute inset-0'
        />

        {/* Simplified AI core */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative'
          >
            {/* Core circle */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0,212,255,0.5)',
                  '0 0 40px rgba(0,255,136,0.5)',
                  '0 0 20px rgba(0,212,255,0.5)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center'
            >
              <Brain className='w-12 h-12 text-white' />
            </motion.div>

            {/* Simple pulse rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute inset-0 rounded-full border border-teal-400/30'
                style={{
                  width: `${120 + i * 40}px`,
                  height: `${120 + i * 40}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-teal-400 rounded-full'
            animate={{
              x: [0, 300, 0],
              y: [0, 200, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
