'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Search, Paintbrush, Code2, Rocket, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Data
// ============================================================================

const PROCESS_STEPS = [
  {
    id: 'discovery',
    title: 'Discovery',
    description:
      'We dive deep into your business, goals, and challenges to understand exactly what you need.',
    icon: Search,
    color: 'text-service-brand',
    bgColor: 'bg-service-brand/10',
    borderColor: 'border-service-brand/30',
  },
  {
    id: 'design',
    title: 'Design',
    description:
      'Creating tailored solutions with your input at every step. No surprises.',
    icon: Paintbrush,
    color: 'text-service-marketing',
    bgColor: 'bg-service-marketing/10',
    borderColor: 'border-service-marketing/30',
  },
  {
    id: 'development',
    title: 'Development',
    description:
      'Building iteratively so you see progress weekly, not just at launch.',
    icon: Code2,
    color: 'text-service-ai',
    bgColor: 'bg-service-ai/10',
    borderColor: 'border-service-ai/30',
  },
  {
    id: 'launch',
    title: 'Launch',
    description:
      'Deploying with confidence, monitoring for success, and iterating based on real data.',
    icon: Rocket,
    color: 'text-service-software',
    bgColor: 'bg-service-software/10',
    borderColor: 'border-service-software/30',
  },
] as const;

// ============================================================================
// Components
// ============================================================================

function ProcessStep({
  step,
  index,
  isInView,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  isInView: boolean;
}) {
  const Icon = step.icon;
  const delay = 0.2 + index * 0.15;

  return (
    <motion.div
      className='relative h-full'
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Step card - no arrows between cards */}
      <div
        className={cn(
          'relative h-full p-5 sm:p-6 rounded-2xl border-2 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col',
          step.borderColor
        )}
      >
        {/* Step number badge */}
        <div
          className={cn(
            'absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-background',
            step.borderColor,
            step.color
          )}
        >
          {index + 1}
        </div>

        {/* Icon */}
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
            step.bgColor
          )}
        >
          <Icon className={cn('w-6 h-6', step.color)} />
        </div>

        {/* Content */}
        <h3 className='text-lg sm:text-xl font-semibold text-foreground mb-2'>
          {step.title}
        </h3>
        <p className='text-sm text-muted-foreground leading-relaxed flex-1'>
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// Animated circular arrow SVG - single clean loop
function AnimatedLoopBackground({ isInView }: { isInView: boolean }) {
  // Single clean circular arrow path - goes clockwise around once
  // Two arcs forming a complete circle, both going clockwise
  // Starting at top-right, going around clockwise
  const arrowPath =
    'M 90 50 A 40 40 0 1 1 10 50 A 40 40 0 1 1 90 50';

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center'>
      <svg
        className='w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] opacity-[0.2]'
        viewBox='0 0 100 100'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        {/* Circular loop path */}
        <motion.path
          d={arrowPath}
          stroke='url(#loopGradient)'
          strokeWidth='3'
          strokeLinecap='round'
          fill='none'
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
        />

        <defs>
          <linearGradient
            id='loopGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='0%' stopColor='var(--color-service-software)' />
            <stop offset='50%' stopColor='var(--color-service-ai)' />
            <stop offset='100%' stopColor='var(--color-service-software)' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function IterativeProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className='relative py-16 sm:py-24 bg-secondary overflow-hidden'
      aria-labelledby='process-heading'
    >
      {/* Animated loop background */}
      <AnimatedLoopBackground isInView={isInView} />

      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
        {/* Header */}
        <motion.div
          className='text-center mb-12 sm:mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            id='process-heading'
            className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground'
          >
            Our{' '}
            <span className='bg-gradient-to-r from-service-software to-service-ai bg-clip-text text-transparent'>
              Iterative Process
            </span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            We don&apos;t disappear for months. You see progress at every stage,
            with continuous improvements based on your feedback.
          </p>
        </motion.div>

        {/* Process Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12'>
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Iteration indicator */}
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border shadow-md'>
            <RefreshCw className='w-5 h-5 text-service-ai animate-[spin_8s_linear_infinite]' />
            <span className='text-sm sm:text-base text-muted-foreground'>
              <span className='font-semibold text-foreground'>
                Continuous iteration
              </span>{' '}
              — improvements at every stage
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
