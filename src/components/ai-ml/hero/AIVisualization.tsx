'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Brain, Search, FileText, Zap } from 'lucide-react';

const AI_FEATURES = [
  { icon: Brain, label: 'RAG Engine', delay: 0 },
  { icon: Search, label: 'Hybrid Search', delay: 0.2 },
  { icon: FileText, label: 'Doc Processing', delay: 0.4 },
  { icon: Zap, label: 'AI Insights', delay: 0.6 },
];

const PRIMARY_COLOR = 'var(--color-primary-service)';
const SECONDARY_COLOR = 'var(--color-secondary-service)';
const PRIMARY_RGB_VAR = '--color-primary-service-rgb' as const;
const SECONDARY_RGB_VAR = '--color-secondary-service-rgb' as const;

const withAlpha = (cssVar: string, alpha: number) =>
  `rgba(var(${cssVar}), ${alpha})`;

export default function AIVisualization() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className='relative mx-auto aspect-[4/3] w-full max-w-[520px] rounded-2xl p-8'
        style={{
          background: `linear-gradient(135deg, ${withAlpha(
            PRIMARY_RGB_VAR,
            0.12
          )}, ${withAlpha(SECONDARY_RGB_VAR, 0.08)})`,
          border: `1px solid ${withAlpha(PRIMARY_RGB_VAR, 0.2)}`,
        }}
      >
        <div className='grid h-full grid-cols-2 gap-6'>
          {AI_FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className='flex flex-col items-center justify-center rounded-xl border bg-background/40 p-4'
              style={{ borderColor: withAlpha(PRIMARY_RGB_VAR, 0.15) }}
            >
              <Icon className='mb-2 h-8 w-8' style={{ color: PRIMARY_COLOR }} />
              <span className='text-center text-xs text-muted-foreground'>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='relative mx-auto aspect-[4/3] w-full max-w-[520px]'>
      {/* Main container with AI-themed gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className='relative h-full w-full overflow-hidden rounded-2xl'
        style={{
          background: `linear-gradient(135deg, ${withAlpha(
            PRIMARY_RGB_VAR,
            0.14
          )}, ${withAlpha(SECONDARY_RGB_VAR, 0.1)})`,
          border: `1px solid ${withAlpha(PRIMARY_RGB_VAR, 0.24)}`,
        }}
      >
        {/* Background glow effect */}
        <motion.div
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, ${withAlpha(
                PRIMARY_RGB_VAR,
                0.32
              )} 0%, transparent 55%)`,
              `radial-gradient(circle at 80% 70%, ${withAlpha(
                SECONDARY_RGB_VAR,
                0.32
              )} 0%, transparent 55%)`,
              `radial-gradient(circle at 40% 80%, ${withAlpha(
                PRIMARY_RGB_VAR,
                0.22
              )} 0%, transparent 55%)`,
              `radial-gradient(circle at 20% 30%, ${withAlpha(
                PRIMARY_RGB_VAR,
                0.32
              )} 0%, transparent 55%)`,
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
                  `0 0 24px ${withAlpha(PRIMARY_RGB_VAR, 0.55)}`,
                  `0 0 36px ${withAlpha(SECONDARY_RGB_VAR, 0.55)}`,
                  `0 0 24px ${withAlpha(PRIMARY_RGB_VAR, 0.55)}`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='flex h-24 w-24 items-center justify-center rounded-full'
              style={{
                background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
              }}
            >
              <Brain className='h-12 w-12 text-primary-foreground' />
            </motion.div>

            {/* Simple pulse rings */}
            {[...Array(3)].map((_, ringIndex) => (
              <motion.div
                key={`pulse-${ringIndex}`}
                className='absolute inset-0 rounded-full'
                style={{
                  border: `1px solid ${withAlpha(PRIMARY_RGB_VAR, 0.3)}`,
                  width: `${120 + ringIndex * 40}px`,
                  height: `${120 + ringIndex * 40}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2 + ringIndex * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: ringIndex * 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, particleIndex) => (
          <motion.div
            key={`particle-${particleIndex}`}
            className='absolute h-1 w-1 rounded-full'
            style={{
              backgroundColor: PRIMARY_COLOR,
              left: `${10 + particleIndex * 10}%`,
              top: `${20 + particleIndex * 8}%`,
            }}
            animate={{
              x: [0, 300, 0],
              y: [0, 200, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + particleIndex,
              repeat: Infinity,
              delay: particleIndex * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
